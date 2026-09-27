'use client';

import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { SharePanel } from '@/features/share/components/SharePanel';
import { Download, ArrowRight, Image as ImageIcon, PlusCircle, AlertTriangle, Trophy, Check } from 'lucide-react';
import { dataUrlBytes, formatBytes } from '@/lib/imageUtils';

const drawCircle = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.7, ease: 'easeInOut' as const } },
};
const drawCheck = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.45, delay: 0.55, ease: 'easeOut' as const } },
};

export default function SuccessPage() {
  const { exportedPostcard, exportMeta, selectedLocation, selectedTheme, resetPostcardFlow } = useAppStore();
  const router = useRouter();
  const [downloaded, setDownloaded] = useState(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
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

  // Real pixel size of the exported image, for the download details
  useEffect(() => {
    if (!exportedPostcard) return;
    const img = new window.Image();
    img.onload = () => setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    img.src = exportedPostcard;
  }, [exportedPostcard]);

  const fileSize = useMemo(() => (exportedPostcard ? formatBytes(dataUrlBytes(exportedPostcard)) : ''), [exportedPostcard]);

  if (!exportedPostcard) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = exportedPostcard;
    link.download = `vice-city-${selectedLocation?.id || 'postcard'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
  };

  const handleCreateAnother = () => {
    resetPostcardFlow();
    router.push('/explore');
  };

  const unlocked = exportMeta?.unlocked ?? [];

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
        aria-hidden="true"
      />

      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-pink-500/10 blur-[150px] rounded-full pointer-events-none" aria-hidden="true" />

      <div className="max-w-4xl w-full mx-auto px-4 z-10">

        <div className="flex flex-col items-center text-center mb-10">
          {/* Animated success mark */}
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center" aria-hidden="true">
            {[0, 0.5].map((delay) => (
              <motion.span
                key={delay}
                className="absolute inset-0 rounded-full border-2 border-emerald-400/60"
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: 1.9, opacity: 0 }}
                transition={{ duration: 1.6, delay: 0.6 + delay, repeat: 1, ease: 'easeOut' }}
              />
            ))}
            <motion.div
              className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/10 shadow-[0_0_40px_rgba(52,211,153,0.35)]"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.5, duration: 0.7 }}
            >
              <motion.svg viewBox="0 0 52 52" className="h-14 w-14" initial="hidden" animate="visible">
                <motion.circle cx="26" cy="26" r="23" fill="none" stroke="#34d399" strokeWidth="3" variants={drawCircle} />
                <motion.path d="M15 27 l8 8 l14 -16" fill="none" stroke="#34d399" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" variants={drawCheck} />
              </motion.svg>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest text-emerald-300 border border-emerald-400/30 rounded-full bg-emerald-400/10"
          >
            Export Successful
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4"
          >
            Your Vice City Postcard is Ready!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="text-slate-300 text-lg"
          >
            Beautifully crafted in {selectedLocation?.name} using the {selectedTheme} theme.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Postcard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -6, y: 40 }}
            animate={{ opacity: 1, scale: 1, rotate: -1.5, y: 0 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            transition={{ type: 'spring', bounce: 0.35, delay: 0.35 }}
            className="w-full relative"
          >
            <div className="p-2 bg-white/5 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(236,72,153,0.25)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={exportedPostcard}
                alt={`Your exported postcard from ${selectedLocation?.name ?? 'Vice City'}`}
                className="w-full h-auto rounded-xl shadow-inner"
              />
            </div>
          </motion.div>

          {/* Action Center */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Download Center</h2>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  {downloaded ? <Check className="w-5 h-5" aria-hidden="true" /> : <Download className="w-5 h-5" aria-hidden="true" />}
                  {downloaded ? 'Download Again' : 'Download PNG'}
                </button>
                <p className="flex justify-between text-xs font-medium text-slate-300 px-2">
                  <span>{dimensions ? `${dimensions.width} × ${dimensions.height} px` : 'PNG image'}</span>
                  <span>{fileSize}</span>
                </p>

                {exportMeta && (
                  <p
                    role="status"
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${
                      exportMeta.savedToGallery
                        ? 'bg-emerald-400/10 text-emerald-300'
                        : 'bg-amber-400/10 text-amber-300'
                    }`}
                  >
                    {exportMeta.savedToGallery ? (
                      <>
                        <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                        Saved to your gallery.
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
                        Couldn&apos;t save to your gallery (browser storage is full). Download your postcard now.
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>

            {unlocked.length > 0 && (
              <motion.div
                role="status"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, type: 'spring', bounce: 0.4 }}
                className="rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-400/10 to-pink-500/10 p-5"
              >
                <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-amber-300">
                  <Trophy className="h-4 w-4" aria-hidden="true" />
                  {unlocked.length > 1 ? 'New badges unlocked' : 'New badge unlocked'}
                </h2>
                <ul className="space-y-2">
                  {unlocked.map((achievement) => (
                    <li key={achievement.id} className="flex items-center gap-3">
                      <span className="text-3xl" role="img" aria-label={achievement.name}>{achievement.icon}</span>
                      <span>
                        <span className="block text-sm font-bold text-white">{achievement.name}</span>
                        <span className="block text-xs text-slate-300">{achievement.description}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            <SharePanel />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/gallery"
                className="py-4 bg-slate-900 hover:bg-slate-800 border border-white/10 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 group"
              >
                <ImageIcon className="w-5 h-5 text-pink-400" aria-hidden="true" />
                Open Gallery
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={handleCreateAnother}
                className="py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.35)] transition-all flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-5 h-5" aria-hidden="true" />
                Create Another Postcard
              </button>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}
