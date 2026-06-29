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

export default function EvolutionChart({ data }: EvolutionChartProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value)

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
          <BarChart3 className="w-4 h-4" style={{ color: '#0071e3' }} />
        </div>
        <div>
          <h3 className="text-sm font-semibold" style={{ color: '#1d1d1f' }}>
            Evolução do Patrimônio
          </h3>
          <p className="text-xs mt-0.5" style={{ color: '#6e6e73' }}>
            Visualização do crescimento ao longo do tempo
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[350px] md:h-[400px] p-4 md:p-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5ea" opacity={0.6} />
            <XAxis
              dataKey="periodo"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6e6e73', fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6e6e73', fontWeight: 500 }}
              tickFormatter={formatCurrency}
              width={85}
            />
            <Tooltip
              formatter={(value) => [formatCurrency(typeof value === 'number' ? value : 0), '']}
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #d2d2d7',
                boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                backgroundColor: '#ffffff',
                padding: '12px 16px',
              }}
              labelStyle={{ color: '#1d1d1f', fontWeight: 600, marginBottom: '8px' }}
              wrapperStyle={{ outline: 'none' }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: '20px', color: '#6e6e73', fontSize: '12px' }}
            />
            <Area
              type="monotone"
              dataKey="investido"
              stackId="1"
              stroke="#0071e3"
              fill="#0071e3"
              fillOpacity={0.12}
              strokeWidth={2}
              name="Capital Investido"
              dot={false}
              activeDot={{ r: 5, fillOpacity: 0.9 }}
            />
            <Area
              type="monotone"
              dataKey="juros"
              stackId="1"
              stroke="#30d158"
              fill="#30d158"
              fillOpacity={0.12}
              strokeWidth={2}
              name="Juros Acumulados"
              dot={false}
              activeDot={{ r: 5, fillOpacity: 0.9 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div
        className="px-6 py-3"
        style={{ borderTop: '1px solid #e5e5ea', background: '#f5f5f7' }}
      >
        <p className="text-xs" style={{ color: '#6e6e73' }}>
          <span style={{ color: '#1d1d1f', fontWeight: 600 }}>Nota:</span> Azul = capital investido · Verde = juros gerados.
        </p>
      </div>
    </div>
  )
}
