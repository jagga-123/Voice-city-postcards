export const editorService = {
  saveDraft: (draft: string) => {
    try {
      localStorage.setItem('vice_city_postcard_draft', JSON.stringify(draft));
    } catch (e) {
      console.error('Failed to save draft', e);
    }
  },

  loadDraft: (): string | null => {
    try {
      const draft = localStorage.getItem('vice_city_postcard_draft');
      return draft ? JSON.parse(draft) : null;
    } catch (e) {
      console.error('Failed to load draft', e);
      return null;
    }
  },

  clearDraft: () => {
    try {
      localStorage.removeItem('vice_city_postcard_draft');
    } catch (e) {
      console.error('Failed to clear draft', e);
    }
  }
};
