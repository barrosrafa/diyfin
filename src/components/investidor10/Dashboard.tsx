'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { formatarMoeda } from '@/lib/finance/utils'
import { TrendingUp, TrendingDown, Search } from 'lucide-react'

const stocks = [
  { symbol: 'TAEE11', name: 'Taesa', price: 43.87, changePercent: -1.24, dy: 8.2, pe: 12.5, type: 'Ações' },
  { symbol: 'ITUB4', name: 'Itaú Unibanco', price: 48.24, changePercent: -2.29, dy: 6.5, pe: 8.2, type: 'Ações' },
  { symbol: 'AMBV3', name: 'Ambev', price: 10.45, changePercent: 1.45, dy: 5.8, pe: 15.3, type: 'Ações' },
  { symbol: 'WEGE3', name: 'Weg', price: 54.03, changePercent: 0.82, dy: 3.2, pe: 22.5, type: 'Ações' },
  { symbol: 'PETR4', name: 'Petrobrás', price: 37.11, changePercent: -2.55, dy: 9.3, pe: 6.5, type: 'Ações' },
  { symbol: 'HGLG11', name: 'CSHG Logística', price: 162.50, changePercent: 0.45, dy: 8.9, pe: 11.2, type: 'FIIs' },
  { symbol: 'KNCR11', name: 'Kinea Rendimentos', price: 104.20, changePercent: 0.12, dy: 12.4, pe: 9.8, type: 'FIIs' },
]

export default function Investidor10Dashboard() {
  const [search, setSearch] = useState('')

  const filtered = stocks.filter(
    (s) => s.symbol.toLowerCase().includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Painel de Ativos e Cotações</h1>
          <p className="text-slate-600">Acompanhe indicadores de ações e fundos imobiliários em tempo real.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Input
            placeholder="Buscar ativo ou empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900 text-white">
          <CardContent className="p-6">
            <p className="text-xs text-slate-400 font-semibold uppercase">Ibovespa</p>
            <p className="text-3xl font-bold mt-1 text-sky-400">128.450 pts</p>
            <div className="flex items-center gap-1 mt-2 text-emerald-400 text-sm">
              <TrendingUp className="h-4 w-4" />
              <span>+0.85% hoje</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 text-white">
          <CardContent className="p-6">
            <p className="text-xs text-slate-400 font-semibold uppercase">IFIX (FIIs)</p>
            <p className="text-3xl font-bold mt-1 text-emerald-400">3.340 pts</p>
            <div className="flex items-center gap-1 mt-2 text-emerald-400 text-sm">
              <TrendingUp className="h-4 w-4" />
              <span>+0.32% hoje</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 text-white">
          <CardContent className="p-6">
            <p className="text-xs text-slate-400 font-semibold uppercase">Dólar PTAX</p>
            <p className="text-3xl font-bold mt-1 text-amber-400">R$ 5,17</p>
            <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
              <TrendingDown className="h-4 w-4" />
              <span>-0.41% hoje</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Lista de Ativos Monitorados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((stock) => (
              <div key={stock.symbol} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-lg text-slate-900">{stock.symbol}</span>
                    <p className="text-xs text-slate-500">{stock.name}</p>
                  </div>
                  <Badge variant="outline">{stock.type}</Badge>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t">
                  <span className="text-2xl font-bold text-slate-900">{formatarMoeda(stock.price)}</span>
                  <span className={`text-sm font-semibold flex items-center gap-0.5 ${stock.changePercent >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {stock.changePercent >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-1 text-slate-600">
                  <div>Dividend Yield: <strong className="text-slate-900">{stock.dy}%</strong></div>
                  <div>P/L: <strong className="text-slate-900">{stock.pe}x</strong></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
