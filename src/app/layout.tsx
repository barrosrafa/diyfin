import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'diyfin.com.br | Calculadoras Financeiras 2026',
    template: '%s | diyfin.com.br',
  },
  description: 'Consolidação de ferramentas financeiras, calculadoras de juros, rescisão, IRRF e mais.',
  metadataBase: new URL('https://www.diyfin.com.br'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <NuqsAdapter>
          <div className="min-h-screen flex flex-col bg-slate-50">
            <header className="border-b bg-white sticky top-0 z-50">
              <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <a href="/" className="text-xl font-bold text-sky-600">
                  diyfin<span className="text-slate-900">.com.br</span>
                </a>
                <nav className="hidden md:flex gap-6 text-sm font-medium">
                  <a href="/calculadoras" className="hover:text-sky-600 transition-colors">Calculadoras</a>
                  <a href="/sobre" className="hover:text-sky-600 transition-colors">Sobre</a>
                </nav>
              </div>
            </header>
            <main className="flex-1">
              {children}
            </main>
            <footer className="border-t bg-white py-8">
              <div className="container mx-auto px-4 text-center text-sm text-slate-500">
                <p>© 2026 diyfin.com.br - Ferramentas Financeiras DIY</p>
                <p className="mt-2">As informações aqui contidas têm caráter meramente informativo.</p>
              </div>
            </footer>
          </div>
        </NuqsAdapter>
      </body>
    </html>
  );
}
