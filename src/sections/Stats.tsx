import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';

const REGIONS = [
  { en: 'Egypt', ar: 'مصر' },
  { en: 'Saudi Arabia', ar: 'السعودية' },
  { en: 'UAE', ar: 'الإمارات' },
  { en: 'Kuwait', ar: 'الكويت' },
  { en: 'Qatar', ar: 'قطر' },
  { en: 'Jordan', ar: 'الأردن' },
  { en: 'Morocco', ar: 'المغرب' },
  { en: 'Nigeria', ar: 'نيجيريا' }
];

export function Stats() {
  const t = useTranslations();
  const locale = t('nav.language') === 'English' ? 'ar' : 'en';
  const isAr = locale === 'ar';

  const headline = isAr ? 'بصمتنا الإقليمية' : 'Our Regional Footprint';
  const eyebrow = isAr ? 'حضور ممتد' : 'Expanding Presence';
  const sub = isAr
    ? 'سيتي هب بتتوسع في مصر والشرق الأوسط وأفريقيا — بسيستم موحد وبراندات قابلة للتكرار.'
    : 'City Hub scales across Egypt, the Middle East, and Africa — one system, replicable brands.';

  const stats = [
    { value: isAr ? '٦' : '6', label: isAr ? 'براندات' : 'Brands' },
    { value: isAr ? '+٨' : '+8', label: isAr ? 'دول مستهدفة' : 'Target Countries' },
    { value: isAr ? '+٢٠' : '+20', label: isAr ? 'فرع في الأفق' : 'Outlets Pipeline' },
    { value: '1', label: isAr ? 'سيستم موحد' : 'Unified System' }
  ];

  return (
    <section className="section bg-gray-900 text-white">
      <div className="container mx-auto">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="eyebrow justify-center mb-4 text-brand-400 sm:mb-5">{eyebrow}</div>
            <h2 className="h-display text-3xl text-white sm:text-4xl md:text-5xl">{headline}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 sm:mt-5 sm:text-base">
              {sub}
            </p>
          </div>
        </Reveal>

        {/* Big numbers */}
        <div className="mt-10 grid grid-cols-2 gap-0 border border-white/10 rounded-2xl overflow-hidden sm:mt-16 md:grid-cols-4">
          {stats.map((s, i) => (
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
            {REGIONS.map((r) => (
              <span
                key={r.en}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/60 transition hover:border-brand-500/40 hover:text-brand-400"
              >
                {isAr ? r.ar : r.en}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
