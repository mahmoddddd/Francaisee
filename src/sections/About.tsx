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
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 0.6], [1.12, 1]);
  const imgY    = useTransform(scrollYProgress, [0, 1],   ['-6%', '6%']);
  const textY   = useTransform(scrollYProgress, [0, 1],   ['4%',  '-4%']);

  return (
    <section
      ref={ref}
      id="about"
      className="relative overflow-hidden bg-gray-950"
    >
      {/* ── Layout grid ── */}
      <div className="grid min-h-[90vh] lg:grid-cols-2">

        {/* ── LEFT: cinematic image ── */}
        <div className="relative order-last overflow-hidden lg:order-first">
          <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
            <Image
              src="/images/shakencake/sc-05.jpg"
              alt=""
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Dual-side overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent lg:bg-gradient-to-r" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />

          {/* Brand dots card — bottom start */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-8 start-6 sm:bottom-10 sm:start-10 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-400">
              {t('card.eyebrow')}
            </p>
            <p className="mt-1.5 text-lg font-black text-white">{t('card.title')}</p>
            <div className="mt-3 flex items-center gap-2">
              {BRAND_COLORS.map((c) => (
                <span
                  key={c}
                  className="h-3 w-3 rounded-full ring-2 ring-white/10"
                  style={{ background: c }}
                />
              ))}
              <span className="ms-1 text-xs font-semibold text-white/50">{t('card.count')}</span>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: copy ── */}
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-24 lg:px-14 xl:px-20 2xl:px-24"
        >
          {/* Subtle glow */}
          <div className="pointer-events-none absolute -top-40 -end-40 h-[500px] w-[500px] rounded-full bg-brand-500/5 blur-3xl" />

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-6 text-brand-400"
          >
            {t('eyebrow')}
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-display text-3xl text-white sm:text-4xl md:text-5xl lg:text-[2.8rem] xl:text-[3.4rem] leading-[1.1]"
          >
            {t('title')}
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 mb-8 h-px w-16 origin-start bg-gradient-to-r from-brand-500 to-transparent"
          />

          {/* Paragraphs */}
          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-3.5"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500 sm:h-5 sm:w-5" />
                <p className="text-[15px] leading-relaxed text-gray-400 sm:text-base">{p}</p>
              </motion.div>
            ))}
          </div>

          {/* Mini stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-6 border-t border-white/10 pt-8"
          >
            {[
              { value: '6', label: t('card.count') },
              { value: 'MENA', label: 'Region' },
              { value: '1', label: 'Unified System' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-2xl font-black text-white sm:text-3xl">{value}</span>
                <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.a
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.75, duration: 0.5 }}
            href="#brands"
            className="group mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_30px_-8px_rgba(220,38,38,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-8px_rgba(220,38,38,0.9)]"
          >
            {t('cta')}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
