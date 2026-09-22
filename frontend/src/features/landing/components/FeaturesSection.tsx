'use client';

import { motion } from 'framer-motion';
import { Compass, Wand2, Share } from 'lucide-react';

const features = [
  {
    icon: Compass,
    title: 'Explore Locations',
    description: 'Discover beaches, marinas, nightlife, and hidden gems across Vice City.',
    color: 'from-cyan-400 to-blue-500'
  },
  {
    icon: Wand2,
    title: 'Customize Postcards',
    description: 'Personalize postcards using text, stickers, drawings, and effects.',
    color: 'from-pink-500 to-fuchsia-500'
  },
  {
    icon: Share,
    title: 'Download & Share',
    description: 'Save your creations and share your neon-drenched adventures with the world.',
    color: 'from-orange-400 to-red-500'
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6"
          >
            Endless Possibilities
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Everything you need to craft the perfect digital souvenir.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="relative group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-10 mb-6 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
