import React from 'react'
import { diyTokens } from '@/components/diy'

export interface ResultCardProps {
  label: string
  value: string
  description?: string
  variant?: 'default' | 'highlight' | 'muted'
}

const variantStyles: Record<NonNullable<ResultCardProps['variant']>, React.CSSProperties> = {
  default: {
    background: diyTokens.color.surface,
    border: `1px solid ${diyTokens.color.border}`,
  },
  highlight: {
    background: diyTokens.color.primarySoft,
    border: `1px solid rgba(0,113,227,0.18)`,
  },
  muted: {
    background: diyTokens.color.surfaceMuted,
    border: `1px solid ${diyTokens.color.borderSubtle}`,
  },
}

const valueColor: Record<NonNullable<ResultCardProps['variant']>, string> = {
  default: diyTokens.color.text,
  highlight: diyTokens.color.primary,
  muted: diyTokens.color.textSecondary,
}

/**
 * Card de métrica de resultado. Extrai o padrão que já existia duplicado
 * inline em simple-interest/index.tsx (blocos "Valor Investido",
 * "Total em Juros", "Montante Final") para ser reutilizável por
 * income-tax, severance e demais calculadoras.
 */
export function ResultCard({ label, value, description, variant = 'default' }: ResultCardProps) {
  return (
    <div className="rounded-2xl p-4" style={variantStyles[variant]}>
      <p
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: variant === 'highlight' ? diyTokens.color.primary : diyTokens.color.textSecondary }}
      >
        {label}
      </p>
      <p className="text-2xl font-semibold mt-1" style={{ color: valueColor[variant], letterSpacing: '-0.02em' }}>
        {value}
      </p>
      {description && (
        <p className="text-xs mt-1" style={{ color: diyTokens.color.placeholder }}>
          {description}
        </p>
      )}
    </div>
  )
}
