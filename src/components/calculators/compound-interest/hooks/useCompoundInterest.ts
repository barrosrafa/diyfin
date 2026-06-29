import { useMemo } from 'react'
import { calculateMonthlySchedule, convertAnnualToMonthlyRate } from '@/lib/calculators/compound-interest'
import { CalculatorFormValues } from '@/lib/schemas/compound-interest.schema'

/**
 * Hook para orquestrar o cálculo de juros compostos a partir dos valores do formulário.
 * Deriva os resultados de forma reativa usando useMemo.
 */
export function useCompoundInterest(values: CalculatorFormValues) {
  const result = useMemo(() => {
    const { 
      capitalInicial, 
      aporteMensal, 
      taxaInput, 
      taxaBase, 
      periodoInput, 
      periodoUnidade 
    } = values

    // Normaliza a taxa para mensal decimal
    const taxaDecimal = taxaInput / 100
    const taxaMensal = taxaBase === 'anual' 
      ? convertAnnualToMonthlyRate(taxaDecimal) 
      : taxaDecimal

    // Normaliza o período para meses
    const totalMeses = periodoUnidade === 'anos' 
      ? periodoInput * 12 
      : periodoInput

    return calculateMonthlySchedule({
      capitalInicial,
      aporteMensal,
      taxaMensal,
      totalMeses
    })
  }, [values])

  // Dados formatados para o gráfico (amostragem anual para evitar poluição)
  const chartData = useMemo(() => {
    const { schedule } = result
    
    // Inclui o ponto inicial (mês 0) e pontos a cada 12 meses
    const data = [
      {
        periodo: 'Início',
        investido: result.schedule[0]?.saldoInicial || 0,
        juros: 0,
      }
    ]

    schedule.forEach((row) => {
      if (row.mes % 12 === 0 || row.mes === schedule.length) {
        const ano = Math.ceil(row.mes / 12)
        data.push({
          periodo: `Ano ${ano}`,
          investido: row.totalInvestido,
          juros: row.totalJuros,
        })
      }
    })

    return data
  }, [result])

  return {
    ...result,
    chartData
  }
}
