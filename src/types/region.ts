import type { NavItem, RPNews } from './wiki'

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
