import React from 'react'
import ReactMarkdown from 'react-markdown'
import { diyTokens } from '@/components/diy'

export interface CalculatorContentProps {
  content: string
}

/**
 * Renderiza o conteúdo técnico em markdown (explicação da calculadora,
 * exemplos práticos, fórmulas) definido em cada página de calculadora
 * (financiamento, ir, juros-compostos, rescisao). Essas páginas já
 * escreviam o texto em markdown (##, **, listas) mas o componente que
 * deveria renderizá-lo nunca tinha sido criado.
 */
export function CalculatorContent({ content }: CalculatorContentProps) {
  return (
    <article className="w-full">
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2
              className="text-xl md:text-2xl font-semibold mt-10 mb-3"
              style={{ color: diyTokens.color.text, letterSpacing: '-0.02em' }}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base md:text-lg font-semibold mt-6 mb-2" style={{ color: diyTokens.color.text }}>
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: diyTokens.color.textSecondary }}>
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong style={{ color: diyTokens.color.text, fontWeight: 600 }}>{children}</strong>
          ),
          ul: ({ children }) => <ul className="space-y-1.5 mb-4 pl-1">{children}</ul>,
          ol: ({ children }) => <ol className="space-y-1.5 mb-4 pl-5 list-decimal">{children}</ol>,
          li: ({ children }) => (
            <li
              className="text-sm md:text-base leading-relaxed flex gap-2"
              style={{ color: diyTokens.color.textSecondary }}
            >
              <span style={{ color: diyTokens.color.primary }}>•</span>
              <span>{children}</span>
            </li>
          ),
          code: ({ children }) => (
            <code
              className="text-xs px-1.5 py-0.5 rounded"
              style={{ background: diyTokens.color.surfaceMuted, color: diyTokens.color.text }}
            >
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
