export interface PostcardBadge {
  id: string;
  name: string;
  description: string;
  /** Self-contained SVG served from /public/badges. */
  src: string;
  /** Badge width as a fraction of the postcard width. */
  scale: number;
  /** Rotation in degrees when stamped. */
  rotate: number;
}

export const BADGES: PostcardBadge[] = [
  {
    id: 'stamp',
    name: 'Vice City Stamp',
    description: 'The official Vice City postmark',
    src: '/badges/vice-city-stamp.svg',
    scale: 0.2,
    rotate: -8,
  },
  {
    id: 'neon',
    name: 'Neon Badge',
    description: 'A glowing neon sign',
    src: '/badges/neon-badge.svg',
    scale: 0.3,
    rotate: -3,
  },
  {
    id: 'beach',
    name: 'Beach Badge',
    description: 'Sun, waves and palms',
    src: '/badges/beach-badge.svg',
    scale: 0.2,
    rotate: 6,
  },
  {
    id: 'tourist',
    name: 'Tourist Badge',
    description: 'An all-access tourist pass',
    src: '/badges/tourist-badge.svg',
    scale: 0.27,
    rotate: -5,
  },
  {
    id: 'luxury',
    name: 'Luxury Badge',
    description: 'A golden VIP seal',
    src: '/badges/luxury-badge.svg',
    scale: 0.2,
    rotate: 4,
  },
];
