import { ref, onMounted } from 'vue'
import { getCharacterBySlug } from '@/services/CharacterService'
import { characterImageResolver } from '@/utils/image-resolver'

export function useCharacter(slug: string) {
  // RAW STATES
  const character = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    loading.value = true
    error.value = null

    try {
      const data = await getCharacterBySlug(slug)

      character.value = {
        ...data,
        image: characterImageResolver(data.image_src),
        associatedRegion: data.associated_region[0].name ?? 'Unknown',
        originRegion: data.origin_region[0].name ?? 'Unknown',
        pokemon: (data.pokemon ?? []).map((p: any) => ({
          id: p.id,
          nickname: p.nickname,
          level: p.level,
          shiny: p.shiny,
          speciesId: p.species_id,
        })),
      }
    } catch (e: any) {
      error.value = e.message ?? 'Failed to load character'
    } finally {
      loading.value = false
    }
  }

  onMounted(load)

  return {
    character,
    loading,
    error,
    load,
  }
}
