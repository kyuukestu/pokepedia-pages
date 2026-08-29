import type { EventInstance } from '@/types/events'

export default {
  id: 'grass-tournament-001',
  eventId: 'grass-tournament',

  location: 'Route 37, Johto',

  members: [
    {
      characterId: 'hecotoro',
      name: 'Reina',
    },
    {
      characterId: 'merciless_medic',
      name: 'Naka',
    },
  ],

  calendar: {
    start: '',
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

    competitions: [
      {
        name: 'Grass Tournament',
        type: 'tournament',
        judgementType: 'bracket',
        format: 'single',
        participants: [
          {
            id: 'hecotoro',
            name: 'Reina',
            members: [
              {
                characterId: 'hecotoro',
                name: 'Reina',
              },
            ],
          },
          {
            id: 'merciless_medic',
            name: 'Naka',
            members: [
              {
                characterId: 'merciless_medic',
                name: 'Naka',
              },
            ],
          },
        ],
      },
    ],
  },
} satisfies EventInstance
