import { defineStore } from 'pinia'
import { leagues, type LeagueMeta } from '@/data/leagues'

export const useLeagueStore = defineStore('league', {
  state: () => ({
    currentLeague: null as LeagueMeta | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    setActiveLeague(leagueId: string) {
      const cleanId = leagueId.toLowerCase().trim()
      const found = leagues.find((l) => l.id === cleanId)
      if (found) {
        this.currentLeague = found
      } else {
        console.warn(`League ${leagueId} not found in leagues.ts`)
        this.currentLeague = null
      }
    },

    clearLeague() {
      this.currentLeague = null
      this.error = null
    },
  },
})
