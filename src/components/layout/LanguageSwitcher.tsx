'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, start] = useTransition();
  const t = useTranslations('nav');

  const target = locale === 'ar' ? 'en' : 'ar';

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => start(() => router.replace(pathname, { locale: target }))}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-700 transition hover:border-gray-400 hover:bg-gray-50',
        pending && 'opacity-50',
        className
      )}
      aria-label="Switch language"
    >
      <Globe className="h-3.5 w-3.5" />
      <span>{t('language')}</span>
    </button>
  );
}
