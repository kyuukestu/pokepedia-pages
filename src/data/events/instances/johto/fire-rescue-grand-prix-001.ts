import type { EventInstance } from '@/types/events'

export default {
  id: 'fire-rescue-grand-prix-001',
  eventId: 'fire-rescue-grand-prix',
  region: ['johto'],
  title: 'Fire Rescue Grand Prix',  

  location: 'Goldengate',
  
  participants: null,

  calendar: {
    start: '',
    allDay: false,
  },

  description:
    "A multi-stage competition designed to test a team of Pokémon's synergy, speed, and firefighting capabilities. Teams must navigate simulated disasters, rescue victims, and extinguish controlled blazes to prove their utility in emergency services.",
  bulba:
    "https://bulbapedia.bulbagarden.net/wiki/Fire_and_Rescue_Grand_Prix",

 
} satisfies EventInstance
