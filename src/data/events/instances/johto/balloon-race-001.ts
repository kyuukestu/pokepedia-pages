import type { EventInstance } from '@/types/events'

export default {
  id: 'balloon-race-001',
  eventId: 'balloon-race',
  location: 'Route 39 — North of Olivine City',
  title: 'Balloon Race',

  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHsYZFUqF3bjbw2QiOSLfEC4ZwKwwgCEZ7gA&s',
  
  region: ['johto'],

  participants: [],

  calendar: {
    start: '2022-08-01T00:00:00',
    allDay: true,
  },
  statusOverride: 'postponed',

  description: 'A sky-high competition where trainers and their Pokémon navigate hot air balloons through challenging courses.',

  bulba:
    "https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Balloon_Race",
} satisfies EventInstance
