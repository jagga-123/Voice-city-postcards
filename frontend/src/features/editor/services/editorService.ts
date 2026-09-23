const DRAFT_KEY = 'vice_city_postcard_draft';

// A draft belongs to the location it was created for, so it is never
// restored on top of a different location's photo.
interface StoredDraft {
  locationId: string;
  image: string;
}

function isStoredDraft(value: unknown): value is StoredDraft {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.locationId === 'string' && typeof candidate.image === 'string';
}

// In-session fallback for when localStorage is unavailable or full
// (exported images are large data URLs).
let memoryDraft: StoredDraft | null = null;

export const editorService = {
  saveDraft: (image: string, locationId: string) => {
    const draft: StoredDraft = { locationId, image };
    memoryDraft = draft;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch (e) {
      console.error('Failed to save draft', e);
    }
  },

  loadDraft: (locationId: string): string | null => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (isStoredDraft(parsed) && parsed.locationId === locationId) {
          return parsed.image;
        }
      }
    } catch (e) {
      console.error('Failed to load draft', e);
    }
    return memoryDraft?.locationId === locationId ? memoryDraft.image : null;
  },

  clearDraft: () => {
    memoryDraft = null;
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (e) {
      console.error('Failed to clear draft', e);
    }
  }
};
