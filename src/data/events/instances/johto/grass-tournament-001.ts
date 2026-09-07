import type { EventInstance } from '@/types/events'

export default {
  id: 'grass-tournament-001',
  eventId: 'grass-tournament',
  region: ['johto'],
  title: 'The Verdant Crown',
  image:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYilteon7tHU95qBq3t8YGdganpk6zzruARwt8YMFkPh5OZ4QXm2FuPGf8&s=10',
  description:
    'A one-on-one Pokémon tournament in which each competitor is permitted to enter only a single Grass-type Pokémon.',
  location: 'Route 37, Johto',

  participants: [
    {
      characterId: 'Reina',
    },
    {
      characterId: 'Nakano Saito',
    },
  ],

  calendar: {
    start: '2022-09-04T00:00:00',
    allDay: true,
  },

  extras: {
    host: {
      id: 'kyuukestu',
      name: 'Kyuukestu',
      hostType: 'character',
    },

    requirements: {
      description:
        'Competitors may enter only one Grass-type Pokémon. Matches are conducted as one-on-one battles.',
    },
  },
} satisfies EventInstance
