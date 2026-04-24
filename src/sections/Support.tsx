'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { Check, Quote } from 'lucide-react';

export function Support() {
  const t = useTranslations('support');
  const visionT = useTranslations('vision');
  const items = t.raw('items') as Array<{ title: string; description: string }>;

  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col gap-16 sm:gap-24">
          {/* Vision — editorial pull-quote on light cream */}
          <Reveal direction="up">
            <div className="relative isolate overflow-hidden bg-[#faf6ef] px-6 py-14 sm:px-10 sm:py-20 md:px-16 md:py-24 lg:px-20">
              {/* dotted grid pattern */}
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, #d9cfbd 1px, transparent 0)',
                  backgroundSize: '22px 22px'
                }}
              />
              {/* brand accent bar (left on LTR, right on RTL via start-0) */}
              <div className="absolute inset-y-10 start-0 w-1.5 bg-brand-500 sm:inset-y-16" />
              {/* giant ghost quote glyph */}
              <Quote
                aria-hidden
                className="pointer-events-none absolute -start-4 -top-6 h-40 w-40 text-brand-500/10 sm:-start-6 sm:-top-10 sm:h-64 sm:w-64 md:h-80 md:w-80 rtl:scale-x-[-1]"
                strokeWidth={1}
              />

              <div className="relative z-10 mx-auto grid max-w-5xl gap-6 md:grid-cols-[auto_1fr] md:items-end md:gap-12">
                <div className="flex flex-col gap-3 md:gap-4">
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-500 sm:text-xs">
                    <span className="h-px w-8 bg-brand-500 sm:w-12" />
                    {visionT('eyebrow')}
                  </span>
                </div>
                <blockquote className="font-display text-2xl font-black leading-[1.15] text-gray-900 sm:text-3xl md:text-4xl lg:text-[2.8rem] xl:text-5xl">
                  {visionT('title')}
                </blockquote>
              </div>
            </div>
          </Reveal>

          {/* Support Horizontal Section */}
          <div>
            <Reveal direction="up">
              <div className="mx-auto mb-12 max-w-4xl text-center sm:mb-16">
                <div className="eyebrow mb-5 inline-flex justify-center">{t('eyebrow')}</div>
                <h2 className="h-display text-4xl sm:text-5xl md:text-6xl">{t('title')}</h2>
              </div>
            </Reveal>

            <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
              {items.map((item, i) => (
                <Reveal 
                  key={item.title} 
                  direction="up" 
                  delay={i * 0.1} 
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] xl:flex-1 xl:min-w-[280px] max-w-[450px]"
                >
                  <div className="group flex h-full flex-col rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-brand-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] sm:p-8 lg:p-10">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-500 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                      <Check className="h-7 w-7" />
                    </div>
                    <h3 className="mb-4 text-xl font-black text-gray-900 transition-colors group-hover:text-brand-600 sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-500 sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
