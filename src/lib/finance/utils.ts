import Decimal from 'decimal.js'

/**
 * Utilitários para validação e cálculos financeiros estritos com Decimal.js
 */

export function validarCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '')
  if (digits.length !== 11) return false
  if (/^(\d)\1{10}$/.test(digits)) return false

  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(digits[i], 10) * (10 - i)
  }
  let resto = soma % 11
  const digito1 = resto < 2 ? 0 : 11 - resto

  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(digits[i], 10) * (11 - i)
  }
  resto = soma % 11
  const digito2 = resto < 2 ? 0 : 11 - resto

  return digito1 === parseInt(digits[9], 10) && digito2 === parseInt(digits[10], 10)
}

export function taxaAnualParaMensal(taxaAnualPercentual: number): number {
  const taxa = new Decimal(taxaAnualPercentual)
  const fator = taxa.div(100).add(1).pow(new Decimal(1).div(12))
  const taxaMensal = fator.sub(1).mul(100)
  return taxaMensal.toNumber()
}

export function taxaMensalParaAnual(taxaMensalPercentual: number): number {
  const taxa = new Decimal(taxaMensalPercentual)
  const fator = taxa.div(100).add(1).pow(12)
  const taxaAnual = fator.sub(1).mul(100)
  return taxaAnual.toNumber()
}

export function verificarCapacidadePagamento(
  rendaBrutaMensal: number,
  prestacao: number
): { elegivel: boolean; motivo?: string } {
  const capacidadeMaxima = new Decimal(rendaBrutaMensal).mul(0.3)
  const prestacaoDecimal = new Decimal(prestacao)

  if (prestacaoDecimal.lessThanOrEqualTo(capacidadeMaxima)) {
    return { elegivel: true }
  }

  const percentualComprometimento = prestacaoDecimal
    .div(rendaBrutaMensal)
    .mul(100)
    .toNumber()

  return {
    elegivel: false,
    motivo: `Prestação compromete ${percentualComprometimento.toFixed(1)}% da renda (máximo permitido: 30%)`,
  }
}

export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

export function formatarPercentual(valor: number, casasDecimais = 2): string {
  return `${(valor * 100).toFixed(casasDecimais)}%`
}

export function calcularCET(
  valorFinanciado: number,
  totalJuros: number,
  totalSeguros: number
): number {
  const cet = new Decimal(valorFinanciado).add(totalJuros).add(totalSeguros)
  return cet.toNumber()
}

export function calcularCETAnualizado(
  cet: number,
  valorFinanciado: number,
  prazoMeses: number
): number {
  const cetDecimal = new Decimal(cet)
  const vfDecimal = new Decimal(valorFinanciado)
  const taxa = cetDecimal.div(vfDecimal)
  const prazoAnos = new Decimal(prazoMeses).div(12)
  const cetAnualizado = taxa.div(prazoAnos).mul(100)
  return cetAnualizado.toNumber()
}

export const TABELA_TAXAS = {
  MCMV_FAIXA1: { base: 4.5, comRelacionamento: 4.25 },
  MCMV_FAIXA2: { base: 5.0, comRelacionamento: 4.75 },
  MCMV_FAIXA3: { base: 5.5, comRelacionamento: 5.25 },
  SFH: { base: 6.5, comRelacionamento: 6.0 },
  SFI: { base: 8.0, comRelacionamento: 7.5 },
  EGI: { base: 7.0, comRelacionamento: 6.5 },
} as const
