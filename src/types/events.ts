// types/events.ts
import { Region } from './region'

export type EventCategories = 'tournament' | 'contest' | 'festival' | 'ecological' | 'competition' | 'other'

export interface EventDefinition {
  slug: string // 'indigo-conference'
  title: string
  category: EventCategories
  region: Region
  image: string
  generalDescription: string
  bulba?: string
}

export interface EventInstance {
  // Core Data
  eventSlug: string
  instanceId: string
  start: string
  end?: string
  allDay: boolean
  location: string
  status: 'upcoming' | 'ongoing' | 'completed' | 'postponed'
  participants: Participant[] // Your existing type
  image?: string

  // New Narrative & Connection Fields
  threadUrl?: string // Link to the actual RP thread
  hostId?: string // The character or NPC running the event
  weatherCondition?: string // Atmosphere (e.g., "Heavy Rain", "Festive Lights")

  // Modular Blocks (Optional)
  requirements?: EntryRequirements
  competitions?: CompetitionDetails[] // For Tournaments/Contests/Races
  rewards?: Reward[] // Items, Trophies, or Titles
  schedule?: ScheduleItem[] // For multi-day Festivals
  narrative?: NarrativeSummary // Post-RP "Historical" summary
  gallery?: EventMedia[]

  // Flexibility
  customDescription?: string
  metadata?: Record<string, any> // For anything truly fringe
}

interface CompetitionDetails {
  name?: string
  type: 'bracket' | 'points' | 'timed' | 'judged'
  standings?: {
    rank: number //1, 2, 3... used for display order
    participantId: string[]
    score?: string | number // "12.5s", 450, DQ, DNF, etc.
    notes?: string // e.g., "Eliminated in Round 2"
  }[]
  judges?: string[] // NPC or Player judges
  notes?: string
  format?: string
}

interface Reward {
  recipientId: string
  rewardType: 'item' | 'currency' | 'ribbon' | 'badge' | 'title'
  name: string
  isSecret?: boolean // For "Mystery Prizes"
}

interface ScheduleItem {
  date?: string
  time?: string
  activity: string
  isKeyMoment: boolean // Highlighting the "Grand Finale"
  location?: string
}

interface Participant {
  name?: string
  charId?: string // Link to character profiles
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
  levelRange?: [number, number]
  requiredItems?: string[]
  entryFee?: string
  rankRequired?: string // e.g., "Ace Trainer", "Master Coordinator"
  description?: string // e.g., "Must have at least 3 Kanto Badges"
  metadata?: Record<string, any> // For anything truly fringe
}

interface EventMedia {
  url: string
  caption?: string
  credit?: string // Artist or Player name
  isAI?: boolean
  type: 'image' | 'video'
}
