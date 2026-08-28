// src/data/kenn/lore.ts

import type { Article } from '@/types/kenn'

const modules = import.meta.glob<Article>(
  './lore/**/*.ts',
  {
    eager: true,
    import: 'default',
  },
)

export const lore = Object.values(modules)
