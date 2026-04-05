'use client'

import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

interface EvolutionChartProps {
  data: Array<{
    periodo: string
    investido: number
    juros: number
  }>
}

/**
 * Gráfico de evolução patrimonial.
 * Utiliza Recharts para exibir o crescimento do capital investido vs juros.
 */
export default function EvolutionChart({ data }: EvolutionChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="w-full h-[350px] bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Evolução do Patrimônio</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis 
            dataKey="periodo" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            tickFormatter={formatCurrency}
            width={80}
          />
          <Tooltip 
            formatter={(value: number) => [formatCurrency(value), '']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
          <Area
            type="monotone"
            dataKey="investido"
            stackId="1"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.8}
            name="Capital Investido"
          />
          <Area
            type="monotone"
            dataKey="juros"
            stackId="1"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.8}
            name="Juros Acumulados"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
