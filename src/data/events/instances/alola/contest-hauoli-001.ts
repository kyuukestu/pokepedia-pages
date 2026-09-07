
import type { EventInstance } from '@/types/events'

export default {
  id: 'hauoli-001',
  eventId: 'contest',
  title: 'Hau\'oli Contest',
  location: "Hau'oli City",
  region: ['alola'],
  image: 'https://pbs.twimg.com/media/DtsvNtaUUAAfWae.jpg', 
  participants: null,

  calendar: {
    start: '2022-08-23T00:00:00',
    allDay: true,
  },


} satisfies EventInstance
