// src/data/kenn/index.ts

import type { Article } from '@/types/kenn'

import { news } from './news'
import { fieldReports } from './field-reports'
import { opinions } from './opinions'
import { lore } from './lore'

export const articles: Article[] = [
  ...news,
  ...fieldReports,
  ...opinions,
  ...lore,
]

export function getArticle(id: string): Article | undefined {
  return articles.find(article => article.id === id)
}
