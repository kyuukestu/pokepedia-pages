# Migration_Map.md

## Overview

This document outlines the planned transition from a static TypeScript-based content system (Vite file-driven registry) to a hybrid architecture using a database (Supabase/Postgres) alongside Git-managed canonical worldbuilding data.

The goal is to preserve current functionality while enabling:

- user-generated content
- relational data modeling
- scalable event/plot systems
- reduced manual maintenance overhead

---

# Architecture Strategy

## Hybrid Model

The project will use two data layers:

### Static Layer (Git / Source Controlled)

Canonical worldbuilding data that rarely changes and is primarily curated by staff.

### Dynamic Layer (Database)

User-generated, relational, or frequently changing content.

---

# Static Content (Git-managed)

These remain in TypeScript / structured content files:

## World & Canonical Data

- Regions
- Lore
- Geography (future expansion)
- Contest Registry
- League Structure
- Event Definitions
- Institution Definitions (base metadata)

## Why Static

- Rarely changed
- Staff-curated
- Benefits from version control and history tracking
- No need for relational queries or user mutation

---

# Database Content (Supabase/Postgres)

These entities require relational structure, user interaction, or frequent updates:

## Core User Content

- Characters
- Pokémon (character teams)
- Achievements (badges, ribbons, tournament results)
- Galleries (character media assets)

## Narrative Systems

- Plots
- Travel Groups
- Event Instances
- KENN Articles (in-universe news system)

## Why Database

- Many-to-many relationships
- User-generated content
- Frequent updates
- Query complexity (filters, joins, cross-referencing)

---

# Hybrid Content (Split Responsibility)

## Institutions

### Static (Git)

Institution definition:

- name
- description
- image/logo
- location
- specialties
- map configuration
- enrollment rules

### Database

Institution relationships:

- faculty membership
- leadership roles
- character affiliations
- enrollment participation

---

# Relationship Tables (Database)

These represent many-to-many relationships across systems:

## Character Relationships

- character_affiliations
- character_plots
- character_travel_groups
- character_events

## Plot System

- plot_participants

## Travel System

- travel_group_members

## Event System

- event_participants

## Institution System

- institution_members

---

# Event System Design

## Event Definitions (Static)

Templates for recurring RP structures:

- tournaments
- leagues
- festivals
- conferences

## Event Instances (Database)

Actual RP occurrences:

- timestamps
- participants
- outcomes
- narrative summaries
- thread references

---

# KENN (News System)

## Database Entity

User-generated in-universe journalism system.

### Stored Fields

- author
- date
- region
- category
- title
- summary
- tags
- links

### Content Storage

- content stored as JSON (ContentBlock[])
- flexible schema for editorial formatting

---

# Migration Phases

## Phase 1 — Foundation

- Introduce service layer abstraction
- Create database schema (no UI changes yet)
- Begin migrating Characters only

## Phase 2 — Core Entities

- Characters → Supabase
- Pokémon → Supabase
- Achievements → Supabase

## Phase 3 — Narrative Systems

- Plots → Supabase
- Travel Groups → Supabase
- Event Instances → Supabase

## Phase 4 — Content Systems

- KENN Articles → Supabase
- Galleries → Supabase

## Phase 5 — Static System Cleanup

- Reduce Vite glob reliance
- Move static content to structured Git content layer only

---

# Design Principles

## 1. Static is Canonical

Worldbuilding data is versioned and immutable unless explicitly updated via pull request.

## 2. Database is Interactive

Any system involving users, participation, or relationships belongs in the database.

## 3. Services are the Abstraction Layer

Frontend must never directly depend on database or file system structure.

## 4. Relationships Matter More Than Entities

All major systems are modeled as relationships, not isolated objects.

---

# Target End-State Architecture

## Git Layer

- Regions
- Lore
- Geography
- Institutions (definitions)
- League structure
- Event templates

## Database Layer

- Users
- Characters
- Pokémon
- Achievements
- Plots
- Travel Groups
- Event Instances
- KENN Articles

## Relationship Layer

- Character ↔ Plot
- Character ↔ Event
- Character ↔ Institution
- Character ↔ Travel Group
- Character ↔ KENN Articles

---

# Notes

- Institutions are intentionally hybrid due to their dual nature (static identity + dynamic membership).
- ContentBlock-based systems (KENN, galleries) should remain flexible via JSON storage rather than full normalization.
- Migration should be incremental and service-layer driven to avoid frontend disruption.
