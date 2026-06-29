'use client'

import React, { useState, useMemo } from 'react'
import { calcularSAC } from '@/lib/finance/sac-engine'
import { formatarMoeda } from '@/lib/finance/utils'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table } from '@/components/ui/table'

export default function FinancingSACCalculator() {
  const [principal, setPrincipal] = useState(200000)
  const [taxaAnual, setTaxaAnual] = useState(9.5)
  const [prazoAnos, setPrazoAnos] = useState(30)

  const result = useMemo(() => {
    const prazoMeses = (Number(prazoAnos) || 0) * 12
    const taxaMensalDecimal = (Math.pow(1 + (Number(taxaAnual) || 0) / 100, 1 / 12) - 1)
    return calcularSAC({
      principal: Number(principal) || 0,
      taxaMensal: taxaMensalDecimal,
      prazoMeses,
    })
  }, [principal, taxaAnual, prazoAnos])

  const primeiraParcela = result.parcelas[0]?.prestacaoTotal || 0
  const ultimaParcela = result.parcelas[result.parcelas.length - 1]?.prestacaoTotal || 0

  const tableColumns = [
    { key: 'numero', label: 'Parcela' },
    { key: 'prestacaoTotal', label: 'Prestação', format: (v: number) => formatarMoeda(v) },
    { key: 'amortizacao', label: 'Amortização', format: (v: number) => formatarMoeda(v) },
    { key: 'juros', label: 'Juros', format: (v: number) => formatarMoeda(v) },
    { key: 'saldoDevedor', label: 'Saldo Devedor', format: (v: number) => formatarMoeda(v) },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2 px-1">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Financiamento Imobiliário (SAC)</h2>
            <p className="text-sm md:text-base text-slate-600">
              Simule financiamento com parcelas decrescentes no Sistema de Amortização Constante (SAC).
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dados do Financiamento</CardTitle>
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
                  value={taxaAnual}
                  onChange={(e) => setTaxaAnual(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Prazo do Financiamento (Anos)</Label>
                <Input
                  type="number"
                  value={prazoAnos}
                  onChange={(e) => setPrazoAnos(Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="status" aria-live="polite">
            <Card className="bg-sky-50 border-sky-200">
              <CardContent className="p-4">
                <p className="text-xs text-sky-700 font-semibold uppercase tracking-wider">Primeira Parcela</p>
                <p className="text-2xl font-bold text-sky-900 mt-1">{formatarMoeda(primeiraParcela)}</p>
              </CardContent>
            </Card>
            <Card className="bg-emerald-50 border-emerald-200">
              <CardContent className="p-4">
                <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wider">Última Parcela</p>
                <p className="text-2xl font-bold text-emerald-900 mt-1">{formatarMoeda(ultimaParcela)}</p>
              </CardContent>
            </Card>
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <p className="text-xs text-amber-700 font-semibold uppercase tracking-wider">Total de Juros</p>
                <p className="text-2xl font-bold text-amber-900 mt-1">{formatarMoeda(result.totalJuros)}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tabela de Amortização (Amostra)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table columns={tableColumns} data={result.parcelas.filter((_, i) => i === 0 || i % 12 === 0 || i === result.parcelas.length - 1)} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
