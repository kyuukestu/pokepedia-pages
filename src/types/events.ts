// types/events.ts
import { AllRegions } from './region'
import type { EventDefinitionId } from '@/data/events/generated/definition-registry'
import type { EventCategoryId } from '@/data/events/generated/category-registry'

export interface HydratedEvent {
  id: string
  eventSlug: string
  title: string
  location: string
  regions: AllRegions[]
  regionDisplay: string
  image: string
  category: string
  description: string
  internalPath: string
  rawStart: string
  rawEnd: string
  start: string
  end?: string
  allDay?: boolean
  durationDays: number
  classNames?: string[]
  extendedProps?: Record<string, any>
}

export interface EventDefinition {
  id: string // 'indigo-conference'
  title: string

  category: EventCategoryId
  regions: AllRegions[]

  description?: string
  image?: string

  bulba?: string
}

export type EventCategory = {
  id: string
  name: string
  description?: string
}

export interface EventInstance {
  // Core Data
  id: string
  parentId?: string
  eventId: EventDefinitionId // Linked Event Definition

  title?: string
  region?: AllRegions[]
  location: string
  statusOverride?: EventStatusOverride
  /** Event Participants
   *
   *  NOTE: An event participant is a super-group and distinct from CompetitionParticipant for competitions within the event */
  participants: EventParticipant[] | null

  calendar: EventCalendarData

  threadUrl?: string // Link to the actual RP thread
  image?: string
  bulba?: string

  description?: string

  standings?: EventStanding[]

  extras?: EventInstanceExtras
}

export interface EventInstanceExtras {
  // Modular Blocks (Optional)
  host?: EventHost | null // The character or NPC running the event

  requirements?: EntryRequirements

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

interface EventStanding {
  rank: number //1, 2, 3... used for display order
  participantId: string // CompeitionParticipant ID
  score?: string | number // "12.5s", 450, DQ, DNF, etc.
  notes?: string // e.g., "Eliminated in Round 2"
}

export type EventParticipant = Individual | Team

export interface Individual {
  characterId: string
  name?: string
}

export interface Team {
  id: string
  name: string
  members: TeamMember[]
}

export interface TeamMember {
  characterId: string
  name?: string
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

export type EventStatusOverride = 'postponed'


  

export type HostTypes = 'character' | 'organization'

export type CompetitionType = 'tournament' | 'race' | 'contest' | 'other'

export type CompetitionFormat = 'single' | 'double' | 'triple' | 'tag-team'

export type JudgementType = 'bracket' | 'points' | 'timed' | 'judged'

export type RewardType = 'item' | 'currency' | 'ribbon' | 'badge' | 'title'
