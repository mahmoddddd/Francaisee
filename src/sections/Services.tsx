'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/* One real photo per service */
const SERVICE_IMAGES = [
  '/images/shakencake/sc-14.jpg',
  '/images/stravo/02.jpg',
  '/images/haret/img-p11-01.jpeg',
  '/images/ktown/korian-fried-chicken.png',
  '/images/jinzo/img-p10-02.jpeg',
];

const ACCENTS = ['#ff2d87', '#e3392e', '#b5533c', '#dc2626', '#c4382b'];

export function Services() {
  const t = useTranslations('services');
  const items = t.raw('items') as Array<{ title: string; description: string }>;

  return (
    <section id="services" className="section bg-white overflow-hidden">
      <div className="container mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-20"
        >
          <div className="eyebrow justify-center mb-4">{t('eyebrow')}</div>
          <h2 className="h-display text-3xl sm:text-4xl md:text-5xl">{t('title')}</h2>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-500 sm:mt-4 sm:text-sm sm:tracking-[0.22em]">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Editorial rows */}
        <div className="space-y-6">
          {items.map((item, i) => {
            const isEven = i % 2 === 0;
            const accent = ACCENTS[i];
            const img = SERVICE_IMAGES[i];

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                className={`group grid gap-0 overflow-hidden rounded-3xl border border-gray-100 shadow-sm lg:grid-cols-2 ${
                  isEven ? '' : 'lg:[&>*:first-child]:order-last'
                }`}
              >
                {/* Image half */}
                <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-[340px]">
                  <Image
                    src={img}
                    alt={item.title}
                    fill
                    sizes="(min-width:1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/10 to-transparent" />
                  {/* Number badge */}
                  <div
                    className="absolute start-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-xs font-black text-white shadow-lg sm:start-6 sm:top-6 sm:h-12 sm:w-12 sm:text-sm"
                    style={{ background: accent }}
                  >
                    0{i + 1}
                  </div>
                </div>

                {/* Text half */}
                <div className="flex flex-col justify-center bg-white px-6 py-8 sm:px-8 sm:py-10 md:px-12 md:py-14">
                  {/* Accent line */}
                  <div
                    className="mb-4 h-1 w-8 origin-left transition-all duration-500 group-hover:w-20 sm:mb-5 sm:w-10"
                    style={{ background: accent }}
                  />
                  <h3 className="text-xl font-black leading-tight text-gray-900 sm:text-2xl md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500 sm:mt-4 sm:text-base">
                    {item.description}
                  </p>
                  <div className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300"
                    style={{ color: accent }}
                  >
                    <span className="h-px w-6 transition-all duration-300 group-hover:w-12"
                      style={{ background: accent }}
                    />
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
