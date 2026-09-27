'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Award, Undo2 } from 'lucide-react';
import { BADGES, type PostcardBadge } from '@/constants/badges';
import type { BadgeCorner } from '@/lib/stampBadge';

interface BadgePackProps {
  onStamp: (badge: PostcardBadge, corner: BadgeCorner) => Promise<void>;
  onUndo: () => Promise<void>;
  canUndo: boolean;
  busy: boolean;
}

const CORNERS: { id: BadgeCorner; label: string }[] = [
  { id: 'top-left', label: 'top left' },
  { id: 'top-right', label: 'top right' },
  { id: 'bottom-left', label: 'bottom left' },
  { id: 'bottom-right', label: 'bottom right' },
];

export function BadgePack({ onStamp, onUndo, canUndo, busy }: BadgePackProps) {
  const [corner, setCorner] = useState<BadgeCorner>('top-right');
  const [status, setStatus] = useState('');

  const handleStamp = async (badge: PostcardBadge) => {
    try {
      await onStamp(badge, corner);
      setStatus(`${badge.name} added to the ${corner.replace('-', ' ')} corner.`);
    } catch {
      setStatus('Could not add that badge. Please try again.');
    }
  };

  const handleUndo = async () => {
    await onUndo();
    setStatus('Last badge removed.');
  };

  return (
    <section
      aria-labelledby="badge-pack-title"
      className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-5"
    >
      <div className="flex items-center gap-2 mb-2">
        <Award className="w-4 h-4 text-pink-400" aria-hidden="true" />
        <h2 id="badge-pack-title" className="text-sm font-bold text-slate-300 uppercase tracking-widest">
          Vice City Badge Pack
        </h2>
      </div>
      <p className="text-xs text-slate-400 mb-4">
        Stamp a custom badge onto your postcard. Finish your text edits first — badges are added to the image.
      </p>

      <ul className="grid grid-cols-3 gap-2 mb-4">
        {BADGES.map((badge) => (
          <li key={badge.id}>
            <button
              type="button"
              onClick={() => handleStamp(badge)}
              disabled={busy}
              aria-label={`Add ${badge.name}: ${badge.description}`}
              title={badge.description}
              className="group w-full flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-slate-950 p-2 transition hover:border-pink-500/60 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative block h-14 w-full">
                <Image
                  src={badge.src}
                  alt=""
                  fill
                  unoptimized
                  sizes="96px"
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </span>
              <span className="text-[11px] font-semibold leading-tight text-slate-300 text-center">
                {badge.name}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-end justify-between gap-4">
        <fieldset>
          <legend className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Placement</legend>
          <div className="grid grid-cols-2 gap-1 w-16">
            {CORNERS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCorner(c.id)}
                aria-pressed={corner === c.id}
                aria-label={`Place badge in the ${c.label} corner`}
                className={`h-6 rounded-md border transition ${
                  corner === c.id
                    ? 'border-pink-400 bg-pink-500/30'
                    : 'border-white/15 bg-slate-950 hover:border-white/40'
                }`}
              />
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          onClick={handleUndo}
          disabled={!canUndo || busy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs font-bold text-slate-300 transition hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Undo2 className="w-3.5 h-3.5" aria-hidden="true" />
          Undo badge
        </button>
      </div>

      <p role="status" aria-live="polite" className="mt-3 min-h-4 text-xs text-emerald-300">
        {status}
      </p>
    </section>
  );
}
