import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import { SavedPostcard, Achievement, UserStats } from '@/types/collection';
import { checkAchievements } from '@/features/achievements/logic';

const STORAGE_KEY = 'vice-city-collection-storage';

// Keeps the collection comfortably inside the browser's ~5 MB localStorage quota
// (each stored postcard is a compressed JPEG of roughly 100 KB).
export const MAX_SAVED_POSTCARDS = 24;

function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * localStorage wrapper that never throws. If a write hits the quota it drops the
 * oldest postcards until the collection fits, so saving/exporting can never be
 * blocked by a full browser storage.
 */
const safeStorage: StateStorage = {
  getItem: (name) => {
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, value);
      return;
    } catch {
      // Quota exceeded (or storage unavailable) — fall through to pruning.
    }
    try {
      const parsed = JSON.parse(value) as { state: { savedPostcards: unknown[] } };
      const list = parsed.state.savedPostcards;
      while (list.length > 1) {
        list.pop(); // newest postcards are first, so this drops the oldest
        try {
          localStorage.setItem(name, JSON.stringify(parsed));
          return;
        } catch {
          // keep pruning
        }
      }
    } catch {
      // ignore
    }
    console.warn('Vice City Postcards: could not persist the collection (browser storage is full).');
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
    } catch {
      // ignore
    }
  },
};

/** True when the postcard with this id actually made it into localStorage. */
export function isPostcardPersisted(id: string): boolean {
  try {
    return (localStorage.getItem(STORAGE_KEY) ?? '').includes(id);
  } catch {
    return false;
  }
}

export interface SaveResult {
  id: string;
  unlocked: Achievement[];
}

interface CollectionState {
  savedPostcards: SavedPostcard[];
  stats: UserStats;
  achievements: Achievement[];

  // Actions
  savePostcard: (postcard: Omit<SavedPostcard, 'id' | 'createdAt'>) => SaveResult;
  incrementEditorSessions: () => void;
  clearCollection: () => void;
}

export const useCollectionStore = create<CollectionState>()(
  persist(
    (set, get) => ({
      savedPostcards: [],
      stats: {
        totalDesigns: 0,
        themesUsed: [],
        locationsExplored: [],
        editorSessions: 0,
      },
      achievements: [],

      savePostcard: (postcardData) => {
        const newPostcard: SavedPostcard = {
          ...postcardData,
          id: newId(),
          createdAt: new Date().toISOString(),
        };
        const previousAchievementIds = get().achievements.map((a) => a.id);

        set((state) => {
          const updatedPostcards = [newPostcard, ...state.savedPostcards].slice(0, MAX_SAVED_POSTCARDS);

          // Update Stats
          const newThemes = new Set(state.stats.themesUsed);
          newThemes.add(postcardData.theme);

          const newLocations = new Set(state.stats.locationsExplored);
          newLocations.add(postcardData.locationId);

          const newStats = {
            ...state.stats,
            totalDesigns: state.stats.totalDesigns + 1,
            themesUsed: Array.from(newThemes),
            locationsExplored: Array.from(newLocations),
          };

          // Check Achievements
          const updatedAchievements = checkAchievements(updatedPostcards, state.achievements);

          return {
            savedPostcards: updatedPostcards,
            stats: newStats,
            achievements: updatedAchievements,
          };
        });

        const unlocked = get().achievements.filter((a) => !previousAchievementIds.includes(a.id));
        return { id: newPostcard.id, unlocked };
      },

      incrementEditorSessions: () => {
        set((state) => ({
          stats: {
            ...state.stats,
            editorSessions: state.stats.editorSessions + 1,
          }
        }));
      },

      clearCollection: () => {
        set({ savedPostcards: [], stats: { totalDesigns: 0, themesUsed: [], locationsExplored: [], editorSessions: 0 }, achievements: [] });
      }
    }),
    {
      name: STORAGE_KEY, // unique name for localStorage key
      storage: createJSONStorage(() => safeStorage),
    }
  )
);
