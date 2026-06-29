import Decimal from 'decimal.js'
import type {
  CompoundInterestInput,
  CompoundInterestResult,
  CompoundInterestRow,
} from './types'

export function calculateCompoundInterest(
  input: CompoundInterestInput
): CompoundInterestResult {
  const {
    initialValue,
    rate,
    rateType,
    period,
    periodType,
    monthlyContribution,
  } = input

  const initialDecimal = new Decimal(initialValue)
  const contributionDecimal = new Decimal(monthlyContribution)
  const rateDecimal = new Decimal(rate)

  let monthlyRateDecimal: Decimal
  if (rateType === 'annual' || rateType === 'ANUAL') {
    // (1 + rate/100)^(1/12) - 1
    monthlyRateDecimal = rateDecimal
      .div(100)
      .add(1)
      .pow(new Decimal(1).div(12))
      .sub(1)
  } else {
    monthlyRateDecimal = rateDecimal.div(100)
  }

  const totalMonths = (periodType === 'years' || periodType === 'ANOS') ? period * 12 : period

  const rows: CompoundInterestRow[] = []
  let balance = initialDecimal
  let totalInvested = initialDecimal
  let accumulatedInterest = new Decimal(0)

  rows.push({
    period: 0,
    monthlyInterest: 0,
    totalInvested: initialDecimal.toNumber(),
    accumulatedInterest: 0,
    accumulated: initialDecimal.toNumber(),
  })

  for (let month = 1; month <= totalMonths; month++) {
    const monthlyInterest = balance.mul(monthlyRateDecimal)
    accumulatedInterest = accumulatedInterest.add(monthlyInterest)
    balance = balance.add(monthlyInterest).add(contributionDecimal)
    totalInvested = initialDecimal.add(contributionDecimal.mul(month))

    rows.push({
      period: month,
      monthlyInterest: monthlyInterest.toNumber(),
      totalInvested: totalInvested.toNumber(),
      accumulatedInterest: accumulatedInterest.toNumber(),
      accumulated: balance.toNumber(),
    })
  }

  return {
    totalAmount: balance.toNumber(),
    totalInvested: totalInvested.toNumber(),
    totalInterest: accumulatedInterest.toNumber(),
    rows,
  }
}
