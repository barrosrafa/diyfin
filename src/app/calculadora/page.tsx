import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { TrendingUp, Briefcase, PiggyBank, Home, Percent } from 'lucide-react';

const CALCULADORAS = [
  {
    title: 'Juros Simples',
    description: 'Cálculo básico de juros sobre o capital inicial.',
    href: '/calculadora/juros-simples',
    icon: Percent,
    category: 'Investimentos'
  },
  {
    title: 'Juros Compostos',
    description: 'O poder dos juros sobre juros no longo prazo.',
    href: '/calculadora/juros-compostos',
    icon: TrendingUp,
    category: 'Investimentos'
  },
  {
    title: 'Rescisão CLT',
    description: 'Simule sua rescisão com tabelas 2026.',
    href: '/calculadora/rescisao',
    icon: Briefcase,
    category: 'Trabalhista'
  },
  {
    title: 'Imposto de Renda',
    description: 'Cálculo mensal de IRRF com novas regras.',
    href: '/calculadora/ir',
    icon: PiggyBank,
    category: 'Impostos'
  },
  {
    title: 'Financiamento',
    description: 'Simulador SAC e PRICE para imóveis e veículos.',
    href: '/calculadora/financiamento',
    icon: Home,
    category: 'Crédito'
  }
];

export default function CalculadorasPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Nossas Calculadoras</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CALCULADORAS.map((calc) => (
          <a key={calc.href} href={calc.href} className="group">
            <Card className="h-full transition-all hover:shadow-lg border-slate-200">
              <CardHeader>
                <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sky-100 transition-colors">
                  <calc.icon className="w-6 h-6 text-sky-600" />
                </div>
                <CardTitle>{calc.title}</CardTitle>
                <CardDescription>{calc.description}</CardDescription>
              </CardHeader>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
