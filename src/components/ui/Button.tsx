import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ghost' | 'outline';

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-gold-sheen text-ink-950 shadow-[0_10px_40px_-10px_rgba(196,145,42,0.55)] hover:shadow-[0_18px_60px_-10px_rgba(196,145,42,0.75)] hover:-translate-y-0.5',
  ghost:
    'text-ink-100 hover:text-gold-300 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-gold-400/40 backdrop-blur-sm',
  outline:
    'text-ink-50 border border-gold-400/50 hover:border-gold-400 hover:bg-gold-400/10'
};

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ href, variant = 'primary', className, children }: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}
