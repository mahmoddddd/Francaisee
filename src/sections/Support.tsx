'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { Check } from 'lucide-react';

export function Support() {
  const t = useTranslations('support');
  const visionT = useTranslations('vision');
  const items = t.raw('items') as Array<{ title: string; description: string }>;

  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col gap-16 sm:gap-24">
          {/* Vision Full-Width Banner */}
          <Reveal direction="up">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-500 p-8 text-white shadow-xl sm:p-12 md:p-16 lg:p-20">
              {/* Decorative glows */}
              <div className="absolute -end-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
              <div className="absolute -start-20 -bottom-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
              
              <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-4xl">
                  <div className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                    {visionT('eyebrow')}
                  </div>
                  <blockquote className="mt-4 text-2xl font-black leading-tight sm:mt-6 sm:text-3xl md:text-4xl lg:text-5xl">
                    {visionT('title')}
                  </blockquote>
                </div>
                <div className="hidden h-1.5 w-20 shrink-0 rounded-full bg-white/30 md:block" />
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
