export const dynamic = 'force-static';
export const revalidate = false;
export async function generateStaticParams() { return []; }

import type { Metadata } from 'next';
import FinancingPriceCalculator from '@/components/calculators/financing-price';

export const metadata: Metadata = {
  title: 'Calculadora de Financiamento PRICE | diyfin.com.br',
  description: 'Simule financiamentos imobiliários com parcelas constantes na Tabela PRICE.',
};

export default function FinancingPricePage() {
  return (
    <main className="w-full py-8" style={{ background: '#ffffff' }}>
      <FinancingPriceCalculator />
    </main>
  );
}
