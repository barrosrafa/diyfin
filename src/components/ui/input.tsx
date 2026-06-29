import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, style, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#86868b] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        style={{
          height: '42px',
          padding: '0 14px',
          background: '#ffffff',
          border: '1px solid #d2d2d7',
          borderRadius: '10px',
          color: '#1d1d1f',
          fontSize: '0.95rem',
          boxShadow: 'none',
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          ...style,
        }}
        onFocus={e => {
          e.currentTarget.style.borderColor = '#0071e3';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,113,227,0.15)';
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = '#d2d2d7';
          e.currentTarget.style.boxShadow = 'none';
        }}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
