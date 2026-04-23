'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { BRANDS } from '@/lib/brands';
import { LanguageSwitcher } from './LanguageSwitcher';

const SECTIONS = ['about', 'brands', 'services', 'process', 'contact'] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const brandsT = useTranslations('brands.items');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white border-b border-gray-100 shadow-sm' : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between gap-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500">
            <span className="text-sm font-black text-white">CH</span>
          </div>
          <span className="text-sm font-black uppercase tracking-[0.25em] text-gray-900">
            City Hub
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {SECTIONS.map((id) =>
            id === 'brands' ? (
              <div
                key={id}
                className="relative"
                onMouseEnter={() => setBrandsOpen(true)}
                onMouseLeave={() => setBrandsOpen(false)}
              >
                <a
                  href={`#${id}`}
                  className="inline-flex items-center gap-1 py-2 text-sm font-semibold text-gray-600 transition hover:text-brand-500"
                >
                  {t(id)}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${
                      brandsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </a>

                <AnimatePresence>
                  {brandsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute start-1/2 top-full z-50 mt-3 w-[520px] -translate-x-1/2 rounded-2xl border border-gray-100 bg-white p-4 shadow-card rtl:translate-x-1/2"
                    >
                      {/* Arrow pointer */}
                      <div className="absolute -top-1.5 start-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-s border-t border-gray-100 bg-white rtl:translate-x-1/2" />

                      <div className="grid grid-cols-2 gap-1.5">
                        {BRANDS.map((b) => {
                          const isProductShot = b.key === 'ktown';
                          return (
                            <Link
                              key={b.key}
                              href={`/${locale}/brands/${b.slug}`}
                              onClick={() => setBrandsOpen(false)}
                              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-gray-50"
                            >
                              <div
                                className="relative h-11 w-11 flex-none overflow-hidden rounded-lg ring-1 ring-gray-100 transition-transform duration-300 group-hover:scale-110"
                                style={{ background: isProductShot ? '#111' : b.accent }}
                              >
                                {b.image && (
                                  <Image
                                    src={b.image}
                                    alt={brandsT(`${b.key}.name`)}
                                    fill
                                    sizes="44px"
                                    className={
                                      isProductShot
                                        ? 'object-contain scale-90'
                                        : 'object-cover'
                                    }
                                  />
                                )}
                              </div>
                              <div className="min-w-0">
                                <div className="truncate text-sm font-black text-gray-900 group-hover:text-brand-600">
                                  {brandsT(`${b.key}.name`)}
                                </div>
                                <div className="truncate text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                                  {brandsT(`${b.key}.cuisine`)}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      <a
                        href="#brands"
                        onClick={() => setBrandsOpen(false)}
                        className="mt-2 flex items-center justify-center gap-2 border-t border-gray-100 pt-3 text-xs font-bold uppercase tracking-[0.22em] text-brand-500 transition hover:text-brand-600"
                      >
                        {locale === 'ar' ? 'كل البراندات' : 'View all brands'}
                        <span className="rtl:rotate-180">→</span>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                key={id}
                href={`#${id}`}
                className="text-sm font-semibold text-gray-600 transition hover:text-brand-500"
              >
                {t(id)}
              </a>
            )
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-xs font-bold text-white shadow-brand transition hover:-translate-y-0.5 hover:bg-brand-600"
          >
            {t('cta')}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gray-100 bg-white lg:hidden"
          >
            <div className="container mx-auto flex flex-col gap-1 py-4">
              {SECTIONS.map((id) =>
                id === 'brands' ? (
                  <div key={id}>
                    <button
                      onClick={() => setMobileBrandsOpen((v) => !v)}
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      {t(id)}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${mobileBrandsOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileBrandsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="ms-4 mt-1 flex flex-col gap-0.5 border-s-2 border-gray-100 ps-3">
                            {BRANDS.map((b) => {
                              const isProductShot = b.key === 'ktown';
                              return (
                                <Link
                                  key={b.key}
                                  href={`/${locale}/brands/${b.slug}`}
                                  onClick={() => setOpen(false)}
                                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-gray-50"
                                >
                                  <div
                                    className="relative h-9 w-9 flex-none overflow-hidden rounded-lg ring-1 ring-gray-100"
                                    style={{ background: isProductShot ? '#111' : b.accent }}
                                  >
                                    {b.image && (
                                      <Image
                                        src={b.image}
                                        alt={brandsT(`${b.key}.name`)}
                                        fill
                                        sizes="36px"
                                        className={
                                          isProductShot
                                            ? 'object-contain scale-90'
                                            : 'object-cover'
                                        }
                                      />
                                    )}
                                  </div>
                                  <span className="font-black text-gray-900">
                                    {brandsT(`${b.key}.name`)}
                                  </span>
                                  <span className="ms-auto text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                                    {brandsT(`${b.key}.cuisine`)}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-brand-500"
                  >
                    {t(id)}
                  </a>
                )
              )}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-3 text-xs font-bold text-white"
              >
                {t('cta')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
