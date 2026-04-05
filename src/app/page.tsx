import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Calculator, TrendingUp, Briefcase, PiggyBank, Home, Percent } from 'lucide-react';

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

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-4">
          Finanças <span className="text-sky-600">DIY</span> ao seu alcance
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Ferramentas técnicas consolidadas para você tomar as melhores decisões financeiras em 2026.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CALCULADORAS.map((calc) => (
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
