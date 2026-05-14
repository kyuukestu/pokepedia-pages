<script setup lang="ts">
import { computed } from 'vue'
import type { CharacterMeta } from '@/types/character'
import { useCharacterStore } from '@/stores/useCharacterStore'
import { WCSRankLabels, CoordinatorRankLabels, RangerRankLabels } from '@/types/league'

const props = defineProps<{
  data: any
  meta: CharacterMeta
  totals: { badges: number; ribbons: number }
}>()

const store = useCharacterStore()

const hasCompetitive = computed(
  () => props.meta.wcsRank || props.meta.coordinatorRank || props.meta.rangerRank,
)

const genderIcon = computed(() => {
  if (props.meta.gender === 'male') return 'mdi-gender-male'
  if (props.meta.gender === 'female') return 'mdi-gender-female'
  return 'mdi-gender-non-binary'
})

const pokemonCount = computed(() => store.pokemonCount)
</script>

<template>
  <div class="dashboard-grid">
    <!-- BIO SECTION -->
    <v-card class="glass-module bio-card pa-8 span-all">
      <div class="module-header mb-4">
        <v-icon size="16" class="me-2" color="primary">mdi-text-box-search-outline</v-icon>
        Dossier Summary
      </div>
      <p class="text-h6 bio-text">
        {{ meta.summary || 'Biographical data for this entity remains classified.' }}
      </p>

      <div class="d-flex flex-wrap gap-4 mt-8">
        <div v-if="meta.age" class="micro-box">
          <span class="label">Age</span>
          <span class="value">{{ meta.age }}</span>
        </div>

        <div v-if="meta.gender" class="micro-box gender-box" :class="meta.gender">
          <span class="label">Identity</span>
          <div class="d-flex align-center gap-2">
            <v-icon size="20" class="gender-symbol">{{ genderIcon }}</v-icon>
            <span class="value text-capitalize">{{ meta.gender }}</span>
          </div>
        </div>

        <div v-if="meta.height" class="micro-box">
          <span class="label">Height</span>
          <span class="value">{{ meta.height }}</span>
        </div>
      </div>
    </v-card>

    <!-- OCCUPATION SECTION -->
    <v-card v-if="meta.occupationRoles?.primary" class="glass-module occupation-card pa-6">
      <div class="module-header mb-6">Occupation</div>
      <div class="primary-role">{{ meta.occupationRoles.primary }}</div>

      <div class="chip-container mt-6">
        <v-chip
          v-for="r in meta.occupationRoles.other"
          :key="r"
          size="small"
          class="custom-role-chip"
          variant="flat"
        >
          {{ r }}
        </v-chip>
      </div>
    </v-card>

    <!-- COMPETITIVE SECTION (Enhanced Labeling) -->
    <v-card v-if="hasCompetitive" class="glass-module rank-card pa-6">
      <div class="module-header mb-6">Competitive Stats</div>
      <div class="rank-stack">
        <!-- WCS Entry -->
        <div v-if="meta.wcsRank" class="rank-item mb-4">
          <div class="rank-category">World Coronation Series</div>
          <div class="rank-value highlight">{{ WCSRankLabels[meta.wcsRank] }}</div>
        </div>

        <!-- Contest Entry -->
        <div v-if="meta.coordinatorRank" class="rank-item mb-4">
          <div class="rank-category">Contest Circuit</div>
          <div class="rank-value highlight">{{ CoordinatorRankLabels[meta.coordinatorRank] }}</div>
        </div>

        <!-- Ranger Entry -->
        <div v-if="meta.rangerRank" class="rank-item">
          <div class="rank-category">Ranger Union</div>
          <div class="rank-value highlight">{{ RangerRankLabels[meta.rangerRank] }}</div>
        </div>
      </div>
    </v-card>

    <!-- CORE STATS SECTION -->
    <v-card class="glass-module stat-card pa-6 span-all">
      <div class="d-flex align-center justify-space-around text-center">
        <div class="stat-group">
          <div class="stat-value">{{ pokemonCount }}</div>
          <div class="stat-label">Pokemon</div>
        </div>
        <v-divider vertical class="mx-2" />
        <div class="stat-group">
          <div class="stat-value">{{ totals.badges }}</div>
          <div class="stat-label">Badges</div>
        </div>
        <v-divider vertical class="mx-2" />
        <div class="stat-group">
          <div class="stat-value">{{ totals.ribbons }}</div>
          <div class="stat-label">Ribbons</div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.span-all {
  grid-column: 1 / -1;
}

.glass-module {
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-left: 4px solid var(--v-theme-primary) !important;
  border-radius: 12px !important;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4) !important;
}

.module-header {
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--v-theme-primary);
  opacity: 0.8;
}

/* Competitive Rank Styling */
.rank-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 8px;
}
.rank-item:last-child {
  border-bottom: none;
}
.rank-category {
  font-size: 0.65rem;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 2px;
}
.rank-value {
  font-size: 1.15rem;
  font-weight: 900;
  letter-spacing: 0.5px;
}

/* Micro-Box Styling (Restored) */
.micro-box {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 20px;
  border-radius: 8px;
  min-width: 100px;
  display: flex;
  flex-direction: column;
}
.micro-box .label {
  font-size: 0.6rem;
  text-transform: uppercase;
  opacity: 0.5;
  margin-bottom: 2px;
}
.micro-box .value {
  font-size: 1.2rem;
  font-weight: 800;
}

.gender-box.male {
  color: #4dabf7;
  border-color: rgba(77, 171, 247, 0.3);
}
.gender-box.female {
  color: #ff92ad;
  border-color: rgba(255, 146, 173, 0.3);
}

.primary-role {
  font-size: 2.2rem;
  font-weight: 950;
  text-transform: uppercase;
  line-height: 1;
}

.custom-role-chip {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  font-weight: 700;
  text-transform: uppercase;
}

.stat-group .stat-value {
  font-size: 3rem;
  font-weight: 950;
  background: linear-gradient(to bottom, #fff, #888);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.stat-group .stat-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 800;
  opacity: 0.6;
}

.highlight {
  color: var(--v-theme-primary);
  font-weight: 900;
}
</style>
