CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE regions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TYPE character_category AS ENUM (
    'oc', 'npc'
);

CREATE TYPE gender_type AS ENUM (
    'male', 'female', 'non-binary', 'undetermined', 
    'other'
);

CREATE TABLE characters (
    id TEXT PRIMARY KEY,
    
    full_name TEXT NOT NULL,
    
    origin_region_id TEXT NOT NULL REFERENCES regions(id),
    current_region_id TEXT REFERENCES regions(id),
    
    category character_category NOT NULL,
    
    age INTEGER,
    dob DATE,
    
    gender gender_type,
    
    height TEXT,
    
    summary TEXT,
    
    color TEXT,
    
    primary_title TEXT,
    secondary_titles JSONB,
    
    primary_class TEXT,
    secondary_classes JSONB,
    
    short_names JSONB,
    nicknames JSONB,
    
    image_src TEXT,
    image_type TEXT,
    
    external_sheet_url TEXT
);

CREATE TYPE organization_type AS ENUM (
    'academy',
    'league',
    'corporation',
    'lab',
    'evil_team'
);

CREATE TABLE organizations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type organization_type NOT NULL,
    region_id TEXT REFERENCES regions(id)
);

CREATE TABLE roles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    tags JSONB
);

CREATE TABLE organization_ranks (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL REFERENCES organizations(id),
    name TEXT NOT NULL,
    hierarchy_level INTEGER NOT NULL
);

CREATE UNIQUE INDEX organization_rank_name_unique ON organization_ranks (organization_id, name);

CREATE TYPE membership_status AS ENUM (
    'active', 'former', 'suspended', 'retired', 'honorary', 'emeritus'
);

CREATE TABLE character_organization_roles (
    id UUID PRIMARY KEY,
    
    character_id TEXT NOT NULL REFERENCES characters(id),
    
    organization_id TEXT NOT NULL REFERENCES organizations(id),
    
    role_id TEXT REFERENCES roles(id),
    
    rank_id TEXT REFERENCES organization_ranks(id),
    
    status membership_status NOT NULL DEFAULT 'active',
    
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    
    start_date DATE,
    end_date DATE
);

CREATE UNIQUE INDEX character_org_role_unique ON character_organization_roles ( character_id, organization_id, role_id, rank_id, start_date);

CREATE TABLE pokemon (
    id UUID PRIMARY KEY,
    
    species_id TEXT NOT NULL,
    
    shiny boolean,
    alpha boolean,
    
    full_name TEXT NOT NULL,
    short_names JSONB,
    
    gender gender_type,
    
    caught_at DATE

);

CREATE TABLE pokemon_ownership_history(
    id UUID PRIMARY KEY,
    
    pokemon_id UUID NOT NULL REFERENCES pokemon(id),
    
    character_id TEXT NOT NULL REFERENCES characters(id),
    
    start_date DATE,
    end_date DATE
);

CREATE UNIQUE INDEX one_active_owner_per_pokemon
ON pokemon_ownership_history(pokemon_id)
WHERE end_date IS NULL;

CREATE TABLE pokemon_builds (
    id UUID PRIMARY KEY,
    
    pokemon_id UUID NOT NULL REFERENCES pokemon(id),
    
    name TEXT NOT NULL,
    is_default boolean NOT NULL DEFAULT FALSE,
    
    level int DEFAULT 1,
    ability TEXT,
    held_item TEXT,
    
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX one_default_build_per_pokemon ON pokemon_builds(pokemon_id) WHERE is_default = true;

CREATE TABLE pokemon_build_moves (
    id UUID PRIMARY KEY,
    
    build_id UUID NOT NULL REFERENCES pokemon_builds(id),
    
    move TEXT,
    
    slot_order INTEGER
);

CREATE UNIQUE INDEX unique_move_slot_per_build
ON pokemon_build_moves(build_id, slot_order);
