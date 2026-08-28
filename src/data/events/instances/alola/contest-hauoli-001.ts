
import type { EventInstance } from '@/types/events'

export default {
  id: 'hauoli-001',
  eventId: 'contest',

  location: "Hau'oli City",

  members: null,

  calendar: {
    start: '2022-08-23T00:00:00',
    allDay: true,
  },

  extras: {
    competitions: [
      {
        type: 'contest',
        judgementType: 'judged',
        standings: [],
      },
    ],
  },
} satisfies EventInstance
