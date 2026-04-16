<script setup lang="ts">
import { ref } from 'vue'
import type { RPNews } from '@/types/wiki'

interface Props {
  news?: RPNews[]
  ticker?: string[] // Array of strings for the bottom running banner
  interval?: number
}

// Default ticker message in case none are provided
const {
  news,
  ticker = ['Monitoring all frequencies for breaking news updates...'],
  interval = 8000,
} = defineProps<Props>()

const currentSlide = ref(0)
</script>

<template>
  <v-card rounded="lg" class="news-board border-opacity-25 mb-6">
    <div class="board-watermark">
      <v-img src="/assets/KENN.png" alt="Keen Eye Seal" referrerpolicy="no-referrer" />
    </div>

    <div
      class="px-4 py-3 d-flex align-center justify-space-between border-b border-opacity-25 header-ui"
    >
      <div class="d-flex align-center text-high-emphasis">
        <v-icon size="20" class="mr-2 opacity-80">mdi-newspaper-variant-outline</v-icon>
        <span class="text-button font-weight-black tracking-wide">Keen Eye News Feed</span>
      </div>
      <div v-if="news && news.length > 0" class="d-flex align-center">
        <div class="live-indicator mr-2"></div>
        <span class="text-caption font-weight-bold text-medium-emphasis tracking-wide">
          LIVE UPDATES
        </span>
      </div>
    </div>

    <v-carousel
      v-if="news && news.length > 0"
      v-model="currentSlide"
      cycle
      height="220"
      hide-delimiter-background
      hide-delimiters
      progress
      :continuous="true"
      :show-arrows="false"
      :interval="interval"
      direction="vertical"
      class="news-carousel"
    >
      <v-carousel-item v-for="(item, i) in news" :key="i">
        <div
          class="px-6 py-4 news-content h-100 d-flex flex-column justify-center"
          :class="{ 'is-active': currentSlide === i }"
        >
          <div
            class="text-h6 font-weight-bold mb-2 d-flex align-center text-high-emphasis news-title"
          >
            <v-icon v-if="item.icon" :icon="item.icon" start size="20" class="mr-2 opacity-80" />
            <span>{{ item.title }}</span>
          </div>
          <div class="text-body-2 text-medium-emphasis news-text pr-8">
            {{ item.text }}
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>

    <div
      v-else
      class="d-flex flex-column align-center justify-center text-medium-emphasis"
      style="height: 140px"
    >
      <v-icon icon="mdi-text-box-search-outline" size="32" class="mb-2 opacity-50" />
      <div class="text-subtitle-2 font-weight-bold tracking-wide">NO REPORTS AVAILABLE</div>
    </div>

    <div class="ticker-banner border-t border-opacity-25 d-flex align-center">
      <div
        class="ticker-badge px-3 py-1 bg-surface-variant text-caption font-weight-bold tracking-wide z-10"
      >
        BREAKING
      </div>
      <div class="ticker-track-container overflow-hidden w-100">
        <div class="ticker-track text-caption text-medium-emphasis font-weight-medium">
          <span v-for="(msg, i) in ticker" :key="i" class="ticker-item mx-8">
            <v-icon size="12" class="mx-2 opacity-50">mdi-circle-small</v-icon>
            {{ msg }}
          </span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.news-board {
  position: relative;
  overflow: hidden;
  /* Uses currentColor to ensure borders match the text theme of the parent page */
  border-color: currentColor !important;
}

.tracking-wide {
  letter-spacing: 1px !important;
}

/* Subtle, professional live indicator instead of a heavy glowing chip */
.live-indicator {
  width: 8px;
  height: 8px;
  background-color: #ef4444; /* Standard alert red */
  border-radius: 50%;
  animation: pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.news-content {
  position: relative;
  z-index: 1;
}

/* Clean entry animations for the news content */
.news-title,
.news-text {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.5s ease-out;
}

.is-active .news-title {
  opacity: 1;
  transform: translateX(0);
}

.is-active .news-title,
.is-active .news-text {
  opacity: 1;
  transform: translateX(0);
}

.is-active .news-text {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.1s;
}

/* Ticker Animation Layout */
.ticker-banner {
  position: relative;
  background: rgba(128, 128, 128, 0.05); /* Extremely subtle contrast for the ticker bar */
  height: 32px;
}

.ticker-badge {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.ticker-track-container {
  position: relative;
  white-space: nowrap;
  display: flex;
  align-items: center;
  height: 100%;
}

.ticker-track {
  display: inline-block;
  padding-left: 100%; /* Start off-screen to the right */
  animation: marquee 25s linear infinite;
}

/* Pause the ticker when the user hovers over it to read */
.ticker-banner:hover .ticker-track {
  animation-play-state: paused;
}

/* Watermark Styling */
.board-watermark {
  position: absolute;
  right: -5%; /* Peeking off the edge feels more "designed" */
  top: 50%;
  transform: translateY(-50%);
  width: 220px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.04; /* Very subtle */
  filter: grayscale(100%);
  /* Ensures it looks good on both light and dark backgrounds */
  mix-blend-mode: luminosity;
}

.board-watermark img {
  width: 100%;
  height: auto;
}

/* Precision Progress Bar Styling */
:deep(.v-carousel__progress) {
  top: 0;
  height: 2px !important;
  left: 0;
  right: 0;
  background: rgba(var(--v-border-color), 0.05);
}

:deep(.v-progress-linear__determinate) {
  transition: width 0.3s linear;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
