import type { EventInstance } from '@/types/events'

export default {
  id: 'palmpona-run-2026',
  eventId: 'running-of-the-tauros',

  location: 'Palmpona Streets, Johto',

  members: null,

  calendar: {
    start: '2026-05-07T18:00:00Z',
    allDay: false,
  },

  extras: {
    competitions: [
      {
        name: 'The Palmpona Dash',
        type: 'race',
        judgementType: 'timed',
        notes:
          'Objective: Be the first to touch a Tauros horn. Participants must navigate the herd without being trampled.',
      },
    ],

    rewards: [
      {
        rewardType: 'item',
        name: 'Tauros Trophy',
        isSecret: false,
      },
    ],

    requirements: {
      description:
        'No species restrictions for trainers, but extreme physical durability is recommended. High risk of injury.',
    },

    metadata: {
      hazard_level: 'High',
      event_type: 'Urban Stampede',
    },
  },
} satisfies EventInstance
