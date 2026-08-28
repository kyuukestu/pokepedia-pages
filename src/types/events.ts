// types/events.ts
import { AllRegions } from './region'

export interface EventDefinition {
  id: string // 'indigo-conference'
  title: string

  category: EventCategories
  regions: AllRegions[]

  description?: string
  image: string

  bulba?: string
}

export interface EventInstance {
  // Core Data
  id: string
  eventId: string // Linked Event Definition
  title?: string

  location: string
  statusOverride?: EventStatusOverride
  /** Event Participants
   *
   *  NOTE: An event participant is a super-group and distinct from CompetitionParticipant for competitions within the event */
  members: Member[] | null

  calendar: EventCalendarData

  threadUrl?: string // Link to the actual RP thread
  image?: string
  
  description?: string

  extras?: EventInstanceExtras
}

export interface EventInstanceExtras {
  // Modular Blocks (Optional)
  host?: EventHost | null // The character or NPC running the event

  requirements?: EntryRequirements

  competitions?: Competition[] // For Tournaments/Contests/Races

  rewards?: Reward[] // Items, Trophies, or Titles

  schedule?: ScheduleItem[] // For multi-day Festivals

  narrative?: NarrativeSummary // Post-RP "Historical" summary

  gallery?: EventMedia[]

  // Flexibility
  customDescription?: string

  metadata?: Record<string, unknown> // For anything truly fringe
}

export interface EventHost {
  id: string
  name: string
  hostType?: HostTypes
}

export interface EventCalendarData {
  start: string
  end?: string
  allDay: boolean
}

interface EventMedia {
  url: string
  caption?: string
  credit?: string // Artist or Player name
  isAI?: boolean
  type: 'image' | 'video'
}

interface Competition {
  name?: string

  type: CompetitionType
  judgementType?: JudgementType
  format?: CompetitionFormat

  participants?: CompetitionParticipant[]
  standings?: CompetitionStanding[]

  judges?: CompetitionJudge[] // NPC or Player judges
  notes?: string
}

interface CompetitionStanding {
  rank: number //1, 2, 3... used for display order
  participantId: string // CompeitionParticipant ID
  score?: string | number // "12.5s", 450, DQ, DNF, etc.
  notes?: string // e.g., "Eliminated in Round 2"
}

interface CompetitionJudge {
  id: string
  name?: string
}

export interface CompetitionParticipant {
  id: string
  members?: Member[] | null
  name?: string // Mostly here for team name
}

interface Reward {
  rewardType: RewardType
  name: string
  value?: number
  isSecret?: boolean // For "Mystery Prizes"
}

interface ScheduleItem {
  date?: string
  time?: string
  activity: string
  isKeyMoment: boolean // Highlighting the "Grand Finale"
  location?: string
}

interface Member {
  characterId: string // Link to character profiles; This one is main, name is aesthetic override.
  name?: string
}

interface NarrativeSummary {
  tldr: string // One-sentence impact statement
  recap: string // Multi-paragraph "Story so far" or "What happened"
  keyMoments?: {
    // Specific turning points in the RP
    title: string
    description: string
    threadLink?: string
  }[]
  protagonists?: string[] // Major character IDs who drove the plot
}

interface EntryRequirements {
  requiredItems?: string[]
  entryFee?: string
  rankRequired?: string // e.g., "Ace Trainer", "Master Coordinator"
  description?: string // e.g., "Must have at least 3 Kanto Badges"
  metadata?: Record<string, unknown> // For anything truly fringe
}

export type EventStatus = 'upcoming' | 'ongoing' | 'completed' 

export type EventStatusOverride =
  | 'postponed'

export type EventCategories =
  | 'tournament'
  | 'contest'
  | 'conference'
  | 'showcase'
  | 'festival'
  | 'ecological'
  | 'competition'
  | 'race'
  | 'other'

export type HostTypes = 'character' | 'organization'

export type CompetitionType = 'tournament' | 'race' | 'contest' | 'other'

export type CompetitionFormat = 'single' | 'double' | 'triple' | 'tag-team'

export type JudgementType = 'bracket' | 'points' | 'timed' | 'judged'

export type RewardType = 'item' | 'currency' | 'ribbon' | 'badge' | 'title'
