'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

/* ── word-mask reveal ── */
function WordReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
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
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section ref={ref} id="home" className="relative flex flex-col overflow-hidden bg-white lg:min-h-screen lg:flex-row">

      {/* ── LEFT: copy ── */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex w-full flex-col justify-center px-5 pt-24 pb-10 sm:px-6 sm:pt-28 sm:pb-16 md:px-12 lg:w-1/2 lg:px-20"
      >
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="eyebrow mb-6 sm:mb-8"
        >
          {t('eyebrow')}
        </motion.div>

        {/* headline — each word in its own mask */}
        <h1 className="h-display text-[2.4rem] leading-[1.0] break-words sm:text-[3.6rem] md:text-[4.8rem] lg:text-[5.5rem] xl:text-[6.5rem]">
          <div className="block"><WordReveal text={t('title.line1')} delay={0.2} /></div>
          <div className="block"><WordReveal text={t('title.line2')} delay={0.32} /></div>
          <div className="block">
            <WordReveal text={t('title.line3')} delay={0.44} className="text-brand-500" />
          </div>
        </h1>

        {/* subline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-5 max-w-md text-[15px] leading-relaxed text-gray-500 sm:mt-7 sm:text-base md:text-lg"
        >
          {t('lead')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-brand-500 px-6 py-3.5 text-sm font-bold text-white shadow-brand transition-all duration-300 hover:-translate-y-1 hover:bg-brand-600 hover:shadow-xl sm:px-8 sm:py-4"
          >
            {t('cta')}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" />
          </a>
          <a
            href="#brands"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3.5 text-sm font-bold text-gray-700 transition hover:border-gray-800 hover:text-gray-900 sm:px-8 sm:py-4"
          >
            {t('secondaryCta')}
          </a>
        </motion.div>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex items-stretch gap-0 divide-x divide-gray-100 border-t border-gray-100 pt-6 rtl:divide-x-reverse sm:mt-14 sm:pt-8"
        >
          {(['brands', 'cuisines', 'system'] as const).map((k) => (
            <div key={k} className="flex flex-col pe-4 ps-0 first:ps-0 sm:pe-8 rtl:pe-0 rtl:ps-4 sm:rtl:ps-8">
              <span className="text-2xl font-black tabular-nums text-gray-900 sm:text-4xl md:text-5xl">
                {t(`stats.${k}.value`)}
              </span>
              <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400 sm:text-[10px] sm:tracking-[0.22em]">
                {t(`stats.${k}.label`)}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── RIGHT: full-bleed photo ── */}
      <div className="absolute inset-y-0 end-0 hidden w-1/2 overflow-hidden lg:block">
        <motion.div
          style={{ y: imgY }}
          className="absolute inset-0 scale-110"
        >
          <Image
            src="/images/shakencake/sc-14.jpg"
            alt="City Hub brands"
            fill
            priority
            sizes="50vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* gradient fade toward text */}
        <div className="absolute inset-y-0 start-0 w-32 bg-gradient-to-r from-white to-transparent" />

        {/* floating brand badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-12 start-8 rounded-2xl border border-white/20 bg-white/90 px-5 py-4 shadow-xl backdrop-blur-md"
        >
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-500">
            Shake N Cake
          </div>
          <div className="mt-1 text-sm font-black text-gray-900">Milkshake Bar & Café</div>
          <div className="mt-2 flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-semibold text-gray-500">Available for franchise</span>
          </div>
        </motion.div>
      </div>

      {/* mobile image strip — flows in document */}
      <div className="relative h-44 w-full overflow-hidden sm:h-56 lg:hidden">
        <div className="flex h-full gap-2 px-4 pb-4">
          {['/images/shakencake/sc-01.jpg', '/images/shakencake/sc-09.jpg', '/images/shakencake/sc-14.jpg'].map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.7 }}
              className="relative flex-1 overflow-hidden rounded-2xl"
            >
              <Image src={src} alt="" fill sizes="33vw" className="object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
