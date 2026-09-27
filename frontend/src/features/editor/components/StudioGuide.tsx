'use client';

import { Sparkles, MousePointerClick } from 'lucide-react';

export function StudioGuide() {
  return (
    <section
      aria-labelledby="studio-guide-title"
      className="w-full bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col gap-5"
    >
      <h2 id="studio-guide-title" className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-white/10 pb-4">
        Studio Guide
      </h2>

      <div className="flex items-start gap-3 p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl">
        <Sparkles className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <h3 className="text-sm font-bold text-white mb-1">Your text is already placed</h3>
          <p className="text-xs text-slate-300">
            Your title and message are on the postcard, styled for your theme. Use the Text tool to change them or add more.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
        <MousePointerClick className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <h3 className="text-sm font-bold text-white mb-1">Stickers &amp; Tools</h3>
          <p className="text-xs text-slate-300">
            Use the toolbar on the right edge of the canvas to add stickers, draw, apply retro filters, crop and resize.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-white/10 pb-3 mb-3">
          Pro Tips
        </h3>
        <ul className="text-xs text-slate-300 space-y-2.5 list-disc pl-4">
          <li>Try the <strong className="text-pink-300">Filter</strong> tool for that authentic Vice City neon glow.</li>
          <li>Add a <strong className="text-amber-300">badge</strong> last — badges are stamped onto the image.</li>
          <li>Hit <strong className="text-emerald-300">Save Draft</strong> any time. Your work is kept in this browser.</li>
        </ul>
      </div>
    </section>
  );
}
