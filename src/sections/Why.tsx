'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Factory, Cog, TrendingUp, BarChart3, MapPin, Rocket } from 'lucide-react';
import { useRef } from 'react';

const ICONS = [Factory, Cog, TrendingUp, BarChart3, MapPin, Rocket];

function CircularContentCard({
  item,
  index,
}: {
  item: { title: string; description: string };
  index: number;
}) {
  const Icon = ICONS[index] ?? Rocket;
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex aspect-square w-full max-w-[340px] mx-auto flex-col items-center justify-center rounded-full bg-white p-6 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-gray-100"
    >
      {/* Decorative dashed inner border */}
      <div className="absolute inset-4 rounded-full border border-dashed border-gray-200 transition-all duration-700 group-hover:inset-3 group-hover:border-brand-300 group-hover:rotate-180 group-hover:bg-brand-50/40" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center mt-2">
        {/* Floating Number */}
        <div className="absolute -top-16 font-display text-4xl font-black text-gray-100 transition-all duration-500 group-hover:-translate-y-2 group-hover:text-brand-200">
          {num}
        </div>
        
        {/* Icon */}
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-500 transition-all duration-500 group-hover:bg-brand-500 group-hover:text-white group-hover:scale-110 shadow-sm">
          <Icon className="h-7 w-7" />
        </div>
        
        {/* Title */}
        <h3 className="mb-3 text-lg font-black text-gray-900 transition-colors duration-300 group-hover:text-brand-600 sm:text-xl px-2">
          {item.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm leading-relaxed text-gray-500 group-hover:text-gray-700 max-w-[220px]">
          {item.description}
        </p>
      </div>
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
    <section ref={ref} id="why" className="section relative overflow-hidden bg-gray-50/50">
      {/* Decorative background rings */}
      <motion.div
        style={{ y: decorY, rotate: decorRotate }}
        className="pointer-events-none absolute -end-40 top-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full border-[40px] border-brand-50 opacity-70 md:h-[700px] md:w-[700px]"
      />
      <motion.div
        style={{ y: decorY, rotate: decorRotate }}
        className="pointer-events-none absolute -start-32 bottom-20 h-64 w-64 rounded-full border-[30px] border-brand-50 opacity-50 md:h-96 md:w-96"
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        {/* TOP: Centered Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-16 max-w-4xl text-center sm:mb-20"
        >
          <div className="eyebrow mb-5 inline-flex justify-center">{t('eyebrow')}</div>
          <h2 className="h-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl">{t('title')}</h2>
        </motion.div>

        {/* BOTTOM: Circular Cards Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
          {items.map((item, i) => (
            <CircularContentCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
