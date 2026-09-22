'use client';

import { Lightbulb, MousePointerClick } from 'lucide-react';

export function StudioGuide() {
  return (
    <div className="w-full h-full bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col gap-6 overflow-y-auto hide-scrollbar">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-white/10 pb-4">
        Studio Guide
      </h3>

      <div className="flex items-start gap-3 p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl">
        <Lightbulb className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-white mb-1">AI Assistant Enabled</h4>
          <p className="text-xs text-slate-400">
            Our AI has automatically placed your postcard text. You can drag, resize, or delete these layers using the native tools.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
        <MousePointerClick className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-white mb-1">Stickers & Tools</h4>
          <p className="text-xs text-slate-400">
            Use the powerful toolkit located on the left side of the canvas. You can add premium stickers, draw, apply retro filters, and crop your image.
          </p>
        </div>
      </div>

      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-white/10 pb-4 mt-2">
        Pro Tips
      </h3>
      <ul className="text-xs text-slate-400 space-y-3 list-disc pl-4">
        <li>Try the <strong className="text-pink-400">Filter</strong> tool to give your postcard that authentic Vice City neon glow.</li>
        <li>Hit <strong className="text-emerald-400">Save Draft</strong> periodically. Your work is saved to this browser.</li>
        <li>The <strong className="text-cyan-400">Stickers</strong> panel contains exclusive graphics to decorate your scene.</li>
      </ul>
    </div>
  );
}
