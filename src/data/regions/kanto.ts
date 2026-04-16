import type { RegionManifest } from '@/types/region'

export const kanto: RegionManifest = {
  id: 'kanto',
  name: 'Kanto',
  tagline: 'The industrial heartland of the Pokémon world.',
  icon: 'mdi-map-marker-radius',
  themeColor: 'red-darken-2',
  tags: [
    { label: 'Indigo Federation', color: 'blue-darken-2' },
    { label: 'Gen I', color: 'red' },
  ],
  traits: [
    { label: 'Urban Development', icon: 'mdi-city' },
    { label: 'Technological Hubs', icon: 'mdi-laptop' },
    { label: 'Scientific History', icon: 'mdi-flask' },
  ],
  stats: [
    { label: 'Capital', value: 'Saffron City' },
    { label: 'Regional Professor', value: 'Professor Oak' },
    { label: 'Climate', value: 'Temperate / Humid' },
    { label: 'Discovered Pokémon', value: '153' },
  ],
  description:
    'A region characterized by its relatively flat geography and high level of industrialization. It is home to the famous Silph Co. and the Pokémon Lab.',
  loreSnippet:
    'Team Rocket exploited Pokémon for profit, culminating in the takeover of Silph Co. and widespread criminal activity across the region. Their operations were dismantled, but their influence exposed the vulnerability of Kanto’s infrastructure. The events left Kanto more vigilant, with stronger ties between League authority and corporate security.',
  subdirectories: [
    {
      title: 'events',
      icon: 'mdi-party-popper',
      to: '/regions/kanto/events',
      color: 'orange-darken-2',
    },
    {
      title: 'geography',
      icon: 'mdi-city-variant',
      to: '/regions/kanto/geography',
      color: 'blue-grey-darken-1',
    },
    { title: 'league', icon: 'mdi-pokemon-go', to: '/regions/kanto/league', color: 'red-darken-2' },
  ],
  realWorldReference: {
    text: 'Modeled after the Kantō region of Japan, specifically the Greater Tokyo Area.',
    url: 'https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_world_in_relation_to_the_real_world#Kanto',
  },
}
