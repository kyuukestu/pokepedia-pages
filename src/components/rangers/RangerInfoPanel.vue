<script setup lang="ts">
import type { RangerRank } from '@/types/ranger'

defineProps<{
  rank: RangerRank | null
}>()
</script>

<template>
  <v-card
    v-if="rank"
    class="ranger-info-panel fill-height border d-flex flex-column"
    elevation="2"
  >
    <div
      class="panel-accent"
      :class="`bg-${rank.color || 'green'}`"
    />

    <v-card-item class="pa-5">
      <template #prepend>
        <v-avatar
          :color="rank.color || 'green'"
          variant="tonal"
          size="52"
          class="me-3 border-subtle"
        >
          <v-icon
            :icon="rank.icon"
            size="28"
          />
        </v-avatar>
      </template>

      <div class="d-flex flex-column">
        <span class="text-overline font-mono text-medium-emphasis lh-none mb-1">
          Rank Overview
        </span>
        <v-card-title class="text-h6 font-weight-black pa-0 text-high-emphasis tracking-tight">
          {{ rank.title }}
        </v-card-title>
      </div>

      <template #append v-if="rank.track">
        <v-chip
          :color="rank.color || 'green'"
          variant="outlined"
          size="x-small"
          class="font-mono text-caption font-weight-bold uppercase"
        >
          {{ rank.track }}
        </v-chip>
      </template>
    </v-card-item>

    <v-divider />

    <v-card-text class="pa-5 flex-grow-1">
      <div class="text-overline text-medium-emphasis mb-2 d-flex align-center ga-2 font-mono">
        <v-icon size="14" :color="rank.color || 'green'">mdi-text-box-outline</v-icon>
        Summary
      </div>
      <p class="text-body-2 lh-relaxed text-high-emphasis mb-0">
        {{ rank.description }}
      </p>
    </v-card-text>
  </v-card>

  <v-card
    v-else
    class="ranger-info-panel fill-height border d-flex align-center justify-center text-center pa-6"
    elevation="1"
  >
    <div class="d-flex flex-column align-center ga-3 text-medium-emphasis">
      <v-avatar color="green-darken-2" variant="tonal" size="56">
        <v-icon size="28">mdi-cursor-default-click-outline</v-icon>
      </v-avatar>
      <div>
        <div class="text-subtitle-2 font-weight-bold font-mono text-uppercase mb-1">
          No Rank Selected
        </div>
        <p class="text-caption mb-0 text-medium-emphasis max-w-xs">
          Click on any rank node or specialization track in the hierarchy to inspect its requirements and operational duties.
        </p>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.font-mono {
  font-family: 'JetBrains Mono', monospace, sans-serif;
}

.lh-none {
  line-height: 1;
}

.lh-relaxed {
  line-height: 1.7;
}

.tracking-tight {
  letter-spacing: -0.02em;
}

.max-w-xs {
  max-width: 220px;
}

.ranger-info-panel {
  position: relative;
  border-radius: 8px;
  background: rgba(var(--v-theme-surface), 0.98) !important;
}

.panel-accent {
  height: 3px;
  width: 100%;
}

.border-subtle {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}
</style>
