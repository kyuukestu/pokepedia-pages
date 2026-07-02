import { ref, watch } from 'vue'
import { supabase } from '@/lib/supabase'
import type { CharacterDashboardDTO, CharacterDashboard } from '@/types/CharacterDashboard'

export function useCharacterDashboard(slug: Ref<string>) {
  const data = ref<CharacterDashboard | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    loading.value = true
    error.value = null

    try {
      const { data: result, error: err } = await supabase
        .from('character_dashboard_view')
        .select('*')
        .eq('slug', slug.value)
        .single()

      if (err) throw err
      console.log('Raw dashboard:', result)
      data.value = transform(result)
      console.log('Transformed:', data.value)
    } catch (e: any) {
      error.value = e.message ?? 'Failed to load character dashboard'
    } finally {
      loading.value = false
    }
  }

  watch(slug, load, { immediate: true })

  return {
    data,
    loading,
    error,
    reload: load,
  }
}

function transform(raw: CharacterDashboardDTO): CharacterDashboard {
  return {
    character: {
      id: raw.id,
      slug: raw.slug,

      full_name: raw.full_name,
      short_names: raw.short_names ?? [],
      nicknames: raw.nicknames ?? [],

      category: raw.category,
      age: raw.age,
      dob: raw.dob,
      gender: raw.gender,
      height: raw.height,
      summary: raw.summary,

      image_src: raw.image_src,
      color: raw.color,

      region: {
        origin: {
          id: raw.origin_region_id,
          name: raw.origin_region_name,
        },
        current: {
          id: raw.current_region_id,
          name: raw.current_region_name,
        },
      },

      classes: raw.classes ?? [],

      titles: raw.titles ?? [],

      external_sheet_url: raw.external_sheet_url,
    },

    pokemon: {
      active_party: raw.pokemon_active ?? [],
      owned_current: raw.pokemon_owned_current ?? [],
      history: raw.pokemon_history ?? [],
    },

    achievements: {
      badges: raw.character_badges ?? [],
      ribbons: raw.character_ribbons ?? [],
      tournament_results: [],
    },

    activity: {
      events: [],
      timeline: [],
    },

    media: {
      images: [],
    },
  }
}
