'use client';

import { useState, useEffect } from 'react';
import { useQueryState, parseAsFloat, parseAsInteger } from 'nuqs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultCard } from '@/components/calculators/shared/ResultCard';
import { Disclaimer } from '@/components/calculators/shared/Disclaimer';
import { calculateCompleteIR } from '@/lib/finance/income-tax';
import { formatCurrency } from '@/lib/finance/utils';
import dynamic from 'next/dynamic';

const BarChart = dynamic(() => import('recharts').then(m => m.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(m => m.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(m => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(m => m.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(m => m.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(m => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(m => m.ResponsiveContainer), { ssr: false });
const Cell = dynamic(() => import('recharts').then(m => m.Cell), { ssr: false });

export default function IncomeTaxCalculator() {
  const [salary, setSalary] = useQueryState('s', parseAsFloat.withDefault(5000));
  const [dependents, setDependents] = useQueryState('d', parseAsInteger.withDefault(0));
  const [otherDeductions, setOtherDeductions] = useQueryState('o', parseAsFloat.withDefault(0));

  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const res = calculateCompleteIR(salary, dependents, otherDeductions);
    setResults(res);
  }, [salary, dependents, otherDeductions]);

  if (!results) return null;

  const chartData = [
    { name: 'Net Salary', value: results.net, color: '#10b981' },
    { name: 'INSS', value: results.inss, color: '#f59e0b' },
    { name: 'IRRF', value: results.irrf, color: '#ef4444' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Income Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="salary">Gross Salary (R$)</Label>
              <Input
                id="salary"
                type="number"
                value={salary}
                onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dependents">Number of Dependents</Label>
              <Input
                id="dependents"
                type="number"
                value={dependents}
                onChange={(e) => setDependents(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="otherDeductions">Other Deductions</Label>
              <Input
                id="otherDeductions"
                type="number"
                value={otherDeductions}
                onChange={(e) => setOtherDeductions(parseFloat(e.target.value) || 0)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-[rgba(0,113,227,0.10)] bg-[rgba(0,113,227,0.06)]/30">
            <CardHeader>
              <CardTitle className="text-lg">Monthly Summary 2026</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultCard
                label="Net Salary"
                value={formatCurrency(results.net)}
                variant="highlight"
                description="Value after taxes"
              />
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
                label="Effective Tax Rate"
                value={`${((results.inss + results.irrf) / results.gross * 100).toFixed(2)}%`}
                variant="muted"
                description="Total tax burden"
              />
            </CardContent>
          </Card>
          <Disclaimer text="Calculation based on the new 2026 rules, including the effective exemption of R$ 5,000.00." />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Gross Salary Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 40, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={100} />
                <Tooltip 
                  formatter={(value: any) => formatCurrency(value)}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
