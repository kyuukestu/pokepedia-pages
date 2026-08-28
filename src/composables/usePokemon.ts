import { computed, type ComputedRef } from 'vue'
import type { PokemonSection } from '@/types/CharacterDashboard'

export function usePokemon(pokemon: ComputedRef<PokemonSection>) {
  const activeParty = computed(() => pokemon.value.active_party ?? [])

  const ownedCurrent = computed(() => pokemon.value.owned_current ?? [])

  const history = computed(() => pokemon.value.history ?? [])

  const activeIds = computed(() => new Set(activeParty.value.map((p) => p.id)))

  const box = computed(() => ownedCurrent.value.filter((p) => !activeIds.value.has(p.pokemon_id)))

  const activeCount = computed(() => activeParty.value.length)

  const ownedCount = computed(() => ownedCurrent.value.length)

  return {
    activeParty,
    box,
    history,
    activeCount,
    ownedCount,
  }
}
