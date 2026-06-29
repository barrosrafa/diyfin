import Decimal from 'decimal.js'
import type { FinancingInput, FinancingOutput, FinancingInstallment } from './types'

export function calculateSAC({
  principal,
  monthlyRate,
  months,
}: FinancingInput): FinancingOutput {
  const p = new Decimal(principal)
  const i = new Decimal(monthlyRate)
  const n = months

  const constantAmortization = p.div(n)
  const installments: FinancingInstallment[] = []
  let balance = p
  let totalInterest = new Decimal(0)

  for (let k = 1; k <= n; k++) {
    const interest = balance.mul(i)
    totalInterest = totalInterest.add(interest)

    const basePayment = constantAmortization.add(interest)
    balance = balance.sub(constantAmortization)

    if (balance.lessThan(0)) {
      balance = new Decimal(0)
    }

    const dueDateObj = new Date()
    dueDateObj.setMonth(dueDateObj.getMonth() + k)
    const dueDateStr = dueDateObj.toLocaleDateString('pt-BR')

    installments.push({
      month: k,
      dueDate: dueDateStr,
      balance: balance.toNumber(),
      amortization: constantAmortization.toNumber(),
      interest: interest.toNumber(),
      mip: 0,
      dfi: 0,
      totalPayment: basePayment.toNumber(),
    })
  }

  return {
    installments,
    totalInterest: totalInterest.toNumber(),
    totalAmortization: p.toNumber(),
  }
}
