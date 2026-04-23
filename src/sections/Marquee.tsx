'use client';

import { motion } from 'framer-motion';
import { BRANDS } from '@/lib/brands';
import { useTranslations } from 'next-intl';

export function Marquee() {
  const t = useTranslations('brands.items');
  const items = [...BRANDS, ...BRANDS];

  return (
    <div aria-hidden className="overflow-hidden border-y border-gray-100 bg-gray-50 py-5">
      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
      >
        {items.map((b, i) => (
          <div key={`${b.key}-${i}`} className="flex items-center">
            <div className="flex items-center gap-3 px-8">
              <span
                className="h-1.5 w-1.5 rounded-full flex-none"
                style={{ background: b.accent }}
              />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
                {t(`${b.key}.name`)}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
