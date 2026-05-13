import { CharacterMeta } from '@/types/character'

const meta: CharacterMeta = {
  id: 'augustine-sycamore',
  trainerClass: { primary: 'researcher' },
  category: 'npc',
  name: { full: 'Augustine Sycamore', short: ['Prof. Sycamore'] },
  region: 'kalos',
  image: {
    src: 'https://archives.bulbagarden.net/media/upload/thumb/8/81/XY_Professor_Sycamore.png/800px-XY_Professor_Sycamore.png',
  },
  academia: {
    role: 'professor',
    rank: 'lead',
    status: 'active',
    topic: 'Mega Evolution & Change',
    field: 'Evolutionary Morphometry',
  },
}
export default meta
