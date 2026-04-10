<script setup lang="ts">
import { ref } from 'vue'
import type { RPNews } from '@/types/wiki'

interface Props {
  news: RPNews[]
  color?: string // e.g., 'blue', 'red', 'amber'
  interval?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Keen Eye News Network',
  color: 'blue',
  interval: 8000,
})

const currentSlide = ref(0)
</script>

<template>
  <v-card flat border rounded="xl" class="news-terminal overflow-hidden">
    <div class="terminal-mesh"></div>

    <div class="scanline-container" :style="{ '--beam-color': `rgb(var(--v-theme-${color}))` }">
      <div class="scanline-beam"></div>
    </div>

    <div class="pa-4 pb-0 d-flex align-center justify-space-between header-ui">
      <div class="d-flex align-center">
        <v-icon start :color="color" size="18" class="flicker-slow">mdi-broadcast</v-icon>
        <span class="text-overline font-weight-black letter-spacing-2 terminal-glow">
          {{ title }}
        </span>
      </div>
      <v-chip size="x-small" :color="color" variant="flat" class="pulse-glow font-weight-black">
        LIVE
      </v-chip>
    </div>

    <v-carousel
      v-model="currentSlide"
      cycle
      height="140"
      hide-delimiter-background
      show-arrows="hover"
      :interval="interval"
      direction="vertical"
      class="news-carousel"
    >
      <v-carousel-item v-for="(item, i) in news" :key="i">
        <div class="px-12 py-4 news-content-wrapper" :class="{ 'is-active': currentSlide === i }">
          <div
            class="text-h6 font-weight-black mb-1 d-flex align-center news-title"
            :class="currentSlide === i ? `text-${color}` : 'text-medium-emphasis'"
          >
            <v-icon
              :icon="item.icon"
              start
              :size="currentSlide === i ? 22 : 18"
              class="title-icon"
            />
            <span class="terminal-glow">{{ item.title }}</span>
          </div>
          <div class="text-body-2 news-text">
            {{ item.text }}
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<style scoped>
/* TERMINAL CONTAINER */
.news-terminal {
  position: relative;
  background: #08080a !important;
  border: 1px solid rgba(var(--v-border-color), 0.3) !important;
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 1);
  overflow: hidden;
}

/* THE CRT MESH TEXTURE */
.terminal-mesh {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2; /* Sits behind text but potentially over some glows */
  background:
    linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.2) 50%),
    linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.04));
  background-size:
    100% 3px,
    3px 100%;
  opacity: 0.8;
}

/* SCANLINE ENGINE */
.scanline-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 12; /* Explicitly above the carousel content (z-index 5) */
}

.scanline-beam {
  position: absolute;
  width: 100%;
  height: 6px;
  background: var(--beam-color);
  opacity: 0; /* Start hidden */
  box-shadow: 0 0 15px 2px var(--beam-color);
  animation: scan-loop 4s linear infinite;
}

@keyframes scan-loop {
  0% {
    top: 0%;
    opacity: 0;
  }
  5% {
    opacity: 0.2;
  }
  95% {
    opacity: 0.2;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

/* LIVE PULSE */
.pulse-glow {
  animation: live-pulse 2s ease-in-out infinite;
}

@keyframes live-pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.92);
  }
}

/* TYPOGRAPHY & GLOWS */
.terminal-glow {
  text-shadow:
    0 0 10px currentColor,
    0 0 2px rgba(255, 255, 255, 0.5);
}

.news-content-wrapper {
  position: relative;
  z-index: 5;
  transition: all 0.5s ease;
}

.news-text {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.4;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
}

.is-active .news-text {
  color: rgba(255, 255, 255, 0.95);
}

/* FLICKER EFFECT */
.flicker-slow {
  animation: flicker 6s infinite;
}

@keyframes flicker {
  0%,
  18%,
  22%,
  25%,
  53%,
  57%,
  100% {
    opacity: 1;
    filter: blur(0px);
  }
  20%,
  24%,
  55% {
    opacity: 0.3;
    filter: blur(0.5px);
  }
}

/* VUETIFY OVERRIDES */
:deep(.v-window__controls),
:deep(.v-carousel__controls) {
  z-index: 20; /* Ensure interaction is always possible */
}

.header-ui {
  position: relative;
  z-index: 15;
}

.letter-spacing-2 {
  letter-spacing: 2px !important;
}
</style>
