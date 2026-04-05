'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { CalculatorForm } from './CalculatorForm'
import { ResultPanel } from './ResultPanel'
import { MonthlyTable } from './MonthlyTable'
import { useCalculatorForm } from './hooks/useCalculatorForm'
import { useCompoundInterest } from './hooks/useCompoundInterest'

/**
 * Skeleton para o gráfico durante o carregamento dinâmico.
 * Evita Layout Shift (CLS).
 */
const ChartSkeleton = () => (
  <div
    className="w-full h-[350px] bg-gray-100 animate-pulse rounded-xl border border-gray-200"
    aria-label="Carregando gráfico..."
  />
)

/**
 * Carregamento dinâmico do gráfico para melhorar performance inicial (FCP).
 */
const EvolutionChart = dynamic(
  () => import('./EvolutionChart'),
  {
    ssr: false,
    loading: () => <ChartSkeleton />,
  }
)

/**
 * Orquestrador da Calculadora de Juros Compostos.
 * Agrega todos os sub-componentes e gerencia o fluxo de dados.
 */
export default function CompoundInterestCalculator() {
  const { values, errors, updateField } = useCalculatorForm()
  const { montanteFinal, totalInvestido, totalJuros, schedule, chartData } = useCompoundInterest(values)

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Coluna do Formulário */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Simulador de Juros Compostos</h2>
            <p className="text-sm text-gray-500">
              Planeje seu futuro financeiro simulando o crescimento do seu patrimônio ao longo do tempo.
            </p>
          </div>
          
          <CalculatorForm 
            values={values} 
            errors={errors} 
            onChange={updateField} 
          />
        </div>

        {/* Coluna de Resultados e Gráfico */}
        <div className="lg:col-span-7 space-y-6">
          <ResultPanel 
            montanteFinal={montanteFinal} 
            totalInvestido={totalInvestido} 
            totalJuros={totalJuros} 
          />
          
          <EvolutionChart data={chartData} />
        </div>
      </div>

      {/* Tabela de Evolução (Largura Total) */}
      <div className="pt-4">
        <MonthlyTable schedule={schedule} />
      </div>
    </div>
  )
}
