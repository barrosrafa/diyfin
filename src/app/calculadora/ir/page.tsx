import type { Metadata } from 'next';
import { Suspense } from 'react';
import { IRCalculadora } from '@/components/calculadoras/ir/IRCalculadora';
import { CalculatorContent } from '@/components/calculadoras/shared/CalculatorContent';

export const metadata: Metadata = {
  title: 'Calculadora de Imposto de Renda 2026 | diyfin.com.br',
  description: 'Calcule o IRRF mensal com as novas regras de 2026. Isenção efetiva até R$ 5.000,00 e novo redutor da Lei 15.270/2025.',
  keywords: ['imposto de renda', 'IRRF 2026', 'isenção IR 5000', 'calculadora IRRF', 'tabela progressiva 2026'],
};

const technicalContent = `
## O que mudou no Imposto de Renda em 2026?

O ano de **2026** marca a consolidação de uma das maiores mudanças na tributação de renda no Brasil: a **isenção efetiva para quem ganha até R$ 5.000,00**. 

Diferente dos anos anteriores, onde a isenção era baseada apenas na primeira faixa da tabela progressiva, agora existe um **mecanismo de redutor (Lei 15.270/2025)** que garante que o imposto seja zero para rendimentos até esse patamar.

## Como usar a Calculadora de IRRF?

Nossa calculadora realiza o cálculo em duas etapas para garantir que você pague o menor imposto possível:

1.  **Salário Bruto (R$):** O valor total antes de qualquer desconto.
2.  **Número de Dependentes:** Cada dependente gera uma dedução mensal de **R$ 189,59**.
3.  **Outras Deduções:** Você pode inserir valores de pensão alimentícia ou outras deduções legais.

O sistema compara automaticamente o **Desconto Simplificado (R$ 607,20)** com as **Deduções Legais** e aplica o que for mais vantajoso para o contribuinte.

## Entendendo o Novo Redutor (Lei 15.270/2025)

A regra de 2026 funciona da seguinte forma:

*   **Até R$ 5.000,00:** Isenção total. O imposto calculado pela tabela é zerado pelo redutor.
*   **De R$ 5.000,01 a R$ 7.350,00:** Existe uma "rampa" de transição. O redutor vai diminuindo gradualmente até que, acima de R$ 7.350,00, o contribuinte passa a pagar o valor integral da tabela progressiva.
*   **Acima de R$ 7.350,00:** Aplica-se a tabela progressiva padrão com alíquotas de até **27,5%**.

## Exemplos Práticos

### Exemplo 1: Salário de R$ 4.800,00
*   Pela tabela antiga, esse trabalhador pagaria uma quantia considerável de IR.
*   Em **2026**, o IRRF é **Zero**.

### Exemplo 2: Salário de R$ 6.000,00
*   Este trabalhador está na faixa de transição.
*   O imposto é calculado, mas sofre uma redução parcial, resultando em uma alíquota efetiva muito menor do que em 2024 ou 2025.

## Deduções Permitidas

*   **Previdência Oficial (INSS):** O valor do INSS é deduzido da base de cálculo do IR.
*   **Dependentes:** R$ 189,59 por dependente.
*   **Pensão Alimentícia:** Valor integral pago judicialmente.
*   **Desconto Simplificado:** R$ 607,20 (substitui as demais deduções se for mais vantajoso).
`;

export default function IRPage() {
  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '64px 24px' }}>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2" style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}>Calculadora de Imposto de Renda 2026</h1>
        <p style={{ color: '#6e6e73' }}>Simulador completo de IRRF mensal com as novas regras de isenção e redutores.</p>
      </div>
      <Suspense fallback={<div>Carregando calculadora...</div>}>
        <IRCalculadora />
      </Suspense>
      <CalculatorContent content={technicalContent} />
    </div>
  );
}
