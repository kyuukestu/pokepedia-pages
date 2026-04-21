import type { CharacterMeta } from '@/types/character'

const meta: CharacterMeta = {
  id: 'leona',
  name: {
    full: 'Leona',
    short: ['Leo', 'Lea'],
  },
  region: 'unova',
  trainerClass: { primary: 'battler' },
  color: '#8f0b0b',
  image: 'leona.png',
  category: 'oc',
  affiliation: [
    {
      orgId: 'Team Rocket',
      roles: [
        {
          title: 'Admin',
          status: 'active',
        },
      ],
      primary: true,
    },
  ],
  gender: 'female',
  age: 0,
}

export default meta
