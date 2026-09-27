'use client';

import { useEffect, useMemo, useState, type RefObject } from 'react';
import { useAppStore } from '@/store/useAppStore';
// Dynamic import is used for the editor to prevent SSR issues with canvas/window
import dynamic from 'next/dynamic';
import type { ImageEditorInstance, ImageEditorRef } from '@unlayer/react-image-editor';
import { composePostcardImage } from '@/lib/composePostcard';

const ImageEditor = dynamic(() => import('@unlayer/react-image-editor'), { ssr: false });

// Falls back to the SDK's mock/demo project ID when no real one is configured.
const UNLAYER_PROJECT_ID = Number(process.env.NEXT_PUBLIC_UNLAYER_PROJECT_ID) || 1234;

interface EditorCanvasProps {
  editorRef: RefObject<ImageEditorRef | null>;
  onLoadDraft: (editor: ImageEditorInstance) => void;
  /** Receives the composed starting image so "Reset" can return to it. */
  onBaseImageReady: (image: string) => void;
  /** The editor's own Save button — treated as "finish and export". */
  onSave: (dataUrl: string) => void;
  /** The editor's own Cancel button. */
  onCancel: () => void;
}

export function EditorCanvas({ editorRef, onLoadDraft, onBaseImageReady, onSave, onCancel }: EditorCanvasProps) {
  const { selectedLocation, postcardTitle, postcardMessage, selectedTheme } = useAppStore();
  const [baseImage, setBaseImage] = useState<string | null>(null);

  // Place the user's title + message on the photo (theme-styled) before the
  // editor opens, so the postcard starts out complete and fully editable on top.
  useEffect(() => {
    if (!selectedLocation) return;
    let cancelled = false;
    composePostcardImage({
      imageUrl: selectedLocation.image,
      title: postcardTitle,
      message: postcardMessage,
      theme: selectedTheme,
      locationName: selectedLocation.name,
    })
      .catch(() => selectedLocation.image)
      .then((image) => {
        if (cancelled) return;
        onBaseImageReady(image);
        setBaseImage(image);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedLocation, postcardTitle, postcardMessage, selectedTheme, onBaseImageReady]);

  const editorConfig = useMemo(
    () => ({
      projectId: UNLAYER_PROJECT_ID, // Real ID via env when set, otherwise the mock ID
      features: {
        // The AI assistant becomes available automatically when the project ID has that entitlement.
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
      // The SDK only accepts the 'dark' | 'light' literal — matches the app's
      // dark, neon-on-slate aesthetic used everywhere else in the Studio.
      theme: 'dark' as const,
    }),
    []
  );

  if (!selectedLocation || !baseImage) {
    return (
      <div
        role="status"
        className="w-full h-[640px] lg:h-[720px] flex items-center justify-center bg-slate-900 border border-white/10 rounded-2xl"
      >
        <p className="text-pink-400 animate-pulse font-bold">Composing your postcard…</p>
      </div>
    );
  }

  return (
    <div
      data-editor-canvas
      role="region"
      aria-label="Postcard image editor"
      className="w-full h-[640px] lg:h-[720px] flex flex-col bg-slate-950 border-2 border-white/10 rounded-2xl overflow-hidden relative shadow-[0_0_50px_rgba(236,72,153,0.1)]"
    >
      {/* Fallback while loading chunk */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 bg-slate-900">
        <p className="text-pink-400 animate-pulse font-bold">Initializing Vice Studio...</p>
      </div>

      {/* Editor Component */}
      <ImageEditor
        ref={editorRef}
        onLoad={onLoadDraft}
        onSave={(result) => onSave(result.dataUrl)}
        onCancel={onCancel}
        image={baseImage}
        minHeight={640}
        options={editorConfig}
      />
    </div>
  );
}
