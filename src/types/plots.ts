export interface OverarchingPlot {
  id: string
  title: string
  featuredCharacters: string[]
  contactPerson: {
    name: string
    rpnlink: string
  }
  statusLabel: string
  statusColor: string
  summary: string
  genre: string
  relatedArcs: Array<{
    id: string
    title: string
    brief: string
  }>
}
