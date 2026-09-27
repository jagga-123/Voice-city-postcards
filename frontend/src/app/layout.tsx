import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/lib/query-provider';
import MotionProvider from '@/lib/motion-provider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

// Resolves social-share URLs. Set NEXT_PUBLIC_SITE_URL to override; on Vercel the
// production domain is picked up automatically.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://voice-city-postcards.vercel.app');

const TITLE = 'Vice City Postcards | Build Your GTA Adventure';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: 'An immersive AAA-inspired web experience. Explore iconic locations and create customizable retro postcards using a powerful React Image Editor.',
  keywords: ['Vice City', 'GTA VI', 'Postcards', 'React Image Editor', 'Next.js 16', 'Hackathon'],
  authors: [{ name: 'Hackathon Team' }],
  openGraph: {
    title: TITLE,
    description: 'Explore neon-drenched locations, generate custom postcards, and dive into a full-fledged image editing studio.',
    url: '/',
    siteName: 'Vice City Postcards',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vice City Postcards — a retro neon sunset over palm trees and a city skyline',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: 'Explore neon-drenched locations, generate custom postcards, and dive into a full-fledged image editing studio.',
    images: ['/og-image.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#020617',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-50 min-h-screen flex flex-col`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-bold focus:text-slate-950"
        >
          Skip to main content
        </a>
        <MotionProvider>
          <QueryProvider>
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </QueryProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
