import type { EventInstance } from '@/types/events'

export default {
  id: 'tour-de-alto-mare-001',
  eventId: 'tour-de-alto-mare',

  location: 'Alto Mare, Johto',

  members: [
    {
      characterId: 'kyuukestu',
      name: 'Esther',
    },
  ],

  calendar: {
    start: '',
    allDay: true,
  },

  extras: {
    competitions: [
      {
        name: 'Tour de Alto Mare',
        type: 'race',
        judgementType: 'timed',
        format: 'single',
        participants: [
          {
            id: 'kyuukestu',
            members: [
              {
                characterId: 'kyuukestu',
                name: 'Esther',
              },
            ],
            name: 'Esther',
          },
        ],
        notes:
          'Trainers race through the canals of Alto Mare on floating platforms pulled by their Pokémon. The course includes numerous turns through the city waterways, with security measures in place to keep the race course clear of other water traffic.',
      },
    ],
   
  },
} satisfies EventInstance
