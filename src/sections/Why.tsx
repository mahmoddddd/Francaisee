'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Factory, Cog, TrendingUp, BarChart3, MapPin, Rocket, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

const ICONS = [Factory, Cog, TrendingUp, BarChart3, MapPin, Rocket];

function FeatureRow({
  item,
  index,
  total
}: {
  item: { title: string; description: string };
  index: number;
  total: number;
}) {
  const Icon = ICONS[index] ?? Rocket;
  const num = String(index + 1).padStart(2, '0');
  const isLast = index === total - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative grid grid-cols-[auto_1fr_auto] items-center gap-3 py-6 sm:gap-5 sm:py-8 md:gap-10 md:py-10 ${
        !isLast ? 'border-b border-gray-200' : ''
      }`}
    >
      {/* Animated accent bar on left — appears on hover */}
      <div className="absolute start-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-brand-500 transition-transform duration-500 ease-out group-hover:scale-y-100" />

      {/* Big outlined number */}
      <div className="relative w-10 text-center sm:w-16 md:w-24">
        <span
          className="font-display text-2xl font-black tracking-tight text-transparent transition-colors duration-500 group-hover:text-brand-500 sm:text-4xl md:text-6xl"
          style={{ WebkitTextStroke: '1.5px #d1d5db' }}
        >
          {num}
        </span>
      </div>

      {/* Title + description */}
      <div className="min-w-0">
        <h3 className="text-lg font-black text-gray-900 transition-colors duration-300 sm:text-xl md:text-3xl">
          {item.title}
        </h3>
        <motion.p
          initial={{ opacity: 0.75 }}
          className="mt-1.5 text-[13px] leading-relaxed text-gray-500 sm:mt-2 sm:text-sm md:mt-3 md:text-base md:max-w-xl"
        >
          {item.description}
        </motion.p>
      </div>

      {/* Icon that animates on hover */}
      <div className="flex-none">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition-all duration-500 group-hover:border-brand-500 group-hover:bg-brand-500 sm:h-14 sm:w-14 md:h-16 md:w-16">
          <Icon className="h-4 w-4 text-gray-400 transition-colors duration-500 group-hover:text-white sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </div>
      </div>

      {/* Sweeping underline animation */}
      {!isLast && (
        <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand-500 transition-transform duration-700 ease-out group-hover:scale-x-100" />
      )}
    </motion.div>
  );
}

export function Why() {
  const t = useTranslations('why');
  const items = t.raw('items') as Array<{ title: string; description: string }>;
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const decorY = useTransform(scrollYProgress, [0, 1], ['-30%', '30%']);
  const decorRotate = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section ref={ref} id="why" className="section relative overflow-hidden bg-white">
      {/* Decorative background ring */}
      <motion.div
        style={{ y: decorY, rotate: decorRotate }}
        className="pointer-events-none absolute -end-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full border-[40px] border-brand-50 opacity-70 md:h-[700px] md:w-[700px]"
      />
      <motion.div
        style={{ y: decorY, rotate: decorRotate }}
        className="pointer-events-none absolute -start-32 top-20 h-64 w-64 rounded-full border-[30px] border-brand-50 opacity-50 md:h-96 md:w-96"
      />

      <div className="container relative mx-auto">
        <div className="grid gap-10 sm:gap-14 lg:grid-cols-[0.85fr_1.4fr] lg:items-start lg:gap-20">

          {/* LEFT: Sticky title column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="eyebrow mb-4 sm:mb-5">{t('eyebrow')}</div>
              <h2 className="h-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{t('title')}</h2>

              {/* Mini stats card */}
              <div className="mt-10 inline-flex items-center gap-4 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-soft">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white">
                  <Rocket className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">
                    {t('eyebrow')}
                  </div>
                  <div className="text-sm font-black text-gray-900">
                    {t('title').split(' ').slice(0, 3).join(' ')}
                  </div>
                </div>
              </div>

              {/* Accent lines */}
              <div className="mt-10 hidden flex-col gap-3 lg:flex">
                {[1, 2, 3].map((n) => (
                  <motion.div
                    key={n}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.3 + n * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="h-0.5 origin-left bg-gradient-to-r from-brand-500 to-transparent"
                    style={{ width: `${n * 40}px` }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Vertical feature list */}
          <div className="relative">
            {items.map((item, i) => (
              <FeatureRow key={item.title} item={item} index={i} total={items.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
