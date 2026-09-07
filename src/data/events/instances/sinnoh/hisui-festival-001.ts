import type { EventInstance } from '@/types/events'

export default {
  id: 'hisui-festival-001',
  eventId: 'hisui-festival',
  region: ['sinnoh'],
  title: 'Hisui Festival',

  location: 'Canalave, Sinnoh',

  participants: [
    {
      characterId: 'merciless_medic',
      name: 'Naka',
    },
    {
      characterId: 'merciless_medic',
      name: 'Cole',
    },
    {
      characterId: 'merciless_medic',
      name: 'Ramona',
    },
    {
      characterId: 'merciless_medic',
      name: 'Reggie',
    },
    {
      characterId: 'therealswirled',
      name: 'Wilford',
    },
  ],

  calendar: {
    start: '',
    allDay: true,
  },
} satisfies EventInstance
