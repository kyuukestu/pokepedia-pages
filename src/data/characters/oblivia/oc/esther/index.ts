import type { CharacterMeta } from '@/types/character'

const meta: CharacterMeta = {
  id: 'esther',
  name: { full: 'Esther Rosana Sophys', short: ['Esther'], nicknames: ['Essy', 'Rosa', 'Roxy'] },
  region: 'oblivia',
  trainerClass: { primary: 'coordinator', other: ['battler'] },
  color: '#f05656',
  image: { src: 'esther.png', config: { position: 'top center', scale: 1 } },
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
  height: '5 ft 6 in',
  occupationRoles: {
    primary: 'dancer',
  },
}

export default meta
