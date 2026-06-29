import * as React from 'react'
import { cn } from '@/lib/utils'

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function Tooltip({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = React.useState(false)
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { visible })
        }
        return child
      })}
    </div>
  )
}

export function TooltipTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function TooltipContent({
  className,
  children,
  visible,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { visible?: boolean }) {
  if (!visible) return null
  return (
    <div
      className={cn(
        'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 overflow-hidden rounded-lg px-3 py-1.5 text-xs shadow-md pointer-events-none whitespace-nowrap',
        className
      )}
      style={{ background: '#1d1d1f', color: '#ffffff', ...(props as any).style }}
      {...props}
    >
      {children}
    </div>
  )
}
