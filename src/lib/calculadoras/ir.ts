import { 
  TABELA_IRRF_MENSAL_2026, 
  REDUTOR_IRRF_2026,
  DEDUCAO_DEPENDENTE_MENSAL_2026,
  DESCONTO_SIMPLIFICADO_MENSAL_2026,
  TABELA_INSS_2026,
  TETO_INSS_2026
} from '@/constants/tabelas-fiscais-2026';

export function calculateINSS(salarioBruto: number) {
  let inss = 0;
  const baseCalculo = Math.min(salarioBruto, TETO_INSS_2026);
  let baseRestante = baseCalculo;
  let faixaAnterior = 0;

  for (const faixa of TABELA_INSS_2026) {
    const baseNaFaixa = Math.min(baseRestante, faixa.faixaAte - faixaAnterior);
    if (baseNaFaixa <= 0) break;
    
    inss += baseNaFaixa * faixa.aliquota;
    baseRestante -= baseNaFaixa;
    faixaAnterior = faixa.faixaAte;
  }

  return inss;
}

export function calculateIRRF(baseCalculo: number, dependentes: number = 0) {
  const deducaoDependentes = dependentes * DEDUCAO_DEPENDENTE_MENSAL_2026;
  
  // Opção 1: Tabela Progressiva (Deduções Legais)
  const baseComDependentes = Math.max(0, baseCalculo - deducaoDependentes);
  let irrfProgressivo = 0;
  for (const faixa of TABELA_IRRF_MENSAL_2026) {
    if (baseComDependentes <= faixa.faixaAte) {
      irrfProgressivo = (baseComDependentes * faixa.aliquota) - faixa.deducao;
      break;
    }
  }
  if (irrfProgressivo < 0) irrfProgressivo = 0;

  // Opção 2: Desconto Simplificado
  const baseSimplificada = Math.max(0, baseCalculo - DESCONTO_SIMPLIFICADO_MENSAL_2026);
  let irrfSimplificado = 0;
  for (const faixa of TABELA_IRRF_MENSAL_2026) {
    if (baseSimplificada <= faixa.faixaAte) {
      irrfSimplificado = (baseSimplificada * faixa.aliquota) - faixa.deducao;
      break;
    }
  }
  if (irrfSimplificado < 0) irrfSimplificado = 0;

  // O contribuinte sempre paga o menor imposto
  const impostoBase = Math.min(irrfProgressivo, irrfSimplificado);

  // Aplicação do Redutor 2026 (Lei 15.270/2025)
  if (baseCalculo <= REDUTOR_IRRF_2026.limiteIsencao) {
    return 0;
  }
  
  if (baseCalculo <= REDUTOR_IRRF_2026.limiteReducao) {
    const fatorReducao = (REDUTOR_IRRF_2026.limiteReducao - baseCalculo) / (REDUTOR_IRRF_2026.limiteReducao - REDUTOR_IRRF_2026.limiteIsencao);
    return Math.max(0, impostoBase * (1 - fatorReducao));
  }

  return impostoBase;
}

export function calculateCompleteIR(salarioBruto: number, dependentes: number = 0, outrasDeducoes: number = 0) {
  const inss = calculateINSS(salarioBruto);
  const baseIR = salarioBruto - inss - outrasDeducoes;
  const irrf = calculateIRRF(baseIR, dependentes);
  
  return {
    bruto: salarioBruto,
    inss,
    baseIR,
    irrf,
    liquido: salarioBruto - inss - irrf,
  };
}
