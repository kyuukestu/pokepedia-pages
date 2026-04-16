import { defineStore } from 'pinia'
import { regions } from '@/data/regions' // Your regions.ts file
import type { RegionManifest } from '@/types/region'

export const useRegionStore = defineStore('region', {
  state: () => ({
    currentRegion: null as RegionManifest | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    // async fetchRegion(regionId: string) {
    //   // Don't refetch if we already have it loaded
    //   if (this.currentRegion?.id === regionId) return

    //   this.loading = true
    //   this.error = null

    //   try {
    //     // In a Pure SPA on Vercel, we fetch from the public folder
    //     // The path maps to: /public/data/regions/kanto.json
    //     const response = await fetch(`/data/regions/${regionId}.json`)

    //     if (!response.ok) {
    //       throw new Error(`Region '${regionId}' not found.`)
    //     }

    //     const data = await response.json()
    //     this.currentRegion = data
    //   } catch (err: any) {
    //     console.error('Failed to load region data:', err)
    //     this.error = err.message
    //     this.currentRegion = null
    //   } finally {
    //     this.loading = false
    //   }
    // },

    setActiveRegion(regionId: string) {
      // Logic for regions.ts being a Record<string, RegionManifest>
      const found = regions[regionId]

      if (found) {
        this.currentRegion = found
      } else {
        console.warn(`Region ${regionId} not found in regions.ts`)
        this.currentRegion = null
      }
    },

    clearRegion() {
      this.currentRegion = null
      this.error = null
    },
  },

  getters: {
    getThemeColor: (state) => state.currentRegion?.themeColor || 'primary',
  },
})
