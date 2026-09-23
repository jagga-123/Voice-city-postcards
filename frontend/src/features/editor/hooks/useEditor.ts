import { useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useCollectionStore } from '@/store/useCollectionStore';
import { editorService } from '@/features/editor/services/editorService';
import { useRouter } from 'next/navigation';
import type { ImageEditorInstance, ImageEditorRef } from '@unlayer/react-image-editor';

export function useEditor() {
  const editorRef = useRef<ImageEditorRef | null>(null);
  const { setExportedPostcard, setEditorDraft, postcardTitle, postcardMessage, selectedTheme, selectedLocation } = useAppStore();
  const { savePostcard } = useCollectionStore();
  const router = useRouter();

  const exportPostcard = () => {
    if (editorRef.current && editorRef.current.editor) {
      const dataUrl = editorRef.current.editor.getImage();

      if (dataUrl && selectedLocation) {
        setExportedPostcard(dataUrl);
        // Persist to collection
        savePostcard({
          title: postcardTitle,
          message: postcardMessage,
          locationId: selectedLocation.id,
          theme: selectedTheme,
          imageUrl: dataUrl
        });
        // The postcard is finished — drop its draft so it isn't restored next time.
        editorService.clearDraft();
        setEditorDraft(null);
        // Navigate to success
        router.push('/success');
      }
    }
  };

  const saveDraft = () => {
    if (editorRef.current && editorRef.current.editor) {
      const dataUrl = editorRef.current.editor.getImage();
      if (dataUrl && selectedLocation) {
        setEditorDraft(dataUrl);
        editorService.saveDraft(dataUrl, selectedLocation.id);
        console.log("Draft saved successfully.");
      }
    }
  };

  // Called by the editor's onLoad with the live editor instance — the ref is
  // not populated yet at that moment, so the instance is passed in directly.
  const loadDraft = (editor: ImageEditorInstance) => {
    if (!selectedLocation) return;
    const draft = editorService.loadDraft(selectedLocation.id);
    if (draft) {
      editor.reset(draft);
      console.log("Draft loaded successfully.");
    }
  };

  const executeAction = (action: string) => {
    if (!editorRef.current || !editorRef.current.editor) return;
    
    switch (action) {
      case 'reset':
        // Reset to initial location image
        editorRef.current.editor.reset(selectedLocation?.image);
        break;
      default:
        console.log(`Action ${action} not supported by external API.`);
        break;
    }
  };

  return {
    editorRef,
    exportPostcard,
    saveDraft,
    loadDraft,
    executeAction,
  };
}
