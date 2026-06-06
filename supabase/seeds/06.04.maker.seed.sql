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
    'Maker Tawa',
    'kalos',
    'kalos',
    'oc',
    null,
    'female',
    null,
    '#f05656',
    'maker.png'
  )
  returning id
),

primary_class as (
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
select 'maker_seed_complete';