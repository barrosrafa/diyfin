import { describe, it, expect } from 'vitest'
import { calculateCompoundInterest } from '../../lib/finance/compound-interest'

describe('Motor de Cálculo de Juros Compostos', () => {
  it('R$10.000 a 1% ao mês por 12 meses sem aportes = R$11.268,25', () => {
    const result = calculateCompoundInterest({
      initialValue: 10000,
      monthlyContribution: 0,
      rate: 1,
      rateType: 'monthly',
      period: 12,
      periodType: 'months'
    })
    expect(result.totalAmount).toBeCloseTo(11268.25, 2)
    expect(result.totalInvested).toBe(10000)
    expect(result.totalInterest).toBeCloseTo(1268.25, 2)
  })

  it('Com aportes mensais, montante deve ser maior que sem aportes', () => {
    const semAporte = calculateCompoundInterest({ 
      initialValue: 1000, 
      monthlyContribution: 0, 
      rate: 1,
      rateType: 'monthly',
      period: 24,
      periodType: 'months' 
    })
    const comAporte = calculateCompoundInterest({ 
      initialValue: 1000, 
      monthlyContribution: 500, 
      rate: 1,
      rateType: 'monthly',
      period: 24,
      periodType: 'months' 
    })
    expect(comAporte.totalAmount).toBeGreaterThan(semAporte.totalAmount)
  })

  it('Com taxa 0%, montante = capital + (aportes × meses)', () => {
    const result = calculateCompoundInterest({ 
      initialValue: 1000, 
      monthlyContribution: 100, 
      rate: 0,
      rateType: 'monthly',
      period: 10,
      periodType: 'months' 
    })
    expect(result.totalAmount).toBe(2000)
    expect(result.totalInvested).toBe(2000)
    expect(result.totalInterest).toBe(0)
  })

  it('Deve gerar o schedule com o número correto de meses', () => {
    const result = calculateCompoundInterest({ 
      initialValue: 1000, 
      monthlyContribution: 100, 
      rate: 1,
      rateType: 'monthly',
      period: 36,
      periodType: 'months' 
    })
    // 36 months + 1 initial month = 37
    expect(result.rows).toHaveLength(37)
    expect(result.rows[0].period).toBe(0)
    expect(result.rows[36].period).toBe(36)
  })
})
