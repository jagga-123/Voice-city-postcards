'use client';

import { useAppStore } from '@/store/useAppStore';
import { MapPin, Palette, Type, CheckCircle } from 'lucide-react';

export function PostcardStats() {
  const { selectedLocation, selectedTheme, postcardMessage, postcardTitle } = useAppStore();

  const charCount = postcardMessage.length + postcardTitle.length;
  const isComplete = selectedLocation && postcardTitle && postcardMessage;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-center gap-4">
        <div className="p-3 bg-cyan-500/10 rounded-lg">
          <MapPin className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Location</p>
          <p className="text-sm font-bold text-white truncate max-w-[100px]">{selectedLocation?.name || 'None'}</p>
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-center gap-4">
        <div className="p-3 bg-pink-500/10 rounded-lg">
          <Palette className="w-5 h-5 text-pink-400" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Theme</p>
          <p className="text-sm font-bold text-white">{selectedTheme}</p>
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-center gap-4">
        <div className="p-3 bg-purple-500/10 rounded-lg">
          <Type className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Characters</p>
          <p className="text-sm font-bold text-white">{charCount} / 190</p>
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-center gap-4">
        <div className={`p-3 rounded-lg ${isComplete ? 'bg-emerald-500/10' : 'bg-orange-500/10'}`}>
          <CheckCircle className={`w-5 h-5 ${isComplete ? 'text-emerald-400' : 'text-orange-400'}`} />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Status</p>
          <p className="text-sm font-bold text-white">{isComplete ? 'Ready' : 'Draft'}</p>
        </div>
      </div>
    </div>
  );
}
