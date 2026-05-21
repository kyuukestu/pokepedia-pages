export type LoreCategoryId = 'regions' | 'history' | 'mechanics' | 'factions'

export interface LoreArticle {
  id: string
  title: string
  category: LoreCategoryId
  icon: string
  color: string
  lastUpdated: string
  summary: string
  tags: string[]
  to: string
}

export interface LoreCategory {
  id: string
  label: string
  icon: string
}
interface PokemonExample {
  name: string
  sprite: string
  level: string
}

export interface ExampleTrainer {
  name: string
  sourceGame?: string
  highest?: PokemonExample
  lowest?: PokemonExample
  // Structural fallback tags for dynamic character database scanning
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
