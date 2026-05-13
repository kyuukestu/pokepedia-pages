import { AnyCharacter } from '@/types/character'
import { ObliviaRegistry } from './oblivia/oblivia-registry'
import { KantoRegistry } from './kanto/kanto-registry'
import { JohtoRegistry } from './johto/johto-registry'
import { HoennRegistry } from './hoenn/hoenn-registry'
import { SinnohRegistry } from './sinnoh/sinnoh-registry'
import { UnovaRegistry } from './unova/unova-registry'
import { KalosRegistry } from './kalos/kalos-registry'
import { AlolaRegistry } from './alola/alola-registry'
import { PaldeaRegistry } from './paldea/paldea-registry'

// Now you can map it cleanly
export const autoRegistry: AnyCharacter[] = [
  ...ObliviaRegistry,
  ...KantoRegistry,
  ...JohtoRegistry,
  ...HoennRegistry,
  ...SinnohRegistry,
  ...UnovaRegistry,
  ...KalosRegistry,
  ...AlolaRegistry,
  ...PaldeaRegistry,
]
