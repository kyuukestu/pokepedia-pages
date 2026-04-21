// src/types/character.ts
import type { Region } from '@/types/region'
import {
  LeagueEntry,
  CoordinatorRank,
  WCSRank,
  RangerRank,
  LeagueRole,
  TypeSpecialty,
  BadgeCollection,
} from '@/types/league'
import { RibbonCollection } from './association'

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
}

export interface RegistryEntry {
  id: string // folder name (e.g., 'falkner')
  category: CharacterType
  name: NameVariants
  region: Region
  trainerClass: { primary: TrainerClass; other?: TrainerClass[] }
}

export type AnyCharacter = RegistryEntry | LeagueEntry

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
  color?: string // Vuetify color class or hex
  image?: string // URL to main portrait
  age?: number
  gender?: Gender
  affiliation?: OrgAffiliation[]
  tabs?: string[]
  summary?: string
  ribbons?: RibbonCollection
  badges?: BadgeCollection
}

export interface PersonalityData {
  bio: string
  traits: string[]
  history: string
}
