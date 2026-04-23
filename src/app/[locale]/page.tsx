import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/sections/Hero';
import { Marquee } from '@/sections/Marquee';
import { About } from '@/sections/About';
import { Brands } from '@/sections/Brands';
import { Services } from '@/sections/Services';
import { Gallery } from '@/sections/Gallery';
import { Stats } from '@/sections/Stats';
import { Why } from '@/sections/Why';
import { Process } from '@/sections/Process';
import { Investment } from '@/sections/Investment';
import { Support } from '@/sections/Support';
import { Contact } from '@/sections/Contact';
import { ClosingBanner } from '@/sections/ClosingBanner';

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Brands />
        <Services />
        <Gallery />
        <Stats />
        <Why />
        <Process />
        <Investment />
        <Support />
        <Contact />
        <ClosingBanner />
      </main>
      <Footer />
    </>
  );
}
