import { 
  TABELA_INSS_2026, 
  TABELA_IRRF_MENSAL_2026, 
  REDUTOR_IRRF_2026,
  DEDUCAO_DEPENDENTE_MENSAL_2026,
  DESCONTO_SIMPLIFICADO_MENSAL_2026
} from '@/constants/tabelas-fiscais-2026';

export function calculateINSS(salarioBruto: number) {
  let inss = 0;
  let baseRestante = salarioBruto;
  let faixaAnterior = 0;

  for (const faixa of TABELA_INSS_2026) {
    const baseNaFaixa = Math.min(baseRestante, faixa.faixaAte - faixaAnterior);
    if (baseNaFaixa <= 0) break;
    
    inss += baseNaFaixa * faixa.aliquota;
    baseRestante -= baseNaFaixa;
    faixaAnterior = faixa.faixaAte;
  }

  // Se ainda sobrar base acima da última faixa (teto), o INSS já foi calculado até o teto
  // No entanto, a tabela fornecida no blueprint vai até 7786.02, mas o teto é 8475.55.
  // Vou ajustar a lógica para considerar o teto real.
  const TETO = 8475.55;
  if (salarioBruto > TETO) {
    // Recalcula para o teto se passar
    return calculateINSS(TETO);
  }

  return inss;
}

export function calculateIRRF(baseCalculo: number, dependentes: number = 0) {
  const baseComDependentes = baseCalculo - (dependentes * DEDUCAO_DEPENDENTE_MENSAL_2026);
  
  // Opção 1: Tabela Progressiva
  let irrfProgressivo = 0;
  for (const faixa of TABELA_IRRF_MENSAL_2026) {
    if (baseComDependentes <= faixa.faixaAte) {
      irrfProgressivo = (baseComDependentes * faixa.aliquota) - faixa.deducao;
      break;
    }
  }
  if (irrfProgressivo < 0) irrfProgressivo = 0;

  // Opção 2: Desconto Simplificado
  const baseSimplificada = baseCalculo - DESCONTO_SIMPLIFICADO_MENSAL_2026;
  let irrfSimplificado = 0;
  for (const faixa of TABELA_IRRF_MENSAL_2026) {
    if (baseSimplificada <= faixa.faixaAte) {
      irrfSimplificado = (baseSimplificada * faixa.aliquota) - faixa.deducao;
      break;
    }
  }
  if (irrfSimplificado < 0) irrfSimplificado = 0;

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

export function calculateRescisao(salario: number, mesesTrabalhados: number, feriasVencidas: boolean = false) {
  const inss = calculateINSS(salario);
  const irrf = calculateIRRF(salario - inss);
  const liquido = salario - inss - irrf;

  return {
    bruto: salario,
    inss,
    irrf,
    liquido,
  };
}
