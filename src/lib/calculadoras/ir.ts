import Decimal from 'decimal.js';
import {
  TABELA_INSS_2026,
  TABELA_IRRF_MENSAL_2026,
  REDUTOR_IRRF_2026,
  DEDUCAO_DEPENDENTE_MENSAL_2026,
  DESCONTO_SIMPLIFICADO_MENSAL_2026,
  TETO_INSS_2026,
} from '@/constants/tabelas-fiscais-2026';

/** Calcula o INSS mensal usando Decimal para precisão máxima */
export function calculateINSS(salarioBruto: number): number {
  const bruto = new Decimal(salarioBruto);
  const teto = new Decimal(TETO_INSS_2026);
  // Base de cálculo não supera o teto do INSS
  const base = Decimal.min(bruto, teto);

  let inss = new Decimal(0);
  let baseRestante = base;
  let faixaAnterior = new Decimal(0);

  for (const faixa of TABELA_INSS_2026) {
    const limitesFaixa = new Decimal(faixa.faixaAte).minus(faixaAnterior);
    const baseNaFaixa = Decimal.min(baseRestante, limitesFaixa);
    if (baseNaFaixa.lte(0)) break;

    inss = inss.plus(baseNaFaixa.times(faixa.aliquota));
    baseRestante = baseRestante.minus(baseNaFaixa);
    faixaAnterior = new Decimal(faixa.faixaAte);
  }

  return inss.toDecimalPlaces(2).toNumber();
}

/** Calcula o IRRF mensal usando Decimal, escolhendo o menor imposto entre
 *  tabela progressiva e desconto simplificado */
export function calculateIRRF(baseCalculo: number, dependentes: number = 0): number {
  const base = new Decimal(baseCalculo);
  const deducaoDependentes = new Decimal(dependentes).times(DEDUCAO_DEPENDENTE_MENSAL_2026);

  // Opção 1: Tabela Progressiva com deduções legais
  const baseProgressiva = Decimal.max(new Decimal(0), base.minus(deducaoDependentes));
  let irrfProgressivo = new Decimal(0);
  for (const faixa of TABELA_IRRF_MENSAL_2026) {
    if (baseProgressiva.lte(faixa.faixaAte)) {
      irrfProgressivo = baseProgressiva.times(faixa.aliquota).minus(faixa.deducao);
      break;
    }
  }
  irrfProgressivo = Decimal.max(new Decimal(0), irrfProgressivo);

  // Opção 2: Desconto Simplificado
  const baseSimplificada = Decimal.max(new Decimal(0), base.minus(DESCONTO_SIMPLIFICADO_MENSAL_2026));
  let irrfSimplificado = new Decimal(0);
  for (const faixa of TABELA_IRRF_MENSAL_2026) {
    if (baseSimplificada.lte(faixa.faixaAte)) {
      irrfSimplificado = baseSimplificada.times(faixa.aliquota).minus(faixa.deducao);
      break;
    }
  }
  irrfSimplificado = Decimal.max(new Decimal(0), irrfSimplificado);

  // Contribuinte paga o menor imposto
  const impostoBase = Decimal.min(irrfProgressivo, irrfSimplificado);

  // Redutor 2026 (Lei 15.270/2025)
  const { limiteIsencao, limiteReducao } = REDUTOR_IRRF_2026;
  if (base.lte(limiteIsencao)) return 0;

  if (base.lte(limiteReducao)) {
    const fatorReducao = new Decimal(limiteReducao)
      .minus(base)
      .div(new Decimal(limiteReducao).minus(limiteIsencao));
    return Decimal.max(new Decimal(0), impostoBase.times(new Decimal(1).minus(fatorReducao)))
      .toDecimalPlaces(2).toNumber();
  }

  return impostoBase.toDecimalPlaces(2).toNumber();
}

/** Cálculo completo de IR: INSS + IRRF + líquido */
export function calculateCompleteIR(
  salarioBruto: number,
  dependentes: number = 0,
  outrasDeducoes: number = 0
) {
  const inss = calculateINSS(salarioBruto);
  const baseIR = new Decimal(salarioBruto).minus(inss).minus(outrasDeducoes).toNumber();
  const irrf = calculateIRRF(baseIR, dependentes);

  return {
    bruto: salarioBruto,
    inss,
    baseIR,
    irrf,
    liquido: new Decimal(salarioBruto).minus(inss).minus(irrf).toDecimalPlaces(2).toNumber(),
  };
}
