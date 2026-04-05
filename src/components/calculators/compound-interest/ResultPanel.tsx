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
 * Exibe os totais calculados de forma visual, clara e responsiva com design Pro Max.
 */
export function ResultPanel({ montanteFinal, totalInvestido, totalJuros }: ResultPanelProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const jurosPercent = montanteFinal > 0 ? (totalJuros / montanteFinal) * 100 : 0

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Montante Final - Card Principal */}
      <Card className="border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50/50 shadow-sm hover:shadow-md transition-shadow duration-200 lg:col-span-1 sm:col-span-2 lg:sm:col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-sky-700 flex items-center gap-2">
            <div className="p-2 bg-sky-100 rounded-lg">
              <TrendingUp className="w-4 h-4 text-sky-600" />
            </div>
            Montante Final
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-sky-900" role="status" aria-live="polite">
              {formatCurrency(montanteFinal)}
            </div>
            <p className="text-xs text-sky-600 font-medium">
              Seu patrimônio total após o período
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Total Investido - Card Secundário */}
      <Card className="border-slate-200 bg-gradient-to-br from-slate-50 to-slate-50/50 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Wallet className="w-4 h-4 text-slate-600" />
            </div>
            Total Investido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-slate-900" role="status" aria-live="polite">
              {formatCurrency(totalInvestido)}
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Valor que você aplicou
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Total em Juros - Card Destaque */}
      <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50/50 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-emerald-700 flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <PieChart className="w-4 h-4 text-emerald-600" />
            </div>
            Ganho em Juros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-2xl font-bold text-emerald-900" role="status" aria-live="polite">
              {formatCurrency(totalJuros)}
            </div>
            
            {/* Barra de Progresso Melhorada */}
            <div className="space-y-2">
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-green-500 h-full transition-all duration-700 ease-out rounded-full" 
                  style={{ width: `${Math.min(jurosPercent, 100)}%` }}
                  role="progressbar"
                  aria-valuenow={Math.round(jurosPercent)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs font-semibold text-emerald-700">
                  {jurosPercent.toFixed(1)}% do total
                </p>
                <p className="text-xs text-slate-500">
                  Rendimento
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
