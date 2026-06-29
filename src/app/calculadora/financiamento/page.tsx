import type { Metadata } from 'next';
import { Suspense } from 'react';
import FinancingCalculator from '@/components/calculators/financing';
import { CalculatorContent } from '@/components/calculators/shared/CalculatorContent';

export const metadata: Metadata = {
  title: 'Simulador de Financiamento Imobiliário e Veículos | diyfin.com.br',
  description: 'Compare os sistemas SAC e PRICE para o seu financiamento. Veja o valor das parcelas, total de juros e cronograma completo de amortização.',
  keywords: ['financiamento imobiliário', 'simulador financiamento', 'tabela SAC', 'tabela PRICE', 'amortização'],
};

const technicalContent = `
## O que é um Simulador de Financiamento?

Um **Simulador de Financiamento** é uma ferramenta técnica que permite prever o custo total de um empréstimo de longo prazo, como a compra de uma casa ou um carro. Ele calcula como o saldo devedor será reduzido ao longo do tempo através das parcelas pagas.

No Brasil, os dois sistemas mais comuns são o **SAC** (Sistema de Amortização Constante) e a **Tabela PRICE** (Sistema Francês de Amortização).

## SAC vs. PRICE: Qual escolher?

### Sistema SAC (Amortização Constante)
*   **Parcelas:** Começam mais altas e vão diminuindo ao longo do tempo.
*   **Amortização:** É fixa em todos os meses.
*   **Vantagem:** Você paga menos juros no total da operação, pois o saldo devedor cai mais rápido no início.
*   **Perfil:** Ideal para quem tem fôlego financeiro agora e quer economizar no longo prazo.

### Tabela PRICE (Sistema Francês)
*   **Parcelas:** São fixas (iguais) do início ao fim do contrato.
*   **Amortização:** Começa baixa e vai aumentando conforme os juros diminuem.
*   **Vantagem:** Oferece previsibilidade no orçamento mensal, com parcelas iniciais mais baixas que o SAC.
*   **Perfil:** Ideal para quem precisa de uma parcela que caiba no orçamento atual, mesmo pagando um pouco mais de juros no total.

## Como usar o Simulador?

1.  **Valor Total:** Insira o preço de venda do bem.
2.  **Entrada:** Informe quanto você dará de sinal (recomenda-se pelo menos 20% para imóveis).
3.  **Taxa de Juros Anual:** A taxa nominal oferecida pelo banco.
4.  **Prazo:** Em quantos meses você pretende pagar (ex: 360 meses para 30 anos).
5.  **Sistema:** Alterne entre SAC e PRICE para comparar o custo total.

## Exemplo Prático: Imóvel de R$ 300.000,00
Com entrada de **R$ 60.000,00**, taxa de **10% ao ano** por **30 anos**:
*   **No SAC:** A primeira parcela será de aprox. **R$ 2.666,00** e a última de **R$ 672,00**.
*   **No PRICE:** Todas as parcelas serão de aprox. **R$ 2.106,00**.
*   **Diferença:** No SAC, você economiza cerca de **R$ 150.000,00** em juros totais comparado ao PRICE neste cenário.

## Observações Importantes
Esta simulação foca no **Custo Efetivo Total (CET)** aproximado. Bancos costumam adicionar taxas de administração e seguros obrigatórios (MIP e DFI) que podem elevar o valor da parcela em 5% a 10%.
`;

export default function FinanciamentoPage() {
  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '64px 24px' }}>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2" style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}>Simulador de Financiamento</h1>
        <p style={{ color: '#6e6e73' }}>Ferramenta técnica para comparação de sistemas de amortização SAC e PRICE.</p>
      </div>
      <Suspense fallback={<div>Carregando simulador...</div>}>
        <FinancingCalculator />
      </Suspense>
      <CalculatorContent content={technicalContent} />
    </div>
  );
}
