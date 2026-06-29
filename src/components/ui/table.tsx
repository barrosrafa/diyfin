import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TableColumn {
  key: string
  label: string
  format?: (value: any) => string
}

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  columns?: TableColumn[]
  data?: any[]
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, columns, data, children, ...props }, ref) => {
    if (columns && data) {
      return (
        <div
          className="relative w-full overflow-auto"
          style={{ borderRadius: '14px', border: '1px solid #d2d2d7', background: '#ffffff' }}
        >
          <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props}>
            <thead style={{ background: '#f5f5f7', borderBottom: '1px solid #d2d2d7' }}>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="h-10 px-4 text-left align-middle font-semibold"
                    style={{ color: '#6e6e73', fontSize: '0.8rem', letterSpacing: '0.02em' }}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  style={{
                    background: index % 2 === 0 ? '#ffffff' : '#f5f5f7',
                    borderBottom: index < data.length - 1 ? '1px solid #e5e5ea' : 'none',
                  }}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="p-4 align-middle"
                      style={{ color: '#1d1d1f', fontSize: '0.9rem' }}
                    >
                      {column.format ? column.format(row[column.key]) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }

    return (
      <div
        className="relative w-full overflow-auto"
        style={{ borderRadius: '14px', border: '1px solid #d2d2d7', background: '#ffffff' }}
      >
        <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props}>
          {children}
        </table>
      </div>
    )
  }
)
Table.displayName = 'Table'

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, style, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(className)}
      style={{ background: '#f5f5f7', borderBottom: '1px solid #d2d2d7', ...style }}
      {...props}
    />
  )
)
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
  )
)
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, style, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('font-semibold', className)}
      style={{ background: '#f5f5f7', borderTop: '1px solid #d2d2d7', ...style }}
      {...props}
    />
  )
)
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, style, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn('transition-colors', className)}
      style={{ borderBottom: '1px solid #e5e5ea', ...style }}
      {...props}
    />
  )
)
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, style, ...props }, ref) => (
    <th
      ref={ref}
      className={cn('h-10 px-4 text-left align-middle font-semibold', className)}
      style={{ color: '#6e6e73', fontSize: '0.8rem', letterSpacing: '0.02em', ...style }}
      {...props}
    />
  )
)
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, style, ...props }, ref) => (
    <td
      ref={ref}
      className={cn('p-4 align-middle', className)}
      style={{ color: '#1d1d1f', fontSize: '0.9rem', ...style }}
      {...props}
    />
  )
)
TableCell.displayName = 'TableCell'

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell }
