<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

interface FeatureItem {
  icon?: string // Made optional since we might use an image
  image?: string // New optional field
  title: string
  description: string
  color?: string
  link?: string
}

defineProps({
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
})

function iconColor(item: FeatureItem, dark: boolean): string {
  const c = item.color ?? 'blue'
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
  <v-row>
    <v-col v-for="(item, i) in items" :key="i" cols="12" :md="12 / cols">
      <v-card
        variant="outlined"
        class="feature-card h-100 text-center pa-2"
        rounded="lg"
        :to="item.link"
        :ripple="!!item.link"
        :class="{ 'feature-card--link': !!item.link }"
      >
        <v-card-text>
          <template v-if="item.image">
            <v-avatar size="128" class="mb-3 elevation-2 border">
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

          <h3 class="text-h6 font-weight-bold mb-2">{{ item.title }}</h3>
          <p class="text-body-2 mb-0" style="line-height: 1.6">{{ item.description }}</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.feature-card {
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1) !important;
}

.feature-card--link:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
  cursor: pointer;
  border-color: currentColor;
}

.v-theme--dark .feature-card--link:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4) !important;
}

/* Optional: Add a subtle border to avatars to make them pop against the card background */
.v-avatar.border {
  border: 2px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>
