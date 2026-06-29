/**
 * Box — Componente contentor base do design system diyfin.
 *
 * Variantes:
 *   default   → fundo de superfície sólida, borda sutil
 *   glass     → glass-morphism: blur(12px) + fundo translúcido
 *   elevated  → superfície elevada com sombra pronunciada
 *   ghost     → sem fundo, apenas estrutura de padding
 *
 * Compatível com os temas claro e escuro via tokens CSS
 * definidos em src/styles/tokens.css.
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

/* ─── Tipos ───────────────────────────────────────────────────── */

type BoxVariant = 'default' | 'glass' | 'elevated' | 'ghost';
type BoxRadius  = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
type BoxPadding = 'none' | 'sm' | 'md' | 'lg';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Estilo visual do container. @default 'default' */
  variant?: BoxVariant;
  /** Raio de borda. @default 'lg' */
  radius?: BoxRadius;
  /** Padding interno pré-definido. @default 'md' */
  padding?: BoxPadding;
  /** Ativa borda no modo default/elevated. @default true */
  bordered?: boolean;
  /** Ativa animação de entrada fade-in. @default false */
  animate?: boolean;
  /** Ref para o elemento div raiz. */
  ref?: React.Ref<HTMLDivElement>;
}

/* ─── Mapeamento de variantes → classes ───────────────────────── */

const variantClasses: Record<BoxVariant, string> = {
  default: [
    'bg-[hsl(var(--surface))]',
    'text-[hsl(var(--foreground))]',
  ].join(' '),

  glass: [
    // fundo translúcido definido em tokens.css (--glass-bg)
    'bg-[var(--glass-bg)]',
    'text-[hsl(var(--foreground))]',
    // blur de 12 px — cria o efeito frosted-glass
    'backdrop-blur-[12px]',
    '[-webkit-backdrop-filter:blur(12px)]',
    'border border-[var(--glass-border)]',
    'shadow-[var(--shadow-glass)]',
  ].join(' '),

  elevated: [
    'bg-[hsl(var(--surface-raised))]',
    'text-[hsl(var(--foreground))]',
    'shadow-[var(--shadow-elevated)]',
  ].join(' '),

  ghost: [
    'bg-transparent',
    'text-[hsl(var(--foreground))]',
  ].join(' '),
};

const radiusClasses: Record<BoxRadius, string> = {
  none: 'rounded-none',
  sm:   'rounded-sm',
  md:   'rounded-md',
  lg:   'rounded-lg',
  xl:   'rounded-xl',
  '2xl':'rounded-2xl',
};

const paddingClasses: Record<BoxPadding, string> = {
  none: '',
  sm:   'p-3',
  md:   'p-5',
  lg:   'p-8',
};

/* ─── Componente ──────────────────────────────────────────────── */

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      variant  = 'default',
      radius   = 'lg',
      padding  = 'md',
      bordered  = true,
      animate  = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const showBorder =
      bordered && variant !== 'glass' && variant !== 'ghost';

    return (
      <div
        ref={ref}
        className={cn(
          // base
          'relative overflow-hidden',
          // variante
          variantClasses[variant],
          // raio
          radiusClasses[radius],
          // padding
          paddingClasses[padding],
          // borda sutil (apenas em default / elevated)
          showBorder && 'border border-[hsl(var(--border))]',
          // animação opcional de entrada
          animate && 'animate-fade-in',
          // overrides externos
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Box.displayName = 'Box';

/* ─── Sub-componentes ─────────────────────────────────────────── */

/**
 * BoxHeader — Cabeçalho interno padronizado.
 * Separa título e conteúdo com espaçamento correto.
 */
export const BoxHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col gap-1.5 pb-4', className)}
    {...props}
  />
));
BoxHeader.displayName = 'BoxHeader';

/**
 * BoxTitle — Título semântico dentro de um Box.
 */
export const BoxTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-base font-semibold leading-tight tracking-tight',
      'text-[hsl(var(--foreground))]',
      className,
    )}
    {...props}
  />
));
BoxTitle.displayName = 'BoxTitle';

/**
 * BoxDescription — Subtítulo ou descrição secundária.
 */
export const BoxDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-sm text-[hsl(var(--foreground-muted))]',
      className,
    )}
    {...props}
  />
));
BoxDescription.displayName = 'BoxDescription';

/**
 * BoxContent — Área de conteúdo principal.
 */
export const BoxContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
));
BoxContent.displayName = 'BoxContent';

/**
 * BoxFooter — Rodapé alinhado à direita, ideal para ações.
 */
export const BoxFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center justify-end gap-2 pt-4',
      'border-t border-[hsl(var(--border-subtle))]',
      className,
    )}
    {...props}
  />
));
BoxFooter.displayName = 'BoxFooter';

/* ─── Exports ─────────────────────────────────────────────────── */

export { Box };
export default Box;
