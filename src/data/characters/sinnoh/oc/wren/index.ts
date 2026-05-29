import { CharacterMeta } from '@/types/character'

const meta: CharacterMeta = {
  id: 'wren',
  category: 'oc',
  name: {
    full: 'Wren Blackwell',
    short: ['Wren'],
  },
  badges: {
    johto: [
      {
        gymId: 'violet-gym',
        leaderId: 'falkner-01',
        obtained: true,
      },
      {
        gymId: 'azalea-gym',
        leaderId: 'bugsy-01',
        obtained: true,
      },
      {
        gymId: 'goldenrod-gym',
        leaderId: 'whitney-01',
        obtained: true,
      },
    ],
  },
  image: { src: 'wren.png' },
  ribbons: {},
  color: '',
  region: 'sinnoh',
  gender: 'female',
  trainerClass: { primary: 'battler' },
}

export default meta
