import type { CharacterMeta } from '@/types/character'

const meta: CharacterMeta = {
  id: 'esther',
  name: { full: 'Esther Rosana Sophys', short: ['Essy', 'Rosa', 'Roxy'] },
  region: 'oblivia',
  trainerClass: { primary: 'coordinator', other: ['battler'] },
  color: 'red',
  image: 'esther.png',
  category: 'oc',
  coordinatorRank: 'normal',
  age: 17,
  ribbons: { alola: [{ ribbonId: 'exeggutor-ribbon' }] },
  badges: {
    kalos: [
      { gymId: 'santalune-gym', leaderId: 'viola-01', obtained: true },
      { gymId: 'cyllage-gym', leaderId: 'grant-01', obtained: true },
    ],
  },
  gender: 'female',
  occupationRoles: {
    primary: 'dancer',
  },
}

export default meta
