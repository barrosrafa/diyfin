import { cn } from '@/lib/utils';

interface ResultCardProps {
  label: string;
  value: string;
  variant?: 'default' | 'highlight' | 'muted';
  description?: string;
}

const variantStyles: Record<string, React.CSSProperties> = {
  default: {
    background: '#ffffff',
    border: '1px solid #d2d2d7',
  },
  highlight: {
    background: 'rgba(0,113,227,0.06)',
    border: '1px solid rgba(0,113,227,0.20)',
  },
  muted: {
    background: '#f5f5f7',
    border: '1px solid #e5e5ea',
  },
};

export function ResultCard({ label, value, variant = 'default', description }: ResultCardProps) {
  return (
    <div
      className={cn("p-4 rounded-2xl")}
      style={variantStyles[variant]}
    >
      <p
        className="text-xs font-semibold uppercase tracking-wider mb-1"
        style={{ color: '#6e6e73', letterSpacing: '0.05em' }}
      >
        {label}
      </p>
      <p
        className="text-2xl font-semibold"
        style={{
          color: variant === 'highlight' ? '#0071e3' : '#1d1d1f',
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </p>
      {description && (
        <p className="text-xs mt-1" style={{ color: '#86868b' }}>
          {description}
        </p>
      )}
    </div>
  );
}
