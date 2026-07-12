import React from 'react'
import { Info } from 'lucide-react'
import { diyTokens } from '@/components/diy'

export interface DisclaimerProps {
  text: string
}

/** Aviso legal/contextual sobre a base de cálculo (ex: tabelas fiscais vigentes). */
export function Disclaimer({ text }: DisclaimerProps) {
  return (
    <div
      className="flex items-start gap-2.5 rounded-2xl p-4"
      style={{ background: diyTokens.color.surfaceMuted, border: `1px solid ${diyTokens.color.borderSubtle}` }}
    >
      <Info className="shrink-0 mt-0.5" size={16} style={{ color: diyTokens.color.textSecondary }} />
      <p className="text-xs leading-relaxed" style={{ color: diyTokens.color.textSecondary }}>
        {text}
      </p>
    </div>
  )
}
