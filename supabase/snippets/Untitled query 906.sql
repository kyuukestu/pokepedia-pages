SELECT 
  c.full_name AS character,
  p.full_name AS pokemon
FROM pokemon p
JOIN pokemon_ownership_history h ON h.pokemon_id = p.id
JOIN characters c ON c.id = h.character_id;