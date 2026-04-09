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
  to?: RouteLocationRaw | string // optional internal route — makes the card a RouterLink
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
    default: 'blue',
  },
  // compact: horizontal icon + text layout — better for 5+ item grids
  compact: {
    type: Boolean,
    default: false,
  },
})

function resolvedColor(item: FeatureItem): string {
  return item.color ?? props.defaultColor
}

function iconColor(item: FeatureItem, dark: boolean): string {
  const c = resolvedColor(item)
  const map: Record<string, { light: string; dark: string }> = {
    blue: { light: 'blue-darken-2', dark: 'cyan-accent-2' },
    green: { light: 'green-darken-2', dark: 'green-accent-2' },
    red: { light: 'red-darken-2', dark: 'red-accent-2' },
    amber: { light: 'amber-darken-2', dark: 'amber-accent-2' },
    pink: { light: 'pink-darken-2', dark: 'pink-accent-2' },
  }
  return dark ? (map[c]?.dark ?? 'cyan-accent-2') : (map[c]?.light ?? 'blue-darken-2')
}
</script>

<template>
  <v-row :dense="compact">
    <v-col
      v-for="(item, i) in items"
      :key="i"
      cols="12"
      :sm="compact ? Math.floor(12 / Math.min(cols, 3)) : undefined"
      :md="Math.floor(12 / cols)"
    >
      <!-- ── Standard card (centered icon above text) ── -->
      <v-card
        v-if="!compact"
        :to="item.to ?? undefined"
        variant="outlined"
        class="feature-card h-100 text-center pa-2"
        rounded="lg"
        :ripple="!!item.to"
      >
        <v-card-text>
          <v-icon size="48" :color="iconColor(item, theme.current.value.dark)" class="mb-3">
            {{ item.icon }}
          </v-icon>
          <h3 class="text-h6 font-weight-bold mb-2">{{ item.title }}</h3>
          <p class="text-body-2 mb-0" style="line-height: 1.6">{{ item.description }}</p>
        </v-card-text>
        <div v-if="item.to" class="feature-card__cue pb-3">
          <span class="text-caption text-medium-emphasis">Explore</span>
          <v-icon size="12" class="text-medium-emphasis ml-1">mdi-arrow-right</v-icon>
        </div>
      </v-card>

      <!-- ── Compact card (icon left, title + description right) ── -->
      <v-card
        v-else
        :to="item.to ?? undefined"
        variant="outlined"
        class="feature-card feature-card--compact h-100"
        rounded="lg"
        :ripple="!!item.to"
      >
        <v-card-text class="d-flex align-center gap-3 pa-3">
          <template v-if="item.image">
            <v-avatar size="64" class="mb-3 elevation-2 border">
              <v-img :src="item.image" cover alt="feature image"></v-img>
            </v-avatar>
          </template>
          
          <v-icon 
            v-else-if="item.icon"
            size="48" 
            :color="iconColor(item, theme.current.value.dark)" 
            class="mb-3"
          >
            {{ item.icon }}
          </v-icon>
          <div class="min-width-0">
            <div class="text-subtitle-2 font-weight-bold leading-tight">{{ item.title }}</div>
            <div class="text-caption text-medium-emphasis" style="line-height: 1.4">
              {{ item.description }}
            </div>
          </div>
          <v-icon
            v-if="item.to"
            size="14"
            class="text-medium-emphasis flex-shrink-0 ml-auto compact-arrow"
          >
            mdi-arrow-right
          </v-icon>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.feature-card {
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1) !important;
}

/* Standard card explore cue */
.feature-card__cue {
  opacity: 0;
  transition: opacity 0.15s ease;
}

.feature-card:hover .feature-card__cue {
  opacity: 1;
}

/* Compact card — no lift, just a subtle bg shift on hover */
.feature-card--compact:hover {
  transform: none;
  box-shadow: none !important;
  background: rgba(var(--v-theme-surface-variant), 0.5) !important;
}

.compact-arrow {
  opacity: 0;
  transform: translateX(-4px);
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.feature-card--compact:hover .compact-arrow {
  opacity: 1;
  transform: translateX(0);
}

.min-width-0 {
  min-width: 0;
}

.leading-tight {
  line-height: 1.25;
  margin-bottom: 2px;
}
</style>
