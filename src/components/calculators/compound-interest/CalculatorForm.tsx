'use client'

import React from 'react'
import { IMaskInput } from 'react-imask'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { CalculatorFormValues } from '@/lib/schemas/compound-interest.schema'
import { CURRENCY_MASK, PERCENT_MASK } from '@/lib/masks'

interface CalculatorFormProps {
  values: CalculatorFormValues
  errors: Partial<Record<keyof CalculatorFormValues, string>>
  onChange: (field: keyof CalculatorFormValues, value: any) => void
}

const appleInputClass = `flex w-full text-sm placeholder:text-[#86868b] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`
const appleInputStyle: React.CSSProperties = {
  height: '42px',
  padding: '0 14px',
  background: '#ffffff',
  border: '1px solid #d2d2d7',
  borderRadius: '10px',
  color: '#1d1d1f',
  fontSize: '0.95rem',
  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
}

function ToggleGroup({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div
      className="flex items-center gap-1 p-1"
      style={{ background: '#f5f5f7', borderRadius: '10px' }}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className="px-3 py-1.5 text-xs font-medium transition-all"
          style={{
            borderRadius: '8px',
            background: value === opt.value ? '#ffffff' : 'transparent',
            color: value === opt.value ? '#0071e3' : '#6e6e73',
            boxShadow: value === opt.value ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            fontWeight: value === opt.value ? 600 : 400,
            cursor: 'pointer',
            border: 'none',
          }}
          aria-pressed={value === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export function CalculatorForm({ values, errors, onChange }: CalculatorFormProps) {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = '#0071e3'
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,113,227,0.15)'
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = errors ? '#ff3b30' : '#d2d2d7'
    e.currentTarget.style.boxShadow = 'none'
  }

  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{ border: '1px solid #d2d2d7', background: '#ffffff' }}
    >
      {/* Header */}
      <div
        className="px-6 py-4"
        style={{ borderBottom: '1px solid #e5e5ea', background: '#f5f5f7' }}
      >
        <h3 className="text-base font-semibold" style={{ color: '#1d1d1f' }}>
          Parâmetros da Simulação
        </h3>
        <p className="text-xs mt-0.5" style={{ color: '#6e6e73' }}>
          Configure os valores para calcular o crescimento do seu patrimônio
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Valor Inicial + Aporte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { id: 'capitalInicial', label: 'Valor Inicial', suffix: '(R$)', mask: CURRENCY_MASK, field: 'capitalInicial' as const },
            { id: 'aporteMensal', label: 'Aporte Mensal', suffix: '(R$)', mask: CURRENCY_MASK, field: 'aporteMensal' as const },
          ].map(({ id, label, suffix, mask, field }) => (
            <div key={id} className="space-y-2">
              <Label htmlFor={id}>
                {label}{' '}
                <span style={{ color: '#86868b', fontWeight: 400 }}>{suffix}</span>
              </Label>
              <IMaskInput
                id={id}
                {...mask}
                value={values[field].toString()}
                unmask={true}
                onAccept={(value) => onChange(field, Number(value))}
                placeholder="R$ 0,00"
                className={appleInputClass}
                style={{
                  ...appleInputStyle,
                  borderColor: errors[field] ? '#ff3b30' : '#d2d2d7',
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {errors[field] && (
                <p className="text-xs font-medium" style={{ color: '#ff3b30' }}>
                  {errors[field]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Taxa de Juros */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <Label htmlFor="taxaInput">
              Taxa de Juros{' '}
              <span style={{ color: '#86868b', fontWeight: 400 }}>(%)</span>
            </Label>
            <ToggleGroup
              options={[{ label: 'Mensal', value: 'mensal' }, { label: 'Anual', value: 'anual' }]}
              value={values.taxaBase}
              onChange={(v) => onChange('taxaBase', v)}
            />
          </div>
          <IMaskInput
            id="taxaInput"
            {...PERCENT_MASK}
            value={values.taxaInput.toString()}
            unmask={true}
            onAccept={(value) => onChange('taxaInput', Number(value))}
            placeholder="0,00"
            className={appleInputClass}
            style={{
              ...appleInputStyle,
              borderColor: errors.taxaInput ? '#ff3b30' : '#d2d2d7',
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {errors.taxaInput && (
            <p className="text-xs font-medium" style={{ color: '#ff3b30' }}>{errors.taxaInput}</p>
          )}
        </div>

        {/* Período */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <Label htmlFor="periodoInput">Período</Label>
            <ToggleGroup
              options={[{ label: 'Meses', value: 'meses' }, { label: 'Anos', value: 'anos' }]}
              value={values.periodoUnidade}
              onChange={(v) => onChange('periodoUnidade', v)}
            />
          </div>
          <Input
            id="periodoInput"
            type="number"
            value={values.periodoInput}
            onChange={(e) => onChange('periodoInput', Number(e.target.value))}
            placeholder="0"
            style={errors.periodoInput ? { borderColor: '#ff3b30' } : {}}
          />
          {errors.periodoInput && (
            <p className="text-xs font-medium" style={{ color: '#ff3b30' }}>{errors.periodoInput}</p>
          )}
        </div>
      </div>

      {/* Footer dica */}
      <div
        className="px-6 py-3"
        style={{ borderTop: '1px solid #e5e5ea', background: '#f5f5f7' }}
      >
        <p className="text-xs" style={{ color: '#6e6e73' }}>
          <span style={{ color: '#1d1d1f', fontWeight: 600 }}>Dica:</span> Experimente diferentes cenários para encontrar a melhor estratégia.
        </p>
      </div>
    </div>
  )
}
