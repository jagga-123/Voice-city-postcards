'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X, MapPin, Star, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'next/navigation';

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function LocationModal() {
  const { selectedLocation, isLocationModalOpen, setLocationModalOpen } = useAppStore();
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Dialog behaviour: focus moves in, Tab stays inside, Escape closes, page behind can't scroll,
  // and focus returns to the card that opened it.
  useEffect(() => {
    if (!isLocationModalOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLocationModalOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isLocationModalOpen, setLocationModalOpen]);

  if (!isLocationModalOpen || !selectedLocation) return null;

  const handleCreatePostcard = () => {
    setLocationModalOpen(false);
    router.push('/postcard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
      {/* Backdrop */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setLocationModalOpen(false)}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="location-modal-title"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(236,72,153,0.15)] flex flex-col md:flex-row overflow-hidden"
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => setLocationModalOpen(false)}
          aria-label="Close location details"
          className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-pink-600 rounded-full text-white backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto md:min-h-[26rem] relative bg-slate-800">
          <Image
            src={selectedLocation.image}
            alt={`${selectedLocation.name}, ${selectedLocation.category}`}
            fill
            sizes="(min-width: 768px) 448px, 92vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent z-0" aria-hidden="true" />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-widest text-cyan-300 border border-cyan-400/30 rounded-full bg-cyan-400/10 w-fit">
            {selectedLocation.category}
          </div>

          <h2 id="location-modal-title" className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {selectedLocation.name}
          </h2>

          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            {selectedLocation.description}
          </p>

          <div className="mb-10">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-pink-400" aria-hidden="true" />
              Location Highlights
            </h3>
            <ul className="space-y-3">
              {selectedLocation.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-200">
                  <Star className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={handleCreatePostcard}
            className="group relative inline-flex items-center justify-center w-full px-8 py-4 bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600 text-white font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" aria-hidden="true" />
            <span className="flex items-center gap-2">
              Create Postcard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
