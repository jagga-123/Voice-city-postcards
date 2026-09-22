import { Location } from '@/types/location';

export const LOCATIONS: Location[] = [
  {
    id: 'ocean-beach',
    name: 'Ocean Beach',
    category: 'Beach',
    description: 'Relax on the most beautiful coastline in Vice City with its pristine white sands and pastel art deco buildings.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    highlights: ['White sand beaches', 'Art Deco Architecture', 'Rollerbladers and sunbathers', 'Sunset views']
  },
  {
    id: 'vice-marina',
    name: 'Vice Marina',
    category: 'Marina',
    description: 'Luxury yachts, sunsets, and waterfront adventures await at the most exclusive docking spot in the city.',
    image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?q=80&w=800&auto=format&fit=crop',
    highlights: ['Mega-yachts', 'Exclusive waterfront dining', 'Speedboat tours', 'Neon reflections on water']
  },
  {
    id: 'neon-district',
    name: 'Neon District',
    category: 'Nightlife',
    description: 'Bright lights, music, and endless entertainment. The heart of Vice City\'s underground culture.',
    image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop',
    highlights: ['Cyberpunk aesthetic', 'Pulsing nightclubs', 'Street racing scene', 'Neon signage']
  },
  {
    id: 'palm-island',
    name: 'Palm Island',
    category: 'Island',
    description: 'Escape to a tropical paradise surrounded by crystal waters and exclusive celebrity mansions.',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=800&auto=format&fit=crop',
    highlights: ['Private estates', 'Lush palm trees', 'Golf courses', 'Infinity pools']
  },
  {
    id: 'downtown-vice',
    name: 'Downtown Vice',
    category: 'City Center',
    description: 'Skyscrapers, business districts, and urban energy driving the economy of the sun-drenched metropolis.',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop',
    highlights: ['Towering skyscrapers', 'Corporate headquarters', 'Helipads', 'Busy elevated trains']
  },
  {
    id: 'starfish-island',
    name: 'Starfish Island',
    category: 'Island',
    description: 'The most exclusive neighborhood in Vice City, featuring sprawling estates and ultimate privacy.',
    image: 'https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=800&auto=format&fit=crop',
    highlights: ['Gated communities', 'Oceanfront villas', 'Exotic sports cars', 'Ultimate luxury']
  }
];

export const CATEGORIES = ['All', 'Beach', 'Marina', 'Nightlife', 'Island', 'City Center'];
