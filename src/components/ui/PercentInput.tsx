'use client'

import React, { useState, useEffect } from 'react'

interface PercentInputProps {
  id?: string
  value: number
  onChange: (value: number) => void
  placeholder?: string
  className?: string
  style?: React.CSSProperties
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export function PercentInput({
  id,
  value,
  onChange,
  placeholder,
  className,
  style,
  onFocus,
  onBlur,
}: PercentInputProps) {
  const [displayValue, setDisplayValue] = useState('')

  const format = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(val) + '%'
  }

  useEffect(() => {
    setDisplayValue(format(value))
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/[^\d,]/g, '').replace(',', '.')
    let numericValue = parseFloat(rawValue)
    
    if (isNaN(numericValue)) numericValue = 0
    if (numericValue > 100) numericValue = 100
    
    onChange(numericValue)
  }

  // Melhora a UX: ao focar, mostra apenas o número para edição
  const handleFocusLocal = (e: React.FocusEvent<HTMLInputElement>) => {
    setDisplayValue(value.toString().replace('.', ','))
    onFocus?.(e)
  }

  const handleBlurLocal = (e: React.FocusEvent<HTMLInputElement>) => {
    setDisplayValue(format(value))
    onBlur?.(e)
  }

  return (
    <input
      id={id}
      type="text"
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      style={style}
      onFocus={handleFocusLocal}
      onBlur={handleBlurLocal}
    />
  )
}
