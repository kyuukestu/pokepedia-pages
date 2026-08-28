with inserted_character as (
  insert into characters (
    id,
    full_name,
    origin_region_id,
    associated_region_id,
    category,
    gender,
    color,
    short_names,
    nicknames,
    image_src
  )
  values (
    gen_random_uuid(),
    'Dustin',
    'hoenn',
    'hoenn',
    'oc',
    'male',
    '#00A885',
    '[]'::jsonb,
    '[]'::jsonb,
    'dustin-full.png'
  )
  returning id
),

inserted_pokemon as (
  insert into pokemon (
    id,
    species_id,
    species_name,
    shiny,
    alpha,
    full_name,
    short_names,
    gender,
    caught_at
  )
  values (
    gen_random_uuid(),
    'combusken',
    'Combusken',
    false,
    false,
    'Torch',
    '[]'::jsonb,
    'male',
    null
  )
  returning id
),

ownership as (
  insert into pokemon_ownership_history (
    id,
    pokemon_id,
    character_id,
    start_date,
    end_date
  )
  select
    gen_random_uuid(),
    p.id,
    c.id,
    null,
    null
  from inserted_pokemon p, inserted_character c
  returning pokemon_id
)

select
  'seed_complete' as status;
