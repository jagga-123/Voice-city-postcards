'use client';

import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import Link from 'next/link';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900 border border-white/10 p-12 rounded-3xl max-w-md w-full shadow-[0_0_40px_rgba(236,72,153,0.15)] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-cyan-500/10 pointer-events-none" />
        <div className="inline-block p-5 rounded-full bg-slate-950 border border-white/5 shadow-xl mb-6 relative z-10">
          <Compass className="w-12 h-12 text-pink-500" />
        </div>
        <h2 className="text-3xl font-black text-white mb-4 relative z-10">Select a Location</h2>
        <p className="text-slate-400 mb-8 relative z-10">
          Please choose a destination first from our explorer to start generating your custom postcard.
        </p>
        <Link 
          href="/explore"
          className="inline-block w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:scale-105 relative z-10"
        >
          Back to Explore
        </Link>
      </motion.div>
    </div>
  );
}
