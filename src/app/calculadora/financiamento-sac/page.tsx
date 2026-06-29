export const dynamic = 'force-static';
export const revalidate = false;
export async function generateStaticParams() { return []; }

import type { Metadata } from 'next';
import FinancingSACCalculator from '@/components/calculators/financing-sac';

export const metadata: Metadata = {
  title: 'Calculadora de Financiamento SAC | diyfin.com.br',
  description: 'Simule financiamentos imobiliários com parcelas decrescentes no Sistema SAC.',
};

export default function FinancingSACPage() {
  return (
    <main className="w-full bg-gradient-to-b from-slate-50 to-white py-8">
      <FinancingSACCalculator />
    </main>
  );
}
