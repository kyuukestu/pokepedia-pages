import { defineStore } from 'pinia'
import { type CharacterMeta, TrainerClassLabels } from '@/types/character'
import { RegionLabels } from '@/types/region'

export const useCharacterStore = defineStore('character', {
  state: () => ({
    meta: null as CharacterMeta | null,
    activeData: null as any,
    loading: false,
    error: false,
  }),

  actions: {
    async fetchCharacter(category: string, id: string, subpage: string = 'index') {
      this.loading = true
      this.error = false

      try {
        // 1. Fetch Base Metadata
        const metaModule = await import(`@/data/characters/${category}/${id}/index.ts`)
        const baseMeta = metaModule.default

        // 2. Auto-detect sibling files for Tabs
        // We glob broadly and filter specifically
        const allCharacterFiles = import.meta.glob('@/data/characters/**/*.ts')
        const detectedTabs = Object.keys(allCharacterFiles)
          .filter((path) => path.includes(`/${category}/${id}/`))
          .map((path) => path.split('/').pop()?.replace('.ts', ''))
          .filter((name) => name && name !== 'index')

        // 3. Set Meta with detected tabs
        this.meta = {
          ...baseMeta,
          tabs: detectedTabs,
        }

        // 4. Set Active Data
        if (subpage === 'index') {
          this.activeData = this.meta
        } else {
          const dataModule = await import(`@/data/characters/${category}/${id}/${subpage}.ts`)
          this.activeData = dataModule.default
        }
      } catch (error) {
        console.error('Character Fetch Error:', error)
        this.error = true
        this.meta = null
        this.activeData = null
      } finally {
        this.loading = false
      }
    },
  },

  getters: {
    regionLabel: (state) => (state.meta ? RegionLabels[state.meta.region] : ''),

    classLabels: (state) =>
      state.meta ? state.meta.trainerClass.other?.map((key) => TrainerClassLabels[key]) : [],
  },
})
