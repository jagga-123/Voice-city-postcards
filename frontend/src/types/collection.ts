export interface SavedPostcard {
  id: string;
  title: string;
  message: string;
  locationId: string;
  theme: string;
  imageUrl: string; // The exported PNG data URL
  createdAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string; // ISO date string if unlocked
}

export interface UserStats {
  totalDesigns: number;
  themesUsed: string[];
  locationsExplored: string[];
  editorSessions: number;
}
