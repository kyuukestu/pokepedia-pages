import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

export function useCharacterPokemon(characterId: string) {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const active = ref<any[]>([])

  async function load() {
    loading.value = true
    error.value = null

    try {
      const { data, error: err } = await supabase
        .from('pokemon_ownership_active')
        .select(
          `
          pokemon_id,
          start_date,

          pokemon (
            id,
            species_id,
            level,
            ability,
            gender,
            shiny,
            alpha,
            held_item
          )
        `,
        )
        .eq('character_id', characterId)

      if (err) throw err

      active.value = data ?? []
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  onMounted(load)

  const normalized = computed(() =>
    active.value.map((row) => ({
      id: row.pokemon.id,
      speciesId: row.pokemon.species_id,
      level: row.pokemon.level,
      ability: row.pokemon.ability,
      gender: row.pokemon.gender,
      shiny: row.pokemon.shiny,
      alpha: row.pokemon.alpha,
      heldItem: row.pokemon.held_item,
    })),
  )

  return { normalized, loading, error, load }
}
