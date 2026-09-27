import type { MetadataRoute } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://voice-city-postcards.vercel.app');

// Only the pages that make sense as entry points; /postcard, /editor and /success
// depend on in-progress state and redirect when opened directly.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/explore`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/gallery`, changeFrequency: 'monthly', priority: 0.5 },
  ];
}
