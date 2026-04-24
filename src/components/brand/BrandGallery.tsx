'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';

interface Props {
  images: string[];
  accent: string;
  locale: string;
}

export function BrandGallery({ images, accent }: Props) {
  const t = useTranslations('gallery');
  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div
              className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em]"
              style={{ color: accent }}
            >
              {t('brandEyebrow')}
            </div>
            <h2 className="h-display text-4xl md:text-5xl">
              {t('brandTitle')}
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden rounded-2xl border border-gray-100 shadow-soft ${
                i % 5 === 0 ? 'aspect-[3/4]' : i % 5 === 2 ? 'aspect-[4/5]' : 'aspect-square'
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width:1024px) 300px, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
