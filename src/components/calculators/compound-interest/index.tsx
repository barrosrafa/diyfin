'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { CalculatorForm } from './CalculatorForm'
import { ResultPanel } from './ResultPanel'
import { MonthlyTable } from './MonthlyTable'
import { useCalculatorForm } from './hooks/useCalculatorForm'
import { useCompoundInterest } from './hooks/useCompoundInterest'

const ChartSkeleton = () => (
  <div
    className="w-full h-[350px] md:h-[400px] animate-pulse rounded-2xl"
    style={{ background: '#f5f5f7', border: '1px solid #e5e5ea' }}
    aria-label="Carregando gráfico..."
  />
)

const EvolutionChart = dynamic(
  () => import('./EvolutionChart'),
  {
    ssr: false,
    loading: () => <ChartSkeleton />,
  }
)

export default function CompoundInterestCalculator() {
  const { values, errors, updateField } = useCalculatorForm()
  const { totalAmount, totalInvested, totalInterest, rows, chartData } = useCompoundInterest(values)

  return (
    <div className="w-full mx-auto space-y-8" style={{ maxWidth: '980px', padding: '0 0' }}>
      {/* Grid: Formulário + Resultados */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Formulário */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h2
              className="text-2xl md:text-3xl font-semibold"
              style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}
            >
              Simulador de Juros Compostos
            </h2>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: '#6e6e73' }}>
              Planeje seu futuro financeiro simulando o crescimento do seu patrimônio ao longo do tempo.
            </p>
          </div>
          <CalculatorForm values={values} errors={errors} onChange={updateField} />
        </div>

        {/* Resultados + Gráfico */}
        <div className="lg:col-span-7 space-y-6">
          <ResultPanel
            totalAmount={totalAmount}
            totalInvested={totalInvested}
            totalInterest={totalInterest}
          />
          <EvolutionChart data={chartData} />
        </div>
      </div>

      {/* Tabela */}
      <div className="pt-2 md:pt-4">
        <MonthlyTable rows={rows} />
      </div>

      {/* Dicas */}
      <div
        className="rounded-2xl p-6 md:p-8"
        style={{ background: '#f5f5f7', border: '1px solid #e5e5ea' }}
      >
        <div className="max-w-3xl">
          <h3 className="text-lg font-semibold mb-3" style={{ color: '#1d1d1f' }}>
            Como usar esta calculadora
          </h3>
          <ul className="space-y-2 text-sm" style={{ color: '#6e6e73' }}>
            {[
              ['Capital inicial', 'valor que você já tem guardado'],
              ['Aporte mensal', 'quanto você pretende investir por mês'],
              ['Taxa de juros', 'rentabilidade esperada do investimento'],
              ['Período', 'horizonte de tempo do investimento'],
            ].map(([bold, rest], i) => (
              <li key={i} className="flex gap-3">
                <span style={{ color: '#0071e3', fontWeight: 700 }}>{i + 1}.</span>
                <span>
                  Insira seu <strong style={{ color: '#1d1d1f', fontWeight: 600 }}>{bold}</strong> ({rest})
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
