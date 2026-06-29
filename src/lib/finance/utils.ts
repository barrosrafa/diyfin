import Decimal from 'decimal.js'

/**
 * Utility functions for strict financial validation and calculation using Decimal.js
 */

export function validateCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '')
  if (digits.length !== 11) return false
  if (/^(\d)\1{10}$/.test(digits)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i], 10) * (10 - i)
  }
  let remainder = sum % 11
  const digit1 = remainder < 2 ? 0 : 11 - remainder

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits[i], 10) * (11 - i)
  }
  remainder = sum % 11
  const digit2 = remainder < 2 ? 0 : 11 - remainder

  return digit1 === parseInt(digits[9], 10) && digit2 === parseInt(digits[10], 10)
}

export function annualToMonthlyRate(annualRatePercentage: number): number {
  const rate = new Decimal(annualRatePercentage)
  const factor = rate.div(100).add(1).pow(new Decimal(1).div(12))
  const monthlyRate = factor.sub(1).mul(100)
  return monthlyRate.toNumber()
}

export function monthlyToAnnualRate(monthlyRatePercentage: number): number {
  const rate = new Decimal(monthlyRatePercentage)
  const factor = rate.div(100).add(1).pow(12)
  const annualRate = factor.sub(1).mul(100)
  return annualRate.toNumber()
}

export function verifyPaymentCapacity(
  grossMonthlyIncome: number,
  installmentValue: number
): { eligible: boolean; reason?: string } {
  const maxCapacity = new Decimal(grossMonthlyIncome).mul(0.3)
  const installmentDecimal = new Decimal(installmentValue)

  if (installmentDecimal.lessThanOrEqualTo(maxCapacity)) {
    return { eligible: true }
  }

  const commitmentPercentage = installmentDecimal
    .div(grossMonthlyIncome)
    .mul(100)
    .toNumber()

  return {
    eligible: false,
    reason: `Installment commits ${commitmentPercentage.toFixed(1)}% of income (maximum allowed: 30%)`,
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatPercentage(value: number, decimals = 2): string {
  return `${(value * 100).toFixed(decimals)}%`
}

export function calculateCET(
  financedAmount: number,
  totalInterest: number,
  totalInsurance: number
): number {
  const cet = new Decimal(financedAmount).add(totalInterest).add(totalInsurance)
  return cet.toNumber()
}

export function calculateAnnualizedCET(
  cet: number,
  financedAmount: number,
  months: number
): number {
  const cetDecimal = new Decimal(cet)
  const vfDecimal = new Decimal(financedAmount)
  const rate = cetDecimal.div(vfDecimal)
  const years = new Decimal(months).div(12)
  const annualizedCET = rate.div(years).mul(100)
  return annualizedCET.toNumber()
}

export const RATE_TABLE = {
  MCMV_BAND1: { base: 4.5, withRelationship: 4.25 },
  MCMV_BAND2: { base: 5.0, withRelationship: 4.75 },
  MCMV_BAND3: { base: 5.5, withRelationship: 5.25 },
  SFH: { base: 6.5, withRelationship: 6.0 },
  SFI: { base: 8.0, withRelationship: 7.5 },
  EGI: { base: 7.0, withRelationship: 6.5 },
} as const
