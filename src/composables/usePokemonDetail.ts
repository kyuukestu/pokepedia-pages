import { ref, watch, type Ref } from 'vue'
import { getPokemonbyId } from '@/services/PokemonService'

export function usePokemonDetail(id: Ref<string>) {
  const pokemon = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load(currentId: string) {
    loading.value = true
    error.value = null

    try {
      pokemon.value = await getPokemonbyId(currentId)
    } catch (e: any) {
      error.value = e.message ?? 'Failed to load Pokémon'
    } finally {
      loading.value = false
    }
  }

  watch(
    id,
    (newId) => {
      if (newId) load(newId)
    },
    { immediate: true },
  )

  watch(
    id,
    (val) => {
      console.log('ID changed:', val)
    },
    { immediate: true },
  )

  return {
    pokemon,
    loading,
    error,
    reload: () => load(id.value),
  }
}
