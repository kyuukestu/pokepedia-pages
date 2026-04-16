import type { RegionManifest } from '@/types/region'

export const kalos: RegionManifest = {
  id: 'kalos',
  name: 'Kalos',
  tagline: 'The star-shaped land of beauty and evolution.',
  icon: 'mdi-tower-fire',
  themeColor: 'pink-darken-1',
  tags: [
    { label: 'Gen VI', color: 'blue' },
    { label: 'Mega Evolution', color: 'deep-purple' },
  ],
  traits: [
    { label: 'Haute Couture', icon: 'mdi-tshirt-crew' },
    { label: 'Mega Stones', icon: 'mdi-hands-back-point-off' },
    { label: 'Culinary Excellence', icon: 'mdi-silverware-fork-knife' },
  ],
  stats: [
    { label: 'Capital', value: 'Lumiose City' },
    { label: 'Regional Professor', value: 'Professor Sycamore' },
    { label: 'Climate', value: 'Oceanic / Temperate' },
    { label: 'Discovered Pokémon', value: '72' },
  ],
  description:
    'A star-shaped region in the west, Kalos is world-renowned for its fashion, art, and the mysterious power of Mega Evolution.',
  loreSnippet:
    "In pursuit of beauty, Team Flare sought to eliminate everything 'ugly' with the Ultimate Weapon. The weapon’s activation caused widespread devastation before they were halted leaving the region scarred.",
  subdirectories: [
    {
      title: 'events',
      icon: 'mdi-camera-iris',
      to: '/regions/kalos/events',
      color: 'deep-purple-accent-2',
    },
    {
      title: 'geography',
      icon: 'mdi-flower-tulip',
      to: '/regions/kalos/geography',
      color: 'pink-darken-1',
    },
    {
      title: 'league',
      icon: 'mdi-pokemon-go',
      to: '/regions/kalos/league',
      color: 'indigo-darken-1',
    },
  ],
  news: [
    {
      title: 'THE RIVER’S CROWN',
      icon: 'mdi-crown',
      text: 'The Medieval Reenactment Festival kicks off at the Loire de Fleuve Isle! Experience historical jousting, period-accurate crafts, and Kalosian heritage.',
      severity: 'info',
    },
  ],
  realWorldReference: {
    text: 'Heavily inspired by the northern half of Metropolitan France, centered around Paris.',
    url: 'https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_world_in_relation_to_the_real_world#Kalos',
  },
}
