import { PokemonMember } from '@/types/pokemon'

export const pokemon: PokemonMember[] = [
  {
    speciesId: 'charizard',
    name: {
      short: ['Charo'],
      full: 'Charo',
    },
    gender: 'male',
    ability: 'blaze',
    moves: [
      'air-slash',
      'flamethrower',
      'dragon-claw',
      'fire-spin',
      'sunny-day',
      'dragon-dance',
      'iron-tail',
      'thunder-punch',
    ],
  },
  {
    speciesId: 'volcarona',
    name: {
      short: ['Kael'],
      full: 'Kael',
    },
    gender: 'male',
    ability: 'flame-body',
    moves: [
      'quiver-dance',
      'giga-drain',
      'bug-buzz',
      'heat-wave',
      'fire-spin',
      'whirlwind',
      'air-slash',
      'will-o-wisp',
    ],
  },
  {
    speciesId: 'flareon',
    name: {
      short: ['Eva'],
      full: 'Eva',
    },
    gender: 'female',
    ability: 'flash-fire',
    moves: [
      'helping-hand',
      'fire-fang',
      'quick-attack',
      'baby-doll-eyes',
      'smog',
      'trailblaze',
      'body-slam',
      'baton-pass',
    ],
  },
]
