import { useState, useCallback } from 'react'

export function parseCurrencyInput(value: string): number {
  const cleaned = value.replace(/[R$\s.]/g, '').replace(',', '.')
  const parsed = parseFloat(cleaned)
  return isNaN(parsed) ? 0 : parsed
}

export function useCurrencyInput(initialValue = 0) {
  const [displayValue, setDisplayValue] = useState(
    initialValue > 0 ? initialValue.toFixed(2).replace('.', ',') : ''
  )
  const [numericValue, setNumericValue] = useState(initialValue)

  const handleChange = useCallback((value: string) => {
    const cleaned = value.replace(/[^0-9.,]/g, '')
    setDisplayValue(cleaned)
    const parsed = parseCurrencyInput(cleaned)
    setNumericValue(parsed)
  }, [])

  const reset = useCallback(() => {
    setDisplayValue('')
    setNumericValue(0)
  }, [])

  return {
    displayValue,
    numericValue,
    handleChange,
    reset,
  }
}
