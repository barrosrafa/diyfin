export const dynamic = 'force-static';
export const revalidate = false;
export async function generateStaticParams() { return []; }

import type { Metadata } from 'next';
import SimpleInterestCalculator from '@/components/calculators/simple-interest';

export const metadata: Metadata = {
  title: 'Calculadora de Juros Simples | diyfin.com.br',
  description: 'Simule rendimentos e pagamentos em regime de juros simples com tabela explicativa.',
};

export default function SimpleInterestPage() {
  return (
    <main className="w-full bg-gradient-to-b from-slate-50 to-white py-8">
      <SimpleInterestCalculator />
    </main>
  );
}
