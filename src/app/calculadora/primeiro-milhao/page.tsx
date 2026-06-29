export const dynamic = 'force-static';
export const revalidate = false;
export async function generateStaticParams() { return []; }

import type { Metadata } from 'next';
import FirstMillionCalculator from '@/components/calculators/first-million';

export const metadata: Metadata = {
  title: 'Calculadora do Primeiro Milhão | diyfin.com.br',
  description: 'Descubra quanto investir por mês para alcançar seu primeiro 1 milhão de reais.',
};

export default function FirstMillionPage() {
  return (
    <main className="w-full bg-gradient-to-b from-slate-50 to-white py-8">
      <FirstMillionCalculator />
    </main>
  );
}
