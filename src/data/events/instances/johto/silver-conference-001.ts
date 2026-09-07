import type { EventInstance } from '@/types/events'

export default {
  id: 'silver-conference-001',
  eventId: 'conference',
  region: ['johto'],
  title: 'Silver Conference',

  participants: null,

  location: 'Indigo Plateau',

  image: 'https://i.redd.it/zvrl9l60jkvz.jpg',

  calendar: {
    start: '2022-10-10T00:00:00',
    end: '2022-10-14T00:00:00',
    allDay: true,
  },

} satisfies EventInstance
