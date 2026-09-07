import type { EventInstance } from '@/types/events'

export default {
  id: 'tour-de-alto-mare-001',
  eventId: 'tour-de-alto-mare',

  location: 'Alto Mare',
  region: ['johto'],
  title: 'Tour de Alto Mare',

  participants: [
    {
      characterId: 'kyuukestu',
      name: 'Esther',
    },
  ],

  calendar: {
    start: '',
    allDay: true,
  },
} satisfies EventInstance
