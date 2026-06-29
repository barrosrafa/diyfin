import * as React from 'react'
import { createPortal } from 'react-dom'
import { XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DialogContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextType>({
  open: false,
  setOpen: () => {},
})

const DialogCompositionContext = React.createContext<{
  isComposing: () => boolean
  setComposing: (composing: boolean) => void
  justEndedComposing: () => boolean
  markCompositionEnd: () => void
}>({
  isComposing: () => false,
  setComposing: () => {},
  justEndedComposing: () => false,
  markCompositionEnd: () => {},
})

export const useDialogComposition = () => React.useContext(DialogCompositionContext)

export interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

export function Dialog({ open: controlledOpen, onOpenChange, children }: DialogProps) {
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

  const composingRef = React.useRef(false)
  const justEndedRef = React.useRef(false)
  const endTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const compositionValue = React.useMemo(
    () => ({
      isComposing: () => composingRef.current,
      setComposing: (composing: boolean) => {
        composingRef.current = composing
      },
      justEndedComposing: () => justEndedRef.current,
      markCompositionEnd: () => {
        justEndedRef.current = true
        if (endTimerRef.current) clearTimeout(endTimerRef.current)
        endTimerRef.current = setTimeout(() => {
          justEndedRef.current = false
        }, 150)
      },
    }),
    []
  )

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      <DialogCompositionContext.Provider value={compositionValue}>
        {children}
      </DialogCompositionContext.Provider>
    </DialogContext.Provider>
  )
}

export function DialogTrigger({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { setOpen } = React.useContext(DialogContext)
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

export function DialogPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null
  return createPortal(children, document.body)
}

export function DialogClose({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = React.useContext(DialogContext)
  return (
    <button
      type="button"
      className={className}
      onClick={() => setOpen(false)}
      {...props}
    >
      {children}
    </button>
  )
}

export function DialogOverlay({ className, onClick }: React.HTMLAttributes<HTMLDivElement>) {
  const { open, setOpen } = React.useContext(DialogContext)
  if (!open) return null
  return (
    <div
      className={cn('fixed inset-0 z-50 bg-black/50 transition-opacity animate-in fade-in-0', className)}
      onClick={(e) => {
        onClick?.(e)
        setOpen(false)
      }}
    />
  )
}

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  showCloseButton?: boolean
  onEscapeKeyDown?: (e: KeyboardEvent) => void
}

export function DialogContent({
  className,
  children,
  showCloseButton = true,
  onEscapeKeyDown,
  ...props
}: DialogContentProps) {
  const { open, setOpen } = React.useContext(DialogContext)
  const { isComposing } = useDialogComposition()

  React.useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const isCurrentlyComposing = (e as any).isComposing || isComposing()
        if (isCurrentlyComposing) {
          e.preventDefault()
          return
        }
        onEscapeKeyDown?.(e)
        if (!e.defaultPrevented) {
          setOpen(false)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, setOpen, isComposing, onEscapeKeyDown])

  if (!open) return null

  return (
    <DialogPortal>
      <DialogOverlay />
      <div
        className={cn(
          'fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg sm:max-w-lg animate-in zoom-in-95',
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <button
            type="button"
            className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
            onClick={() => setOpen(false)}
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </button>
        )}
      </div>
    </DialogPortal>
  )
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1.5 text-center sm:text-left', className)} {...props} />
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)} {...props} />
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />
}

export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />
}
