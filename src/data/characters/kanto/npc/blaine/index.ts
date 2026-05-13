import { CharacterMeta } from '@/types/character'

const meta: CharacterMeta = {
  id: 'blaine',
  trainerClass: { primary: 'researcher' },
  category: 'npc',
  name: { full: 'Blaine', short: ['Blaine'] },
  region: 'kanto',
  image: {
    src: 'https://archives.bulbagarden.net/media/upload/thumb/c/c8/Lets_Go_Pikachu_Eevee_Blaine.png/216px-Lets_Go_Pikachu_Eevee_Blaine.png',
  },
  academia: {
    role: 'researcher',
    rank: 'senior',
    status: 'active',
    topic: 'Pokémon Ecology & Genetics',
    field: 'Genetics',
  },
}
export default meta
