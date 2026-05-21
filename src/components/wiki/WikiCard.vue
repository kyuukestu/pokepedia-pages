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
    default: 'blue',
  },
  badge: {
    type: String,
    default: '',
  },
})

// High-fidelity map aligned cleanly to the crisp sandbox palette rules
const colorMap = {
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
}

const badgeColorMap = {
  blue: 'primary',
  green: 'success',
  red: 'error',
  amber: 'warning',
}

const iconColor = computed(() => {
  const map = colorMap[props.color]
  return theme.current.value.dark ? map.dark : map.light
})

const containerBgGlow = computed(() => {
  return colorMap[props.color].tracking
})
</script>

<template>
  <v-card variant="flat" class="wiki-card overflow-hidden border-structural">
    <!-- Header Vector Strip -->
    <v-card-title class="wiki-card__header d-flex align-center pa-5 pb-4 bg-header-tint">
      <!-- High-Contrast Icon Box Container Frame -->
      <div
        class="icon-avatar-structural mr-3 border-structural"
        :style="{ backgroundColor: containerBgGlow }"
      >
        <v-icon :color="iconColor" size="22">{{ icon }}</v-icon>
      </div>

      <span class="text-h6 font-weight-black font-heading text-high-emphasis tracking-tight">
        {{ title }}
      </span>

      <v-chip
        v-if="badge"
        :color="badgeColorMap[props.color]"
        variant="flat"
        size="x-small"
        class="ms-3 font-weight-black tracking-widest text-overline font-mono rounded"
      >
        {{ badge.toUpperCase() }}
      </v-chip>
    </v-card-title>

    <!-- Structural Divider Line -->
    <v-divider class="border-structural-divider" />

    <!-- Content slot -->
    <v-card-text
      class="pa-6 text-body-2 font-weight-medium text-high-emphasis text-container-rendering"
    >
      <slot />
    </v-card-text>
  </v-card>
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
  letter-spacing: -0.5px !important;
}

/* ── REINFORCED 2PX LINE MATRIX DEPLOYMENT ── */
.border-structural {
  border: 2px solid rgba(var(--v-theme-on-surface), 0.35) !important;
}

.border-structural-divider {
  border-top: 2px solid rgba(var(--v-theme-on-surface), 0.3) !important;
  opacity: 1 !important;
}

/* ── ADAPTIVE LIGHT MODE HIGH-VISIBILITY BOUNDARY ENFORCEMENT ── */
.wiki-card {
  background: rgb(var(--v-theme-surface)) !important;
  border-radius: 16px !important;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.v-theme--light .wiki-card {
  background: #ffffff !important; /* Forces solid foundation layer behind text primitives */
}

.wiki-card:hover {
  transform: translateY(-2px);
  border-color: rgb(var(--v-theme-primary)) !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08) !important;
}

.bg-header-tint {
  background: rgba(var(--v-theme-on-surface), 0.04);
}

.icon-avatar-structural {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Text block typography scaling line corrections */
.text-container-rendering {
  line-height: 1.65 !important;
}
</style>
