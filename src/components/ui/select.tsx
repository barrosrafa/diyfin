import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[]
  onValueChange?: (value: string) => void
}

const SelectContext = React.createContext<{
  value: string
  onChange: (val: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}>({
  value: '',
  onChange: () => {},
  open: false,
  setOpen: () => {},
})

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, options, value: controlledValue, defaultValue, onChange, onValueChange, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue?.toString() || '')
    const [open, setOpen] = React.useState(false)

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue.toString() : uncontrolledValue

    const handleChange = React.useCallback(
      (val: string) => {
        if (!isControlled) setUncontrolledValue(val)
        onValueChange?.(val)
      },
      [isControlled, onValueChange]
    )

    if (options) {
      return (
        <div className="relative w-full">
          <select
            ref={ref}
            value={value}
            onChange={(e) => {
              handleChange(e.target.value)
              onChange?.(e)
            }}
            className={cn(
              'flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-8',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
        </div>
      )
    }

    return (
      <SelectContext.Provider value={{ value, onChange: handleChange, open, setOpen }}>
        <div className="relative w-full">{children}</div>
      </SelectContext.Provider>
    )
  }
)
Select.displayName = 'Select'

export function SelectTrigger({ className, children, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = React.useContext(SelectContext)
  return (
    <button
      type="button"
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
    </button>
  )
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = React.useContext(SelectContext)
  return <span>{value || placeholder}</span>
}

export function SelectContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = React.useContext(SelectContext)
  if (!open) return null
  return (
    <div
      className={cn(
        'absolute top-full mt-1 z-50 min-w-[8rem] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80',
        className
      )}
    >
      <div className="p-1">{children}</div>
    </div>
  )
}

export function SelectItem({ value, className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  const { value: selectedValue, onChange, setOpen } = React.useContext(SelectContext)
  const isSelected = selectedValue === value
  return (
    <div
      role="option"
      aria-selected={isSelected}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground cursor-pointer',
        isSelected && 'bg-accent text-accent-foreground font-medium',
        className
      )}
      onClick={() => {
        onChange(value)
        setOpen(false)
      }}
      {...props}
    >
      {children}
    </div>
  )
}
