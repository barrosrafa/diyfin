import type { Metadata } from 'next';
import './globals.css';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Header } from '@/components/Header';

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
            
            <Header />

            <main className="flex-1">
              {children}
            </main>

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
