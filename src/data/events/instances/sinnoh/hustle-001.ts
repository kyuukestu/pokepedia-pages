import type { EventInstance } from '@/types/events'

export default {
  id: 'hustle-001',
  eventId: 'hustle',
  region: ['sinnoh'],
  title: 'Greenstation Hustle',

  location: 'Greenstation Town',

  participants: [],

  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1cRKBMUggRgQiqRaebv_LvOjJGAuKzwGkIonRmPidQA&s=10',

  calendar: {
    start: '',
    allDay: true,
  }
} satisfies EventInstance
