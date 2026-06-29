import Decimal from 'decimal.js'
import { taxaAnualParaMensal } from '../finance/utils'

export interface CalculatorInput {
  capitalInicial: number
  aporteMensal: number
  taxaMensal: number
  totalMeses: number
}

export interface MonthlyRow {
  mes: number
  saldoInicial: number
  aporte: number
  jurosMes: number
  saldoFinal: number
  totalInvestido: number
  totalJuros: number
}

export interface CalculatorResult {
  montanteFinal: number
  totalInvestido: number
  totalJuros: number
  schedule: MonthlyRow[]
}

export function calculateMonthlySchedule(input: CalculatorInput): CalculatorResult {
  const { capitalInicial, aporteMensal, taxaMensal, totalMeses } = input

  const initialDecimal = new Decimal(capitalInicial)
  const aporteDecimal = new Decimal(aporteMensal)
  const rateDecimal = new Decimal(taxaMensal)

  let saldo = initialDecimal
  const schedule: MonthlyRow[] = []

  for (let mes = 1; mes <= totalMeses; mes++) {
    const saldoInicial = saldo
    const jurosMes = rateDecimal.greaterThan(0) ? saldo.mul(rateDecimal) : new Decimal(0)
    saldo = saldoInicial.add(jurosMes).add(aporteDecimal)

    const totalInvestidoDecimal = initialDecimal.add(aporteDecimal.mul(mes))
    const totalJurosDecimal = saldo.sub(totalInvestidoDecimal)

    schedule.push({
      mes,
      saldoInicial: saldoInicial.toNumber(),
      aporte: aporteMensal,
      jurosMes: jurosMes.toNumber(),
      saldoFinal: saldo.toNumber(),
      totalInvestido: totalInvestidoDecimal.toNumber(),
      totalJuros: totalJurosDecimal.toNumber(),
    })
  }

  const lastRow = schedule[schedule.length - 1] || {
    saldoFinal: capitalInicial,
    totalInvestido: capitalInicial,
    totalJuros: 0,
  }

  return {
    montanteFinal: lastRow.saldoFinal,
    totalInvestido: lastRow.totalInvestido,
    totalJuros: lastRow.totalJuros,
    schedule,
  }
}

export function convertAnnualToMonthlyRate(annualRateDecimal: number): number {
  return taxaAnualParaMensal(annualRateDecimal * 100) / 100
}
