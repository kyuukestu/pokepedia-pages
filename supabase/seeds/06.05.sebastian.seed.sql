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
    'Sebastian Yu',
    'kalos',
    'kalos',
    'oc',
    21,
    'male',
    '6 ft 2 in',
    '#9CB0C4',
    'sebastian.png'
  )
  returning id
),
character_class as (
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
select 'sebastian_seed_complete';