import type { PokemonMember } from '@/types/pokemon'

const pokemon: PokemonMember[] = [
  {
    name: {
      full: 'Pyrrha Achilleia Astierra',
      short: ['Pyrrha'],
    },
    speciesId: 'jangmo-o',
    level: 26,
    ability: 'Overcoat',
    gender: 'female',
    shiny: false,
    alpha: false,
    heldItem: 'Everstone',
  },
  {
    speciesId: 'houndour',
    ability: 'Unnerve',
    alpha: true,
    gender: 'female',
    level: 26,
    name: {
      full: 'Halay-Alae Huaka’i Pöncu',
      short: ['Halay-Alae'],
    },
  },
  {
    speciesId: 'munna',
  },
  {
    speciesId: 'bounsweet',
  },
  {
    speciesId: 'zigzagoon-galarian',
  },
  {
    speciesId: 'goomy',
  },
  {
    speciesId: 'surskit',
  },
  {
    speciesId: 'shellos',
  },
  {
    speciesId: 'feebas',
    shiny: true,
  },
  {
    speciesId: 'drifloon',
  },
  {
    speciesId: 'spinarak',
  },
]

export default pokemon
