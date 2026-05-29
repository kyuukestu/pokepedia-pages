import type { CharacterMeta } from '@/types/character'

const meta: CharacterMeta = {
  id: 'ron',
  name: { full: 'Ron Tawa', short: ['Ron'], nicknames: [] },
  region: 'johto',
  trainerClass: { primary: 'battler' },
  color: '#f05656',
  image: { src: 'ron.png', config: { position: 'center center', scale: 1 } },
  category: 'oc',
  age: 26,
  badges: {},
  gender: 'male',
  height: '6 ft 2 in',
  occupationRoles: {
    primary: 'Criminal', //Swap this out for a Ranger Equivalent
  },
}

export default meta
