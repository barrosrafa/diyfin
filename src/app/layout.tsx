import type { Metadata } from 'next';
import './globals.css';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

// Inter é carregada em runtime via @import url() em globals.css
// (next/font/google exige rede no build — incompatível com output: 'export' em CI sem acesso a fonts.googleapis.com)

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
      {/* font-sans aplica var(--font-sans) = Inter, definida em @theme do globals.css */}
      <body className="font-sans antialiased">
        <NuqsAdapter>
          <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
            <header className="border-b bg-white sticky top-0 z-50">
              <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
                <a href="/" className="text-xl font-bold text-sky-600 flex items-center gap-2">
                  <span>diyfin</span><span className="text-slate-900">.com.br</span>
                </a>
                <nav className="hidden md:flex gap-6 text-sm font-medium">
                  <a href="/calculadora/juros-compostos" className="hover:text-sky-600 transition-colors">Juros Compostos</a>
                  <a href="/calculadora/financiamento-price" className="hover:text-sky-600 transition-colors">PRICE</a>
                  <a href="/calculadora/financiamento-sac" className="hover:text-sky-600 transition-colors">SAC</a>
                  <a href="/calculadora/preco-teto-fii" className="hover:text-sky-600 transition-colors">Preço Teto FII</a>
                  <a href="/calculadora/primeiro-milhao" className="hover:text-sky-600 transition-colors">Primeiro Milhão</a>
                  <a href="/investidor10" className="hover:text-sky-600 transition-colors font-semibold text-sky-600">Mercado</a>
                </nav>
              </div>
            </header>
            <main className="flex-1">
              {children}
            </main>
            <footer className="border-t bg-white py-8">
              <div className="container mx-auto px-4 text-center text-sm text-slate-500 max-w-7xl">
                <p>© 2026 diyfin.com.br - Plataforma Financeira Unificada</p>
                <p className="mt-2 text-xs">Cálculos estritos com precisão Decimal.js sem arredondamentos flutuantes nativos.</p>
              </div>
            </footer>
          </div>
        </NuqsAdapter>
      </body>
    </html>
  );
}
