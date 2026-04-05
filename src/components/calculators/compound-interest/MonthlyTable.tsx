'use client'

import React, { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { MonthlyRow } from '@/lib/calculators/compound-interest'

interface MonthlyTableProps {
  schedule: MonthlyRow[]
}

/**
 * Tabela virtualizada para exibir a evolução mês a mês.
 * Suporta até 600 linhas com alta performance.
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
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-700">Tabela de Evolução Mensal</h3>
      </div>
      
      <div
        ref={parentRef}
        className="h-[400px] overflow-auto scrollbar-thin scrollbar-thumb-gray-200"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-gray-50 z-10 shadow-sm">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Mês</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Saldo Inicial</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Aporte</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Juros</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Saldo Final</th>
              </tr>
            </thead>
            <tbody>
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = schedule[virtualRow.index]
                return (
                  <tr
                    key={virtualRow.key}
                    className={`border-b border-gray-50 hover:bg-blue-50/30 transition-colors ${
                      virtualRow.index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
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
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.mes}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{formatCurrency(row.saldoInicial)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{formatCurrency(row.aporte)}</td>
                    <td className="px-4 py-3 text-sm text-emerald-600 font-medium">+{formatCurrency(row.jurosMes)}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-blue-900">{formatCurrency(row.saldoFinal)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
