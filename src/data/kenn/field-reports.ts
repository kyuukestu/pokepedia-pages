// src/data/kenn/field-reports.ts

import type { Article } from '@/types/kenn'

const modules = import.meta.glob<Article>(
  './field-reports/*.ts',
  {
    eager: true,
    import: 'default',
  },
)

export const fieldReports = Object.values(modules)
