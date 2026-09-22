'use client';

import type { RefObject } from 'react';
import { useAppStore } from '@/store/useAppStore';
// Dynamic import is used for the editor to prevent SSR issues with canvas/window
import dynamic from 'next/dynamic';
import type { ImageEditorRef } from '@unlayer/react-image-editor';

const ImageEditor = dynamic(() => import('@unlayer/react-image-editor'), { ssr: false });

// Falls back to the SDK's mock/demo project ID when no real one is configured.
const UNLAYER_PROJECT_ID = Number(process.env.NEXT_PUBLIC_UNLAYER_PROJECT_ID) || 1234;

interface EditorCanvasProps {
  editorRef: RefObject<ImageEditorRef | null>;
  onLoadDraft: () => void;
}

export function EditorCanvas({ editorRef, onLoadDraft }: EditorCanvasProps) {
  const { selectedLocation, postcardTitle, postcardMessage } = useAppStore();

  const handleEditorLoad = () => {
    // Attempt to load draft first
    onLoadDraft();

    // In a real integration, this is where we would use the editorRef to programmatically
    // inject the postcardTitle, postcardMessage, and background image (selectedLocation.image).
    // Example (pseudo-code depending on exact unlayer API):
    // editorRef.current.addText({ text: postcardTitle, ... });
  };

  const editorConfig = {
    projectId: UNLAYER_PROJECT_ID, // Real ID via env when set, otherwise the mock ID that still enables the AI Assistant
    features: {
      ai: { enabled: true, assistant: true },
      imageEditor: {
        tools: {
          text: true,
          stickers: true,
          shapes: true,
          draw: true,
          crop: true,
          filter: true,
        }
      }
    },
    defaultPrompt: `Add a large heading at the top saying "${postcardTitle}" and a subheading at the bottom saying "${postcardMessage}"`,
    autoSubmitPrompt: true,
    // The SDK only accepts the 'dark' | 'light' literal — matches the app's
    // dark, neon-on-slate aesthetic used everywhere else in the Studio.
    theme: 'dark' as const,
  };

  if (!selectedLocation) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-slate-900 border border-white/10 rounded-2xl">
        <p className="text-slate-400">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[600px] bg-slate-950 border-2 border-white/10 rounded-2xl overflow-hidden relative shadow-[0_0_50px_rgba(236,72,153,0.1)]">
      {/* Fallback while loading chunk */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 bg-slate-900">
        <p className="text-pink-500 animate-pulse font-bold">Initializing Vice Studio...</p>
      </div>
      
      {/* Editor Component */}
      <ImageEditor
        ref={editorRef}
        onLoad={handleEditorLoad}
        image={selectedLocation.image}
        options={editorConfig}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
