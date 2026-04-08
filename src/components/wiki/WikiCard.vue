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

const colorMap = {
  blue: { light: 'blue-darken-2', dark: 'cyan-accent-2' },
  green: { light: 'green-darken-2', dark: 'green-accent-2' },
  red: { light: 'red-darken-2', dark: 'red-accent-2' },
  amber: { light: 'amber-darken-2', dark: 'amber-accent-2' },
}

const badgeColorMap = {
  blue: 'blue',
  green: 'green',
  red: 'red',
  amber: 'amber',
}

const iconColor = computed(() => {
  const map = colorMap[props.color]
  return theme.current.value.dark ? map.dark : map.light
})
</script>

<template>
  <v-card class="wiki-card mb-8" elevation="3" rounded="lg">
    <!-- Header -->
    <v-card-title class="wiki-card__header d-flex align-center pa-6 pb-5">
      <v-icon :color="iconColor" size="30" class="me-3">{{ icon }}</v-icon>
      <span class="text-h5 font-weight-bold">{{ title }}</span>
      <v-chip
        v-if="badge"
        :color="badgeColorMap[color]"
        variant="flat"
        size="x-small"
        class="ms-3 font-weight-bold"
      >
        {{ badge }}
      </v-chip>
    </v-card-title>

    <v-divider :color="theme.current.value.dark ? 'grey-darken-2' : 'grey-lighten-2'" />

    <!-- Content slot -->
    <v-card-text class="pa-6">
      <slot />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.wiki-card {
  transition: box-shadow 0.2s ease;
}
.wiki-card__header {
  gap: 0;
}
</style>
