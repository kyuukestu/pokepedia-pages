<script setup lang="ts">
import { useTheme } from 'vuetify'
import { computed } from 'vue'

const theme = useTheme()

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: 'mdi-pokeball',
  },
  pattern: {
    type: String as () => 'pokeball' | 'grid' | 'dots',
    default: 'pokeball',
  },
  color: {
    type: String,
    default: 'primary',
  },
})

// Dynamic SVG Patterns that utilize currentColor to stay reactive to the hero color
const pokeballPatternSvg = computed(() => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><circle cx='30' cy='30' r='18' fill='none' stroke='currentColor' stroke-width='1.2' opacity='0.25'/><line x1='12' y1='30' x2='48' y2='30' stroke='currentColor' stroke-width='1.2' opacity='0.25'/><circle cx='30' cy='30' r='5' fill='none' stroke='currentColor' stroke-width='1.2' opacity='0.25'/></svg>`
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`
})

const gridPatternSvg = computed(() => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><path d='M0 0h40v40H0z' fill='none'/><path d='M40 0H0v40' fill='none' stroke='currentColor' stroke-width='0.5' opacity='0.2'/></svg>`
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`
})

// Compute CSS variable for color accents
const heroStyles = computed(() => {
  const accentColor = props.color.startsWith('#')
    ? props.color
    : `rgb(var(--v-theme-${props.color}))`

  return {
    '--hero-accent': accentColor,
    '--pokeball-svg': pokeballPatternSvg.value,
    '--grid-svg': gridPatternSvg.value,
  }
})
</script>

<template>
  <div
    class="wiki-hero mb-8"
    :class="theme.current.value.dark ? 'wiki-hero--dark' : 'wiki-hero--light'"
    :style="heroStyles"
  >
    <!-- Background Patterns -->
    <div
      class="wiki-hero__pattern"
      :class="`wiki-hero__pattern--${pattern}`"
      aria-hidden="true"
    />

    <!-- Ambient Glow Effect -->
    <div class="wiki-hero__glow" aria-hidden="true" />

    <!-- Main Content Container -->
    <v-container max-width="1200" class="wiki-hero__content py-12 text-center">
      <!-- Floating Icon -->
      <div class="d-inline-flex position-relative mb-4">
        <v-icon class="wiki-hero__icon" size="72" :color="color">
          {{ icon }}
        </v-icon>
      </div>

      <!-- Title & Subtitle -->
      <h1 class="text-h3 font-weight-bold mb-3 tracking-tight wiki-hero__title">
        {{ title }}
      </h1>

      <p v-if="subtitle" class="text-subtitle-1 text-medium-emphasis wiki-hero__subtitle max-w-600 mx-auto">
        {{ subtitle }}
      </p>

      <!-- Slot for custom filter chips or badges -->
      <div class="wiki-hero__chips mt-6">
        <slot name="chips" />
      </div>
    </v-container>
  </div>
</template>

<style scoped>
.wiki-hero {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  --hero-accent: rgb(var(--v-theme-primary));
  transition: background-color 0.3s ease;
}

/* Light Theme Background */
.wiki-hero--light {
  background: radial-gradient(
      circle at 50% 20%,
      rgba(var(--v-theme-surface-variant), 0.3) 0%,
      rgba(var(--v-theme-surface), 1) 80%
    );
}

/* Dark Theme Background */
.wiki-hero--dark {
  background: radial-gradient(
      circle at 50% 20%,
      rgba(var(--v-theme-surface-variant), 0.2) 0%,
      rgba(var(--v-theme-background), 1) 85%
    );
}

/* Dynamic Soft Glow behind Icon */
.wiki-hero__glow {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 320px;
  background: var(--hero-accent);
  opacity: 0.12;
  filter: blur(80px);
  border-radius: 50%;
  pointer-events: none;
}

/* Pattern Container & Reactive Color Assignment */
.wiki-hero__pattern {
  position: absolute;
  inset: 0;
  pointer-events: none;
  color: var(--hero-accent);
}

.wiki-hero__pattern--dots {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.18;
}

.wiki-hero__pattern--pokeball {
  background-image: var(--pokeball-svg);
  background-position: center;
}

.wiki-hero__pattern--grid {
  background-image: var(--grid-svg);
  background-position: center;
}

/* Typography & Layout Rules */
.wiki-hero__content {
  position: relative;
  z-index: 1;
}

.wiki-hero__icon {
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.12));
  transition: transform 0.3s ease;
}

.wiki-hero__icon:hover {
  transform: scale(1.05);
}

.wiki-hero__title {
  letter-spacing: -0.02em !important;
  line-height: 1.2;
}

.max-w-600 {
  max-width: 600px;
}

.wiki-hero__subtitle {
  line-height: 1.6;
}
</style>
