import type { Metadata } from 'next';
import { Suspense } from 'react';
import CompoundInterestCalculator from '@/components/calculators/compound-interest';
import { CalculatorContent } from '@/components/calculadoras/shared/CalculatorContent';

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
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Calculadora de Juros Compostos</h1>
        <p className="text-slate-600">Simulador de evolução patrimonial com aportes mensais e reinvestimento de lucros.</p>
      </div>
      
      <Suspense fallback={<div className="h-[600px] flex items-center justify-center">Carregando calculadora...</div>}>
        <CompoundInterestCalculator />
      </Suspense>
      
      <div className="max-w-4xl mx-auto mt-12">
        <CalculatorContent content={technicalContent} />
      </div>
    </div>
  );
}
