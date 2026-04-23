export type BrandKey =
  | 'jinzo'
  | 'shakencake'
  | 'ktown'
  | 'haret'
  | 'stravo'
  | 'tokyotreats';

export interface BrandConfig {
  key: BrandKey;
  slug: string;
  accent: string;
  bgFrom: string;
  bgTo: string;
  image?: string;
  heroImage?: string;
  gallery?: string[];
  instagram?: string;
}

export const BRANDS: BrandConfig[] = [
  {
    key: 'shakencake',
    slug: 'shake-n-cake',
    accent: '#ff2d87',
    bgFrom: '#ffeaf4',
    bgTo: '#fff0f7',
    image: '/images/shakencake/sc-14.jpg',
    heroImage: '/images/shakencake/sc-20.jpg',
    gallery: [
      '/images/shakencake/sc-01.jpg',
      '/images/shakencake/sc-03.jpg',
      '/images/shakencake/sc-04.jpg',
      '/images/shakencake/sc-06.jpg',
      '/images/shakencake/sc-09.jpg',
      '/images/shakencake/sc-11.jpg',
      '/images/shakencake/sc-12.jpg',
      '/images/shakencake/sc-15.jpg',
      '/images/shakencake/sc-16.jpg',
      '/images/shakencake/sc-17.jpg',
      '/images/shakencake/sc-18.jpg',
      '/images/shakencake/sc-21.jpg'
    ],
    instagram: 'https://www.instagram.com/crazyshakencake'
  },
  {
    key: 'stravo',
    slug: 'stravo',
    accent: '#e3392e',
    bgFrom: '#fff0ee',
    bgTo: '#fff5ed',
    image: '/images/stravo/02.jpg',
    heroImage: '/images/stravo/02.jpg',
    gallery: [
      '/images/stravo/01.jpg',
      '/images/stravo/02.jpg',
      '/images/stravo/03.jpg',
      '/images/stravo/04.jpg',
      '/images/stravo/05.jpg',
      '/images/stravo/06.jpg'
    ],
    instagram: 'https://www.instagram.com/stravo_eg'
  },
  {
    key: 'jinzo',
    slug: 'jinzo',
    accent: '#c4382b',
    bgFrom: '#fff2ea',
    bgTo: '#fff6eb',
    image: '/images/jinzo/img-p6-01.jpeg',
    heroImage: '/images/jinzo/img-p10-02.jpeg',
    gallery: [
      '/images/jinzo/img-p6-01.jpeg',
      '/images/jinzo/img-p6-02.jpeg',
      '/images/jinzo/img-p7-01.jpeg',
      '/images/jinzo/img-p8-01.jpeg',
      '/images/jinzo/img-p9-01.jpeg',
      '/images/jinzo/img-p9-02.jpeg',
      '/images/jinzo/img-p10-01.jpeg',
      '/images/jinzo/img-p10-02.jpeg'
    ],
    instagram: 'https://www.instagram.com/jinzoeg'
  },
  {
    key: 'ktown',
    slug: 'k-town',
    accent: '#dc2626',
    bgFrom: '#fff4ef',
    bgTo: '#fff8f0',
    image: '/images/ktown/korian-fried-chicken.png',
    heroImage: '/images/ktown/chicken-wings.png',
    gallery: [
      '/images/ktown/classic-korian.png',
      '/images/ktown/mitty-crunchy.png',
      '/images/ktown/ranch-king.png',
      '/images/ktown/smoky-becan.png',
      '/images/ktown/tender-crispy.png',
      '/images/ktown/double-crunchy-cheese.png'
    ],
    instagram: 'https://www.instagram.com/ktowneg'
  },
  {
    key: 'haret',
    slug: 'haret-elyasmeen',
    accent: '#b5533c',
    bgFrom: '#f8f2e0',
    bgTo: '#fbf7ea',
    image: '/images/haret/img-p11-01.jpeg',
    heroImage: '/images/haret/img-p14-01.jpeg',
    gallery: [
      '/images/haret/img-p11-01.jpeg',
      '/images/haret/img-p14-01.jpeg',
      '/images/haret/img-p13-01.jpeg',
      '/images/haret/img-p13-02.jpeg',
      '/images/haret/img-p12-01.jpeg',
      '/images/haret/img-p17-01.jpeg',
      '/images/haret/img-p9-01.jpeg',
      '/images/haret/img-p2-01.jpeg'
    ]
  },
  {
    key: 'tokyotreats',
    slug: 'tokyo-treats',
    accent: '#dc2626',
    bgFrom: '#0a0a0a',
    bgTo: '#1a1a1a',
    image: '/images/tokyotreats/page-01.jpg',
    heroImage: '/images/tokyotreats/page-01.jpg',
    instagram: 'https://www.instagram.com/tokyotreats_eg'
  }
];

export function getBrand(slug: string): BrandConfig | undefined {
  return BRANDS.find((b) => b.slug === slug);
}
