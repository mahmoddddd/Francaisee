import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';

interface Props {
  accent: string;
  name: string;
  locale: string;
}

export function BrandCTA({ accent, name, locale }: Props) {
  const t = useTranslations('brands');
  return (
    <section className="section bg-white">
      <div className="container mx-auto">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gray-900 p-12 text-white md:p-20">
            <div
              className="absolute -end-16 -top-16 h-72 w-72 rounded-full opacity-20 blur-3xl"
              style={{ background: accent }}
            />
            <div className="relative mx-auto max-w-3xl text-center">
              <div
                className="mb-6 text-[10px] font-bold uppercase tracking-[0.28em]"
                style={{ color: accent }}
              >
                {t('openOutlet')}
              </div>
              <h2 className="h-display text-3xl text-white md:text-5xl">
                {t('questionTemplate', { name })}
              </h2>
              <p className="mt-5 text-base text-white/60">
                {t('ctaSubtitle')}
              </p>
              <Link
                href={`/${locale}#contact`}
                className="group mt-10 inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5"
                style={{ background: accent }}
              >
                {t('submitRequest')}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
