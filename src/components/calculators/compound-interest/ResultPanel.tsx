'use client'

import React from 'react'
import { TrendingUp, Wallet, PieChart } from 'lucide-react'

interface ResultPanelProps {
  totalAmount: number
  totalInvested: number
  totalInterest: number
}

export function ResultPanel({ totalAmount, totalInvested, totalInterest }: ResultPanelProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

  const jurosPercent = totalAmount > 0 ? (totalInterest / totalAmount) * 100 : 0

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {/* Montante Final */}
      <div
        className="rounded-2xl p-5 sm:col-span-2 lg:col-span-1"
        style={{
          background: 'rgba(0,113,227,0.06)',
          border: '1px solid rgba(0,113,227,0.18)',
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            className="p-2 rounded-xl"
            style={{ background: 'rgba(0,113,227,0.12)' }}
          >
            <TrendingUp className="w-4 h-4" style={{ color: '#0071e3' }} />
          </div>
          <span className="text-sm font-semibold" style={{ color: '#0071e3' }}>
            Montante Final
          </span>
        </div>
        <div
          className="text-3xl font-semibold"
          style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}
          role="status"
          aria-live="polite"
        >
          {formatCurrency(totalAmount)}
        </div>
        <p className="text-xs mt-1" style={{ color: '#6e6e73' }}>
          Seu patrimônio total após o período
        </p>
      </div>

      {/* Total Investido */}
      <div
        className="rounded-2xl p-5"
        style={{ background: '#f5f5f7', border: '1px solid #e5e5ea' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-xl" style={{ background: '#ffffff' }}>
            <Wallet className="w-4 h-4" style={{ color: '#6e6e73' }} />
          </div>
          <span className="text-sm font-semibold" style={{ color: '#6e6e73' }}>
            Total Investido
          </span>
        </div>
        <div
          className="text-2xl font-semibold"
          style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}
          role="status"
          aria-live="polite"
        >
          {formatCurrency(totalInvested)}
        </div>
        <p className="text-xs mt-1" style={{ color: '#86868b' }}>
          Valor que você aplicou
        </p>
      </div>

      {/* Ganho em Juros */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: 'rgba(48,209,88,0.06)',
          border: '1px solid rgba(48,209,88,0.20)',
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-xl" style={{ background: 'rgba(48,209,88,0.12)' }}>
            <PieChart className="w-4 h-4" style={{ color: '#30d158' }} />
          </div>
          <span className="text-sm font-semibold" style={{ color: '#30d158' }}>
            Ganho em Juros
          </span>
        </div>
        <div
          className="text-2xl font-semibold"
          style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}
          role="status"
          aria-live="polite"
        >
          {formatCurrency(totalInterest)}
        </div>

        {/* Progress bar */}
        <div className="mt-3 space-y-1.5">
          <div
            className="w-full rounded-full h-1.5 overflow-hidden"
            style={{ background: '#d2d2d7' }}
          >
            <div
              className="h-full transition-all duration-700 ease-out rounded-full"
              style={{
                width: `${Math.min(jurosPercent, 100)}%`,
                background: '#30d158',
              }}
              role="progressbar"
              aria-valuenow={Math.round(jurosPercent)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs font-semibold" style={{ color: '#30d158' }}>
              {jurosPercent.toFixed(1)}% do total
            </p>
            <p className="text-xs" style={{ color: '#86868b' }}>Rendimento</p>
          </div>
        </div>
      </div>
    </div>
  )
}
