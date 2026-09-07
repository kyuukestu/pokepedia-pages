import type { EventInstance } from '@/types/events'

export default {
  id: 'exeggutor-isle-001',
  eventId: 'contest',
  title: 'Exeggutor Isle Contest',
  region: ['alola'],
  location: 'Exeggutor Island',
  image:
    'https://pbs.twimg.com/media/FqNSDUoXgAA3XE4?format=jpg&name=large',
  participants:  [
    { characterId: 'esther' },
    { characterId: 'altair' },
    { characterId: 'laurie' },
    { characterId: 'saga' },
    { characterId: 'anju' },
    { characterId: 'heizou' },
    { characterId: 'G' },
    { characterId: 'nejime' },
  ],

  calendar: {
    start: '2022-08-11T00:00:00',
    allDay: true,
  },

  threadUrl:
    'https://www.rpnation.com/threads/pokemon-exeggutor-island-contest-ended.549374/',

  
} satisfies EventInstance
