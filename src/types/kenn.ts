// @/data/news-articles.ts
import { AllRegions } from './region'

export type LoreCategoryId = 'REGION' | 'HISTORY' | 'MECHANIC' | 'FACTION'

export interface LoreCategory {
  id: LoreCategoryId
  label: string
  icon: string
}

export interface PokemonExample {
  name: string
  sprite: string
  level: string
}

export interface ExampleTrainer {
  name: string
  sourceGame?: string
  highest?: PokemonExample
  lowest?: PokemonExample
  isCustomCharacter?: boolean
  characterId?: string
  characterType?: 'oc' | 'npc'
}

export interface TrainerTier {
  id: string
  name: string
  levelRange: string
  minLevel: number
  maxLevel: number
  icon: string
  color: string
  description: string
  isElite: boolean
  examples: string[] | ExampleTrainer[]
}

// Unified Article Categories
export type ArticleCategory = 'NEWS' | 'FIELD REPORT' | 'OPINION' | 'LORE'

export type BlockType = 'paragraph' | 'subheading' | 'list' | 'quote' | 'image' | 'label'

export interface ContentBlock {
  type: BlockType
  text?: string
  items?: string[]
  author?: string
  src?: string
  caption?: string
  color?: string
}

export interface Article {
  id: string
  date: string
  regions: AllRegions[]
  category: ArticleCategory
  title: string
  author: string
  summary: string
  content?: ContentBlock[]
  image?: string
  tags?: string[]
  toOverride?: string;
  links?: { label: string; link: string }[]
  
  // ── Lore Specific Extensions (Optional) ──────────────────────────────────
  loreCategory?: LoreCategoryId
  icon?: string           // Custom icon override (e.g. MDI icon name)
  color?: string          // Custom accent color string
  lastUpdated?: string    // Lore specific timestamp tracking
  trainerTiers?: TrainerTier[] // Structured trainer mechanics / roster data
}

export interface ArticleReference {
  id: string
  title: string
  date: string
  category: ArticleCategory
  regions: AllRegions[]
  color?: string
  summary?: string
  loreCategory?: LoreCategoryId
}
