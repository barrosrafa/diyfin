'use client'

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
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '64px 24px' }}>
      <h1
        className="font-semibold mb-10"
        style={{ fontSize: '2.5rem', color: '#1d1d1f', letterSpacing: '-0.025em' }}
      >
        Nossas Calculadoras
      </h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '18px',
        }}
      >
        {CALCULADORAS.map((calc) => (
          <a key={calc.href} href={calc.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
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
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  background: '#ffffff',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <calc.icon size={22} style={{ color: '#0071e3' }} />
              </div>
              <h3
                className="font-semibold mb-2"
                style={{ fontSize: '1.05rem', color: '#1d1d1f', letterSpacing: '-0.01em' }}
              >
                {calc.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#6e6e73', lineHeight: 1.5 }}>
                {calc.description}
              </p>
              <span
                style={{
                  display: 'inline-block',
                  marginTop: '14px',
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
    </div>
  );
}
