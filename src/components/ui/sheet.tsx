import * as React from 'react'
import { createPortal } from 'react-dom'
import { XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SheetContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const SheetContext = React.createContext<SheetContextType>({
  open: false,
  setOpen: () => {},
})

export interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

export function Sheet({ open: controlledOpen, onOpenChange, children }: SheetProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    },
    [isControlled, onOpenChange]
  )

  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  )
}

export function SheetTrigger({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { setOpen } = React.useContext(SheetContext)
  return (
    <div
      role="button"
      tabIndex={0}
      className={cn('inline-block cursor-pointer', className)}
      onClick={() => setOpen(true)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setOpen(true)
        }
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export function SheetPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return createPortal(children, document.body)
}

export function SheetOverlay({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const { open, setOpen } = React.useContext(SheetContext)
  if (!open) return null
  return (
    <div
      className={cn('fixed inset-0 z-50 bg-black/50 transition-opacity animate-in fade-in-0', className)}
      onClick={() => setOpen(false)}
    />
  )
}

export interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: 'top' | 'bottom' | 'left' | 'right'
}

export function SheetContent({ side = 'right', className, children, ...props }: SheetContentProps) {
  const { open, setOpen } = React.useContext(SheetContext)

  React.useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, setOpen])

  if (!open) return null

  const sideStyles = {
    top: 'top-0 inset-x-0 border-b',
    bottom: 'bottom-0 inset-x-0 border-t',
    left: 'left-0 inset-y-0 w-3/4 max-w-sm border-r',
    right: 'right-0 inset-y-0 w-3/4 max-w-sm border-l',
  }

  return (
    <SheetPortal>
      <SheetOverlay />
      <div
        className={cn(
          'fixed z-50 bg-background p-6 shadow-lg transition duration-300 animate-in',
          sideStyles[side],
          className
        )}
        {...props}
      >
        {children}
        <button
          type="button"
          className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
          onClick={() => setOpen(false)}
        >
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Fechar</span>
        </button>
      </div>
    </SheetPortal>
  )
}

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1 text-center sm:text-left', className)} {...props} />
}

export function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('text-lg font-semibold text-foreground', className)} {...props} />
}

export function SheetDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />
}
