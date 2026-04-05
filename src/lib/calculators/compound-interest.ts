/**
 * Motor de cálculo de juros compostos.
 * Segue os princípios SOLID (SRP) sendo uma função pura e testável.
 */

export interface CalculatorInput {
  capitalInicial: number      // R$ — mínimo 0
  aporteMensal: number        // R$ — mínimo 0
  taxaMensal: number          // decimal — ex: 0.01 para 1%
  totalMeses: number          // inteiro — 1 a 600
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

/**
 * Calcula a evolução mensal de um investimento com juros compostos e aportes.
 * VF = [C × (1 + i)^n] + [PMT × (((1 + i)^n - 1) / i)]
 */
export function calculateMonthlySchedule(input: CalculatorInput): CalculatorResult {
  const { capitalInicial, aporteMensal, taxaMensal, totalMeses } = input
  
  let saldo = capitalInicial
  const schedule: MonthlyRow[] = []
  
  for (let mes = 1; mes <= totalMeses; mes++) {
    const saldoInicial = saldo
    const jurosMes = taxaMensal > 0 ? saldo * taxaMensal : 0
    
    // O aporte ocorre no final do período conforme o blueprint
    saldo = saldoInicial + jurosMes + aporteMensal
    
    const totalInvestido = capitalInicial + (aporteMensal * mes)
    const totalJuros = saldo - totalInvestido
    
    schedule.push({
      mes,
      saldoInicial,
      aporte: aporteMensal,
      jurosMes,
      saldoFinal: saldo,
      totalInvestido,
      totalJuros
    })
  }
  
  const lastRow = schedule[schedule.length - 1] || {
    saldoFinal: capitalInicial,
    totalInvestido: capitalInicial,
    totalJuros: 0
  }
  
  return {
    montanteFinal: lastRow.saldoFinal,
    totalInvestido: lastRow.totalInvestido,
    totalJuros: lastRow.totalJuros,
    schedule
  }
}

/**
 * Converte taxa anual para mensal (juros compostos)
 * i_mensal = (1 + i_anual)^(1/12) - 1
 */
export function convertAnnualToMonthlyRate(annualRate: number): number {
  return Math.pow(1 + annualRate, 1 / 12) - 1
}
