'use client'

import React, { useState, useEffect } from 'react'

interface CurrencyInputProps {
  id?: string
  value: number
  onChange: (value: number) => void
  placeholder?: string
  className?: string
  style?: React.CSSProperties
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export function CurrencyInput({
  id,
  value,
  onChange,
  placeholder,
  className,
  style,
  onFocus,
  onBlur,
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState('')

  const format = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val)
  }

  useEffect(() => {
    setDisplayValue(format(value))
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '')
    const numericValue = Number(rawValue) / 100
    onChange(numericValue)
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
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}
