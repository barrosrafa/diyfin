'use client';

import { useState, useEffect } from 'react';
import { useQueryState, parseAsFloat, parseAsInteger } from 'nuqs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultCard } from '@/components/calculators/shared/ResultCard';
import { Disclaimer } from '@/components/calculators/shared/Disclaimer';
import { calculateINSS, calculateIRRF } from '@/lib/finance/income-tax';
import { formatCurrency } from '@/lib/finance/utils';

export default function SeveranceCalculator() {
  const [salary, setSalary] = useQueryState('s', parseAsFloat.withDefault(3500));
  const [dependents, setDependents] = useQueryState('d', parseAsInteger.withDefault(0));

  const [results, setResults] = useState({ inss: 0, irrf: 0, net: 0 });

  useEffect(() => {
    const inss = calculateINSS(salary);
    const irrf = calculateIRRF(salary - inss, dependents);
    const net = salary - inss - irrf;
    setResults({ inss, irrf, net });
  }, [salary, dependents]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Salary Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="salary">Gross Salary (R$)</Label>
            <Input
              id="salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
              placeholder="Ex: 3500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dependents">Number of Dependents</Label>
            <Input
              id="dependents"
              type="number"
              value={dependents}
              onChange={(e) => setDependents(parseInt(e.target.value) || 0)}
              placeholder="Ex: 0"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="border-[rgba(0,113,227,0.10)] bg-[rgba(0,113,227,0.06)]/30">
          <CardHeader>
            <CardTitle className="text-lg">Discounts and Net 2026</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ResultCard
              label="INSS Discount"
              value={formatCurrency(results.inss)}
              variant="default"
            />
            <ResultCard
              label="IRRF Discount"
              value={formatCurrency(results.irrf)}
              variant="default"
            />
            <ResultCard
              label="Net Salary"
              value={formatCurrency(results.net)}
              variant="highlight"
              description="Value after tax discounts"
            />
          </CardContent>
        </Card>
        <Disclaimer text="Calculation based on the tables in force in 2026. Includes the new IRRF reducer of Law 15.270/2025." />
      </div>
    </div>
  );
}
