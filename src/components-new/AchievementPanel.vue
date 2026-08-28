<script setup lang="ts">
import type { BadgeCase, RibbonCase } from '@/types/CharacterDashboard'

const { badgeCases, ribbonCases } = defineProps<{
  badgeCases: BadgeCase[]
  ribbonCases: RibbonCase[]
  tournamentResults?: any[]
}>()
</script>

<template>
  <div class="wiki-achievements-panel-group">
    <!-- BADGE CASE DISPLAY -->
    <v-card flat class="wiki-card-panel pa-5 mb-6">
      <h3
        class="text-subtitle-1 font-weight-black text-uppercase tracking-wide mb-4 border-bottom pb-2"
      >
        Badge Cases
      </h3>

      <div v-for="bCase in badgeCases" :key="bCase.region" class="mb-4">
        <div class="text-caption font-weight-black text-uppercase tracking-wider text-primary mb-2">
          {{ bCase.region }} Region
        </div>

        <div class="badge-mini-flex d-flex flex-wrap ga-2">
          <div
            v-for="badge in bCase.badges"
            :key="badge.id"
            class="badge-icon-node pa-2 text-center"
          >
            <img
              v-if="badge.image_url"
              :src="badge.image_url"
              class="badge-img"
              :alt="badge.badge_name"
            />
            <div v-else class="badge-fallback-ico">🏅</div>

            <div class="badge-tooltip-meta">
              <span class="text-truncate d-block font-weight-bold">{{ badge.badge_name }}</span>
              <span class="text-xxs text-medium-emphasis d-block">{{ badge.obtained_date }}</span>
            </div>
          </div>
        </div>
      </div>
    </v-card>

    <!-- RIBBON CASE DISPLAY -->
    <v-card flat class="wiki-card-panel pa-5">
      <h3
        class="text-subtitle-1 font-weight-black text-uppercase tracking-wide mb-4 border-bottom pb-2"
      >
        Ribbon Case
      </h3>

      <div v-for="rCase in ribbonCases" :key="rCase.category" class="mb-4">
        <div class="text-caption font-weight-bold text-medium-emphasis text-uppercase mb-2">
          {{ rCase.category }}
        </div>

        <div class="d-flex flex-column ga-1">
          <div
            v-for="ribbon in rCase.ribbons"
            :key="ribbon.id"
            class="ribbon-list-row pa-2 d-flex justify-space-between align-center"
          >
            <span class="text-body-2 font-weight-bold">{{
              ribbon.ribbon_name.replace(/_/g, ' ')
            }}</span>
            <span class="text-caption text-medium-emphasis">{{ ribbon.obtained_date }}</span>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.wiki-card-panel {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12) !important;
  background: rgb(var(--v-theme-surface));
  border-radius: 8px !important;
}
.border-bottom {
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}
.badge-icon-node {
  position: relative;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  background: rgba(var(--v-theme-on-surface), 0.02);
  border-radius: 6px;
  width: calc(25% - 6px);
  min-width: 64px;
}
.badge-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}
.badge-fallback-ico {
  font-size: 1.5rem;
  line-height: 1.2;
}
.badge-tooltip-meta {
  font-size: 0.65rem;
  line-height: 1.1;
  margin-top: 4px;
}
.text-xxs {
  font-size: 0.55rem;
}
.ribbon-list-row {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.06);
  border-radius: 4px;
  background: rgba(var(--v-theme-on-surface), 0.01);
}
</style>
