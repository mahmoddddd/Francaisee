'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const HERO_PRODUCTS = [
  { key: 'jinzo',       image: '/images/jinzo/img-p7-01.jpeg',            tint: '#fef3e7' },
  { key: 'haret',       image: '/images/haret/img-p11-01.jpeg',           tint: '#f3e9dc' },
  { key: 'stravo',      image: '/images/stravo/03.jpg',                   tint: '#fde2df' },
  { key: 'shakencake',  image: '/images/shakencake/sc-20.jpg',            tint: '#fce7f3' },
  { key: 'tokyotreats', image: '/images/tokyotreats/tokyo-06.jpg',        tint: '#fee2e2' },
  { key: 'ktown',       image: '/images/ktown/korian-fried-chicken.png',  tint: '#fef3c7' },
] as const;

/* word-mask reveal — extra vertical padding so Arabic diacritics (shadda,
   dots above letters) don't clip against the overflow-hidden mask. */
function WordReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`}>
      <motion.span
        className="inline-block pb-2 pt-2 rtl:pb-6 rtl:pt-3"
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const t = useTranslations('hero');
  const tBrands = useTranslations('brands.items');
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);

  return (
    <section
      ref={ref}
      id="home"
      className="relative overflow-hidden bg-[#fbf8f3] text-gray-900"
    >
      <motion.div
        style={{ y }}
        dir="ltr"
        className="relative z-10 grid min-h-[92vh] grid-cols-1 items-center gap-16 px-6 pb-16 pt-32 sm:px-10 lg:grid-cols-[1fr_1fr] lg:gap-8 lg:px-0 lg:pb-24 lg:pt-36"
      >
        {/* ── LEFT: editorial text, flush to physical left ── */}
        <div dir="auto" className="lg:pl-[112px] lg:pr-6">
          {/* Top rule + eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center gap-4"
          >
            <span className="h-px w-10 bg-brand-500/60 sm:w-16" />
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-600 sm:text-xs">
              {t('eyebrow')}
            </span>
          </motion.div>

          {/* Massive editorial headline.
              RTL gets looser leading + more between-line air so diacritics
              and descenders don't touch the line above. */}
          <h1 className="h-display font-black leading-[0.95] tracking-tight text-gray-900 text-[3rem] sm:text-[4.4rem] md:text-[5rem] lg:text-[5.5rem] xl:text-[6.5rem] space-y-1 rtl:space-y-4 sm:rtl:space-y-6">
            <div className="block"><WordReveal text={t('title.line1')} delay={0.15} /></div>
            <div className="block -ms-0 ps-0 sm:ps-4 lg:ps-8"><WordReveal text={t('title.line2')} delay={0.27} /></div>
            <div className="relative block ps-0 sm:ps-10 lg:ps-16">
              <WordReveal
                text={t('title.line3')}
                delay={0.39}
                className="text-brand-500"
              />
              {/* subtle accent under the last word */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-[8%] left-0 block h-[6px] w-16 origin-left rounded-full bg-brand-500/30 sm:h-2 sm:w-24 rtl:origin-right"
                aria-hidden
              />
            </div>
          </h1>

          {/* Lead */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-8 max-w-xl text-[15px] leading-relaxed text-gray-600 sm:mt-10 sm:text-base md:text-lg"
          >
            {t('lead')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-8 flex flex-wrap items-center gap-5 sm:mt-10"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gray-900 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-500 sm:px-8 sm:py-4"
            >
              {t('cta')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" />
            </a>
            <a
              href="#brands"
              className="group inline-flex items-center gap-2 text-sm font-bold text-gray-900 transition-colors hover:text-brand-500"
            >
              <span className="relative pb-1">
                {t('secondaryCta')}
                <span className="absolute inset-x-0 bottom-0 h-px bg-gray-900 transition-colors duration-300 group-hover:bg-brand-500" />
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">→</span>
            </a>
          </motion.div>

          {/* Stats — left-aligned horizontal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-12 flex w-fit items-stretch divide-x divide-gray-300 border-t border-gray-300 pt-7 rtl:divide-x-reverse sm:mt-14 sm:pt-9"
          >
            {(['brands', 'cuisines', 'system'] as const).map((k, i) => (
              <div
                key={k}
                className={`flex flex-col items-start text-start ${i === 0 ? 'pe-6 sm:pe-10' : 'px-6 sm:px-10'}`}
              >
                <span className="text-2xl font-black tabular-nums text-gray-900 sm:text-3xl md:text-4xl">
                  {t(`stats.${k}.value`)}
                </span>
                <span className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-gray-500 sm:text-[10px] sm:tracking-[0.26em]">
                  {t(`stats.${k}.label`)}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: six staggered island-shaped product cards ── */}
        <div className="relative mx-auto h-[580px] w-full max-w-[600px] sm:h-[680px] lg:h-[760px] lg:pr-10">
          {/* Soft backdrop blob for editorial depth */}
          <div className="absolute -right-10 top-1/2 h-[70%] w-[70%] -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl" aria-hidden />

          {HERO_PRODUCTS.map((p, i) => {
            const name = tBrands(`${p.key}.name`);

            // Zigzag positions + organic island-like border-radius (each unique)
            const layouts = [
              { pos: 'top-[0%] right-[4%]',     size: 'h-[30%] w-[52%]', rotate: -5, blob: '62% 38% 55% 45% / 48% 58% 42% 52%' },
              { pos: 'top-[14%] left-[0%]',     size: 'h-[28%] w-[50%]', rotate:  5, blob: '40% 60% 30% 70% / 60% 40% 65% 35%' },
              { pos: 'top-[34%] right-[14%]',   size: 'h-[30%] w-[54%]', rotate: -3, blob: '55% 45% 70% 30% / 35% 65% 45% 55%' },
              { pos: 'top-[52%] left-[6%]',     size: 'h-[28%] w-[50%]', rotate:  4, blob: '70% 30% 60% 40% / 50% 50% 35% 65%' },
              { pos: 'top-[68%] right-[2%]',    size: 'h-[30%] w-[54%]', rotate: -4, blob: '35% 65% 45% 55% / 60% 40% 55% 45%' },
              { pos: 'bottom-[0%] left-[-2%]',  size: 'h-[28%] w-[52%]', rotate:  3, blob: '50% 50% 40% 60% / 45% 55% 65% 35%' },
            ] as const;
            const L = layouts[i];

            return (
              <motion.div
                key={p.key}
                initial={{ opacity: 0, y: 60, scale: 0.85, rotate: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: L.rotate }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ rotate: 0, scale: 1.06, zIndex: 20, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                className={`absolute ${L.pos} ${L.size} overflow-hidden shadow-[0_28px_60px_-18px_rgba(17,17,17,0.35)] ring-1 ring-black/5`}
                style={{ background: p.tint, borderRadius: L.blob }}
              >
                <Image
                  src={p.image}
                  alt={name}
                  fill
                  sizes="(min-width:1024px) 22vw, 45vw"
                  priority={i < 3}
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.08]"
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
