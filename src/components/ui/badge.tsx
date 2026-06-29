import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

const variantStyles: Record<string, React.CSSProperties> = {
  default: {
    background: 'rgba(0,113,227,0.10)',
    color: '#0071e3',
    border: 'none',
  },
  secondary: {
    background: '#f5f5f7',
    color: '#1d1d1f',
    border: '1px solid #d2d2d7',
  },
  destructive: {
    background: 'rgba(255,59,48,0.10)',
    color: '#ff3b30',
    border: 'none',
  },
  outline: {
    background: 'transparent',
    color: '#1d1d1f',
    border: '1px solid #d2d2d7',
  },
}

export function Badge({ className, variant = 'default', style, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none',
        className
      )}
      style={{ ...variantStyles[variant], ...style }}
      {...props}
    />
  )
}
