'use client';

import { Download, Save } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

interface ExportPanelProps {
  onExport: () => void;
  onSaveDraft: () => void;
}

export function ExportPanel({ onExport, onSaveDraft }: ExportPanelProps) {
  const { exportedPostcard } = useAppStore();

  return (
    <div className="w-full bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
      <div className="flex flex-col gap-4">
        <button
          onClick={onExport}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Export Postcard (PNG)
        </button>

        <button
          onClick={onSaveDraft}
          className="w-full py-3 bg-slate-950 hover:bg-slate-800 border border-white/10 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Draft
        </button>

        {exportedPostcard && (
          <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
            <p className="text-emerald-400 text-sm font-bold text-center">Export Successful!</p>
            <p className="text-slate-400 text-xs text-center mt-1">Image saved to store.</p>
          </div>
        )}
      </div>
    </div>
  );
}
