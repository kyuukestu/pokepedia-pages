// src/data/kenn/news.ts

import type { Article } from '@/types/kenn'

const modules = import.meta.glob<Article>(
  './news/*.ts',
  {
    eager: true,
    import: 'default',
  },
)

export const news = Object.values(modules)
