import { defineStore } from 'pinia'
import { institutionData } from '@/data/institutions'
import { ResearcherRegistry } from '@/data/characters/registry'
import { ResearcherEntry } from '@/types/academia'

export const useInstitutionStore = defineStore('institutions', {
  state: () => ({
    allInstitutions: institutionData,
  }),

  getters: {
    // Helper to get the full character objects for an institution's faculty
    getInstitutionRoster:
      (state) =>
      (instId: string): ResearcherEntry[] => {
        const inst = state.allInstitutions.find((i) => i.id === instId)
        if (!inst) return []

        const ids = [inst.head, ...(inst.faculty || [])]

        return ids
          .map((id) => ResearcherRegistry.find((r) => r.id === id))
          .filter((r): r is ResearcherEntry => !!r)
      },
  },
})
