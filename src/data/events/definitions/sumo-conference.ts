import { type EventDefinition } from '@/types/events.ts'

export default {
  id: 'sumo-conference',
  title: 'Sumo Conference',
  category: 'competition',
  regions: ['johto'],
  image:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUBrNCz3xkMtnF3GVeC0utQ8Qd-ojhTNsU2A&s',
  description:
    'A heavy-weight trial of strength where Pokémon compete in traditional sumo wrestling. Victory is achieved by forcing an opponent out of the ring or causing any part of their body (other than their feet) to touch the ground.',
  bulba: 'https://bulbapedia.bulbagarden.net/wiki/Sumo_Conference',
} satisfies EventDefinition;
