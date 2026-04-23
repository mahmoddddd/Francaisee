import { useTranslations, useLocale } from 'next-intl';
import { Instagram, Mail, Phone } from 'lucide-react';
import { BRANDS } from '@/lib/brands';

const SECTIONS = ['about', 'brands', 'services', 'process', 'contact'] as const;

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500">
                <span className="text-sm font-black text-white">CH</span>
              </div>
              <span className="text-sm font-black uppercase tracking-[0.28em]">City Hub</span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/60">
              {t('footer.description')}
            </p>
            <p className="text-xs font-semibold text-brand-400">
              {t('closing.line1')} {t('closing.line2')}
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
              {t('footer.quickLinks')}
            </div>
            <ul className="space-y-2.5">
              {SECTIONS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-sm text-white/60 transition hover:text-brand-400"
                  >
                    {t(`nav.${id}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
              {t('footer.contact')}
            </div>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 text-brand-400 flex-none" />
                <a href="mailto:info@cityhub.eg" className="hover:text-white transition">
                  info@cityhub.eg
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-3.5 w-3.5 text-brand-400 flex-none" />
                <a href="tel:+201000000000" className="hover:text-white transition" dir="ltr">
                  +20 100 000 0000
                </a>
              </li>
              <li className="mt-5 flex flex-wrap gap-2">
                {BRANDS.filter((b) => b.instagram).map((b) => (
                  <a
                    key={b.key}
                    href={b.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition hover:border-brand-400 hover:text-brand-400"
                    aria-label={`Instagram ${b.key}`}
                  >
                    <Instagram className="h-3.5 w-3.5" />
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/30 md:flex-row">
          <span>© {year} City Hub. {t('footer.rights')}</span>
          <span>{t('footer.madeWith')}</span>
        </div>
      </div>
    </footer>
  );
}
