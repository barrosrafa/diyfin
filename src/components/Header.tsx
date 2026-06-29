'use client'

import React from 'react'

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{ background: 'rgba(0,0,0,0.82)', height: '44px' }}
    >
      <div
        className="mx-auto px-6 h-full flex items-center justify-between"
        style={{ maxWidth: '980px' }}
      >
        <a
          href="/"
          className="text-xs font-medium tracking-tight"
          style={{ color: '#f5f5f7', textDecoration: 'none' }}
        >
          diyfin<span style={{ color: '#86868b' }}>.com.br</span>
        </a>
        <nav className="hidden md:flex gap-7">
          {[
            { href: '/calculadora/juros-compostos', label: 'Juros Compostos' },
            { href: '/calculadora/financiamento-price', label: 'PRICE' },
            { href: '/calculadora/financiamento-sac', label: 'SAC' },
            { href: '/calculadora/preco-teto-fii', label: 'Preço Teto FII' },
            { href: '/calculadora/primeiro-milhao', label: 'Primeiro Milhão' },
            { href: '/investidor10', label: 'Mercado' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-xs transition-colors"
              style={{ color: '#a1a1a6', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f5f5f7')}
              onMouseLeave={e => (e.currentTarget.style.color = '#a1a1a6')}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
