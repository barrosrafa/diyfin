import type { Metadata } from 'next';
import './globals.css';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

// Fonte carregada via system font stack nativa (SF Pro / Helvetica Neue)
// definida em globals.css — sem dependência de fontes externas.

export const metadata: Metadata = {
  title: {
    default: 'diyfin.com.br | Plataforma Financeira Unificada 2026',
    template: '%s | diyfin.com.br',
  },
  description: 'Consolidação de ferramentas financeiras, calculadoras de juros, simulador de investimentos e cotações de mercado.',
  metadataBase: new URL('https://www.diyfin.com.br'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased" style={{ background: '#ffffff', color: '#1d1d1f' }}>
        <NuqsAdapter>
          <div className="min-h-screen flex flex-col" style={{ background: '#ffffff', color: '#1d1d1f' }}>

            {/* ── Header — Apple-style dark translucent nav bar ── */}
            <header
              className="sticky top-0 z-50 backdrop-blur-md"
              style={{ background: 'rgba(0,0,0,0.82)', height: '44px' }}
            >
              <div
                className="mx-auto px-6 h-full flex items-center justify-between"
                style={{ maxWidth: '980px' }}
              >
                <a
                  href="/"
                  className="text-xs font-medium tracking-tight"
                  style={{ color: '#f5f5f7' }}
                >
                  diyfin<span style={{ color: '#86868b' }}>.com.br</span>
                </a>
                <nav className="hidden md:flex gap-7">
                  {[
                    { href: '/calculadora/juros-compostos', label: 'Juros Compostos' },
                    { href: '/calculadora/financiamento-price', label: 'PRICE' },
                    { href: '/calculadora/financiamento-sac', label: 'SAC' },
                    { href: '/calculadora/preco-teto-fii', label: 'Preço Teto FII' },
                    { href: '/calculadora/primeiro-milhao', label: 'Primeiro Milhão' },
                    { href: '/investidor10', label: 'Mercado' },
                  ].map(({ href, label }) => (
                    <a
                      key={href}
                      href={href}
                      className="text-xs transition-colors"
                      style={{ color: '#a1a1a6' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#f5f5f7')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#a1a1a6')}
                    >
                      {label}
                    </a>
                  ))}
                </nav>
              </div>
            </header>

            <main className="flex-1">
              {children}
            </main>

            {/* ── Footer — Apple-style minimal light gray ── */}
            <footer style={{ background: '#f5f5f7', borderTop: '1px solid #d2d2d7' }}>
              <div
                className="mx-auto px-6 py-10 text-center"
                style={{ maxWidth: '980px' }}
              >
                <p className="text-xs" style={{ color: '#6e6e73' }}>
                  © 2026 diyfin.com.br — Plataforma Financeira Unificada
                </p>
                <p className="mt-1 text-xs" style={{ color: '#86868b' }}>
                  Cálculos com precisão Decimal.js sem arredondamentos flutuantes nativos.
                </p>
              </div>
            </footer>

          </div>
        </NuqsAdapter>
      </body>
    </html>
  );
}
