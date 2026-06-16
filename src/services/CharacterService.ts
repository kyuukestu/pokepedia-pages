import { supabase } from '@/lib/supabase'

export async function getCharacter(slug: string) {
  return await supabase
    .from('characters')
    .select(
      `
      *,
      origin_region:regions!origin_region_id(*),
      current_region:regions!current_region_id(*),

      character_classes(
        is_primary,
        trainer_classes(*)
      ),

      character_titles(*)
    `,
    )
    .eq('slug', slug)
    .single()
}

export type CharacterQuery = {
  search?: string
  regionId?: string | null
  category?: string | null
}

export async function getCharacters(query: CharacterQuery = {}) {
  let q = supabase.from('characters').select(`
    id,
    slug,
    full_name,
    image_src,
    color,
    category,
    current_region:regions!current_region_id (
      id,
      name
    )`)

  //filters (server-side)

  if (query.category && query.category !== 'all') {
    q = q.eq('category', query.category)
  }

  if (query.search) {
    q = q.ilike('full_name', `%${query.search}%`)
  }

  if (query.regionId) {
    q = q.eq('current_region_id', query.regionId)
  }

  const { data, error } = await q

  if (error) {
    throw error
  }

  return data ?? []
}

export async function getCharacterBySlug(slug: string) {
  const { data, error } = await supabase
    .from('characters')
    .select(
      `
      id,
      slug,
      full_name,
      image_src,
      color,
      category,

      origin_region:regions!origin_region_id(id, name),
      current_region:regions!current_region_id(id, name),

      pokemon:pokemon_ownership_active(
      pokemon_id,
      character_id,
      start_date,
      end_date
      )
    `,
    )
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}
