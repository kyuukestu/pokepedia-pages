import type { NavItem, RPNews } from './wiki'

export type MainRegions =
  | 'indigo'
  | 'kanto'
  | 'johto'
  | 'hoenn'
  | 'sinnoh'
  | 'unova'
  | 'kalos'
  | 'alola'
  | 'galar'
  | 'paldea'

export const MainRegionLabels: Record<MainRegions, string> = {
  indigo: 'Indigo',
  kanto: 'Kanto',
  johto: 'Johto',
  hoenn: 'Hoenn',
  sinnoh: 'Sinnoh',
  unova: 'Unova',
  kalos: 'Kalos',
  alola: 'Alola',
  galar: 'Galar',
  paldea: 'Paldea',
}

export type SideRegions =
  | 'fiore'
  | 'almia'
  | 'oblivia'
  | 'ferrum'
  | 'orre'
  | 'orangeIslands'
  | 'decoloreIslands'

export const SideRegionLabels: Record<SideRegions, string> = {
  fiore: 'Fiore',
  almia: 'Almia',
  oblivia: 'Oblivia',
  ferrum: 'Ferrum',
  orre: 'Orre',
  orangeIslands: 'Orange Islands',
  decoloreIslands: 'Decolore Islands',
}

export type Region = MainRegions | SideRegions | 'unknown'

export const RegionLabels: Record<Region, string> = {
  ...MainRegionLabels,
  ...SideRegionLabels,
  unknown: 'Unknown',
}

export interface RegionTag {
  label: string
  color: string
}

export interface RegionTrait {
  label: string
  icon: string
}

export interface RegionStat {
  label: string
  value: string
}

export interface RegionManifest {
  id: string
  name: string
  tagline: string
  icon: string
  themeColor: string
  tags: RegionTag[]
  traits: RegionTrait[]
  stats: RegionStat[]
  description: string
  loreSnippet: string
  news?: RPNews[]
  subdirectories: NavItem[]
  realWorldReference?: {
    text: string
    url: string
  }
}
