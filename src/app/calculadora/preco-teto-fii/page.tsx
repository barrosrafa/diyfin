export const dynamic = 'force-static';
export const revalidate = false;
export async function generateStaticParams() { return []; }

import type { Metadata } from 'next';
import FIITetoPriceCalculator from '@/components/calculators/fii-teto';

export const metadata: Metadata = {
  title: 'Calculadora de Preço Teto de FIIs | diyfin.com.br',
  description: 'Descubra o preço teto justo para compra de Fundos Imobiliários de Tijolo e Papel.',
};

export default function FIITetoPage() {
  return (
    <main className="w-full bg-gradient-to-b from-slate-50 to-white py-8">
      <FIITetoPriceCalculator />
    </main>
  );
}
