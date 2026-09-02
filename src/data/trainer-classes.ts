
import { FeatureItem } from '@/components/wiki/FeatureGrid.vue'

export const trainerPaths: FeatureItem[] = [
  {
    title: 'Battler',
    icon: 'mdi-sword-cross',
    description: 'Train Pokémon, compete in battles, challenge Gyms, and pursue the path toward becoming a stronger Trainer.',
    color: 'red',
    to: '/sandbox/trainer-101/paths/battler',
  },
  {
    title: 'Coordinator',
    icon: 'mdi-star-four-points',
    description: 'Compete in Pokémon Contests and other performance-focused competitions that celebrate skill, creativity, and partnership.',
    color: 'pink',
    to: '/sandbox/trainer-101/paths/coordinator',
  },
  {
    title: 'Ranger',
    icon: 'mdi-shield-account',
    description: 'Protect people and Pokémon through fieldwork, conservation, rescue, and conflict resolution.',
    color: 'green',
    to: '/sandbox/trainer-101/paths/ranger',
  },
  {
    title: 'Researcher',
    icon: 'mdi-flask-outline',
    description: 'Study Pokémon, their habitats, and the mysteries of the world through observation, exploration, and research.',
    color: 'blue',
    to: '/sandbox/trainer-101/paths/researcher',
  },
]
