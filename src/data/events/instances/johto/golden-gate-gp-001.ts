import type { EventInstance } from '@/types/events'

export default {
  id: 'goldengate-gp-2026',
  eventId: 'fire-rescue-grand-prix',

  location: 'Goldengate, Johto',
  
  members: null,

  calendar: {
    start: '',
    allDay: false,
  },

  extras: {
    competitions: [
      {
        name: 'Round 1: House Extinguish',
        type: 'other',
        judgementType: 'timed',
        notes:
          'Teams work in concert to extinguish flames burning in a simulated house.',
      },
      {
        name: 'Round 2: The Rope Climb',
        type: 'other',
        judgementType: 'timed',
        notes:
          'Pokémon must climb a rope to retrieve a flag at the summit.',
      },
      {
        name: 'Final Round: Rescue & Recovery',
        type: 'other',
        judgementType: 'timed',
        notes:
          'Rescuing a trapped dummy from a burning structure followed by a final extinguish.',
      },
    ],

    schedule: [
      {
        time: '10:00 AM',
        activity: 'Opening Ceremony & Team Registration',
        isKeyMoment: false,
      },
      {
        time: '11:30 AM',
        activity: 'Qualifying Heat: House Extinguish',
        isKeyMoment: true,
      },
      {
        time: '03:00 PM',
        activity: 'The Grand Finale Rescue',
        isKeyMoment: true,
        location: 'Main Exhibition Arena',
      },
    ],

    requirements: {
      description:
        'A team of specialized Water, Ice, or Ground type Pokémon is recommended. Must be able to work as a cohesive unit.',
    },
  },
} satisfies EventInstance
