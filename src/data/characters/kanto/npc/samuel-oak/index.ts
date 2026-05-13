import type { CharacterMeta } from '@/types/character'

const meta: CharacterMeta = {
  id: 'samuel-oak',
  trainerClass: { primary: 'researcher' },
  category: 'npc',
  name: { full: 'Samuel Oak', short: ['Prof. Oak'] },
  region: 'kanto',
  image: {
    src: 'https://archives.bulbagarden.net/media/upload/3/3e/Lets_Go_Pikachu_Eevee_Professor_Oak.png',
  },
  academia: {
    role: 'professor',
    rank: 'emeritus',
    status: 'active',
    topic: 'Human & Pokémon Relationships',
    field: 'Sociology',
  },
}

export default meta
