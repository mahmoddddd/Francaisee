import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight } from 'lucide-react';

export function ClosingBanner() {
  const t = useTranslations('closing');
  return (
    <section className="relative overflow-hidden border-t border-gray-100 bg-white py-14 sm:py-20 md:py-28">
      <div className="container mx-auto text-center">
        <Reveal>
          <p className="h-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl">
            {t('line1')}
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-brand-500 sm:mt-4 sm:text-sm sm:tracking-[0.3em] md:text-base">
            {t('line2')}
          </p>
          <a href="#contact" className="btn-primary mt-8 mx-auto sm:mt-10">
            {t('cta')}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
