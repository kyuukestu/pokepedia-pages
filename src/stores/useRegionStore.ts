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
