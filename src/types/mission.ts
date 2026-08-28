export type QuestType = 'mission' | 'pokejob'

export type QuestStatus = 'draft' | 'available' | 'active' | 'completed' | 'expired' | 'disabled'

export type QuestCategory =
  | 'combat'
  | 'investigation'
  | 'exploration'
  | 'rescue'
  | 'escort'
  | 'delivery'
  | 'collection'
  | 'capture'
  | 'protection'
  | 'research'
  | 'training'
  | 'social'
  | 'emergency'
  | 'miscellaneous'

export type QuestRepeatability =
  | 'one-time'
  | 'repeatable'
  | 'daily'
  | 'weekly'
  | 'seasonal'
  | 'recurring'

export interface Quest {
  id: string
  title: string

  type: QuestType
  category: QuestCategory
  status: QuestStatus

  description: string

  location: QuestLocation

  issuer?: QuestIssuer

  objectives: QuestObjective[]

  requirements?: QuestRequirement[]

  notes?: string[]

  rewards: QuestReward[]

  tags?: string[]

  repeatability?: QuestRepeatability
  cooldown?: number

  availableFrom?: string
  availableUntil?: string

  createdAt: string
  updatedAt: string
}

export interface QuestLocation {
  region: string
  city?: string
  route?: string
  area?: string
}

export interface QuestIssuer {
  name: string
  type?: 'individual' | 'organization' | 'government' | 'company' | 'anonymous'
  description?: string
}

export interface QuestObjective {
  id: string
  description: string

  /**
   * Optional classification for filtering or future automation.
   * The description remains the authoritative RP-facing objective.
   */
  type?: QuestCategory

  optional?: boolean
}

export interface QuestRequirement {
  id: string
  description: string

  /**
   * Optional structured requirement data.
   * Allows the frontend/backend to evaluate requirements automatically
   * without preventing unusual RP-specific requirements.
   */
  type?:
    | 'trainer-rank'
    | 'pokemon'
    | 'pokemon-type'
    | 'pokemon-move'
    | 'item'
    | 'character'
    | 'organization'
    | 'quest'
    | 'participants'
    | 'custom'

  value?: unknown
}

export interface QuestReward {
  id: string
  description: string

  type?:
    | 'currency'
    | 'item'
    | 'pokemon'
    | 'experience'
    | 'reputation'
    | 'rank-points'
    | 'mission-points'
    | 'unlock'
    | 'narrative'
    | 'custom'

  value?: unknown
}
