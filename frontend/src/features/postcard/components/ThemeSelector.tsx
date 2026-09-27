'use client';

import { useAppStore } from '@/store/useAppStore';
import { POSTCARD_THEMES } from '@/constants/themes';
import { ThemeName } from '@/types/postcard';

export function ThemeSelector() {
  const { selectedTheme, setSelectedTheme } = useAppStore();
  const themeNames = Object.keys(POSTCARD_THEMES) as ThemeName[];

  return (
    <section aria-labelledby="theme-title" className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      <h2 id="theme-title" className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Postcard Theme</h2>
      <div role="group" aria-labelledby="theme-title" className="flex flex-wrap gap-3">
        {themeNames.map((theme) => {
          const isActive = selectedTheme === theme;
          return (
            <button
              key={theme}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelectedTheme(theme)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                isActive 
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                  : 'bg-slate-950 text-slate-300 border border-white/10 hover:border-pink-500/50 hover:text-white'
              }`}
            >
              {theme}
            </button>
          );
        })}
      </div>
    </section>
  );
}
