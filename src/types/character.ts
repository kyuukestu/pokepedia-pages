// src/types/character.ts

export type MainRegions =
  | 'indigo'
  | 'kanto'
  | 'johto'
  | 'hoenn'
  | 'sinnoh'
  | 'unova'
  | 'kalos'
  | 'alola'
  | 'galar'
  | 'paldea'

export const MainRegionLabels: Record<MainRegions, string> = {
  indigo: 'Indigo',
  kanto: 'Kanto',
  johto: 'Johto',
  hoenn: 'Hoenn',
  sinnoh: 'Sinnoh',
  unova: 'Unova',
  kalos: 'Kalos',
  alola: 'Alola',
  galar: 'Galar',
  paldea: 'Paldea',
}

export type SideRegions =
  | 'fiore'
  | 'almia'
  | 'oblivia'
  | 'ferrum'
  | 'orre'
  | 'orangeIslands'
  | 'decoloreIslands'

export const SideRegionLabels: Record<SideRegions, string> = {
  fiore: 'Fiore',
  almia: 'Almia',
  oblivia: 'Oblivia',
  ferrum: 'Ferrum',
  orre: 'Orre',
  orangeIslands: 'Orange Islands',
  decoloreIslands: 'Decolore Islands',
}

export type Region = MainRegions | SideRegions | 'unknown'

export const RegionLabels: Record<Region, string> = {
  ...MainRegionLabels,
  ...SideRegionLabels,
  unknown: 'Unknown',
}

export type TrainerClass =
  | 'coordinator'
  | 'researcher'
  | 'athlete'
  | 'ranger'
  | 'performer'
  | 'battler'

export const TrainerClassLabels: Record<TrainerClass, string> = {
  coordinator: 'Coordinator',
  researcher: 'Researcher',
  athlete: 'Athlete',
  ranger: 'Ranger',
  performer: 'Performer',
  battler: 'Battler',
}

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

export type CharacterType = 'npc' | 'oc'

export const CharacterTypeLabels: Record<CharacterType, string> = {
  npc: 'NPC',
  oc: 'OC',
}

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

export type NameVariants = {
  full: string
  short?: string[]
}

export interface RegistryEntry {
  id: string // folder name (e.g., 'falkner')
  category: CharacterType
  name: NameVariants
  region: Region
  trainerClass: TrainerClass[]
}

export type LeagueRole =
  | { title: Extract<LeagueTitle, 'gymLeader'>; badge: string; city: string; badgeImg?: string }
  | { title: Extract<LeagueTitle, 'eliteFour'> }
  | { title: Extract<LeagueTitle, 'champion'> }
  | { title: Extract<LeagueTitle, 'aceTrainer'> }

export interface LeagueEntry extends RegistryEntry {
  leagueRoles: (LeagueRole & { type: TypeSpecialty })[]
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
  ribbons?: number
  badges?: number
}

export interface PersonalityData {
  bio: string
  traits: string[]
  history: string
}
