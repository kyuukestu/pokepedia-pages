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