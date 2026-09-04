
import { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'

export const charmPoints: FeatureItem[] = [
  {
    title: 'Quest Board',
    icon: 'mdi-clipboard-text-outline',
    description:
      'Take on Missions and PokéJobs, from lending a helping hand around the community to pursuing the trail of something far more sinister.',
    color: 'blue',
    to: '/sandbox/quest-board',
  },
  {
    title: 'Events',
    icon: 'mdi-trophy-outline',
    description:
      'Participate in tournaments, festivals, races, competitions, and other activities that bring characters together.',
    color: 'blue',
    to: '/sandbox/events',
  },
  {
    title: "Tell the World a Story",
    icon: 'mdi-newspaper-variant-outline',
    description:
      'Use KENN to report on events, write news articles, share character perspectives, or pen opinion pieces that become part of the ongoing story.',
    color: 'blue',
    to: '/sandbox/kenn',
  },
  {
    title: 'Shape the Future',
    icon: 'mdi-earth-plus',
    description:
      "Your character's accomplishments, relationships, careers, and actions can create new opportunities and influence the stories happening around them.",
    color: 'blue',
  },
]
