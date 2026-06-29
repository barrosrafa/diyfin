export type CalculatorFormValues = {
  capitalInicial: number;
  aporteMensal: number;
  taxaInput: number;
  taxaBase: 'mensal' | 'anual';
  periodoInput: number;
  periodoUnidade: 'meses' | 'anos';
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

    // capitalInicial
    if (typeof data.capitalInicial !== 'number' || isNaN(data.capitalInicial)) {
      issues.push({ path: ['capitalInicial'], message: 'Informe um valor válido' });
    } else if (data.capitalInicial < 0) {
      issues.push({ path: ['capitalInicial'], message: 'Valor inicial não pode ser negativo' });
    }

    // aporteMensal
    if (typeof data.aporteMensal !== 'number' || isNaN(data.aporteMensal)) {
      issues.push({ path: ['aporteMensal'], message: 'Informe um valor válido' });
    } else if (data.aporteMensal < 0) {
      issues.push({ path: ['aporteMensal'], message: 'Aporte mensal não pode ser negativo' });
    }

    // taxaInput
    if (typeof data.taxaInput !== 'number' || isNaN(data.taxaInput)) {
      issues.push({ path: ['taxaInput'], message: 'Informe uma taxa válida' });
    } else if (data.taxaInput < 0) {
      issues.push({ path: ['taxaInput'], message: 'Taxa deve ser maior ou igual a zero' });
    } else if (data.taxaInput > 100) {
      issues.push({ path: ['taxaInput'], message: 'Taxa não pode ser maior que 100%' });
    }

    // periodoInput
    if (typeof data.periodoInput !== 'number' || isNaN(data.periodoInput)) {
      issues.push({ path: ['periodoInput'], message: 'Informe um período válido' });
    } else if (!Number.isInteger(data.periodoInput)) {
      issues.push({ path: ['periodoInput'], message: 'O período deve ser um número inteiro' });
    } else if (data.periodoInput < 1) {
      issues.push({ path: ['periodoInput'], message: 'Período mínimo é 1' });
    } else if (data.periodoInput > 600) {
      issues.push({ path: ['periodoInput'], message: 'Período máximo é 600 meses (50 anos)' });
    }

    // Refine logic: capitalInicial > 0 || aporteMensal > 0
    if (data.capitalInicial <= 0 && data.aporteMensal <= 0) {
      issues.push({ path: ['capitalInicial'], message: 'Informe um valor inicial ou um aporte mensal' });
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
