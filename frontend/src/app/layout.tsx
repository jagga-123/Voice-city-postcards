import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/lib/query-provider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vice City Postcards | Build Your GTA Adventure',
  description: 'An immersive AAA-inspired web experience. Explore iconic locations and create customizable retro postcards using a powerful React Image Editor.',
  keywords: ['Vice City', 'GTA VI', 'Postcards', 'React Image Editor', 'Next.js 15', 'Hackathon'],
  authors: [{ name: 'Hackathon Team' }],
  openGraph: {
    title: 'Vice City Postcards | Build Your GTA Adventure',
    description: 'Explore neon-drenched locations, generate custom postcards, and dive into a full-fledged image editing studio.',
    url: 'https://vice-city-postcards.vercel.app',
    siteName: 'Vice City Postcards',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Vice City Postcards Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vice City Postcards | Build Your GTA Adventure',
    description: 'Explore neon-drenched locations, generate custom postcards, and dive into a full-fledged image editing studio.',
    images: ['https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1200&auto=format&fit=crop'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-50 min-h-screen flex flex-col`}>
        <QueryProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
