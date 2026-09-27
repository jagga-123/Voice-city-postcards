'use client';

import { Download, Save, Loader2 } from 'lucide-react';

interface ExportPanelProps {
  onExport: () => void;
  onSaveDraft: () => void;
  busy: boolean;
  draftStatus: 'idle' | 'saved' | 'memory-only';
}

export function ExportPanel({ onExport, onSaveDraft, busy, draftStatus }: ExportPanelProps) {
  return (
    // Pinned to the bottom of the screen on phones so Export is always in reach.
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/95 p-3 backdrop-blur-md lg:static lg:z-auto lg:w-full lg:rounded-2xl lg:border lg:bg-slate-900/50 lg:p-6">
      <div className="flex flex-row gap-3 lg:flex-col lg:gap-4">
        <button
          type="button"
          onClick={onExport}
          disabled={busy}
          className="flex-1 py-3.5 lg:py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-wait text-white font-bold rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all flex items-center justify-center gap-2"
        >
          {busy ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <Download className="w-5 h-5" aria-hidden="true" />}
          {busy ? 'Working…' : 'Export Postcard (PNG)'}
        </button>

        <button
          type="button"
          onClick={onSaveDraft}
          disabled={busy}
          className="flex-1 py-3 bg-slate-950 hover:bg-slate-800 disabled:opacity-60 border border-white/10 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" aria-hidden="true" />
          Save Draft
        </button>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`mt-2 min-h-4 text-center text-xs font-medium ${draftStatus === 'memory-only' ? 'text-amber-300' : 'text-emerald-300'}`}
      >
        {draftStatus === 'saved' && 'Draft saved in this browser.'}
        {draftStatus === 'memory-only' && 'Draft kept for this session only — browser storage is full.'}
      </p>
    </div>
  );
}
