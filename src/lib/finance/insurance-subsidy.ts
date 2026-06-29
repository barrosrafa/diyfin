import Decimal from 'decimal.js'

const TABELA_MIP_POR_IDADE: Record<string, number> = {
  '18-25': 0.0005,
  '26-35': 0.0007,
  '36-45': 0.0010,
  '46-55': 0.0015,
  '56-65': 0.0025,
  '66+': 0.0040,
}

function obterFaixaEtaria(idade: number): string {
  if (idade <= 25) return '18-25'
  if (idade <= 35) return '26-35'
  if (idade <= 45) return '36-45'
  if (idade <= 55) return '46-55'
  if (idade <= 65) return '56-65'
  return '66+'
}

export function calcularMIP(saldoDevedor: number, idade: number): number {
  const faixaEtaria = obterFaixaEtaria(idade)
  const aliquotaMIP = TABELA_MIP_POR_IDADE[faixaEtaria] || 0.0010
  const mip = new Decimal(saldoDevedor).mul(aliquotaMIP)
  return mip.toNumber()
}

export function calcularDFI(valorImovel: number): number {
  const aliquotaDFI = 0.0002
  const dfi = new Decimal(valorImovel).mul(aliquotaDFI)
  return dfi.toNumber()
}

export function calcularIdade(dataNascimento: string): number {
  const parts = dataNascimento.split('/').map(Number)
  if (parts.length !== 3) return 30
  const [dia, mes, ano] = parts
  const dataAtual = new Date()
  const anoAtual = dataAtual.getFullYear()
  const mesAtual = dataAtual.getMonth() + 1
  const diaAtual = dataAtual.getDate()

  let idade = anoAtual - ano
  if (mesAtual < mes || (mesAtual === mes && diaAtual < dia)) {
    idade--
  }
  return idade
}

export function calcularTotalSeguros(
  parcelas: Array<{ mip: number; dfi: number }>
): number {
  const total = parcelas.reduce(
    (acc, p) => acc.add(p.mip).add(p.dfi),
    new Decimal(0)
  )
  return total.toNumber()
}

interface SubsidioInput {
  rendaBruta: number
  valorImovel: number
  uf: string
  elegivel: boolean
}

const TABELA_SUBSIDIO: Record<string, number> = {
  FAIXA_1: 0.15,
  FAIXA_2: 0.10,
  FAIXA_3: 0.05,
  FAIXA_4: 0.00,
}

function obterFaixaRenda(rendaBruta: number): string {
  if (rendaBruta <= 2000) return 'FAIXA_1'
  if (rendaBruta <= 4000) return 'FAIXA_2'
  if (rendaBruta <= 8000) return 'FAIXA_3'
  return 'FAIXA_4'
}

export function calcularSubsidio({
  rendaBruta,
  valorImovel,
  elegivel,
}: SubsidioInput): number {
  if (!elegivel) return 0
  const faixa = obterFaixaRenda(rendaBruta)
  const percentualSubsidio = TABELA_SUBSIDIO[faixa] || 0
  const subsidio = new Decimal(valorImovel).mul(percentualSubsidio)
  const subsidioMaximo = new Decimal(valorImovel).mul(0.5)
  return subsidio.lessThan(subsidioMaximo) ? subsidio.toNumber() : subsidioMaximo.toNumber()
}

export function verificarElegibilidadeSubsidio(
  possuiFgts3Anos: boolean,
  jaBeneficiouFgts: boolean
): boolean {
  return possuiFgts3Anos && !jaBeneficiouFgts
}

export function calcularValorFinanciado(valorImovel: number, subsidio: number): number {
  return new Decimal(valorImovel).sub(subsidio).toNumber()
}
