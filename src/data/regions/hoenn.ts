import type { RegionManifest } from '@/types/region'

export const hoenn: RegionManifest = {
  id: 'hoenn',
  name: 'Hoenn Region',
  tagline: 'A land of emerald forests and sapphire seas.',
  icon: 'mdi-island',
  themeColor: 'teal-darken-2',
  tags: [
    { label: 'Gen III', color: 'teal' },
    { label: 'Tropical', color: 'cyan-darken-3' },
  ],
  traits: [
    { label: 'Deep Sea Diving', icon: 'mdi-waves' },
    { label: 'Volcanic Ash', icon: 'mdi-fire' },
    { label: 'Contest Culture', icon: 'mdi-star-circle' },
  ],
  stats: [
    { label: 'Capital', value: 'Rustboro City' },
    { label: 'Regional Professor', value: 'Professor Birch' },
    { label: 'Climate', value: 'Subtropical / Maritime' },
    { label: 'Discovered Pokémon', value: '135' },
  ],
  description:
    'Hoenn is a large archipelago defined by the relationship between land and water. It is home to the massive Mt. Chimney and the underwater trenches of the Sootopolis crater.',
  loreSnippet:
    'The extremist factions of Team Aqua and Team Magma sought to reshape the world in opposing ways—Aqua aimed to expand the seas to “restore” nature, and Magma strove to enlarge the land for human progress. Their reckless ambitions awakened the legendaries Kyogre and Groudon, plunging the region into climatic chaos. Only the intervention of Rayquaza restored balance and prevented total environmental collapse.',
  news: [
    {
      title: 'Weather Warning',
      icon: 'mdi-weather-pouring',
      text: 'Heavy rainfall reported around Route 119. Trainers advised to use Caution.',
    },
  ],
  subdirectories: [
    { title: 'events', icon: 'mdi-star-face', to: '/regions/hoenn/events', color: 'pink-darken-1' },
    {
      title: 'geography',
      icon: 'mdi-waves',
      to: '/regions/hoenn/geography',
      color: 'cyan-darken-3',
    },
    {
      title: 'league',
      icon: 'mdi-pokemon-go',
      to: '/regions/hoenn/league',
      color: 'teal-darken-2',
    },
  ],
  realWorldReference: {
    text: 'Inspired by the Japanese island of Kyūshū and its surrounding smaller islands.',
    url: 'https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_world_in_relation_to_the_real_world#Hoenn',
  },
}
