import { CharacterMeta } from '@/types/character'

const meta: CharacterMeta = {
  id: 'professor-elm',
  trainerClass: { primary: 'researcher' },
  category: 'npc',
  name: { full: 'Elm', short: ['Prof. Elm'] },
  region: 'johto',
  image: {
    src: 'https://archives.bulbagarden.net/media/upload/e/ec/HeartGold_SoulSilver_Professor_Elm.png',
  },
  academia: {
    role: 'professor',
    rank: 'lead',
    status: 'active',
    topic: 'Pokémon Breeding, Evolution & Abilities',
    field: 'Developmental Biology',
  },
}
export default meta
