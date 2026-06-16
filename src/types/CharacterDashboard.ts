export type CharacterDashboardDTO = {
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
  image_src: string | null
  color: string | null

  region: {
    id: string
    name: string
  }

  classes: {
    id: string
    is_primary: boolean
  }[]

  titles: string[]
  nicknames: string[]
}

export type PokemonSection = {
  active_party: PokemonDTO[]
  box: PokemonDTO[]
  history_preview: PokemonHistoryDTO[]
}

export type PokemonDTO = {
  id: string
  species_id: number
  species_name: string

  full_name?: string
  gender?: string

  shiny: boolean
  alpha: boolean
}

export type PokemonHistoryDTO = {
  pokemon_id: string
  start_date: string
  end_date: string | null
}

export type AchievementSection = {
  badges: {
    region: string
    gym_id: string
    obtained: boolean
  }[]

  ribbons: {
    region: string
    ribbon_id: string
  }[]

  tournament_results: {
    event_id: string
    placement: string
  }[]
}

export type AchievementBadgeDTO = {
  id: string
  character_id: string
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
  }
}

export type AchievementRibbonDTO = {
  region: string
  ribbon_id: string
}

export type AchievementPanelProps = {
  badgeCases: BadgeCase[]
  ribbonCases: RibbonCase[]
}

export type BadgeCase = {
  region: string
  badges: AchievementBadgeDTO[]
}

export type RibbonCase = {
  category?: string
  ribbons: AchievementRibbonDTO[]
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
