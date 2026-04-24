'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

/* ── brands that cycle in the cinematic frame (skip product-shot brands) ── */
const SHOWCASE = [
  { key: 'shakencake', image: '/images/shakencake/sc-20.jpg', accent: '#ff2d87' },
  { key: 'haret',      image: '/images/haret/img-p14-01.jpeg', accent: '#b5533c' },
  { key: 'stravo',     image: '/images/stravo/02.jpg',         accent: '#e3392e' },
  { key: 'jinzo',      image: '/images/jinzo/img-p10-02.jpeg', accent: '#c4382b' },
  { key: 'tokyotreats',image: '/images/tokyotreats/page-01.jpg', accent: '#dc2626' }
] as const;

const MARQUEE_ORDER = ['shakencake', 'haret', 'ktown', 'stravo', 'jinzo', 'tokyotreats'] as const;

/* ── word-mask reveal ── */
function WordReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden align-baseline ${className}`}>
      <motion.span
        className="inline-block"
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
  const [idx, setIdx] = useState(0);

  /* auto-rotate the showcase every 4.5s */
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % SHOWCASE.length), 4500);
    return () => clearInterval(id);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.25]);

  const current = SHOWCASE[idx];
  const counter = useMemo(
    () => `${String(idx + 1).padStart(2, '0')} / ${String(SHOWCASE.length).padStart(2, '0')}`,
    [idx]
  );

  return (
    <section
      ref={ref}
      id="home"
      className="relative overflow-hidden bg-gray-950 text-white"
    >
      {/* subtle ambient gradient that shifts with the active brand */}
      <motion.div
        key={`ambient-${current.key}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 1.4 }}
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(80% 55% at 85% 15%, ${current.accent}55, transparent 60%), radial-gradient(60% 45% at 10% 85%, #ffffff0d, transparent 70%)`
        }}
      />
      {/* fine noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '3px 3px'
        }}
      />

      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto grid w-full max-w-[1480px] grid-cols-1 gap-10 px-5 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16 lg:px-14 lg:pt-36 lg:pb-28 xl:px-20"
      >
        {/* ── LEFT: copy ── */}
        <motion.div style={{ y: textY }} className="relative z-10 flex flex-col justify-center">
          {/* eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/80 sm:text-xs sm:tracking-[0.26em]">
              {t('eyebrow')}
            </span>
          </motion.div>

          {/* headline */}
          <h1 className="h-display text-[2.7rem] font-black leading-[0.95] tracking-tight text-white sm:text-[3.6rem] md:text-[4.6rem] lg:text-[5.2rem] xl:text-[6.2rem]">
            <div className="block"><WordReveal text={t('title.line1')} delay={0.15} /></div>
            <div className="block"><WordReveal text={t('title.line2')} delay={0.27} /></div>
            <div className="block">
              <WordReveal
                text={t('title.line3')}
                delay={0.39}
                className="bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 bg-clip-text text-transparent"
              />
            </div>
          </h1>

          {/* lead */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/60 sm:mt-8 sm:text-base md:text-lg"
          >
            {t('lead')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-br from-brand-500 to-brand-600 px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_36px_-10px_rgba(220,38,38,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-10px_rgba(220,38,38,0.9)] sm:px-8 sm:py-4"
            >
              <span className="relative z-10">{t('cta')}</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" />
              <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
            </a>
            <a
              href="#brands"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white/90 backdrop-blur transition hover:border-white/40 hover:bg-white/10 hover:text-white sm:px-8 sm:py-4"
            >
              {t('secondaryCta')}
              <span className="text-base transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180">→</span>
            </a>
          </motion.div>

          {/* stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-12 grid grid-cols-3 gap-0 divide-x divide-white/10 border-t border-white/10 pt-6 rtl:divide-x-reverse sm:mt-16 sm:pt-8"
          >
            {(['brands', 'cuisines', 'system'] as const).map((k) => (
              <div key={k} className="flex flex-col pe-4 ps-0 first:ps-0 sm:pe-8 rtl:pe-0 rtl:ps-4 sm:rtl:ps-8">
                <span className="text-2xl font-black tabular-nums text-white sm:text-4xl md:text-5xl">
                  {t(`stats.${k}.value`)}
                </span>
                <span className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 sm:text-[10px] sm:tracking-[0.24em]">
                  {t(`stats.${k}.label`)}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: cinematic rotating frame ── */}
        <motion.div
          style={{ y: imgY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-first w-full lg:order-none"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px] overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] lg:aspect-[4/5] lg:max-w-none">
            {/* crossfading brand images */}
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={current.image}
                  alt={tBrands(`${current.key}.name`)}
                  fill
                  priority={idx === 0}
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* top gradient for counter */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
            {/* bottom gradient for info card */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            {/* counter */}
            <div className="absolute top-5 start-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white/80 sm:top-6 sm:start-6">
              <span
                className="h-1.5 w-1.5 rounded-full shadow-[0_0_12px_currentColor]"
                style={{ color: current.accent, background: current.accent }}
              />
              <span className="tabular-nums">{counter}</span>
            </div>

            {/* brand info card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${current.key}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6"
              >
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl sm:p-5">
                  <div
                    className="text-[10px] font-bold uppercase tracking-[0.22em]"
                    style={{ color: current.accent }}
                  >
                    {tBrands(`${current.key}.name`)}
                  </div>
                  <div className="mt-1 text-sm font-black text-white sm:text-base">
                    {tBrands(`${current.key}.cuisine`)}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
                      {t('badge.status')}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* progress dots for the rotation */}
            <div className="absolute end-5 top-5 flex items-center gap-1.5 sm:end-6 sm:top-6">
              {SHOWCASE.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => setIdx(i)}
                  aria-label={s.key}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === idx ? 'w-6 bg-white' : 'w-3 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* decorative floating accent ring */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-8 -start-8 -z-10 hidden h-40 w-40 rounded-full blur-3xl lg:block"
            style={{ background: `${current.accent}55` }}
          />
        </motion.div>
      </motion.div>

      {/* ── BRAND TICKER — edge-to-edge marquee ── */}
      <div className="relative border-t border-white/10 bg-black/40">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-gray-950 to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-gray-950 to-transparent sm:w-32" />
        <div className="marquee-pause overflow-hidden py-5 sm:py-6">
          <div
            className="marquee-track marquee-left gap-12 sm:gap-16"
            style={{ ['--marquee-duration' as string]: '40s' }}
          >
            {[...MARQUEE_ORDER, ...MARQUEE_ORDER, ...MARQUEE_ORDER].map((key, i) => (
              <div key={`${key}-${i}`} className="flex flex-none items-center gap-4 sm:gap-6">
                <span className="font-display text-xl font-black uppercase tracking-wide text-white sm:text-2xl md:text-3xl">
                  {tBrands(`${key}.name`)}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/40 sm:text-xs">
                  {tBrands(`${key}.cuisine`)}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/25" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
