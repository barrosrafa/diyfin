import { cn } from '@/lib/utils';

interface ResultCardProps {
  label: string;
  value: string;
  variant?: 'default' | 'highlight' | 'muted';
  description?: string;
}

export function ResultCard({ label, value, variant = 'default', description }: ResultCardProps) {
  const variants = {
    default: "bg-white border-slate-200",
    highlight: "bg-sky-50 border-sky-200",
    muted: "bg-slate-50 border-slate-100",
  };

  return (
    <div className={cn("p-4 rounded-lg border", variants[variant])}>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{label}</p>
      <p className={cn("text-2xl font-bold", variant === 'highlight' ? 'text-sky-700' : 'text-slate-900')}>
        {value}
      </p>
      {description && <p className="text-xs text-slate-400 mt-1">{description}</p>}
    </div>
  );
}
