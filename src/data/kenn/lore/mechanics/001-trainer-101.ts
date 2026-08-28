import type { Article } from '@/types/kenn'

export default {
  id: 'MECH-001',
  date: '2026-04-15',
  regions: [],
  category: 'LORE',
  loreCategory: 'MECHANIC',

  title: 'Trainer 101: Baseline Systems',
  author: 'KENN Archives',

  icon: 'mdi-book-open-variant',
  color: 'blue-darken-2',
  lastUpdated: '04/15/2026',

  summary:
    'Administrative infrastructure: outlines Trainer IDs, Pokemon Ride Permits, etc.',

  tags: ['Permits', 'Trainer Class', 'ID Baseline'],

  toOverride: '/sandbox/trainer-101',
} satisfies Article
