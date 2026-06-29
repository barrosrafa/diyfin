'use client'

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
    <div style={{ background: '#ffffff', color: '#1d1d1f' }}>

      {/* ── Hero Section ── */}
      <section
        className="text-center"
        style={{ padding: '96px 24px 80px', maxWidth: '980px', margin: '0 auto' }}
      >
        <h1
          className="font-semibold"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            color: '#1d1d1f',
            marginBottom: '1.25rem',
          }}
        >
          Plataforma Financeira{' '}
          <span style={{ color: '#0071e3' }}>Unificada</span>
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            color: '#6e6e73',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.5,
          }}
        >
          Cálculos financeiros com precisão decimal estrita, sem arredondamentos
          flutuantes e 100% otimizados.
        </p>
      </section>

      {/* ── Tools Grid ── */}
      <section style={{ padding: '0 24px 96px', maxWidth: '980px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {FERRAMENTAS.map((calc) => (
            <a
              key={calc.href}
              href={calc.href}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <div
                style={{
                  background: '#f5f5f7',
                  borderRadius: '18px',
                  padding: '28px',
                  height: '100%',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.10)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    background: '#ffffff',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                >
                  <calc.icon size={22} style={{ color: '#0071e3' }} />
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#1d1d1f',
                    marginBottom: '8px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {calc.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#6e6e73',
                    lineHeight: 1.5,
                    marginBottom: '16px',
                  }}
                >
                  {calc.description}
                </p>

                {/* Category badge */}
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: '#0071e3',
                    background: 'rgba(0,113,227,0.08)',
                    borderRadius: '9999px',
                    padding: '3px 10px',
                  }}
                >
                  {calc.category}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}
