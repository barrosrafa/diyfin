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
    <div className="w-full mx-auto space-y-8 p-6 lg:p-10" style={{ maxWidth: '980px' }}>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-semibold"
            style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}
          >
            Painel de Ativos e Cotações
          </h1>
          <p className="mt-1" style={{ color: '#6e6e73', fontSize: '1rem' }}>
            Acompanhe indicadores de ações e fundos imobiliários em tempo real.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Input
            placeholder="Buscar ativo ou empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#86868b' }} />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Ibovespa */}
        <div
          className="rounded-2xl p-6"
          style={{ background: '#1d1d1f', color: '#ffffff' }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#86868b' }}>
            Ibovespa
          </p>
          <p className="text-3xl font-semibold mt-1" style={{ color: '#0071e3', letterSpacing: '-0.02em' }}>
            128.450 pts
          </p>
          <div className="flex items-center gap-1 mt-2 text-sm" style={{ color: '#30d158' }}>
            <TrendingUp className="h-4 w-4" />
            <span>+0.85% hoje</span>
          </div>
        </div>

        {/* IFIX */}
        <div
          className="rounded-2xl p-6"
          style={{ background: '#1d1d1f', color: '#ffffff' }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#86868b' }}>
            IFIX (FIIs)
          </p>
          <p className="text-3xl font-semibold mt-1" style={{ color: '#30d158', letterSpacing: '-0.02em' }}>
            3.340 pts
          </p>
          <div className="flex items-center gap-1 mt-2 text-sm" style={{ color: '#30d158' }}>
            <TrendingUp className="h-4 w-4" />
            <span>+0.32% hoje</span>
          </div>
        </div>

        {/* Dólar */}
        <div
          className="rounded-2xl p-6"
          style={{ background: '#1d1d1f', color: '#ffffff' }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#86868b' }}>
            Dólar PTAX
          </p>
          <p className="text-3xl font-semibold mt-1" style={{ color: '#ffd60a', letterSpacing: '-0.02em' }}>
            R$ 5,17
          </p>
          <div className="flex items-center gap-1 mt-2 text-sm" style={{ color: '#ff453a' }}>
            <TrendingDown className="h-4 w-4" />
            <span>-0.41% hoje</span>
          </div>
        </div>
      </div>

      {/* Assets List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Ativos Monitorados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((stock) => (
              <div
                key={stock.symbol}
                className="p-4 rounded-2xl space-y-3 transition-shadow"
                style={{
                  background: '#f5f5f7',
                  border: '1px solid #e5e5ea',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span
                      className="font-semibold text-lg"
                      style={{ color: '#1d1d1f', letterSpacing: '-0.01em' }}
                    >
                      {stock.symbol}
                    </span>
                    <p className="text-xs" style={{ color: '#6e6e73' }}>{stock.name}</p>
                  </div>
                  <Badge variant="secondary">{stock.type}</Badge>
                </div>

                <div
                  className="flex justify-between items-baseline pt-2"
                  style={{ borderTop: '1px solid #d2d2d7' }}
                >
                  <span
                    className="text-2xl font-semibold"
                    style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}
                  >
                    {formatarMoeda(stock.price)}
                  </span>
                  <span
                    className="text-sm font-semibold flex items-center gap-0.5"
                    style={{ color: stock.changePercent >= 0 ? '#30d158' : '#ff453a' }}
                  >
                    {stock.changePercent >= 0
                      ? <TrendingUp className="h-4 w-4" />
                      : <TrendingDown className="h-4 w-4" />
                    }
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                  </span>
                </div>

                <div
                  className="grid grid-cols-2 gap-2 text-xs pt-1"
                  style={{ color: '#6e6e73' }}
                >
                  <div>
                    Dividend Yield:{' '}
                    <strong style={{ color: '#1d1d1f', fontWeight: 600 }}>{stock.dy}%</strong>
                  </div>
                  <div>
                    P/L:{' '}
                    <strong style={{ color: '#1d1d1f', fontWeight: 600 }}>{stock.pe}x</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
