<script setup lang="ts">
import { useTheme } from 'vuetify'
import { computed } from 'vue'

const theme = useTheme()

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: '',
  },
  color: {
    type: String as () => 'blue' | 'green' | 'red' | 'amber',
    default: 'blue',
  },
})

const colorVars = {
  blue: {
    bar: { light: '#1565C0', dark: '#18FFFF' },
    label: { light: '#1565C0', dark: '#80DEEA' },
    bg: { light: '#E3F2FD', dark: 'rgba(0,188,212,0.08)' },
  },
  green: {
    bar: { light: '#2E7D32', dark: '#69FF47' },
    label: { light: '#2E7D32', dark: '#A5D6A7' },
    bg: { light: '#E8F5E9', dark: 'rgba(76,175,80,0.08)' },
  },
  red: {
    bar: { light: '#C62828', dark: '#FF6E40' },
    label: { light: '#C62828', dark: '#EF9A9A' },
    bg: { light: '#FFEBEE', dark: 'rgba(239,83,80,0.08)' },
  },
  amber: {
    bar: { light: '#E65100', dark: '#FFD740' },
    label: { light: '#E65100', dark: '#FFE082' },
    bg: { light: '#FFF3E0', dark: 'rgba(255,160,0,0.08)' },
  },
}

const barColor = computed(() => {
  const c = colorVars[props.color]
  return theme.current.value.dark ? c.bar.dark : c.bar.light
})
const labelColor = computed(() => {
  const c = colorVars[props.color]
  return theme.current.value.dark ? c.label.dark : c.label.light
})
const bgColor = computed(() => {
  const c = colorVars[props.color]
  return theme.current.value.dark ? c.bg.dark : c.bg.light
})
</script>

<template>
  <div
    class="wiki-callout mb-4"
    :style="{
      background: bgColor,
      borderLeft: `4px solid ${barColor}`,
    }"
  >
    <div class="wiki-callout__label" :style="{ color: labelColor }">
      <v-icon v-if="icon" size="14" class="me-1" :style="{ color: labelColor }">{{ icon }}</v-icon>
      {{ label }}
    </div>
    <div class="wiki-callout__body text-body-1">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.wiki-callout {
  border-radius: 0 8px 8px 0;
  padding: 12px 16px;
}

.wiki-callout__label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
}

.wiki-callout__body {
  line-height: 1.7;
}
</style>
