import { describe, it, expect } from 'vitest'
import { calculateMonthlySchedule, convertAnnualToMonthlyRate } from '../../lib/calculators/compound-interest'

describe('Motor de Cálculo de Juros Compostos', () => {
  it('R$10.000 a 1% ao mês por 12 meses sem aportes = R$11.268,25', () => {
    const result = calculateMonthlySchedule({
      capitalInicial: 10000,
      aporteMensal: 0,
      taxaMensal: 0.01,
      totalMeses: 12,
    })
    expect(result.montanteFinal).toBeCloseTo(11268.25, 2)
    expect(result.totalInvestido).toBe(10000)
    expect(result.totalJuros).toBeCloseTo(1268.25, 2)
  })

  it('Taxa anual 12% deve converter para ~0.9489% ao mês', () => {
    const taxaMensal = convertAnnualToMonthlyRate(0.12)
    expect(taxaMensal).toBeCloseTo(0.00948879, 8)
  })

  it('Com aportes mensais, montante deve ser maior que sem aportes', () => {
    const semAporte = calculateMonthlySchedule({ 
      capitalInicial: 1000, 
      aporteMensal: 0, 
      taxaMensal: 0.01, 
      totalMeses: 24 
    })
    const comAporte = calculateMonthlySchedule({ 
      capitalInicial: 1000, 
      aporteMensal: 500, 
      taxaMensal: 0.01, 
      totalMeses: 24 
    })
    expect(comAporte.montanteFinal).toBeGreaterThan(semAporte.montanteFinal)
  })

  it('Com taxa 0%, montante = capital + (aportes × meses)', () => {
    const result = calculateMonthlySchedule({ 
      capitalInicial: 1000, 
      aporteMensal: 100, 
      taxaMensal: 0, 
      totalMeses: 10 
    })
    expect(result.montanteFinal).toBe(2000)
    expect(result.totalInvestido).toBe(2000)
    expect(result.totalJuros).toBe(0)
  })

  it('Deve gerar o schedule com o número correto de meses', () => {
    const totalMeses = 36
    const result = calculateMonthlySchedule({ 
      capitalInicial: 1000, 
      aporteMensal: 100, 
      taxaMensal: 0.01, 
      totalMeses 
    })
    expect(result.schedule).toHaveLength(totalMeses)
    expect(result.schedule[0].mes).toBe(1)
    expect(result.schedule[totalMeses - 1].mes).toBe(totalMeses)
  })
})
