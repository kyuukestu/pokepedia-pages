
import type { EventInstance } from '@/types/events'

export default {
  id: 'heahea-001',
  eventId: 'contest',

  location: 'Heahea City Contest Hall, Alola',

  members: [
    { characterId: 'G' },
    { characterId: 'James' },
  ],

  calendar: {
    start: '2026-08-05T13:00:00Z',
    allDay: false,
  },

  extras: {
    competitions: [
      {
        name: 'Heahea Singles Brilliant Stage',
        type: 'contest',
        judgementType: 'judged',
        format: 'single',
        notes:
          'Standard Singles Format. Consists of the Performance Stage (Appeal) followed by the Battle Stage.',
      },
    ],

    rewards: [
      {
        rewardType: 'ribbon',
        name: 'Heahea Ribbon',
        isSecret: false,
      },
    ],

    requirements: {
      description:
        'Singles Format only. Entrants must present their Contest Pass upon registration.',
    },
  },
} satisfies EventInstance
