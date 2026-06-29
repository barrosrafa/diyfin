import Decimal from 'decimal.js'
import type {
  SimpleInterestInput,
  SimpleInterestResult,
  SimpleInterestRow,
} from './types'

export function calculateSimpleInterest(
  input: SimpleInterestInput
): SimpleInterestResult {
  const { initialValue, rate, rateType, period, periodType } = input

  const initialDecimal = new Decimal(initialValue)
  const rateDecimal = new Decimal(rate)

  let monthlyRateDecimal: Decimal
  if (rateType === 'annual' || rateType === 'ANUAL') {
    monthlyRateDecimal = rateDecimal.div(100).div(12)
  } else {
    monthlyRateDecimal = rateDecimal.div(100)
  }

  const totalMonths = (periodType === 'years' || periodType === 'ANOS') ? period * 12 : period

  const rows: SimpleInterestRow[] = []
  let accumulatedInterest = new Decimal(0)

  rows.push({
    period: 0,
    periodInterest: 0,
    accumulatedInterest: 0,
    accumulated: initialDecimal.toNumber(),
  })

  for (let month = 1; month <= totalMonths; month++) {
    const periodInterest = initialDecimal.mul(monthlyRateDecimal)
    accumulatedInterest = accumulatedInterest.add(periodInterest)

    rows.push({
      period: month,
      periodInterest: periodInterest.toNumber(),
      accumulatedInterest: accumulatedInterest.toNumber(),
      accumulated: initialDecimal.add(accumulatedInterest).toNumber(),
    })
  }

  return {
    totalAmount: initialDecimal.add(accumulatedInterest).toNumber(),
    totalInterest: accumulatedInterest.toNumber(),
    rows,
  }
}
