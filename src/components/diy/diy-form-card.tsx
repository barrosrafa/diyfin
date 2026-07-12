'use client'

import React from 'react'
import { diyTokens } from './tokens'

export interface DiyFormCardProps {
  title: string
  description?: string
  tip?: string
  children: React.ReactNode
}

/**
 * Wrapper de card de formulário (header + conteúdo + rodapé com dica),
 * extraído do padrão visual usado em compound-interest/CalculatorForm.tsx
 * para ser reutilizado nas demais calculadoras.
 */
export function DiyFormCard({ title, description, tip, children }: DiyFormCardProps) {
  return (
    <div
      className="w-full overflow-hidden"
      style={{ border: `1px solid ${diyTokens.color.border}`, background: diyTokens.color.surface, borderRadius: diyTokens.radius.card }}
    >
      <div
        className="px-6 py-4"
        style={{ borderBottom: `1px solid ${diyTokens.color.borderSubtle}`, background: diyTokens.color.surfaceMuted }}
      >
        <h3 className="text-base font-semibold" style={{ color: diyTokens.color.text }}>
          {title}
        </h3>
        {description && (
          <p className="text-xs mt-0.5" style={{ color: diyTokens.color.textSecondary }}>
            {description}
          </p>
        )}
      </div>

      <div className="p-6 space-y-6">{children}</div>

      {tip && (
        <div
          className="px-6 py-3"
          style={{ borderTop: `1px solid ${diyTokens.color.borderSubtle}`, background: diyTokens.color.surfaceMuted }}
        >
          <p className="text-xs" style={{ color: diyTokens.color.textSecondary }}>
            <span style={{ color: diyTokens.color.text, fontWeight: 600 }}>Dica:</span> {tip}
          </p>
        </div>
      )}
    </div>
  )
}
