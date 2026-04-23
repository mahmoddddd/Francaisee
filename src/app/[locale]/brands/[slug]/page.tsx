import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { BRANDS, getBrand } from '@/lib/brands';
import { routing } from '@/i18n/routing';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BrandHero } from '@/components/brand/BrandHero';
import { BrandGallery } from '@/components/brand/BrandGallery';
import { BrandCTA } from '@/components/brand/BrandCTA';

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of routing.locales) {
    for (const b of BRANDS) params.push({ locale, slug: b.slug });
  }
  return params;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return {};
  const t = await getTranslations({ locale, namespace: 'brands.items' });
  return {
    title: `${t(`${brand.key}.name`)} — ${t(`${brand.key}.cuisine`)} | City Hub`,
    description: t(`${brand.key}.blurb`)
  };
}

export default async function BrandPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const brand = getBrand(slug);
  if (!brand) notFound();

  const t = await getTranslations('brands.items');
  const nav = await getTranslations('nav');

  return (
    <>
      <Navbar />
      <main>
        <BrandHero
          accent={brand.accent}
          bgFrom={brand.bgFrom}
          bgTo={brand.bgTo}
          heroImage={brand.heroImage}
          name={t(`${brand.key}.name`)}
          cuisine={t(`${brand.key}.cuisine`)}
          blurb={t(`${brand.key}.blurb`)}
          instagram={brand.instagram}
          locale={locale}
          backLabel={locale === 'ar' ? 'العودة لكل البراندات' : 'Back to all brands'}
          franchiseLabel={nav('cta')}
        />

        {brand.gallery && brand.gallery.length > 0 && (
          <BrandGallery images={brand.gallery} accent={brand.accent} locale={locale} />
        )}

        <BrandCTA
          accent={brand.accent}
          name={t(`${brand.key}.name`)}
          locale={locale}
        />
      </main>
      <Footer />
    </>
  );
}
