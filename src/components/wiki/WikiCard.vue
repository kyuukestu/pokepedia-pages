<script setup lang="ts">
import { useTheme } from 'vuetify'
import { computed } from 'vue'

const theme = useTheme()

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String as () => 'blue' | 'green' | 'red' | 'amber',
    default: 'green',
  },
  badge: {
    type: String,
    default: '',
  },
})

// Warm, earthy palette mapping for a natural notebook feel
const colorMap = {
  green: {
    light: 'green-darken-3',
    dark: 'green-lighten-2',
    bg: 'rgba(76, 175, 80, 0.08)',
  },
  blue: {
    light: 'teal-darken-3',
    dark: 'teal-lighten-2',
    bg: 'rgba(0, 150, 136, 0.08)',
  },
  amber: {
    light: 'brown-darken-2',
    dark: 'amber-lighten-2',
    bg: 'rgba(255, 152, 0, 0.08)',
  },
  red: {
    light: 'deep-orange-darken-3',
    dark: 'deep-orange-lighten-2',
    bg: 'rgba(244, 67, 54, 0.08)',
  },
}

const iconColor = computed(() => {
  const map = colorMap[props.color] || colorMap.green
  return theme.current.value.dark ? map.dark : map.light
})

const containerBg = computed(() => {
  return (colorMap[props.color] || colorMap.green).bg
})
</script>

<template>
  <v-card 
    variant="flat" 
    class="notebook-card overflow-hidden"
  >
    <!-- Header Strip -->
    <v-card-title class="notebook-card__header d-flex align-center pa-6 pb-4">
      <!-- Soft Rounded Icon Container -->
      <div
        class="icon-avatar-notebook me-4"
        :style="{ backgroundColor: containerBg }"
      >
        <v-icon :color="iconColor" size="22">{{ icon }}</v-icon>
      </div>

      <span class="text-h6 font-weight-bold font-serif text-high-emphasis">
        {{ title }}
      </span>

      <v-spacer />

      <v-chip
        v-if="badge"
        color="green-darken-2"
        variant="tonal"
        size="small"
        class="ms-3 text-caption font-weight-medium rounded-pill"
      >
        {{ badge }}
      </v-chip>
    </v-card-title>

    <!-- Gentle Divider Line -->
    <v-divider class="notebook-divider mx-6" />

    <!-- Content Slot -->
    <v-card-text class="pa-6 text-body-1 text-high-emphasis notebook-content">
      <slot />
    </v-card-text>
  </v-card>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,400&display=swap');

.font-serif {
  font-family: 'Lora', Georgia, serif !important;
  letter-spacing: -0.01em;
}

.notebook-card {
  background: rgba(var(--v-theme-surface), 0.8) !important;
  border-radius: 16px !important;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.v-theme--light .notebook-card {
  background: #fcfbf9 !important; /* Soft warm paper tint */
}

.notebook-card:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--v-theme-on-surface), 0.16) !important;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06) !important;
}

.icon-avatar-notebook {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notebook-divider {
  border-color: rgba(var(--v-theme-on-surface), 0.06) !important;
  opacity: 1 !important;
}

.notebook-content {
  line-height: 1.8 !important;
}
</style>
