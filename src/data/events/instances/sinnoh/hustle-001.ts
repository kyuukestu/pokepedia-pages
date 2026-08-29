import type { EventInstance } from '@/types/events'

export default {
  id: 'hustle-001',
  eventId: 'hustle',

  location: 'Greenstation Town, Sinnoh',

  members: [],

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

    competitions: [
      {
        name: 'Pokémon Hustle',
        type: 'other',
        judgementType: 'timed',
        format: 'single',
        notes:
          'Each Trainer competes alongside one Pokémon of their choice. Competitors must work in tandem to navigate multiple stages of an obstacle course within the allotted time. Trainers who are knocked from the obstacle course are disqualified.',
      },
    ],
  },
} satisfies EventInstance
