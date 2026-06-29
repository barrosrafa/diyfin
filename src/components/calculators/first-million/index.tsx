'use client'

import React, { useState, useMemo } from 'react'
import { calculateFirstMillion } from '@/lib/finance/first-million'
import { formatarMoeda } from '@/lib/finance/utils'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Table } from '@/components/ui/table'

export default function FirstMillionCalculator() {
  const [currentSavings, setCurrentSavings] = useState(10000)
  const [targetValue, setTargetValue] = useState(1000000)
  const [rate, setRate] = useState(10)
  const [rateType, setRateType] = useState<'monthly' | 'annual'>('annual')
  const [period, setPeriod] = useState(20)
  const [periodType, setPeriodType] = useState<'months' | 'years'>('years')

  const result = useMemo(() => {
    return calculateFirstMillion({
      currentSavings: Number(currentSavings) || 0,
      targetValue: Number(targetValue) || 0,
      rate: Number(rate) || 0,
      rateType,
      period: Number(period) || 0,
      periodType,
    })
  }, [currentSavings, targetValue, rate, rateType, period, periodType])

  const tableColumns = [
    { key: 'period', label: 'Mês' },
    { key: 'monthlyContribution', label: 'Aporte Mensal', format: (v: number) => formatarMoeda(v) },
    { key: 'accumulatedInvested', label: 'Total Investido', format: (v: number) => formatarMoeda(v) },
    { key: 'accumulatedInterest', label: 'Juros Acumulados', format: (v: number) => formatarMoeda(v) },
    { key: 'balance', label: 'Patrimônio Total', format: (v: number) => formatarMoeda(v) },
  ]

  return (
    <div className="w-full mx-auto space-y-8 p-4 md:p-6 lg:p-8" style={{ maxWidth: '980px' }}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Formulário */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold" style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}>
              Calculadora do Primeiro Milhão
            </h2>
            <p className="text-sm md:text-base" style={{ color: '#6e6e73' }}>
              Descubra exatamente quanto precisa investir mensalmente para atingir a meta de 1 Milhão de reais.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Parâmetros da Meta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Valor Meta (R$)</Label>
                <Input
                  type="number"
                  value={targetValue}
                  onChange={(e) => setTargetValue(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Patrimônio Inicial (R$)</Label>
                <Input
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Rentabilidade (%)</Label>
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
                      { value: 'annual', label: '% ao ano' },
                      { value: 'monthly', label: '% ao mês' },
                    ]}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Prazo</Label>
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
                      { value: 'years', label: 'Anos' },
                      { value: 'months', label: 'Meses' },
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
            {/* Aporte Mensal */}
            <div
              className="rounded-2xl p-4"
              style={{ background: 'rgba(0,113,227,0.06)', border: '1px solid rgba(0,113,227,0.18)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#0071e3' }}>
                Aporte Mensal Necessário
              </p>
              <p className="text-2xl font-semibold mt-1" style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}>
                {formatarMoeda(result.requiredMonthlyContribution)}
              </p>
            </div>

            {/* Total Investido */}
            <div
              className="rounded-2xl p-4"
              style={{ background: 'rgba(48,209,88,0.06)', border: '1px solid rgba(48,209,88,0.20)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#30d158' }}>
                Total Investido do Bolso
              </p>
              <p className="text-2xl font-semibold mt-1" style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}>
                {formatarMoeda(result.totalInvested)}
              </p>
            </div>

            {/* Ganho em Juros */}
            <div
              className="rounded-2xl p-4"
              style={{ background: 'rgba(191,90,242,0.06)', border: '1px solid rgba(191,90,242,0.20)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#bf5af2' }}>
                Ganho em Juros
              </p>
              <p className="text-2xl font-semibold mt-1" style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}>
                {formatarMoeda(result.totalInterest)}
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tabela de Acúmulo</CardTitle>
            </CardHeader>
            <CardContent>
              <Table
                columns={tableColumns}
                data={result.rows.filter((_, i) => i % 12 === 0 || i === result.rows.length - 1)}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
