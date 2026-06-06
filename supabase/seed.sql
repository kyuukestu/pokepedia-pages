-- =========================
-- REGIONS SEED
-- =========================

insert into regions (id, name) values
-- Main Regions
('indigo', 'Indigo'),
('kanto', 'Kanto'),
('johto', 'Johto'),
('hoenn', 'Hoenn'),
('sinnoh', 'Sinnoh'),
('unova', 'Unova'),
('kalos', 'Kalos'),
('alola', 'Alola'),
('galar', 'Galar'),
('paldea', 'Paldea'),

-- Side Regions
('fiore', 'Fiore'),
('almia', 'Almia'),
('oblivia', 'Oblivia'),
('ferrum', 'Ferrum'),
('orre', 'Orre'),
('orangeIslands', 'Orange Islands'),
('decoloreIslands', 'Decolore Islands'),

-- Custom Regions
('metztli', 'Metztli');

-- =========================================
-- TRAINER CLASSES SEED
-- =========================================

insert into trainer_classes (id, name, description, color) values
  ('coordinator', 'Coordinator', 'Specialists in contests, performance, and appeal-based battles.', '#E85D75'),
  ('researcher', 'Researcher', 'Studies Pokémon biology, behavior, and ecological systems.', '#4C7EA8'),
  ('athlete', 'Athlete', 'Physical trainers focused on endurance, strength, and competition.', '#F2A65A'),
  ('ranger', 'Ranger', 'Protects ecosystems and assists wild Pokémon in natural habitats.', '#5FB49C'),
  ('performer', 'Performer', 'Focuses on performance arts involving Pokémon.', '#C77DFF'),
  ('battler', 'Battler', 'Competitive trainers focused on structured battling.', '#6C63FF'),
  ('breeder', 'Breeder', 'Specialists in raising, nurturing, and developing Pokémon.', '#9AD1D4'),
  ('other', 'Other', 'Unclassified or hybrid trainer roles.', '#9AA0A6')

on conflict (id) do nothing;

-- =========================================
-- ORGANIZATION ROLES (CORE SEED)
-- =========================================

insert into org_roles (id, name, category, tags) values
  (
    'gym_leader',
    'Gym Leader',
    'Leader of a Gym responsible for battles and badge awarding.',
    '["gym", "leadership", "combat"]'
  ),
  (
    'researcher',
    'Researcher',
    'Studies Pokémon, ecosystems, and phenomena within organizations.',
    '["academic", "fieldwork"]'
  ),
  (
    'admin',
    'Administrator',
    'Handles organizational management and oversight.',
    '["management", "operations"]'
  )

on conflict (id) do nothing;

-- =========================================
-- ORGANIZATIONS SEED
-- =========================================

insert into organizations (
  id,
  name,
  type,
  region_id,
  description,
  image_url,
  banner_url,
  map_embed_url,
  map_data
) values

-- =========================
-- PUBLIC SECTOR
-- =========================
(
  'poke-association',
  'Pokémon Association',
  'public',
  null,
  'The primary governing body responsible for League legislation, regional borders, and the global trainer registry.',
  null,
  null,
  null,
  null
),
(
  'activities-committee',
  'Activities Committee',
  'public',
  null,
  'Focuses on non-combat sanctioned events, including Contests, Pokéathlon management, and regional festivals.',
  null,
  null,
  null,
  null
),
(
  'athletics-board',
  'Athletics Board',
  'public',
  null,
  'A regulatory group dedicated to the physical safety of Pokémon athletes and the standardizing of stadium equipment.',
  null,
  null,
  null,
  null
),
(
  'aviation-agency',
  'Aviation Administration Agency',
  'public',
  null,
  'Oversees all airborne travel, from commercial regional flights to regulation of Fly-certified Pokémon.',
  null,
  null,
  null,
  null
),
(
  'transport-tribunal',
  'Terrestrial Transportation Tribunal',
  'public',
  null,
  'Manages land-based infrastructure including Magnet Train scheduling, Cycling Road tolls, and tunnel safety.',
  null,
  null,
  null,
  null
),
(
  'maritime-ministry',
  'Ministry of Maritime Movement',
  'public',
  null,
  'Controls sea lanes, lighthouse maintenance, and S.S. fleet operations.',
  null,
  null,
  null,
  null
),
(
  'inspection-agency',
  'Pokémon Inspection Agency',
  'public',
  null,
  'Conducts unannounced audits of Gym Leaders to ensure competitive integrity across the League.',
  null,
  null,
  null,
  null
),
(
  'inter-pol',
  'InterPol',
  'public',
  null,
  'Global law enforcement agency tracking fugitives, organized crime, and interregional threats.',
  null,
  null,
  null,
  null
),
(
  'ranger-union',
  'Ranger Union',
  'public',
  null,
  'Environmental protection organization using Capture Stylers for temporary Pokémon bonding and disaster relief.',
  null,
  null,
  null,
  null
),

-- =========================
-- PRIVATE SECTOR
-- =========================
(
  'silph-co',
  'Silph Co.',
  'private',
  null,
  'Leader in Poké Ball manufacturing and digital scope technologies based in Saffron City.',
  null,
  null,
  null,
  null
),
(
  'devon-corp',
  'Devon Corporation',
  'private',
  null,
  'Hoenn-based corporation specializing in fossil restoration and trainer technology systems.',
  null,
  null,
  null,
  null
),
(
  'altru-inc',
  'Altru Inc.',
  'private',
  null,
  'Almia-based company focused on environmental energy research and conservation technologies.',
  null,
  null,
  null,
  null
),
(
  'aether-foundation',
  'Aether Foundation',
  'private',
  null,
  'Research organization studying Pokémon rehabilitation and Ultra Wormhole phenomena.',
  null,
  null,
  null,
  null
),
(
  'macro-cosmos',
  'Macro Cosmos',
  'private',
  null,
  'Galar conglomerate managing energy systems and League broadcasting infrastructure.',
  null,
  null,
  null,
  null
),
(
  'lysandre-labs',
  'Lysandre Labs',
  'private',
  null,
  'Kalos technology corporation focused on Mega Evolution energy and Holo Caster systems.',
  null,
  null,
  null,
  null
),

-- =========================
-- FACTIONS / CRIMINAL
-- =========================
(
  'team-plasma',
  'Team Plasma',
  'criminal',
  null,
  'Reformed group advocating Pokémon liberation and ethical treatment reforms.',
  null,
  null,
  null,
  null
),
(
  'rocket-remnants',
  'Rocket Remnants',
  'criminal',
  null,
  'Scattered syndicate cells continuing illegal poaching and rare Pokémon trade.',
  null,
  null,
  null,
  null
),
(
  'magma-remnants',
  'Magma Remnants',
  'criminal',
  null,
  'Extremist geologists pursuing land expansion through illegal means.',
  null,
  null,
  null,
  null
),
(
  'aqua-remnants',
  'Aqua Remnants',
  'criminal',
  null,
  'Radical environmental faction attempting to increase global sea levels.',
  null,
  null,
  null,
  null
),
(
  'galactic-remnants',
  'Galactic Remnants',
  'criminal',
  null,
  'Researchers attempting to exploit space-time energy distortions.',
  null,
  null,
  null,
  null
),
(
  'neo-plasma',
  'Neo Team Plasma',
  'criminal',
  null,
  'Militant splinter faction enforcing Pokémon liberation through force.',
  null,
  null,
  null,
  null
),
(
  'flare-remnants',
  'Flare Remnants',
  'criminal',
  null,
  'Elite extremist group seeking a "beautiful world" through destruction.',
  null,
  null,
  null,
  null
),
(
  'dim-sun',
  'Team Dim Sun',
  'criminal',
  null,
  'Almia-based criminal organization using mechanical control devices on Pokémon.',
  null,
  null,
  null,
  null
),
(
  'pinchers-societea',
  'Pinchers & Societea',
  'criminal',
  null,
  'Oblivia groups using control gauntlets to enslave Pokémon.',
  null,
  null,
  null,
  null
),
(
  'cipher-snagem',
  'Cipher & Snagem',
  'criminal',
  null,
  'Orre-based organizations responsible for Shadow Pokémon experiments.',
  null,
  null,
  null,
  null
);

-- =========================
-- ACADEMY
-- =========================
insert into organizations (
  id,
  name,
  type,
  region_id,
  description,
  image_url,
  banner_url,
  map_embed_url,
  map_data
) values (
  'johto-academy',
  'Johto Academy',
  'academy',
  'johto',
  'A new academy on the outskirts of Violet City known for its independent study programs.',
  'https://images.unsplash.com/photo-1541339907198-e08759df9a73?q=80&w=2000',
  null,
  null,
  null
);

insert into leagues (id, name, type, region_id)
values
('kanto-league', 'Kanto League', 'regional_league', 'kanto'),
('johto-league', 'Johto League', 'regional_league', 'johto'),
('indigo-league', 'Indigo League', 'federation_league', 'kanto');

insert into league_dependencies values
('indigo-kanto', 'indigo-league', 'kanto-league', 'badge_requirement',
 'Must obtain 8 Kanto badges'),

('indigo-johto', 'indigo-league', 'johto-league', 'badge_requirement',
 'Must obtain 8 Johto badges');


insert into leagues (id, name, type, region_id)
values (
  'hoenn-league',
  'Hoenn League',
  'regional_league',
  'hoenn'
);

insert into leagues (id, name, type, region_id)
values (
  'sinnoh-league',
  'Sinnoh League',
  'regional_league',
  'sinnoh'
);

insert into leagues (id, name, type, region_id)
values (
  'unova-league',
  'Unova League',
  'regional_league',
  'unova'
);

insert into leagues (id, name, type, region_id)
values (
  'kalos-league',
  'Kalos League',
  'regional_league',
  'kalos'
);

insert into leagues (id, name, type, region_id)
values (
  'alola-league',
  'Alola League',
  'regional_league',
  'alola'
);

insert into leagues (id, name, type, region_id)
values (
  'galar-league',
  'Galar League',
  'sporting_league',
  'galar'
);

insert into leagues (id, name, type, region_id)
values (
  'paldea-league',
  'Paldea League',
  'assessment_system',
  'paldea'
);

with inserted_character as (

  insert into characters (
    full_name,
    slug,
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
    'Esther Rosana Sophys',
    'esther',
    'oblivia',
    'oblivia',
    'oc',
    17,
    'female',
    '5 ft 6 in',
    '#f05656',
    'esther.png'
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
    '0782',
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