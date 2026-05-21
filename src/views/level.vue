<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import { tiers } from '@/data/lore'
import { ExampleTrainer } from '@/types/lore'
import { useCharacterStore } from '@/stores/useCharacterStore'

const pokemonLevel = ref<number>(50)
const trainerCategories = ref(tiers)
const characterStore = useCharacterStore()

/**
 * Safely extracts the identifier string from a string or an object structure.
 * Account for the exact fallback structure matching your Registry types (.id over .characterId).
 */
function getExampleId(example: any): string {
  if (!example) return ''
  if (typeof example === 'string') return example
  // Fall back cleanly across possible variations used in your types
  return example.id || example.characterId || ''
}

/**
 * Maps background file statuses into a single reactive profile entity
 */
function getTrainerState(rawExample: any) {
  // Guard clause against empty items or accidental booleans passing through loops
  if (!rawExample || typeof rawExample === 'boolean') {
    return {
      name: 'Unknown Entry',
      sourceGame: 'System Registry Error',
      highest: undefined,
      lowest: undefined,
    }
  }

  // If it's a static vanilla lore example with pre-filled metrics, pass it straight through
  if (typeof rawExample !== 'string' && !rawExample?.isCustomCharacter) {
    return rawExample as ExampleTrainer
  }

  const id = getExampleId(rawExample)
  const cacheData = characterStore.resolvedTeamCache[id]

  // Look up metadata fields to populate the card header
  const characterMeta = characterStore.getCharacterById(id) || characterStore.getAcademicById(id)
  const displayName = characterMeta?.name?.short?.[0] || characterMeta?.name || id

  return {
    name: displayName,
    sourceGame: cacheData?.sourceGame || 'Querying internal files...',
    highest: cacheData?.highest, // Kept undefined while loading runs
    lowest: cacheData?.lowest,
  }
}

// Loop over components safely on load
onMounted(() => {
  if (!Array.isArray(trainerCategories.value)) return

  trainerCategories.value.forEach((tier) => {
    const examplesList = tier?.examples || []
    examplesList.forEach((example) => {
      if (example && (typeof example === 'string' || example?.isCustomCharacter)) {
        const id = getExampleId(example)
        if (id) {
          characterStore.loadTeamMetrics(id)
        }
      }
    })
  })
})

const activeCategory = computed(() => {
  const current = pokemonLevel.value
  const sortedTiers = [...trainerCategories.value].sort((a, b) => b.minLevel - a.minLevel)

  for (const tier of sortedTiers) {
    if (current >= tier.minLevel) {
      return { name: tier.name, icon: tier.icon, color: tier.color }
    }
  }
  return { name: 'Rookie', icon: 'mdi-help-circle-outline', color: 'medium-emphasis' }
})
</script>

<template>
  <v-container fluid class="pa-0 tactical-level-directory">
    <WikiHero
      title="Levels within the RP"
      subtitle="Using baseline in-game levels as an out-of-character tool to measure Pokémon strength."
      icon="mdi-trending-up"
      pattern="pokeball"
      class="border-bottom-structural"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center align-center flex-wrap ga-4 w-100 px-4">
          <div
            class="interactive-level-hub border-structural pa-3 rounded-lg d-flex align-center flex-wrap ga-3 bg-surface-variant"
          >
            <span
              class="text-caption font-mono font-weight-black text-uppercase tracking-wider select-none mr-2"
            >
              Tier Checker //
            </span>
            <v-slider
              v-model="pokemonLevel"
              min="1"
              max="100"
              step="1"
              hide-details
              density="compact"
              color="primary"
              track-color="rgba(var(--v-theme-on-surface), 0.1)"
              class="level-slider-input flex-grow-1"
            />
            <div
              class="dynamic-category-pill font-mono font-weight-black text-caption px-3 py-1 rounded border-structural d-flex align-center ga-1 text-uppercase"
              color="primary"
            >
              <v-icon size="14" class="mr-1">{{ activeCategory.icon }}</v-icon>
              {{ activeCategory.name }}
            </div>
            <div
              class="level-readout-badge font-mono font-weight-black text-primary px-3 py-1 border-structural text-center"
            >
              LV.{{ String(pokemonLevel).padStart(3, '0') }}
            </div>
          </div>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200" class="py-12 position-relative z-index-2">
      <!-- ── CONCEPT PHILOSOPHY BLOCK ── -->
      <v-row class="ma-0 mb-12">
        <v-col cols="12" class="pa-2">
          <WikiCard
            title="Overview"
            icon="mdi-google-analytics"
            color="blue"
            class="border-structural"
          >
            <div class="text-body-2 text-high-emphasis lh-base font-weight-medium">
              In this RP we use levels as a representation of raw power. By checking metrics across
              structural tiers like Champions, Gym Leaders, and various trainer classes, we build an
              objective, mathematical path for character growth.
            </div>
          </WikiCard>
        </v-col>
      </v-row>

      <!-- ── LINEAR MASTER DIRECTORY STREAM ── -->
      <div class="directory-linear-pipeline">
        <section
          v-for="category in trainerCategories"
          :key="category.id"
          class="tier-pipeline-section mb-12"
        >
          <!-- Structural Anchor Header Bar -->
          <div
            class="tier-anchor-header border-structural rounded-xl pa-4 mb-6 d-flex align-center justify-space-between flex-wrap ga-4"
          >
            <div class="d-flex align-center">
              <div
                class="tier-header-avatar border-structural mr-4"
                :style="{ color: `rgb(var(--v-theme-${category.color}))` }"
              >
                <v-icon size="22">{{ category.icon }}</v-icon>
              </div>
              <div>
                <div
                  class="text-caption font-mono font-weight-black text-disabled tracking-widest text-uppercase lh-none mb-1"
                >
                  {{ category.id }} //
                  <span :class="category.isElite ? 'text-primary' : 'text-medium-emphasis'">
                    {{ category.isElite ? 'ELITE ASSIGNMENT' : 'STANDARD ASSIGNMENT' }}
                  </span>
                </div>
                <h3 class="text-h5 font-weight-black font-heading text-high-emphasis lh-none">
                  {{ category.name }}
                </h3>
              </div>
            </div>
            <div class="d-flex align-center ga-3">
              <p
                class="text-body-2 text-medium-emphasis font-weight-medium max-width-desc mb-0 mr-4 d-none d-lg-block"
              >
                {{ category.description }}
              </p>
              <div
                class="border-structural font-mono text-subtitle-1 font-weight-black px-4 py-2 rounded-lg label-range-badge bg-surface-variant"
              >
                RANGE: {{ category.levelRange }}
              </div>
            </div>
          </div>

          <!-- High Density Example Grid -->
          <div class="px-2">
            <v-row class="ma-0 ga-y-6">
              <v-col
                v-for="(rawExample, index) in category.examples || []"
                :key="
                  typeof rawExample === 'string' ? rawExample : rawExample?.characterId || index
                "
                cols="12"
                md="6"
                xl="4"
                class="pa-2"
              >
                <div
                  v-if="rawExample"
                  class="macro-showcase-card border-structural rounded-xl bg-surface"
                >
                  <div
                    class="d-flex align-center justify-space-between bg-surface px-4 py-3 border-bottom-structural"
                  >
                    <span
                      class="font-heading font-weight-black text-subtitle-1 text-high-emphasis text-uppercase tracking-wide"
                    >
                      {{ getTrainerState(rawExample).name }}
                    </span>
                    <span
                      class="font-mono text-caption font-weight-black text-primary text-uppercase tracking-wider"
                    >
                      // {{ getTrainerState(rawExample).sourceGame }}
                    </span>
                  </div>

                  <!-- Render card profile panels if data maps are populated inside state -->
                  <div
                    v-if="getTrainerState(rawExample).highest && getTrainerState(rawExample).lowest"
                    class="d-flex align-stretch cross-profile-row"
                  >
                    <!-- High Ace Column -->
                    <div
                      class="flex-50 pa-4 text-center profile-sub-panel border-right-dashed position-relative"
                    >
                      <div class="showcase-transparent-sprite mx-auto mb-1">
                        <v-img
                          :src="getTrainerState(rawExample).highest?.sprite"
                          :alt="getTrainerState(rawExample).highest?.name"
                          width="120"
                          height="120"
                          class="mx-auto"
                        />
                      </div>
                      <div class="giant-level-typography text-error font-mono font-weight-black">
                        LV.{{ getTrainerState(rawExample).highest?.level }}
                      </div>
                      <div class="text-body-2 font-weight-bold text-high-emphasis truncate-text">
                        {{ getTrainerState(rawExample).highest?.name }}
                      </div>
                      <div
                        class="text-overline font-weight-black text-disabled tracking-widest lh-none"
                      >
                        Ace
                      </div>
                    </div>

                    <!-- Baseline Floor Column -->
                    <div class="flex-50 pa-4 text-center profile-sub-panel position-relative">
                      <div class="showcase-transparent-sprite mx-auto mb-1">
                        <v-img
                          :src="getTrainerState(rawExample).lowest?.sprite"
                          :alt="getTrainerState(rawExample).lowest?.name"
                          width="120"
                          height="120"
                          class="mx-auto"
                        />
                      </div>
                      <div class="giant-level-typography text-success font-mono font-weight-black">
                        LV.{{ getTrainerState(rawExample).lowest?.level }}
                      </div>
                      <div class="text-body-2 font-weight-bold text-high-emphasis truncate-text">
                        {{ getTrainerState(rawExample).lowest?.name }}
                      </div>
                      <div
                        class="text-overline font-weight-black text-disabled tracking-widest lh-none"
                      >
                        Other
                      </div>
                    </div>
                  </div>

                  <!-- Loading state runs natively until the asynchronous module triggers cache commitment -->
                  <div v-else class="pa-8 text-center font-mono text-caption text-medium-emphasis">
                    <v-progress-circular
                      indeterminate
                      size="20"
                      width="2"
                      class="mr-2"
                      color="primary"
                    />
                    Querying internal character repository...
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </section>
      </div>
    </v-container>
  </v-container>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;900&family=JetBrains+Mono:wght@400;600;700&display=swap');

.font-heading {
  font-family: 'Outfit', sans-serif !important;
}
.font-mono {
  font-family: 'JetBrains Mono', monospace !important;
}
.lh-base {
  line-height: 1.55;
}
.lh-none {
  line-height: 1 !important;
}
.truncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.max-width-desc {
  max-width: 460px;
}

.border-structural {
  border: 2px solid rgba(var(--v-theme-on-surface), 0.35) !important;
}
.border-bottom-structural {
  border-bottom: 2px solid rgba(var(--v-theme-on-surface), 0.35) !important;
}
.border-right-dashed {
  border-right: 2px dashed rgba(var(--v-theme-on-surface), 0.15) !important;
}
.tactical-level-directory {
  background: rgb(var(--v-theme-background));
}

.v-theme--light .tier-anchor-header,
.v-theme--light .interactive-level-hub {
  background: #ffffff !important;
}

.interactive-level-hub {
  width: 100%;
  max-width: 650px;
  border-radius: 12px !important;
  background: rgba(var(--v-theme-on-surface), 0.02);
}
.level-slider-input {
  max-width: 240px;
  min-width: 140px;
}
.level-readout-badge {
  background: rgb(var(--v-theme-surface));
  border-radius: 6px;
  font-size: 1.1rem;
  box-shadow: 2px 2px 0px 0px rgba(var(--v-theme-primary), 0.15);
}
.dynamic-category-pill {
  background: rgb(var(--v-theme-primary));
  white-space: nowrap;
}

.tier-anchor-header {
  background: rgb(var(--v-theme-surface));
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}
.tier-header-avatar {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--v-theme-on-surface), 0.02);
}

.giant-level-typography {
  font-size: 1.75rem !important;
  line-height: 1.2 !important;
  letter-spacing: -1px;
  margin-top: -4px;
  margin-bottom: 2px;
}
.text-error {
  color: #ff5252 !important;
}
.text-success {
  color: #4caf50 !important;
}

.macro-showcase-card {
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.04) !important;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
  overflow: hidden;
}
.macro-showcase-card:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--v-theme-primary), 0.6) !important;
}
.cross-profile-row {
  width: 100%;
}
.profile-sub-panel {
  flex: 1 1 50%;
}
.showcase-transparent-sprite {
  width: 120px;
  height: 120px;
  background: transparent !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
