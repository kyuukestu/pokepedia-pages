import { RegistryEntry } from './character'

export interface OverarchingPlot {
  id: string
  title: string
  featuredCharacters: string[]
  statusLabel: string
  statusColor: string
  summary: string
  intent: string
  relatedArcs: Array<{
    id: string
    title: string
    brief: string
  }>
}
