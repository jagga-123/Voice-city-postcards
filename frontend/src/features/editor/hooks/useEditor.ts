import { useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useCollectionStore } from '@/store/useCollectionStore';
import { editorService } from '@/features/editor/services/editorService';
import { useRouter } from 'next/navigation';
import type { ImageEditorRef } from '@unlayer/react-image-editor';

export function useEditor() {
  const editorRef = useRef<ImageEditorRef | null>(null);
  const { setExportedPostcard, setEditorDraft, editorDraft, postcardTitle, postcardMessage, selectedTheme, selectedLocation } = useAppStore();
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
        // Navigate to success
        router.push('/success');
      }
    }
  };

  const saveDraft = () => {
    if (editorRef.current && editorRef.current.editor) {
      const dataUrl = editorRef.current.editor.getImage();
      if (dataUrl) {
        setEditorDraft(dataUrl);
        editorService.saveDraft(dataUrl);
        console.log("Draft saved successfully.");
      }
    }
  };

  const loadDraft = () => {
    const draft = editorService.loadDraft() || editorDraft;
    if (draft && editorRef.current && editorRef.current.editor) {
      editorRef.current.editor.reset(draft);
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
