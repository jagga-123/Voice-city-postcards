'use client';

import { motion } from 'framer-motion';

const mockups = [
  {
    url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop',
    title: 'Neon Nights'
  },
  {
    url: 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?q=80&w=800&auto=format&fit=crop',
    title: 'Ocean Drive'
  },
  {
    url: 'https://images.unsplash.com/photo-1542359649-31e03cd4d909?q=80&w=800&auto=format&fit=crop',
    title: 'Downtown Cruising'
  },
  {
    url: 'https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=800&auto=format&fit=crop',
    title: 'Sunset Palms'
  }
];

export function GallerySection() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
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
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Get inspired by community creations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {mockups.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer"
            >
              {/* Image with Next.js Image component not strictly required for hackathon static un-configured domains, but good practice. Using regular img to avoid unconfigured host errors on Vercel unless added to next.config.ts */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={img.url} 
                alt={img.title}
                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white drop-shadow-md">{img.title}</h3>
              </div>

              {/* Glowing Border effect on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-500/50 rounded-xl transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
