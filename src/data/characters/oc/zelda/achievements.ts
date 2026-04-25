// Import the main data from your index file
import meta from '@/data/characters/oc/zelda/index'
// Re-export specific parts so the store sees them as "Achievement Data"
export const achievements = {
  badges: meta.badges,
  ribbons: meta.ribbons,
  coordinatorRank: meta.coordinatorRank,
  // You can add achievement-specific flavor text here too
}

export default achievements
