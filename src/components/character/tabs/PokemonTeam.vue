<script setup lang="ts">
// components/character/tabs/PokemonTeam.vue
// Pokémon Team section — shown at /sandbox/chars/[category]/[id]/pokemon
import type { PokemonMember } from '@/types/pokemon'

defineProps<{ data: PokemonMember[] }>()

function spriteUrl(species: string, shiny: boolean): string {
  const isShiny = shiny ? 'shiny' : 'normal'
  return `https://img.pokemondb.net/sprites/home/${isShiny}/${species
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')}.png`
}

function genderGlyph(gender: PokemonMember['gender']): string {
  if (gender === 'male') return '♂'
  if (gender === 'female') return '♀'
  return '—'
}

// Returns a CSS class applied to the gender badge for color
function genderMod(gender: PokemonMember['gender']): string {
  if (gender === 'male') return 'gender-badge--male'
  if (gender === 'female') return 'gender-badge--female'
  return 'gender-badge--unknown'
}
</script>

<template>
  <div class="pokemon-team">
    <div v-if="!data?.length" class="empty-state">
      <v-icon size="48" class="text-medium-emphasis mb-3">mdi-pokeball</v-icon>
      <p class="text-body-2 text-medium-emphasis">
        No Pokémon team data is available for this character yet.
      </p>
    </div>

    <div v-else class="team-grid">
      <div v-for="(poke, i) in data" :key="poke.speciesId + i" class="poke-card">
        <!-- Hero: sprite on tinted background ────────────────────── -->
        <div class="poke-card__hero">
          <!-- Shiny / Alpha flags float over the hero -->
          <div class="poke-card__flags">
            <span v-if="poke.shiny" class="flag flag--shiny">✦ Shiny</span>
            <span v-if="poke.alpha" class="flag flag--alpha">α Alpha</span>
          </div>
          <img
            :src="spriteUrl(poke.speciesId, poke.shiny ?? false)"
            :alt="poke.name?.full ?? poke.speciesId"
            class="poke-card__sprite"
            loading="lazy"
          />
        </div>

        <!-- Body ──────────────────────────────────────────────────── -->
        <div class="poke-card__body">
          <!-- Identity: name, species, level + gender badges ───────── -->
          <div class="poke-card__identity">
            <div class="poke-card__name">
              {{ poke.name?.full ?? poke.speciesId }}
            </div>
            <div
              v-if="
                poke.name?.full && poke.name.full.toLowerCase() !== poke.speciesId.toLowerCase()
              "
              class="poke-card__species"
            >
              {{ poke.speciesId }}
            </div>

            <div class="poke-card__meta">
              <span class="meta-badge">Lv. {{ poke.level }}</span>
              <span class="meta-badge gender-badge" :class="genderMod(poke.gender)">
                {{ genderGlyph(poke.gender) }}
              </span>
            </div>
          </div>

          <div class="poke-card__divider" />

          <!-- Ability + held item ──────────────────────────────────── -->
          <div class="poke-card__section">
            <div class="section-label">Ability &amp; Item</div>
            <div class="pill-row">
              <span class="stat-pill">
                <v-icon size="11">mdi-dna</v-icon>
                {{ poke.ability }}
              </span>
              <span v-if="poke.heldItem" class="stat-pill">
                <v-icon size="11">mdi-bag-personal-outline</v-icon>
                {{ poke.heldItem }}
              </span>
            </div>
          </div>

          <!-- Moves ────────────────────────────────────────────────── -->
          <div v-if="poke.moves?.length" class="poke-card__section">
            <div class="section-label">Moves</div>
            <div class="moves-grid">
              <div v-for="move in poke.moves" :key="move" class="move-item">
                {{ move }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Team grid ───────────────────────────────────────────────────── */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

/* ── Card shell ──────────────────────────────────────────────────── */
.poke-card {
  border: 0.5px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: var(--v-border-radius-lg, 12px);
  background: rgb(var(--v-theme-surface));
  overflow: hidden;
  transition: border-color 0.15s ease;
}

.poke-card:hover {
  border-color: rgba(var(--v-border-color), calc(var(--v-border-opacity) * 2.5));
}

/* ── Hero zone ───────────────────────────────────────────────────── */
.poke-card__hero {
  position: relative;
  height: 108px;
  background: rgba(var(--v-theme-surface-variant), 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.poke-card__sprite {
  width: 96px;
  height: 96px;
  object-fit: contain;
  image-rendering: auto;
}

/* Shiny / Alpha flags — float top-left over the hero */
.poke-card__flags {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.flag {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 4px;
  letter-spacing: 0.03em;
}

.flag--shiny {
  background: #faeeda;
  color: #854f0b;
}

.flag--alpha {
  background: #eeedfe;
  color: #534ab7;
}

/* ── Card body ───────────────────────────────────────────────────── */
.poke-card__body {
  padding: 14px 16px 16px;
}

/* ── Identity ────────────────────────────────────────────────────── */
.poke-card__identity {
  margin-bottom: 12px;
}

.poke-card__name {
  font-size: 15px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  line-height: 1.2;
  text-transform: capitalize;
}

.poke-card__species {
  font-size: 11px;
  color: rgb(var(--v-theme-on-surface));
  text-transform: capitalize;
  margin-top: 2px;
}

.poke-card__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  flex-wrap: wrap;
}

/* ── Meta badges (level + gender share the same base) ────────────── */
.meta-badge {
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 4px;
  border: 0.5px solid rgba(var(--v-border-color), var(--v-border-opacity));
  color: rgb(var(--v-theme-on-surface));
  background: rgba(var(--v-theme-surface-variant), 0.5);
}

/* Gender badge color overrides — fixed semantics, both modes */
.gender-badge--male {
  color: #185fa5;
  background: #e6f1fb;
  border-color: #b5d4f4;
}

.gender-badge--female {
  color: #993556;
  background: #fbeaf0;
  border-color: #f4c0d1;
}

.gender-badge--unknown {
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 4px;
  border: 0.5px solid rgba(var(--v-border-color), var(--v-border-opacity));
  color: rgb(var(--v-theme-on-surface));
  background: rgba(var(--v-theme-surface), 0.5);
}

/* ── Divider ─────────────────────────────────────────────────────── */
.poke-card__divider {
  height: 0.5px;
  background: rgba(var(--v-border-color), var(--v-border-opacity));
  margin: 12px 0;
}

/* ── Sections (ability/item, moves) ──────────────────────────────── */
.poke-card__section {
  margin-bottom: 12px;
}

.poke-card__section:last-child {
  margin-bottom: 0;
}

.section-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 6px;
  opacity: 0.7;
}

/* ── Ability / item pills ────────────────────────────────────────── */
.pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.stat-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: rgb(var(--v-theme-on-surface));
  background: rgba(var(--v-theme-surface-variant), 0.5);
  border: 0.5px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 20px;
  padding: 3px 10px;
  text-transform: capitalize;
}

/* ── Move grid ───────────────────────────────────────────────────── */
.moves-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.move-item {
  font-size: 11px;
  color: rgb(var(--v-theme-on-surface));
  padding: 5px 9px;
  border-radius: 6px;
  border: 0.5px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background: rgba(var(--v-theme-surface-variant), 0.3);
  text-transform: capitalize;
  line-height: 1.2;
}

/* ── Empty state ─────────────────────────────────────────────────── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  border-radius: var(--v-border-radius-lg, 12px);
  border: 0.5px dashed rgba(var(--v-border-color), 0.4);
  text-align: center;
}
</style>
