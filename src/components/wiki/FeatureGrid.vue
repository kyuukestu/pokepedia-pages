<script setup lang="ts">
import { useTheme } from 'vuetify'
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

const theme = useTheme()

export interface FeatureItem {
  icon?: string
  image?: string
  title: string
  description: string
  color?: string
  to?: RouteLocationRaw | string
}

const props = defineProps({
  items: {
    type: Array as () => FeatureItem[],
    required: true,
  },
  cols: {
    type: Number,
    default: 3,
  },
  defaultColor: {
    type: String as () => 'blue' | 'green' | 'red' | 'amber' | 'pink',
    default: 'blue',
  },
  compact: {
    type: Boolean,
    default: false,
  },
})

// Centralized premium color map matching the workspace registry palette rules
const colorMap: Record<string, { light: string; dark: string; tracking: string }> = {
  blue: {
    light: 'blue-darken-2',
    dark: 'cyan-accent-2',
    tracking: 'rgba(var(--v-theme-primary), 0.08)',
  },
  green: {
    light: 'green-darken-2',
    dark: 'green-accent-2',
    tracking: 'rgba(var(--v-theme-success), 0.08)',
  },
  red: {
    light: 'red-darken-3',
    dark: 'red-accent-2',
    tracking: 'rgba(var(--v-theme-error), 0.08)',
  },
  amber: {
    light: 'amber-darken-4',
    dark: 'amber-accent-2',
    tracking: 'rgba(var(--v-theme-warning), 0.08)',
  },
  pink: { light: 'pink-darken-2', dark: 'pink-accent-2', tracking: 'rgba(233, 30, 99, 0.08)' },
}

function resolvedColor(item: FeatureItem): string {
  return item.color ?? props.defaultColor
}

function iconColor(item: FeatureItem, dark: boolean): string {
  const c = resolvedColor(item)
  return dark ? (colorMap[c]?.dark ?? 'cyan-accent-2') : (colorMap[c]?.light ?? 'blue-darken-2')
}

function containerBgGlow(item: FeatureItem): string {
  const c = resolvedColor(item)
  return colorMap[c]?.tracking ?? 'rgba(var(--v-theme-on-surface), 0.04)'
}
</script>

<template>
  <v-row :dense="compact" class="ma-0 ga-y-4">
    <v-col
      v-for="(item, i) in items"
      :key="i"
      cols="12"
      :sm="compact ? Math.floor(12 / Math.min(cols, 3)) : undefined"
      :md="Math.floor(12 / cols)"
      class="pa-2"
    >
      <!-- ── STANDARD PROFILE: CENTERED GEOMETRIC CARD ── -->
      <v-card
        v-if="!compact"
        :to="item.to ?? undefined"
        variant="flat"
        class="feature-card h-100 text-center pa-5 d-flex flex-column justify-space-between border-structural"
        :ripple="!!item.to"
        :class="{ 'clickable-dossier-node': item.to }"
      >
        <v-card-text class="pa-0 d-flex flex-column align-center">
          <!-- Image Avatar Render Pipeline -->
          <template v-if="item.image">
            <div class="avatar-frame-structural mb-4 border-structural">
              <v-img :src="item.image" cover alt="feature image" class="rounded-inherit"></v-img>
            </div>
          </template>

          <!-- Icon Avatar Render Pipeline -->
          <template v-else-if="item.icon">
            <div
              class="icon-frame-structural mb-4 border-structural"
              :style="{ backgroundColor: containerBgGlow(item) }"
            >
              <v-icon :color="iconColor(item, theme.current.value.dark)" size="26">
                {{ item.icon }}
              </v-icon>
            </div>
          </template>

          <h3
            class="text-subtitle-1 font-weight-black font-heading tracking-tight text-high-emphasis mb-2"
          >
            {{ item.title }}
          </h3>

          <p class="text-body-2 text-high-emphasis font-weight-medium lh-base mb-0">
            {{ item.description }}
          </p>
        </v-card-text>

        <!-- Navigation Action Blueprint Line -->
        <div
          v-if="item.to"
          class="feature-card__cue pt-4 mt-4 border-structural-divider flex-shrink-0 text-right"
        >
          <span class="text-overline font-mono font-weight-black text-primary tracking-wider mr-1">
            // EXPLORE
          </span>
          <v-icon size="14" color="primary">mdi-arrow-right</v-icon>
        </div>
      </v-card>

      <!-- ── COMPACT PROFILE: HORIZONTAL MATRIX PANEL ── -->
      <v-card
        v-else
        :to="item.to ?? undefined"
        variant="flat"
        class="feature-card feature-card--compact h-100 border-structural"
        :ripple="!!item.to"
        :class="{ 'clickable-dossier-node': item.to }"
      >
        <v-card-text class="d-flex align-center pa-4 h-100 gap-container">
          <template v-if="item.image">
            <div class="avatar-frame-structural compact-frame border-structural">
              <v-img :src="item.image" cover alt="feature image" class="rounded-inherit"></v-img>
            </div>
          </template>

          <template v-else-if="item.icon">
            <div
              class="icon-frame-structural compact-frame border-structural"
              :style="{ backgroundColor: containerBgGlow(item) }"
            >
              <v-icon :color="iconColor(item, theme.current.value.dark)" size="22">
                {{ item.icon }}
              </v-icon>
            </div>
          </template>

          <div class="min-width-0 flex-grow-1">
            <div
              class="text-body-2 font-weight-black font-heading tracking-tight text-high-emphasis leading-tight"
            >
              {{ item.title }}
            </div>
            <div class="text-caption text-high-emphasis font-weight-black lh-sm">
              {{ item.description }}
            </div>
          </div>

          <v-icon v-if="item.to" size="16" color="primary" class="shrink-0 compact-arrow">
            mdi-arrow-right
          </v-icon>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;900&family=JetBrains+Mono:wght@700&display=swap');

.font-heading {
  font-family: 'Outfit', sans-serif !important;
}
.font-mono {
  font-family: 'JetBrains Mono', monospace !important;
}

.tracking-tight {
  letter-spacing: -0.3px !important;
}
.lh-base {
  line-height: 1.55 !important;
}
.lh-sm {
  line-height: 1.4 !important;
}
.min-width-0 {
  min-width: 0;
}
.rounded-inherit {
  border-radius: inherit;
}
.gap-container {
  gap: 16px;
}

.leading-tight {
  line-height: 1.3 !important;
  margin-bottom: 3px;
}

/* ── HIGH-DENSITY CRUNCHY BORDERS (2PX MATRIX) ── */
.border-structural {
  border: 2px solid rgba(var(--v-theme-on-surface), 0.35) !important;
}
.border-structural-divider {
  border-top: 2px dashed rgba(var(--v-theme-on-surface), 0.25) !important;
}

.feature-card {
  background: rgb(var(--v-theme-surface)) !important;
  border-radius: 16px !important;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

/* Hard structural white layer enforcement for light mode */
.v-theme--light .feature-card {
  background: #ffffff !important;
}

/* Interactivity and elevation transforms locked to themes */
.clickable-dossier-node:hover {
  transform: translateY(-3px);
  border-color: rgb(var(--v-theme-primary)) !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08) !important;
}

/* ── GEOMETRIC COMPONENT FRAMES ── */
.icon-frame-structural,
.avatar-frame-structural {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.compact-frame {
  width: 44px;
  height: 44px;
  border-radius: 10px;
}

/* ── INTERACTION INDICATORS ── */
.feature-card__cue {
  opacity: 0.4;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.feature-card:hover .feature-card__cue {
  opacity: 1;
}

.compact-arrow {
  opacity: 0.3;
  transform: translateX(-4px);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.feature-card--compact:hover .compact-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Compact specific hover shift layout mechanics */
.feature-card--compact.clickable-dossier-node:hover {
  background: rgba(var(--v-theme-primary), 0.03) !important;
}
.v-theme--light .feature-card--compact.clickable-dossier-node:hover {
  background: rgba(var(--v-theme-primary), 0.02) !important;
}
</style>
