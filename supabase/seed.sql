-- Regions
INSERT INTO regions (id, name)
VALUES 
('kanto', 'Kanto'),
('johto', 'Johto');

-- Character
INSERT INTO characters (
  id,
  full_name,
  origin_region_id,
  current_region_id,
  category
)
VALUES (
  'esther',
  'Esther Astierra',
  'kanto',
  'kanto',
  'oc'
);

-- Pokémon
INSERT INTO pokemon (
  id,
  species_id,
  full_name,
  short_names
)
VALUES (
  gen_random_uuid(),
  'ribombee',
  'Pyrrha Achilleia Astierra',
  '["Pyrrha"]'::jsonb
);