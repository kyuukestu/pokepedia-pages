import type { EventInstance } from '@/types/events'

export default {
  id: 'mareep-festival-001',
  eventId: 'mareep-festival',

  location: 'Mariko Village, Johto',
  members: [
    {
      characterId: 'merciless_medic',
      name: 'Reggie',
    },
    {
      characterId: 'hecotoro',
      name: 'Reina',
    },
    {
      characterId: 'mdebourg',
      name: 'Andy',
    },
  ],

  calendar: {
    start: '2022-08-12',
    allDay: true,
  },

  extras: {
    host: {
      id: 'kyuukestu',
      name: 'kyuukestu',
      hostType: 'character',
    },
  },
} satisfies EventInstance
