import Decimal from 'decimal.js'
import type { FinanciamentoInput, FinanciamentoOutput, Parcela } from './types'

export function calcularPRICE({
  principal,
  taxaMensal,
  prazoMeses,
}: FinanciamentoInput): FinanciamentoOutput {
  const P = new Decimal(principal)
  const i = new Decimal(taxaMensal)
  const n = prazoMeses

  // Fator: (1 + i)^n
  const fator = i.add(1).pow(n)

  // PMT = P * [i * (1+i)^n] / [(1+i)^n - 1]
  const pmt = P.mul(i.mul(fator)).div(fator.sub(1))

  const parcelas: Parcela[] = []
  let saldoDevedor = P
  let totalJuros = new Decimal(0)

  for (let k = 1; k <= n; k++) {
    const juros = saldoDevedor.mul(i)
    totalJuros = totalJuros.add(juros)

    const amortizacao = pmt.sub(juros)
    saldoDevedor = saldoDevedor.sub(amortizacao)

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
      amortizacao: amortizacao.toNumber(),
      juros: juros.toNumber(),
      mip: 0,
      dfi: 0,
      prestacaoTotal: pmt.toNumber(),
    })
  }

  return {
    parcelas,
    totalJuros: totalJuros.toNumber(),
    totalAmortizacao: P.toNumber(),
    prestacaoConstante: pmt.toNumber(),
  }
}

export function obterParcelasResumidas(parcelas: Parcela[], mostrarTodas = false): Parcela[] {
  if (mostrarTodas || parcelas.length <= 13) {
    return parcelas
  }
  const primeiras12 = parcelas.slice(0, 12)
  const ultima = parcelas[parcelas.length - 1]
  return [...primeiras12, ultima]
}
