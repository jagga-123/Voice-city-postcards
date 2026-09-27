'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SAMPLE_POSTCARDS } from '@/constants/samples';
import { SamplePostcardCard } from '@/features/gallery/components/SamplePostcardCard';

export function GallerySection() {
  return (
    <section aria-labelledby="gallery-preview-title" className="cv-auto py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            id="gallery-preview-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6"
          >
            Gallery Preview
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Sample postcards to get you inspired. Yours will be saved to your own gallery.
          </motion.p>
        </div>

        <ul className="flex flex-wrap justify-center gap-8">
          {SAMPLE_POSTCARDS.map((sample, index) => (
            <motion.li
              key={sample.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)]"
            >
              <SamplePostcardCard
                sample={sample}
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 92vw"
              />
            </motion.li>
          ))}
        </ul>

        <div className="mt-14 text-center">
          <Link
            href="/explore"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10"
          >
            Create yours
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
