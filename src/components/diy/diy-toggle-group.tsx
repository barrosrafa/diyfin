'use client'

import React from 'react'
import { diyTokens } from './tokens'

export interface DiyToggleOption {
  label: string
  value: string
}

export interface DiyToggleGroupProps {
  options: DiyToggleOption[]
  value: string
  onChange: (value: string) => void
}

/**
 * Extraído de CalculatorForm.tsx (compound-interest), onde existia como
 * função local "ToggleGroup" não reutilizável. Usado para alternar entre
 * mensal/anual, meses/anos etc. nas 8 calculadoras.
 */
export function DiyToggleGroup({ options, value, onChange }: DiyToggleGroupProps) {
  return (
    <div
      className="flex items-center gap-1 p-1"
      style={{ background: diyTokens.color.surfaceMuted, borderRadius: diyTokens.radius.input }}
      role="tablist"
    >
      {options.map((opt) => {
        const selected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(opt.value)}
            className="px-3 py-1.5 text-xs font-medium transition-all cursor-pointer"
            style={{
              borderRadius: '8px',
              background: selected ? diyTokens.color.surface : 'transparent',
              color: selected ? diyTokens.color.primary : diyTokens.color.textSecondary,
              boxShadow: selected ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              fontWeight: selected ? 600 : 400,
              border: 'none',
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
