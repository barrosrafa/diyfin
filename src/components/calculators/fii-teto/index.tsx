'use client'

import React, { useState, useMemo } from 'react'
import { calculateFIITetoPrice } from '@/lib/finance/fii-teto'
import { formatarMoeda } from '@/lib/finance/utils'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

export default function FIITetoPriceCalculator() {
  const [type, setType] = useState<'tijolo' | 'papel'>('tijolo')
  const [ntnbAverage, setNtnbAverage] = useState(6.0)
  const [spread, setSpread] = useState(2.0)
  const [monthlyIncome, setMonthlyIncome] = useState(1.0)
  const [currentPrice, setCurrentPrice] = useState(100.0)

  const result = useMemo(() => {
    return calculateFIITetoPrice({
      type,
      ntnbAverage: Number(ntnbAverage) || 0,
      spread: Number(spread) || 0,
      monthlyIncome: Number(monthlyIncome) || 0,
      currentPrice: Number(currentPrice) || 0,
    })
  }, [type, ntnbAverage, spread, monthlyIncome, currentPrice])

  return (
    <div className="w-full mx-auto space-y-8 p-4 md:p-6 lg:p-8" style={{ maxWidth: '980px' }}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Formulário */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold" style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}>
              Preço Teto de FIIs
            </h2>
            <p className="text-sm md:text-base" style={{ color: '#6e6e73' }}>
              Calcule o preço máximo a pagar por uma cota de Fundo Imobiliário com base na NTN-B e spread desejado.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Parâmetros do Fundo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Tipo do Fundo</Label>
                <Select
                  value={type}
                  onValueChange={(v) => setType(v as any)}
                  options={[
                    { value: 'tijolo', label: 'FII de Tijolo (Imóveis Físicos)' },
                    { value: 'papel', label: 'FII de Papel (CRIs / Dívida)' },
                  ]}
                />
              </div>
              <div>
                <Label>Rendimento Mensal por Cota (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Cotação Atual no Mercado (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(Number(e.target.value))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Média NTN-B (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={ntnbAverage}
                    onChange={(e) => setNtnbAverage(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Spread Desejado (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={spread}
                    onChange={(e) => setSpread(Number(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resultados */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="status" aria-live="polite">
            {/* Preço Teto */}
            <div
              className="rounded-2xl p-6"
              style={{ background: 'rgba(0,113,227,0.06)', border: '1px solid rgba(0,113,227,0.18)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#0071e3' }}>
                Preço Teto Calculado
              </p>
              <p className="text-3xl font-semibold mt-2" style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}>
                {formatarMoeda(result.tetoPrice)}
              </p>
              <p className="text-xs mt-2" style={{ color: '#6e6e73' }}>
                Yield Alvo: {result.targetYield.toFixed(2)}% a.a.
              </p>
            </div>

            {/* Status */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: result.isAboveTeto ? 'rgba(255,59,48,0.06)' : 'rgba(48,209,88,0.06)',
                border: result.isAboveTeto ? '1px solid rgba(255,59,48,0.20)' : '1px solid rgba(48,209,88,0.20)',
              }}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#6e6e73' }}>
                  Status da Cotação
                </p>
                <Badge variant={result.isAboveTeto ? 'destructive' : 'default'}>
                  {result.isAboveTeto ? 'Acima do Teto' : 'Com Margem'}
                </Badge>
              </div>
              <p
                className="text-3xl font-semibold mt-2"
                style={{ color: result.isAboveTeto ? '#ff3b30' : '#30d158', letterSpacing: '-0.02em' }}
              >
                {result.margin.toFixed(2)}%
              </p>
              <p className="text-xs mt-2" style={{ color: '#6e6e73' }}>
                {result.isAboveTeto ? 'Sem margem de segurança no preço atual.' : 'Desconto em relação ao preço teto.'}
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resumo de Indicadores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                ['Yield Efetivo Atual:', `${result.currentYield.toFixed(2)}% a.a.`],
                ['Taxa NTN-B de Referência:', `${Number(ntnbAverage).toFixed(2)}% a.a.`],
                ['Prêmio de Risco (Tipo):', type === 'papel' ? '+2.0% (Papel)' : '0.0% (Tijolo)'],
              ].map(([label, value], i, arr) => (
                <div
                  key={label}
                  className="flex justify-between py-2 text-sm"
                  style={i < arr.length - 1 ? { borderBottom: '1px solid #e5e5ea' } : {}}
                >
                  <span style={{ color: '#6e6e73' }}>{label}</span>
                  <span className="font-semibold" style={{ color: '#1d1d1f' }}>{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
