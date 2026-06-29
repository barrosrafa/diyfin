'use client'

import React, { useState, useMemo } from 'react'
import { calculateFIITetoPrice } from '@/lib/finance/fii-teto'
import { formatarMoeda, formatarPercentual } from '@/lib/finance/utils'
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
    <div className="w-full max-w-7xl mx-auto space-y-8 p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2 px-1">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Preço Teto de FIIs</h2>
            <p className="text-sm md:text-base text-slate-600">
              Calcule o preço máximo a pagar por uma cota de Fundo Imobiliário com base na NTN-B e spread desejado.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Parâmetros do Fundo</CardTitle>
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

        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="status" aria-live="polite">
            <Card className="bg-sky-50 border-sky-200">
              <CardContent className="p-6">
                <p className="text-xs text-sky-700 font-semibold uppercase tracking-wider">Preço Teto Calculado</p>
                <p className="text-3xl font-bold text-sky-900 mt-2">{formatarMoeda(result.tetoPrice)}</p>
                <p className="text-xs text-sky-600 mt-2">Yield Alvo: {result.targetYield.toFixed(2)}% a.a.</p>
              </CardContent>
            </Card>

            <Card className={result.isAboveTeto ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-700">Status da Cotação</p>
                  <Badge variant={result.isAboveTeto ? 'destructive' : 'default'}>
                    {result.isAboveTeto ? 'Acima do Teto' : 'Com Margem de Segurança'}
                  </Badge>
                </div>
                <p className={`text-3xl font-bold mt-2 ${result.isAboveTeto ? 'text-red-900' : 'text-emerald-900'}`}>
                  {result.margin.toFixed(2)}%
                </p>
                <p className="text-xs text-slate-600 mt-2">
                  {result.isAboveTeto ? 'Sem margem de segurança no preço atual.' : 'Desconto em relação ao preço teto.'}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumo de Indicadores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between py-2 border-b text-sm">
                <span className="text-slate-600">Yield Efetivo Atual:</span>
                <span className="font-semibold text-slate-900">{result.currentYield.toFixed(2)}% a.a.</span>
              </div>
              <div className="flex justify-between py-2 border-b text-sm">
                <span className="text-slate-600">Taxa NTN-B de Referência:</span>
                <span className="font-semibold text-slate-900">{Number(ntnbAverage).toFixed(2)}% a.a.</span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span className="text-slate-600">Prêmio de Risco (Tipo):</span>
                <span className="font-semibold text-slate-900">{type === 'papel' ? '+2.0% (Papel)' : '0.0% (Tijolo)'}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
