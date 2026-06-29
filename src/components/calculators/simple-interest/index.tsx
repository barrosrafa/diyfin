'use client'

import React, { useState, useMemo } from 'react'
import { calculateSimpleInterest } from '@/lib/finance/simple-interest'
import { formatCurrency } from '@/lib/finance/utils'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Table } from '@/components/ui/table'

export default function SimpleInterestCalculator() {
  const [initialValue, setInitialValue] = useState(1000)
  const [rate, setRate] = useState(1)
  const [rateType, setRateType] = useState<'monthly' | 'annual'>('monthly')
  const [period, setPeriod] = useState(12)
  const [periodType, setPeriodType] = useState<'months' | 'years'>('months')

  const result = useMemo(() => {
    return calculateSimpleInterest({
      initialValue: Number(initialValue) || 0,
      rate: Number(rate) || 0,
      rateType,
      period: Number(period) || 0,
      periodType,
    })
  }, [initialValue, rate, rateType, period, periodType])

  const tableColumns = [
    { key: 'period', label: 'Período (Mês)' },
    { key: 'periodInterest', label: 'Juros do Período', format: (v: number) => formatCurrency(v) },
    { key: 'accumulatedInterest', label: 'Juros Acumulados', format: (v: number) => formatCurrency(v) },
    { key: 'accumulated', label: 'Montante Acumulado', format: (v: number) => formatCurrency(v) },
  ]

  return (
    <div className="w-full mx-auto space-y-8 p-4 md:p-6 lg:p-8" style={{ maxWidth: '980px' }}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Formulário */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold" style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}>
              Simulador de Juros Simples
            </h2>
            <p className="text-sm md:text-base" style={{ color: '#6e6e73' }}>
              Calcule rendimentos em regime de juros simples onde a taxa incide exclusivamente sobre o capital inicial.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Parâmetros da Simulação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Capital Inicial (R$)</Label>
                <Input
                  type="number"
                  value={initialValue}
                  onChange={(e) => setInitialValue(Number(e.target.value))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Taxa de Juros (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Tipo de Taxa</Label>
                  <Select
                    value={rateType}
                    onValueChange={(v) => setRateType(v as any)}
                    options={[
                      { value: 'monthly', label: '% ao mês' },
                      { value: 'annual', label: '% ao ano' },
                    ]}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Período</Label>
                  <Input
                    type="number"
                    value={period}
                    onChange={(e) => setPeriod(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Unidade de Tempo</Label>
                  <Select
                    value={periodType}
                    onValueChange={(v) => setPeriodType(v as any)}
                    options={[
                      { value: 'months', label: 'Meses' },
                      { value: 'years', label: 'Anos' },
                    ]}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resultados */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="status" aria-live="polite">
            {/* Valor Investido */}
            <div
              className="rounded-2xl p-4"
              style={{ background: 'rgba(0,113,227,0.06)', border: '1px solid rgba(0,113,227,0.18)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#0071e3' }}>
                Valor Investido
              </p>
              <p className="text-2xl font-semibold mt-1" style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}>
                {formatCurrency(initialValue)}
              </p>
            </div>

            {/* Total em Juros */}
            <div
              className="rounded-2xl p-4"
              style={{ background: 'rgba(48,209,88,0.06)', border: '1px solid rgba(48,209,88,0.20)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#30d158' }}>
                Total em Juros
              </p>
              <p className="text-2xl font-semibold mt-1" style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}>
                {formatCurrency(result.totalInterest)}
              </p>
            </div>

            {/* Montante Final */}
            <div
              className="rounded-2xl p-4"
              style={{ background: '#1d1d1f' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#86868b' }}>
                Montante Final
              </p>
              <p className="text-2xl font-semibold mt-1" style={{ color: '#0071e3', letterSpacing: '-0.02em' }}>
                {formatCurrency(result.totalAmount)}
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tabela de Evolução Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <Table columns={tableColumns} data={result.rows.slice(0, 24)} />
              {result.rows.length > 24 && (
                <p className="text-xs mt-2 text-center" style={{ color: '#86868b' }}>
                  Exibindo as primeiras 24 parcelas de um total de {result.rows.length - 1}.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
