import type { EventInstance } from '@/types/events'

export default {
  id: 'sanguine-swarm',
  eventId: 'sanguine-swarm',

  location: 'Northern Johto',

  members: null,

  calendar: {
    start: '2022-08-01T00:00:00',
    end: '2022-08-15T00:00:00',
    allDay: true,
  },

  threadUrl: 'https://www.rpnation.com/threads/pokemon-sanguine-swarms-ic.560446/',

  image: 'https://static.zerochan.net/Zubat.1024.3347924.webp',
} satisfies EventInstance
