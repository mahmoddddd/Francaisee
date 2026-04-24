'use client';

import { motion, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export function FloatingWidgets() {
  const t = useTranslations('floating');
  /* ── Top scroll progress bar ── */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  /* ── Show scroll-to-top after 400px ── */
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 400);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* ── Soft cursor-following spotlight (desktop only) ── */
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const spotlightX = useTransform(smoothX, (v) => v - 120);
  const spotlightY = useTransform(smoothY, (v) => v - 120);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* ── 1. Top scroll progress bar ── */}
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-500 via-brand-600 to-brand-500"
      />

      {/* ── 2. Cursor spotlight (hidden on touch/mobile) ── */}
      <motion.div
        style={{ x: spotlightX, y: spotlightY }}
        className="pointer-events-none fixed left-0 top-0 z-[55] hidden h-60 w-60 rounded-full mix-blend-multiply md:block"
        aria-hidden
      >
        <div className="h-full w-full rounded-full bg-brand-500/15 blur-3xl" />
      </motion.div>

      {/* ── 3. Bottom-left LIVE badge (continuous pulse) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="fixed bottom-6 start-6 z-40 hidden items-center gap-2.5 rounded-full border border-gray-200 bg-white/90 px-4 py-2 shadow-soft backdrop-blur-md md:flex"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-700">
          {t('badge')}
        </span>
      </motion.div>

      {/* ── 4. Bottom-right floating WhatsApp/CTA (continuous bob + ping) ── */}
      <motion.a
        href="#contact"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6, type: 'spring' }}
        className="group fixed bottom-4 end-4 z-40 block sm:bottom-6 sm:end-6"
        aria-label={t('contactAria')}
      >
        {/* Outer ping rings — continuous */}
        <span className="absolute inset-0 animate-ping rounded-full bg-brand-500 opacity-25" />
        <span
          className="absolute inset-0 animate-ping rounded-full bg-brand-500 opacity-20"
          style={{ animationDelay: '0.6s' }}
        />

        {/* Main button — continuous gentle bob */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-brand transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14"
        >
          {/* Inner shine overlay */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/25 to-transparent" />
          <MessageCircle className="relative h-5 w-5 sm:h-6 sm:w-6" />
        </motion.div>

        {/* Tooltip */}
        <div className="pointer-events-none absolute end-full top-1/2 me-4 -translate-y-1/2 whitespace-nowrap rounded-full bg-gray-900 px-4 py-2 text-xs font-bold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:me-5 rtl:start-full rtl:end-auto rtl:ms-4 rtl:group-hover:ms-5">
          {t('tooltip')}
          <span className="absolute top-1/2 -translate-y-1/2 border-4 border-transparent border-s-gray-900 end-full rtl:start-full rtl:end-auto rtl:border-s-transparent rtl:border-e-gray-900" />
        </div>
      </motion.a>

      {/* ── 5. Scroll-to-top button (only after scrolling) ── */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={false}
        animate={showTop ? { opacity: 1, y: 0, pointerEvents: 'auto' } : { opacity: 0, y: 20, pointerEvents: 'none' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="group fixed bottom-20 end-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-card transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 sm:bottom-24 sm:end-6 sm:h-11 sm:w-11"
        aria-label={t('scrollTopAria')}
      >
        <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </motion.button>
    </>
  );
}
