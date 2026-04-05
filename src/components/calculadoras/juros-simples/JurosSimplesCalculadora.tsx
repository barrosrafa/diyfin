'use client';

import { useState, useEffect } from 'react';
import { useQueryState, parseAsFloat } from 'nuqs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultCard } from '@/components/calculadoras/shared/ResultCard';
import { Disclaimer } from '@/components/calculadoras/shared/Disclaimer';
import { calculateSimpleInterest } from '@/lib/calculadoras/juros-simples';
import { formatCurrency } from '@/lib/utils';

export function JurosSimplesCalculadora() {
  const [capital, setCapital] = useQueryState('c', parseAsFloat.withDefault(1000));
  const [taxa, setTaxa] = useQueryState('i', parseAsFloat.withDefault(5));
  const [tempo, setTempo] = useQueryState('t', parseAsFloat.withDefault(12));

  const [results, setResults] = useState({ interest: 0, total: 0 });

  useEffect(() => {
    const res = calculateSimpleInterest(capital, taxa, tempo);
    setResults(res);
  }, [capital, taxa, tempo]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dados do Cálculo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="capital">Capital Inicial (R$)</Label>
            <Input
              id="capital"
              type="number"
              value={capital}
              onChange={(e) => setCapital(parseFloat(e.target.value) || 0)}
              placeholder="Ex: 1000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxa">Taxa de Juros (% ao período)</Label>
            <Input
              id="taxa"
              type="number"
              value={taxa}
              onChange={(e) => setTaxa(parseFloat(e.target.value) || 0)}
              placeholder="Ex: 5"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tempo">Tempo (períodos)</Label>
            <Input
              id="tempo"
              type="number"
              value={tempo}
              onChange={(e) => setTempo(parseFloat(e.target.value) || 0)}
              placeholder="Ex: 12"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="border-sky-100 bg-sky-50/30">
          <CardHeader>
            <CardTitle className="text-lg">Resultados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ResultCard
              label="Total de Juros"
              value={formatCurrency(results.interest)}
              variant="default"
            />
            <ResultCard
              label="Montante Final"
              value={formatCurrency(results.total)}
              variant="highlight"
              description="Capital + Juros"
            />
          </CardContent>
        </Card>
        <Disclaimer />
      </div>
    </div>
  );
}
