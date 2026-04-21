import type { RegistryEntry } from '@/types/character'
import type { Region } from '@/types/region'

export type TypeSpecialty =
  | 'flying'
  | 'ground'
  | 'psychic'
  | 'fairy'
  | 'bug'
  | 'ghost'
  | 'dragon'
  | 'steel'
  | 'dark'
  | 'normal'
  | 'poison'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'rock'
  | 'mixed'

export type LeagueTitle = 'aceTrainer' | 'gymLeader' | 'eliteFour' | 'champion'

export const LeagueTitleLabels: Record<LeagueTitle, string> = {
  aceTrainer: 'Ace Trainer',
  gymLeader: 'Gym Leader',
  eliteFour: 'Elite Four',
  champion: 'Champion',
}

export type CoordinatorRank = 'normal' | 'top'

export const CoordinatorRankLabels: Record<CoordinatorRank, string> = {
  normal: 'Coordinator',
  top: 'Top Coordinator',
}

export type RangerRank = 'trainee' | 'normal' | 'senior' | 'area' | 'leader' | 'top'

export const RangerRankLabels: Record<RangerRank, string> = {
  trainee: 'Trainee Ranger',
  normal: 'Ranger',
  senior: 'Senior Ranger',
  area: 'Area Ranger',
  leader: 'Ranger Leader',
  top: 'Top Ranger',
}

export type WCSRank = 'normal' | 'premier' | 'great' | 'ultra' | 'master'

export const WCSRankLabels: Record<WCSRank, string> = {
  normal: 'Normal Class',
  premier: 'Premier Class',
  great: 'Great Class',
  ultra: 'Ultra Class',
  master: "Master's Eight",
}

export type LeagueRole =
  | { title: Extract<LeagueTitle, 'gymLeader'>; gymId: string }
  | { title: Extract<LeagueTitle, 'eliteFour'> }
  | { title: Extract<LeagueTitle, 'champion'> }
  | { title: Extract<LeagueTitle, 'aceTrainer'> }

export interface LeagueEntry extends RegistryEntry {
  leagueRoles: (LeagueRole & { type: TypeSpecialty })[]
}

export interface BadgeRecord {
  gymId: string
  leaderId: string
  obtained: boolean
  dateObtained?: string
}

export type BadgeCollection = Partial<Record<Region, BadgeRecord[]>>
