-- =========================================
-- EXTENSIONS
-- =========================================
create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";

-- =========================================
-- REGIONS
-- =========================================
create table regions (
  id text primary key,
  name text not null
);

-- =========================================
-- CHARACTERS
-- =========================================
create table characters (
  id uuid primary key default gen_random_uuid(),

  full_name text not null,
  slug text unique,

  origin_region_id text references regions(id),
  current_region_id text references regions(id),

  category text not null,

  age int,
  dob date,
  gender text,
  height text,

  summary text,

  color text,

  short_names jsonb,
  nicknames jsonb,

  image_src text,
  image_type text,

  external_sheet_url text
);

create index idx_characters_origin_region on characters(origin_region_id);
create index idx_characters_current_region on characters(current_region_id);

-- =========================================
-- TRAINER CLASSES
-- =========================================
create table trainer_classes (
  id text primary key,
  name text not null,
  description text,
  color text
);

create table character_classes (
  character_id uuid references characters(id) on delete cascade,
  class_id text references trainer_classes(id) on delete cascade,
  is_primary boolean default false,
  primary key (character_id, class_id)
);

-- =========================================
-- TITLES
-- =========================================
create table character_titles (
  id uuid primary key default gen_random_uuid(),
  character_id uuid references characters(id) on delete cascade,
  title text not null,
  is_featured boolean default false,
  awarded_date date
);

create index idx_character_titles_character on character_titles(character_id);

-- =========================================
-- ORGANIZATIONS
-- =========================================
create table organizations (
  id text primary key,
  name text not null,
  type text,
  region_id text references regions(id),

  description text,

  image_url text,
  banner_url text,

  map_embed_url text,
  map_data jsonb
);

create table organization_maps (
  id uuid primary key default gen_random_uuid(),
  organization_id text references organizations(id) on delete cascade,
  type text,
  title text,
  image_url text,
  map_data jsonb
);

create table org_roles (
  id text primary key,
  name text not null,
  category text,
  tags jsonb
);

create table character_organization_roles (
  id uuid primary key default gen_random_uuid(),

  character_id uuid references characters(id) on delete cascade,
  organization_id text references organizations(id) on delete cascade,
  role_id text references org_roles(id),

  status text not null,

  start_date date,
  end_date date
);

create index idx_org_roles_character on character_organization_roles(character_id);
create index idx_org_roles_org on character_organization_roles(organization_id);

-- =========================================
-- POKEMON
-- =========================================
create table pokemon (
  id uuid primary key default gen_random_uuid(),

  species_id int,
  species_name text,

  shiny boolean default false,
  alpha boolean default false,

  full_name text,
  short_names jsonb,
  gender text,

  caught_at date
);

create table pokemon_builds (
  id uuid primary key default gen_random_uuid(),
  pokemon_id uuid references pokemon(id) on delete cascade,

  name text,
  is_default boolean default false,

  level int,
  ability text,
  held_item text,

  created_at date
);

create table pokemon_build_moves (
  id uuid primary key default gen_random_uuid(),
  build_id uuid references pokemon_builds(id) on delete cascade,

  move text,
  slot_order int
);

create table pokemon_ownership_history (
  id uuid primary key default gen_random_uuid(),

  pokemon_id uuid references pokemon(id) on delete cascade,
  character_id uuid references characters(id) on delete cascade,

  start_date date,
  end_date date
);

create index idx_pokemon_owner_character on pokemon_ownership_history(character_id);

-- =========================================
-- RANKING SYSTEMS
-- =========================================
create table ranking_systems (
  id text primary key,
  organization_id text references organizations(id),
  name text not null,
  scope_type text
);

create table ranking_tiers (
  id text primary key,
  ranking_system_id text references ranking_systems(id) on delete cascade,
  name text not null,
  tier_order int not null
);

create table character_rankings (
  id uuid primary key default gen_random_uuid(),

  character_id uuid references characters(id) on delete cascade,
  ranking_tier_id text references ranking_tiers(id) on delete cascade,

  is_current boolean default false,

  start_date date,
  end_date date
);

create index idx_character_rankings_character on character_rankings(character_id);

-- =========================================
-- GYMS / LEAGUES
-- =========================================
create table leagues (
  id text primary key,
  name text not null,
  type text,
  region_id text references regions(id)
);

create table league_dependencies (
  id text primary key,

  parent_league_id text references leagues(id) on delete cascade,
  child_league_id text references leagues(id) on delete cascade,

  requirement_type text, -- e.g. 'badge_completion', 'qualification', 'entry_rule'
  description text
);

create table gyms (
  id text primary key,
  name text not null,
  city text,
  region_id text references regions(id),
  league_id text references leagues(id)
);

create table gym_badges (
  id text primary key,
  gym_id text references gyms(id) on delete cascade,
  name text not null,
  image_url text
);

create table badge_variants (
  id text primary key,
  badge_id text references gym_badges(id) on delete cascade,
  name text,
  image_url text,
  introduce_date date,
  retired_date date
);

create table badge_variant_issuers (
  id uuid primary key default gen_random_uuid(),
  badge_variant_id text references badge_variants(id) on delete cascade,
  character_id uuid references characters(id) on delete cascade,
  start_date date,
  end_date date
);

create table gym_leaders (
  id uuid primary key default gen_random_uuid(),
  gym_id text references gyms(id) on delete cascade,
  character_id uuid references characters(id) on delete cascade,
  start_date date,
  end_date date,
  is_head_leader boolean default false
);

create table gym_staff (
  id uuid primary key default gen_random_uuid(),
  gym_id text references gyms(id) on delete cascade,
  character_id uuid references characters(id) on delete cascade,
  gym_role text
);

create table gym_pokemon_species (
  id uuid primary key default gen_random_uuid(),
  gym_id text references gyms(id) on delete cascade,

  species_id int,
  species_name text,

  min_level int,
  max_level int,

  notes text
);

create table gym_challenges (
  id uuid primary key default gen_random_uuid(),
  gym_id text references gyms(id) on delete cascade,

  name text,
  format text,
  description text
);

create table character_badges (
  id uuid primary key default gen_random_uuid(),

  character_id uuid references characters(id) on delete cascade,
  badge_variant_id text references badge_variants(id),
  awarded_by_character_id uuid references characters(id),

  obtained_date date
);

-- =========================================
-- EVENTS
-- =========================================
create table event_definitions (
  id text primary key,
  slug text unique,
  title text,
  category text,
  region_id text references regions(id),
  description text
);

create table event_instances (
  id uuid primary key default gen_random_uuid(),
  event_definition_id text references event_definitions(id),

  title text,

  start_date date,
  end_date date,

  status text,
  location text,

  thread_url text
);

create table event_participants (
  id uuid primary key default gen_random_uuid(),
  event_instance_id uuid references event_instances(id) on delete cascade,
  character_id uuid references characters(id) on delete cascade,

  role text,
  status text,
  result text,

  joined_at date,
  exited_at date
);

create table event_brackets (
  id uuid primary key default gen_random_uuid(),
  event_instance_id uuid references event_instances(id) on delete cascade,

  name text,
  type text,
  description text
);

create table bracket_participants (
  id uuid primary key default gen_random_uuid(),
  bracket_id uuid references event_brackets(id) on delete cascade,
  character_id uuid references characters(id) on delete cascade,

  seed int,
  status text,
  elimination_round int,
  notes text
);

create table event_rewards (
  id uuid primary key default gen_random_uuid(),
  event_instance_id uuid references event_instances(id) on delete cascade,

  name text,
  placement int
);

-- =========================================
-- KENN ARTICLES
-- =========================================
create table kenn_articles (
  id uuid primary key default gen_random_uuid(),

  slug text unique,

  title text,

  content_source text,
  category text,

  region_id text references regions(id),
  author_id uuid references characters(id),

  summary text,
  content text,

  image_url text,

  published_date date
);

create table kenn_article_hashtags (
  article_id uuid references kenn_articles(id) on delete cascade,
  tag text,
  primary key (article_id, tag)
);

create table kenn_report_subtypes (
  article_id uuid references kenn_articles(id) on delete cascade,
  report_type text,
  primary key (article_id, report_type)
);

create table kenn_article_links (
  id uuid primary key default gen_random_uuid(),

  article_id uuid references kenn_articles(id) on delete cascade,

  label text,
  link_type text,

  target_id text,
  external_url text,

  created_at date
);

-- =========================================
-- PLOTS
-- =========================================
create table plots (
  id uuid primary key default gen_random_uuid(),

  title text,
  summary text,
  genre text,
  status text,

  contact_name text,
  contact_url text,

  created_at date
);

create table plot_characters (
  id uuid primary key default gen_random_uuid(),
  plot_id uuid references plots(id) on delete cascade,
  character_id uuid references characters(id) on delete cascade,
  role text
);

create table plot_relations (
  id uuid primary key default gen_random_uuid(),
  source_plot_id uuid references plots(id) on delete cascade,
  target_plot_id uuid references plots(id) on delete cascade,
  relation_type text
);

-- =========================================
-- INDEXES (COMMON LOOKUPS)
-- =========================================
create index idx_event_participant_character on event_participants(character_id);
create index idx_event_participant_event on event_participants(event_instance_id);

create index idx_plot_characters_character on plot_characters(character_id);
create index idx_plot_characters_plot on plot_characters(plot_id);

create index idx_kenn_slug on kenn_articles(slug);

create table users (
  id uuid primary key default gen_random_uuid(),

  discord_id text unique not null,

  username text,

  created_at timestamptz default now()
);

create table user_characters (
  user_id uuid references users(id) on delete cascade,
  character_id uuid references characters(id) on delete cascade,

  is_primary boolean default false,

  primary key (user_id, character_id)
);