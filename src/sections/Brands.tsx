'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { BRANDS } from '@/lib/brands';
import { ArrowUpRight } from 'lucide-react';

function BrandPanel({
  b,
  index,
  t,
  locale,
}: {
  b: (typeof BRANDS)[number];
  index: number;
  t: ReturnType<typeof useTranslations>;
  locale: string;
}) {
  const isProductShot = b.key === 'ktown';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.75,
        delay: (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/${locale}/brands/${b.slug}`}
        className="group relative block aspect-[4/5] overflow-hidden sm:aspect-[4/5] lg:aspect-[6/5]"
        style={{ background: b.accent }}
        aria-label={t(`items.${b.key}.name`)}
      >
        {/* Full-bleed image */}
        <div className="absolute inset-0">
          {b.image && (
            <Image
              src={b.image}
              alt={t(`items.${b.key}.name`)}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className={
                isProductShot
                  ? 'object-contain scale-90 transition-transform duration-[1200ms] ease-out group-hover:scale-100'
                  : 'object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110'
              }
            />
          )}
        </div>

        {/* Base dark gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20" />

        {/* Brand color tint — intensifies on hover */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-60"
          style={{ background: b.accent }}
        />

        {/* Top accent wipe */}
        <div className="absolute inset-x-0 top-0 z-20 h-[3px] origin-left scale-x-0 bg-white/90 transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

        {/* Top-left: index */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-5 md:p-7">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/75 md:text-[11px]">
            0{index + 1}
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm md:px-3 md:text-[10px] md:tracking-[0.22em]"
            style={{ background: 'rgba(255,255,255,0.12)' }}
          >
            <span className="h-1 w-1 rounded-full bg-white" />
            {t(`items.${b.key}.cuisine`)}
          </span>
        </div>

        {/* Text block — travels from BOTTOM to TOP on hover (desktop only) */}
        <div className="absolute inset-x-0 bottom-6 z-20 px-5 transition-[bottom] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:bottom-12 md:px-7 lg:group-hover:bottom-[calc(100%-180px)]">
          <h3 className="font-display text-3xl font-black leading-[0.95] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {t(`items.${b.key}.name`)}
          </h3>
          {/* On mobile: blurb always visible. On desktop: hover-reveal */}
          <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-white/80 md:mt-3 md:text-sm lg:opacity-0 lg:translate-y-2 lg:transition-all lg:duration-500 lg:delay-200 lg:group-hover:opacity-100 lg:group-hover:translate-y-0">
            {t(`items.${b.key}.blurb`)}
          </p>
        </div>

        {/* CTA + arrows — desktop only (hover-reveal). Hidden on mobile/tablet to avoid overlap. */}
        <div className="absolute inset-x-0 bottom-0 z-20 hidden items-end justify-between px-5 pb-5 md:px-7 md:pb-7 lg:flex lg:opacity-0 lg:translate-y-4 lg:transition-all lg:duration-500 lg:delay-300 lg:ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:opacity-100 lg:group-hover:translate-y-0">
          <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-white">
            {t('cta')}
          </span>
          <div className="flex items-center gap-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm">
              <ArrowUpRight className="h-4 w-4 text-white" />
            </span>
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full text-gray-900"
              style={{ background: '#fff' }}
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function Brands() {
  const t = useTranslations('brands');
  const locale = useLocale();

  return (
    <section id="brands" className="section bg-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
        >
          <div className="eyebrow justify-center mb-4 sm:mb-5">{t('eyebrow')}</div>
          <h2 className="h-display text-3xl sm:text-4xl md:text-6xl">{t('title')}</h2>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-500 sm:mt-4 sm:text-sm sm:tracking-[0.24em]">
            {t('tagline')}
          </p>
        </motion.div>
      </div>

      <div className="grid w-full grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
        {BRANDS.map((b, i) => (
          <BrandPanel key={b.key} b={b} index={i} t={t} locale={locale} />
        ))}
      </div>
    </section>
  );
}
