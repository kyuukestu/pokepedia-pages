import type { Gender, NameVariants } from '@/types/character'

export interface PokemonSpecies {
  id: string
  name: string
  origin: 'official' | 'fakemon'
  types: string[]
  abilities: string[]
  hiddenAbility?: string
  learnset?: string[]
  evolutionLineId?: string
  stage?: number
  evolutions?: EvolutionNode[]
}

export interface PokemonMember {
  speciesId: string
  name?: NameVariants
  shiny?: boolean
  alpha?: boolean
  gender?: Gender
  level?: number
  moves?: string[]
  ability?: string
  heldItem?: string
}

export interface EvolutionLine {
  id: string
  speciesIds: string[]
}

export interface EvolutionNode {
  to: string
  method: 'level' | 'item' | 'trade' | 'friendship' | 'custom'
  condition?: string
}
