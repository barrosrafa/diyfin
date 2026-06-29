'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQueryState, parseAsFloat } from 'nuqs';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultCard } from '@/components/calculadoras/shared/ResultCard';
import { Disclaimer } from '@/components/calculadoras/shared/Disclaimer';
import { calculateSimpleInterest } from '@/lib/calculadoras/juros-simples';
import { formatCurrency } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, DollarSign, Calendar, Percent } from 'lucide-react';

// Importação dinâmica do gráfico para evitar erros de SSR com Recharts
const BarChartComponent = dynamic(
  () => import('recharts').then((mod) => {
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } = mod;
    return function Chart({ data }: { data: any[] }) {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis hide />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              formatter={(value) => [formatCurrency(typeof value === 'number' ? value : 0), '']}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={60}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#94a3b8' : '#0ea5e9'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    };
  }),
  { ssr: false, loading: () => <div className="h-[300px] w-full bg-slate-100 animate-pulse rounded-lg" /> }
);

export function JurosSimplesCalculadora() {
  const [capital, setCapital] = useQueryState('c', parseAsFloat.withDefault(1000));
  const [taxa, setTaxa] = useQueryState('i', parseAsFloat.withDefault(5));
  const [tempo, setTempo] = useQueryState('t', parseAsFloat.withDefault(12));

  const [results, setResults] = useState({ interest: 0, total: 0 });

  useEffect(() => {
    const res = calculateSimpleInterest(capital, taxa, tempo);
    setResults(res);
  }, [capital, taxa, tempo]);

  const chartData = useMemo(() => [
    { name: 'Capital Inicial', value: capital },
    { name: 'Juros Acumulados', value: results.interest },
  ], [capital, results.interest]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Coluna de Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <div className="h-1.5 bg-sky-500 w-full" />
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-sky-600" />
                Parâmetros do Cálculo
              </CardTitle>
              <CardDescription>Configure os valores para simular o rendimento linear.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="capital" className="flex items-center gap-2 text-slate-700">
                  <DollarSign className="w-4 h-4" /> Capital Inicial (R$)
                </Label>
                <Input
                  id="capital"
                  type="number"
                  value={capital}
                  onChange={(e) => setCapital(parseFloat(e.target.value) || 0)}
                  className="h-11 focus-visible:ring-sky-500 transition-all"
                  placeholder="Ex: 1.000,00"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxa" className="flex items-center gap-2 text-slate-700">
                    <Percent className="w-4 h-4" /> Taxa (% período)
                  </Label>
                  <Input
                    id="taxa"
                    type="number"
                    value={taxa}
                    onChange={(e) => setTaxa(parseFloat(e.target.value) || 0)}
                    className="h-11 focus-visible:ring-sky-500 transition-all"
                    placeholder="Ex: 5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tempo" className="flex items-center gap-2 text-slate-700">
                    <Calendar className="w-4 h-4" /> Tempo (períodos)
                  </Label>
                  <Input
                    id="tempo"
                    type="number"
                    value={tempo}
                    onChange={(e) => setTempo(parseFloat(e.target.value) || 0)}
                    className="h-11 focus-visible:ring-sky-500 transition-all"
                    placeholder="Ex: 12"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Disclaimer />
        </div>

        {/* Coluna de Resultados */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <ResultCard
                label="Total de Juros"
                value={formatCurrency(results.interest)}
                variant="default"
                description="Rendimento bruto acumulado"
              />
              <ResultCard
                label="Montante Final"
                value={formatCurrency(results.total)}
                variant="highlight"
                description="Capital inicial + Juros"
              />
            </motion.div>
          </AnimatePresence>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">Visualização do Crescimento</CardTitle>
              <CardDescription>Proporção entre o valor investido e o retorno gerado.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="pt-2">
                <BarChartComponent data={chartData} />
              </div>
              <div className="mt-4 flex justify-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-400" />
                  <span>Capital</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-sky-500" />
                  <span>Juros</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
