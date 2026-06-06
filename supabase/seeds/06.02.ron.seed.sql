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
    'Ron Tawa',
    'johto',
    'johto',
    'oc',
    26,
    'male',
    '6 ft 2 in',
    '#f05656',
    'ron.png'
  )
  returning id
)

, inserted_class as (
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
)

select 'ron_seed_complete' as status;