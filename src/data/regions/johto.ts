import type { RegionManifest } from '@/types/region'

export const johto: RegionManifest = {
  id: 'johto',
  name: 'Johto',
  tagline: 'Where tradition and legend reside.',
  icon: 'mdi-temple-buddhist',
  themeColor: 'blue-darken-2',
  tags: [
    { label: 'Indigo Federation', color: 'blue-darken-2' },
    { label: 'Gen II', color: 'pink-darken-2' },
  ],
  traits: [
    { label: 'Ancient Architecture', icon: 'mdi-pillar' },
    { label: 'Spiritual Roots', icon: 'mdi-hands-pray' },
    { label: 'Apricorn Crafting', icon: 'mdi-fruit-cherries' },
  ],
  stats: [
    { label: 'Capital', value: 'Goldenrod City' },
    { label: 'Regional Professor', value: 'Professor Elm' },
    { label: 'Climate', value: 'Temperate / Traditional' },
    { label: 'Discovered Pokémon', value: '100' },
  ],
  description:
    'Team Rocket attempted to reestablish itself by forcibly inducing evolution and broadcasting signals to control Pokémon. Their actions disrupted natural habitats and drew attention to the fragile balance between tradition and interference. Johto’s deep cultural reverence for Pokémon was reaffirmed in the aftermath.',
  loreSnippet:
    'The Burned Tower and Bell Tower stand as monuments to a time when humans and legendary Pokémon lived in closer harmony.',
  subdirectories: [
    {
      title: 'events',
      icon: 'mdi-bridge',
      to: '/sandbox/regions/johto/events',
      color: 'deep-purple-lighten-1',
    },
    {
      title: 'geography',
      icon: 'mdi-temple-buddhist',
      to: '/sandbox/regions/johto/geography',
      color: 'brown-darken-1',
    },
    {
      title: 'league',
      icon: 'mdi-pokemon-go',
      to: '/sandbox/regions/johto/league',
      color: 'blue-darken-2',
    },
  ],
  news: [
    {
      title: 'SANGUINE SWARM ALERT',
      icon: 'mdi-bat',
      text: "Watch your neck and pack plenty of garlic! If you're in Northern Johto then you're in for a batty time! The local Zubat have gone bat-bit crazy!",
      severity: 'warning',
    },
  ],
  realWorldReference: {
    text: 'Based on the Kansai and eastern Shikoku regions of Japan, emphasizing traditional culture.',
    url: 'https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_world_in_relation_to_the_real_world#Johto',
  },
}
