import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const serifFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ReWear — Give Your Clothes a Second Life | Clothing Upcycling Atelier',
  description:
    'Bespoke clothing repair, fit alterations, creative garment redesign, and upcycling services. Revitalize forgotten garments into heirloom pieces worth wearing again.',
  keywords: [
    'clothing upcycling',
    'garment repair',
    'denim restoration',
    'sustainable fashion',
    'sashiko mending',
    'creative alterations',
    'circular fashion atelier',
  ],
  authors: [{ name: 'ReWear Atelier Team' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://rewear-args.vercel.app'),
  openGraph: {
    title: 'ReWear — Give Your Clothes a Second Life',
    description:
      'Repair what you love. Reimagine what you don’t. Discover bespoke clothing repair, alterations, and creative upcycling.',
    type: 'website',
    locale: 'en_US',
    siteName: 'ReWear',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'ReWear Clothing Upcycling Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReWear — Give Your Clothes a Second Life',
    description:
      'Discover bespoke clothing repair, alteration, redesign, and upcycling services.',
    images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#173F35',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serifFont.variable} ${sansFont.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#F8F5EF] text-[#252824] font-sans antialiased flex flex-col selection:bg-[#C96F4A] selection:text-[#F8F5EF]">
        {children}
      </body>
    </html>
  );
}
