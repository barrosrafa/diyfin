export const dynamic = 'force-static';
export const revalidate = false;
export async function generateStaticParams() { return []; }

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { TrendingUp, Percent, Home, DollarSign, Target, BarChart3 } from 'lucide-react';

const FERRAMENTAS = [
  {
    title: 'Juros Compostos',
    description: 'Simule o crescimento exponencial do seu patrimônio com aportes.',
    href: '/calculadora/juros-compostos',
    icon: TrendingUp,
    category: 'Investimentos',
  },
  {
    title: 'Juros Simples',
    description: 'Cálculo direto sobre o capital inicial sem rendimentos acumulados.',
    href: '/calculadora/juros-simples',
    icon: Percent,
    category: 'Investimentos',
  },
  {
    title: 'Financiamento PRICE',
    description: 'Simule parcelas fixas do Sistema Francês de Amortização.',
    href: '/calculadora/financiamento-price',
    icon: Home,
    category: 'Crédito',
  },
  {
    title: 'Financiamento SAC',
    description: 'Simule amortizações constantes com prestações decrescentes.',
    href: '/calculadora/financiamento-sac',
    icon: DollarSign,
    category: 'Crédito',
  },
  {
    title: 'Preço Teto de FIIs',
    description: 'Calcule o preço justo de compra baseado na taxa NTN-B.',
    href: '/calculadora/preco-teto-fii',
    icon: Target,
    category: 'Renda Variável',
  },
  {
    title: 'Primeiro Milhão',
    description: 'Descubra a meta de aportes mensais para alcançar 1 milhão.',
    href: '/calculadora/primeiro-milhao',
    icon: DollarSign,
    category: 'Planejamento',
  },
  {
    title: 'Painel de Mercado',
    description: 'Acompanhe cotações de ações, FIIs e índices financeiros.',
    href: '/investidor10',
    icon: BarChart3,
    category: 'Dashboard',
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-4">
          Plataforma Financeira <span className="text-sky-600">Unificada</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Cálculos financeiros com precisão decimal estrita, sem arredondamentos flutuantes e 100% otimizados.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FERRAMENTAS.map((calc) => (
          <a key={calc.href} href={calc.href} className="group">
            <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 border-slate-200">
              <CardHeader>
                <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sky-100 transition-colors">
                  <calc.icon className="w-6 h-6 text-sky-600" />
                </div>
                <CardTitle className="text-xl">{calc.title}</CardTitle>
                <CardDescription>{calc.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded-full uppercase tracking-wider">
                  {calc.category}
                </span>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
