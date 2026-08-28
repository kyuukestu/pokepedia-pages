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