import { CharacterMeta } from '@/types/character'

const meta: CharacterMeta = {
  id: 'cynthia',
  trainerClass: { primary: 'battler' },
  category: 'npc',
  name: { full: 'Cynthia', short: ['Cynthia'] },
  region: 'sinnoh',
  image: {
    src: 'https://archives.bulbagarden.net/media/upload/thumb/d/d4/Art_Life_20231027_Cynthia.jpg/1024px-Art_Life_20231027_Cynthia.jpg',
  },
  academia: {
    role: 'researcher',
    rank: 'senior',
    status: 'active',
    topic: 'Archeology',
    field: 'Mythology & History',
  },
}
export default meta
