'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, PlayCircle, Sparkles } from 'lucide-react';

/** Text entrance runs as a CSS animation from first paint, so it never waits for JS hydration (better LCP). */
const fadeUp = (delay: number) => ({ animationDelay: `${delay}s` });

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image & Overlays */}
      <Image
        src="/hero-bg.jpg"
        alt=""
        fill
        priority
        quality={70}
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950" aria-hidden="true" />

      {/* Animated gradient orbs — CSS keyframes, so they don't wait on Framer Motion hydration */}
      <div
        aria-hidden="true"
        className="animate-glow-a absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-pink-600/30 rounded-full blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="animate-glow-b absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div
          style={fadeUp(0)}
          className="animate-fade-up inline-block mb-6 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 backdrop-blur-md"
        >
          <span className="text-pink-300 text-sm font-bold tracking-widest uppercase">Welcome to the Neon Dream</span>
        </div>

        <h1
          id="hero-title"
          style={fadeUp(0.08)}
          className="animate-fade-up text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1]"
        >
          <span className="text-white block">Create Your</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-400 filter drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">
            Vice City Adventure
          </span>
        </h1>

        <p
          style={fadeUp(0.16)}
          className="animate-fade-up text-lg md:text-2xl text-slate-300 max-w-3xl mb-12 font-medium leading-relaxed"
        >
          Explore iconic locations, design custom postcards, and create memories from your dream GTA-inspired world.
        </p>

        <div style={fadeUp(0.24)} className="animate-fade-up flex flex-col sm:flex-row items-center gap-5">
          <Link href="/explore" className="relative group">
            <span className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200" aria-hidden="true"></span>
            <span className="relative inline-flex items-center gap-2 w-full sm:w-auto px-8 py-4 bg-slate-950 border border-white/10 rounded-lg text-white font-bold text-lg tracking-widest uppercase group-hover:bg-slate-900 transition-colors">
              Start Adventure
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-lg border border-white/20 bg-white/5 text-white font-bold text-lg backdrop-blur-sm hover:bg-white/10 transition-colors"
          >
            <PlayCircle className="h-5 w-5 text-cyan-300" aria-hidden="true" />
            See It In Action
          </a>
        </div>

        <p
          style={fadeUp(0.32)}
          className="animate-fade-up mt-10 flex items-center gap-2 text-sm text-slate-300"
        >
          <Sparkles className="h-4 w-4 text-pink-400" aria-hidden="true" />
          Built with the Unlayer React Image Editor
        </p>
      </div>
    </section>
  );
}
