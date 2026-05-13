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

export type AcademicRole =
  | 'professor' // Lead of a lab or department
  | 'researcher' // Independent scholar/specialist
  | 'assistant' // Aide to a professor (e.g., Hop, Bianca, Tracy)
  | 'historian' // Specialized in lore/archeology
  | 'engineer' // Tech/Invention focus (e.g., Colress, Clemont)

export type AcademicRank =
  | 'lead' // Head of a specific project or lab
  | 'senior' // Established career academic
  | 'junior' // Early career
  | 'emeritus' // Retired but retains title for honorary/consultation purposes
  | 'fellow' // Guest or temporary researcher

export type AcademicStatus = 'active' | 'retired' | 'missing' | 'deceased' | 'hiatus'

export interface AcademiaData {
  role: AcademicRole
  rank: AcademicRank
  status: AcademicStatus
  topic: string
  field?: string
  notableWorks?: string[]
  bulba?: string
}

export type CharacterType = 'npc' | 'oc'

export const CharacterTypeLabels: Record<CharacterType, string> = {
  npc: 'NPC',
  oc: 'OC',
}

export type NameVariants = {
  full: string
  short?: string[]
  nickname?: string[]
}

export type ImageDetails = {
  src: string
  type?: string
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
  academia?: AcademiaData
  color?: string // Vuetify color class or hex
  age?: number
  gender?: Gender
  affiliation?: OrgAffiliation[]
  tabs?: string[]
  summary?: string
  ribbons?: RibbonCollection
  badges?: BadgeCollection
  gallery?: ImageDetails[]
}

export interface PersonalityData {
  bio: string
  traits: string[]
  history: string
}
