'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  Crop,
  Download,
  Link2,
  MapPin,
  Pencil,
  PlayCircle,
  Send,
  Share2,
  SlidersHorizontal,
  Smile,
  Type,
  Wand2,
} from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: '-80px' } as const;

/* ---------------------------------------------------------------- Step 1 */
function LocationVisual() {
  const cards = [
    { src: '/locations/ocean-beach.jpg', rotate: -11, x: -58 },
    { src: '/locations/downtown-vice.jpg', rotate: 11, x: 58 },
    { src: '/locations/neon-district.jpg', rotate: 0, x: 0 },
  ];
  return (
    <div className="relative mx-auto h-44 w-full max-w-[300px]" aria-hidden="true">
      {cards.map((card, i) => (
        <motion.div
          key={card.src}
          className="absolute left-1/2 top-4 -ml-14 h-36 w-28 overflow-hidden rounded-xl border-2 border-white/25 shadow-xl"
          style={{ zIndex: i === 2 ? 3 : 1 }}
          initial={{ x: 0, rotate: 0, opacity: 0 }}
          whileInView={{ x: card.x, rotate: card.rotate, opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ delay: 0.6 + i * 0.12, type: 'spring', bounce: 0.35 }}
        >
          <Image src={card.src} alt="" fill sizes="120px" className="object-cover" />
        </motion.div>
      ))}
      <motion.div
        className="absolute left-1/2 top-0 z-10 -ml-4"
        initial={{ y: -46, opacity: 0 }}
        whileInView={{ y: 42, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ delay: 1.15, type: 'spring', bounce: 0.6 }}
      >
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 shadow-[0_0_22px_rgba(236,72,153,0.95)]">
          <span className="absolute inset-0 animate-ping rounded-full bg-pink-500/60" />
          <MapPin className="relative h-4 w-4 text-white" />
        </span>
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------- Step 2 */
function EditorVisual() {
  const tools = [SlidersHorizontal, Crop, Pencil, Type, Smile];
  return (
    <div
      className="relative mx-auto h-44 w-full max-w-[300px] overflow-hidden rounded-xl border border-white/15 bg-slate-900 shadow-xl"
      aria-hidden="true"
    >
      <div className="absolute inset-y-0 left-0 right-10">
        <Image src="/locations/neon-district.jpg" alt="" fill sizes="260px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="mb-1.5 block h-1 w-8 rounded-full bg-cyan-300" />
          <motion.span
            className="block overflow-hidden whitespace-nowrap font-mono text-sm font-extrabold uppercase tracking-wider text-white drop-shadow-[0_0_10px_rgba(236,72,153,0.9)]"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={VIEWPORT}
            transition={{ delay: 0.9, duration: 1.3, ease: 'linear' }}
          >
            Neon Nights
          </motion.span>
        </div>
        <motion.div
          className="absolute right-2 top-2"
          initial={{ y: -80, rotate: -35, scale: 1.9, opacity: 0 }}
          whileInView={{ y: 0, rotate: -8, scale: 1, opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ delay: 1.7, type: 'spring', bounce: 0.45 }}
        >
          <Image src="/badges/vice-city-stamp.svg" alt="" width={64} height={64} unoptimized className="drop-shadow-[0_6px_8px_rgba(0,0,0,0.5)]" />
        </motion.div>
      </div>
      <div className="absolute inset-y-0 right-0 flex w-10 flex-col items-center justify-center gap-2 border-l border-white/10 bg-slate-950/90">
        {tools.map((Icon, i) => (
          <span
            key={i}
            className={`flex h-6 w-6 items-center justify-center rounded-md ${
              i === 4 ? 'bg-pink-500/30 text-pink-200 ring-1 ring-pink-400' : 'text-slate-300'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Step 3 */
function ShareVisual() {
  const actions = [Download, Link2, Share2];
  return (
    <div className="relative mx-auto h-44 w-full max-w-[300px]" aria-hidden="true">
      <motion.div
        className="absolute left-3 top-7 h-28 w-44 overflow-hidden rounded-lg border-4 border-white shadow-2xl"
        initial={{ rotate: 8, opacity: 0, y: 20 }}
        whileInView={{ rotate: -5, opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ delay: 0.7, type: 'spring', bounce: 0.35 }}
      >
        <Image src="/locations/ocean-beach.jpg" alt="" fill sizes="180px" className="object-cover" />
        <Image src="/badges/beach-badge.svg" alt="" width={44} height={44} unoptimized className="absolute right-1 top-1 rotate-6" />
      </motion.div>

      <div className="absolute right-3 top-6 flex flex-col gap-2.5">
        {actions.map((Icon, i) => (
          <motion.span
            key={i}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950 text-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.35)]"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ delay: 1.3 + i * 0.14, type: 'spring', bounce: 0.6 }}
          >
            <Icon className="h-4 w-4" />
          </motion.span>
        ))}
      </div>

      <motion.span
        className="absolute left-16 top-16 text-pink-300"
        animate={{ x: [0, 90, 190], y: [0, -26, -64], rotate: [0, -8, -18], opacity: [0, 1, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 2.2, repeatDelay: 1.2 }}
      >
        <Send className="h-5 w-5" />
      </motion.span>
    </div>
  );
}

const STEPS = [
  {
    icon: MapPin,
    title: 'Choose Location',
    description: 'Pick a beach, marina, neon strip or skyline. Every place is a ready-made postcard backdrop.',
    Visual: LocationVisual,
  },
  {
    icon: Wand2,
    title: 'Customize Postcard',
    description: 'Write your message, pick a theme, then make it yours in the image editor with filters, text, stickers and Vice City badges.',
    Visual: EditorVisual,
  },
  {
    icon: Send,
    title: 'Share Adventure',
    description: 'Export a crisp PNG, keep it in your gallery and share your neon-drenched memory with the world.',
    Visual: ShareVisual,
  },
];

export function StorySection() {
  return (
    <section id="story" aria-labelledby="story-title" className="cv-auto relative scroll-mt-20 overflow-hidden bg-slate-950 py-24 md:py-32">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-fuchsia-600/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[520px] rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-cyan-300"
          >
            Your adventure in three steps
          </motion.p>
          <motion.h2
            id="story-title"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-4xl font-black tracking-tight text-white md:text-6xl"
          >
            Create Your{' '}
            <span className="animate-gradient-pan bg-gradient-to-r from-pink-500 via-fuchsia-400 to-cyan-400 bg-[length:200%_auto] bg-clip-text text-transparent">
              Vice City Story
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-lg text-slate-300 md:text-xl"
          >
            From a sun-soaked beach to a neon-lit street, three steps turn any spot into a postcard worth sharing.
          </motion.p>
        </div>

        <ol className="relative mt-20 grid gap-4 lg:grid-cols-3 lg:gap-10">
          {/* Connector: draws across on scroll, with a light travelling along it (desktop) */}
          <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-10 hidden lg:block" aria-hidden="true">
            <motion.div
              className="h-[3px] origin-left rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-400 shadow-[0_0_18px_rgba(236,72,153,0.7)]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
            />
            <motion.span
              className="absolute -top-[5px] h-[13px] w-[13px] -ml-[6px] rounded-full bg-white shadow-[0_0_16px_6px_rgba(34,211,238,0.9)]"
              initial={{ left: '0%', opacity: 0 }}
              whileInView={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
              viewport={VIEWPORT}
              transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut', delay: 2 }}
            />
          </div>

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const Visual = step.Visual;
            return (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.25 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 mb-6">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-pink-500/70 bg-slate-950 shadow-[0_0_28px_rgba(236,72,153,0.55)]">
                    <Icon className="h-8 w-8 text-white" aria-hidden="true" />
                  </span>
                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-cyan-300 text-xs font-black text-slate-950">
                    <span className="sr-only">Step </span>
                    {i + 1}
                  </span>
                </div>

                <div className="w-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-pink-500/30 hover:shadow-[0_0_40px_rgba(236,72,153,0.15)]">
                  <Visual />
                  <h3 className="mt-6 text-2xl font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-slate-300">{step.description}</p>
                </div>

                {i < STEPS.length - 1 && (
                  <motion.span
                    className="mt-6 text-cyan-300 lg:hidden"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden="true"
                  >
                    <ArrowDown className="h-7 w-7" />
                  </motion.span>
                )}
              </motion.li>
            );
          })}
        </ol>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ delay: 0.3 }}
          className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/explore"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-[0_0_24px_rgba(236,72,153,0.45)] transition hover:from-pink-500 hover:to-purple-500"
          >
            Start Your Story
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-lg font-bold text-white transition hover:bg-white/10"
          >
            <PlayCircle className="h-5 w-5 text-cyan-300" aria-hidden="true" />
            Watch it in action
          </a>
        </motion.div>
      </div>
    </section>
  );
}
