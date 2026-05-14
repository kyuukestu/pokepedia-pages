import { RegistryEntry } from './character'

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

export interface ResearcherEntry extends RegistryEntry {
  academia?: AcademiaData
}
