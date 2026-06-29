'use client'

import React, { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { MonthlyRow } from '@/lib/calculators/compound-interest'
import { Table } from 'lucide-react'

interface MonthlyTableProps {
  schedule: MonthlyRow[]
}

/**
 * Tabela virtualizada para exibir a evolução mês a mês com design Pro Max.
 * Suporta até 600 linhas com alta performance e responsividade.
 */
export function MonthlyTable({ schedule }: MonthlyTableProps) {
  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: schedule.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 10,
  })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return (
    <div className="w-full bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Header da Tabela */}
      <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center gap-3">
        <div className="p-2 bg-sky-100 rounded-lg">
          <Table className="w-4 h-4 text-sky-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Tabela de Evolução Mensal</h3>
          <p className="text-xs text-slate-500 mt-0.5">Detalhamento mês a mês do crescimento</p>
        </div>
      </div>
      
      {/* Container com Scroll Virtualizado */}
      <div
        ref={parentRef}
        className="h-[400px] md:h-[500px] overflow-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-50"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          <table className="w-full text-left border-collapse">
            {/* Header Sticky */}
            <thead className="sticky top-0 bg-gradient-to-r from-slate-50 to-slate-50/50 z-10 shadow-sm border-b border-slate-200">
              <tr>
                <th className="px-4 md:px-6 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider">Mês</th>
                <th className="px-4 md:px-6 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider hidden sm:table-cell">Saldo Inicial</th>
                <th className="px-4 md:px-6 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider">Aporte</th>
                <th className="px-4 md:px-6 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider hidden md:table-cell">Juros</th>
                <th className="px-4 md:px-6 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider">Saldo Final</th>
              </tr>
            </thead>
            
            {/* Body com Linhas Virtualizadas */}
            <tbody>
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = schedule[virtualRow.index]
                const isEvenRow = virtualRow.index % 2 === 0
                
                return (
                  <tr
                    key={virtualRow.key}
                    className={`border-b border-slate-100 transition-colors duration-150 ${
                      isEvenRow 
                        ? 'bg-white hover:bg-sky-50/50' 
                        : 'bg-slate-50/30 hover:bg-sky-50/50'
                    }`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    {/* Coluna: Mês */}
                    <td className="px-4 md:px-6 py-3 text-sm font-semibold text-slate-900 whitespace-nowrap">
                      {row.mes}
                    </td>
                    
                    {/* Coluna: Saldo Inicial (Hidden em Mobile) */}
                    <td className="px-4 md:px-6 py-3 text-sm text-slate-600 hidden sm:table-cell">
                      {formatCurrency(row.saldoInicial)}
                    </td>
                    
                    {/* Coluna: Aporte */}
                    <td className="px-4 md:px-6 py-3 text-sm text-slate-600">
                      {formatCurrency(row.aporte)}
                    </td>
                    
                    {/* Coluna: Juros (Hidden em Mobile) */}
                    <td className="px-4 md:px-6 py-3 text-sm font-medium text-emerald-600 hidden md:table-cell">
                      <span className="inline-flex items-center gap-1">
                        <span className="text-emerald-500">+</span>
                        {formatCurrency(row.jurosMes)}
                      </span>
                    </td>
                    
                    {/* Coluna: Saldo Final */}
                    <td className="px-4 md:px-6 py-3 text-sm font-bold text-sky-900 whitespace-nowrap">
                      {formatCurrency(row.saldoFinal)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer com Informação */}
      <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-100 rounded-b-lg">
        <p className="text-xs text-slate-600">
          <span className="font-medium text-slate-700">📋 Total de períodos:</span> {schedule.length} {schedule.length === 1 ? 'mês' : 'meses'}
        </p>
      </div>
    </div>
  )
}
