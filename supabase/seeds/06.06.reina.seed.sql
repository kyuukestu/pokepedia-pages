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
    'Reina Amaranta Esmeralda de la Santa Cruz Caballero Cortez',
    'metztli',
    'metztli',
    'oc',
    17,
    'female',
    '5 ft 6 in',
    '#1DAD4D',
    'reina.png'
  )
  returning id
),
titles as (
  insert into character_titles (
    id,
    character_id,
    title,
    is_featured
  )
  select
    gen_random_uuid(),
    id,
    'La Tormenta Esmeralda',
    true
  from inserted_character
  returning id
),
class_link as (
  insert into character_classes (
    character_id,
    class_id,
    is_primary
  )
  select
    id,
    'battler',
    true
  from inserted_character
  returning character_id
),
select 'reina_seed_complete';
