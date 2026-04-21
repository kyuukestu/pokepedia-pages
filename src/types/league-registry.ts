// types/league-registry.ts

import { Region } from '@/types/region'
import { TypeSpecialty } from '@/types/league' // Your existing TypeSpecialty union

export interface GymLeaderRegistry {
  id: string // Unique ID: 'kanto-brock'
  name: string
  specialty: TypeSpecialty
  image: string // Path to the leader art
  isOc: boolean
  isActive: boolean
  typeIcon: string // e.g., 'rock.svg'
  color: string // Theme color for the card
  to?: string // Link to their page if it exists
}

export interface GymRegistry {
  id: string // Unique ID: 'pewter-gym'
  region: Region
  city: string
  badgeName: string
  badgeImg: string // The official high-res badge image
  isPrimary: boolean // false for "Secondary Leaders" like Fighting Dojo
  leaders: GymLeaderRegistry[] // History of leaders for this spot
}
