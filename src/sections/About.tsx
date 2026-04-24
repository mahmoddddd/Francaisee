'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { BRANDS } from '@/lib/brands';

/* Distinct images per brand — different from those used in Hero/Services/Gallery */
const ABOUT_IMAGES: Record<string, string> = {
  shakencake:  '/images/shakencake/sc-04.jpg',
  haret:       '/images/haret/img-p17-01.jpeg',
  stravo:      '/images/stravo/05.jpg',
  ktown:       '/images/ktown/classic-korian.png',
  jinzo:       '/images/jinzo/img-p9-02.jpeg',
  tokyotreats: '/images/tokyotreats/tokyo-10.jpg',
};

export function About() {
  const t = useTranslations('about');
  const tBrands = useTranslations('brands.items');
  const locale = useLocale();
  const paragraphs = t.raw('paragraphs') as string[];
  const miniStats = t.raw('miniStats') as Array<{ value: string; label: string }>;
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      id="about"
      className="relative overflow-hidden bg-[#faf7f2] py-20 sm:py-28 md:py-32 lg:py-36"
    >
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-0">

        {/* ── LEFT: Copy ── */}
        <div className="flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:ps-16 lg:pe-12 xl:ps-24 xl:pe-16 2xl:ps-32">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-3"
          >
            <span className="h-px w-8 bg-brand-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-600 sm:text-xs">
              {t('eyebrow')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-display text-3xl leading-[1.1] text-gray-900 sm:text-4xl md:text-5xl lg:text-[3rem] xl:text-[3.5rem]"
          >
            {t('title')}
          </motion.h2>

          <div className="mt-10 space-y-6">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.65 }}
                className="border-s border-gray-300 ps-5 text-[15px] leading-relaxed text-gray-600 sm:text-base md:text-[17px]"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mt-12 flex items-stretch divide-x divide-gray-300/70 border-t border-gray-300/70 pt-7 rtl:divide-x-reverse"
          >
            {miniStats.map(({ value, label }, i) => (
              <div
                key={label}
                className={`flex flex-col ${i === 0 ? 'pe-6 sm:pe-9' : 'px-6 sm:px-9'}`}
              >
                <span className="text-2xl font-black text-gray-900 sm:text-3xl md:text-[2rem]">
                  {value}
                </span>
                <span className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.75, duration: 0.5 }}
            href="#brands"
            className="group mt-10 inline-flex items-center gap-2.5 text-sm font-bold text-gray-900 transition-colors hover:text-brand-500"
          >
            <span className="relative pb-1">
              {t('cta')}
              <span className="absolute inset-x-0 bottom-0 h-px bg-gray-900 transition-colors duration-300 group-hover:bg-brand-500" />
            </span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </motion.a>
        </div>

        {/* ── RIGHT: 6-brand image grid, flush to edge ── */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:grid-cols-3 lg:order-last">
          {BRANDS.map((b, i) => {
            const name = tBrands(`${b.key}.name`);
            const cuisine = tBrands(`${b.key}.cuisine`);
            const isProductShot = b.key === 'ktown';
            const aspect =
              i % 3 === 1 ? 'aspect-[4/5]' : i % 3 === 2 ? 'aspect-[3/4]' : 'aspect-[3/4]';
            return (
              <motion.div
                key={b.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <Link
                  href={`/${locale}/brands/${b.slug}`}
                  className={`relative block overflow-hidden ${aspect}`}
                  style={{ background: isProductShot ? '#111' : b.accent }}
                >
                  <Image
                    src={ABOUT_IMAGES[b.key] ?? b.image ?? ''}
                    alt={name}
                    fill
                    sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                    className={`transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] ${
                      isProductShot ? 'object-contain scale-90' : 'object-cover'
                    }`}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Brand label */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <div
                      className="text-[9px] font-bold uppercase tracking-[0.22em] transition-colors duration-300"
                      style={{ color: b.accent }}
                    >
                      {cuisine}
                    </div>
                    <div className="mt-1 text-sm font-black text-white sm:text-base md:text-lg">
                      {name}
                    </div>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute end-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/0 text-white/0 transition-all duration-300 group-hover:bg-white group-hover:text-gray-900 sm:end-5 sm:top-5 sm:h-9 sm:w-9">
                    <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 sm:h-4 sm:w-4" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
