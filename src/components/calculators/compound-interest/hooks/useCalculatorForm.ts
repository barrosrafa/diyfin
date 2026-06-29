import { useState, useCallback } from 'react'
import { CalculatorFormSchema, CalculatorFormValues } from '@/lib/schemas/compound-interest.schema'

/**
 * Hook para gerenciar o estado e validação do formulário de juros compostos.
 * Implementa o padrão Facade para simplificar o acesso ao estado.
 */
export function useCalculatorForm() {
  const [values, setValues] = useState<CalculatorFormValues>({
    capitalInicial: 10000,
    aporteMensal: 500,
    taxaInput: 1,
    taxaBase: 'mensal',
    periodoInput: 10,
    periodoUnidade: 'anos',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof CalculatorFormValues, string>>>({})

  const updateField = useCallback((field: keyof CalculatorFormValues, value: any) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value }
      
      // Validação em tempo real via Zod
      const result = CalculatorFormSchema.safeParse(next)
      if (!result.success) {
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
