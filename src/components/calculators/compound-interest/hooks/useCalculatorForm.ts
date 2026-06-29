import { useState, useCallback } from 'react'
import { CalculatorFormSchema, CalculatorFormValues } from '@/lib/schemas/compound-interest.schema'

/**
 * Hook para gerenciar o estado e validação do formulário de juros compostos.
 * Implementa o padrão Facade para simplificar o acesso ao estado.
 */
export function useCalculatorForm() {
  const [values, setValues] = useState<CalculatorFormValues>({
    initialValue: 10000,
    monthlyContribution: 500,
    rate: 1,
    rateType: 'monthly',
    period: 10,
    periodType: 'years',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof CalculatorFormValues, string>>>({})

  const updateField = useCallback((field: keyof CalculatorFormValues, value: any) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value }
      
      // Validação em tempo real via Zod
      const result = CalculatorFormSchema.safeParse(next)
      if (!result.success && result.error) {
        const fieldError = result.error.issues.find(e => e.path[0] === field)
        setErrors(prevErrors => ({
          ...prevErrors,
          [field]: fieldError?.message
        }))
      } else {
        setErrors(prevErrors => {
          const nextErrors = { ...prevErrors }
          delete nextErrors[field]
          return nextErrors
        })
      }
      
      return next
    })
  }, [])

  return {
    values,
    errors,
    updateField
  }
}
