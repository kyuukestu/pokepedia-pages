// Import the main data from your index file
import meta from '@/data/characters/metztli/oc/reina/index'
// Re-export specific parts so the store sees them as "Achievement Data"
export const achievements = {
  badges: meta.badges,
  // You can add achievement-specific flavor text here too
}

export default achievements
