import { cn } from '@/lib/utils';

export function SectionEyebrow({
  children,
  className,
  align = 'start'
}: {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center';
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-gold-300/90',
        align === 'center' ? 'justify-center' : '',
        className
      )}
    >
      <span className="h-px w-10 bg-gradient-to-r from-transparent via-gold-400/80 to-gold-400/10 rtl:bg-gradient-to-l" />
      <span>{children}</span>
      <span className="h-px w-10 bg-gradient-to-l from-transparent via-gold-400/80 to-gold-400/10 rtl:bg-gradient-to-r" />
    </div>
  );
}
