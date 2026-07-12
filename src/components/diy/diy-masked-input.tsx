'use client'

import React from 'react'
import { IMaskInput, IMaskInputProps } from 'react-imask'
import { cn } from '@/lib/utils'
import { diyTokens } from './tokens'
import { CURRENCY_MASK, PERCENT_MASK } from '@/lib/masks'

const baseClass =
  'flex w-full text-sm placeholder:text-[#86868b] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'

const baseStyle: React.CSSProperties = {
  height: '42px',
  padding: '0 14px',
  background: diyTokens.color.surface,
  border: `1px solid ${diyTokens.color.border}`,
  borderRadius: diyTokens.radius.input,
  color: diyTokens.color.text,
  fontSize: '0.95rem',
  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
}

export interface DiyMaskedInputProps
  extends Omit<IMaskInputProps<HTMLInputElement>, 'onAccept' | 'mask' | 'value'> {
  mask: any
  value: string | number
  onValueChange: (value: number) => void
  error?: string
  className?: string
}

/**
 * Base para inputs mascarados. Substitui o padrão duplicado que existia
 * apenas em CalculatorForm.tsx (compound-interest) por um componente
 * reutilizável, aplicável às 8 calculadoras.
 */
export const DiyMaskedInput = React.forwardRef<HTMLInputElement, DiyMaskedInputProps>(
  ({ mask, value, onValueChange, error, className, style, ...props }, ref) => {
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.currentTarget.style.borderColor = diyTokens.color.primary
      e.currentTarget.style.boxShadow = `0 0 0 3px ${diyTokens.color.primaryRing}`
    }
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      e.currentTarget.style.borderColor = error ? diyTokens.color.danger : diyTokens.color.border
      e.currentTarget.style.boxShadow = 'none'
    }

    return (
      <div className="space-y-1.5">
        <IMaskInput
          ref={ref}
          {...mask}
          value={value.toString()}
          unmask
          onAccept={(val: string) => onValueChange(Number(val) || 0)}
          className={cn(baseClass, className)}
          style={{
            ...baseStyle,
            borderColor: error ? diyTokens.color.danger : diyTokens.color.border,
            ...style,
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {error && (
          <p className="text-xs font-medium" style={{ color: diyTokens.color.danger }}>
            {error}
          </p>
        )}
      </div>
    )
  }
)
DiyMaskedInput.displayName = 'DiyMaskedInput'

export interface DiyCurrencyInputProps
  extends Omit<DiyMaskedInputProps, 'mask'> {}

/** Input de moeda (R$) com máscara real via react-imask. Antes era um alias vazio no ds. */
export const DiyCurrencyInput = React.forwardRef<HTMLInputElement, DiyCurrencyInputProps>(
  ({ placeholder = 'R$ 0,00', ...props }, ref) => (
    <DiyMaskedInput ref={ref} mask={CURRENCY_MASK} placeholder={placeholder} {...props} />
  )
)
DiyCurrencyInput.displayName = 'DiyCurrencyInput'

export interface DiyPercentInputProps
  extends Omit<DiyMaskedInputProps, 'mask'> {}

/** Input de percentual (%) com máscara real via react-imask. */
export const DiyPercentInput = React.forwardRef<HTMLInputElement, DiyPercentInputProps>(
  ({ placeholder = '0,00', ...props }, ref) => (
    <DiyMaskedInput ref={ref} mask={PERCENT_MASK} placeholder={placeholder} {...props} />
  )
)
DiyPercentInput.displayName = 'DiyPercentInput'
