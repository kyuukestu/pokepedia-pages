import type { RegionManifest } from '@/types/region'

export const galar: RegionManifest = {
  id: 'galar',
  name: 'Galar',
  tagline: 'Where Pokémon battles are the ultimate stadium sport.',
  icon: 'mdi-stadium-variant',
  themeColor: 'blue-grey-darken-4',
  tags: [
    { label: 'Gen VIII', color: 'red-darken-4' },
    { label: 'Dynamax', color: 'deep-purple-accent-4' },
  ],
  traits: [
    { label: 'Wild Area', icon: 'mdi-sprout' },
    { label: 'Industrial Power', icon: 'mdi-factory' },
    { label: 'Power Spots', icon: 'mdi-lightning-bolt-circle' },
  ],
  stats: [
    { label: 'Capital', value: 'Wyndon' },
    { label: 'Regional Professor', value: 'Professor Magnolia' },
    { label: 'Climate', value: 'Temperate / Varied' },
    { label: 'Discovered Pokémon', value: '89' },
  ],
  description:
    'A long, vertical region known for its sprawling countrysides, industrial cities, and massive stadiums that host the Gym Challenge.',
  loreSnippet: '',
  subdirectories: [
    { title: 'events', icon: 'mdi-tree', to: '/regions/galar/events', color: 'green-darken-3' },
    {
      title: 'geography',
      icon: 'mdi-town-hall',
      to: '/regions/galar/geography',
      color: 'indigo-darken-2',
    },
    {
      title: 'league',
      icon: 'mdi-pokemon-go',
      to: '/regions/galar/league',
      color: 'blue-grey-darken-4',
    },
  ],
  news: [
    {
      title: 'GHOST FROM THE PAST',
      icon: 'mdi-eye-off-outline',
      text: 'Once thought deceased, the infamous Hunter J was spotted outside Motostoke. Suspect escaped following a violent skirmish with local authorities. Vigilance advised.',
      severity: 'error',
    },
    {
      title: 'CLASH OF TITANS',
      icon: 'mdi-sword-cross',
      text: 'Master’s Exhibition! The Undefeated Champion, Leon, against . Tucker. Tickets for the Wyndon Stadium showdown expected to sell out in minutes.',
      severity: 'info',
    },
  ],
  realWorldReference: {
    text: 'Based on the United Kingdom, specifically Great Britain (England, Scotland, and Wales).',
    url: 'https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_world_in_relation_to_the_real_world#Galar',
  },
}
