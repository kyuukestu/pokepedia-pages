import type { EventInstance } from '@/types/events'

export default {
  id: 'palmpona-tauros-2026',
  eventId: 'one-on-one-tauros-competition',

  location: 'Palmpona, Johto',

  members :null,

  calendar: {
    start: '',
    allDay: true,
  },

  extras: {
    competitions: [
      {
        name: 'Horn-to-Horn Grapple',
        type: 'tournament',
        judgementType: 'bracket',
        notes:
          'Standard Palmpona rules: charging and holding only. No elemental moves allowed.',
      },
    ],

    requirements: {
      requiredItems: ['Tauros (Species-locked)'],
      description:
        'Open entry. Any trainer with a Tauros may challenge the current victor.',
    },

    metadata: {
      victoryCondition: 'Last trainer standing',
      customType: 'Strength Trial',
    },
  },
} satisfies EventInstance
