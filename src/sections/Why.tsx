'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Factory, Cog, TrendingUp, BarChart3, MapPin, Rocket } from 'lucide-react';
import { useRef } from 'react';

const ICONS = [Factory, Cog, TrendingUp, BarChart3, MapPin, Rocket];

function SpinningContentCard({
  item,
  index,
}: {
  item: { title: string; description: string };
  index: number;
}) {
  const Icon = ICONS[index] ?? Rocket;
  // Use English text for the rotating path because Arabic letters disconnect and break on SVG curves.
  // Repeated twice naturally to fill the circle without forcing textLength.
  const englishRingText = "CITY HUB \u00A0\u00A0\u00A0\u00A0 • \u00A0\u00A0\u00A0\u00A0 F&B ECOSYSTEM \u00A0\u00A0\u00A0\u00A0 • \u00A0\u00A0\u00A0\u00A0 CITY HUB \u00A0\u00A0\u00A0\u00A0 • \u00A0\u00A0\u00A0\u00A0 F&B ECOSYSTEM \u00A0\u00A0\u00A0\u00A0 • \u00A0\u00A0\u00A0\u00A0";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex aspect-square w-full max-w-[230px] sm:max-w-[300px] lg:max-w-[360px] flex-none flex-col items-center justify-center rounded-full bg-brand-950 p-4 sm:p-6 text-center shadow-[0_0_80px_rgba(var(--brand-500),0.15)] transition-all duration-500 hover:scale-105 border border-brand-900"
    >
      {/* Abstract Glowing Backdrop */}
      <div className="absolute inset-0 rounded-full bg-brand-500/10 blur-2xl transition-colors duration-700 group-hover:bg-brand-500/20" />

      {/* Decorative Inner Dashed Ring */}
      <motion.div 
        animate={{ rotate: -360 }} 
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-6 rounded-full border-[1.5px] border-dashed border-brand-500/30 group-hover:border-brand-500/60 transition-colors duration-500" 
      />
      
      {/* Rotating English Text SVG */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          <path
            id={`circlePath-${index}`}
            d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
            fill="transparent"
          />
          {/* Removed textLength, increased letterSpacing, lightened color and made it bold */}
          <text fill="currentColor" fontSize="5.5" fontWeight="900" letterSpacing="6" className="text-white opacity-90 uppercase font-black" style={{ direction: 'ltr' }}>
            <textPath href={`#circlePath-${index}`} startOffset="0%">
              {englishRingText}
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center mt-1 sm:mt-2 px-4 sm:px-6">
        <div className="mb-3 sm:mb-5 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-[0_0_40px_rgb(var(--brand-500),0.5)] transition-transform duration-500 group-hover:scale-110">
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
        </div>
        
        <h3 className="mb-1 sm:mb-2 text-base font-black text-white transition-colors duration-300 group-hover:text-brand-300 sm:text-xl leading-snug">
          {item.title}
        </h3>
        
        <p className="text-[11px] sm:text-[13px] leading-relaxed text-brand-100/60 max-w-[150px] sm:max-w-[180px] transition-colors group-hover:text-brand-100/90 line-clamp-3 sm:line-clamp-none">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

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
      className="group relative flex aspect-square w-full max-w-[230px] sm:max-w-[300px] lg:max-w-[360px] flex-none flex-col items-center justify-center rounded-full bg-gray-900 p-4 sm:p-6 text-center shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(var(--brand-500),0.15)] border border-gray-800"
    >
      {/* Decorative dashed inner border */}
      <div className="absolute inset-4 rounded-full border border-dashed border-gray-700 transition-all duration-700 group-hover:inset-3 group-hover:border-brand-500 group-hover:rotate-180 group-hover:bg-brand-900/50" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center mt-1 sm:mt-2">
        {/* Floating Number */}
        <div className="absolute -top-10 sm:-top-16 font-display text-3xl sm:text-4xl font-black text-gray-800 transition-all duration-500 group-hover:-translate-y-2 group-hover:text-brand-500">
          {num}
        </div>
        
        {/* Icon */}
        <div className="mb-3 sm:mb-5 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gray-800 text-brand-500 transition-all duration-500 group-hover:bg-brand-500 group-hover:text-white group-hover:scale-110 shadow-lg border border-gray-700 group-hover:border-brand-400">
          <Icon className="h-5 w-5 sm:h-7 sm:w-7" />
        </div>
        
        {/* Title */}
        <h3 className="mb-1 sm:mb-3 text-base sm:text-xl font-black text-white transition-colors duration-300 group-hover:text-brand-400 px-2 leading-tight">
          {item.title}
        </h3>
        
        {/* Description */}
        <p className="text-[11px] sm:text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 max-w-[150px] sm:max-w-[220px] line-clamp-3 sm:line-clamp-none">
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
    <section ref={ref} id="why" className="section relative overflow-hidden bg-gray-950 py-24 sm:py-32">
      {/* Decorative background rings */}
      <motion.div
        style={{ y: decorY, rotate: decorRotate }}
        className="pointer-events-none absolute -end-40 top-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full border-[40px] border-brand-900/30 opacity-70 md:h-[700px] md:w-[700px]"
      />
      <motion.div
        style={{ y: decorY, rotate: decorRotate }}
        className="pointer-events-none absolute -start-32 bottom-20 h-64 w-64 rounded-full border-[30px] border-brand-900/20 opacity-50 md:h-96 md:w-96"
      />

      <div className="w-full relative">
        {/* TOP: Centered Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-16 max-w-4xl text-center sm:mb-24 px-4 sm:px-6"
        >
          <div className="eyebrow mb-5 inline-flex justify-center border-gray-800 bg-gray-900 text-brand-400">{t('eyebrow')}</div>
          <h2 className="h-display text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl">{t('title')}</h2>
        </motion.div>

        {/* BOTTOM: Edge-to-Edge Circular Distribution */}
        <div className="mx-auto flex w-full max-w-[1800px] flex-wrap justify-center gap-6 sm:gap-10 lg:gap-12 px-4 lg:px-8 pb-10">
          {items.map((item, i) => {
            if (i === 1) {
              return <SpinningContentCard key={item.title} item={item} index={i} />;
            }
            return <CircularContentCard key={item.title} item={item} index={i} />;
          })}
        </div>
      </div>
    </section>
  );
}
