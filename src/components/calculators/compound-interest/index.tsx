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
 * Evita Layout Shift (CLS) e melhora a percepção de performance.
 */
const ChartSkeleton = () => (
  <div
    className="w-full h-[350px] md:h-[400px] bg-gradient-to-br from-slate-100 to-slate-50 animate-pulse rounded-lg border border-slate-200 shadow-sm"
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
 * Orquestrador da Calculadora de Juros Compostos com design Pro Max.
 * Agrega todos os sub-componentes e gerencia o fluxo de dados com layout responsivo.
 */
export default function CompoundInterestCalculator() {
  const { values, errors, updateField } = useCalculatorForm()
  const { montanteFinal, totalInvestido, totalJuros, schedule, chartData } = useCompoundInterest(values)

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-4 md:p-6 lg:p-8">
      {/* Grid Responsivo: Formulário e Resultados */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Coluna do Formulário - Desktop: 5 colunas, Mobile: Full */}
        <div className="lg:col-span-5 space-y-6">
          {/* Cabeçalho da Seção */}
          <div className="space-y-2 px-1">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Simulador de Juros Compostos
            </h2>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Planeje seu futuro financeiro simulando o crescimento do seu patrimônio ao longo do tempo com diferentes cenários.
            </p>
          </div>
          
          {/* Formulário */}
          <CalculatorForm 
            values={values} 
            errors={errors} 
            onChange={updateField} 
          />
        </div>

        {/* Coluna de Resultados e Gráfico - Desktop: 7 colunas, Mobile: Full */}
        <div className="lg:col-span-7 space-y-6">
          {/* Painel de Resultados */}
          <ResultPanel 
            montanteFinal={montanteFinal} 
            totalInvestido={totalInvestido} 
            totalJuros={totalJuros} 
          />
          
          {/* Gráfico de Evolução */}
          <EvolutionChart data={chartData} />
        </div>
      </div>

      {/* Tabela de Evolução (Largura Total) */}
      <div className="pt-2 md:pt-4">
        <MonthlyTable schedule={schedule} />
      </div>

      {/* Seção de Informações Adicionais */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6 md:p-8">
        <div className="max-w-3xl">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">💡 Como usar esta calculadora</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">1.</span>
              <span>Insira seu <strong>capital inicial</strong> (valor que você já tem guardado)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">2.</span>
              <span>Defina o <strong>aporte mensal</strong> (quanto você pretende investir por mês)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">3.</span>
              <span>Configure a <strong>taxa de juros</strong> (rentabilidade esperada do investimento)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">4.</span>
              <span>Escolha o <strong>período</strong> (horizonte de tempo do investimento)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
