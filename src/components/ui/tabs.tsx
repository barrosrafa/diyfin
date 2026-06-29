import * as React from 'react'
import { cn } from '@/lib/utils'

interface TabsContextType {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = React.createContext<TabsContextType>({
  value: '',
  onValueChange: () => {},
})

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export function Tabs({ value: controlledValue, defaultValue = '', onValueChange, className, children, ...props }: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (!isControlled) setUncontrolledValue(newValue)
      onValueChange?.(newValue)
    },
    [isControlled, onValueChange]
  )

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('inline-flex h-10 items-center justify-center p-1', className)}
      style={{
        background: '#f5f5f7',
        borderRadius: '10px',
        ...style,
      }}
      {...props}
    />
  )
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export function TabsTrigger({ value, className, children, style, ...props }: TabsTriggerProps) {
  const { value: selectedValue, onValueChange } = React.useContext(TabsContext)
  const isSelected = selectedValue === value
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap px-4 py-1.5 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
        className
      )}
      style={{
        borderRadius: '8px',
        background: isSelected ? '#ffffff' : 'transparent',
        color: isSelected ? '#1d1d1f' : '#6e6e73',
        boxShadow: isSelected ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
        fontWeight: isSelected ? 600 : 400,
        ...style,
      }}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  )
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export function TabsContent({ value, className, children, ...props }: TabsContentProps) {
  const { value: selectedValue } = React.useContext(TabsContext)
  if (selectedValue !== value) return null
  return (
    <div
      role="tabpanel"
      className={cn('mt-2 focus-visible:outline-none', className)}
      {...props}
    >
      {children}
    </div>
  )
}
