import type { RegionManifest } from '@/types/region'

export const paldea: RegionManifest = {
  id: 'paldea',
  name: 'Paldea',
  tagline: 'A boundless world of treasure and academies.',
  icon: 'mdi-school',
  themeColor: 'deep-orange-darken-4',
  tags: [
    { label: 'Gen IX', color: 'deep-orange' },
    { label: 'Terastal', color: 'light-blue-accent-1' },
  ],
  traits: [
    { label: 'Great Crater', icon: 'mdi-circle-double' },
    { label: 'Tera Jewels', icon: 'mdi-diamond-stone' },
    { label: 'Open Exploration', icon: 'mdi-compass-outline' },
  ],
  stats: [
    { label: 'Capital', value: 'Mesagoza' },
    { label: 'Regional Professor', value: 'Professor Sada / Turo' },
    { label: 'Climate', value: 'Mediterranean' },
    { label: 'Discovered Pokémon', value: '120' },
  ],
  description:
    'A vast region centered around the Great Crater of Paldea. It is known for its prestigious academies and the Terastal phenomenon.',
  loreSnippet: '',
  subdirectories: [
    {
      title: 'events',
      icon: 'mdi-school',
      to: '/regions/paldea/events',
      color: 'deep-orange-darken-2',
    },
    {
      title: 'geography',
      icon: 'mdi-earth-box',
      to: '/regions/paldea/geography',
      color: 'green-darken-1',
    },
    {
      title: 'league',
      icon: 'mdi-pokemon-go',
      to: '/regions/paldea/league',
      color: 'purple-darken-3',
    },
  ],
  realWorldReference: {
    text: 'Inspired by the Iberian Peninsula, primarily the countries of Spain and Portugal.',
    url: 'https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_world_in_relation_to_the_real_world#Paldea',
  },
}
