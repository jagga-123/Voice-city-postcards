'use client';

import { motion } from 'framer-motion';
import { Location } from '@/types/location';
import { useAppStore } from '@/store/useAppStore';

interface LocationCardProps {
  location: Location;
  index: number;
}

export function LocationCard({ location, index }: LocationCardProps) {
  const { setSelectedLocation, setLocationModalOpen } = useAppStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative flex flex-col bg-slate-900 border border-white/10 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-all duration-300"
      onClick={() => {
        setSelectedLocation(location);
        setLocationModalOpen(true);
      }}
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={location.image} 
          alt={location.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-full">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            {location.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow relative z-10 -mt-6 bg-slate-900">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
          {location.name}
        </h3>
        <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-2">
          {location.description}
        </p>
        
        <button 
          className="w-full py-3 bg-white/5 hover:bg-pink-500/20 text-white font-bold rounded-lg border border-white/10 hover:border-pink-500/50 transition-all duration-300"
        >
          Explore Location
        </button>
      </div>
      
      {/* Glow on hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-500/30 rounded-2xl pointer-events-none transition-colors duration-300" />
    </motion.div>
  );
}
