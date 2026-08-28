// src/data/events/definitions/index.ts
import type { EventDefinition } from '@/types/events'

const definitionModules = import.meta.glob<EventDefinition>(
  './definitions/*.ts',
  {
    eager: true,
    import: 'default',
  },
)

export const eventDefinitions = Object.values(definitionModules)

export function getEventDefinition(id: string): EventDefinition | undefined {
  return eventDefinitions.find(event => event.id === id)
}
