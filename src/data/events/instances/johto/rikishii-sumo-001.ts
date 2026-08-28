import type { EventInstance } from '@/types/events'

export default {
  id: 'rikishii-sumo-2026',
  eventId: 'sumo-conference',

  location: 'Rikishii Town, Johto',
  
  members: null,

  calendar: {
    start: '2026-05-12T09:00:00Z',
    allDay: false,
  },

  extras: {
    host: null,

    competitions: [
      {
        name: 'Rikishii Town Sumo Conference',
        type: 'tournament',
        judgementType: 'bracket',
        notes:
          'Standard Sumo Rules. Ring-outs and ground-touches result in immediate elimination.',
      },
    ],

    requirements: {
      description:
        'Pokémon must weigh at least 80 kg (176.4 lbs). Only basic physical moves are permitted; elemental/energy-based attacks are strictly prohibited.',
      metadata: {
        min_weight_kg: 80,
        allowed_move_types: ['Physical'],
      },
    },

    rewards: [
      {
        rewardType: 'item',
        name: 'King’s Rock',
        value: 1,
        isSecret: false,
      },
      {
        rewardType: 'item',
        name: 'Pokemon Food Packet',
        value: 365,
        isSecret: false,
      }
    ],

  },
} satisfies EventInstance
