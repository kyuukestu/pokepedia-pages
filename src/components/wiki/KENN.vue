<script setup lang="ts">
import { ref, computed, onMounted, shallowRef } from 'vue'
import { articles } from '@/data/kenn'
import type { Article } from '@/types/kenn'

interface Props {
  region?: string // e.g., 'Johto', 'Kalos'
  limit?: number // How many random articles to show
  interval?: number
}

const { region = 'Global', limit = 5, interval = 8000 } = defineProps<Props>()
console.log(region, limit, interval)

const currentSlide = ref(0)
const displayNews = shallowRef<Article[]>([])

/**
 * 1. Process News on Mount
 * Shuffling here ensures the selection is "random" per page load,
 * but stays stable while the user is interacting with the page.
 */
 onMounted(() => {
   const filtered = articles.filter((article) =>
     region === 'Global'
       ? true
       : article.regions.includes(region.toLowerCase() as AllRegions),
   )
 
   displayNews.value = [...filtered]
     .sort(() => Math.random() - 0.5)
     .slice(0, limit)
 })

/**
 * 2. Dynamic Ticker Logic
 * Synced specifically to the displayNews ref
 */
const tickerItems = computed(() => {
  if (displayNews.value.length === 0) {
    return ['Monitoring all frequencies for breaking news updates...']
  }
  return displayNews.value.map((a) => `${a.category}: ${a.title}`)
})
</script>

<template>
  <v-card variant="outlined" class="news-board mb-6 rounded-lg">
    <!-- Watermark: Purely decorative -->
    <div class="board-watermark">
      <v-img src="/assets/KENN.png" alt="" aria-hidden="true" />
    </div>

    <!-- Header UI -->
    <div class="px-4 py-3 d-flex align-center justify-space-between border-b header-ui">
      <div class="d-flex align-center text-high-emphasis">
        <v-icon size="20" class="mr-2 opacity-80" color="primary">mdi-antenna</v-icon>
        <span class="text-button font-weight-black tracking-wide">
          KENN // {{ region.toUpperCase() }} FEED
        </span>
      </div>

      <div v-if="displayNews.length > 0" class="d-flex align-center">
        <div class="live-indicator mr-2"></div>
        <span
          class="text-caption font-weight-bold text-medium-emphasis tracking-wide text-uppercase"
        >
          Signal Active
        </span>
      </div>
    </div>

    <!-- News Display -->
    <v-carousel
      v-if="displayNews.length > 0"
      v-model="currentSlide"
      cycle
      height="180"
      hide-delimiter-background
      hide-delimiters
      progress
      progress-color="primary"
      :continuous="true"
      :show-arrows="false"
      :interval="interval"
      direction="vertical"
      class="news-carousel"
    >
      <v-carousel-item v-for="(item, i) in displayNews" :key="item.id">
        <div
          class="px-6 py-4 news-content h-100 d-flex flex-column justify-center"
          :class="{ 'is-active': currentSlide === i }"
        >
          <router-link
            :to="`/sandbox/kenn/${item.id}`"
            class="text-decoration-none color-inherit"
            :aria-label="`Read more about ${item.title}`"
          >
            <div class="text-overline text-primary mb-1 line-height-1">
              {{ item.category }}
            </div>
            <div class="text-h6 font-weight-black mb-1 text-high-emphasis news-title line-clamp-1">
              {{ item.title }}
            </div>
            <div class="text-body-2 text-medium-emphasis news-text line-clamp-2 pr-10">
              {{ item.summary }}
            </div>
          </router-link>
        </div>
      </v-carousel-item>
    </v-carousel>

    <!-- Fallback when no news is found -->
    <div
      v-else
      class="d-flex flex-column align-center justify-center text-medium-emphasis bg-black-thin"
      style="height: 180px"
    >
      <v-icon icon="mdi-broadcast-off" size="32" class="mb-2 opacity-30" />
      <div class="text-overline font-weight-bold">No Regional Signal Detected</div>
    </div>

    <!-- Ticker Banner -->
    <div class="ticker-banner border-t d-flex align-center">
      <div
        class="ticker-badge px-3 py-1 bg-primary text-caption font-weight-black tracking-tighter z-10"
      >
        LATEST
      </div>
      <div class="ticker-track-container overflow-hidden w-100">
        <div class="ticker-track text-caption text-medium-emphasis font-weight-bold">
          <span v-for="(msg, i) in tickerItems" :key="i" class="ticker-item mx-8 text-uppercase">
            <v-icon size="10" class="mx-2 opacity-50">mdi-rhombus</v-icon>
            {{ msg }}
          </span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
/* Utility */
.color-inherit {
  color: inherit !important;
}
.line-height-1 {
  line-height: 1;
}
.tracking-wide {
  letter-spacing: 2px !important;
}

.line-clamp-1,
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-1 {
  -webkit-line-clamp: 1;
  line-clamp: 1;
}
.line-clamp-2 {
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

/* Board Container */
.news-board {
  position: relative;
  overflow: hidden;
  background-color: rgba(var(--v-theme-surface), 0.7);
  border: 1px solid rgba(var(--v-border-color), 0.15) !important;
}

/* Header & Status */
.live-indicator {
  width: 8px;
  height: 8px;
  background-color: rgb(var(--v-theme-error));
  border-radius: 50%;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(0.8);
  }
}

/* Animations */
.news-title,
.news-text {
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.is-active .news-title,
.is-active .news-text {
  opacity: 1;
  transform: translateY(0);
}

.is-active .news-text {
  transition-delay: 0.15s;
}

/* Ticker Styles */
.ticker-banner {
  height: 32px;
  background: rgba(var(--v-border-color), 0.03);
}

.ticker-badge {
  box-shadow: 10px 0 15px rgba(0, 0, 0, 0.2);
}

.ticker-track {
  display: inline-block;
  white-space: nowrap;
  padding-left: 100%;
  animation: marquee 30s linear infinite;
}

.ticker-banner:hover .ticker-track {
  animation-play-state: paused;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* Watermark */
.board-watermark {
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  width: 200px;
  pointer-events: none;
  opacity: 0.05;
  filter: grayscale(1);
  mix-blend-mode: luminosity;
}
</style>
