import type { EventInstance } from '@/types/events'

export default {
  id: 'exeggutor-isle-001',
  eventId: 'contest',

  location: 'Exeggutor Island',

  members: [
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

  image:
    'https://pbs.twimg.com/media/FqNSDUoXgAA3XE4?format=jpg&name=large',

  extras: {
    competitions: [
      {
        type: 'contest',
        judgementType: 'judged',

        standings: [
          {
            participantId: 'heizou',
            rank: 1,
            score: '4W',
          },
          {
            participantId: 'altair',
            rank: 2,
            score: '3W-2L',
            notes: 'Runner-up',
          },
          {
            participantId: 'esther',
            rank: 3,
            score: '3W-2L',
            notes: "Loser's Bracket runner-up",
          },
          {
            participantId: 'laurie',
            rank: 4,
            score: '2W-2L',
          },
          {
            participantId: 'anju',
            rank: 5,
            score: '1W-2L',
          },
          {
            participantId: 'G',
            rank: 6,
            score: '1W-2L',
          },
          {
            participantId: 'nua',
            rank: 7,
            score: '2L',
          },
          {
            participantId: 'saga',
            rank: 8,
            score: '2L',
          },
        ],

        participants: [
              { id: 'heizou', members: [{ characterId: 'heizou' }] },
              { id: 'altair', members: [{ characterId: 'altair' }] },
              { id: 'esther', members: [{ characterId: 'esther' }] },
              { id: 'laurie', members: [{ characterId: 'laurie' }] },
              { id: 'anju', members: [{ characterId: 'anju' }] },
              { id: 'G', members: [{ characterId: 'G' }] },
              { id: 'nua', members: [{ characterId: 'nua' }] },
              { id: 'saga', members: [{ characterId: 'saga' }] },
            ],
      },
    ],
  },
} satisfies EventInstance
