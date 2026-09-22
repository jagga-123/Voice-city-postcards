'use client';

import { useCollectionStore } from '@/store/useCollectionStore';
import { Image as ImageIcon, MapPin, Palette, Award } from 'lucide-react';

export function CollectionStats() {
  const { stats, achievements } = useCollectionStore();

  const favoriteTheme = stats.themesUsed.length > 0 ? stats.themesUsed[stats.themesUsed.length - 1] : 'None';
  const favoriteLocation = stats.locationsExplored.length > 0 ? stats.locationsExplored[0] : 'None';

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col gap-2">
        <div className="p-3 bg-pink-500/10 rounded-xl w-fit">
          <ImageIcon className="w-6 h-6 text-pink-400" />
        </div>
        <h4 className="text-3xl font-black text-white">{stats.totalDesigns}</h4>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Designs</p>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col gap-2">
        <div className="p-3 bg-cyan-500/10 rounded-xl w-fit">
          <Palette className="w-6 h-6 text-cyan-400" />
        </div>
        <h4 className="text-xl font-bold text-white truncate">{favoriteTheme}</h4>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Favorite Theme</p>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col gap-2">
        <div className="p-3 bg-emerald-500/10 rounded-xl w-fit">
          <MapPin className="w-6 h-6 text-emerald-400" />
        </div>
        <h4 className="text-xl font-bold text-white truncate">{favoriteLocation.replace('-', ' ')}</h4>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Top Location</p>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col gap-2">
        <div className="p-3 bg-purple-500/10 rounded-xl w-fit">
          <Award className="w-6 h-6 text-purple-400" />
        </div>
        <h4 className="text-3xl font-black text-white">{achievements.length}</h4>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Badges Earned</p>
      </div>
    </div>
  );
}
