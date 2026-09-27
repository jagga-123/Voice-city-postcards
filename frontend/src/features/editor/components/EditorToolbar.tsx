'use client';

import { Undo2, Redo2, ZoomIn, ZoomOut, RefreshCcw } from 'lucide-react';

interface EditorToolbarProps {
  onAction: (action: string) => void;
}

export function EditorToolbar({ onAction }: EditorToolbarProps) {
  const tools = [
    { id: 'undo', icon: Undo2, label: 'Undo' },
    { id: 'redo', icon: Redo2, label: 'Redo' },
    { id: 'zoomIn', icon: ZoomIn, label: 'Zoom in' },
    { id: 'zoomOut', icon: ZoomOut, label: 'Zoom out' },
    { id: 'reset', icon: RefreshCcw, label: 'Reset to the original postcard' },
  ];

  return (
    <div
      role="toolbar"
      aria-label="Editor controls"
      className="bg-slate-900/80 backdrop-blur-md border border-white/10 p-2 rounded-xl flex items-center justify-center gap-2 shadow-lg"
    >
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.id}
            type="button"
            onClick={() => onAction(tool.id)}
            title={tool.label}
            aria-label={tool.label}
            className="p-3 bg-slate-950 text-slate-400 hover:text-pink-400 hover:bg-white/5 border border-white/5 rounded-lg transition-colors flex items-center justify-center"
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
