<script setup lang="ts">
// components/character/tabs/PokemonTeam.vue
// Pokémon Team section — shown at /sandbox/chars/[category]/[id]/pokemon
import { computed } from 'vue'
import type { PokemonMember } from '@/types/pokemon'
import { getPokemonSprite } from '@/utils/path-resolvers'

const props = withDefaults(
  defineProps<{
    data: PokemonMember[]
    // Accept the dynamic raw color string ('primary', '#ff0055', etc.)
    characterColor?: string
  }>(),
  {
    characterColor: 'primary',
  },
)

// function spriteUrl(species: string, shiny: boolean): string {
//   const isShiny = shiny ? 'shiny' : 'normal'
//   return `https://img.pokemondb.net/sprites/home/${isShiny}/${species
//     .toLowerCase()
//     .replace(/[^a-z0-9-]/g, '')}.png`
// }

function genderGlyph(gender: PokemonMember['gender']): string {
  if (gender === 'male') return '♂'
  if (gender === 'female') return '♀'
  return '—'
}

function genderMod(gender: PokemonMember['gender']): string {
  if (gender === 'male') return 'gender-badge--male'
  if (gender === 'female') return 'gender-badge--female'
  return 'gender-badge--unknown'
}

// ── Intelligence Parser for Inline CSS Variables ─────────────────────────────
const themeStyles = computed(() => {
  const color = props.characterColor
  const isHex = color.startsWith('#')

  // Resolve base tactical color value
  const baseColor = isHex ? color : `rgb(var(--v-theme-${color}))`

  // Resolve tactical low-light transparencies for gradient glows and hover backgrounds
  const glowColor = isHex ? `${color}26` : `rgba(var(--v-theme-${color}), 0.15)`
  const edgeColor = isHex ? `${color}66` : `rgba(var(--v-theme-${color}), 0.4)`

  return {
    '--char-color': baseColor,
    '--char-glow': glowColor,
    '--char-edge': edgeColor,
  }
})
</script>

<template>
  <!-- Injected computed styles safely control all internal thematic nodes -->
  <div class="pokemon-team" :style="themeStyles">
    <!-- If data is empty or missing mid-flight, render a safe structural layout pane -->
    <div v-if="!props.data || !props.data.length" class="no-pokemon-pane text-center pa-8">
      <v-icon size="48" class="mb-2" color="medium-emphasis">mdi-pokeball</v-icon>
      <p class="text-body-2 text-medium-emphasis">No deployment records found for this asset.</p>
    </div>

    <div v-if="!data?.length" class="empty-state">
      <v-icon size="48" class="text-medium-emphasis mb-3">mdi-pokeball</v-icon>
      <p class="text-body-2 text-medium-emphasis">DATA NOT FOUND: Registry is currently empty.</p>
    </div>

    <div v-else class="team-grid">
      <div v-for="(poke, i) in data" :key="poke.speciesId + i" class="poke-card">
        <!-- Hero: Tactical Sprite Display -->
        <div class="poke-card__hero">
          <div class="poke-card__flags">
            <span v-if="poke.shiny" class="flag flag--shiny">SHINY</span>
            <span v-if="poke.alpha" class="flag flag--alpha">ALPHA</span>
          </div>
          <img
            :src="getPokemonSprite(poke.speciesId, poke.shiny ?? false)"
            :alt="poke.name?.full ?? poke.speciesId"
            class="poke-card__sprite"
            crossorigin="anonymous"
            loading="lazy"
          />
          <div class="hero-accent-bar" />
        </div>

        <div class="poke-card__body">
          <!-- Identity Section -->
          <div class="d-flex justify-space-between align-start">
            <div>
              <div class="poke-card__name">{{ poke.name?.full ?? poke.speciesId }}</div>
              <div class="poke-card__species">SPECIES: {{ poke.speciesId.toUpperCase() }}</div>
            </div>
            <div class="text-right">
              <div class="meta-level">LVL.{{ poke.level }}</div>
              <div class="meta-gender" :class="genderMod(poke.gender)">
                {{ genderGlyph(poke.gender) }}
              </div>
            </div>
          </div>

          <v-divider class="my-4 opacity-10" />

          <!-- Ability & Item -->
          <div class="poke-card__section mb-4">
            <div class="section-label">SPECS</div>
            <div class="pill-row">
              <span class="stat-pill">
                <v-icon size="10">mdi-dna</v-icon>
                {{ poke.ability }}
              </span>
              <span v-if="poke.heldItem" class="stat-pill">
                <v-icon size="10">mdi-package-variant-closed</v-icon>
                {{ poke.heldItem }}
              </span>
            </div>
          </div>

          <!-- Moves: Tactical Readout -->
          <div v-if="poke.moves?.length" class="poke-card__section">
            <div class="section-label">MOVES</div>
            <div class="moves-grid">
              <div v-for="move in poke.moves" :key="move" class="move-item">
                <span class="move-bullet">»</span> {{ move }}
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

/* ── Card Shell ──────────────────────────────────────────────────── */
.poke-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.poke-card:hover {
  /* Dynamic Fallback System mapping directly via custom styling variables */
  border-color: var(--char-edge, rgba(var(--v-theme-primary), 0.4));
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-4px);
}

/* ── Hero Zone ───────────────────────────────────────────────────── */
.poke-card__hero {
  position: relative;
  height: 120px;
  background: radial-gradient(
    circle at center,
    var(--char-glow, rgba(var(--v-theme-primary), 0.15)) 0%,
    transparent 70%
  );
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.hero-accent-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: var(--char-color, rgb(var(--v-theme-primary)));
}

.poke-card__sprite {
  width: 110px;
  height: 110px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
}

/* ── Flags ──────────────────────────────────────────────────────── */
.poke-card__flags {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.flag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 2px;
  text-transform: uppercase;
}

.flag--shiny {
  background: #ffca28;
  color: #000;
}
.flag--alpha {
  background: #f44336;
  color: #fff;
}

/* ── Identity ───────────────────────────────────────────────────── */
.poke-card__body {
  padding: 16px;
}
.poke-card__name {
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.5px;
}
.poke-card__species {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  opacity: 0.5;
  letter-spacing: 1px;
}

.meta-level {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  font-weight: 900;
  color: var(--char-color, rgb(var(--v-theme-primary)));
}

.meta-gender {
  font-size: 0.8rem;
  font-weight: 900;
}
.gender-badge--male {
  color: #4dabf7;
}
.gender-badge--female {
  color: #ff92ad;
}

/* ── Sections ───────────────────────────────────────────────────── */
.section-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--char-color, rgb(var(--v-theme-primary)));
  margin-bottom: 8px;
  opacity: 0.8;
}

.stat-pill {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 4px 10px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* ── Moves Grid ─────────────────────────────────────────────────── */
.moves-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.move-item {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  border: 1px solid var(--char-glow, rgba(var(--v-theme-primary), 0.3));
  background: rgba(255, 255, 255, 0.01);
  padding: 6px 10px;
  border-radius: 2px;
}

.move-bullet {
  color: var(--char-color, rgb(var(--v-theme-primary)));
  margin-right: 4px;
}

/* ── Empty State ────────────────────────────────────────────────── */
.empty-state {
  border: 1px dashed rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
  padding: 40px;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
