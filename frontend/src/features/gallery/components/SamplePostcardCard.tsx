'use client';

import Image from 'next/image';
import { MapPin } from 'lucide-react';
import type { SamplePostcard } from '@/constants/samples';
import { POSTCARD_THEMES } from '@/constants/themes';
import { CANVAS_THEMES } from '@/lib/composePostcard';
import { hexToRgba } from '@/lib/imageUtils';

interface SamplePostcardCardProps {
  sample: SamplePostcard;
  sizes: string;
  priority?: boolean;
}

const BADGE_POSITION: Record<SamplePostcard['badge']['corner'], string> = {
  'top-left': 'left-[4%] top-[6%]',
  'top-right': 'right-[4%] top-[6%]',
  'bottom-left': 'left-[4%] bottom-[6%]',
  'bottom-right': 'right-[4%] bottom-[6%]',
};

/** A designed example postcard: photo, theme-styled text and a badge from the Badge Pack. */
export function SamplePostcardCard({ sample, sizes, priority = false }: SamplePostcardCardProps) {
  const canvasTheme = CANVAS_THEMES[sample.theme];
  const themeClasses = POSTCARD_THEMES[sample.theme];
  // Neon badges are wider than the round ones
  const badgeWidth = sample.badge.src.includes('neon') || sample.badge.src.includes('tourist') ? 'w-[30%]' : 'w-[21%]';

  return (
    <figure className="group">
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-white/10 bg-slate-800 shadow-lg transition-shadow duration-300 group-hover:shadow-[0_0_40px_rgba(236,72,153,0.25)]">
        <Image
          src={sample.image}
          alt={`Sample postcard "${sample.title}" from ${sample.location}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${hexToRgba(canvasTheme.scrim, 0.9)} 0%, ${hexToRgba(canvasTheme.scrim, 0.4)} 38%, transparent 64%)`,
          }}
        />

        <span className="absolute left-[4%] top-[6%] inline-flex items-center gap-1.5 rounded-full bg-slate-950/70 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm sm:text-xs">
          <MapPin className="h-3 w-3" style={{ color: canvasTheme.accent }} aria-hidden="true" />
          {sample.location}
        </span>

        {/* Decorative: the same badge art users can stamp in the editor */}
        <Image
          src={sample.badge.src}
          alt=""
          width={220}
          height={220}
          unoptimized
          aria-hidden="true"
          className={`absolute h-auto ${badgeWidth} ${BADGE_POSITION[sample.badge.corner]} drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110`}
          style={{ transform: `rotate(${sample.badge.rotate}deg)` }}
        />

        <div className={`absolute inset-x-[4%] bottom-[7%] max-w-[64%] ${themeClasses.fontFamily}`}>
          <span className="mb-2 block h-1 w-10 rounded-full" style={{ backgroundColor: canvasTheme.accent }} aria-hidden="true" />
          <p
            className="text-base font-extrabold uppercase leading-tight tracking-wider sm:text-xl"
            style={{ color: canvasTheme.text, textShadow: canvasTheme.glow ? `0 0 14px ${canvasTheme.glow}` : '0 2px 6px rgba(0,0,0,0.55)' }}
          >
            {sample.title}
          </p>
          <p className="mt-1 text-[11px] leading-snug sm:text-sm" style={{ color: canvasTheme.subText }}>
            {sample.message}
          </p>
        </div>

        <span className="absolute bottom-[6%] right-[4%] rounded-md bg-slate-950/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-200 backdrop-blur-sm">
          Sample
        </span>
      </div>
      <figcaption className="mt-3 flex items-center justify-between gap-3 text-sm">
        <span className="font-bold text-white">{sample.name}</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">{sample.theme} theme</span>
      </figcaption>
    </figure>
  );
}
