<script setup lang="ts">
import { useTheme } from 'vuetify'
import { computed, ref, onMounted, onUnmounted } from 'vue'

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
    type: String as () => 'pokeball' | 'grid' | 'dots' | 'lines',
    default: 'lines',
  },
  color: {
    type: String,
    default: 'success',
  },
})

// ── Parallax Logic ──────────────────────────────────────────────────────────
const heroRef = ref<HTMLElement | null>(null)
const parallaxX = ref(0)
const parallaxY = ref(0)

function handleMouseMove(event: MouseEvent) {
  if (!heroRef.value) return
  const rect = heroRef.value.getBoundingClientRect()
  
  // Calculate relative mouse position normalized from -1 to 1
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  const y = ((event.clientY - rect.top) / rect.height) * 2 - 1

  // Intensity multiplier (higher = more shift)
  parallaxX.value = x * 15
  parallaxY.value = y * 15
}

function handleMouseLeave() {
  // Gently reset to center on mouse leave
  parallaxX.value = 0
  parallaxY.value = 0
}

onMounted(() => {
  if (heroRef.value) {
    heroRef.value.addEventListener('mousemove', handleMouseMove)
    heroRef.value.addEventListener('mouseleave', handleMouseLeave)
  }
})

onUnmounted(() => {
  if (heroRef.value) {
    heroRef.value.removeEventListener('mousemove', handleMouseMove)
    heroRef.value.removeEventListener('mouseleave', handleMouseLeave)
  }
})

// ── SVG Pattern Generators ──────────────────────────────────────────────────
const pokeballPatternSvg = computed(() => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><circle cx='30' cy='30' r='18' fill='none' stroke='currentColor' stroke-width='1.2' opacity='0.25'/><line x1='12' y1='30' x2='48' y2='30' stroke='currentColor' stroke-width='1.2' opacity='0.25'/><circle cx='30' cy='30' r='5' fill='none' stroke='currentColor' stroke-width='1.2' opacity='0.25'/></svg>`
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`
})

const gridPatternSvg = computed(() => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><path d='M0 0h40v40H0z' fill='none'/><path d='M40 0H0v40' fill='none' stroke='currentColor' stroke-width='0.5' opacity='0.18'/></svg>`
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`
})

const linesPatternSvg = computed(() => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='28' viewBox='0 0 100 28'><line x1='0' y1='27' x2='100' y2='27' stroke='currentColor' stroke-width='1' opacity='0.12'/></svg>`
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`
})

// Dynamic CSS Variables
const heroStyles = computed(() => {
  const accentColor = props.color.startsWith('#')
    ? props.color
    : `rgb(var(--v-theme-${props.color}))`

  return {
    '--hero-accent': accentColor,
    '--pokeball-svg': pokeballPatternSvg.value,
    '--grid-svg': gridPatternSvg.value,
    '--lines-svg': linesPatternSvg.value,
    '--parallax-x': `${parallaxX.value}px`,
    '--parallax-y': `${parallaxY.value}px`,
    '--parallax-inv-x': `${-parallaxX.value * 1.5}px`,
    '--parallax-inv-y': `${-parallaxY.value * 1.5}px`,
  }
})
</script>

<template>
  <div
    ref="heroRef"
    class="wiki-hero mb-8"
    :class="theme.current.value.dark ? 'wiki-hero--dark' : 'wiki-hero--light'"
    :style="heroStyles"
  >
    <!-- Background Patterns with Parallax Shift -->
    <div
      class="wiki-hero__pattern"
      :class="`wiki-hero__pattern--${pattern}`"
      aria-hidden="true"
    />

    <!-- Ambient Glow with Inverse Parallax Depth -->
    <div class="wiki-hero__glow" aria-hidden="true" />

    <!-- Main Content Container -->
    <v-container max-width="1200" class="wiki-hero__content py-10 py-md-14 text-center">
      <!-- Field Journal Badge Frame -->
      <div class="d-inline-flex position-relative mb-5">
        <div class="hero-badge-frame">
          <v-icon class="wiki-hero__icon" size="48" :color="color">
            {{ icon }}
          </v-icon>
        </div>
      </div>

      <!-- Title & Subtitle -->
      <h1 class="text-h3 text-md-h2 font-serif font-weight-bold mb-3 tracking-tight wiki-hero__title">
        {{ title }}
      </h1>

      <p v-if="subtitle" class="text-subtitle-1 text-medium-emphasis font-serif italic wiki-hero__subtitle max-w-600 mx-auto">
        {{ subtitle }}
      </p>

      <!-- Slot for chips/badges -->
      <div v-if="$slots.chips" class="wiki-hero__chips mt-6 d-flex justify-center flex-wrap ga-2">
        <slot name="chips" />
      </div>
    </v-container>

    <!-- Transition Fringe -->
    <div class="wiki-hero__blur-transition" aria-hidden="true">
      <div class="wiki-hero__gradient-fade" />
      <div class="wiki-hero__ruled-line" />
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,400&display=swap');

.font-serif {
  font-family: 'Lora', Georgia, serif !important;
}

.italic {
  font-style: italic;
}

.wiki-hero {
  position: relative;
  overflow: hidden;
  --hero-accent: rgb(var(--v-theme-success));
  transition: background-color 0.3s ease;
}

/* Light Theme: Warm Cream Paper Aesthetic */
.wiki-hero--light {
  background: radial-gradient(
    circle at 50% 15%,
    #ffffff 0%,
    #faf8f5 65%,
    #f2eee9 100%
  );
  color: #2c2c2a;
}

/* Dark Theme: Soft Slate Notebook */
.wiki-hero--dark {
  background: radial-gradient(
    circle at 50% 15%,
    #242427 0%,
    #18181a 70%,
    #121214 100%
  );
  color: #e5e3df;
}

/* Parallax Pattern Shift */
.wiki-hero__pattern {
  position: absolute;
  inset: -20px; /* Slight overflow to handle edge pull */
  pointer-events: none;
  color: var(--hero-accent);
  transform: translate(var(--parallax-x), var(--parallax-y));
  transition: transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.wiki-hero__pattern--dots {
  background-image: radial-gradient(circle, currentColor 1.2px, transparent 1.2px);
  background-size: 24px 24px;
  opacity: 0.15;
}

.wiki-hero__pattern--pokeball {
  background-image: var(--pokeball-svg);
  background-position: center;
}

.wiki-hero__pattern--grid {
  background-image: var(--grid-svg);
  background-position: center;
}

.wiki-hero__pattern--lines {
  background-image: var(--lines-svg);
  background-size: 100% 28px;
  opacity: 0.8;
}

/* Inverse Parallax Ambient Glow */
.wiki-hero__glow {
  position: absolute;
  top: 25%;
  left: 50%;
  width: 360px;
  height: 360px;
  background: var(--hero-accent);
  opacity: 0.12;
  filter: blur(90px);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(
    calc(-50% + var(--parallax-inv-x)),
    calc(-50% + var(--parallax-inv-y))
  );
  transition: transform 0.2s ease-out;
}

/* Content Styling */
.wiki-hero__content {
  position: relative;
  z-index: 2;
}

.hero-badge-frame {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(var(--v-theme-surface), 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  box-shadow: 
    0 8px 24px -4px rgba(0, 0, 0, 0.08),
    inset 0 1px 2px rgba(255, 255, 255, 0.5);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hero-badge-frame:hover {
  transform: scale(1.08) rotate(-2deg);
}

.wiki-hero__icon {
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.12));
}

.wiki-hero__title {
  letter-spacing: -0.01em !important;
  line-height: 1.15;
}

.max-w-600 {
  max-width: 620px;
}

.wiki-hero__subtitle {
  line-height: 1.6;
  opacity: 0.85;
}

.ga-2 {
  gap: 8px;
}

/* Transition Fringe */
.wiki-hero__blur-transition {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  pointer-events: none;
  z-index: 3;
}

.wiki-hero__gradient-fade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(var(--v-theme-surface), 0) 0%,
    rgba(var(--v-theme-surface), 0.75) 60%,
    rgb(var(--v-theme-surface)) 100%
  );
  backdrop-filter: blur(4px);
}

.wiki-hero__ruled-line {
  position: absolute;
  bottom: 0;
  left: 5%;
  right: 5%;
  height: 1px;
  background: rgba(var(--v-theme-on-surface), 0.08);
}
</style>
