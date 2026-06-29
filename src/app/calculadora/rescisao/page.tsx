import type { Metadata } from 'next';
import { Suspense } from 'react';
import { RescisaoCalculadora } from '@/components/calculadoras/rescisao/RescisaoCalculadora';
import { CalculatorContent } from '@/components/calculadoras/shared/CalculatorContent';

export const metadata: Metadata = {
  title: 'Calculadora de Rescisão Trabalhista 2026 | diyfin.com.br',
  description: 'Simule sua rescisão CLT com as novas tabelas de INSS e IRRF de 2026. Cálculo detalhado de descontos e valores líquidos, incluindo o novo redutor de IR.',
  keywords: ['rescisão trabalhista', 'calculadora rescisão', 'INSS 2026', 'IRRF 2026', 'salário líquido'],
};

const technicalContent = `
## O que é a Calculadora de Rescisão?

A **Calculadora de Rescisão** é uma ferramenta essencial para trabalhadores e empregadores simularem os valores líquidos a serem recebidos ou pagos no momento do encerramento de um contrato de trabalho sob o regime CLT.

Nesta versão consolidada, focamos nos descontos fiscais obrigatórios: **INSS** e **IRRF**, utilizando as tabelas e regras vigentes para o ano de **2026**.

## Como usar a Calculadora?

Para obter uma simulação precisa do seu salário líquido mensal (base para a rescisão), siga os passos:

1.  **Salário Bruto (R$):** Informe o valor total do seu salário registrado em carteira, sem descontos.
2.  **Número de Dependentes:** Informe quantos dependentes você possui para fins de dedução de Imposto de Renda (filhos, cônjuge, etc.).

O sistema calculará automaticamente:
*   **Desconto INSS:** Baseado na tabela progressiva de 2026.
*   **Desconto IRRF:** Aplicando a tabela progressiva e o **novo redutor da Lei 15.270/2025**.
*   **Salário Líquido:** O valor que efetivamente cai na conta após os impostos.

## Regras Fiscais de 2026

### Tabela INSS 2026
O INSS em 2026 segue alíquotas progressivas que variam de **7,5% a 14%**, com um teto de contribuição fixado em **R$ 8.475,55**. Isso significa que, mesmo que você ganhe acima desse valor, o desconto será limitado ao teto.

### Novo Redutor de IRRF (Lei 15.270/2025)
Uma das grandes mudanças para 2026 é a consolidação da isenção efetiva para quem ganha até **R$ 5.000,00**. 
*   **Isenção Total:** Até R$ 5.000,00 de base de cálculo, o IRRF é zero.
*   **Redução Proporcional:** Entre R$ 5.000,01 e R$ 7.350,00, aplica-se um fator de redução que suaviza a carga tributária.
*   **Tabela Progressiva:** Acima de R$ 7.350,00, aplica-se a tabela progressiva padrão (até 27,5%).

## Exemplos Práticos

### Exemplo 1: Salário de R$ 3.500,00
*   **INSS:** Calculado sobre as faixas progressivas.
*   **IRRF:** Zero (devido à isenção da Lei 15.270/2025).
*   **Resultado:** O trabalhador recebe um valor líquido muito próximo do bruto, descontando apenas a previdência.

### Exemplo 2: Salário de R$ 8.000,00
*   **INSS:** Limitado ao teto de R$ 8.475,55 (desconto máximo).
*   **IRRF:** Aplicado sobre a base (Salário - INSS) usando a tabela progressiva, sem o redutor total de isenção.
`;

export default function RescisaoPage() {
  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '64px 24px' }}>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2" style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}>Calculadora de Rescisão (Simples)</h1>
        <p style={{ color: '#6e6e73' }}>Simulação de salário líquido e descontos fiscais para 2026.</p>
      </div>
      <Suspense fallback={<div>Carregando calculadora...</div>}>
        <RescisaoCalculadora />
      </Suspense>
      <CalculatorContent content={technicalContent} />
    </div>
  );
}
