// AUTO-GENERATED FILE
// Do not edit manually.

import conference from '../categories/conference'
import contest from '../categories/contest/contests'
import ecological_disaster from '../categories/ecology/disaster'
import other from '../categories/other'
import pokemon_festival from '../categories/festivals/pokemon'
import showcase from '../categories/showcase'
import standard_race from '../categories/race/standard'
import standard_tournament from '../categories/tournaments/standard'
import theme_festival from '../categories/festivals/theme'
import theme_performance from '../categories/performance/theme'
import theme_race from '../categories/race/theme'
import theme_tournament from '../categories/tournaments/theme'
import type_tournament from '../categories/tournaments/type'

export const eventCategories = [
  conference,
  contest,
  ecological_disaster,
  other,
  pokemon_festival,
  showcase,
  standard_race,
  standard_tournament,
  theme_festival,
  theme_performance,
  theme_race,
  theme_tournament,
  type_tournament,
] as const

export type EventCategoryId =
  | 'conference'
  | 'contest'
  | 'ecological-disaster'
  | 'other'
  | 'pokemon-festival'
  | 'showcase'
  | 'standard-race'
  | 'standard-tournament'
  | 'theme-festival'
  | 'theme-performance'
  | 'theme-race'
  | 'theme-tournament'
  | 'type-tournament'
