'use client';

import Image from 'next/image';
import { useAppStore } from '@/store/useAppStore';
import { Palette, MapPin, AlignLeft } from 'lucide-react';

export function EditorSidebar() {
  const { postcardTitle, postcardMessage, selectedTheme, selectedLocation } = useAppStore();

  return (
    <section
      aria-labelledby="postcard-details-title"
      className="w-full bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col gap-6"
    >
      <h2 id="postcard-details-title" className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-white/10 pb-4">
        Postcard Details
      </h2>

      {/* Location Details */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-cyan-400">
          <MapPin className="w-4 h-4" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider">Destination</span>
        </div>
        <p className="text-white font-medium">{selectedLocation?.name || 'Not Selected'}</p>
        <div className="relative mt-2 w-full h-24 rounded-lg overflow-hidden border border-white/10 bg-slate-800">
          {selectedLocation && (
            <Image
              src={selectedLocation.image}
              alt={`${selectedLocation.name} preview`}
              fill
              sizes="288px"
              className="object-cover"
            />
          )}
        </div>
      </div>

      {/* Theme */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-pink-400">
          <Palette className="w-4 h-4" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider">Theme</span>
        </div>
        <div className="px-4 py-2 bg-slate-950 border border-white/5 rounded-lg inline-block">
          <p className="text-white font-medium text-sm">{selectedTheme}</p>
        </div>
      </div>

      {/* Content Specs */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-purple-300">
          <AlignLeft className="w-4 h-4" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider">Content</span>
        </div>
        <div className="space-y-4 p-4 bg-slate-950 border border-white/5 rounded-lg">
          <div>
            <p className="text-xs text-slate-400 mb-1">Title Length</p>
            <p className="text-white text-sm">{postcardTitle.length} / 40</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Message Length</p>
            <p className="text-white text-sm">{postcardMessage.length} / 150</p>
          </div>
        </div>
      </div>

    </section>
  );
}
