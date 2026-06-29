import Decimal from 'decimal.js';
import {
  TABELA_INSS_2026,
  TABELA_IRRF_MENSAL_2026,
  REDUTOR_IRRF_2026,
  DEDUCAO_DEPENDENTE_MENSAL_2026,
  DESCONTO_SIMPLIFICADO_MENSAL_2026,
  TETO_INSS_2026,
} from '@/constants/tabelas-fiscais-2026';

/** Calculates monthly INSS using Decimal for max precision */
export function calculateINSS(grossSalary: number): number {
  const gross = new Decimal(grossSalary);
  const ceiling = new Decimal(TETO_INSS_2026);
  // Base amount doesn't exceed INSS ceiling
  const base = Decimal.min(gross, ceiling);

  let inss = new Decimal(0);
  let remainingBase = base;
  let previousBracket = new Decimal(0);

  for (const bracket of TABELA_INSS_2026) {
    const bracketLimits = new Decimal(bracket.faixaAte).minus(previousBracket);
    const baseInBracket = Decimal.min(remainingBase, bracketLimits);
    if (baseInBracket.lte(0)) break;

    inss = inss.plus(baseInBracket.times(bracket.aliquota));
    remainingBase = remainingBase.minus(baseInBracket);
    previousBracket = new Decimal(bracket.faixaAte);
  }

  return inss.toDecimalPlaces(2).toNumber();
}

/** Calculates monthly IRRF using Decimal, choosing the lowest tax between
 *  progressive table and simplified discount */
export function calculateIRRF(calculationBase: number, dependents: number = 0): number {
  const base = new Decimal(calculationBase);
  const dependentsDeduction = new Decimal(dependents).times(DEDUCAO_DEPENDENTE_MENSAL_2026);

  // Option 1: Progressive Table with legal deductions
  const progressiveBase = Decimal.max(new Decimal(0), base.minus(dependentsDeduction));
  let progressiveIRRF = new Decimal(0);
  for (const bracket of TABELA_IRRF_MENSAL_2026) {
    if (progressiveBase.lte(bracket.faixaAte)) {
      progressiveIRRF = progressiveBase.times(bracket.aliquota).minus(bracket.deducao);
      break;
    }
  }
  progressiveIRRF = Decimal.max(new Decimal(0), progressiveIRRF);

  // Option 2: Simplified Discount
  const simplifiedBase = Decimal.max(new Decimal(0), base.minus(DESCONTO_SIMPLIFICADO_MENSAL_2026));
  let simplifiedIRRF = new Decimal(0);
  for (const bracket of TABELA_IRRF_MENSAL_2026) {
    if (simplifiedBase.lte(bracket.faixaAte)) {
      simplifiedIRRF = simplifiedBase.times(bracket.aliquota).minus(bracket.deducao);
      break;
    }
  }
  simplifiedIRRF = Decimal.max(new Decimal(0), simplifiedIRRF);

  // Taxpayer pays the lowest tax
  const baseTax = Decimal.min(progressiveIRRF, simplifiedIRRF);

  // Reducer 2026 (Lei 15.270/2025)
  const { limiteIsencao, limiteReducao } = REDUTOR_IRRF_2026;
  if (base.lte(limiteIsencao)) return 0;

  if (base.lte(limiteReducao)) {
    const reductionFactor = new Decimal(limiteReducao)
      .minus(base)
      .div(new Decimal(limiteReducao).minus(limiteIsencao));
    return Decimal.max(new Decimal(0), baseTax.times(new Decimal(1).minus(reductionFactor)))
      .toDecimalPlaces(2).toNumber();
  }

  return baseTax.toDecimalPlaces(2).toNumber();
}

/** Complete Income Tax calculation: INSS + IRRF + Net */
export function calculateCompleteIR(
  grossSalary: number,
  dependents: number = 0,
  otherDeductions: number = 0
) {
  const inss = calculateINSS(grossSalary);
  const irBase = new Decimal(grossSalary).minus(inss).minus(otherDeductions).toNumber();
  const irrf = calculateIRRF(irBase, dependents);

  return {
    gross: grossSalary,
    inss,
    irBase,
    irrf,
    net: new Decimal(grossSalary).minus(inss).minus(irrf).toDecimalPlaces(2).toNumber(),
  };
}
