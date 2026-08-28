import type { EventInstance } from '@/types/events'

export default {
  id: 'silver-conference-001',
  eventId: 'conference',

  members: null,

  location: 'Indigo Plateau',

  calendar: {
    start: '2022-10-10T00:00:00',
    end: '2022-10-14T00:00:00',
    allDay: true,
  },

  extras: {
    competitions: [
      {
        name: 'Silver Conference - 2022',
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
