'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const BRAND_COLORS = ['#ff2d87', '#e3392e', '#c4382b', '#ff5d3a', '#caa46a', '#ff4d8b'];

export function About() {
  const t = useTranslations('about');
  const paragraphs = t.raw('paragraphs') as string[];
  const miniStats = t.raw('miniStats') as Array<{ value: string; label: string }>;
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section
      ref={ref}
      id="about"
      className="relative overflow-hidden bg-[#faf7f2] py-20 sm:py-24 md:py-32 lg:py-36"
    >
      {/* Oversized decorative numeral */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 end-[-3%] select-none font-display text-[14rem] font-black leading-none text-gray-900/[0.035] sm:text-[20rem] lg:text-[26rem]"
      >
        06
      </div>

      {/* Soft brand-color glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 start-[-15%] h-[600px] w-[600px] rounded-full bg-brand-500/[0.06] blur-3xl"
      />

      {/* Subtle grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container relative mx-auto">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16 xl:gap-24">

          {/* ── LEFT: Copy ── */}
          <div className="lg:col-span-7">
            {/* Eyebrow with accent dot */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-7 inline-flex items-center gap-3"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/50" />
                <span className="relative h-2 w-2 rounded-full bg-brand-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-600 sm:text-xs">
                {t('eyebrow')}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-display text-3xl leading-[1.08] text-gray-900 sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]"
            >
              {t('title')}
            </motion.h2>

            {/* Accent divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 h-1 w-20 origin-start rounded-full bg-gradient-to-r from-brand-500 to-brand-500/0"
            />

            {/* Paragraphs */}
            <div className="mt-10 space-y-5">
              {paragraphs.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.1, duration: 0.6 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-50 ring-1 ring-brand-100">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-500" strokeWidth={2.5} />
                  </div>
                  <p className="text-[15px] leading-relaxed text-gray-600 sm:text-base">{p}</p>
                </motion.div>
              ))}
            </div>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-12 flex items-stretch divide-x divide-gray-300/60 rtl:divide-x-reverse"
            >
              {miniStats.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`flex flex-col ${i === 0 ? 'pe-5 sm:pe-7' : 'px-5 sm:px-7'}`}
                >
                  <span className="text-2xl font-black text-gray-900 sm:text-3xl md:text-[2.25rem]">
                    {value}
                  </span>
                  <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              href="#brands"
              className="group mt-12 inline-flex items-center gap-3 text-sm font-bold text-gray-900 transition-colors hover:text-brand-500"
            >
              <span className="relative pb-1">
                {t('cta')}
                <span className="absolute inset-x-0 bottom-0 h-px origin-start scale-x-100 bg-gray-900 transition-colors duration-300 group-hover:bg-brand-500" />
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </motion.a>
          </div>

          {/* ── RIGHT: Image ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-first lg:order-last lg:col-span-5"
          >
            {/* Decorative offset frame */}
            <div
              aria-hidden
              className="absolute inset-4 -z-10 rounded-3xl border border-brand-500/20 sm:inset-6"
            />

            {/* Main image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-100 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
              <motion.div style={{ y: imgY }} className="absolute inset-0">
                <Image
                  src="/images/shakencake/sc-05.jpg"
                  alt=""
                  fill
                  sizes="(min-width:1024px) 42vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>

            {/* Floating brand-dots card */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-5 start-6 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] sm:-start-6 sm:bottom-10 sm:px-6"
            >
              <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-brand-500">
                {t('card.eyebrow')}
              </div>
              <div className="mt-1 text-sm font-black text-gray-900 sm:text-base">
                {t('card.title')}
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                {BRAND_COLORS.map((c) => (
                  <span
                    key={c}
                    className="h-2.5 w-2.5 rounded-full ring-2 ring-white"
                    style={{ background: c }}
                  />
                ))}
                <span className="ms-1.5 text-[10px] font-bold text-gray-400">{t('card.count')}</span>
              </div>
            </motion.div>

            {/* Floating mini-badge — top corner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6, type: 'spring' }}
              className="absolute end-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 shadow-lg backdrop-blur-md sm:end-6 sm:top-6"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-700">
                F&B · MENA
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
