import type { EventDefinition } from '@/types/events'
import { ALL_REGIONS } from '@/types/region'

export default {
  id: 'sanguine-swarm',
  title: 'Sanguine Swarm',
  category: 'ecological-disaster',
  regions: [...ALL_REGIONS],
  image: 'zubat-swarm.png',
  description:
    '',
} satisfies EventDefinition
