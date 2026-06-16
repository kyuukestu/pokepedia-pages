import { ref, watch } from 'vue'
import { supabase } from '@/lib/supabase'
import type { CharacterDashboardDTO } from '@/types/CharacterDashboard'

export function useCharacterDashboard(slug: Ref<string>) {
  const data = ref<CharacterDashboardDTO | null>(null)
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

function transform(raw: any): CharacterDashboardDTO {
  return {
    character: {
      id: raw.id,
      slug: raw.slug,
      full_name: raw.full_name,
      image_src: raw.image_src,
      color: raw.color,

      region: {
        id: raw.current_region_id,
        name: raw.current_region_id,
      },

      classes: raw.classes ?? [],
      titles: raw.titles ?? [],
      nicknames: raw.nicknames ?? [],
    },

    pokemon: {
      active_party: raw.pokemon_active ?? [],
      box: [], // later derived
      history_preview: raw.pokemon_history_preview ?? [],
    },

    achievements: {
      badges: raw.badges ?? [],
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
