export type CalculatorFormValues = {
  initialValue: number;
  monthlyContribution: number;
  rate: number;
  rateType: 'monthly' | 'annual';
  period: number;
  periodType: 'months' | 'years';
};

export type ValidationResult = {
  success: boolean;
  error?: {
    issues: {
      path: (keyof CalculatorFormValues)[];
      message: string;
    }[];
  };
};

export const CalculatorFormSchema = {
  safeParse: (data: any): ValidationResult => {
    const issues: { path: (keyof CalculatorFormValues)[]; message: string }[] = [];

    if (typeof data.initialValue !== 'number' || isNaN(data.initialValue)) {
      issues.push({ path: ['initialValue'], message: 'Informe um valor válido' });
    } else if (data.initialValue < 0) {
      issues.push({ path: ['initialValue'], message: 'Valor inicial não pode ser negativo' });
    }

    if (typeof data.monthlyContribution !== 'number' || isNaN(data.monthlyContribution)) {
      issues.push({ path: ['monthlyContribution'], message: 'Informe um valor válido' });
    } else if (data.monthlyContribution < 0) {
      issues.push({ path: ['monthlyContribution'], message: 'Aporte mensal não pode ser negativo' });
    }

    if (typeof data.rate !== 'number' || isNaN(data.rate)) {
      issues.push({ path: ['rate'], message: 'Informe uma taxa válida' });
    } else if (data.rate < 0) {
      issues.push({ path: ['rate'], message: 'Taxa deve ser maior ou igual a zero' });
    } else if (data.rate > 100) {
      issues.push({ path: ['rate'], message: 'Taxa não pode ser maior que 100%' });
    }

    if (typeof data.period !== 'number' || isNaN(data.period)) {
      issues.push({ path: ['period'], message: 'Informe um período válido' });
    } else if (!Number.isInteger(data.period)) {
      issues.push({ path: ['period'], message: 'O período deve ser um número inteiro' });
    } else if (data.period < 1) {
      issues.push({ path: ['period'], message: 'Período mínimo é 1' });
    } else if (data.period > 600) {
      issues.push({ path: ['period'], message: 'Período máximo é 600 meses (50 anos)' });
    }

    if (data.initialValue <= 0 && data.monthlyContribution <= 0) {
      issues.push({ path: ['initialValue'], message: 'Informe um valor inicial ou um aporte mensal' });
    }

    if (issues.length > 0) {
      return {
        success: false,
        error: { issues },
      };
    }

    return { success: true };
  },
};
