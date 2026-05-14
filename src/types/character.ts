// src/types/character.ts
import type { Region } from '@/types/region'
import {
  CoordinatorRank,
  WCSRank,
  RangerRank,
  LeagueRole,
  TypeSpecialty,
  BadgeCollection,
} from '@/types/league'
import { AcademiaData } from '@/types/academia'
import { RibbonCollection } from '@/types/association'

export type TrainerClass =
  | 'coordinator'
  | 'researcher'
  | 'athlete'
  | 'ranger'
  | 'performer'
  | 'battler'
  | 'breeder'
  | 'other'

export const TrainerClassLabels: Record<TrainerClass, string> = {
  coordinator: 'Coordinator',
  researcher: 'Researcher',
  athlete: 'Athlete',
  ranger: 'Ranger',
  performer: 'Performer',
  battler: 'Battler',
  breeder: 'Breeder',
  other: 'Other',
}

export type CharacterType = 'npc' | 'oc'

export const CharacterTypeLabels: Record<CharacterType, string> = {
  npc: 'NPC',
  oc: 'OC',
}

export type NameVariants = {
  full: string
  short?: string[]
  nicknames?: string[]
}

export type Titles = {
  primary: string
  other?: string[]
}

export type ImageDetails = {
  src: string
  type?: string
  isAi?: Boolean
  config?: { position?: string; scale?: number }
}

export interface RegistryEntry {
  id: string // folder name (e.g., 'falkner')
  category: CharacterType
  name: NameVariants
  region: Region
  image?: ImageDetails
  trainerClass: { primary: TrainerClass; other?: TrainerClass[] }
}

export type Gender = 'male' | 'female' | 'undetermined' | 'non-binary' | 'other'

export type occupationRoles = {
  primary: string
  other?: string[]
}

export type OrgAffiliation = {
  orgId: string // reference key, not raw string
  roles?: {
    title: string
    status?: 'active' | 'former'
  }[] // "Gym Leader", "Admin", etc.
  primary?: boolean // main affiliation
}

export interface CharacterMeta extends RegistryEntry {
  leagueRoles?: (LeagueRole & { type: TypeSpecialty })[]
  occupationRoles?: occupationRoles
  coordinatorRank?: CoordinatorRank
  rangerRank?: RangerRank
  wcsRank?: WCSRank
  academia?: AcademiaData
  color?: string // Vuetify color class or hex
  age?: number
  gender?: Gender
  affiliation?: OrgAffiliation[]
  tabs?: string[]
  summary?: string
  ribbons?: RibbonCollection
  badges?: BadgeCollection
  externalSheet?: {
    label: string
    url: string
  }
  height?: string
  titles?: Titles
}

export interface PersonalityData {
  bio: string
  traits: string[]
  history: string
}
