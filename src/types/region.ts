import type { NavItem, RPNews } from './wiki'

export const MAIN_REGIONS = [
  'indigo',
  'kanto',
  'johto',
  'hoenn',
  'sinnoh',
  'unova',
  'kalos',
  'alola',
  'galar',
  'paldea',
] as const

export type MainRegions = (typeof MAIN_REGIONS)[number]

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

export const SIDE_REGIONS = [
  'fiore',
  'almia',
  'oblivia',
  'ferrum',
  'orre',
  'orangeIslands',
  'decoloreIslands',
] as const

export type SideRegions = (typeof SIDE_REGIONS)[number]

export const SideRegionLabels: Record<SideRegions, string> = {
  fiore: 'Fiore',
  almia: 'Almia',
  oblivia: 'Oblivia',
  ferrum: 'Ferrum',
  orre: 'Orre',
  orangeIslands: 'Orange Islands',
  decoloreIslands: 'Decolore Islands',
}

export const CUSTOM_REGIONS = ['metztli'] as const

export type CustomRegions = (typeof CUSTOM_REGIONS)[number]

export const CustomRegionLabels: Record<CustomRegions, string> = {
  metztli: 'Metztli',
}

export const ALL_CANON_REGIONS = [...MAIN_REGIONS, ...SIDE_REGIONS] as const

export type CanonRegions = MainRegions | SideRegions

export const ALL_REGIONS = [...ALL_CANON_REGIONS, ...CUSTOM_REGIONS] as const

export type AllRegions = (typeof ALL_REGIONS)[number]

export const RegionLabels: Record<AllRegions, string> = {
  ...MainRegionLabels,
  ...SideRegionLabels,
  ...CustomRegionLabels,
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
