'use client';

import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit3 } from 'lucide-react';
import { EmptyState } from '@/features/postcard/components/EmptyState';
import { PostcardPreview } from '@/features/postcard/components/PostcardPreview';
import { PostcardForm } from '@/features/postcard/components/PostcardForm';
import { ThemeSelector } from '@/features/postcard/components/ThemeSelector';
import { PostcardStats } from '@/features/postcard/components/PostcardStats';

export default function PostcardPage() {
  const { selectedLocation } = useAppStore();
  const router = useRouter();

  if (!selectedLocation) {
    return (
      <div className="min-h-screen bg-slate-950 pt-24 px-4 sm:px-6 lg:px-8">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-pink-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2"
            >
              Postcard Generator
            </motion.h1>
            <p className="text-slate-400">Personalize your memory of {selectedLocation.name}.</p>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <PostcardStats />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Editor Controls */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 space-y-6 flex flex-col"
          >
            <ThemeSelector />
            <PostcardForm />
            
            {/* CTA Section */}
            <div className="mt-auto space-y-4 pt-4">
              <button
                onClick={() => router.push('/editor')}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Edit3 className="w-5 h-5" />
                Customize with Image Editor
              </button>
              
              <button
                onClick={() => router.push('/explore')}
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Choose Another Location
              </button>
            </div>
          </motion.div>

          {/* Right Column: Live Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-8 bg-slate-900/30 border border-white/5 rounded-3xl p-4 sm:p-8 flex items-center justify-center relative overflow-hidden"
          >
            {/* Grid pattern background for preview area */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
            <PostcardPreview />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
