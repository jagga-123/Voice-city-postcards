import type { ThemeName } from '@/types/postcard';
import type { BadgeCorner } from '@/lib/stampBadge';

export interface SamplePostcard {
  id: string;
  name: string;
  title: string;
  message: string;
  location: string;
  theme: ThemeName;
  /** Local, self-hosted photo. */
  image: string;
  badge: { src: string; label: string; corner: BadgeCorner; rotate: number };
}

// Designed examples shown while a visitor's own gallery is empty and in the
// landing page showcase. They are illustrations, never saved to the collection.
export const SAMPLE_POSTCARDS: SamplePostcard[] = [
  {
    id: 'sunset-beach',
    name: 'Sunset Beach',
    title: 'Sunset Beach',
    message: 'Golden hour never ends in Vice City.',
    location: 'Ocean Beach',
    theme: 'Sunset',
    image: '/locations/ocean-beach.jpg',
    badge: { src: '/badges/beach-badge.svg', label: 'Beach Badge', corner: 'top-right', rotate: 6 },
  },
  {
    id: 'ocean-drive',
    name: 'Ocean Drive',
    title: 'Ocean Drive',
    message: 'Cruising past the neon deco at midnight.',
    location: 'Ocean Drive',
    theme: 'Retro',
    image: '/hero-bg.jpg',
    badge: { src: '/badges/vice-city-stamp.svg', label: 'Vice City Stamp', corner: 'top-right', rotate: -8 },
  },
  {
    id: 'neon-nights',
    name: 'Neon Nights',
    title: 'Neon Nights',
    message: 'The city never sleeps, and neither do we.',
    location: 'Neon District',
    theme: 'Neon',
    image: '/locations/neon-district.jpg',
    badge: { src: '/badges/neon-badge.svg', label: 'Neon Badge', corner: 'top-right', rotate: -3 },
  },
  {
    id: 'luxury-escape',
    name: 'Luxury Escape',
    title: 'Luxury Escape',
    message: 'Private villas. Endless ocean views.',
    location: 'Starfish Island',
    theme: 'Luxury',
    image: '/locations/starfish-island.jpg',
    badge: { src: '/badges/luxury-badge.svg', label: 'Luxury Badge', corner: 'top-right', rotate: 4 },
  },
  {
    id: 'downtown-adventure',
    name: 'Downtown Adventure',
    title: 'Downtown Adventure',
    message: 'Skyline views from the top floor.',
    location: 'Downtown Vice',
    theme: 'Tropical',
    image: '/locations/downtown-vice.jpg',
    badge: { src: '/badges/tourist-badge.svg', label: 'Tourist Badge', corner: 'top-right', rotate: -5 },
  },
];
