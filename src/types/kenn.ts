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

// The individual types of blocks available
export type BlockType = 'paragraph' | 'subheading' | 'list' | 'quote' | 'image'

export interface ContentBlock {
  type: BlockType
  text?: string // Used for paragraphs, subheadings, quotes
  items?: string[] // Used specifically for lists
  author?: string // Optional for quotes
  src?: string // Optional for in-body images
  caption?: string // Optional for in-body images
}
