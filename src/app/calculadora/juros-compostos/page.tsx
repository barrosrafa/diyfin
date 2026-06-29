export const dynamic = 'force-static';
export const revalidate = false;
export async function generateStaticParams() { return []; }

import type { Metadata } from 'next';
import { Suspense } from 'react';
import CompoundInterestCalculator from '@/components/calculators/compound-interest';
import { CalculatorContent } from '@/components/calculators/shared/CalculatorContent';

export const metadata: Metadata = {
  title: 'Calculadora de Juros Compostos 2026 | diyfin.com.br',
  description: 'Simule o crescimento do seu patrimônio com juros compostos. Veja o poder dos aportes mensais e do tempo nos seus investimentos com gráficos de evolução.',
  keywords: ['juros compostos', 'calculadora juros compostos', 'investimentos', 'renda fixa', 'independência financeira'],
};

const technicalContent = `
## O que são Juros Compostos?

Os **Juros Compostos** são a base do crescimento exponencial de patrimônio. Diferente dos juros simples, onde a taxa incide apenas sobre o valor inicial, nos juros compostos a taxa é aplicada sobre o montante acumulado do período anterior (Capital + Juros).

É o famoso conceito de **"juros sobre juros"**, onde o dinheiro trabalha para você, gerando rendimentos cada vez maiores à medida que o tempo passa.

## Como usar a Calculadora de Juros Compostos?

Nossa ferramenta permite simular cenários complexos com aportes mensais:

1.  **Capital Inicial (R$):** O valor que você já tem guardado para começar.
2.  **Aporte Mensal (R$):** Quanto você pretende poupar e investir todos os meses.
3.  **Taxa de Juros (% ao mês ou ao ano):** A rentabilidade média esperada do seu investimento.
4.  **Tempo (meses ou anos):** O horizonte de tempo que você pretende manter o dinheiro aplicado.

O gráfico de **Evolução do Patrimônio** mostrará visualmente a diferença entre o que você tirou do bolso (Total Investido) e o crescimento gerado pelos juros (Valor Total).

## Exemplos Práticos

### Exemplo 1: O Poder da Constância
Se você começar com **R$ 1.000,00** e investir **R$ 500,00** todos os meses a uma taxa de **1% ao mês** (comum em bons fundos ou ações) por **10 anos** (120 meses):
*   **Total Investido:** R$ 61.000,00
*   **Valor Total Final:** Aprox. **R$ 118.000,00**
*   **Juros Ganhos:** Quase **R$ 57.000,00** — o tempo dobrou seu capital investido!

### Exemplo 2: Longo Prazo
O mesmo cenário acima, mas por **20 anos** (240 meses):
*   **Total Investido:** R$ 121.000,00
*   **Valor Total Final:** Aprox. **R$ 500.000,00**
*   Aqui os juros representam mais de **75%** do seu patrimônio final.

## A Fórmula dos Juros Compostos

A fórmula matemática para o montante final com aportes é:

\`M = C * (1 + i)^t + A * [((1 + i)^t - 1) / i]\`

Onde:
*   **M:** Montante final
*   **C:** Capital inicial
*   **i:** Taxa de juros por período
*   **t:** Número de períodos
*   **A:** Valor do aporte mensal
`;

export default function JurosCompostosPage() {
  return (
    <main className="w-full" style={{ background: '#ffffff' }}>
      {/* Hero Section */}
      <div style={{ maxWidth: '980px', margin: '0 auto', padding: '64px 24px 40px', textAlign: 'center' }}>
        <span
          style={{
            display: 'inline-block',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#0071e3',
            background: 'rgba(0,113,227,0.08)',
            borderRadius: '9999px',
            padding: '4px 12px',
            marginBottom: '16px',
          }}
        >
          Ferramenta Gratuita
        </span>
        <h1
          className="font-semibold mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#1d1d1f', letterSpacing: '-0.025em', lineHeight: 1.05 }}
        >
          Calculadora de{' '}
          <span style={{ color: '#0071e3' }}>Juros Compostos</span>
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#6e6e73', maxWidth: '560px', margin: '0 auto', lineHeight: 1.5 }}>
          Simule o crescimento do seu patrimônio com aportes mensais e reinvestimento de lucros.
        </p>
      </div>

      {/* Calculadora Principal */}
      <div style={{ maxWidth: '980px', margin: '0 auto', padding: '0 24px 64px' }}>
        <Suspense fallback={
          <div className="h-[600px] flex flex-col items-center justify-center gap-4">
            <div
              className="w-12 h-12 rounded-full border-4 animate-spin"
              style={{ borderColor: '#f5f5f7', borderTopColor: '#0071e3' }}
            />
            <p style={{ color: '#6e6e73', fontWeight: 500 }}>Carregando calculadora...</p>
          </div>
        }>
          <CompoundInterestCalculator />
        </Suspense>
      </div>

      {/* Conteúdo Técnico */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px 80px' }}>
        <CalculatorContent content={technicalContent} />
      </div>

      {/* CTA Final */}
      <div style={{ background: '#1d1d1f', padding: '64px 24px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            className="font-semibold mb-4"
            style={{ fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em' }}
          >
            Pronto para começar a investir?
          </h2>
          <p style={{ color: '#86868b', marginBottom: '32px', fontSize: '1.05rem', lineHeight: 1.5 }}>
            Use nossa calculadora para planejar diferentes cenários e encontre a melhor estratégia para seu futuro financeiro.
          </p>
          <a
            href="/calculadora"
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: '#0071e3',
              color: '#ffffff',
              borderRadius: '9999px',
              fontWeight: 600,
              fontSize: '0.95rem',
              textDecoration: 'none',
              transition: 'background 0.2s ease',
            }}
          >
            Explorar Mais Calculadoras
          </a>
        </div>
      </div>
    </main>
  );
}
