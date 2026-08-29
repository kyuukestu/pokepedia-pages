import type { EventInstance } from '@/types/events'

export default {
  id: 'extreme-race-001',
  eventId: 'extreme-pokemon-race',

  location: 'Eggseter, Johto',

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
        name: 'Extreme Pokémon Race',
        type: 'race',
        judgementType: 'timed',
        format: 'single',
        notes:
          'Each Trainer is pulled by their partner Pokémon on a skateboard. Competitors race through Eggseter Valley to Shelby Ranch, retrieve a dummy Pokémon Egg, and return to the starting mark with the Egg in hand.',
      },
    ],
  },
} satisfies EventInstance
