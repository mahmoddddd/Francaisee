'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Instagram } from 'lucide-react';

interface Props {
  accent: string;
  bgFrom: string;
  bgTo: string;
  heroImage?: string;
  name: string;
  cuisine: string;
  blurb: string;
  instagram?: string;
  locale: string;
  backLabel: string;
  franchiseLabel: string;
}

export function BrandHero({
  accent,
  heroImage,
  name,
  cuisine,
  blurb,
  instagram,
  locale,
  backLabel,
  franchiseLabel
}: Props) {
  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-gray-900 pt-20">
      {/* Background image */}
      {heroImage && (
        <>
          <Image
            src={heroImage}
            alt={name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-gray-900/20" />
        </>
      )}
      {!heroImage && (
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(ellipse at 70% 30%, ${accent}, transparent 60%)` }}
        />
      )}

      <div className="relative container mx-auto flex flex-col justify-end min-h-[calc(88vh-80px)] pb-20">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-8 start-4 md:start-0"
        >
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
            {backLabel}
          </Link>
        </motion.div>

        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-4 text-xs font-bold uppercase tracking-[0.25em]"
            style={{ color: accent }}
          >
            {cuisine}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl font-black leading-[1.0] text-white md:text-8xl"
          >
            {name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg"
          >
            {blurb}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href={`/${locale}#contact`}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5"
              style={{ background: accent }}
            >
              {franchiseLabel}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </a>
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
