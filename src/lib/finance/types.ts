export type RateType = 'monthly' | 'annual' | 'MENSAL' | 'ANUAL'
export type PeriodType = 'months' | 'years' | 'MESES' | 'ANOS'

export interface CompoundInterestInput {
  initialValue: number
  rate: number
  rateType: RateType
  period: number
  periodType: PeriodType
  monthlyContribution: number
}

export interface CompoundInterestRow {
  period: number
  monthlyInterest: number
  totalInvested: number
  accumulatedInterest: number
  accumulated: number
}

export interface CompoundInterestResult {
  totalAmount: number
  totalInvested: number
  totalInterest: number
  rows: CompoundInterestRow[]
}

export interface SimpleInterestInput {
  initialValue: number
  rate: number
  rateType: RateType
  period: number
  periodType: PeriodType
}

export interface SimpleInterestRow {
  period: number
  periodInterest: number
  accumulatedInterest: number
  accumulated: number
}

export interface SimpleInterestResult {
  totalAmount: number
  totalInterest: number
  rows: SimpleInterestRow[]
}

export interface FIITetoPriceInput {
  type: 'tijolo' | 'papel'
  ntnbAverage: number
  currentPrice: number
  spread: number
  monthlyIncome: number
}

export interface FIITetoPriceResult {
  tetoPrice: number
  currentYield: number
  targetYield: number
  isAboveTeto: boolean
  margin: number
}

export interface FirstMillionInput {
  currentSavings: number
  targetValue: number
  rate: number
  rateType: RateType
  period: number
  periodType: PeriodType
}

export interface FirstMillionRow {
  period: number
  monthlyContribution: number
  accumulatedInvested: number
  accumulatedInterest: number
  balance: number
}

export interface FirstMillionResult {
  requiredMonthlyContribution: number
  totalInvested: number
  totalInterest: number
  rows: FirstMillionRow[]
}

export interface Parcela {
  numero: number
  dataVencimento: string
  saldoDevedor: number
  amortizacao: number
  juros: number
  mip: number
  dfi: number
  prestacaoTotal: number
}

export interface FinanciamentoInput {
  principal: number
  taxaMensal: number
  prazoMeses: number
}

export interface FinanciamentoOutput {
  parcelas: Parcela[]
  totalJuros: number
  totalAmortizacao: number
  prestacaoConstante?: number
}
