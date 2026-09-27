'use client';

import { SavedPostcard } from '@/types/collection';
import { motion } from 'framer-motion';
import { Calendar, MapPin, SearchX } from 'lucide-react';

interface PostcardGridProps {
  postcards: SavedPostcard[];
}

export function PostcardGrid({ postcards }: PostcardGridProps) {
  // The gallery page shows the sample postcards when the collection is truly empty,
  // so an empty list here only ever means "nothing matches the search".
  if (postcards.length === 0) {
    return (
      <div className="w-full py-24 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-slate-900 border border-white/5 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
          <SearchX className="h-10 w-10 text-slate-400" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">No matching postcards</h3>
        <p className="text-slate-300">Try a different search term.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {postcards.map((postcard, index) => {
        const date = new Date(postcard.createdAt).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        });

        return (
          <motion.li
            key={postcard.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(index, 8) * 0.08 }}
            className="group relative bg-slate-900 border border-white/10 rounded-2xl overflow-hidden hover:shadow-[0_0_40px_rgba(236,72,153,0.15)] transition-all duration-300"
          >
            {/* Image */}
            <div className="aspect-[3/2] w-full relative overflow-hidden bg-slate-800">
              {/* Saved postcards are data URLs from localStorage, which next/image cannot optimise. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={postcard.imageUrl}
                alt={`Postcard: ${postcard.title}`}
                width={900}
                height={600}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" aria-hidden="true" />
            </div>

            {/* Content */}
            <div className="p-6 relative z-10 -mt-12">
              <h3 className="text-xl font-bold text-white mb-4 line-clamp-1 group-hover:text-pink-400 transition-colors">
                {postcard.title}
              </h3>

              <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-widest border-t border-white/10 pt-4">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                  <span className="truncate max-w-[100px]">{postcard.locationId.replace('-', ' ')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-purple-300" aria-hidden="true" />
                  <span>{date}</span>
                </div>
              </div>
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
}
