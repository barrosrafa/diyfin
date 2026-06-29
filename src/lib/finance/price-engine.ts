import Decimal from 'decimal.js'
import type { FinancingInput, FinancingOutput, FinancingInstallment } from './types'

export function calculatePRICE({
  principal,
  monthlyRate,
  months,
}: FinancingInput): FinancingOutput {
  const p = new Decimal(principal)
  const i = new Decimal(monthlyRate)
  const n = months

  // Factor: (1 + i)^n
  const factor = i.add(1).pow(n)

  // PMT = P * [i * (1+i)^n] / [(1+i)^n - 1]
  const pmt = p.mul(i.mul(factor)).div(factor.sub(1))

  const installments: FinancingInstallment[] = []
  let balance = p
  let totalInterest = new Decimal(0)

  for (let k = 1; k <= n; k++) {
    const interest = balance.mul(i)
    totalInterest = totalInterest.add(interest)

    const amortization = pmt.sub(interest)
    balance = balance.sub(amortization)

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
      amortization: amortization.toNumber(),
      interest: interest.toNumber(),
      mip: 0,
      dfi: 0,
      totalPayment: pmt.toNumber(),
    })
  }

  return {
    installments,
    totalInterest: totalInterest.toNumber(),
    totalAmortization: p.toNumber(),
    constantPayment: pmt.toNumber(),
  }
}

export function getSummarizedInstallments(installments: FinancingInstallment[], showAll = false): FinancingInstallment[] {
  if (showAll || installments.length <= 13) {
    return installments
  }
  const first12 = installments.slice(0, 12)
  const last = installments[installments.length - 1]
  return [...first12, last]
}
