import { create } from 'zustand';
import { Location } from '@/types/location';
import { ThemeName } from '@/types/postcard';
import { Achievement } from '@/types/collection';

const DEFAULT_TITLE = 'Greetings from Vice City';
const DEFAULT_MESSAGE = 'Wish you were here.';

/** Outcome of the last export, shown on the success page. */
export interface ExportMeta {
  savedToGallery: boolean;
  unlocked: Achievement[];
}

interface AppState {
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location | null) => void;
  isLocationModalOpen: boolean;
  setLocationModalOpen: (isOpen: boolean) => void;
  isEditorOpen: boolean;
  setEditorOpen: (isOpen: boolean) => void;

  // Postcard Fields
  postcardTitle: string;
  setPostcardTitle: (title: string) => void;
  postcardMessage: string;
  setPostcardMessage: (message: string) => void;
  selectedTheme: ThemeName;
  setSelectedTheme: (theme: ThemeName) => void;

  // Editor Fields
  exportedPostcard: string | null;
  setExportedPostcard: (dataUrl: string | null) => void;
  exportMeta: ExportMeta | null;
  setExportMeta: (meta: ExportMeta | null) => void;
  editorDraft: string | null;
  setEditorDraft: (draft: string | null) => void;
  editorHistory: string[];
  setEditorHistory: (history: string[]) => void;

  /** Clears the in-progress postcard so a new one can be started from Explore. */
  resetPostcardFlow: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedLocation: null,
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  isLocationModalOpen: false,
  setLocationModalOpen: (isOpen) => set({ isLocationModalOpen: isOpen }),
  isEditorOpen: false,
  setEditorOpen: (isOpen) => set({ isEditorOpen: isOpen }),

  postcardTitle: DEFAULT_TITLE,
  setPostcardTitle: (title) => set({ postcardTitle: title }),
  postcardMessage: DEFAULT_MESSAGE,
  setPostcardMessage: (message) => set({ postcardMessage: message }),
  selectedTheme: 'Sunset',
  setSelectedTheme: (theme) => set({ selectedTheme: theme }),

  exportedPostcard: null,
  setExportedPostcard: (dataUrl) => set({ exportedPostcard: dataUrl }),
  exportMeta: null,
  setExportMeta: (meta) => set({ exportMeta: meta }),
  editorDraft: null,
  setEditorDraft: (draft) => set({ editorDraft: draft }),
  editorHistory: [],
  setEditorHistory: (history) => set({ editorHistory: history }),

  resetPostcardFlow: () =>
    set({
      selectedLocation: null,
      isLocationModalOpen: false,
      postcardTitle: DEFAULT_TITLE,
      postcardMessage: DEFAULT_MESSAGE,
      selectedTheme: 'Sunset',
      exportedPostcard: null,
      exportMeta: null,
      editorDraft: null,
    }),
}));
