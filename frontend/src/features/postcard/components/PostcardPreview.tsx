'use client';

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
      >
        {/* Background gradient overlay for theme */}
        <div className={`absolute inset-0 bg-gradient-to-br ${themeConfig.gradientOverlay} z-0`} />
        
        {/* Decorative Grid or pattern (for premium feel) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay z-0" />

        <div className="relative z-10 p-6 sm:p-10 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className={`text-3xl sm:text-5xl font-black uppercase tracking-widest ${themeConfig.textColor} drop-shadow-md`}>
              {postcardTitle || 'Greetings from Vice City'}
            </h1>
          </div>

          {/* Body: Image and Message */}
          <div className="flex flex-col sm:flex-row gap-6 flex-grow">
            {/* Image Block */}
            <div className="w-full sm:w-1/2 relative rounded-md overflow-hidden border-4 border-white/20 shadow-lg transform rotate-[-2deg]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={selectedLocation.image} 
                alt={selectedLocation.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-white text-xs font-bold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-pink-400" />
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
                {/* Stamp space placeholder */}
                <div className="absolute top-4 right-4 w-12 h-14 border-2 border-slate-300 flex items-center justify-center opacity-50">
                  <span className="text-[10px] text-slate-400 font-sans">STAMP</span>
                </div>
                {/* Address lines placeholder */}
                <div className="mt-8 space-y-4 pr-16">
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
