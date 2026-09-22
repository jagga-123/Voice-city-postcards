'use client';

import { useAppStore } from '@/store/useAppStore';
import { Palette, MapPin, AlignLeft } from 'lucide-react';

export function EditorSidebar() {
  const { postcardTitle, postcardMessage, selectedTheme, selectedLocation } = useAppStore();

  return (
    <div className="w-full h-full bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col gap-6 overflow-y-auto hide-scrollbar">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-white/10 pb-4">
        Postcard Details
      </h3>

      {/* Location Details */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-cyan-400">
          <MapPin className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Destination</span>
        </div>
        <p className="text-white font-medium">{selectedLocation?.name || 'Not Selected'}</p>
        <div className="mt-2 w-full h-24 rounded-lg overflow-hidden border border-white/10">
          {selectedLocation ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={selectedLocation.image} alt="Location" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-slate-800" />
          )}
        </div>
      </div>

      {/* Theme */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-pink-400">
          <Palette className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Theme</span>
        </div>
        <div className="px-4 py-2 bg-slate-950 border border-white/5 rounded-lg inline-block">
          <p className="text-white font-medium text-sm">{selectedTheme}</p>
        </div>
      </div>

      {/* Content Specs */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-purple-400">
          <AlignLeft className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Content</span>
        </div>
        <div className="space-y-4 p-4 bg-slate-950 border border-white/5 rounded-lg">
          <div>
            <p className="text-xs text-slate-500 mb-1">Title Length</p>
            <p className="text-white text-sm">{postcardTitle.length} / 40</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Message Length</p>
            <p className="text-white text-sm">{postcardMessage.length} / 150</p>
          </div>
        </div>
      </div>

    </div>
  );
}
