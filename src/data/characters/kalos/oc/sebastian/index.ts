import type { CharacterMeta } from '@/types/character'

const meta: CharacterMeta = {
  id: 'sebastian',
  name: { full: 'Sebastian Yu', short: ['Sebastian'], nicknames: ['Seb', 'Yuyu'] },
  region: 'kalos',
  trainerClass: { primary: 'battler' },
  color: '#f05656',
  image: { src: 'sebastian.png', config: { position: 'center center', scale: 1 } },
  category: 'oc',
  age: 21,
  badges: {},
  gender: 'male',
  height: '6 ft 2 in',
  occupationRoles: {
    primary: 'Model', //Swap this out for a Ranger Equivalent
  },
}

export default meta
