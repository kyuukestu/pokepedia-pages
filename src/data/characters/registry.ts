import { RegistryEntry, CharacterMeta } from '@/types/character'
import { ResearcherEntry } from '@/types/academia'
import { ObliviaRegistry } from './oblivia/oblivia-registry'
import { KantoRegistry } from './kanto/kanto-registry'
import { JohtoRegistry } from './johto/johto-registry'
import { HoennRegistry } from './hoenn/hoenn-registry'
import { SinnohRegistry } from './sinnoh/sinnoh-registry'
import { UnovaRegistry } from './unova/unova-registry'
import { KalosRegistry } from './kalos/kalos-registry'
import { AlolaRegistry } from './alola/alola-registry'
import { PaldeaRegistry } from './paldea/paldea-registry'

const allCharacterMeta: CharacterMeta[] = [
  ...ObliviaRegistry,
  ...KantoRegistry,
  ...JohtoRegistry,
  ...HoennRegistry,
  ...SinnohRegistry,
  ...UnovaRegistry,
  ...KalosRegistry,
  ...AlolaRegistry,
  ...PaldeaRegistry,
] as CharacterMeta[]

// Now you can map it cleanly
export const autoRegistry: RegistryEntry[] = allCharacterMeta.map((char) => ({
  id: char.id,
  category: char.category,
  name: char.name,
  region: char.region,
  image: char.image,
  trainerClass: char.trainerClass,
}))

export const ResearcherRegistry: ResearcherEntry[] = allCharacterMeta
  .filter((char) => char.academia) // Only include those with academic data
  .map((char) => ({
    id: char.id,
    category: char.category,
    name: char.name,
    region: char.region,
    image: char.image,
    trainerClass: char.trainerClass,
    // We safely re-inject the academia block here
    academia: char.academia!,
  }))
