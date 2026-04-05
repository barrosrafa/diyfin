import type { Metadata } from 'next';
import { Suspense } from 'react';
import { JurosSimplesCalculadora } from '@/components/calculadoras/juros-simples/JurosSimplesCalculadora';
import { CalculatorContent } from '@/components/calculadoras/shared/CalculatorContent';

export const metadata: Metadata = {
  title: 'Calculadora de Juros Simples 2026 | diyfin.com.br',
  description: 'Calcule juros simples online. Aprenda o que são juros simples, como calcular com a fórmula e veja exemplos práticos de investimentos e empréstimos.',
  keywords: ['juros simples', 'calculadora juros simples', 'fórmula juros simples', 'matemática financeira'],
};

const technicalContent = `
## O que são Juros Simples?

Os **Juros Simples** são uma forma de cálculo de juros onde o percentual é aplicado apenas sobre o valor principal (o capital inicial) durante todo o período da operação. Diferente dos juros compostos, aqui os juros não rendem juros.

É um conceito fundamental da matemática financeira, muito utilizado em operações de curto prazo, descontos de duplicatas e em situações onde a rentabilidade é linear.

## Como usar a Calculadora de Juros Simples?

Nossa calculadora foi desenhada para ser intuitiva. Siga os passos abaixo:

1.  **Capital Inicial (R$):** Insira o valor total que você está investindo ou pegando emprestado.
2.  **Taxa de Juros (%):** Digite a porcentagem de juros. Certifique-se de que a taxa e o tempo estejam na mesma unidade (ex: taxa mensal para tempo em meses).
3.  **Tempo:** Informe por quanto tempo o capital ficará aplicado ou a dívida será mantida.

O resultado aparecerá instantaneamente ao lado, mostrando o **Total de Juros** acumulado e o **Montante Final** (Capital + Juros).

## Exemplos Práticos

### Exemplo 1: Empréstimo entre amigos
Você empresta **R$ 1.000,00** para um amigo com uma taxa de **2% ao mês** por **5 meses**.
*   **Capital:** R$ 1.000,00
*   **Taxa:** 2%
*   **Tempo:** 5
*   **Resultado:** Você receberá **R$ 100,00** de juros, totalizando **R$ 1.100,00**.

### Exemplo 2: Investimento Linear
Um título de renda fixa paga **10% ao ano** em juros simples sobre um aporte de **R$ 5.000,00** por **2 anos**.
*   **Capital:** R$ 5.000,00
*   **Taxa:** 10%
*   **Tempo:** 2
*   **Resultado:** O rendimento será de **R$ 1.000,00**, com montante final de **R$ 6.000,00**.

## A Fórmula dos Juros Simples

A fórmula matemática utilizada por esta calculadora é:

\`J = C * i * t\`

Onde:
*   **J:** Juros acumulados
*   **C:** Capital inicial
*   **i:** Taxa de juros (em decimal, ex: 5% = 0,05)
*   **t:** Tempo da operação

O montante final (M) é calculado como: \`M = C + J\`.
`;

export default function JurosSimplesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Calculadora de Juros Simples</h1>
        <p className="text-slate-600">Ferramenta técnica para cálculo de rendimentos e empréstimos com juros lineares.</p>
      </div>
      <Suspense fallback={<div>Carregando calculadora...</div>}>
        <JurosSimplesCalculadora />
      </Suspense>
      <CalculatorContent content={technicalContent} />
    </div>
  );
}
