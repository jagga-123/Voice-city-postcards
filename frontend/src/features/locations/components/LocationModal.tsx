'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Star, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'next/navigation';

export function LocationModal() {
  const { selectedLocation, isLocationModalOpen, setLocationModalOpen } = useAppStore();
  const router = useRouter();

  if (!isLocationModalOpen || !selectedLocation) return null;

  const handleCreatePostcard = () => {
    setLocationModalOpen(false);
    router.push('/postcard');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLocationModalOpen(false)}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(236,72,153,0.15)] flex flex-col md:flex-row overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => setLocationModalOpen(false)}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-pink-500/80 rounded-full text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Section */}
          <div className="w-full md:w-1/2 h-64 md:h-auto relative">
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent z-0" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={selectedLocation.image} 
              alt={selectedLocation.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10">
            <div className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-widest text-cyan-400 border border-cyan-400/30 rounded-full bg-cyan-400/10 w-fit">
              {selectedLocation.category}
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
              {selectedLocation.name}
            </h2>
            
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              {selectedLocation.description}
            </p>

            <div className="mb-10">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-500" />
                Location Highlights
              </h3>
              <ul className="space-y-3">
                {selectedLocation.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-200">
                    <Star className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleCreatePostcard}
              className="group relative inline-flex items-center justify-center w-full px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="flex items-center gap-2">
                Create Postcard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
