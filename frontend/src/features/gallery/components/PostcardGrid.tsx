'use client';

import { SavedPostcard } from '@/types/collection';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';

interface PostcardGridProps {
  postcards: SavedPostcard[];
}

export function PostcardGrid({ postcards }: PostcardGridProps) {
  if (postcards.length === 0) {
    return (
      <div className="w-full py-24 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-slate-900 border border-white/5 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
          <span className="text-4xl opacity-50">🖼️</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">No postcards yet</h3>
        <p className="text-slate-400">Your collection is empty. Start exploring to create one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {postcards.map((postcard, index) => {
        const date = new Date(postcard.createdAt).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        });

        return (
          <motion.div
            key={postcard.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-slate-900 border border-white/10 rounded-2xl overflow-hidden hover:shadow-[0_0_40px_rgba(236,72,153,0.15)] transition-all duration-300"
          >
            {/* Image */}
            <div className="aspect-[3/2] w-full relative overflow-hidden bg-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={postcard.imageUrl} 
                alt={postcard.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
            </div>

            {/* Content */}
            <div className="p-6 relative z-10 -mt-12">
              <h3 className="text-xl font-bold text-white mb-4 line-clamp-1 group-hover:text-pink-400 transition-colors">
                {postcard.title}
              </h3>
              
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest border-t border-white/10 pt-4">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="truncate max-w-[100px]">{postcard.locationId.replace('-', ' ')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span>{date}</span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
