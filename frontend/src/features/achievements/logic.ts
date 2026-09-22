import { SavedPostcard, Achievement } from '@/types/collection';

export const ACHIEVEMENTS_DATA = [
  {
    id: 'first_adventure',
    name: 'First Adventure',
    description: 'Created your very first Vice City Postcard.',
    icon: '🌴'
  },
  {
    id: 'postcard_master',
    name: 'Postcard Master',
    description: 'Created 5 different postcards.',
    icon: '🏆'
  },
  {
    id: 'vice_city_explorer',
    name: 'Vice City Explorer',
    description: 'Explored 3 distinct locations.',
    icon: '🗺️'
  },
  {
    id: 'beach_lover',
    name: 'Beach Lover',
    description: 'Created 2 postcards from Beach locations.',
    icon: '🌊'
  },
  {
    id: 'nightlife_enthusiast',
    name: 'Nightlife Enthusiast',
    description: 'Created 2 postcards from Nightlife locations.',
    icon: '🪩'
  }
];

export function checkAchievements(
  postcards: SavedPostcard[],
  currentAchievements: Achievement[]
): Achievement[] {
  const newUnlocked: Achievement[] = [...currentAchievements];

  const unlock = (id: string) => {
    if (!newUnlocked.find(a => a.id === id)) {
      const template = ACHIEVEMENTS_DATA.find(a => a.id === id);
      if (template) {
        newUnlocked.push({ ...template, unlockedAt: new Date().toISOString() });
      }
    }
  };

  if (postcards.length >= 1) unlock('first_adventure');
  if (postcards.length >= 5) unlock('postcard_master');

  const uniqueLocations = new Set(postcards.map(p => p.locationId)).size;
  if (uniqueLocations >= 3) unlock('vice_city_explorer');

  // We could cross-reference location categories here.
  // For hackathon simplicity, we map ID checks.
  const beachCount = postcards.filter(p => p.locationId === 'ocean-beach').length;
  if (beachCount >= 2) unlock('beach_lover');

  const nightlifeCount = postcards.filter(p => p.locationId === 'neon-district').length;
  if (nightlifeCount >= 2) unlock('nightlife_enthusiast');

  return newUnlocked;
}
