'use client';

import { useCollectionStore } from '@/store/useCollectionStore';
import { CollectionStats } from '@/features/stats/components/CollectionStats';
import { AchievementBadge } from '@/features/achievements/components/AchievementBadge';
import { PostcardGrid } from '@/features/gallery/components/PostcardGrid';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function GalleryPage() {
  const { savedPostcards, achievements } = useCollectionStore();
  const [search, setSearch] = useState('');

  const filteredPostcards = savedPostcards.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.message.toLowerCase().includes(search.toLowerCase()) ||
    p.locationId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-400 mb-4 tracking-tight">
            My Collection
          </h1>
          <p className="text-slate-400 text-lg">
            Your personal gallery of Vice City memories and achievements.
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="mb-12">
          <CollectionStats />
        </div>

        {/* Achievements Section */}
        {achievements.length > 0 && (
          <div className="mb-16">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">
              Unlocked Badges
            </h3>
            <div className="flex flex-wrap gap-6">
              {achievements.map((achievement, i) => (
                <AchievementBadge key={achievement.id} achievement={achievement} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Gallery Section */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Saved Postcards ({filteredPostcards.length})
            </h3>
            
            {/* Search */}
            <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Search collection..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all text-sm backdrop-blur-md"
              />
            </div>
          </div>

          <PostcardGrid postcards={filteredPostcards} />
        </div>

      </div>
    </div>
  );
}
