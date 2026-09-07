import type { EventInstance } from '@/types/events'

export default {
  id: 'rivers-crown-001',
  eventId: 'rivers-crown',
  title: 'Rivers Crown Festival',

  location: 'Loire de Fleuve Isle, Off the Coast of Cyllage',
  region: ['kalos'],

  participants: [],

  calendar: {
    start: '2022-08-04T00:00:00',
    end: '2022-08-13T00:00:00',
    allDay: true,
  },

  extras: {
    gallery: [
      {
        url: 'huh.png',
        caption: 'Huh?',
        type: 'image',
      },
    ],
  },
} satisfies EventInstance;
