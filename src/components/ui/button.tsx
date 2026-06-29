import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', style, ...props }, ref) => {
    const variantStyles: Record<string, React.CSSProperties> = {
      default: {
        background: '#0071e3',
        color: '#ffffff',
        border: 'none',
      },
      destructive: {
        background: '#ff3b30',
        color: '#ffffff',
        border: 'none',
      },
      outline: {
        background: 'transparent',
        color: '#0071e3',
        border: '1px solid #0071e3',
      },
      secondary: {
        background: '#f5f5f7',
        color: '#1d1d1f',
        border: '1px solid #d2d2d7',
      },
      ghost: {
        background: 'transparent',
        color: '#1d1d1f',
        border: 'none',
      },
      link: {
        background: 'transparent',
        color: '#0071e3',
        border: 'none',
        textDecoration: 'underline',
        textUnderlineOffset: '4px',
      },
    }

    const sizeStyles: Record<string, React.CSSProperties> = {
      default: { height: '40px', padding: '0 20px', fontSize: '0.9rem' },
      sm:      { height: '34px', padding: '0 14px', fontSize: '0.8rem' },
      lg:      { height: '48px', padding: '0 28px', fontSize: '1rem' },
      icon:    { height: '40px', width: '40px', padding: '0' },
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        style={{
          borderRadius: '9999px',
          cursor: 'pointer',
          letterSpacing: '-0.01em',
          ...variantStyles[variant],
          ...sizeStyles[size],
          ...style,
        }}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
