-- =========================================
-- REGIONS SEED
-- =========================================

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
  ('orange_islands', 'Orange Islands'),
  ('decolore_islands', 'Decolore Islands'),

  -- Custom Regions
  ('metztli', 'Metztli')

on conflict (id) do nothing;