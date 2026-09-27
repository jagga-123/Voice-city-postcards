'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SAMPLE_POSTCARDS } from '@/constants/samples';
import { SamplePostcardCard } from './SamplePostcardCard';

/** Shown instead of an empty grid so a first-time visitor's gallery never feels empty. */
export function SamplePostcards() {
  return (
    <section aria-labelledby="samples-title">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-pink-300">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Your collection starts here
        </div>
        <h2 id="samples-title" className="mb-3 text-3xl font-black tracking-tight text-white md:text-4xl">
          No postcards yet — here&apos;s what you can create
        </h2>
        <p className="mb-8 text-slate-300">
          These five samples show the Vice City look. Every postcard you export is saved to this gallery automatically.
        </p>
        <Link
          href="/explore"
          className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 px-8 py-4 font-bold text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] transition hover:from-pink-500 hover:to-purple-500"
        >
          Create your first postcard
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>

      <ul className="flex flex-wrap justify-center gap-8">
        {SAMPLE_POSTCARDS.map((sample, index) => (
          <motion.li
            key={sample.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
            className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)]"
          >
            <SamplePostcardCard
              sample={sample}
              sizes="(min-width: 1024px) 380px, (min-width: 768px) 46vw, 92vw"
              priority={index < 2}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
