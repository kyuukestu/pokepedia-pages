import type { RouteLocationRaw } from 'vue-router'

/**
 * Common Metadata for navigation elements
 */
export interface NavItem {
  title: string
  subtitle?: string
  icon: string
  to: RouteLocationRaw
  color?: string
}

/**
 * Elite Four & Gym Leader Chambers
 */
export interface Chamber {
  chamberIndex: number // 0-3 for Elite Four
  name: string
  title: string // Epithet (e.g., "The Dragon Tamer")
  specialty: string // Pokemon Type
  accentColor: string
  typeIcon: string // Path to SVG icon
  to: RouteLocationRaw
}

/**
 * Region-specific data
 */
export interface RegionSnapshot {
  name: string
  capital: string
  governance: string
  biomes: string[]
  loreSummary: string
  inspiration: {
    name: string
    link: string
  }
}

/**
 * News and RP Event Hooks
 */
export interface RPNews {
  title: string
  icon: string
  text: string
  severity?: 'info' | 'warning' | 'error' // For color coding news
}

/**
 * Federation-wide League Logistics
 */
export interface LeagueConference {
  requirement: string // e.g., "16 Badges"
  seasonStart: string // e.g., "January"
  conferenceMonth: string // e.g., "December"
  rules: string[]
}

export interface GymLeader {
  name: string
  city: string
  specialty: string
  typeIcon: string
  to: RouteLocationRaw
  color: string
  badge: string
  badgeIcon?: string
}
