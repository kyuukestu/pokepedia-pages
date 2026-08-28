import type { EventInstance } from '@/types/events'

export default {
  id: 'indigo-conference-001',
  eventId: 'conference',

  members: null,

  location: 'Indigo Plateau',

  calendar: {
    start: '2022-12-05T00:00:00',
    end: '2022-12-22T00:00:00',
    allDay: true,
  },

  extras: {
    competitions: [
      {
        name: 'Indigo Conference - 2022',
        type: 'tournament',
        judgementType: 'bracket',
        format: 'single',
        participants: [],
        standings: [],
        judges: [],
        notes: '',
      },
    ],
  },
} satisfies EventInstance
