with inserted_character as (

  insert into characters (
    id,
    full_name,
    origin_region_id,
    associated_region_id,
    category,
    age,
    gender,
    height,
    color,
    image_src
  )
  values (
    gen_random_uuid(),
    'Esther Rosana Sophys',
    'oblivia',
    'oblivia',
    'oc',
    17,
    'female',
    '5 ft 6 in',
    '#f05656',
    '/images/characters/esther.png'
  )
  returning id as character_id
),

primary_class as (
  insert into character_classes (
    character_id,
    class_id,
    is_primary
  )
  select
    character_id,
    'coordinator',
    true
  from inserted_character
),

secondary_class as (
  insert into character_classes (
    character_id,
    class_id,
    is_primary
  )
  select
    character_id,
    'battler',
    false
  from inserted_character
),

inserted_pokemon as (

  insert into pokemon (
    id,
    species_id,
    species_name,
    shiny,
    alpha,
    full_name,
    gender,
    caught_at
  )
  values (
    gen_random_uuid(),
    'jangmoo',
    'Jangmo-o',
    false,
    false,
    'Pyrrha Achilleia Astierra',
    'female',
    null
  )
  returning id as pokemon_id
),

inserted_build as (

  insert into pokemon_builds (
    id,
    pokemon_id,
    name,
    is_default,
    level,
    ability,
    held_item,
    created_at
  )
  select
    gen_random_uuid(),
    pokemon_id,
    'Default',
    true,
    26,
    'Overcoat',
    'Everstone',
    null
  from inserted_pokemon
  returning id as build_id, pokemon_id
),

inserted_moves as (

  insert into pokemon_build_moves (
    id,
    build_id,
    move,
    slot_order
  )
  select *
  from (
    values
      (gen_random_uuid(), (select build_id from inserted_build), 'Protect', 1),
      (gen_random_uuid(), (select build_id from inserted_build), 'Dragon Tail', 2),
      (gen_random_uuid(), (select build_id from inserted_build), 'Iron Defense', 3),
      (gen_random_uuid(), (select build_id from inserted_build), 'Scale Shot', 4),
      (gen_random_uuid(), (select build_id from inserted_build), 'Work Up', 5),
      (gen_random_uuid(), (select build_id from inserted_build), 'Screech', 6),
      (gen_random_uuid(), (select build_id from inserted_build), 'Bide', 7),
      (gen_random_uuid(), (select build_id from inserted_build), 'Scary Face', 8)
  ) as m(id, build_id, move, slot_order)
  returning id
)

select
  c.character_id,
  p.pokemon_id,
  b.build_id
from inserted_character c
cross join inserted_pokemon p
cross join inserted_build b;
