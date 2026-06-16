<script setup lang="ts">
import type { BadgeCase, RibbonCase } from '@/types/CharacterDashboard'

const { badgeCases, ribbonCases } = defineProps<{
  badgeCases: BadgeCase[]
  ribbonCases: RibbonCase[]
}>()
</script>

<template>
  <!-- BADGES -->
  <v-card class="achievement-panel pa-5 mb-5">
    <h2 class="mb-5">Badge Case</h2>

    <div v-for="badgeCase in badgeCases" :key="badgeCase.region" class="badge-case mb-6">
      <div class="case-header">
        {{ badgeCase.region }}
      </div>

      <div class="badge-grid">
        <div v-for="badge in badgeCase.badges" :key="badge.id" class="badge-slot">
          <div class="badge-display">
            <img v-if="badge.image_url" :src="badge.image_url" class="badge-image" />

            <div v-else class="badge-placeholder">🏅</div>

            <div class="badge-name">
              {{ badge.badge_name }}
            </div>

            <div class="badge-issuer">
              {{ badge.issuer?.full_name }}
            </div>

            <div class="badge-date">
              {{ badge.obtained_date }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-card>

  <!-- RIBBONS -->

  <v-card class="achievement-panel pa-5">
    <h2 class="mb-5">Ribbon Case</h2>

    <div v-for="ribbonCase in ribbonCases" :key="ribbonCase.category" class="ribbon-row mb-4">
      <div class="text-subtitle-1 mb-3">
        {{ ribbonCase.category }}
      </div>

      <div class="d-flex ga-3 overflow-x-auto">
        <div v-for="ribbon in ribbonCase.ribbons" :key="ribbon.id" class="ribbon-display">
          <div class="ribbon-name">
            {{ ribbon.id }}
          </div>

          <div class="ribbon-date">
            {{ ribbon.obtained_date }}
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.achievement-panel {
  background: linear-gradient(to bottom, rgb(28 28 34), rgb(20 20 24));
}

.badge-case {
  border-radius: 16px;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));

  padding: 24px;
}

.case-header {
  font-size: 1.1rem;

  font-weight: 700;

  margin-bottom: 18px;

  letter-spacing: 0.05em;
}

.badge-grid {
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));

  gap: 16px;
}

.badge-slot {
  aspect-ratio: 1;
}

.badge-display {
  height: 100%;

  border-radius: 14px;

  background: radial-gradient(circle at top, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));

  padding: 16px;

  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;
}

.badge-image {
  width: 72px;

  height: 72px;

  object-fit: contain;
}

.badge-placeholder {
  font-size: 42px;
}

.badge-name {
  margin-top: 12px;

  font-weight: 700;
}

.badge-issuer {
  opacity: 0.75;

  font-size: 0.85rem;
}

.badge-date {
  opacity: 0.55;

  font-size: 0.75rem;
}

.ribbon-display {
  min-width: 180px;

  padding: 16px;

  border-radius: 12px;

  background: rgba(255, 255, 255, 0.04);
}

.ribbon-name {
  font-weight: 600;
}

.ribbon-date {
  opacity: 0.6;

  margin-top: 6px;
}
</style>
