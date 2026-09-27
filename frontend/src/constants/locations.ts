import { Location } from '@/types/location';

export const LOCATIONS: Location[] = [
  {
    id: 'ocean-beach',
    name: 'Ocean Beach',
    category: 'Beach',
    description: 'Relax on the most beautiful coastline in Vice City with its pristine white sands and pastel art deco buildings.',
    image: '/locations/ocean-beach.jpg',
    highlights: ['White sand beaches', 'Art Deco Architecture', 'Rollerbladers and sunbathers', 'Sunset views']
  },
  {
    id: 'vice-marina',
    name: 'Vice Marina',
    category: 'Marina',
    description: 'Luxury yachts, sunsets, and waterfront adventures await at the most exclusive docking spot in the city.',
    image: '/locations/vice-marina.jpg',
    highlights: ['Mega-yachts', 'Exclusive waterfront dining', 'Speedboat tours', 'Neon reflections on water']
  },
  {
    id: 'neon-district',
    name: 'Neon District',
    category: 'Nightlife',
    description: 'Bright lights, music, and endless entertainment. The heart of Vice City\'s underground culture.',
    image: '/locations/neon-district.jpg',
    highlights: ['Cyberpunk aesthetic', 'Pulsing nightclubs', 'Street racing scene', 'Neon signage']
  },
  {
    id: 'palm-island',
    name: 'Palm Island',
    category: 'Island',
    description: 'Escape to a tropical paradise surrounded by crystal waters and exclusive celebrity mansions.',
    image: '/locations/palm-island.jpg',
    highlights: ['Private estates', 'Lush palm trees', 'Golf courses', 'Infinity pools']
  },
  {
    id: 'downtown-vice',
    name: 'Downtown Vice',
    category: 'City Center',
    description: 'Skyscrapers, business districts, and urban energy driving the economy of the sun-drenched metropolis.',
    image: '/locations/downtown-vice.jpg',
    highlights: ['Towering skyscrapers', 'Corporate headquarters', 'Helipads', 'Busy elevated trains']
  },
  {
    id: 'starfish-island',
    name: 'Starfish Island',
    category: 'Island',
    description: 'The most exclusive neighborhood in Vice City, featuring sprawling estates and ultimate privacy.',
    image: '/locations/starfish-island.jpg',
    highlights: ['Gated communities', 'Oceanfront villas', 'Exotic sports cars', 'Ultimate luxury']
  }
];

export const CATEGORIES = ['All', 'Beach', 'Marina', 'Nightlife', 'Island', 'City Center'];
