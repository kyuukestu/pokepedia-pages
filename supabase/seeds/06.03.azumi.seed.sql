with inserted_character as (

  insert into characters (
    id,
    full_name,
    origin_region_id,
    current_region_id,
    category,
    age,
    gender,
    height,
    color,
    image_src
  )
  values (
    gen_random_uuid(),
    'Azumi Tawa',
    'kalos',
    'kalos',
    'oc',
    21,
    'female',
    '5 ft 4 in',
    '#f05656',
    'azumi.png'
  )
  returning id
),
gardevoir as (
  insert into pokemon (
    id,
    species_id,
    species_name,
    full_name,
    gender,
    ability
  )
  values (
    gen_random_uuid(),
    'gardevoir',
    'Gardevoir',
    'Nana',
    'female',
    'telepathy'
  )
  returning id
),

gardevoir_build as (
  insert into pokemon_builds (
    id,
    pokemon_id,
    name,
    is_default,
    ability
  )
  select
    gen_random_uuid(),
    id,
    'Default',
    true,
    'telepathy'
  from gardevoir
  returning id, pokemon_id
),

gardevoir_moves as (
  insert into pokemon_build_moves (
    id,
    build_id,
    move,
    slot_order
  )
  select * from (
    values
      (gen_random_uuid(), (select id from gardevoir_build), 'moonblast', 1),
      (gen_random_uuid(), (select id from gardevoir_build), 'psyshock', 2),
      (gen_random_uuid(), (select id from gardevoir_build), 'calm-mind', 3),
      (gen_random_uuid(), (select id from gardevoir_build), 'life-dew', 4),
      (gen_random_uuid(), (select id from gardevoir_build), 'magical-leaf', 5),
      (gen_random_uuid(), (select id from gardevoir_build), 'mystical-fire', 6),
      (gen_random_uuid(), (select id from gardevoir_build), 'hypnosis', 7),
      (gen_random_uuid(), (select id from gardevoir_build), 'thunder-wave', 8)
  ) v
  returning id
),

tyrantrum as (
  insert into pokemon (
    id,
    species_id,
    species_name,
    full_name,
    gender,
    ability,
    shiny
  )
  values (
    gen_random_uuid(),
    'tyrantrum',
    'Tyrantrum',
    'Edward',
    'male',
    'rock-head',
    true
  )
  returning id
),
tyrantrum_build as (
  insert into pokemon_builds (
    id,
    pokemon_id,
    name,
    is_default,
    ability
  )
  select
    gen_random_uuid(),
    id,
    'Default',
    true,
    'rock-head'
  from tyrantrum
  returning id
),
tyrantrum_moves as (
  insert into pokemon_build_moves (
    id,
    build_id,
    move,
    slot_order
  )
  select * from (
    values
      (gen_random_uuid(), (select id from tyrantrum_build), 'head-smash', 1),
      (gen_random_uuid(), (select id from tyrantrum_build), 'rock-slide', 2),
      (gen_random_uuid(), (select id from tyrantrum_build), 'dragon-claw', 3),
      (gen_random_uuid(), (select id from tyrantrum_build), 'crunch', 4),
      (gen_random_uuid(), (select id from tyrantrum_build), 'protect', 5),
      (gen_random_uuid(), (select id from tyrantrum_build), 'iron-tail', 6),
      (gen_random_uuid(), (select id from tyrantrum_build), 'stomp', 7),
      (gen_random_uuid(), (select id from tyrantrum_build), 'bulldoze', 8)
  ) v
  returning id
),
lucario as (
  insert into pokemon (
    id,
    species_id,
    species_name,
    full_name,
    gender,
    ability
  )
  values (
    gen_random_uuid(),
    'lucario',
    'Lucario',
    'Anakin',
    'male',
    'inner-focus'
  )
  returning id
),
meowscarada as (
  insert into pokemon (
    id,
    species_id,
    species_name,
    full_name,
    gender,
    ability
  )
  values (
    gen_random_uuid(),
    'meowscarada',
    'Meowscarada',
    'Lily',
    'female',
    'overgrow'
  )
  returning id
),
altaria as (
  insert into pokemon (
    id,
    species_id,
    species_name,
    full_name,
    gender,
    ability
  )
  values (
    gen_random_uuid(),
    'altaria',
    'Altaria',
    'Nimbus',
    'female',
    'natural-cure'
  )
  returning id
),
mudsdale as (
  insert into pokemon (
    id,
    species_id,
    species_name,
    full_name,
    gender,
    ability
  )
  values (
    gen_random_uuid(),
    'mudsdale',
    'Mudsdale',
    'Roy',
    'male',
    'stamina'
  )
  returning id
),
ownership as (

  insert into pokemon_ownership_history (
    id,
    pokemon_id,
    character_id,
    start_date
  )
  select
    gen_random_uuid(),
    p.id,
    c.id,
    current_date
  from inserted_character c
  cross join (
    select id from gardevoir
    union all select id from tyrantrum
    union all select id from lucario
    union all select id from meowscarada
    union all select id from altaria
    union all select id from mudsdale
  ) p
  returning id
)

select 'azumi_seed_complete';