import { ref, computed, watch, onMounted } from 'vue'
import { debounce } from 'lodash-es'
import { getCharacters, type CharacterQuery } from '@/services/CharacterService'
import { characterImageResolver } from '@/utils/image-resolver'

export function useCharacters() {
  // ─────────────────────────────────────────────
  // 1. RAW STATE (source of truth from backend)
  // ─────────────────────────────────────────────
  const characters = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // ─────────────────────────────────────────────
  // 2. UI FILTER STATE (user controls)
  // ─────────────────────────────────────────────
  const search = ref('')
  const regionId = ref<string | null>(null)
  const category = ref<string>('all')

  // ─────────────────────────────────────────────
  // 3. DERIVED QUERY (single source of truth)
  // ─────────────────────────────────────────────
  const query = computed<CharacterQuery>(() => ({
    search: search.value || undefined,
    regionId: regionId.value,
    category: category.value,
  }))

  // ─────────────────────────────────────────────
  // 4. FETCH FUNCTION (pure executor)
  // ─────────────────────────────────────────────
  async function load(q: CharacterQuery) {
    loading.value = true
    error.value = null

    try {
      characters.value = await getCharacters(q)
    } catch (e: any) {
      error.value = e.message ?? 'Failed to load characters'
    } finally {
      loading.value = false
    }
  }

  // ─────────────────────────────────────────────
  // 5. DEBOUNCED WRAPPER (prevents spam fetches)
  // ─────────────────────────────────────────────
  const debouncedLoad = debounce((q: CharacterQuery) => {
    load(q)
  }, 300)

  // ─────────────────────────────────────────────
  // 6. REACTIVE TRIGGER (watches filters)
  // ─────────────────────────────────────────────
  watch(
    query,
    (q) => {
      debouncedLoad(q)
    },
    { deep: true, immediate: true },
  )

  // ─────────────────────────────────────────────
  // 7. INITIAL LOAD SAFETY (optional redundancy fallback)
  // ─────────────────────────────────────────────
  onMounted(() => {
    load(query.value)
  })

  // ─────────────────────────────────────────────
  // 8. PRESENTATION LAYER (UI-friendly transformation)
  // ─────────────────────────────────────────────
  const processedCharacters = computed(() => {
    return characters.value
      .map((c) => ({
        id: c.id,
        slug: c.slug,
        fullName: c.full_name,
        image: characterImageResolver(c.image_src),
        color: c.color,
        category: c.category,
        regionId: c.associated_region?.id ?? 'global',
        regionName: c.associated_region?.name ?? 'Global',
        path: `/sandbox/characters/${c.slug}`,
      }))
      .sort((a, b) =>
        a.fullName.localeCompare(b.fullName, undefined, {
          sensitivity: 'base',
        }),
      )
  })

  // ─────────────────────────────────────────────
  // 9. PUBLIC API (what components can use)
  // ─────────────────────────────────────────────
  return {
    characters,
    processedCharacters,
    loading,
    error,

    // filters (UI bindings)
    search,
    regionId,
    category,

    // optional manual refresh
    load,
  }
}
