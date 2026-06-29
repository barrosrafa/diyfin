'use client'

import React, { useState, useMemo } from 'react'
import { calculateSAC } from '@/lib/finance/sac-engine'
import { formatCurrency } from '@/lib/finance/utils'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table } from '@/components/ui/table'

export default function FinancingSACCalculator() {
  const [principal, setPrincipal] = useState(200000)
  const [annualRate, setAnnualRate] = useState(9.5)
  const [years, setYears] = useState(30)

  const result = useMemo(() => {
    const months = (Number(years) || 0) * 12
    const monthlyRateDecimal = Math.pow(1 + (Number(annualRate) || 0) / 100, 1 / 12) - 1
    return calculateSAC({
      principal: Number(principal) || 0,
      monthlyRate: monthlyRateDecimal,
      months,
    })
  }, [principal, annualRate, years])

  const firstInstallment = result.installments[0]?.totalPayment || 0
  const lastInstallment = result.installments[result.installments.length - 1]?.totalPayment || 0

  const tableColumns = [
    { key: 'month', label: 'Parcela' },
    { key: 'totalPayment', label: 'Prestação', format: (v: number) => formatCurrency(v) },
    { key: 'amortization', label: 'Amortização', format: (v: number) => formatCurrency(v) },
    { key: 'interest', label: 'Juros', format: (v: number) => formatCurrency(v) },
    { key: 'balance', label: 'Saldo Devedor', format: (v: number) => formatCurrency(v) },
  ]

  return (
    <div className="w-full mx-auto space-y-8 p-4 md:p-6 lg:p-8" style={{ maxWidth: '980px' }}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Formulário */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold" style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}>
              Financiamento Imobiliário (SAC)
            </h2>
            <p className="text-sm md:text-base" style={{ color: '#6e6e73' }}>
              Simule financiamento com parcelas decrescentes no Sistema de Amortização Constante (SAC).
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Dados do Financiamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Valor Financiado (R$)</Label>
                <Input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Taxa de Juros Anual (%)</Label>
                  <Input
                  type="number"
                  step="0.1"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Prazo do Financiamento (Anos)</Label>
                <Input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resultados */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="status" aria-live="polite">
            {/* Primeira Parcela */}
            <div
              className="rounded-2xl p-4"
              style={{ background: 'rgba(0,113,227,0.06)', border: '1px solid rgba(0,113,227,0.18)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#0071e3' }}>
                Primeira Parcela
              </p>
              <p className="text-2xl font-semibold mt-1" style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}>
                {formatCurrency(firstInstallment)}
              </p>
            </div>

            {/* Última Parcela */}
            <div
              className="rounded-2xl p-4"
              style={{ background: 'rgba(48,209,88,0.06)', border: '1px solid rgba(48,209,88,0.20)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#30d158' }}>
                Última Parcela
              </p>
              <p className="text-2xl font-semibold mt-1" style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}>
                {formatCurrency(lastInstallment)}
              </p>
            </div>

            {/* Total de Juros */}
            <div
              className="rounded-2xl p-4"
              style={{ background: 'rgba(255,214,10,0.08)', border: '1px solid rgba(255,214,10,0.30)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#b8860b' }}>
                Total de Juros
              </p>
              <p className="text-2xl font-semibold mt-1" style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}>
                {formatCurrency(result.totalInterest)}
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tabela de Amortização (Amostra)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table
                columns={tableColumns}
                data={result.installments.filter((_, i) => i === 0 || i % 12 === 0 || i === result.installments.length - 1)}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
