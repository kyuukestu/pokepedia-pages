import type { RegionManifest } from '@/types/region'

export const alola: RegionManifest = {
  id: 'alola',
  name: 'Alola',
  tagline: 'An island paradise where nature and people coexist.',
  icon: 'mdi-palm-tree',
  themeColor: 'orange-darken-2',
  tags: [
    { label: 'Gen VII', color: 'orange' },
    { label: 'Island Trials', color: 'yellow-darken-3' },
  ],
  traits: [
    { label: 'Z-Power', icon: 'mdi-lightning-bolt' },
    { label: 'Regional Variants', icon: 'mdi-dna' },
    { label: 'Ultra Wormholes', icon: 'mdi-portal' },
  ],
  stats: [
    { label: 'Capital', value: "Hau'oli City" },
    { label: 'Regional Professor', value: 'Professor Kukui' },
    { label: 'Climate', value: 'Tropical' },
    { label: 'Discovered Pokémon', value: '86' },
  ],
  description:
    'An archipelago composed of four natural islands and one artificial island. Alola lacks a traditional League structure, favoring the Island Challenge.',
  loreSnippet: '',
  subdirectories: [
    {
      title: 'events',
      icon: 'mdi-firework',
      to: '/regions/alola/events',
      color: 'orange-darken-4',
    },
    {
      title: 'geography',
      icon: 'mdi-volcano',
      to: '/regions/alola/geography',
      color: 'deep-orange-darken-3',
    },
    {
      title: 'league',
      icon: 'mdi-pokemon-go',
      to: '/regions/alola/league',
      color: 'yellow-darken-3',
    },
  ],
  news: [
    {
      title: 'SURF’S UP: PONI PRO',
      icon: 'mdi-waves',
      text: 'Elite Mantine Surfers descend on Poni Island for the annual Pro Circuit. Expect massive swells and record-breaking aerial maneuvers.',
      severity: 'info',
    },
    {
      title: 'ALOHA ALOLA!',
      icon: 'mdi-flower-garland',
      text: 'FESTIVAL Season returns, island-wide celebrations across Alola! Traditional dancing, malasada stalls, and Z-Move demonstrations coming to all four islands.',
      severity: 'info',
    },
  ],
  realWorldReference: {
    text: 'Modeled after the volcanic archipelago of the Hawaiian Islands in the central Pacific.',
    url: 'https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_world_in_relation_to_the_real_world#Alola',
  },
}
