import type { Metadata } from 'next';
import { Suspense } from 'react';
import { JurosSimplesCalculadora } from '@/components/calculadoras/juros-simples/JurosSimplesCalculadora';
import { CalculatorContent } from '@/components/calculadoras/shared/CalculatorContent';
import { TrendingUp, Info, BookOpen, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Calculadora de Juros Simples Online (2026) | Simule Grátis',
  description: 'Use nossa calculadora de juros simples profissional. Aprenda a fórmula J=C.i.t, veja exemplos práticos e entenda a diferença para juros compostos.',
  keywords: [
    'juros simples', 
    'calculadora juros simples', 
    'fórmula juros simples', 
    'matemática financeira', 
    'simulador de empréstimo juros simples',
    'cálculo de rendimento linear'
  ],
  alternates: {
    canonical: 'https://diyfin.com.br/calculadora/juros-simples',
  },
  openGraph: {
    title: 'Calculadora de Juros Simples Online e Gratuita',
    description: 'Calcule rendimentos e empréstimos com juros lineares de forma simples e rápida.',
    type: 'website',
    url: 'https://diyfin.com.br/calculadora/juros-simples',
  }
};

const technicalContent = `
## 📖 Guia Completo: O que são Juros Simples?

Os **Juros Simples** representam o custo do dinheiro ao longo do tempo calculado exclusivamente sobre o **Capital Inicial**. Diferente dos juros compostos (os famosos "juros sobre juros"), aqui o valor do rendimento é fixo em cada período, criando um crescimento linear.

Este modelo é amplamente utilizado em:
*   **Empréstimos de curto prazo** entre pessoas físicas ou empresas.
*   **Descontos de duplicatas** e antecipação de recebíveis.
*   **Títulos de renda fixa** específicos que pagam cupons lineares.

---

## 🧮 A Fórmula dos Juros Simples (J = C . i . t)

Para calcular manualmente, utilizamos a fórmula fundamental da matemática financeira:

> **J = C × i × t**

Onde as variáveis significam:
*   **J (Juros):** O valor total de rendimento ou custo gerado.
*   **C (Capital):** O valor inicial investido ou emprestado.
*   **i (Taxa de Juros):** O percentual aplicado (deve ser usado em decimal, ex: 5% = 0,05).
*   **t (Tempo):** O número de períodos (meses, anos, dias).

**Importante:** A taxa (**i**) e o tempo (**t**) devem estar sempre na mesma unidade (ex: taxa mensal para tempo em meses).

---

## 💡 Exemplos Práticos de Cálculo

### 1. Investimento em Título Público
Se você investe **R$ 5.000,00** em um título que paga **12% ao ano** em juros simples por **2 anos**:
*   **C:** 5.000
*   **i:** 0,12 (12%)
*   **t:** 2
*   **Cálculo:** 5.000 * 0,12 * 2 = **R$ 1.200,00 de juros**.
*   **Montante Final:** R$ 6.200,00.

### 2. Empréstimo Particular
Um empréstimo de **R$ 1.000,00** com taxa de **3% ao mês** por **6 meses**:
*   **Juros:** 1.000 * 0,03 * 6 = **R$ 180,00**.
*   **Total a pagar:** R$ 1.180,00.

---

## 🔄 Juros Simples vs. Juros Compostos: Qual a diferença?

A principal diferença reside na **base de cálculo**:
1.  **Juros Simples:** A taxa incide apenas sobre o valor original. O gráfico de crescimento é uma **reta**.
2.  **Juros Compostos:** A taxa incide sobre o montante acumulado do período anterior. O gráfico de crescimento é uma **curva exponencial**.

Nossa calculadora permite visualizar essa proporção de forma clara no gráfico acima, ajudando você a tomar decisões financeiras mais inteligentes.
`;

export default function JurosSimplesPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header da Página */}
        <header className="mb-12 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Matemática Financeira 2026</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Calculadora de Juros Simples
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Simule rendimentos e empréstimos com precisão técnica. 
            Uma ferramenta essencial para investidores e profissionais de finanças.
          </p>
        </header>

        {/* Componente da Calculadora */}
        <section className="mb-16">
          <Suspense fallback={
            <div className="h-96 w-full bg-white rounded-xl border border-slate-200 animate-pulse flex items-center justify-center">
              <span className="text-slate-400">Preparando simulador...</span>
            </div>
          }>
            <JurosSimplesCalculadora />
          </Suspense>
        </section>

        {/* Conteúdo Educacional / SEO */}
        <section className="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
            <BookOpen className="w-6 h-6 text-sky-600" />
            <h2 className="text-2xl font-bold text-slate-800">Tudo sobre Juros Simples</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <CalculatorContent content={technicalContent} />
            </div>
            
            <aside className="space-y-6">
              <div className="p-6 bg-amber-50 rounded-xl border border-amber-100">
                <div className="flex items-center gap-2 text-amber-800 font-bold mb-3">
                  <Lightbulb className="w-5 h-5" />
                  <span>Dica de Especialista</span>
                </div>
                <p className="text-sm text-amber-900/80 leading-relaxed">
                  Sempre verifique se a <strong>unidade de tempo</strong> da taxa coincide com o <strong>período</strong> informado. 
                  Se a taxa for anual e o tempo em meses, divida a taxa por 12 antes de calcular.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 text-slate-800 font-bold mb-3">
                  <Info className="w-5 h-5" />
                  <span>Links Úteis</span>
                </div>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="/calculadora/juros-compostos" className="text-sky-600 hover:underline flex items-center gap-1">
                      Calculadora de Juros Compostos →
                    </a>
                  </li>
                  <li>
                    <a href="/calculadora/financiamento" className="text-sky-600 hover:underline flex items-center gap-1">
                      Simulador de Financiamento →
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}
