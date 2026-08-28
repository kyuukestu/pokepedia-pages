import type { CharacterMeta } from '@/types/character'

const meta: CharacterMeta = {
  id: 'nakano',
  name: { full: 'Nakano Saito', short: ['Naka'] },
  titles: { primary: 'Guardian Researcher' },
  region: 'sinnoh',
  trainerClass: { primary: 'researcher', other: ['battler'] },
  color: '#f05656',
  image: { src: 'naka.png', config: { position: 'top center', scale: 1 } },
  category: 'oc',
  age: 26,
  gender: 'female',
  height: '5 ft 6 in',
  academia: {
    rank: 'senior',
    role: 'researcher',
    status: 'active',
    field: 'Pokemon Ecology, Genetics & Preservation',
    topic: 'How Ecology affects Genetics',
    notableWorks: [
      {
        category: 'FIELD REPORT',
        date: '2022-06-09',
        id: 'FR-001',
        regions: ['galar'],
        title: 'Attention: Field Survey of Motostoke and Surrounding Areas',
      },
    ],
  },
}

export default meta
