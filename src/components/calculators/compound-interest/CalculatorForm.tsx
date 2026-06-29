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
 * Implementa máscaras de entrada, validação visual e design responsivo Pro Max.
 */
export function CalculatorForm({ values, errors, onChange }: CalculatorFormProps) {
  return (
    <div className="w-full bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header do Formulário */}
      <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <h3 className="text-lg font-semibold text-slate-900">Parâmetros da Simulação</h3>
        <p className="text-sm text-slate-500 mt-1">Configure os valores para calcular o crescimento do seu patrimônio</p>
      </div>

      {/* Conteúdo do Formulário */}
      <div className="p-6 space-y-6">
        {/* Linha 1: Valor Inicial e Aporte Mensal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Valor Inicial */}
          <div className="space-y-2">
            <Label htmlFor="capitalInicial" className="text-slate-700 font-medium">
              Valor Inicial
              <span className="text-slate-400 font-normal ml-1">(R$)</span>
            </Label>
            <div className="relative">
              <IMaskInput
                id="capitalInicial"
                {...CURRENCY_MASK}
                value={values.capitalInicial.toString()}
                unmask={true}
                onAccept={(value) => onChange('capitalInicial', Number(value))}
                placeholder="R$ 0,00"
                className={`flex h-11 w-full rounded-md border bg-white px-4 py-2.5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
                  errors.capitalInicial 
                    ? 'border-red-500 focus-visible:ring-red-500' 
                    : 'border-slate-300 hover:border-slate-400'
                }`}
              />
            </div>
            {errors.capitalInicial && (
              <p className="text-xs font-medium text-red-600 flex items-center gap-1 mt-1">
                <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.capitalInicial}
              </p>
            )}
          </div>

          {/* Aporte Mensal */}
          <div className="space-y-2">
            <Label htmlFor="aporteMensal" className="text-slate-700 font-medium">
              Aporte Mensal
              <span className="text-slate-400 font-normal ml-1">(R$)</span>
            </Label>
            <div className="relative">
              <IMaskInput
                id="aporteMensal"
                {...CURRENCY_MASK}
                value={values.aporteMensal.toString()}
                unmask={true}
                onAccept={(value) => onChange('aporteMensal', Number(value))}
                placeholder="R$ 0,00"
                className={`flex h-11 w-full rounded-md border bg-white px-4 py-2.5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
                  errors.aporteMensal 
                    ? 'border-red-500 focus-visible:ring-red-500' 
                    : 'border-slate-300 hover:border-slate-400'
                }`}
              />
            </div>
            {errors.aporteMensal && (
              <p className="text-xs font-medium text-red-600 flex items-center gap-1 mt-1">
                <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.aporteMensal}
              </p>
            )}
          </div>
        </div>

        {/* Linha 2: Taxa de Juros */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <Label htmlFor="taxaInput" className="text-slate-700 font-medium">
              Taxa de Juros
              <span className="text-slate-400 font-normal ml-1">(%)</span>
            </Label>
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg w-fit">
              <button
                onClick={() => onChange('taxaBase', 'mensal')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  values.taxaBase === 'mensal'
                    ? 'bg-white text-sky-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-pressed={values.taxaBase === 'mensal'}
              >
                Mensal
              </button>
              <button
                onClick={() => onChange('taxaBase', 'anual')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  values.taxaBase === 'anual'
                    ? 'bg-white text-sky-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-pressed={values.taxaBase === 'anual'}
              >
                Anual
              </button>
            </div>
          </div>
          <div className="relative">
            <IMaskInput
              id="taxaInput"
              {...PERCENT_MASK}
              value={values.taxaInput.toString()}
              unmask={true}
              onAccept={(value) => onChange('taxaInput', Number(value))}
              placeholder="0,00"
              className={`flex h-11 w-full rounded-md border bg-white px-4 py-2.5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
                errors.taxaInput 
                  ? 'border-red-500 focus-visible:ring-red-500' 
                  : 'border-slate-300 hover:border-slate-400'
              }`}
            />
          </div>
          {errors.taxaInput && (
            <p className="text-xs font-medium text-red-600 flex items-center gap-1 mt-1">
              <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
              {errors.taxaInput}
            </p>
          )}
        </div>

        {/* Linha 3: Período */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <Label htmlFor="periodoInput" className="text-slate-700 font-medium">
              Período
            </Label>
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg w-fit">
              <button
                onClick={() => onChange('periodoUnidade', 'meses')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  values.periodoUnidade === 'meses'
                    ? 'bg-white text-sky-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-pressed={values.periodoUnidade === 'meses'}
              >
                Meses
              </button>
              <button
                onClick={() => onChange('periodoUnidade', 'anos')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  values.periodoUnidade === 'anos'
                    ? 'bg-white text-sky-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-pressed={values.periodoUnidade === 'anos'}
              >
                Anos
              </button>
            </div>
          </div>
          <div className="relative">
            <Input
              id="periodoInput"
              type="number"
              value={values.periodoInput}
              onChange={(e) => onChange('periodoInput', Number(e.target.value))}
              placeholder="0"
              className={`h-11 text-sm focus-visible:ring-sky-500 focus-visible:ring-offset-2 transition-all duration-200 ${
                errors.periodoInput 
                  ? 'border-red-500 focus-visible:ring-red-500' 
                  : 'border-slate-300 hover:border-slate-400'
              }`}
            />
          </div>
          {errors.periodoInput && (
            <p className="text-xs font-medium text-red-600 flex items-center gap-1 mt-1">
              <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
              {errors.periodoInput}
            </p>
          )}
        </div>
      </div>

      {/* Footer com dica */}
      <div className="px-6 py-3 bg-sky-50/50 border-t border-slate-100 rounded-b-lg">
        <p className="text-xs text-slate-600">
          <span className="font-medium text-slate-700">💡 Dica:</span> Experimente diferentes cenários para encontrar a melhor estratégia de investimento.
        </p>
      </div>
    </div>
  )
}
