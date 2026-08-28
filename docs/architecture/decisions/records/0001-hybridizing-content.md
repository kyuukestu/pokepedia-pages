# ADR-0001

## Title: Hybridizing Content

## Status

Accepted

## Context

The project contains both static world-building content and user-generated content.

## Decision

- Static world-building content remains in git. Changes can be handled by RP-Staff via reviewed Pull Requests.
- Dynamic content moves to Supabase. User-facing tools will be needed to handle user-submitted content.

## Consequences

Positive:

- Easier Backups
- Reduced database complexity

Negatives:

- Two content sources must be maintained.
