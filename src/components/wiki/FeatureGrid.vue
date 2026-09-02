<script setup lang="ts">
import { useTheme } from 'vuetify'
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
    type: String as () => 'blue' | 'green' | 'red' | 'amber',
    default: 'green',
  },
  compact: {
    type: Boolean,
    default: false,
  },
})

const colorMap: Record<string, { light: string; dark: string; bg: string }> = {
  green: { light: 'green-darken-3', dark: 'green-lighten-2', bg: 'rgba(76, 175, 80, 0.08)' },
  blue: { light: 'teal-darken-3', dark: 'teal-lighten-2', bg: 'rgba(0, 150, 136, 0.08)' },
  amber: { light: 'brown-darken-2', dark: 'amber-lighten-2', bg: 'rgba(255, 152, 0, 0.08)' },
  red: { light: 'deep-orange-darken-3', dark: 'deep-orange-lighten-2', bg: 'rgba(244, 67, 54, 0.08)' },
}

function resolvedColor(item: FeatureItem): string {
  return item.color ?? props.defaultColor
}

function iconColor(item: FeatureItem, dark: boolean): string {
  const c = resolvedColor(item)
  return dark ? (colorMap[c]?.dark ?? 'green-lighten-2') : (colorMap[c]?.light ?? 'green-darken-3')
}

function containerBg(item: FeatureItem): string {
  const c = resolvedColor(item)
  return colorMap[c]?.bg ?? 'rgba(76, 175, 80, 0.08)'
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
      <v-card
        :to="item.to ?? undefined"
        variant="flat"
        class="field-note-card h-100 pa-5 d-flex flex-column justify-space-between"
        :class="{ 'clickable-card': item.to }"
        :ripple="!!item.to"
      >
        <v-card-text class="pa-0 d-flex flex-column align-start">
          <!-- Icon / Avatar -->
          <div
            v-if="item.icon"
            class="field-note-icon mb-4"
            :style="{ backgroundColor: containerBg(item) }"
          >
            <v-icon :color="iconColor(item, theme.current.value.dark)" size="22">
              {{ item.icon }}
            </v-icon>
          </div>

          <h3 class="text-subtitle-1 font-weight-bold font-serif text-high-emphasis mb-2">
            {{ item.title }}
          </h3>

          <p class="text-body-2 text-medium-emphasis lh-relaxed mb-0">
            {{ item.description }}
          </p>
        </v-card-text>

        <!-- Subtle link cue -->
        <div v-if="item.to" class="pt-4 mt-2 d-flex align-center text-caption color-green-darken-2 font-weight-medium">
          <span class="me-1">Read section</span>
          <v-icon size="14">mdi-arrow-right</v-icon>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700&display=swap');

.font-serif {
  font-family: 'Lora', Georgia, serif !important;
}

.lh-relaxed {
  line-height: 1.7 !important;
}

.field-note-card {
  background: rgba(var(--v-theme-surface), 0.7) !important;
  border-radius: 14px !important;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02) !important;
  transition: all 0.25s ease;
}

.v-theme--light .field-note-card {
  background: #fcfbf9 !important;
}

.field-note-card:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--v-theme-on-surface), 0.15) !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05) !important;
}

.field-note-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clickable-card {
  cursor: pointer;
}
</style>
