'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function About() {
  const t = useTranslations('about');
  const paragraphs = t.raw('paragraphs') as string[];
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <section ref={ref} id="about" className="section bg-white overflow-hidden">
      <div className="container mx-auto">
        <div className="grid gap-12 sm:gap-16 lg:grid-cols-2 lg:items-center">

          {/* Image — parallax + scale in */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 sm:aspect-[3/4]">
              <motion.div
                style={{ scale: imgScale, y: imgY }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/shakencake/sc-05.jpg"
                  alt="City Hub brands"
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, type: 'spring' }}
              className="absolute -bottom-6 end-2 rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-card sm:-end-4 sm:px-6 sm:py-5 md:-end-8"
            >
              <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-brand-500 sm:text-[10px] sm:tracking-[0.22em]">
                Ecosystem
              </div>
              <div className="mt-1 text-base font-black text-gray-900 sm:text-xl">F&B · MENA · Africa</div>
              <div className="mt-3 flex items-center gap-2">
                {['#ff2d87', '#e3392e', '#c4382b', '#ff5d3a', '#caa46a', '#ff4d8b'].map((c) => (
                  <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
                ))}
                <span className="text-xs font-semibold text-gray-400">6 brands</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eyebrow mb-4 sm:mb-5">{t('eyebrow')}</div>
            <h2 className="h-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem]">
              {t('title')}
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-gray-500 sm:mt-8 sm:space-y-5 sm:text-base">
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                >
                  {p}
                </motion.p>
              ))}
            </div>
            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              href="#brands"
              className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-brand-500 transition hover:text-brand-600"
            >
              تعرف على براندتنا
              <span className="rtl:rotate-180 transition-transform group-hover:translate-x-1">→</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
