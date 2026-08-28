import type { Article } from '@/types/kenn'

export default {
  id: 'HIST-001',
  date: '2026-05-02',
  regions: [],
  category: 'LORE',
  loreCategory: 'HISTORY',

  title: 'RP Timeline',
  author: 'KENN Archives',

  icon: 'mdi-history',
  color: 'purple-darken-2',
  lastUpdated: '05/02/2026',

  summary:
    'A chronological display of how the RP lines up with the main-series games.',

  tags: ['Timeline', 'Canon History', 'Galar'],

  toOverride: '/sandbox/setting',
} satisfies Article
