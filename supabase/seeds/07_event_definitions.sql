insert into event_definitions (
  id,
  slug,
  title,
  category,
  region_id,
  description
)
values
  (
    gen_random_uuid(),
    'sumo-conference',
    'Sumo Conference',
    'competition',
    'johto',
    'A heavy-weight trial of strength where Pokémon compete in traditional sumo wrestling. Victory is achieved by forcing an opponent out of the ring or causing any part of their body (other than their feet) to touch the ground.'
  ),
  (
    gen_random_uuid(),
    'running-of-the-tauros',
    'Running of the Tauros',
    'competition',
    'johto',
    'A chaotic and traditional event held in Palmpona. A herd of Tauros is released to thunder through the city streets toward the battle stadium. Participants run alongside the herd attempting to touch a Tauros horn to claim victory.'
  ),
  (
    gen_random_uuid(),
    'fire-rescue-grand-prix',
    'Fire & Rescue Grand Prix',
    'competition',
    'johto',
    'A multi-stage emergency-response competition testing Pokémon synergy, speed, and firefighting capability through simulated disaster scenarios.'
  ),
  (
    gen_random_uuid(),
    'one-on-one-tauros-competition',
    'One-on-One Tauros Competition',
    'competition',
    'johto',
    'An ancient strength-based Tauros duel where competitors use horn-based grappling to force opponents down.'
  ),
  (
    gen_random_uuid(),
    'balloon-race',
    'Pokémon Balloon Race',
    'other',
    'johto',
    'A sky-based race where trainers and Pokémon navigate hot air balloons through aerial obstacle courses.'
  ),
  (
    gen_random_uuid(),
    'rivers-crown',
    'River''s Crown Medieval Festival',
    'festival',
    'kalos',
    'A historical festival celebrating medieval Unovan and Kalosian culture through reenactments and themed events.'
  ),
  (
    gen_random_uuid(),
    'alola-contest',
    'Alolan Pokémon Contest',
    'contest',
    'alola',
    'Regional contests focused on style, performance, and expressive Pokémon presentation across the Alola islands.'
  ),
  (
    gen_random_uuid(),
    'indigo-conference',
    'Indigo Conference',
    'tournament',
    'kanto',
    'The Indigo Plateau championship tournament for trainers who have collected eight Kanto gym badges.'
  ),
  (
    gen_random_uuid(),
    'silver-conference',
    'Silver Conference',
    'tournament',
    'johto',
    'Johto League championship held at Mt. Silver, featuring top regional trainers.'
  ),
  (
    gen_random_uuid(),
    'sanguine-swarm',
    'Sanguine Swarm',
    'ecological',
    'johto',
    'A volatile ecological event involving aggressive Zubat swarm activity across caves and mountain routes.'
  ),
  (
    gen_random_uuid(),
    'elder-karp-hunt',
    'Great Hunt for The Elder Karp',
    'competition',
    'sinnoh',
    'A regional angling competition in Sinnoh celebrating legendary fishing skill and rare Pokémon sightings.'
  );