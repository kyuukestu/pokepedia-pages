import { RegionManifest } from '@/types/region'

export const sinnoh: RegionManifest = {
  id: 'sinnoh',
  name: 'Sinnoh Region',
  tagline: 'The snowy cradle of creation.',
  icon: 'mdi-snowflake-melt',
  themeColor: 'blue-grey-darken-3',
  tags: [
    { label: 'Gen IV', color: 'blue-grey' },
    { label: 'Mountainous', color: 'brown' },
  ],
  traits: [
    { label: 'Mt. Coronet Peaks', icon: 'mdi-mountain' },
    { label: 'Space-Time Rifts', icon: 'mdi-auto-fix' },
    { label: 'Underground Mining', icon: 'mdi-pickaxe' },
  ],
  stats: [
    { label: 'Capital', value: 'Jubilife City' },
    { label: 'Regional Professor', value: 'Professor Rowan' },
    { label: 'Climate', value: 'Subarctic / Mountainous' },
    { label: 'Discovered Pokémon', value: '114' },
  ],
  news: [
    {
      title: 'Weather Warning',
      icon: 'mdi-weather-pouring',
      text: 'Heavy rainfall reported around Route 119. Trainers advised to use Caution.',
    },
  ],
  description:
    'A cold, mountainous region divided by the massive Mt. Coronet. Sinnoh is famous for its ancient legends regarding the origin of the universe.',
  loreSnippet:
    'Desiring to re-write reality, Team Galactic summoned the creation-legends Dialga, Palkia, and Giratina. A confrontation at Spear Pillar halted their ambitions and restored stability however the Galactic Boss, Cyrus, was lost to the distortion world.',
  subdirectories: [
    { title: 'events', icon: 'mdi-pillar', to: '/regions/sinnoh/events', color: 'amber-darken-4' },
    {
      title: 'geography',
      icon: 'mdi-image-filter-hdr-outline',
      to: '/regions/sinnoh/geography',
      color: 'blue-grey-darken-3',
    },
    {
      title: 'league',
      icon: 'mdi-pokemon-go',
      to: '/regions/sinnoh/league',
      color: 'grey-darken-3',
    },
  ],
  realWorldReference: {
    text: 'Modeled after the northernmost Japanese island of Hokkaidō and part of Sakhalin.',
    url: 'https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_world_in_relation_to_the_real_world#Sinnoh',
  },
}
