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
    default: 'green',
  },
})

// Natural, warm notebook palette with soft gradient fade channels
const colorVars = {
  green: {
    bar: { light: '#2E7D32', dark: '#81C784' },
    label: { light: '#1B5E20', dark: '#A5D6A7' },
    gradient: {
      light: 'linear-gradient(90deg, rgba(232, 245, 233, 0.85) 0%, rgba(232, 245, 233, 0.25) 75%, rgba(232, 245, 233, 0) 100%)',
      dark: 'linear-gradient(90deg, rgba(76, 175, 80, 0.16) 0%, rgba(76, 175, 80, 0.05) 75%, rgba(76, 175, 80, 0) 100%)',
    },
  },
  blue: {
    bar: { light: '#00695C', dark: '#4DB6AC' },
    label: { light: '#004D40', dark: '#80CBC4' },
    gradient: {
      light: 'linear-gradient(90deg, rgba(224, 242, 241, 0.85) 0%, rgba(224, 242, 241, 0.25) 75%, rgba(224, 242, 241, 0) 100%)',
      dark: 'linear-gradient(90deg, rgba(0, 150, 136, 0.16) 0%, rgba(0, 150, 136, 0.05) 75%, rgba(0, 150, 136, 0) 100%)',
    },
  },
  amber: {
    bar: { light: '#E65100', dark: '#FFB74D' },
    label: { light: '#BF360C', dark: '#FFE082' },
    gradient: {
      light: 'linear-gradient(90deg, rgba(255, 243, 224, 0.85) 0%, rgba(255, 243, 224, 0.25) 75%, rgba(255, 243, 224, 0) 100%)',
      dark: 'linear-gradient(90deg, rgba(255, 152, 0, 0.16) 0%, rgba(255, 152, 0, 0.05) 75%, rgba(255, 152, 0, 0) 100%)',
    },
  },
  red: {
    bar: { light: '#C62828', dark: '#E57373' },
    label: { light: '#B71C1C', dark: '#EF9A9A' },
    gradient: {
      light: 'linear-gradient(90deg, rgba(255, 235, 238, 0.85) 0%, rgba(255, 235, 238, 0.25) 75%, rgba(255, 235, 238, 0) 100%)',
      dark: 'linear-gradient(90deg, rgba(244, 67, 54, 0.16) 0%, rgba(244, 67, 54, 0.05) 75%, rgba(244, 67, 54, 0) 100%)',
    },
  },
}

const isDark = computed(() => theme.current.value.dark)

const barColor = computed(() => {
  const c = colorVars[props.color] || colorVars.green
  return isDark.value ? c.bar.dark : c.bar.light
})

const labelColor = computed(() => {
  const c = colorVars[props.color] || colorVars.green
  return isDark.value ? c.label.dark : c.label.light
})

const gradientBg = computed(() => {
  const c = colorVars[props.color] || colorVars.green
  return isDark.value ? c.gradient.dark : c.gradient.light
})
</script>

<template>
  <div
    class="wiki-callout my-4"
    :style="{ background: gradientBg }"
  >
    <div
      class="wiki-callout__bar"
      :style="{ backgroundColor: barColor }"
    />

    <div class="wiki-callout__content">
      <div class="wiki-callout__label font-serif" :style="{ color: labelColor }">
        <v-icon v-if="icon" size="16" class="me-1" :style="{ color: labelColor }">
          {{ icon }}
        </v-icon>
        <span>{{ label }}</span>
      </div>

      <div class="wiki-callout__body text-body-1">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;1,400&display=swap');

.font-serif {
  font-family: 'Lora', Georgia, serif !important;
}

.wiki-callout {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: 12px;
  padding: 12px 20px 12px 0;
  border-radius: 12px;
  transition: background 0.3s ease;
}

.wiki-callout__bar {
  width: 3px;
  flex-shrink: 0;
  border-radius: 99px;
  margin-left: 2px;
}

.wiki-callout__content {
  flex-grow: 1;
}

.wiki-callout__label {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: 4px;
  display: inline-flex;
  align-items: center;
}

.wiki-callout__body {
  line-height: 1.7;
  color: rgba(var(--v-theme-on-surface), 0.9);
}
</style>
