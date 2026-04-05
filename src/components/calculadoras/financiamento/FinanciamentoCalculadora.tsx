'use client';

import { useState, useEffect } from 'react';
import { useQueryState, parseAsFloat, parseAsInteger, parseAsStringLiteral } from 'nuqs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultCard } from '@/components/calculadoras/shared/ResultCard';
import { Disclaimer } from '@/components/calculadoras/shared/Disclaimer';
import { calculateFinancing } from '@/lib/calculadoras/financiamento';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function FinanciamentoCalculadora() {
  const [valorTotal, setValorTotal] = useQueryState('v', parseAsFloat.withDefault(300000));
  const [entrada, setEntrada] = useQueryState('e', parseAsFloat.withDefault(60000));
  const [taxaAnual, setTaxaAnual] = useQueryState('i', parseAsFloat.withDefault(10));
  const [prazo, setPrazo] = useQueryState('p', parseAsInteger.withDefault(360));
  const [sistema, setSistema] = useQueryState('s', parseAsStringLiteral(['SAC', 'PRICE']).withDefault('SAC'));

  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const res = calculateFinancing(valorTotal, entrada, taxaAnual, prazo, sistema as 'SAC' | 'PRICE');
    setResults(res);
  }, [valorTotal, entrada, taxaAnual, prazo, sistema]);

  if (!results) return null;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dados do Financiamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="valorTotal">Valor Total do Imóvel/Veículo (R$)</Label>
              <Input
                id="valorTotal"
                type="number"
                value={valorTotal}
                onChange={(e) => setValorTotal(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="entrada">Valor da Entrada (R$)</Label>
              <Input
                id="entrada"
                type="number"
                value={entrada}
                onChange={(e) => setEntrada(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxaAnual">Taxa de Juros Anual (%)</Label>
              <Input
                id="taxaAnual"
                type="number"
                value={taxaAnual}
                onChange={(e) => setTaxaAnual(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prazo">Prazo (meses)</Label>
              <Input
                id="prazo"
                type="number"
                value={prazo}
                onChange={(e) => setPrazo(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label>Sistema de Amortização</Label>
              <div className="flex gap-2">
                <Button 
                  variant={sistema === 'SAC' ? 'default' : 'outline'} 
                  className="flex-1"
                  onClick={() => setSistema('SAC')}
                >
                  SAC
                </Button>
                <Button 
                  variant={sistema === 'PRICE' ? 'default' : 'outline'} 
                  className="flex-1"
                  onClick={() => setSistema('PRICE')}
                >
                  PRICE
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-sky-100 bg-sky-50/30">
            <CardHeader>
              <CardTitle className="text-lg">Resumo das Parcelas</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultCard
                label="Primeira Parcela"
                value={formatCurrency(results.firstPayment)}
                variant="highlight"
              />
              <ResultCard
                label="Última Parcela"
                value={formatCurrency(results.lastPayment)}
                variant="default"
              />
              <ResultCard
                label="Total de Juros"
                value={formatCurrency(results.totalInterest)}
                variant="default"
              />
              <ResultCard
                label="Valor Total Pago"
                value={formatCurrency(results.totalPaid + entrada)}
                variant="muted"
                description="Incluindo entrada"
              />
            </CardContent>
          </Card>
          <Disclaimer text="Simulação técnica. Taxas reais podem variar conforme o banco e seguros obrigatórios." />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cronograma de Pagamentos (Amostra)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="px-4 py-3">Mês</th>
                  <th className="px-4 py-3">Parcela</th>
                  <th className="px-4 py-3">Juros</th>
                  <th className="px-4 py-3">Amortização</th>
                  <th className="px-4 py-3">Saldo Devedor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {results.schedule.map((row: any) => (
                  <tr key={row.month} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium">{row.month}</td>
                    <td className="px-4 py-3">{formatCurrency(row.payment)}</td>
                    <td className="px-4 py-3 text-red-500">{formatCurrency(row.interest)}</td>
                    <td className="px-4 py-3 text-emerald-600">{formatCurrency(row.amortization)}</td>
                    <td className="px-4 py-3 text-slate-500">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
