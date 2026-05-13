import { CharacterMeta } from '@/types/character'

const meta: CharacterMeta = {
  id: 'bill-sonezaki',
  trainerClass: { primary: 'researcher' },
  category: 'npc',
  name: { full: 'Bill Sonezaki', short: ['Bill'] },
  region: 'kanto',
  image: {
    src: 'https://archives.bulbagarden.net/media/upload/thumb/0/0b/FireRed_LeafGreen_Bill.png/200px-FireRed_LeafGreen_Bill.png',
  },
  academia: {
    role: 'researcher',
    rank: 'lead',
    status: 'active',
    topic: 'Pokémon Storage',
    field: 'Digital Informatics',
  },
}
export default meta
