/**
 * Configurações de máscara para react-imask.
 * Padroniza a entrada de dados monetários e percentuais no padrão brasileiro.
 */

export const CURRENCY_MASK = {
  mask: 'R$ num',
  blocks: {
    num: {
      mask: Number,
      thousandsSeparator: '.',
      radix: ',',
      scale: 2,
      signed: false,
      normalizeZeros: true,
      padFractionalZeros: true,
    },
  },
}

export const PERCENT_MASK = {
  mask: 'num%',
  blocks: {
    num: {
      mask: Number,
      radix: ',',
      scale: 4,
      signed: false,
      max: 100,
    },
  },
}
