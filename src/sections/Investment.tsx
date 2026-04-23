import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight } from 'lucide-react';

export function Investment() {
  const t = useTranslations('investment');

  return (
    <section className="section bg-white">
      <div className="container mx-auto">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gray-900 p-7 text-white sm:p-12 md:p-20">
            {/* Decorative circles */}
            <div className="absolute -end-20 -top-20 h-64 w-64 rounded-full bg-brand-500/10" />
            <div className="absolute -start-10 -bottom-10 h-48 w-48 rounded-full bg-brand-500/5" />

            <div className="relative mx-auto max-w-3xl text-center">
              <div className="eyebrow justify-center mb-5 text-brand-400 sm:mb-6">{t('eyebrow')}</div>
              <h2 className="h-display text-2xl text-white sm:text-3xl md:text-5xl leading-tight">
                {t('title')}
              </h2>
              <a
                href="#contact"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-brand-500 px-6 py-3.5 text-sm font-bold text-white shadow-brand transition hover:-translate-y-0.5 hover:bg-brand-600 sm:mt-12 sm:px-8 sm:py-4"
              >
                {t('cta')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
