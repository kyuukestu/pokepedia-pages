import { CharacterMeta } from '@/types/character'

const meta: CharacterMeta = {
  id: 'professor-sada',
  trainerClass: { primary: 'researcher' },
  category: 'npc',
  name: { full: 'Sada', short: ['Prof. Sada'] },
  region: 'paldea',
  image: {
    src: 'https://archives.bulbagarden.net/media/upload/thumb/0/0d/Scarlet_Sada.png/800px-Scarlet_Sada.png',
  },
  academia: {
    role: 'professor',
    rank: 'lead',
    status: 'deceased',
    topic: 'Paleo-technology & Paradox Pokémon',
    field: 'Archaeogenetics',
  },
}
export default meta
