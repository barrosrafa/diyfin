export const dynamic = 'force-static';
export const revalidate = false;
export async function generateStaticParams() { return []; }

import type { Metadata } from 'next';
import Investidor10Dashboard from '@/components/investidor10/Dashboard';

export const metadata: Metadata = {
  title: 'Painel de Ativos e Mercado | diyfin.com.br',
  description: 'Acompanhe cotações de ações, FIIs e índices com análise de indicadores.',
};

export default function Investidor10Page() {
  return (
    <main className="w-full bg-gradient-to-b from-slate-50 to-white py-8">
      <Investidor10Dashboard />
    </main>
  );
}
