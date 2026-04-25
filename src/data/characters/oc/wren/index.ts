import { CharacterMeta } from '@/types/character'

const meta: CharacterMeta = {
  id: 'wren',
  category: 'oc',
  name: {
    full: 'Wren Blackwell',
    short: [],
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
  ribbons: {},
  color: '',
  region: 'sinnoh',
  gender: 'female',
  trainerClass: { primary: 'battler' },
}

export default meta
