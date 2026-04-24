import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';

const REGION_KEYS = ['egypt', 'ksa', 'uae', 'kuwait', 'qatar', 'jordan', 'morocco', 'nigeria'] as const;

export function Stats() {
  const t = useTranslations('stats');
  const items = t.raw('items') as Array<{ value: string; label: string }>;

  return (
    <section className="section bg-gray-900 text-white">
      <div className="container mx-auto">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="eyebrow justify-center mb-4 text-brand-400 sm:mb-5">{t('eyebrow')}</div>
            <h2 className="h-display text-3xl text-white sm:text-4xl md:text-5xl">{t('title')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 sm:mt-5 sm:text-base">
              {t('subtitle')}
            </p>
          </div>
        </Reveal>

        {/* Big numbers */}
        <div className="mt-10 grid grid-cols-2 gap-0 border border-white/10 rounded-2xl overflow-hidden sm:mt-16 md:grid-cols-4">
          {items.map((s, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="flex h-full flex-col items-center justify-center border-b border-white/10 px-4 py-8 text-center sm:px-6 sm:py-10 md:border-b-0 md:border-e md:last:border-e-0">
                <div className="text-4xl font-black text-brand-400 sm:text-5xl md:text-7xl">
                  {s.value}
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50 sm:mt-3 sm:text-[11px] sm:tracking-[0.22em]">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Region chips */}
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {REGION_KEYS.map((key) => (
              <span
                key={key}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/60 transition hover:border-brand-500/40 hover:text-brand-400"
              >
                {t(`regions.${key}`)}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
