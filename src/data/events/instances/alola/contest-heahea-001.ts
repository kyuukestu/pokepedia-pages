
import type { EventInstance } from '@/types/events'

export default {
  id: 'heahea-001',
  eventId: 'contest',
  title: 'Heahea Contest',
  location: 'Heahea City Contest Hall, Alola',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT63gkKgUJ7FaqFrio3AKNRMiCQUlRkcBUoRJ14t5QtRbp4i63R_gmkOVk&s=10',
  region: ['alola'],

  participants: [
    { characterId: 'G' },
    { characterId: 'James' },
  ],

  calendar: {
    start: '2026-08-05T13:00:00Z',
    allDay: false,
  },

  
} satisfies EventInstance
