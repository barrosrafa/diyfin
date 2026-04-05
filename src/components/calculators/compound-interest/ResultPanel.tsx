'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Wallet, PieChart } from 'lucide-react'

interface ResultPanelProps {
  montanteFinal: number
  totalInvestido: number
  totalJuros: number
}

/**
 * Painel de resultados com cards de destaque.
 * Exibe os totais calculados de forma visual e clara.
 */
export function ResultPanel({ montanteFinal, totalInvestido, totalJuros }: ResultPanelProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const jurosPercent = (totalJuros / montanteFinal) * 100

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Montante Final */}
      <Card className="border-blue-100 bg-blue-50/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-600 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Montante Final
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900" role="status" aria-live="polite">
            {formatCurrency(montanteFinal)}
          </div>
        </CardContent>
      </Card>

      {/* Total Investido */}
      <Card className="border-gray-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            Total Investido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900" role="status" aria-live="polite">
            {formatCurrency(totalInvestido)}
          </div>
        </CardContent>
      </Card>

      {/* Total em Juros */}
      <Card className="border-emerald-100 bg-emerald-50/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-emerald-600 flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Total em Juros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-900" role="status" aria-live="polite">
            {formatCurrency(totalJuros)}
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-500" 
              style={{ width: `${jurosPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-emerald-600 mt-1 font-medium">
            {jurosPercent.toFixed(1)}% do total são juros
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
