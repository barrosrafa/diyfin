'use client';

import { useState, useEffect } from 'react';
import { useQueryState, parseAsFloat, parseAsInteger } from 'nuqs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultCard } from '@/components/calculadoras/shared/ResultCard';
import { Disclaimer } from '@/components/calculadoras/shared/Disclaimer';
import { calculateINSS, calculateIRRF } from '@/lib/calculadoras/rescisao';
import { formatCurrency } from '@/lib/utils';

export function RescisaoCalculadora() {
  const [salario, setSalario] = useQueryState('s', parseAsFloat.withDefault(3500));
  const [dependentes, setDependentes] = useQueryState('d', parseAsInteger.withDefault(0));

  const [results, setResults] = useState({ inss: 0, irrf: 0, liquido: 0 });

  useEffect(() => {
    const inss = calculateINSS(salario);
    const irrf = calculateIRRF(salario - inss, dependentes);
    const liquido = salario - inss - irrf;
    setResults({ inss, irrf, liquido });
  }, [salario, dependentes]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dados do Salário</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="salario">Salário Bruto (R$)</Label>
            <Input
              id="salario"
              type="number"
              value={salario}
              onChange={(e) => setSalario(parseFloat(e.target.value) || 0)}
              placeholder="Ex: 3500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dependentes">Número de Dependentes</Label>
            <Input
              id="dependentes"
              type="number"
              value={dependentes}
              onChange={(e) => setDependentes(parseInt(e.target.value) || 0)}
              placeholder="Ex: 0"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="border-[rgba(0,113,227,0.10)] bg-[rgba(0,113,227,0.06)]/30">
          <CardHeader>
            <CardTitle className="text-lg">Descontos e Líquido 2026</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ResultCard
              label="Desconto INSS"
              value={formatCurrency(results.inss)}
              variant="default"
            />
            <ResultCard
              label="Desconto IRRF"
              value={formatCurrency(results.irrf)}
              variant="default"
            />
            <ResultCard
              label="Salário Líquido"
              value={formatCurrency(results.liquido)}
              variant="highlight"
              description="Valor após descontos fiscais"
            />
          </CardContent>
        </Card>
        <Disclaimer text="Cálculo baseado nas tabelas vigentes em 2026. Inclui o novo redutor de IRRF da Lei 15.270/2025." />
      </div>
    </div>
  );
}
