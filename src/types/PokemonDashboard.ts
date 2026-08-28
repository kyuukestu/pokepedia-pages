export type PokemonDashboardDTO = {
  id: string

  full_name: string
  species_name: string
  gender: string | null

  alpha: boolean
  shiny: boolean

  builds: PokemonBuildDTO[]

  ownership_history: PokemonHistoryDTO[]
}

export type PokemonBuildDTO = {
  id: string
  is_default: boolean

  level: number
  ability: string
  held_item: string | null

  moves: PokemonBuildMoveDTO[]
}

export type PokemonBuildMoveDTO = {
  id: string
  build_id: string

  move: string
  slot_order: number
}

export type PokemonHistoryDTO = {
  id: string

  pokemon_id: string
  pokemon_name: string | null

  character_id: string
  character_name: string | null

  start_date: string
  end_date: string | null
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
