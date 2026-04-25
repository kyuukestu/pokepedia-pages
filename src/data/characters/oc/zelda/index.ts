import { CharacterMeta } from '@/types/character'

const meta: CharacterMeta = {
  id: 'zelda',
  category: 'oc',
  name: {
    full: 'Zelda',
    short: ['Zel'],
  },
  badges: {
    paldea: [
      {
        gymId: 'cortondo-gym',
        leaderId: 'katy-01',
        obtained: true,
      },
      {
        gymId: 'levincia-gym',
        leaderId: 'iono-01',
        obtained: true,
      },
      {
        gymId: 'artazon-gym',
        leaderId: 'brassius-01',
        obtained: true,
      },
      {
        gymId: 'alfornada-gym',
        leaderId: 'tulip-01',
        obtained: true,
      },
    ],
  },
  ribbons: {},
  color: '#AB6DE8',
  region: 'unova',
  gender: 'female',
  trainerClass: { primary: 'battler' },
  occupationRoles: {
    primary: 'Musician',
  },
}

export default meta
