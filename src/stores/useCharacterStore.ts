import { defineStore } from 'pinia'
import { type CharacterMeta, TrainerClassLabels } from '@/types/character'
import { RegionLabels } from '@/types/region'

// 1. Tell Vite to map out all files inside the target directory tree
const characterModules = import.meta.glob('@/data/characters/**/*.ts')

export const useCharacterStore = defineStore('character', {
  state: () => ({
    // Use defensive empty tracking structures instead of raw nulls to prevent template crashes
    meta: null as CharacterMeta | null,
    activeData: null as any,
    loading: false,
    error: false,
    researcherRegistry: [] as CharacterMeta[],
    pokemonCount: 0,
  }),

  actions: {
    /**
     * Finds the exact compiled key inside the Vite glob map regardless of alias configurations.
     */
    findModuleKey(
      region: string,
      category: string,
      id: string,
      subpage: string,
    ): string | undefined {
      const matchCriteria = `/data/characters/${region}/${category}/${id}/${subpage}.ts`
      return Object.keys(characterModules).find((key) => key.endsWith(matchCriteria))
    },

    hasAssetFile(region: string, category: string, id: string, subpage: string): boolean {
      return !!this.findModuleKey(region, category, id, subpage)
    },

    async fetchCharacter(region: string, category: string, id: string, subpage: string = 'index') {
      this.loading = true
      this.error = false

      try {
        // Resolve keys dynamically by checking suffix paths safely
        const indexKey = this.findModuleKey(region, category, id, 'index')
        const pokemonKey = this.findModuleKey(region, category, id, 'pokemon')
        const targetKey = this.findModuleKey(region, category, id, subpage)

        if (!indexKey) {
          throw new Error(
            `Profile Registry Error: Vital root file index.ts not found for identity reference: ${id}`,
          )
        }

        // 1. Fetch Base Metadata payload safely
        const metaModule = (await characterModules[indexKey]()) as any
        const baseMeta = metaModule.default || metaModule

        // 2. Safely compute Pokémon counts without disrupting execution flow
        if (pokemonKey) {
          const pokeModule = (await characterModules[pokemonKey]()) as any
          const pokeList = pokeModule.default || pokeModule
          this.pokemonCount = pokeList?.length || 0
        } else {
          this.pokemonCount = 0
        }

        // 3. Auto-detect sibling components for UI Tabs directly from our manifest keys
        const folderFragment = `/data/characters/${region}/${category}/${id}/`
        const detectedTabs = Object.keys(characterModules)
          .filter((path) => path.includes(folderFragment))
          .map((path) => path.split('/').pop()?.replace('.ts', ''))
          .filter((name): name is string => !!name && name !== 'index')

        // 4. Assemble meta object structure
        this.meta = {
          ...baseMeta,
          tabs: detectedTabs,
        }

        // 5. Populate active tab data payloads safely
        if (subpage === 'index') {
          this.activeData = this.meta
        } else {
          if (!targetKey) {
            this.activeData = [] // Fallback to safe array so props.data.length doesn't crash
            return
          }
          const dataModule = (await characterModules[targetKey]()) as any
          this.activeData = dataModule.default || dataModule
        }
      } catch (error) {
        console.error('Tactical Storage Intercept Error:', error)
        this.error = true
        // Keep fallback layouts sound even when asset operations collapse entirely
        this.meta = null
        this.activeData = subpage === 'pokemon' ? [] : {}
      } finally {
        this.loading = false
      }
    },
  },

  getters: {
    regionLabel: (state) => (state.meta ? RegionLabels[state.meta.region] : ''),
    classLabels: (state) =>
      state.meta ? state.meta.trainerClass.other?.map((key) => TrainerClassLabels[key]) : [],
    getCharacterById: (state) => (id: string) => {
      return state.researcherRegistry.find((c) => c.id === id)
    },
  },
})
