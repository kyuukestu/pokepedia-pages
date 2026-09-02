export interface RangerRank {
  id: string
  title: string
  icon: string
  description: string
  color: string

  parentId?: string
  track?: 'core' | 'stationed' | 'roaming' | 'exceptional'
}
