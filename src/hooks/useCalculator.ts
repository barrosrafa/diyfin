import { useState, useCallback } from 'react'

export interface CalculatorState<TInput, TResult> {
  input: TInput
  result: TResult | null
  isCalculated: boolean
  errors: Partial<Record<keyof TInput, string>>
}

export function useCalculator<TInput extends object, TResult>(
  initialInput: TInput,
  calculateFn: (input: TInput) => TResult,
  validateFn?: (input: TInput) => Partial<Record<keyof TInput, string>>
) {
  const [state, setState] = useState<CalculatorState<TInput, TResult>>({
    input: initialInput,
    result: null,
    isCalculated: false,
    errors: {},
  })

  const setField = useCallback(
    <K extends keyof TInput>(field: K, value: TInput[K]) => {
      setState(prev => ({
        ...prev,
        input: { ...prev.input, [field]: value },
        errors: { ...prev.errors, [field]: undefined },
      }))
    },
    []
  )

  const calculate = useCallback(() => {
    if (validateFn) {
      const errors = validateFn(state.input)
      if (Object.keys(errors).length > 0) {
        setState(prev => ({ ...prev, errors }))
        return
      }
    }

    try {
      const result = calculateFn(state.input)
      setState(prev => ({
        ...prev,
        result,
        isCalculated: true,
        errors: {},
      }))
    } catch (error) {
      console.error('Erro de cálculo:', error)
    }
  }, [state.input, calculateFn, validateFn])

  const reset = useCallback(() => {
    setState({
      input: initialInput,
      result: null,
      isCalculated: false,
      errors: {},
    })
  }, [initialInput])

  return {
    input: state.input,
    result: state.result,
    isCalculated: state.isCalculated,
    errors: state.errors,
    setField,
    calculate,
    reset,
  }
}
