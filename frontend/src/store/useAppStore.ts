import { create } from 'zustand';
import { Location } from '@/types/location';
import { ThemeName } from '@/types/postcard';

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
  editorDraft: string | null;
  setEditorDraft: (draft: string | null) => void;
  editorHistory: string[];
  setEditorHistory: (history: string[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedLocation: null,
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  isLocationModalOpen: false,
  setLocationModalOpen: (isOpen) => set({ isLocationModalOpen: isOpen }),
  isEditorOpen: false,
  setEditorOpen: (isOpen) => set({ isEditorOpen: isOpen }),
  
  postcardTitle: 'Greetings from Vice City',
  setPostcardTitle: (title) => set({ postcardTitle: title }),
  postcardMessage: 'Wish you were here.',
  setPostcardMessage: (message) => set({ postcardMessage: message }),
  selectedTheme: 'Sunset',
  setSelectedTheme: (theme) => set({ selectedTheme: theme }),
  
  exportedPostcard: null,
  setExportedPostcard: (dataUrl) => set({ exportedPostcard: dataUrl }),
  editorDraft: null,
  setEditorDraft: (draft) => set({ editorDraft: draft }),
  editorHistory: [],
  setEditorHistory: (history) => set({ editorHistory: history }),
}));
