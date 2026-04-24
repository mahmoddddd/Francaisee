'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

function TimelineStep({
  step,
  index,
  total,
  progress
}: {
  step: { title: string; description: string };
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const isLast = index === total - 1;

  /* Each step "activates" at its scroll segment */
  const segmentStart = index / total;
  const segmentEnd = (index + 0.5) / total;
  const activeProgress = useTransform(progress, [segmentStart, segmentEnd], [0, 1]);
  const circleScale = useTransform(activeProgress, [0, 1], [0.9, 1]);
  const lineScale = useTransform(progress, [segmentStart, (index + 1) / total], [0, 1]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid grid-cols-[auto_1fr] gap-4 pb-10 last:pb-0 sm:gap-6 sm:pb-12 md:gap-8"
    >
      {/* Number circle + connecting line */}
      <div className="relative flex flex-col items-center">
        {/* Outer pulse ring */}
        <motion.div
          style={{ scale: circleScale }}
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-base font-black text-white shadow-brand sm:h-14 sm:w-14 sm:text-lg md:h-16 md:w-16 md:text-xl"
        >
          {/* Shine overlay */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
          <span className="relative">{index + 1}</span>
        </motion.div>

        {/* Vertical progress line */}
        {!isLast && (
          <div className="absolute top-11 h-[calc(100%-2.75rem)] w-0.5 bg-gray-200 sm:top-14 sm:h-[calc(100%-3.5rem)] md:top-16 md:h-[calc(100%-4rem)]">
            <motion.div
              style={{ scaleY: lineScale, originY: 0 }}
              className="h-full w-full bg-gradient-to-b from-brand-500 to-brand-300"
            />
          </div>
        )}
      </div>

      {/* Content card */}
      <div className="group rounded-2xl border border-transparent p-0 transition-all duration-300 hover:border-gray-100 hover:bg-white hover:p-5 hover:shadow-soft md:hover:-translate-y-1">
        <h3 className="text-lg font-black text-gray-900 transition-colors duration-300 group-hover:text-brand-600 sm:text-xl md:text-2xl">
          {step.title}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-gray-500 sm:mt-2 sm:text-sm md:mt-3 md:text-base">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Process() {
  const t = useTranslations('process');
  const steps = t.raw('steps') as Array<{ title: string; description: string }>;
  const miniStats = t.raw('miniStats') as Array<{ value: string; label: string }>;
  const ref = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center']
  });

  const imgScale = useTransform(sectionProgress, [0, 1], [1, 1.12]);
  const imgY = useTransform(sectionProgress, [0, 1], ['-3%', '3%']);

  return (
    <section ref={ref} id="process" className="section relative overflow-hidden bg-gray-50">
      {/* Dotted grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #d1d5db 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="container relative mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-16"
        >
          <div className="eyebrow justify-center mb-4">{t('eyebrow')}</div>
          <h2 className="h-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{t('title')}</h2>
        </motion.div>

        {/* Split: sticky image + vertical timeline */}
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.95fr_1.1fr] lg:gap-16">

          {/* LEFT: Sticky professional image */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl"
            >
              <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
                <Image
                  src="/images/shakencake/sc-20.jpg"
                  alt={t('title')}
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

              {/* Top badge */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
                className="absolute start-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/95 px-4 py-2 shadow-lg backdrop-blur"
              >
                <Sparkles className="h-3.5 w-3.5 text-brand-500" />
                <span className="text-xs font-black text-gray-900">{t('badgeSteps')}</span>
              </motion.div>

              {/* Bottom content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="absolute inset-x-0 bottom-0 p-5 sm:p-8"
              >
                <div className="mb-2 text-[9px] font-bold uppercase tracking-[0.22em] text-brand-400 sm:mb-3 sm:text-[10px] sm:tracking-[0.28em]">
                  {t('journeyEyebrow')}
                </div>
                <h3 className="font-display text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
                  {t('badgeLine1')}<br />
                  <span className="text-brand-400">{t('badgeLine2')}</span>
                </h3>

                {/* Mini stats row */}
                <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/15 pt-4 sm:mt-6 sm:gap-4 sm:pt-5">
                  {miniStats.map((s) => (
                    <div key={s.label}>
                      <div className="text-xl font-black text-white sm:text-2xl md:text-3xl">{s.value}</div>
                      <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.16em] text-white/60 sm:text-[9px] sm:tracking-[0.2em]">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Animated corner accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 1 }}
                className="absolute inset-x-0 top-0 h-1 origin-left bg-brand-500"
              />
            </motion.div>

            {/* Floating accent ring — decorative */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
              className="absolute -end-4 -top-4 -z-10 hidden h-24 w-24 rounded-full border-8 border-brand-500/30 lg:block"
            />
          </div>

          {/* RIGHT: Timeline */}
          <div ref={timelineRef} className="relative">
            {steps.map((s, i) => (
              <TimelineStep
                key={s.title}
                step={s}
                index={i}
                total={steps.length}
                progress={timelineProgress}
              />
            ))}

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 ps-[3.5rem] sm:mt-8 sm:ps-20 md:ps-24"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-gray-900 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-500 hover:shadow-brand"
              >
                {t('cta')}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
