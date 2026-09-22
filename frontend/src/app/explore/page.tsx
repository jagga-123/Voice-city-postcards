'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { LOCATIONS, CATEGORIES } from '@/constants/locations';
import { LocationCard } from '@/features/locations/components/LocationCard';
import { LocationModal } from '@/features/locations/components/LocationModal';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredLocations = LOCATIONS.filter((location) => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          location.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || location.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 pb-24">
      {/* Header Section */}
      <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50 border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-400 mb-6"
          >
            Explore Vice City
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto"
          >
            Find the perfect backdrop for your next postcard. From sun-drenched beaches to neon-lit streets, the city is yours.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          
          {/* Search */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all backdrop-blur-sm"
            />
          </div>

          {/* Categories */}
          <div className="flex overflow-x-auto w-full md:w-auto gap-2 pb-2 md:pb-0 hide-scrollbar">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeCategory === category 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                    : 'bg-slate-900 text-slate-400 border border-white/10 hover:bg-white/5 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filteredLocations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLocations.map((location, index) => (
              <LocationCard key={location.id} location={location} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="inline-block p-6 rounded-full bg-slate-900 border border-white/10 mb-6">
              <Search className="h-12 w-12 text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No locations found</h3>
            <p className="text-slate-400">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>

      {/* Render the modal */}
      <LocationModal />
    </div>
  );
}
