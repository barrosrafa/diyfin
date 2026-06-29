'use client';

import { useState, useEffect } from 'react';
import { useQueryState, parseAsFloat, parseAsInteger } from 'nuqs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultCard } from '@/components/calculadoras/shared/ResultCard';
import { Disclaimer } from '@/components/calculadoras/shared/Disclaimer';
import { calculateCompoundInterest } from '@/lib/calculadoras/juros-compostos';
import { formatCurrency } from '@/lib/utils';
import dynamic from 'next/dynamic';

const AreaChart = dynamic(() => import('recharts').then(m => m.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then(m => m.Area), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(m => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(m => m.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(m => m.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(m => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(m => m.ResponsiveContainer), { ssr: false });

export function JurosCompostosCalculadora() {
  const [capital, setCapital] = useQueryState('c', parseAsFloat.withDefault(1000));
  const [aporte, setAporte] = useQueryState('a', parseAsFloat.withDefault(100));
  const [taxa, setTaxa] = useQueryState('i', parseAsFloat.withDefault(1));
  const [tempo, setTempo] = useQueryState('t', parseAsInteger.withDefault(12));

  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const res = calculateCompoundInterest(capital, aporte, taxa, tempo);
    setResults(res);
  }, [capital, aporte, taxa, tempo]);

  if (!results) return null;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dados do Investimento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="capital">Capital Inicial (R$)</Label>
              <Input
                id="capital"
                type="number"
                value={capital}
                onChange={(e) => setCapital(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aporte">Aporte Mensal (R$)</Label>
              <Input
                id="aporte"
                type="number"
                value={aporte}
                onChange={(e) => setAporte(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxa">Taxa de Juros (% ao mês)</Label>
              <Input
                id="taxa"
                type="number"
                value={taxa}
                onChange={(e) => setTaxa(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tempo">Tempo (meses)</Label>
              <Input
                id="tempo"
                type="number"
                value={tempo}
                onChange={(e) => setTempo(parseInt(e.target.value) || 0)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-[rgba(0,113,227,0.10)] bg-[rgba(0,113,227,0.06)]/30">
            <CardHeader>
              <CardTitle className="text-lg">Resultados Acumulados</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultCard
                label="Valor Total Final"
                value={formatCurrency(results.total)}
                variant="highlight"
              />
              <ResultCard
                label="Total Investido"
                value={formatCurrency(results.totalInvested)}
                variant="default"
              />
              <ResultCard
                label="Total em Juros"
                value={formatCurrency(results.totalInterest)}
                variant="default"
              />
            </CardContent>
          </Card>
          <Disclaimer />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Evolução do Patrimônio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={results.data}>
                <defs>
                  <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" hide />
                <YAxis 
                  tickFormatter={(value) => `R$ ${value / 1000}k`}
                  stroke="#94a3b8"
                  fontSize={12}
                />
                <Tooltip 
                  formatter={(value: any) => formatCurrency(value)}
                  labelFormatter={(label) => `Mês ${label}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="invested" 
                  stroke="#94a3b8" 
                  fillOpacity={1} 
                  fill="url(#colorInvested)" 
                  name="Total Investido"
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#0ea5e9" 
                  fillOpacity={1} 
                  fill="url(#colorTotal)" 
                  name="Valor Total"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
