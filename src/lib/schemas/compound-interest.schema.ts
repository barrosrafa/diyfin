import { z } from 'zod'

/**
 * Schema de validação para o formulário de juros compostos.
 * Centraliza a lógica de validação e tipagem.
 *
 * Migrado de Zod v3 → v4:
 *  - invalid_type_error removido; usa message no lugar
 */
export const CalculatorFormSchema = z.object({
  capitalInicial: z
    .number({ message: 'Informe um valor válido' })
    .min(0, 'Valor inicial não pode ser negativo'),

  aporteMensal: z
    .number({ message: 'Informe um valor válido' })
    .min(0, 'Aporte mensal não pode ser negativo'),

  taxaInput: z
    .number({ message: 'Informe uma taxa válida' })
    .min(0, 'Taxa deve ser maior ou igual a zero')
    .max(100, 'Taxa não pode ser maior que 100%'),

  taxaBase: z.enum(['mensal', 'anual']),

  periodoInput: z
    .number({ message: 'Informe um período válido' })
    .int('O período deve ser um número inteiro')
    .min(1, 'Período mínimo é 1')
    .max(600, 'Período máximo é 600 meses (50 anos)'),

  periodoUnidade: z.enum(['meses', 'anos']),
}).refine((data) => {
  // Pelo menos um dos valores deve ser maior que zero para haver cálculo
  return data.capitalInicial > 0 || data.aporteMensal > 0
}, {
  message: "Informe um valor inicial ou um aporte mensal",
  path: ["capitalInicial"]
})

export type CalculatorFormValues = z.infer<typeof CalculatorFormSchema>
