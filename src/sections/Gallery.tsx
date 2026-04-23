'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

const ROW1 = [
  { src: '/images/shakencake/sc-01.jpg',  aspect: 'aspect-[3/4]' },
  { src: '/images/haret/img-p11-01.jpeg', aspect: 'aspect-[4/5]' },
  { src: '/images/shakencake/sc-09.jpg',  aspect: 'aspect-[3/4]' },
  { src: '/images/stravo/02.jpg',         aspect: 'aspect-square' },
  { src: '/images/haret/img-p14-01.jpeg', aspect: 'aspect-[3/4]' },
  { src: '/images/shakencake/sc-12.jpg',  aspect: 'aspect-[4/5]' },
];

const ROW2 = [
  { src: '/images/shakencake/sc-18.jpg',  aspect: 'aspect-square' },
  { src: '/images/stravo/04.jpg',         aspect: 'aspect-[3/4]' },
  { src: '/images/haret/img-p13-01.jpeg', aspect: 'aspect-[4/5]' },
  { src: '/images/jinzo/img-p7-01.jpeg',  aspect: 'aspect-[3/4]' },
  { src: '/images/shakencake/sc-15.jpg',  aspect: 'aspect-[4/5]' },
  { src: '/images/stravo/01.jpg',         aspect: 'aspect-square' },
];

type Img = { src: string; aspect: string };

function MarqueeRow({
  items,
  direction,
  duration,
  cardWidth,
}: {
  items: Img[];
  direction: 'left' | 'right';
  duration: number;
  cardWidth: string;
}) {
  // Duplicate the list so the 50% translate loop is seamless.
  const loop = [...items, ...items];
  return (
    <div className="marquee-pause overflow-hidden">
      <div
        className={`marquee-track gap-4 ${
          direction === 'left' ? 'marquee-left' : 'marquee-right'
        }`}
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        {loop.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className={`relative flex-none ${cardWidth} ${img.aspect} overflow-hidden rounded-2xl`}
          >
            <Image
              src={img.src}
              alt=""
              fill
              sizes="360px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Gallery() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <div className="overflow-hidden bg-gray-900 py-20 md:py-28">
      <div className="container mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-xl text-center"
        >
          <div className="eyebrow mb-4 justify-center text-brand-400">
            {isAr ? 'من داخل البراندات' : 'Inside our brands'}
          </div>
          <h2 className="h-display text-4xl text-white md:text-5xl">
            {isAr
              ? 'لحظات حقيقية من التجربة'
              : 'Real moments from the experience'}
          </h2>
        </motion.div>
      </div>

      <div className="relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-gray-900 to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-gray-900 to-transparent md:w-40" />

        <MarqueeRow
          items={ROW1}
          direction={isAr ? 'right' : 'left'}
          duration={45}
          cardWidth="w-[55vw] md:w-[320px] lg:w-[360px]"
        />
        <div className="h-4" />
        <MarqueeRow
          items={ROW2}
          direction={isAr ? 'left' : 'right'}
          duration={55}
          cardWidth="w-[48vw] md:w-[290px] lg:w-[330px]"
        />
      </div>
    </div>
  );
}
