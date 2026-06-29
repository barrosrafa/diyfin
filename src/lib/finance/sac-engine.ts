import Decimal from 'decimal.js'
import type { FinanciamentoInput, FinanciamentoOutput, Parcela } from './types'

export function calcularSAC({
  principal,
  taxaMensal,
  prazoMeses,
}: FinanciamentoInput): FinanciamentoOutput {
  const P = new Decimal(principal)
  const i = new Decimal(taxaMensal)
  const n = prazoMeses

  const amortizacaoConstante = P.div(n)
  const parcelas: Parcela[] = []
  let saldoDevedor = P
  let totalJuros = new Decimal(0)

  for (let k = 1; k <= n; k++) {
    const juros = saldoDevedor.mul(i)
    totalJuros = totalJuros.add(juros)

    const prestacaoBase = amortizacaoConstante.add(juros)
    saldoDevedor = saldoDevedor.sub(amortizacaoConstante)

    if (saldoDevedor.lessThan(0)) {
      saldoDevedor = new Decimal(0)
    }

    const dataVencimento = new Date()
    dataVencimento.setMonth(dataVencimento.getMonth() + k)
    const dataVencimentoStr = dataVencimento.toLocaleDateString('pt-BR')

    parcelas.push({
      numero: k,
      dataVencimento: dataVencimentoStr,
      saldoDevedor: saldoDevedor.toNumber(),
      amortizacao: amortizacaoConstante.toNumber(),
      juros: juros.toNumber(),
      mip: 0,
      dfi: 0,
      prestacaoTotal: prestacaoBase.toNumber(),
    })
  }

  return {
    parcelas,
    totalJuros: totalJuros.toNumber(),
    totalAmortizacao: P.toNumber(),
  }
}
