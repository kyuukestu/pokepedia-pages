select
  conname,
  conrelid::regclass as table_from,
  confrelid::regclass as table_to
from pg_constraint
where conrelid = 'pokemon_ownership_history'::regclass;