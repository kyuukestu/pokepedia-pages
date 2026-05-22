import type { CharacterMeta } from '@/types/character'

const meta: CharacterMeta = {
  id: 'azumi',
  name: { full: 'Azumi Tawa', short: ['Azumi'], nicknames: [] },
  region: 'kalos',
  trainerClass: { primary: 'battler' },
  color: '#f05656',
  image: { src: 'azumi.png', config: { position: 'center center', scale: 1 } },
  category: 'oc',
  age: 21,
  badges: {},
  gender: 'female',
  height: '5 ft 4 in',
  occupationRoles: {
    primary: 'Officer', //Swap this out for a Ranger Equivalent
  },
}

export default meta
