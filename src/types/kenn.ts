// @/data/news-articles.ts
import { Region } from './region'

export interface Article {
  id: string
  slug: string
  date: string
  region: Region
  category: 'BREAKING' | 'FIELD REPORT' | 'EDITORIAL' | 'INTEL'
  title: string
  author: string
  summary: string
  content?: ContentBlock[] // Full text for the detail page
  image?: string
  tags?: string[]
  links?: { label: string; link: string }[]
}

export interface ArticleReference {
  id: string
  slug: string
  title: string
  date: string
  category: 'BREAKING' | 'FIELD REPORT' | 'EDITORIAL' | 'INTEL'
  region: Region
  color?: string // Allows the preview card to match the article's theme
  summary?: string // Optional: for a "brief" text preview
}
// The individual types of blocks available
export type BlockType = 'paragraph' | 'subheading' | 'list' | 'quote' | 'image' | 'label'

export interface ContentBlock {
  type: BlockType
  text?: string // Used for paragraphs, subheadings, quotes
  items?: string[] // Used specifically for lists
  author?: string // Optional for quotes
  src?: string // Optional for in-body images
  caption?: string // Optional for in-body images
  color?: string
}
