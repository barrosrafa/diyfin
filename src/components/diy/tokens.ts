/**
 * Design tokens do diyfin (estilo Apple HIG).
 * Centraliza valores antes duplicados em ui/button.tsx, ui/card.tsx,
 * ui/input.tsx, ui/select.tsx e CalculatorForm.tsx.
 */
export const diyTokens = {
  color: {
    text: '#1d1d1f',
    textSecondary: '#6e6e73',
    placeholder: '#86868b',
    border: '#d2d2d7',
    borderSubtle: '#e5e5ea',
    surface: '#ffffff',
    surfaceMuted: '#f5f5f7',
    primary: '#0071e3',
    primarySoft: 'rgba(0,113,227,0.08)',
    primaryRing: 'rgba(0,113,227,0.15)',
    danger: '#ff3b30',
    dangerSoft: 'rgba(255,59,48,0.10)',
  },
  radius: {
    input: '10px',
    card: '16px',
    pill: '9999px',
  },
  shadow: {
    card: '0 2px 12px rgba(0,0,0,0.06)',
    popover: '0 8px 32px rgba(0,0,0,0.10)',
  },
} as const
