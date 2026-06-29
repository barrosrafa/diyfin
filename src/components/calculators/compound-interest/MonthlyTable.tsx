'use client'

import React, { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { CompoundInterestRow } from '@/lib/finance/types'
import { Table } from 'lucide-react'

interface MonthlyTableProps {
  rows: CompoundInterestRow[]
}

export function MonthlyTable({ rows }: MonthlyTableProps) {
  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 10,
  })

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{ border: '1px solid #d2d2d7', background: '#ffffff' }}
    >
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center gap-3"
        style={{ borderBottom: '1px solid #e5e5ea', background: '#f5f5f7' }}
      >
        <div className="p-2 rounded-xl" style={{ background: 'rgba(0,113,227,0.10)' }}>
          <Table className="w-4 h-4" style={{ color: '#0071e3' }} />
        </div>
        <div>
          <h3 className="text-sm font-semibold" style={{ color: '#1d1d1f' }}>
            Tabela de Evolução Mensal
          </h3>
          <p className="text-xs mt-0.5" style={{ color: '#6e6e73' }}>
            Detalhamento mês a mês do crescimento
          </p>
        </div>
      </div>

      {/* Virtualised scroll */}
      <div
        ref={parentRef}
        className="h-[400px] md:h-[500px] overflow-auto"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          <table className="w-full text-left border-collapse">
            <thead
              className="sticky top-0 z-10"
              style={{ background: '#f5f5f7', borderBottom: '1px solid #d2d2d7' }}
            >
              <tr>
                {['Mês', 'Saldo Inicial', 'Aporte', 'Juros', 'Saldo Final'].map((col, i) => (
                  <th
                    key={col}
                    className={`px-4 md:px-6 py-3 text-xs font-semibold uppercase tracking-wider${
                      i === 1 ? ' hidden sm:table-cell' : i === 3 ? ' hidden md:table-cell' : ''
                    }`}
                    style={{ color: '#6e6e73', letterSpacing: '0.04em' }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index]
                const isEven = virtualRow.index % 2 === 0
                return (
                  <tr
                    key={virtualRow.key}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                      background: isEven ? '#ffffff' : '#f5f5f7',
                      borderBottom: '1px solid #e5e5ea',
                    }}
                  >
                    <td className="px-4 md:px-6 py-3 text-sm font-semibold whitespace-nowrap" style={{ color: '#1d1d1f' }}>
                      {row.period}
                    </td>
                    <td className="px-4 md:px-6 py-3 text-sm hidden sm:table-cell" style={{ color: '#6e6e73' }}>
                      {formatCurrency(row.accumulated - row.monthlyInterest)}
                    </td>
                    <td className="px-4 md:px-6 py-3 text-sm" style={{ color: '#6e6e73' }}>
                      {formatCurrency(row.totalInvested)} 
                    </td>
                    <td className="px-4 md:px-6 py-3 text-sm font-medium hidden md:table-cell" style={{ color: '#30d158' }}>
                      <span className="inline-flex items-center gap-1">
                        <span>+</span>
                        {formatCurrency(row.monthlyInterest)}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 text-sm font-semibold whitespace-nowrap" style={{ color: '#0071e3' }}>
                      {formatCurrency(row.accumulated)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div
        className="px-6 py-3"
        style={{ borderTop: '1px solid #e5e5ea', background: '#f5f5f7' }}
      >
        <p className="text-xs" style={{ color: '#6e6e73' }}>
          <span style={{ color: '#1d1d1f', fontWeight: 600 }}>Total de períodos:</span>{' '}
          {rows.length} {rows.length === 1 ? 'mês' : 'meses'}
        </p>
      </div>
    </div>
  )
}
