import { PageMeta } from '@/types/meta';

// Base site configuration
export const siteConfig = {
  name: 'Satyam Enterprise',
  title: 'Satyam Enterprise - Industrial Machinery & Solutions',
  description: 'Distributor of Oil Level Indicator, Vulcanizing Machine, Service Pump, Air Compressor & Industrial Solutions based in Rajkot.',
  url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
  ogImage: '/Pawan0.png',
  author: {
    name: 'Sanjay Patel',
    email: 'satyamenterprise02@gmail.com',
  },
  keywords: [
    'Oil Level Indicator',
    'Vulcanizing Machine',
    'Service Pump',
    'Air Compressor',
    'Industrial Solutions',
    'Rajkot',
    'Satyam Enterprise',
    'Machinery',
    'Electric Blower',
    'Electric Motor',
    'Wood Working Machinery'
  ],
};

export const pageMetadata: Record<string, PageMeta> = {
  // Home page
  '/': {
    title: `Satyam Enterprise | Industrial Machinery Distributor`,
    description: `Leading distributor of Oil Level Indicators, Industrial Machinery, and Solutions in Rajkot. Contact Sanjay Patel for quality products.`,
    keywords: [
      'Oil Level Indicator',
      'Industrial Machinery',
      'Rajkot Distributor',
      'Satyam Enterprise',
      'Sanjay Patel'
    ],
    ogImage: '/Pawan0.png',
    twitterCard: 'summary_large_image',
  },

  // Products page
  '/products': {
    title: 'Products | Satyam Enterprise',
    description:
      'Explore our range of industrial products including Air Compressors, Service Pumps, Electric Blowers, and more.',
    keywords: [
      'Industrial Products',
      'Machinery Catalog',
      'Air Compressor',
      'Water Pump',
      'Electric Motor'
    ],
    ogImage: '/Pawan0.png',
    twitterCard: 'summary_large_image',
  },
};

// Helper function to get metadata for a specific page
export function getPageMetadata(pathname: string): PageMeta {
  return pageMetadata[pathname] || pageMetadata['/'];
}

// Helper function to generate complete metadata object for Next.js
export function generateMetadata(pathname: string) {
  const pageMeta = getPageMetadata(pathname);

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageMeta.title,
    description: pageMeta.description,
    keywords: pageMeta.keywords?.join(', '),
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    openGraph: {
      type: 'website',
      url: `${siteConfig.url}${pathname === '/' ? '' : pathname}`,
      title: pageMeta.title,
      description: pageMeta.description,
      siteName: siteConfig.title,
      images: [
        {
          url: pageMeta.ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: pageMeta.title,
        },
      ],
    },
    twitter: {
      card: pageMeta.twitterCard || 'summary_large_image',
      title: pageMeta.title,
      description: pageMeta.description,
      images: [pageMeta.ogImage || siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${siteConfig.url}${pathname === '/' ? '' : pathname}`,
    },
  };
}
