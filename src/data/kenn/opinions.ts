// src/data/kenn/lore.ts

import type { Article } from '@/types/kenn'

const modules = import.meta.glob<Article>(
  './opinions/*.ts',
  {
    eager: true,
    import: 'default',
  },
)

export const opinions = Object.values(modules)
