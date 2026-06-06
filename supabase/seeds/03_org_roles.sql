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