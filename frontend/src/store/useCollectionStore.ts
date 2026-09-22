import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SavedPostcard, Achievement, UserStats } from '@/types/collection';
import { checkAchievements } from '@/features/achievements/logic';

interface CollectionState {
  savedPostcards: SavedPostcard[];
  stats: UserStats;
  achievements: Achievement[];
  
  // Actions
  savePostcard: (postcard: Omit<SavedPostcard, 'id' | 'createdAt'>) => void;
  incrementEditorSessions: () => void;
  clearCollection: () => void;
}

export const useCollectionStore = create<CollectionState>()(
  persist(
    (set) => ({
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
          id: Math.random().toString(36).substring(2, 9),
          createdAt: new Date().toISOString(),
        };

        set((state) => {
          const updatedPostcards = [newPostcard, ...state.savedPostcards];
          
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
      name: 'vice-city-collection-storage', // unique name for localStorage key
    }
  )
);
