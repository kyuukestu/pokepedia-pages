export type InstitutionCategory = 'laboratory' | 'university' | 'college' | 'academy' | 'foundation'

export interface CampusLocation {
  city: string
  region: string // Links to your Region type
  coordinates?: { x: number; y: number } // For map placement
}

export interface AcademyMapConfig {
  bounds: [[number, number], [number, number]] // Leaflet LatLng bounds
  features: {
    type: 'building' | 'water' | 'grass' | 'path' | 'gate' | 'fountain' | 'pokeball'
    label: string
    description: string
    points: [number, number][] // Polygons/Polylines
    color?: string
  }[]
  pois: {
    id: string
    label: string
    coords: [number, number]
    description: string
    type: 'lab' | 'dorm' | 'landmark' | 'exit'
  }[]
}

export interface Institution {
  id: string // e.g., 'cinnabar-lab' &  URL path: /academia/institutions/cinnabar-lab
  name: string
  category: InstitutionCategory
  image: string // Main banner/campus photo
  logo?: string // Iconography/Crest

  // Leadership
  head: string // The "Dean" or "Lead"
  faculty: string[] // List of other researchers (CharacterMeta IDs)
  // Geography
  location: CampusLocation

  // Academic Profile
  specialties: string[] // e.g., ['Genetics', 'Restoration']
  description: string

  // Gameplay Mechanics
  enrollment?: {
    isOpen: boolean
    requirements?: string[] // e.g., ['Boulder Badge', 'Level 20']
    fee?: number
    benefits: string[] // e.g., ['Fossil Resurrection', 'Genetics Kit']
  }

  // The "Main Page" content
  mapConfig?: AcademyMapConfig
  customMapPath?: string
}
