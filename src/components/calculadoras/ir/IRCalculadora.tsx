'use client';

import { useState, useEffect } from 'react';
import { useQueryState, parseAsFloat, parseAsInteger } from 'nuqs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultCard } from '@/components/calculadoras/shared/ResultCard';
import { Disclaimer } from '@/components/calculadoras/shared/Disclaimer';
import { calculateCompleteIR } from '@/lib/calculadoras/ir';
import { formatCurrency } from '@/lib/utils';
import dynamic from 'next/dynamic';

const BarChart = dynamic(() => import('recharts').then(m => m.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(m => m.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(m => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(m => m.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(m => m.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(m => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(m => m.ResponsiveContainer), { ssr: false });
const Cell = dynamic(() => import('recharts').then(m => m.Cell), { ssr: false });

export function IRCalculadora() {
  const [salario, setSalario] = useQueryState('s', parseAsFloat.withDefault(5000));
  const [dependentes, setDependentes] = useQueryState('d', parseAsInteger.withDefault(0));
  const [outrasDeducoes, setOutrasDeducoes] = useQueryState('o', parseAsFloat.withDefault(0));

  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const res = calculateCompleteIR(salario, dependentes, outrasDeducoes);
    setResults(res);
  }, [salario, dependentes, outrasDeducoes]);

  if (!results) return null;

  const chartData = [
    { name: 'Salário Líquido', value: results.liquido, color: '#10b981' },
    { name: 'INSS', value: results.inss, color: '#f59e0b' },
    { name: 'IRRF', value: results.irrf, color: '#ef4444' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dados do Rendimento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="salario">Salário Bruto (R$)</Label>
              <Input
                id="salario"
                type="number"
                value={salario}
                onChange={(e) => setSalario(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dependentes">Número de Dependentes</Label>
              <Input
                id="dependentes"
                type="number"
                value={dependentes}
                onChange={(e) => setDependentes(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="outrasDeducoes">Outras Deduções (Pensão, etc.)</Label>
              <Input
                id="outrasDeducoes"
                type="number"
                value={outrasDeducoes}
                onChange={(e) => setOutrasDeducoes(parseFloat(e.target.value) || 0)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-sky-100 bg-sky-50/30">
            <CardHeader>
              <CardTitle className="text-lg">Resumo Mensal 2026</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultCard
                label="Salário Líquido"
                value={formatCurrency(results.liquido)}
                variant="highlight"
                description="Valor após impostos"
              />
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
                label="Alíquota Efetiva"
                value={`${((results.inss + results.irrf) / results.bruto * 100).toFixed(2)}%`}
                variant="muted"
                description="Carga tributária total"
              />
            </CardContent>
          </Card>
          <Disclaimer text="Cálculo com base nas novas regras de 2026, incluindo a isenção efetiva de R$ 5.000,00." />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Distribuição do Salário Bruto</CardTitle>
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
