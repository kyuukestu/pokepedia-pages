// src/data/quests/index.ts
import type { Quest } from '@/types/quests'

import { jobs } from './jobs'
import { missions } from './missions'

export const quests: Quest[] = [
  ...missions,
  ...jobs,
]

export function getQuest(id: string): Quest | undefined {
  return quests.find(quest => quest.id === id)
}
