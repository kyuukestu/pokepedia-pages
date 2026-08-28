// src/data/events/definitions/index.ts
import type { Quest } from '@/types/quests'

const missionModules = import.meta.glob<Quest>(
  './missions/*.ts',
  {
    eager: true,
    import: 'default',
  },
)

export const missions = Object.values(missionModules)

export function getMissions(id: string): Quest | undefined {
  return missions.find(mission => mission.id === id)
}
