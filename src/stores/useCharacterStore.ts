import { defineStore } from 'pinia'
import { type CharacterMeta, TrainerClassLabels } from '@/types/character'
import { RegionLabels } from '@/types/region'
import { autoRegistry, ResearcherRegistry } from '@/data/characters/registry'
import { Dex } from '@pkmn/dex'
import { PokemonMember } from '@/types/pokemon'

// 1. Tell Vite to map out all files inside the target directory tree
const characterModules = import.meta.glob('@/data/characters/**/*.ts')

function getDexIdFromSpecies(speciesId: string): string {
  if (!speciesId) return '0000'

  const normalizedKey = speciesId.toLowerCase().replace(/[^a-z0-9]/g, '')

  const speciesData = Dex.species.get(normalizedKey)

  const dexNumber = speciesData?.num ?? 0
  return String(dexNumber).padStart(4, '0')
}

export const useCharacterStore = defineStore('character', {
  state: () => ({
    // Use defensive empty tracking structures instead of raw nulls to prevent template crashes
    meta: null as CharacterMeta | null,
    activeData: null as any,
    loading: false,
    error: false,
    characterRegistry: autoRegistry as CharacterMeta[],
    researcherRegistry: ResearcherRegistry as CharacterMeta[],
    pokemonCount: 0,
    resolvedTeamCache: {} as Record<
      string,
      {
        sourceGame: string
        highest: { name: string; sprite: string; level: string }
        lowest: { name: string; sprite: string; level: string }
      }
    >,
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

    async fetchPokemonOnly(region: string, category: string, id: string): Promise<any[]> {
      try {
        const pokemonKey = this.findModuleKey(region, category, id, 'pokemon')
        if (!pokemonKey) return []

        const pokeModule = (await characterModules[pokemonKey]()) as any
        const data = pokeModule.pokemon || pokeModule.default || pokeModule
        return Array.isArray(data) ? data : []
      } catch (err) {
        console.warn(`Standalone team resolution error for target ID [${id}]:`, err)
        return []
      }
    },

    async loadTeamMetrics(id: string) {
      // Step 1: Return instantly if this character's metrics have already been parsed
      if (!id || this.resolvedTeamCache[id]) return

      // Step 2: Extract routing coordinates synchronously from your master registries
      const meta = this.getCharacterById(id) || this.getAcademicById(id)

      if (!meta) {
        console.warn(`[Store] Character ID "${id}" could not be located inside registered maps.`)
        return
      }

      // Read values out of the registry match
      const region = String(meta.region).toLowerCase()
      const category = String(meta.category).toLowerCase()

      try {
        // Step 3: Reconstruct the strict, absolute path key registered by Vite
        // This targets exactly: src/data/characters/{region}/{category}/{id}/pokemon.ts
        const explicitPathKey = `/src/data/characters/${region}/${category}/${id}/pokemon.ts`

        const fileResolver = characterModules[explicitPathKey]
        if (!fileResolver) {
          throw new Error(
            `Path mapping failed to match an internal source file: ${explicitPathKey}`,
          )
        }

        // Step 4: Execute the async file-loader handle
        const targetModule = (await fileResolver()) as any
        const teamList = targetModule.pokemon || targetModule.default || []

        if (!Array.isArray(teamList) || teamList.length === 0) {
          throw new Error(`The file at ${explicitPathKey} does not export a valid array.`)
        }

        // Step 5: Sanitize input properties and convert levels to sortable numbers
        const normalizedTeam = teamList
          .map((p: PokemonMember) => {
            const dexId = getDexIdFromSpecies(p.speciesId)

            return {
              name:
                p.name?.short?.[0] ?? p.speciesId.slice(0, 1).toUpperCase() + p.speciesId.slice(1),
              sprite: `https://projectpokemon.org/images/sprites-models/sv-sprites-home/${dexId}.png`,
              levelNum: parseInt(String(p.level ?? '0'), 10) || 0,
              levelStr: String(p.level),
            }
          })
          // Sort descending (Highest level down to Lowest level)
          .sort((a, b) => b.levelNum - a.levelNum)

        // Step 6: Commit calculated boundaries straight to the active state cache
        this.resolvedTeamCache[id] = {
          sourceGame: `// ${region.toUpperCase()} - ${category.toUpperCase()}`,
          highest: {
            name: normalizedTeam[0].name,
            sprite: normalizedTeam[0].sprite,
            level: normalizedTeam[0].levelStr,
          },
          lowest: {
            name: normalizedTeam[normalizedTeam.length - 1].name,
            sprite: normalizedTeam[normalizedTeam.length - 1].sprite,
            level: normalizedTeam[normalizedTeam.length - 1].levelStr,
          },
        }
      } catch (err: any) {
        console.error(`[Store Error] Failed to resolve team metrics for ${id}:`, err.message)

        // Commits a safe fallback object to avoid infinite loading spinners in UI layouts
        this.resolvedTeamCache[id] = {
          sourceGame: 'Error Logged',
          highest: {
            name: 'Unknown Data',
            sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0000.png',
            level: '??',
          },
          lowest: {
            name: 'Unknown Data',
            sprite: 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0000.png',
            level: '??',
          },
        }
      }
    },
  },

  getters: {
    regionLabel: (state) => (state.meta ? RegionLabels[state.meta.region] : ''),

    classLabels: (state) =>
      state.meta ? state.meta.trainerClass.other?.map((key) => TrainerClassLabels[key]) : [],

    getAcademicById: (state) => (id: string) => {
      return state.researcherRegistry.find((c) => c.id === id)
    },

    getCharacterById: (state) => (id: string) => {
      return state.characterRegistry.find((c) => c.id === id)
    },
  },
})
