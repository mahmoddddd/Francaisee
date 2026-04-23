'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { Check, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function Support() {
  const t = useTranslations('support');
  const visionT = useTranslations('vision');
  const items = t.raw('items') as Array<{ title: string; description: string }>;

  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto">
        <div className="grid gap-10 sm:gap-14 lg:grid-cols-2 lg:items-start">
          {/* Vision card */}
          <Reveal direction="right">
            <div className="rounded-3xl bg-brand-500 p-7 text-white sm:p-10 md:p-12">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
                {visionT('eyebrow')}
              </div>
              <blockquote className="mt-4 text-xl font-black leading-tight sm:mt-5 sm:text-2xl md:text-3xl">
                {visionT('title')}
              </blockquote>
              <div className="mt-6 h-1 w-12 rounded-full bg-white/30 sm:mt-8" />
            </div>
          </Reveal>

          {/* Support list */}
          <Reveal direction="left" delay={0.08}>
            <div>
              <div className="eyebrow mb-4">{t('eyebrow')}</div>
              <h2 className="h-display text-2xl sm:text-3xl md:text-4xl">{t('title')}</h2>
              <ul className="mt-6 space-y-3 sm:mt-8">
                {items.map((item) => (
                  <li
                    key={item.title}
                    className="group flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 transition hover:border-brand-100 hover:shadow-soft sm:gap-4 sm:p-5"
                  >
                    <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-50 text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
                      <Check className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[15px] font-black text-gray-900 sm:text-base">{item.title}</div>
                      <div className="mt-1 text-[13px] leading-relaxed text-gray-500 sm:text-sm">
                        {item.description}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* City Hub place — 3D feature card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 overflow-hidden rounded-3xl sm:mt-16"
          style={{ perspective: '1200px' }}
        >
          <motion.div
            whileHover={{ rotateX: -3, rotateY: 4, scale: 1.01 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-2xl sm:aspect-[16/10] md:aspect-[21/9]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Image
              src="/images/hero/cityhub-place.png"
              alt="City Hub"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

            {/* Top badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute start-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur sm:start-8 sm:top-8 sm:px-4 sm:py-2"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-500" />
              <span className="text-xs font-black text-gray-900">City Hub</span>
            </motion.div>

            {/* Bottom copy */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-14">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-400 sm:text-[10px] sm:tracking-[0.28em]">
                F&B Ecosystem · MENA
              </div>
              <p className="mt-2 max-w-xl font-display text-xl font-black leading-tight text-white sm:mt-3 sm:text-2xl md:text-4xl">
                من الفكرة للتشغيل —<br />
                <span className="text-brand-400">تحت سقف واحد.</span>
              </p>
            </div>

            {/* Top accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute inset-x-0 top-0 h-1 origin-left bg-brand-500"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
