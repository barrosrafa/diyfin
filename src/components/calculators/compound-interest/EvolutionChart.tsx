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
import { BarChart3 } from 'lucide-react'

interface EvolutionChartProps {
  data: Array<{
    periodo: string
    investido: number
    juros: number
  }>
}

/**
 * Gráfico de evolução patrimonial com design Pro Max.
 * Utiliza Recharts para exibir o crescimento do capital investido vs juros com melhor UX.
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
    <div className="w-full bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Header do Gráfico */}
      <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center gap-3">
        <div className="p-2 bg-sky-100 rounded-lg">
          <BarChart3 className="w-4 h-4 text-sky-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Evolução do Patrimônio</h3>
          <p className="text-xs text-slate-500 mt-0.5">Visualização do crescimento ao longo do tempo</p>
        </div>
      </div>

      {/* Container do Gráfico */}
      <div className="w-full h-[350px] md:h-[400px] p-4 md:p-6">
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
            {/* Grid melhorado */}
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#e2e8f0" 
              opacity={0.5}
            />
            
            {/* Eixo X */}
            <XAxis 
              dataKey="periodo" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }}
              dy={10}
            />
            
            {/* Eixo Y */}
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }}
              tickFormatter={formatCurrency}
              width={85}
            />
            
            {/* Tooltip Melhorado */}
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), '']}
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
                backgroundColor: '#ffffff',
                padding: '12px 16px'
              }}
              labelStyle={{ color: '#1e293b', fontWeight: 600, marginBottom: '8px' }}
              wrapperStyle={{ outline: 'none' }}
            />
            
            {/* Legenda Melhorada */}
            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="circle" 
              wrapperStyle={{ paddingBottom: '20px' }}
              iconStyle={{ borderRadius: '50%' }}
            />
            
            {/* Área de Capital Investido */}
            <Area
              type="monotone"
              dataKey="investido"
              stackId="1"
              stroke="#0ea5e9"
              fill="#0ea5e9"
              fillOpacity={0.15}
              strokeWidth={2}
              name="Capital Investido"
              dot={false}
              activeDot={{ r: 6, fillOpacity: 0.8 }}
            />
            
            {/* Área de Juros Acumulados */}
            <Area
              type="monotone"
              dataKey="juros"
              stackId="1"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.15}
              strokeWidth={2}
              name="Juros Acumulados"
              dot={false}
              activeDot={{ r: 6, fillOpacity: 0.8 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer com informação */}
      <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-100 rounded-b-lg">
        <p className="text-xs text-slate-600">
          <span className="font-medium text-slate-700">📊 Nota:</span> O gráfico mostra o crescimento acumulado do seu capital investido (azul) e os juros gerados (verde).
        </p>
      </div>
    </div>
  )
}
