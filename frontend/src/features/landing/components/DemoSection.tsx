'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Download, MapPin, Pause, Play, SlidersHorizontal, Wand2 } from 'lucide-react';
import { DEMO_CHAPTERS, DEMO_MEDIA } from '@/constants/demo';

const CHAPTER_ICONS = [MapPin, Wand2, SlidersHorizontal, Download];
const TECH = ['Next.js 16', 'React 19', 'Unlayer React Image Editor', 'Zustand', 'Framer Motion', 'Tailwind CSS 4'];

export function DemoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  // Autoplays (muted, which browsers allow) only while on screen, and never for
  // visitors who asked their OS to reduce motion. A pause button is always available.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPausedRef.current) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    let index = 0;
    DEMO_CHAPTERS.forEach((chapter, i) => {
      if (video.currentTime >= chapter.start) index = i;
    });
    setActive(index);
    setProgress(video.duration ? video.currentTime / video.duration : 0);
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPausedRef.current = false;
      video.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      video.pause();
    }
  };

  const seekToChapter = (index: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = DEMO_CHAPTERS[index].start;
    userPausedRef.current = false;
    video.play().catch(() => {});
  };

  return (
    <section id="demo" aria-labelledby="demo-title" className="cv-auto relative scroll-mt-20 overflow-hidden bg-slate-900 py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-pink-600/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <motion.h2
            id="demo-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 text-4xl font-black tracking-tight text-white md:text-5xl"
          >
            See It In Action
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg text-slate-300 md:text-xl"
          >
            A real recording of the app: from picking a location to a shareable postcard in under a minute, with the Unlayer React Image Editor at the center.
          </motion.p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Player inside a browser frame */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_60px_rgba(236,72,153,0.15)]"
          >
            <div className="flex items-center gap-3 border-b border-white/10 bg-slate-900 px-4 py-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <i className="h-3 w-3 rounded-full bg-red-400" />
                <i className="h-3 w-3 rounded-full bg-amber-300" />
                <i className="h-3 w-3 rounded-full bg-emerald-400" />
              </span>
              <span className="flex-1 truncate rounded-md bg-slate-950 px-3 py-1 text-center text-xs text-slate-300">
                voice-city-postcards.vercel.app
              </span>
            </div>

            <div className="relative aspect-video bg-slate-950">
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="metadata"
                poster={DEMO_MEDIA.poster}
                aria-label="Screen recording of the app: choose a location, open the editor, add filters and badges, then export to the gallery"
                className="h-full w-full object-cover"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
              >
                <source src={DEMO_MEDIA.webm} type="video/webm" />
                <source src={DEMO_MEDIA.mp4} type="video/mp4" />
              </video>

              <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-slate-950/90 to-transparent px-4 pb-4 pt-10">
                <button
                  type="button"
                  onClick={togglePlayback}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/25"
                >
                  {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
                  {playing ? 'Pause demo' : 'Play demo'}
                </button>
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/20" aria-hidden="true">
                  <div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-cyan-400" style={{ width: `${progress * 100}%` }} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chapters: click to jump */}
          <motion.ol
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid gap-3"
            aria-label="Demo chapters"
          >
            {DEMO_CHAPTERS.map((chapter, i) => {
              const Icon = CHAPTER_ICONS[i] ?? Wand2;
              const isActive = i === active;
              return (
                <li key={chapter.id}>
                  <button
                    type="button"
                    onClick={() => seekToChapter(i)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition ${
                      isActive
                        ? 'border-pink-500/60 bg-pink-500/10 shadow-[0_0_30px_rgba(236,72,153,0.2)]'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        isActive ? 'bg-gradient-to-br from-pink-500 to-purple-500 text-white' : 'bg-slate-950 text-slate-300'
                      }`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-base font-bold text-white">
                        <span className="mr-2 text-sm text-slate-400">{i + 1}.</span>
                        {chapter.label}
                      </span>
                      <span className="mt-1 block text-sm text-slate-300">{chapter.description}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </motion.ol>
        </div>

        <div className="mt-14 flex flex-col items-center gap-6">
          <ul className="flex flex-wrap justify-center gap-2" aria-label="Built with">
            {TECH.map((tech) => (
              <li
                key={tech}
                className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${
                  tech.startsWith('Unlayer')
                    ? 'border-pink-400/50 bg-pink-500/15 text-pink-200'
                    : 'border-white/15 bg-white/5 text-slate-300'
                }`}
              >
                {tech}
              </li>
            ))}
          </ul>
          <Link
            href="/explore"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-4 text-lg font-bold text-white shadow-[0_0_24px_rgba(6,182,212,0.4)] transition hover:from-cyan-500 hover:to-blue-500"
          >
            Try it yourself
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
