export type CharacterDashboardDTO = {
  // One-to-one with the SQL dashboard
  id: string
  slug: string

  full_name: string
  short_names: string[]
  nicknames: string[]

  origin_region_id: string
  origin_region_name: string

  current_region_id: string
  current_region_name: string

  category: string

  age: number | null
  dob: string | null
  gender: string | null
  height: string | null

  summary: string | null

  color: string | null
  image_src: string | null
  image_type: string | null

  external_sheet_url: string | null

  pokemon_active: PokemonDTO[]

  pokemon_owned_current: PokemonHistoryDTO[]
  pokemon_history: PokemonHistoryDTO[]

  character_badges: CharacterBadgeDTO[]
  character_ribbons: CharacterRibbonDTO[]

  classes: {
    id: string
    is_primary: boolean
  }[]

  titles: {
    id: string
    title: string
    is_featured: boolean
    awarded_date: string | null
  }[]
}

export type CharacterDashboard = {
  // Modified Dashboard for display/presentation
  character: CharacterCore
  pokemon: PokemonSection
  achievements: AchievementSection
  activity: ActivitySection
  media: MediaSection
}

export type CharacterCore = {
  id: string
  slug: string

  full_name: string
  short_names: string[]
  nicknames: string[]

  category: string
  age: number | null
  dob: string | null
  gender: string | null
  height: string | null

  summary: string | null

  image_src: string | null
  color: string | null

  external_sheet_url: string | null

  region: {
    origin: {
      id: string
      name: string
    }
    current: {
      id: string
      name: string
    }
  }

  classes: {
    id: string
    is_primary: boolean
  }[]

  titles: {
    id: string
    title: string
    is_featured: boolean
    awarded_date: string | null
  }[]
}

export type PokemonSection = {
  active_party: PokemonDTO[]
  owned_current: PokemonHistoryDTO[]
  history: PokemonHistoryDTO[]
}

export type PokemonDTO = {
  id: string

  alpha: boolean
  shiny: boolean

  caught_at: string | null

  full_name: string | null
  short_names: string[]
  nicknames: string[]

  species_name: string | null
  species_id: number | null

  gender: string | null
}

export type PokemonHistoryDTO = {
  id: string
  pokemon_id: string
  character_id: string
  start_date: string
  end_date: string | null
}

export type AchievementSection = {
  badges: CharacterBadgeDTO[]

  ribbons: CharacterRibbonDTO[]

  tournament_results: TournamentResultDTO[]
}

export type CharacterBadgeDTO = {
  id: string
  obtained_date: string

  badge_id: string
  badge_name: string

  gym_id: string
  gym_name: string

  region: string
  region_id: string

  variant_id: string
  variant_name: string

  image_url: string | null

  issuer?: {
    id: string | null
    full_name: string | null
  } | null
}

export type CharacterRibbonDTO = {
  id: string
  character_id: string
  obtained_date: string

  ribbon_id: string
  ribbon_name: string

  region: string
  region_id: string

  image_url: string | null
}

export type TournamentResultDTO = {
  event_id: string
  placement: string
}

export type AchievementPanelProps = {
  badgeCases: BadgeCase[]
  ribbonCases: RibbonCase[]
}

export type BadgeCase = {
  region: string
  badges: CharacterBadgeDTO[]
}

export type RibbonCase = {
  category?: string
  ribbons: CharacterRibbonDTO[]
}

export type CharacterBadge = {
  id: string
  region: string

  variant_name: string
  image_url?: string

  issuer_name?: string

  obtained_date: string
}

export type CharacterBadgeExpanded = CharacterBadge & {
  badge: {
    name: string
    region: string
  }
  issuer: {
    id: string
    full_name: string
  } | null
}

export type CharacterRibbon = {
  id: string
  character_id: string
  category: string
  ribbon_id: string
  obtained_date: string
}

export type ActivitySection = {
  events: {
    slug: string
    title: string
    category: string
    region: string
    date?: string
  }[]

  timeline: {
    type: 'event' | 'battle' | 'capture' | 'evolution'
    ref_id: string
    timestamp: string
  }[]
}

export type MediaSection = {
  images: {
    url: string
    type: 'art' | 'sprite' | 'scene'
  }[]
}
