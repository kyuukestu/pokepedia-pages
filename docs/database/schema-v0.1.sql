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

alter table regions enable row level security;

create policy "regions public read"
on regions
for select
using (true);
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

alter table characters enable row level security;

create policy "characters public read"
on characters
for select
using (true);

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

alter table trainer_classes enable row level security;

create policy "trainer_classes public read"
on trainer_classes
for select
using (true);

create table character_classes (
  character_id uuid references characters(id) on delete cascade,
  class_id text references trainer_classes(id) on delete cascade,
  is_primary boolean default false,
  primary key (character_id, class_id)
);

alter table character_classes enable row level security;

create policy "character_classes public read"
on character_classes
for select
using (true);

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

alter table character_titles enable row level security;

create policy "character_titles public read"
on character_titles
for select
using (true);

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

alter table organizations enable row level security;

create policy "organizations public read"
on organizations
for select
using (true);

create table organization_maps (
  id uuid primary key default gen_random_uuid(),
  organization_id text references organizations(id) on delete cascade,
  type text,
  title text,
  image_url text,
  map_data jsonb
);

alter table organization_maps enable row level security;

create policy "organization_maps public read"
on organization_maps
for select
using (true);

create table org_roles (
  id text primary key,
  name text not null,
  category text,
  tags jsonb
);

alter table org_roles enable row level security;

create policy "org_roles public read"
on org_roles
for select
using (true);

create table character_organization_roles (
  id uuid primary key default gen_random_uuid(),

  character_id uuid references characters(id) on delete cascade,
  organization_id text references organizations(id) on delete cascade,
  role_id text references org_roles(id),

  status text not null,

  start_date date,
  end_date date
);

alter table character_organization_roles enable row level security;

create policy "character_organization_roles public read"
on character_organization_roles
for select
using (true);

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
  nicknames jsonb,
  
  gender text,

  caught_at date
);

alter table pokemon enable row level security;

create policy "pokemon public read"
on pokemon
for select
using (true);

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

alter table pokemon_builds enable row level security;

create policy "pokemon_builds public read"
on pokemon_builds
for select
using (true);

create table pokemon_build_moves (
  id uuid primary key default gen_random_uuid(),
  build_id uuid references pokemon_builds(id) on delete cascade,

  move text,
  slot_order int
);

alter table pokemon_build_moves enable row level security;

create policy "pokemon_build_moves public read"
on pokemon_build_moves
for select
using (true);

create table pokemon_ownership_history (
  id uuid primary key default gen_random_uuid(),

  pokemon_id uuid references pokemon(id) on delete cascade,
  character_id uuid references characters(id) on delete cascade,

  start_date date,
  end_date date
);

alter table pokemon_ownership_history enable row level security;

create policy "pokemon_ownership_history public read"
on pokemon_ownership_history
for select
using (true);

create index idx_pokemon_owner_character on pokemon_ownership_history(character_id);
-- =========================================
-- Character Party
-- =========================================
create table character_parties (
  id uuid primary key,
  character_id uuid references characters(id) on delete cascade,
  name text not null,
  is_default boolean default false,
  event_id uuid null
);

alter table character_parties enable row level security;

create policy "character_parties public read"
on character_parties
for select
using (true);

create table character_party_members (
  party_id uuid references character_parties(id) on delete cascade,
  pokemon_id uuid references pokemon(id) on delete cascade,
  slot_index int not null,
  primary key (party_id, slot_index)
);

alter table character_party_members enable row level security;

create policy "character_party_members public read"
on character_party_members
for select
using (true);

-- =========================================
-- RANKING SYSTEMS
-- =========================================
create table ranking_systems (
  id text primary key,
  organization_id text references organizations(id),
  name text not null,
  scope_type text
);

alter table ranking_systems enable row level security;

create policy "ranking_systems public read"
on ranking_systems
for select
using (true);

create table ranking_tiers (
  id text primary key,
  ranking_system_id text references ranking_systems(id) on delete cascade,
  name text not null,
  tier_order int not null
);

alter table ranking_tiers enable row level security;

create policy "ranking_tiers public read"
on ranking_tiers
for select
using (true);

create table character_rankings (
  id uuid primary key default gen_random_uuid(),

  character_id uuid references characters(id) on delete cascade,
  ranking_tier_id text references ranking_tiers(id) on delete cascade,

  is_current boolean default false,

  start_date date,
  end_date date
);

alter table character_rankings enable row level security;

create policy "character_rankings public read"
on character_rankings
for select
using (true);

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

alter table leagues enable row level security;

create policy "leagues public read"
on leagues
for select
using (true);

create table league_dependencies (
  id text primary key,

  parent_league_id text references leagues(id) on delete cascade,
  child_league_id text references leagues(id) on delete cascade,

  requirement_type text, -- e.g. 'badge_completion', 'qualification', 'entry_rule'
  description text
);

alter table league_dependencies enable row level security;

create policy "league_dependencies public read"
on league_dependencies
for select
using (true);

create table gyms (
  id text primary key,
  name text not null,
  city text,
  region_id text references regions(id),
  league_id text references leagues(id)
);

alter table gyms enable row level security;

create policy "gyms public read"
on gyms
for select
using (true);

create table gym_badges (
  id text primary key,
  gym_id text references gyms(id) on delete cascade,
  name text not null
);

alter table gym_badges enable row level security;

create policy "gym_badges public read"
on gym_badges
for select
using (true);

create table ribbons (
  id text primary key,
  name text not null,
  image_url text,
  region_id text references regions(id)
);

alter table ribbons enable row level security;

create policy "ribbons public read"
on ribbons
for select
using (true);

create table badge_variants (
  id text primary key,
  badge_id text references gym_badges(id) on delete cascade,
  name text,
  image_url text,
  introduce_date date,
  retired_date date
);

alter table badge_variants enable row level security;

create policy "badge_variants public read"
on badge_variants
for select
using (true);

create table badge_variant_issuers (
  id uuid primary key default gen_random_uuid(),
  badge_variant_id text references badge_variants(id) on delete cascade,
  character_id uuid references characters(id) on delete cascade,
  start_date date,
  end_date date
);

alter table badge_variant_issuers enable row level security;

create policy "badge_variant_issuers public read"
on badge_variant_issuers
for select
using (true);

create table gym_leaders (
  id uuid primary key default gen_random_uuid(),
  gym_id text references gyms(id) on delete cascade,
  character_id uuid references characters(id) on delete cascade,
  start_date date,
  end_date date,
  is_head_leader boolean default false
);

alter table gym_leaders enable row level security;

create policy "gym_leaders public read"
on gym_leaders
for select
using (true);

create table gym_staff (
  id uuid primary key default gen_random_uuid(),
  gym_id text references gyms(id) on delete cascade,
  character_id uuid references characters(id) on delete cascade,
  gym_role text
);

alter table gym_staff enable row level security;

create policy "gym_staff public read"
on gym_staff
for select
using (true);

create table gym_pokemon_species (
  id uuid primary key default gen_random_uuid(),
  gym_id text references gyms(id) on delete cascade,

  species_id int,
  species_name text,

  min_level int,
  max_level int,

  notes text
);

alter table gym_pokemon_species enable row level security;

create policy "gym_pokemon_species public read"
on gym_pokemon_species
for select
using (true);

create table gym_challenges (
  id uuid primary key default gen_random_uuid(),
  gym_id text references gyms(id) on delete cascade,

  name text,
  format text,
  description text
);

alter table gym_challenges enable row level security;

create policy "gym_challenges public read"
on gym_challenges
for select
using (true);

create table character_badges (
  id uuid primary key default gen_random_uuid(),

  character_id uuid references characters(id) on delete cascade,
  badge_variant_id text references badge_variants(id),
  awarded_by_character_id uuid references characters(id),

  obtained_date date
);

alter table character_badges enable row level security;

create policy "character_badges public read"
on character_badges
for select
using (true);

create table character_ribbons (
  id uuid primary key default gen_random_uuid(),

  character_id uuid references characters(id) on delete cascade,
  ribbon_id text references ribbons(id),

  obtained_date date
);

alter table character_ribbons enable row level security;

create policy "character_ribbons public read"
on character_ribbons
for select
using (true);


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

alter table event_definitions enable row level security;

create policy "event_definitions public read"
on event_definitions
for select
using (true);

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

alter table event_instances enable row level security;

create policy "event_instances public read"
on event_instances
for select
using (true);

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

alter table event_participants enable row level security;

create policy "event_participants public read"
on event_participants
for select
using (true);

create table event_brackets (
  id uuid primary key default gen_random_uuid(),
  event_instance_id uuid references event_instances(id) on delete cascade,

  name text,
  type text,
  description text
);

alter table event_brackets enable row level security;

create policy "event_brackets public read"
on event_brackets
for select
using (true);

create table bracket_participants (
  id uuid primary key default gen_random_uuid(),
  bracket_id uuid references event_brackets(id) on delete cascade,
  character_id uuid references characters(id) on delete cascade,

  seed int,
  status text,
  elimination_round int,
  notes text
);

alter table bracket_participants enable row level security;

create policy "bracket_participants public read"
on bracket_participants
for select
using (true);

create table event_rewards (
  id uuid primary key default gen_random_uuid(),
  event_instance_id uuid references event_instances(id) on delete cascade,

  name text,
  placement int
);

alter table event_rewards enable row level security;

create policy "event_rewards public read"
on event_rewards
for select
using (true);

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

alter table kenn_articles enable row level security;

create policy "kenn_articles public read"
on kenn_articles
for select
using (true);

create table kenn_article_hashtags (
  article_id uuid references kenn_articles(id) on delete cascade,
  tag text,
  primary key (article_id, tag)
);

alter table kenn_article_hashtags enable row level security;

create policy "kenn_article_hashtags public read"
on kenn_article_hashtags
for select
using (true);

create table kenn_report_subtypes (
  article_id uuid references kenn_articles(id) on delete cascade,
  report_type text,
  primary key (article_id, report_type)
);

alter table kenn_report_subtypes enable row level security;

create policy "kenn_report_subtypes public read"
on kenn_report_subtypes
for select
using (true);

create table kenn_article_links (
  id uuid primary key default gen_random_uuid(),

  article_id uuid references kenn_articles(id) on delete cascade,

  label text,
  link_type text,

  target_id text,
  external_url text,

  created_at date
);

alter table kenn_article_links enable row level security;

create policy "kenn_article_links public read"
on kenn_article_links
for select
using (true);

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

alter table plots enable row level security;

create policy "plots public read"
on plots
for select
using (true);

create table plot_characters (
  id uuid primary key default gen_random_uuid(),
  plot_id uuid references plots(id) on delete cascade,
  character_id uuid references characters(id) on delete cascade,
  role text
);

alter table plot_characters enable row level security;

create policy "plot_characters public read"
on plot_characters
for select
using (true);

create table plot_relations (
  id uuid primary key default gen_random_uuid(),
  source_plot_id uuid references plots(id) on delete cascade,
  target_plot_id uuid references plots(id) on delete cascade,
  relation_type text
);

alter table plot_relations enable row level security;

create policy "plot_relations public read"
on plot_relations
for select
using (true);

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

alter table users enable row level security;

create policy "users public read"
on users
for select
using (true);

create table user_characters (
  user_id uuid references users(id) on delete cascade,
  character_id uuid references characters(id) on delete cascade,

  is_primary boolean default false,

  primary key (user_id, character_id)
);

alter table user_characters enable row level security;

create policy "user_characters public read"
on user_characters
for select
using (true);

create view pokemon_ownership_active as
select distinct on (pokemon_id)
  *
from pokemon_ownership_history
where end_date is null
order by pokemon_id, start_date desc;

create or replace view character_dashboard_view as
select
    c.id,
    c.slug,
    
    c.full_name,
    coalesce(c.short_names, '[]'::jsonb) as short_names,
    coalesce(c.nicknames, '[]'::jsonb) as nicknames,
    
    origin.id   as origin_region_id,
    origin.name as origin_region_name,

    current.id   as current_region_id,
    current.name as current_region_name,

    c.category,

    c.age,
    c.dob,
    c.gender,
    c.height,

    c.summary,

    c.color,
    c.image_src,
    c.image_type,
    
    c.external_sheet_url,
    
    (
      select coalesce(
        jsonb_agg(
          jsonb_build_object(
            'id', cc.class_id,
            'is_primary', cc.is_primary
          )
        ),
        '[]'::jsonb
      )
      from character_classes cc
      where cc.character_id = c.id
    ) as classes,

    (
      select coalesce(
        jsonb_agg(
          jsonb_build_object(
            'id', ct.id,
            'title', ct.title,
            'is_featured', ct.is_featured,
            'awarded_date', ct.awarded_date
          )
          order by ct.awarded_date desc nulls last
        ),
        '[]'::jsonb
      )
      from character_titles ct
      where ct.character_id = c.id
    ) as titles,
    
    (
      select coalesce(
        jsonb_agg(to_jsonb(ordered)),
        '[]'::jsonb
      )
      from (
        select p.*, cpm.slot_index
        from character_party_members cpm
        join character_parties cp
          on cp.id = cpm.party_id
        join pokemon p
          on p.id = cpm.pokemon_id
        where cp.character_id = c.id
          and cp.is_default = true
        order by cpm.slot_index
      ) ordered
    )
    as pokemon_active,

  ( -- This can be expanded when the UI wants to present ownership timeline; currently purely relational.
      select coalesce(
         jsonb_agg(to_jsonb(ordered)),
         '[]'::jsonb
       )
       from (
         select poh.*
         from pokemon_ownership_history poh
         where poh.character_id = c.id
         order by poh.start_date desc
       ) ordered
  ) as pokemon_history, -- Join on pokemon table to grab pokemon name and species to present instead of ids

  (
    select coalesce(jsonb_agg(to_jsonb(poa)), '[]'::jsonb)
    from pokemon_ownership_active poa
    where poa.character_id = c.id
  ) as pokemon_owned_current,

  (
    select coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', cb.id,
          'character_id', cb.character_id,
          'obtained_date', cb.obtained_date,
  
          'badge_id', gb.id,
          'badge_name', gb.name,
  
          'gym_id', g.id,
          'gym_name', g.name,
  
          'region_id', r.id,
          'region', r.name,

          'league_id', l.id,
          'league', l.name,
  
          'variant_id', bv.id,
          'variant_name', bv.name,
          'image_url', bv.image_url,
  
          'issuer', jsonb_build_object(
            'id', issuer.id,
            'full_name', issuer.full_name
          )
        )
    )  
    , '[]'::jsonb
    )
    from character_badges cb
  
    join badge_variants bv
      on bv.id = cb.badge_variant_id
  
    join gym_badges gb
      on gb.id = bv.badge_id
  
    join gyms g
      on g.id = gb.gym_id
  
    join regions r
      on r.id = g.region_id

    join leagues l
      on l.id = g.league_id
  
    left join characters issuer
      on issuer.id = cb.awarded_by_character_id
  
    where cb.character_id = c.id

  ) as character_badges,

  (
    select coalesce(
        json_agg(
        
        json_build_object(
          'id', cr.id,
          'character_id', cr.character_id,
          'obtained_date', cr.obtained_date,
          
          'ribbon_id', cr.ribbon_id,
          'ribbon_name', r.name,

          'region_id', r2.id,
          'region', r2.name,

          'image_url', r.image_url
        )
      ), '[]'::json)
    from character_ribbons cr

    join ribbons r
      on r.id = cr.ribbon_id

    join regions r2
      on r2.id = r.region_id

    where cr.character_id = c.id
  ) as character_ribbons

from characters c

left join regions origin 
on origin.id = c.origin_region_id

left join regions current
on current.id = c.current_region_id;
