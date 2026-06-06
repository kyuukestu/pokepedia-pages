create table user_characters (
  discord_user_id text,
  character_id uuid references characters(id),
  primary key (discord_user_id, character_id)
);