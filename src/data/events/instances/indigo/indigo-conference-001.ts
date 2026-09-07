import type { EventInstance } from '@/types/events'

export default {
  id: 'indigo-conference-001',
  eventId: 'conference',
  title: 'Indigo Conference',
  region: ['kanto'],
  image:
    'https://cdna.artstation.com/p/assets/images/images/026/733/310/large/ahmed-albastaki-pokemon-final.jpg?1589563198',

  participants: null,

  location: 'Indigo Plateau',

  calendar: {
    start: '2022-12-05T00:00:00',
    end: '2022-12-22T00:00:00',
    allDay: true,
  },
} satisfies EventInstance
