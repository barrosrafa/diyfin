import { describe, it, expect } from 'vitest'
import { calculateCompoundInterest } from '../lib/finance/compound-interest'
import { calculateSimpleInterest } from '../lib/finance/simple-interest'
import { calcularPRICE } from '../lib/finance/price-engine'
import { calcularSAC } from '../lib/finance/sac-engine'
import { calculateFIITetoPrice } from '../lib/finance/fii-teto'
import { calculateFirstMillion } from '../lib/finance/first-million'
import { taxaAnualParaMensal, validarCPF } from '../lib/finance/utils'

describe('Motor Financeiro Unificado (Decimal.js)', () => {
  it('deve validar CPF corretamente com MOD11', () => {
    expect(validarCPF('00000000000')).toBe(false)
    expect(validarCPF('11111111111')).toBe(false)
  })

  it('deve converter taxa anual para mensal com precisão contínua', () => {
    const taxaMensal = taxaAnualParaMensal(12)
    expect(taxaMensal).toBeGreaterThan(0.9)
    expect(taxaMensal).toBeLessThan(1.0)
  })

  it('deve calcular juros compostos com exatidão', () => {
    const result = calculateCompoundInterest({
      initialValue: 1000,
      rate: 1,
      rateType: 'monthly',
      period: 12,
      periodType: 'months',
      monthlyContribution: 100,
    })
    expect(result.rows.length).toBe(13)
    expect(result.totalAmount).toBeGreaterThan(2200)
  })

  it('deve calcular juros simples com exatidão', () => {
    const result = calculateSimpleInterest({
      initialValue: 1000,
      rate: 1,
      rateType: 'monthly',
      period: 12,
      periodType: 'months',
    })
    expect(result.totalInterest).toBe(120)
    expect(result.totalAmount).toBe(1120)
  })

  it('deve calcular parcelas PRICE com prestação constante', () => {
    const output = calcularPRICE({
      principal: 100000,
      taxaMensal: 0.01,
      prazoMeses: 120,
    })
    expect(output.parcelas.length).toBe(120)
    expect(output.prestacaoConstante).toBeGreaterThan(0)
  })

  it('deve calcular parcelas SAC com amortização constante', () => {
    const output = calcularSAC({
      principal: 120000,
      taxaMensal: 0.01,
      prazoMeses: 120,
    })
    expect(output.parcelas.length).toBe(120)
    expect(output.parcelas[0].amortizacao).toBe(1000)
  })

  it('deve calcular preço teto de FII', () => {
    const result = calculateFIITetoPrice({
      type: 'tijolo',
      ntnbAverage: 6,
      currentPrice: 100,
      spread: 2,
      monthlyIncome: 1,
    })
    expect(result.targetYield).toBe(8)
    expect(result.tetoPrice).toBe(150)
    expect(result.isAboveTeto).toBe(false)
  })

  it('deve calcular aportes para o Primeiro Milhão', () => {
    const result = calculateFirstMillion({
      currentSavings: 10000,
      targetValue: 1000000,
      rate: 10,
      rateType: 'annual',
      period: 20,
      periodType: 'years',
    })
    expect(result.requiredMonthlyContribution).toBeGreaterThan(0)
    expect(result.rows.length).toBe(241)
  })
})
