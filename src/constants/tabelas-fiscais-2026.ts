/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Tabela INSS 2026 — Empregados CLT
// Fonte: Portaria Interministerial MPS/MF nº 13/2026
export const SALARIO_MINIMO_2026 = 1621.00;
export const TETO_INSS_2026 = 8475.55;

export const TABELA_INSS_2026 = [
  { faixaAte: 1621.00, aliquota: 0.075, deducao: 0 },
  { faixaAte: 2666.68, aliquota: 0.09,  deducao: 24.32 },
  { faixaAte: 4000.03, aliquota: 0.12,  deducao: 104.22 },
  { faixaAte: 7786.02, aliquota: 0.14,  deducao: 184.23 },
] as const;

// Tabela IRRF 2026 — Mensal
// Fonte: Receita Federal — Tabela vigente a partir de jan/2026
export const TABELA_IRRF_MENSAL_2026 = [
  { faixaAte: 2428.80, aliquota: 0,      deducao: 0 },
  { faixaAte: 2826.65, aliquota: 0.075,  deducao: 182.16 },
  { faixaAte: 3751.05, aliquota: 0.15,   deducao: 394.16 },
  { faixaAte: 4664.68, aliquota: 0.225,  deducao: 675.49 },
  { faixaAte: Infinity, aliquota: 0.275,  deducao: 908.73 },
] as const;

// NOVA REGRA 2026 — Lei 15.270/2025 (redutor adicional)
export const REDUTOR_IRRF_2026 = {
  limiteIsencao: 5000.00,
  limiteReducao: 7350.00,
} as const;

export const DEDUCAO_DEPENDENTE_MENSAL_2026 = 189.59;
export const DESCONTO_SIMPLIFICADO_MENSAL_2026 = 607.20;

// Tabela CODEFAT — Seguro-Desemprego (vigente desde 11/01/2026)
export const TABELA_SEGURO_DESEMPREGO_2026 = {
  vigenciaDesde: '2026-01-11',
  parcelas: [
    { faixaAte: 2041.39, percentual: 0.80 },
    { faixaAte: 3402.24, percentual: 0.50 },
    { faixaAte: Infinity, valorExtra: 816.56 },
  ],
  valorPiso: 1621.00,
  valorTeto: 2313.74,
} as const;
