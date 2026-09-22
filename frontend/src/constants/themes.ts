import { PostcardTheme } from '@/types/postcard';

export const POSTCARD_THEMES: Record<string, PostcardTheme> = {
  Sunset: {
    name: 'Sunset',
    containerBg: 'bg-orange-100',
    gradientOverlay: 'from-orange-500/40 via-pink-500/20 to-purple-500/40',
    textColor: 'text-orange-950',
    accentColor: 'text-orange-600',
    borderColor: 'border-orange-300',
    fontFamily: 'font-sans', // Could use custom fonts if imported
  },
  Neon: {
    name: 'Neon',
    containerBg: 'bg-slate-950',
    gradientOverlay: 'from-cyan-500/30 via-transparent to-pink-500/30',
    textColor: 'text-white',
    accentColor: 'text-pink-400',
    borderColor: 'border-cyan-400',
    fontFamily: 'font-mono',
  },
  Retro: {
    name: 'Retro',
    containerBg: 'bg-yellow-50',
    gradientOverlay: 'from-yellow-500/20 via-transparent to-orange-500/20',
    textColor: 'text-amber-900',
    accentColor: 'text-red-500',
    borderColor: 'border-amber-700 border-dashed',
    fontFamily: 'font-serif',
  },
  Luxury: {
    name: 'Luxury',
    containerBg: 'bg-zinc-900',
    gradientOverlay: 'from-yellow-600/20 via-black/40 to-yellow-600/20',
    textColor: 'text-zinc-100',
    accentColor: 'text-yellow-500',
    borderColor: 'border-yellow-600 border-double',
    fontFamily: 'font-serif',
  },
  Tropical: {
    name: 'Tropical',
    containerBg: 'bg-teal-50',
    gradientOverlay: 'from-emerald-500/20 via-transparent to-cyan-500/20',
    textColor: 'text-teal-900',
    accentColor: 'text-emerald-600',
    borderColor: 'border-emerald-300',
    fontFamily: 'font-sans',
  }
};
