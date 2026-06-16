import { supabase } from '@/lib/supabase'

export async function getPokemonbyId(id: string) {
  const { data, error } = await supabase
    .from('pokemon')
    .select(
      `
      id,
      species_id,
      species_name,
      full_name,
      gender,
      shiny,
      alpha,
      caught_at,

      builds:pokemon_builds(
        id,
        name,
        level,
        ability,
        held_item,
        is_default,
        moves:pokemon_build_moves(
          move,
          slot_order
        )
      ),

      ownership:pokemon_ownership_history(
        start_date,
        end_date,
        character:characters(
          id,
          full_name
        )
      )
    `,
    )
    .eq('id', id)
    .single()

  console.log('Data:', data)
  console.log('error:', error)

  if (error) throw error

  return data
}
