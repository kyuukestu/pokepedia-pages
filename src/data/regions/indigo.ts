import { RegionManifest } from '@/types/region'

export const indigo: RegionManifest = {
  id: 'indigo',
  name: 'Indigo Federation',
  tagline: 'The unified heart of Kanto and Johto.',
  icon: 'mdi-hands-pray',
  themeColor: 'blue',
  tags: [
    { label: 'Kanto', color: 'error' },
    { label: 'Johto', color: 'info' },
    { label: '16 Badges', color: 'amber-darken-3' },
  ],
  traits: [
    { label: 'Lugia & Ho-Oh Mythos', icon: 'mdi-bird' },
    { label: 'Cinnabar Volcanics', icon: 'mdi-molecule' },
    { label: 'Ilex Spirits', icon: 'mdi-pine-tree' },
  ],
  stats: [
    { label: 'Capital', value: 'Indigo Plateau' },
    { label: 'Champion', value: 'Lance' },
  ],
  description:
    "The Federation is a land of sharp contrasts, defined by Kanto's sprawling industrial metropolises and Johto's deep-rooted spiritual traditions.",
  loreSnippet:
    'Born from the ashes of the Kan-Joh War, the Indigo Federation has withstood much since its inception. Most notable is the persistent plague of Team Rocket...',

  subdirectories: [
    {
      title: 'Kanto',
      icon: 'mdi-map-legend',
      color: 'red-darken-2',
      to: '/',
    },
    {
      title: 'Johto',
      icon: 'mdi-map-marker-distance',
      color: 'blue-darken-2',
      to: '/',
    },
    {
      title: 'Indigo-League', // Capitalized for UI, logic will .toLowerCase()
      icon: 'mdi-shield-crown-outline',
      color: 'amber-darken-3',
      to: '/',
    },
  ],
  realWorldReference: {
    text: 'Modeled after the Kantō and Chūbu/Kansai regions of Japan.',
    url: 'https://bulbapedia.bulbagarden.net/wiki/Kanto',
  },
}
