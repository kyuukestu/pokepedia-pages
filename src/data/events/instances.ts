// data/events/instances/index.ts

import type { EventInstance } from '@/types/events'

const instanceModules = import.meta.glob<EventInstance>(
  './instances/**/*.ts',
  {
    eager: true,
    import: 'default'
  },
)

export const eventInstances = Object.values(
  instanceModules,
)

export function getEventInstanceById(id: string): EventInstance | undefined {
  return eventInstances.find((instance) => instance.id === id)
}
