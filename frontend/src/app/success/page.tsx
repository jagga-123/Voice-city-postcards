'use client';

import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { SharePanel } from '@/features/share/components/SharePanel';
import { Download, ArrowRight, Image as ImageIcon } from 'lucide-react';

export default function SuccessPage() {
  const { exportedPostcard, selectedLocation, selectedTheme } = useAppStore();
  const router = useRouter();
  // Computed during the initial client render (not in an effect) so the
  // first paint already has real dimensions for the confetti burst.
  const [windowDimensions] = useState(() =>
    typeof window !== 'undefined'
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: 0, height: 0 }
  );

  useEffect(() => {
    if (!exportedPostcard) {
      router.push('/explore');
    }
  }, [exportedPostcard, router]);

  if (!exportedPostcard) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = exportedPostcard;
    link.download = `vice-city-${selectedLocation?.id || 'postcard'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20 relative overflow-hidden flex flex-col items-center">
      {/* Confetti Celebration */}
      <Confetti
        width={windowDimensions.width}
        height={windowDimensions.height}
        recycle={false}
        numberOfPieces={500}
        colors={['#ec4899', '#06b6d4', '#f59e0b', '#8b5cf6']}
        gravity={0.15}
      />

      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-pink-500/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl w-full mx-auto px-4 z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest text-emerald-400 border border-emerald-400/30 rounded-full bg-emerald-400/10">
            Export Successful
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
            Your Vice City Postcard is Ready!
          </h1>
          <p className="text-slate-400 text-lg">
            Beautifully crafted in {selectedLocation?.name} using the {selectedTheme} theme.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Postcard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
            className="w-full relative"
          >
            <div className="p-2 bg-white/5 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(236,72,153,0.2)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={exportedPostcard} 
                alt="Generated Postcard" 
                className="w-full h-auto rounded-xl shadow-inner"
              />
            </div>
          </motion.div>

          {/* Action Center */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Download Center</h3>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleDownload}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download High Resolution PNG
                </button>
                <div className="flex justify-between text-xs font-medium text-slate-500 px-2">
                  <span>Quality: Production Ready</span>
                  <span>Size: ~1.2 MB</span>
                </div>
              </div>
            </div>

            <SharePanel />

            <button
              onClick={() => router.push('/gallery')}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 border border-white/10 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 group"
            >
              <ImageIcon className="w-5 h-5 text-pink-400" />
              View My Collection
              <ArrowRight className="w-5 h-5 text-slate-500 group-hover:translate-x-1 transition-transform" />
            </button>

          </motion.div>

        </div>
      </div>
    </div>
  );
}
