import { RegistryEntry } from '@/types/character'

export interface TravelGroup {
  id: string
  name: string
  location: string
  date: string
  activity: string
  intent: string
  color: string
  threadUrl?: string
  members: RegistryEntry[]
}
