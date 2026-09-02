import { RangerRank } from '@/types/ranger'
import { Node, Edge } from '@vue-flow/core'


export const rangerRanks: RangerRank[] = [
  {
    id: 'ranger',
    title: 'Ranger',
    icon: 'mdi-account',
    description:
      'Entry-level field operatives who patrol assigned areas, respond to local incidents, and assist communities with conflicts between people and Pokémon.',
    color: 'green',
    track: 'core',
  },

  {
    id: 'senior-ranger',
    title: 'Senior Ranger',
    icon: 'mdi-account-star',
    description:
      'Experienced field operatives trusted to work independently, lead small teams, mentor junior Rangers, and undertake more complex assignments with limited supervision.',
    color: 'green',
    parentId: 'ranger',
    track: 'core',
  },

  {
    id: 'stationed-track',
    title: 'Stationed Track',
    icon: 'mdi-map-marker',
    description:
      'A career track focused on territorial stability, local authority, and long-term oversight.',
    color: 'blue',
    parentId: 'senior-ranger',
    track: 'stationed',
  },

  {
    id: 'area-ranger',
    title: 'Area Ranger',
    icon: 'mdi-map-marker-radius',
    description:
      'Permanent overseers of defined territories who command Rangers within their jurisdiction, assess local threats, and coordinate responses to major incidents.',
    color: 'blue',
    parentId: 'stationed-track',
    track: 'stationed',
  },

  {
    id: 'ranger-chief',
    title: 'Ranger Chief',
    icon: 'mdi-office-building',
    description:
      'Senior administrators responsible for coordinating Ranger operations across large jurisdictions, allocating resources, and managing relationships with governments, the Pokémon League, and other organizations.',
    color: 'blue',
    parentId: 'area-ranger',
    track: 'stationed',
  },

  {
    id: 'roaming-track',
    title: 'Roaming Track',
    icon: 'mdi-compass-outline',
    description:
      'A career track focused on mobility, specialization, and rapid response.',
    color: 'orange',
    parentId: 'senior-ranger',
    track: 'roaming',
  },

  {
    id: 'ranger-specialist',
    title: 'Ranger Specialist',
    icon: 'mdi-account-star-outline',
    description:
      'Experienced Rangers with advanced expertise in a particular field, such as terrain, Pokémon types, natural disasters, or anomalous phenomena.',
    color: 'orange',
    parentId: 'roaming-track',
    track: 'roaming',
  },

  {
    id: 'ranger-maverick',
    title: 'Ranger Maverick',
    icon: 'mdi-account-supervisor',
    description:
      'Elite field commanders selected to lead high-priority operations and granted broad authority to mobilize Ranger Union resources within the scope of their mission.',
    color: 'orange',
    parentId: 'ranger-specialist',
    track: 'roaming',
  },

  {
    id: 'top-ranger',
    title: 'Top Ranger',
    icon: 'mdi-star-circle',
    description:
      'Exceptional operatives who operate outside the normal hierarchy with broad discretion to respond to extraordinary threats, including Legendary Pokémon and major ecological disasters.',
    color: 'amber',
    track: 'exceptional',
  },
]

export const rank = (id: string) =>
  rangerRanks.find(rank => rank.id === id)

export const rangerNodes: Node[] = [
  {
    id: 'ranger',
    type: 'ranger',
    position: { x: 300, y: 0 },
    data: rank('ranger'),
  },
  {
    id: 'senior-ranger',
    type: 'ranger',
    position: { x: 300, y: 180 },
    data: rank('senior-ranger'),
  },

  {
    id: 'stationed-track',
    type: 'track',
    position: { x: 40, y: 360 },
    data: rank('stationed-track'),
  },
  {
    id: 'area-ranger',
    type: 'ranger',
    position: { x: 40, y: 520 },
    data: rank('area-ranger'),
  },
  {
    id: 'ranger-chief',
    type: 'ranger',
    position: { x: 40, y: 700 },
    data: rank('ranger-chief'),
  },

  {
    id: 'roaming-track',
    type: 'track',
    position: { x: 560, y: 360 },
    data: rank('roaming-track'),
  },
  {
    id: 'ranger-specialist',
    type: 'ranger',
    position: { x: 560, y: 520 },
    data: rank('ranger-specialist'),
  },
  {
    id: 'ranger-maverick',
    type: 'ranger',
    position: { x: 560, y: 700 },
    data: rank('ranger-maverick'),
  },

  {
    id: 'top-ranger',
    type: 'ranger',
    position: { x: 300, y: 900 },
    data: rank('top-ranger'),
  },
]

export const rangerEdges: Edge[] = [
  {
    id: 'ranger-senior',
    source: 'ranger',
    target: 'senior-ranger',
  },

  {
    id: 'senior-stationed',
    source: 'senior-ranger',
    target: 'stationed-track',
  },
  {
    id: 'stationed-area',
    source: 'stationed-track',
    target: 'area-ranger',
  },
  {
    id: 'area-chief',
    source: 'area-ranger',
    target: 'ranger-chief',
  },

  {
    id: 'senior-roaming',
    source: 'senior-ranger',
    target: 'roaming-track',
  },
  {
    id: 'roaming-specialist',
    source: 'roaming-track',
    target: 'ranger-specialist',
  },
  {
    id: 'specialist-maverick',
    source: 'ranger-specialist',
    target: 'ranger-maverick',
  },
]
