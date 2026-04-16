import { RegionManifest } from '@/types/region'

export const unova: RegionManifest = {
  id: 'unova',
  name: 'Unova Region',
  tagline: 'A melting pot of innovation and diversity.',
  icon: 'mdi-city-variant',
  themeColor: 'grey-darken-4',
  tags: [
    { label: 'Gen V', color: 'grey' },
    { label: 'Urban', color: 'blue' },
  ],
  traits: [
    { label: 'Massive Bridges', icon: 'mdi-bridge' },
    { label: 'Seasonal Shifts', icon: 'mdi-leaf' },
    { label: 'Advanced Tech', icon: 'mdi-robot' },
  ],
  stats: [
    { label: 'Capital', value: 'Castelia City' },
    { label: 'Regional Professor', value: 'Professor Juniper' },
    { label: 'Climate', value: 'Continental / Urban' },
    { label: 'Discovered Pokémon', value: '156' },
  ],
  news: [
    {
      title: 'Weather Warning',
      icon: 'mdi-weather-pouring',
      text: 'Heavy rainfall reported around Route 119. Trainers advised to use Caution.',
    },
  ],
  description:
    'Located far from the first four regions, Unova is a sprawling landmass of towering skyscrapers and vast paved highways.',
  loreSnippet:
    'Torn by friction between Truth & Ideals,Team Plasma advocated for the separation of Pokémon and trainers, challenging the foundation of the League system. Their campaign escalated with the awakening of legendary dragons and a direct assault on regional authority.',
  subdirectories: [
    {
      title: 'events',
      icon: 'mdi-ferris-wheel',
      to: '/regions/unova/events',
      color: 'light-blue-darken-2',
    },
    {
      title: 'geography',
      icon: 'mdi-bridge',
      to: '/regions/unova/geography',
      color: 'grey-darken-2',
    },
    {
      title: 'league',
      icon: 'mdi-pokemon-go',
      to: '/regions/unova/league',
      color: 'blue-grey-darken-4',
    },
  ],
  realWorldReference: {
    text: 'The first region based outside of Japan, modeled after the New York City metropolitan area.',
    url: 'https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_world_in_relation_to_the_real_world#Unova',
  },
}
