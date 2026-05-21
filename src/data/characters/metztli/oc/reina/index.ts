import type { CharacterMeta } from '@/types/character'

const meta: CharacterMeta = {
  id: 'reina',
  name: {
    full: 'Reina Amaranta Esmeralda de la Santa Cruz Caballero Cortez',
    short: ['Reina'],
    nicknames: [],
  },
  titles: { primary: 'La Tormenta Esmeralda' },
  region: 'metztli',
  trainerClass: { primary: 'battler', other: [] },
  color: '#1DAD4D',
  image: { src: 'reina.png', config: { position: 'center center', scale: 1 } },
  category: 'oc',
  age: 17,
  badges: {
    kanto: [
      { gymId: 'pewter-gym', leaderId: 'brock-01', obtained: true },
      { gymId: 'cerulean-gym', leaderId: 'misty-01', obtained: true },
      { gymId: 'goldenrod-gym', leaderId: 'whitney-01', obtained: true },
      { gymId: 'celadon-gym', leaderId: 'erika-01', obtained: true },
      { gymId: 'fuchsia-gym', leaderId: 'janine-01', obtained: true },
    ],
    hoenn: [
      { gymId: 'rustboro-gym', leaderId: 'roxanne-01', obtained: true },
      { gymId: 'dewford-gym', leaderId: 'brawly-01', obtained: true },
      { gymId: 'mauville-gym', leaderId: 'wattson-01', obtained: true },
    ],
    johto: [
      { gymId: 'violet-gym', leaderId: 'falker-01', obtained: true },
      { gymId: 'azalea-gym', leaderId: 'bugsy-01', obtained: true },
      { gymId: 'goldenrod-gym', leaderId: 'whitney-01', obtained: true },
      { gymId: 'ecruteak-gym', leaderId: 'morty-01', obtained: true },
      { gymId: 'cianwood-gym', leaderId: 'chuck-01', obtained: true },
      { gymId: 'olivine-gym', leaderId: 'jasmine-01', obtained: true },
      { gymId: 'mahogany-gym', leaderId: 'lorelei-01', obtained: true },
    ],
  },
  gender: 'female',
  height: '5 ft 6 in',
  occupationRoles: {
    primary: 'wrestler',
  },
}

export default meta
