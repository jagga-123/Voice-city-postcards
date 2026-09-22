'use client';

import { Undo2, Redo2, ZoomIn, ZoomOut, RefreshCcw } from 'lucide-react';

interface EditorToolbarProps {
  onAction: (action: string) => void;
}

export function EditorToolbar({ onAction }: EditorToolbarProps) {
  const tools = [
    { id: 'undo', icon: Undo2, label: 'Undo' },
    { id: 'redo', icon: Redo2, label: 'Redo' },
    { id: 'zoomIn', icon: ZoomIn, label: 'Zoom In' },
    { id: 'zoomOut', icon: ZoomOut, label: 'Zoom Out' },
    { id: 'reset', icon: RefreshCcw, label: 'Reset' },
  ];

  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 p-2 rounded-xl flex items-center justify-center gap-2 shadow-lg">
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.id}
            onClick={() => onAction(tool.id)}
            title={tool.label}
            className="p-3 bg-slate-950 text-slate-400 hover:text-pink-400 hover:bg-white/5 border border-white/5 rounded-lg transition-colors flex items-center justify-center"
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}
    </div>
  );
}
