'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Choose a destination',
    description: 'Pick an iconic location from our map.'
  },
  {
    number: '02',
    title: 'Generate a postcard',
    description: 'Select your preferred visual aesthetic.'
  },
  {
    number: '03',
    title: 'Customize with editor',
    description: 'Add text, stickers, and retro effects.'
  },
  {
    number: '04',
    title: 'Download & share',
    description: 'Export and share your masterpiece.'
  }
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-900 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6"
          >
            How It Works
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500/20 via-cyan-500/50 to-pink-500/20 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-slate-950 border-2 border-pink-500 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                  <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
