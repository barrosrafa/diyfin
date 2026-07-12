'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { CalculatorFormValues } from '@/lib/schemas/compound-interest.schema'
import { DiyFormCard, DiyCurrencyInput, DiyPercentInput, DiyToggleGroup, diyTokens } from '@/components/diy'

interface CalculatorFormProps {
  values: CalculatorFormValues
  errors: Partial<Record<keyof CalculatorFormValues, string>>
  onChange: (field: keyof CalculatorFormValues, value: any) => void
}

export function CalculatorForm({ values, errors, onChange }: CalculatorFormProps) {
  return (
    <DiyFormCard
      title="Parâmetros da Simulação"
      description="Configure os valores para calcular o crescimento do seu patrimônio"
      tip="Experimente diferentes cenários para encontrar a melhor estratégia."
    >
      {/* Valor Inicial + Aporte */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          { id: 'initialValue', label: 'Valor Inicial', field: 'initialValue' as const },
          { id: 'monthlyContribution', label: 'Aporte Mensal', field: 'monthlyContribution' as const },
        ].map(({ id, label, field }) => (
          <div key={id} className="space-y-2">
            <Label htmlFor={id}>
              {label}{' '}
              <span style={{ color: diyTokens.color.placeholder, fontWeight: 400 }}>(R$)</span>
            </Label>
            <DiyCurrencyInput
              id={id}
              value={values[field]}
              onValueChange={(v) => onChange(field, v)}
              error={errors[field]}
            />
          </div>
        ))}
      </div>

      {/* Taxa de Juros */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <Label htmlFor="rate">
            Taxa de Juros{' '}
            <span style={{ color: diyTokens.color.placeholder, fontWeight: 400 }}>(%)</span>
          </Label>
          <DiyToggleGroup
            options={[{ label: 'Mensal', value: 'monthly' }, { label: 'Anual', value: 'annual' }]}
            value={values.rateType}
            onChange={(v) => onChange('rateType', v)}
          />
        </div>
        <DiyPercentInput
          id="rate"
          value={values.rate}
          onValueChange={(v) => onChange('rate', v)}
          error={errors.rate}
        />
      </div>

      {/* Período */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <Label htmlFor="period">Período</Label>
          <DiyToggleGroup
            options={[{ label: 'Meses', value: 'months' }, { label: 'Anos', value: 'years' }]}
            value={values.periodType}
            onChange={(v) => onChange('periodType', v)}
          />
        </div>
        <Input
          id="period"
          type="number"
          value={values.period}
          onChange={(e) => onChange('period', Number(e.target.value))}
          placeholder="0"
          style={errors.period ? { borderColor: diyTokens.color.danger } : {}}
        />
        {errors.period && (
          <p className="text-xs font-medium" style={{ color: diyTokens.color.danger }}>{errors.period}</p>
        )}
      </div>
    </DiyFormCard>
  )
}
