import { useMemo } from 'react'
import { calculateCompoundInterest } from '@/lib/finance/compound-interest'
import { CalculatorFormValues } from '@/lib/schemas/compound-interest.schema'

export function useCompoundInterest(values: CalculatorFormValues) {
  const result = useMemo(() => {
    return calculateCompoundInterest(values)
  }, [values])

  const chartData = useMemo(() => {
    const { rows } = result
    
    const data = [
      {
        periodo: 'Início',
        investido: rows[0]?.totalInvested || 0,
        juros: 0,
      }
    ]

    rows.forEach((row) => {
      if (row.period > 0 && (row.period % 12 === 0 || row.period === rows.length - 1)) {
        const ano = Math.ceil(row.period / 12)
        data.push({
          periodo: `Ano ${ano}`,
          investido: row.totalInvested,
          juros: row.accumulatedInterest,
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
