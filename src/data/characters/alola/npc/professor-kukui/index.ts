import { CharacterMeta } from '@/types/character'

const meta: CharacterMeta = {
  id: 'professor-kukui',
  trainerClass: { primary: 'researcher' },
  category: 'npc',
  name: { full: 'Kukui', short: ['Prof. Kukui'] },
  region: 'alola',
  image: {
    src: 'https://archives.bulbagarden.net/media/upload/thumb/e/ed/Sun_Moon_Professor_Kukui.png/800px-Sun_Moon_Professor_Kukui.png',
  },
  academia: {
    role: 'professor',
    rank: 'lead',
    status: 'active',
    topic: 'Pokémon Attacks',
    field: 'Ethology',
  },
}

export default meta
