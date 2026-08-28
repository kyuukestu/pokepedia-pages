// src/data/events/definitions/index.ts
import type { Quest } from '@/types/quests'

const jobModules = import.meta.glob<Quest>(
  './jobs/*.ts',
  {
    eager: true,
    import: 'default',
  },
)

export const jobs = Object.values(jobModules)

export function getJobs(id: string): Quest | undefined {
  return jobs.find(job => job.id === id)
}
