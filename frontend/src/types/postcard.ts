export type ThemeName = 'Sunset' | 'Neon' | 'Retro' | 'Luxury' | 'Tropical';

export interface PostcardTheme {
  name: ThemeName;
  containerBg: string;
  gradientOverlay: string;
  textColor: string;
  accentColor: string;
  borderColor: string;
  fontFamily: string;
}
