import { indigo } from './indigo'
import { kanto } from './kanto'
import { johto } from './johto'
import { hoenn } from './hoenn'
import { sinnoh } from './sinnoh'
import { unova } from './unova'
import { kalos } from './kalos'
import { alola } from './alola'
import { galar } from './galar'
import { paldea } from './paldea'
import { RegionManifest } from '@/types/region'

export const regions: Record<string, RegionManifest> = {
  indigo,
  kanto,
  johto,
  hoenn,
  sinnoh,
  unova,
  kalos,
  alola,
  galar,
  paldea,
}
