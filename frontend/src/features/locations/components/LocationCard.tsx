'use client';

import Image from 'next/image';
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
    <motion.article
      style={{ animationDelay: `${Math.min(index, 5) * 0.08}s` }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="animate-enter group relative flex flex-col bg-slate-900 border border-white/10 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-all duration-300"
      onClick={() => {
        setSelectedLocation(location);
        setLocationModalOpen(true);
      }}
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-800">
        <Image
          src={location.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 46vw, 92vw"
          priority={index < 3}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" aria-hidden="true" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-full">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
            {location.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow relative z-10 -mt-6 bg-slate-900">
        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
          {location.name}
        </h2>
        <p className="text-slate-300 text-sm mb-6 flex-grow line-clamp-2">
          {location.description}
        </p>

        <button
          type="button"
          aria-label={`Explore Location: ${location.name}`}
          className="w-full py-3 bg-white/5 hover:bg-pink-500/20 text-white font-bold rounded-lg border border-white/10 hover:border-pink-500/50 transition-all duration-300"
        >
          Explore Location
        </button>
      </div>

      {/* Glow on hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-500/30 rounded-2xl pointer-events-none transition-colors duration-300" aria-hidden="true" />
    </motion.article>
  );
}
