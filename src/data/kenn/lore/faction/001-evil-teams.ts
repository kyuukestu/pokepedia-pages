import type { Article } from '@/types/kenn'

export default {
  id: 'FACT-001',
  date: '2026-05-11',
  regions: [],
  category: 'LORE',
  loreCategory: 'FACTION',

  title: 'Corporations & Evil Teams',
  author: 'KENN Archives',

  icon: 'mdi-shield-account-outline',
  color: 'green-darken-2',
  lastUpdated: '05/11/2026',

  summary:
    'Government bodies, corporate conglomerates, and regional syndicates.',

  tags: ['Government', 'Silph Co', 'Criminal Elements'],

  toOverride: '/sandbox/orgs',
} satisfies Article
