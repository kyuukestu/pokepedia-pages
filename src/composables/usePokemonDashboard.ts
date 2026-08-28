import { ref, watch, type Ref } from 'vue'
import { getPokemonDashboardById } from '@/services/PokemonService'
import type { PokemonDashboardDTO } from '@/types/PokemonDashboard'

export function usePokemonDashboard(id: Ref<string>) {
  const pokemon = ref<PokemonDashboardDTO | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load(currentId: string) {
    if (!currentId) return

    loading.value = true
    error.value = null

    try {
      pokemon.value = await getPokemonDashboardById(currentId)
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to load Pokémon dashboard'
      pokemon.value = null
    } finally {
      loading.value = false
    }
  }

  watch(id, (newId) => load(newId), { immediate: true })

  return {
    pokemon,
    loading,
    error,
    reload: () => load(id.value),
  }
}
