import Decimal from 'decimal.js'
import type { FirstMillionInput, FirstMillionResult, FirstMillionRow } from './types'

export function calculateFirstMillion(
  input: FirstMillionInput
): FirstMillionResult {
  const {
    currentSavings,
    targetValue,
    rate,
    rateType,
    period,
    periodType,
  } = input

  const savingsDecimal = new Decimal(currentSavings)
  const targetDecimal = new Decimal(targetValue)
  const rateDecimal = new Decimal(rate)

  let monthlyRateDecimal: Decimal
  if (rateType === 'annual' || rateType === 'ANUAL') {
    monthlyRateDecimal = rateDecimal
      .div(100)
      .add(1)
      .pow(new Decimal(1).div(12))
      .sub(1)
  } else {
    monthlyRateDecimal = rateDecimal.div(100)
  }

  const totalMonths = (periodType === 'years' || periodType === 'ANOS') ? period * 12 : period

  // PMT = (FV - PV * (1+r)^n) * r / ((1+r)^n - 1)
  const factor = monthlyRateDecimal.add(1).pow(totalMonths)
  let pmtDecimal: Decimal

  if (monthlyRateDecimal.greaterThan(0)) {
    pmtDecimal = targetDecimal
      .sub(savingsDecimal.mul(factor))
      .mul(monthlyRateDecimal)
      .div(factor.sub(1))
  } else {
    pmtDecimal = targetDecimal.sub(savingsDecimal).div(totalMonths)
  }

  const rows: FirstMillionRow[] = []
  let balance = savingsDecimal
  let accumulatedInvested = savingsDecimal
  let accumulatedInterest = new Decimal(0)

  rows.push({
    period: 0,
    monthlyContribution: 0,
    accumulatedInvested: savingsDecimal.toNumber(),
    accumulatedInterest: 0,
    balance: savingsDecimal.toNumber(),
  })

  for (let month = 1; month <= totalMonths; month++) {
    const interest = balance.mul(monthlyRateDecimal)
    accumulatedInterest = accumulatedInterest.add(interest)
    balance = balance.add(interest).add(pmtDecimal)
    accumulatedInvested = savingsDecimal.add(pmtDecimal.mul(month))

    rows.push({
      period: month,
      monthlyContribution: pmtDecimal.toNumber(),
      accumulatedInvested: accumulatedInvested.toNumber(),
      accumulatedInterest: accumulatedInterest.toNumber(),
      balance: balance.toNumber(),
    })
  }

  return {
    requiredMonthlyContribution: pmtDecimal.toNumber(),
    totalInvested: accumulatedInvested.toNumber(),
    totalInterest: accumulatedInterest.toNumber(),
    rows,
  }
}
