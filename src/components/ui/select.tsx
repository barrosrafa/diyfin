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
  ({ className, children, options, value: controlledValue, defaultValue, onChange, onValueChange, style, ...props }, ref) => {
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
            className={cn('flex w-full appearance-none pr-8 disabled:cursor-not-allowed disabled:opacity-50', className)}
            style={{
              height: '42px',
              padding: '0 14px',
              background: '#ffffff',
              border: '1px solid #d2d2d7',
              borderRadius: '10px',
              color: '#1d1d1f',
              fontSize: '0.95rem',
              cursor: 'pointer',
              ...style,
            }}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
            style={{ color: '#6e6e73' }}
          />
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

export function SelectTrigger({ className, children, style, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = React.useContext(SelectContext)
  return (
    <button
      type="button"
      className={cn('flex w-full items-center justify-between disabled:cursor-not-allowed disabled:opacity-50', className)}
      style={{
        height: '42px',
        padding: '0 14px',
        background: '#ffffff',
        border: '1px solid #d2d2d7',
        borderRadius: '10px',
        color: '#1d1d1f',
        fontSize: '0.95rem',
        cursor: 'pointer',
        ...style,
      }}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 ml-2" style={{ color: '#6e6e73' }} />
    </button>
  )
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = React.useContext(SelectContext)
  return <span style={{ color: value ? '#1d1d1f' : '#86868b' }}>{value || placeholder}</span>
}

export function SelectContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = React.useContext(SelectContext)
  if (!open) return null
  return (
    <div
      className={cn('absolute top-full mt-1 z-50 min-w-[8rem] w-full overflow-hidden', className)}
      style={{
        background: '#ffffff',
        border: '1px solid #d2d2d7',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
      }}
    >
      <div className="p-1">{children}</div>
    </div>
  )
}

export function SelectItem({ value, className, children, style, ...props }: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  const { value: selectedValue, onChange, setOpen } = React.useContext(SelectContext)
  const isSelected = selectedValue === value
  return (
    <div
      role="option"
      aria-selected={isSelected}
      className={cn('relative flex w-full cursor-pointer select-none items-center rounded-lg py-2 px-3 text-sm outline-none', className)}
      style={{
        color: isSelected ? '#0071e3' : '#1d1d1f',
        background: isSelected ? 'rgba(0,113,227,0.08)' : 'transparent',
        fontWeight: isSelected ? 600 : 400,
        ...style,
      }}
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
