'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { POSTCARD_THEMES } from '@/constants/themes';
import { MapPin } from 'lucide-react';

export function PostcardPreview() {
  const { selectedLocation, postcardTitle, postcardMessage, selectedTheme } = useAppStore();

  if (!selectedLocation) return null;

  const themeConfig = POSTCARD_THEMES[selectedTheme];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center perspective-[1000px]">
      <motion.div
        initial={{ opacity: 0, rotateY: -10, scale: 0.95 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
        className={`w-full max-w-2xl aspect-[3/2] relative rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${themeConfig.containerBg} ${themeConfig.borderColor} border-4 sm:border-8 ${themeConfig.fontFamily}`}
        role="group"
        aria-label="Live postcard preview"
      >
        {/* Background gradient overlay for theme */}
        <div className={`absolute inset-0 bg-gradient-to-br ${themeConfig.gradientOverlay} z-0`} aria-hidden="true" />

        {/* Decorative dot pattern (for premium feel) */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] bg-[length:14px_14px] opacity-10 mix-blend-overlay z-0" aria-hidden="true" />

        <div className="relative z-10 p-6 sm:p-10 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-6">
            <p className={`text-3xl sm:text-5xl font-black uppercase tracking-widest ${themeConfig.textColor} drop-shadow-md`}>
              {postcardTitle || 'Greetings from Vice City'}
            </p>
          </div>

          {/* Body: Image and Message */}
          <div className="flex flex-col sm:flex-row gap-6 flex-grow">
            {/* Image Block */}
            <div className="w-full sm:w-1/2 relative min-h-[180px] rounded-md overflow-hidden border-4 border-white/20 shadow-lg transform rotate-[-2deg]">
              <Image
                src={selectedLocation.image}
                alt={selectedLocation.name}
                fill
                sizes="(min-width: 640px) 330px, 90vw"
                className="object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-white text-xs font-bold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-pink-400" aria-hidden="true" />
                {selectedLocation.name}
              </div>
            </div>

            {/* Message Block */}
            <div className="w-full sm:w-1/2 flex flex-col justify-center">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-md shadow-inner transform rotate-[1deg] h-full">
                <div className="border-b-2 border-slate-300 pb-2 mb-2">
                  <p className="text-slate-800 text-sm sm:text-base whitespace-pre-wrap leading-relaxed font-medium">
                    {postcardMessage || 'Wish you were here.'}
                  </p>
                </div>
                {/* The official Vice City stamp (also available in the editor's Badge Pack) */}
                <Image
                  src="/badges/vice-city-stamp.svg"
                  alt=""
                  width={56}
                  height={56}
                  unoptimized
                  aria-hidden="true"
                  className="absolute top-3 right-3 h-14 w-14 rotate-6 opacity-95 drop-shadow-md"
                />
                {/* Address lines placeholder */}
                <div className="mt-8 space-y-4 pr-16" aria-hidden="true">
                  <div className="h-0.5 w-full bg-slate-300"></div>
                  <div className="h-0.5 w-full bg-slate-300"></div>
                  <div className="h-0.5 w-full bg-slate-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
