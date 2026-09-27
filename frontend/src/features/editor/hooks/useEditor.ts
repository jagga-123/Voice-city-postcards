import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useCollectionStore, isPostcardPersisted } from '@/store/useCollectionStore';
import { editorService } from '@/features/editor/services/editorService';
import { useRouter } from 'next/navigation';
import type { ImageEditorInstance, ImageEditorRef } from '@unlayer/react-image-editor';
import { compressDataUrl } from '@/lib/imageUtils';
import { stampBadge, type BadgeCorner } from '@/lib/stampBadge';
import type { PostcardBadge } from '@/constants/badges';

type BusyAction = 'export' | 'badge' | null;
type DraftStatus = 'idle' | 'saved' | 'memory-only';

const MAX_BADGE_UNDO = 8;

/** Clicks one of the Unlayer editor's own toolbar buttons (they are identified by their title). */
function clickEditorButton(title: string) {
  document.querySelector<HTMLButtonElement>(`[data-editor-canvas] button[title="${title}"]`)?.click();
}

export function useEditor() {
  const editorRef = useRef<ImageEditorRef | null>(null);
  const baseImageRef = useRef<string | null>(null);
  const badgeHistoryRef = useRef<string[]>([]);
  const draftTimerRef = useRef<number | null>(null);
  const [busy, setBusy] = useState<BusyAction>(null);
  const [badgeCount, setBadgeCount] = useState(0);
  const [draftStatus, setDraftStatus] = useState<DraftStatus>('idle');

  const { setExportedPostcard, setExportMeta, setEditorDraft, postcardTitle, postcardMessage, selectedTheme, selectedLocation } = useAppStore();
  const { savePostcard } = useCollectionStore();
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (draftTimerRef.current !== null) window.clearTimeout(draftTimerRef.current);
    };
  }, []);

  /** Shared by the "Export Postcard" button and the editor's own Save button. */
  const finishExport = async (dataUrl: string) => {
    if (!selectedLocation) return;
    setBusy('export');
    try {
      // The success page and PNG download use the full-quality image...
      setExportedPostcard(dataUrl);

      // ...while the collection keeps a compressed copy so localStorage never fills up.
      let stored = dataUrl;
      try {
        stored = await compressDataUrl(dataUrl, { maxWidth: 720, quality: 0.78 });
      } catch {
        // fall back to the original if compression is unavailable
      }
      const { id, unlocked } = savePostcard({
        title: postcardTitle,
        message: postcardMessage,
        locationId: selectedLocation.id,
        theme: selectedTheme,
        imageUrl: stored,
      });
      setExportMeta({ savedToGallery: isPostcardPersisted(id), unlocked });

      // The postcard is finished — drop its draft so it isn't restored next time.
      editorService.clearDraft();
      setEditorDraft(null);
      router.push('/success');
    } finally {
      setBusy(null);
    }
  };

  const exportPostcard = async () => {
    const editor = editorRef.current?.editor;
    if (!editor || busy) return;
    const dataUrl = editor.getImage();
    if (dataUrl) await finishExport(dataUrl);
  };

  const cancelEditing = () => router.push('/postcard');

  const saveDraft = async () => {
    const editor = editorRef.current?.editor;
    if (!editor || !selectedLocation) return;
    const dataUrl = editor.getImage();
    if (!dataUrl) return;

    let toStore = dataUrl;
    try {
      toStore = await compressDataUrl(dataUrl, { maxWidth: 1400, quality: 0.85 });
    } catch {
      // keep the original
    }
    setEditorDraft(toStore);
    const persisted = editorService.saveDraft(toStore, selectedLocation.id);
    setDraftStatus(persisted ? 'saved' : 'memory-only');
    if (draftTimerRef.current !== null) window.clearTimeout(draftTimerRef.current);
    draftTimerRef.current = window.setTimeout(() => setDraftStatus('idle'), 3500);
  };

  // Called by the editor's onLoad with the live editor instance — the ref is
  // not populated yet at that moment, so the instance is passed in directly.
  const loadDraft = (editor: ImageEditorInstance) => {
    if (!selectedLocation) return;
    const draft = editorService.loadDraft(selectedLocation.id);
    if (draft) {
      editor.reset(draft);
    }
  };

  // Stable identity on purpose: the canvas re-composes its image whenever this changes.
  const setBaseImage = useCallback((image: string) => {
    baseImageRef.current = image;
  }, []);

  const stampBadgeOnPostcard = async (badge: PostcardBadge, corner: BadgeCorner) => {
    const editor = editorRef.current?.editor;
    if (!editor || busy) return;
    const current = editor.getImage();
    if (!current) return;

    setBusy('badge');
    try {
      const next = await stampBadge(current, badge.src, corner, { scale: badge.scale, rotate: badge.rotate });
      badgeHistoryRef.current.push(current);
      if (badgeHistoryRef.current.length > MAX_BADGE_UNDO) badgeHistoryRef.current.shift();
      setBadgeCount(badgeHistoryRef.current.length);
      await editor.reset(next);
    } finally {
      setBusy(null);
    }
  };

  const undoBadge = async () => {
    const editor = editorRef.current?.editor;
    const previous = badgeHistoryRef.current.pop();
    setBadgeCount(badgeHistoryRef.current.length);
    if (editor && previous) await editor.reset(previous);
  };

  const executeAction = (action: string) => {
    switch (action) {
      case 'reset': {
        // Start over from the freshly composed postcard (photo + title + message)
        const editor = editorRef.current?.editor;
        if (editor) editor.reset(baseImageRef.current ?? selectedLocation?.image);
        badgeHistoryRef.current = [];
        setBadgeCount(0);
        break;
      }
      // Undo / redo / zoom live inside the Unlayer editor; the header buttons drive them.
      case 'undo':
        clickEditorButton('Undo');
        break;
      case 'redo':
        clickEditorButton('Redo');
        break;
      case 'zoomIn':
        clickEditorButton('Zoom in');
        break;
      case 'zoomOut':
        clickEditorButton('Zoom out');
        break;
      default:
        break;
    }
  };

  return {
    editorRef,
    busy,
    draftStatus,
    canUndoBadge: badgeCount > 0,
    exportPostcard,
    finishExport,
    cancelEditing,
    saveDraft,
    loadDraft,
    setBaseImage,
    stampBadgeOnPostcard,
    undoBadge,
    executeAction,
  };
}
