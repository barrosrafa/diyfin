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

/**
 * Componente de formulário para entrada de dados da calculadora.
 * Implementa máscaras de entrada e validação visual.
 */
export function CalculatorForm({ values, errors, onChange }: CalculatorFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Valor Inicial */}
      <div className="space-y-2">
        <Label htmlFor="capitalInicial">Valor Inicial</Label>
        <IMaskInput
          id="capitalInicial"
          {...CURRENCY_MASK}
          value={values.capitalInicial.toString()}
          unmask={true}
          onAccept={(value) => onChange('capitalInicial', Number(value))}
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.capitalInicial ? 'border-red-500' : ''
          }`}
        />
        {errors.capitalInicial && (
          <p className="text-xs text-red-500">{errors.capitalInicial}</p>
        )}
      </div>

      {/* Aporte Mensal */}
      <div className="space-y-2">
        <Label htmlFor="aporteMensal">Aporte Mensal</Label>
        <IMaskInput
          id="aporteMensal"
          {...CURRENCY_MASK}
          value={values.aporteMensal.toString()}
          unmask={true}
          onAccept={(value) => onChange('aporteMensal', Number(value))}
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.aporteMensal ? 'border-red-500' : ''
          }`}
        />
        {errors.aporteMensal && (
          <p className="text-xs text-red-500">{errors.aporteMensal}</p>
        )}
      </div>

      {/* Taxa de Juros */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="taxaInput">Taxa de Juros</Label>
          <div className="flex bg-gray-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => onChange('taxaBase', 'mensal')}
              className={`px-2 py-1 rounded-md transition-colors ${
                values.taxaBase === 'mensal' ? 'bg-white shadow-sm font-medium' : 'text-gray-500'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => onChange('taxaBase', 'anual')}
              className={`px-2 py-1 rounded-md transition-colors ${
                values.taxaBase === 'anual' ? 'bg-white shadow-sm font-medium' : 'text-gray-500'
              }`}
            >
              Anual
            </button>
          </div>
        </div>
        <IMaskInput
          id="taxaInput"
          {...PERCENT_MASK}
          value={values.taxaInput.toString()}
          unmask={true}
          onAccept={(value) => onChange('taxaInput', Number(value))}
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.taxaInput ? 'border-red-500' : ''
          }`}
        />
        {errors.taxaInput && (
          <p className="text-xs text-red-500">{errors.taxaInput}</p>
        )}
      </div>

      {/* Período */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="periodoInput">Período</Label>
          <div className="flex bg-gray-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => onChange('periodoUnidade', 'meses')}
              className={`px-2 py-1 rounded-md transition-colors ${
                values.periodoUnidade === 'meses' ? 'bg-white shadow-sm font-medium' : 'text-gray-500'
              }`}
            >
              Meses
            </button>
            <button
              onClick={() => onChange('periodoUnidade', 'anos')}
              className={`px-2 py-1 rounded-md transition-colors ${
                values.periodoUnidade === 'anos' ? 'bg-white shadow-sm font-medium' : 'text-gray-500'
              }`}
            >
              Anos
            </button>
          </div>
        </div>
        <Input
          id="periodoInput"
          type="number"
          value={values.periodoInput}
          onChange={(e) => onChange('periodoInput', Number(e.target.value))}
          className={errors.periodoInput ? 'border-red-500' : ''}
        />
        {errors.periodoInput && (
          <p className="text-xs text-red-500">{errors.periodoInput}</p>
        )}
      </div>
    </div>
  )
}
