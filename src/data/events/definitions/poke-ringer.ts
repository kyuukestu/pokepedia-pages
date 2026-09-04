import type { EventDefinition } from '@/types/events'

export default {
  id: 'poke-ringer',
  title: 'Poké-Ringer',
  category: 'competition',
  regions: ['johto', 'sinnoh'],
  description:
    'The PokéRinger is a competitive sport where a Trainer and their Pokémon compete together as a team. During each match, competing Pokémon must retrieve a ring suspended from a hot-air balloon and deliver it to one of three hooks on the goalpost at the center of the battlefield. Trainers remain aboard hot-air balloons and direct their Pokémon while reading air currents and wind patterns to assist them. Pokémon may use their moves against opponents during the match, allowing victory by knockout as well as successful ring delivery. Trainers enter one Flying-capable Pokémon and must use the same Pokémon throughout the competition.',
  image:'https://pbs.twimg.com/media/GPyaEDnW0AAOWQd.jpg',
  bulba: 'https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9Ringer',
} satisfies EventDefinition
