import { CharacterMeta } from '@/types/character'

const meta: CharacterMeta = {
  id: 'lusamine',
  trainerClass: { primary: 'researcher' },
  category: 'npc',
  name: { full: 'Lusamine', short: ['Lusamine'] },
  region: 'alola',
  image: {
    src: 'https://archives.bulbagarden.net/media/upload/thumb/4/4a/Sun_Moon_Lusamine.png/150px-Sun_Moon_Lusamine.png',
  },
  academia: {
    role: 'researcher',
    rank: 'lead',
    status: 'active',
    topic: 'Ultra Space',
    field: 'Extra-Dimensional Studies',
  },
}
export default meta
