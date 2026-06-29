import { describe, it, expect } from 'vitest'
import { calculateCompoundInterest } from '../lib/finance/compound-interest'
import { calculateSimpleInterest } from '../lib/finance/simple-interest'
import { calculatePRICE } from '../lib/finance/price-engine'
import { calculateSAC } from '../lib/finance/sac-engine'
import { calculateFIITetoPrice } from '../lib/finance/fii-teto'
import { calculateFirstMillion } from '../lib/finance/first-million'
import { annualToMonthlyRate, validateCPF } from '../lib/finance/utils'

describe('Motor Financeiro Unificado (Decimal.js)', () => {
  it('deve validar CPF corretamente com MOD11', () => {
    expect(validateCPF('00000000000')).toBe(false)
    expect(validateCPF('11111111111')).toBe(false)
  })

  it('deve converter taxa anual para mensal com precisão contínua', () => {
    const taxaMensal = annualToMonthlyRate(12)
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
    const output = calculatePRICE({
      principal: 100000,
      monthlyRate: 0.01,
      months: 120,
    })
    expect(output.installments.length).toBe(120)
    expect(output.constantPayment).toBeGreaterThan(0)
  })

  it('deve calcular parcelas SAC com amortização constante', () => {
    const output = calculateSAC({
      principal: 120000,
      monthlyRate: 0.01,
      months: 120,
    })
    expect(output.installments.length).toBe(120)
    expect(output.installments[0].amortization).toBe(1000)
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
