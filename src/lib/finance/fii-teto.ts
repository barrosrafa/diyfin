import Decimal from 'decimal.js'
import type { FIITetoPriceInput, FIITetoPriceResult } from './types'

export function calculateFIITetoPrice(
  input: FIITetoPriceInput
): FIITetoPriceResult {
  const { type, ntnbAverage, currentPrice, spread, monthlyIncome } = input

  const incomeDecimal = new Decimal(monthlyIncome)
  const currentPriceDecimal = new Decimal(currentPrice)

  // targetYield = ntnbAverage + spread
  const targetYieldDecimal = new Decimal(ntnbAverage).add(spread)

  let tetoPriceDecimal: Decimal
  if (type === 'tijolo') {
    // Teto = (Monthly Income * 12) / (Target Yield / 100)
    tetoPriceDecimal = incomeDecimal.mul(12).div(targetYieldDecimal.div(100))
  } else {
    // Papel FIIs get extra 2% risk premium
    const adjustedYield = targetYieldDecimal.add(2)
    tetoPriceDecimal = incomeDecimal.mul(12).div(adjustedYield.div(100))
  }

  const currentYieldDecimal = currentPriceDecimal.greaterThan(0)
    ? incomeDecimal.mul(12).div(currentPriceDecimal).mul(100)
    : new Decimal(0)

  const isAboveTeto = currentPriceDecimal.greaterThan(tetoPriceDecimal)

  const marginDecimal = tetoPriceDecimal.greaterThan(0)
    ? tetoPriceDecimal.sub(currentPriceDecimal).div(tetoPriceDecimal).mul(100)
    : new Decimal(0)

  return {
    tetoPrice: tetoPriceDecimal.toNumber(),
    currentYield: currentYieldDecimal.toNumber(),
    targetYield: targetYieldDecimal.toNumber(),
    isAboveTeto,
    margin: marginDecimal.toNumber(),
  }
}
