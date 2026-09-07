import type { EventInstance } from '@/types/events'

export default {
  id: 'extreme-race-001',
  eventId: 'extreme-race',
  title: 'Extreme Pokémon Race',
  region: ['johto'],

  location: 'Eggseter',

  participants: [],

  calendar: {
    start: '',
    allDay: true,
  },

} satisfies EventInstance
