<script setup lang="ts">
import { ref, computed } from 'vue'
import { eventDefinitions } from '@/data/event-list'
import { getImageUrl } from '@/utils/path-resolvers'
import { Region } from '@/types/region'
import { EventCategories } from '@/types/events'
import WikiHero from '@/components/sections/WikiHero.vue'
import RegionFilter from '@/components/RegionFilter.vue'

// --- Filter State ---
const selectedRegion = ref<Region | null>(null)
const selectedCategory = ref<EventCategories | null>(null)

// --- Dynamic Options ---
const categories = computed(() =>
  [...new Set(eventDefinitions.map((e) => e.category.toUpperCase()))].sort(),
)

// --- Filtering Logic ---
const filteredEvents = computed(() => {
  return eventDefinitions.filter((event) => {
    const regionMatch = !selectedRegion.value || event.region === selectedRegion.value.toLowerCase()
    const categoryMatch =
      !selectedCategory.value || event.category === selectedCategory.value.toLowerCase()
    return regionMatch && categoryMatch
  })
})

/**
 * Utility to get color token states matched directly to your theme variables
 */
const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    ecological: 'teal-accent-3',
    tournament: 'amber-darken-1',
    festival: 'deep-purple-accent-2',
    contest: 'pink-accent-2',
    competition: 'orange-darken-2',
    other: 'grey-lighten-1',
  }
  return colors[category.toLowerCase()] || 'primary'
}

const clearFilters = () => {
  selectedRegion.value = null
  selectedCategory.value = null
}
</script>

<template>
  <v-container fluid class="pa-0 tactical-event-directory">
    <!-- Header Hero Banner Assembly -->
    <WikiHero
      title="World Events"
      subtitle="Historical manifests, current tournament listings, and recurring ecological phenomena."
      icon="mdi-map-marker-radius"
      pattern="pokeball"
      class="border-bottom-tactical"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center align-center flex-wrap ga-4 w-100 px-4">
          <div
            class="interactive-level-hub border-tactical-heavy pa-3 rounded-lg d-flex align-center flex-wrap ga-3 bg-surface-variant"
          >
            <span
              class="text-caption font-mono font-weight-black text-uppercase tracking-wider select-none mr-2"
            >
              Event Registry //
            </span>
            <div
              class="level-readout-badge font-mono text-caption font-weight-black text-primary px-3 py-1 border-tactical text-center bg-surface"
            >
              SHOWING: {{ String(filteredEvents.length).padStart(3, '0') }}
            </div>
            <div
              class="level-readout-badge font-mono text-caption font-weight-black text-disabled px-3 py-1 border-tactical text-center bg-surface"
            >
              TOTAL: {{ String(eventDefinitions.length).padStart(3, '0') }}
            </div>
          </div>
        </div>
      </template>
    </WikiHero>

    <!-- Main Directory Layout -->
    <v-container max-width="1200" class="py-12 position-relative z-index-2">
      <!-- Tactical Action Hub Filter Toolbar -->
      <v-row class="ma-0 mb-8 border-tactical-heavy rounded-xl pa-4 bg-surface align-center ga-y-4">
        <v-col cols="12" sm="5" md="4" class="pa-2">
          <RegionFilter
            v-model="selectedRegion"
            :items="eventDefinitions"
            label="Region Filter"
            prepend-inner-icon="mdi-earth"
            variant="outlined"
            density="comfortable"
            hide-details
            class="rounded-lg text-uppercase font-mono text-caption"
          />
        </v-col>
        <v-col cols="12" sm="5" md="4" class="pa-2">
          <v-select
            v-model="selectedCategory"
            :items="categories"
            label="Filter by Category"
            prepend-inner-icon="mdi-tag-outline"
            variant="outlined"
            flat
            hide-details
            clearable
            density="comfortable"
            class="rounded-lg text-uppercase font-mono text-caption"
          />
        </v-col>
        <v-col cols="12" sm="2" class="pa-2 d-flex align-center justify-start">
          <v-btn
            v-if="selectedRegion || selectedCategory"
            variant="text"
            color="error"
            size="small"
            class="font-mono font-weight-black text-uppercase"
            @click="clearFilters"
            prepend-icon="mdi-filter-off"
          >
            Reset
          </v-btn>
        </v-col>
      </v-row>

      <!-- Empty State Records Uncovered View -->
      <v-row v-if="filteredEvents.length === 0" justify="center" class="ma-0 py-12">
        <v-col
          cols="12"
          max-width="400"
          class="text-center border-tactical-heavy rounded-xl pa-8 bg-surface"
        >
          <v-icon size="48" color="medium-emphasis" class="mb-4">mdi-magnify-close</v-icon>
          <div
            class="text-subtitle-1 font-mono font-weight-black text-high-emphasis text-uppercase mb-2"
          >
            No events match your filters.
          </div>
          <v-btn
            variant="tonal"
            size="small"
            color="primary"
            class="font-mono font-weight-black mt-4"
            @click="clearFilters"
          >
            Clear all filters
          </v-btn>
        </v-col>
      </v-row>

      <!-- Event Grid Manifest Display -->
      <v-row class="ma-0 ga-y-6">
        <v-col
          v-for="event in filteredEvents"
          :key="event.slug"
          cols="12"
          sm="6"
          md="4"
          class="pa-2"
        >
          <v-card
            :to="`/sandbox/events/${event.slug}`"
            class="event-card border-tactical-heavy rounded-xl overflow-hidden h-100"
            elevation="4"
            hover
          >
            <div class="media-canvas-wrapper h-100 position-relative">
              <!-- Segmented Top Telemetry Hulls (Dynamic Theme Glass) -->
              <div
                class="telemetry-segment-top d-flex align-center justify-space-between w-100 pa-3"
              >
                <!-- Left Segment: Category Identification -->
                <div
                  class="segment-hull px-3 py-1 rounded-sm"
                  :style="{
                    borderLeft: `3px solid rgb(var(--v-theme-${getCategoryColor(event.category)}))`,
                  }"
                >
                  <span
                    class="font-mono text-caption font-weight-black text-uppercase tracking-wider"
                    :style="{ color: `rgb(var(--v-theme-${getCategoryColor(event.category)}))` }"
                  >
                    // {{ event.category }}
                  </span>
                </div>

                <!-- Right Segment: Region Identification -->
                <div class="segment-hull px-3 py-1 rounded-sm border-right-accent">
                  <span
                    class="font-mono text-caption font-weight-black text-uppercase tracking-widest"
                  >
                    REG: {{ event.region }}
                  </span>
                </div>
              </div>

              <v-img
                :src="getImageUrl(event.image)"
                height="340"
                cover
                crossorigin="anonymous"
                class="align-end h-100"
              >
                <!-- Segmented Bottom Title Hull (Dynamic Theme Glass) -->
                <div class="telemetry-segment-bottom pa-3 w-100">
                  <div class="title-hull pa-4 rounded-lg">
                    <h2
                      class="text-h5 font-heading-tactical tracking-tight text-high-emphasis text-uppercase lh-tight"
                    >
                      {{ event.title }}
                    </h2>
                  </div>
                </div>
              </v-img>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<style scoped>
/* --- Tactical Cyber Wiki Core Typography --- */
.font-mono {
  font-family: 'Fira Code', 'Courier New', Courier, monospace !important;
}

.font-heading-tactical {
  font-family: 'Space Grotesk', 'Outfit', 'Arial Black', sans-serif !important;
  font-weight: 900 !important;
  letter-spacing: -0.01em !important;
}

.tracking-wider {
  letter-spacing: 0.08em !important;
}
.tracking-widest {
  letter-spacing: 0.16em !important;
}

.lh-tight {
  line-height: 1.15 !important;
}

/* --- High Contrast Structural Theme Borders --- */
.border-tactical {
  border: 1px solid rgba(var(--v-border-color), 0.4) !important;
}

.border-tactical-heavy {
  border: 2px solid rgb(var(--v-border-color)) !important;
}

.border-bottom-tactical {
  border-bottom: 2px solid rgb(var(--v-border-color)) !important;
}

.level-readout-badge {
  border: 1px solid rgba(var(--v-border-color), 0.35);
  letter-spacing: 0.05em;
  border-radius: 4px;
}

.interactive-level-hub {
  backdrop-filter: blur(8px);
  max-width: fit-content;
}

/* --- Segmented Telemetry Overlays (Adaptive UI Glass) --- */
.telemetry-segment-top {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  pointer-events: none;
}

.telemetry-segment-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 3;
}

/*
 * Replaced hardcoded black with dynamic translucent theme surfaces.
 * High saturation and heavy blur shield text readability effortlessly over image content.
 */
.segment-hull,
.title-hull {
  background: rgba(var(--v-theme-surface), 0.82) !important;
  backdrop-filter: blur(12px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(12px) saturate(180%) !important;
  border: 1.5px solid rgba(var(--v-border-color), 0.6) !important;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12) !important;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    background-color 0.3s ease;
}

.border-right-accent {
  border-right: 3px solid rgb(var(--v-border-color)) !important;
}

/* --- Interactive Card Transition Systems --- */
.event-card {
  background: transparent !important;
  transition:
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.3s ease,
    border-color 0.3s ease !important;
  cursor: pointer;
}

.event-card:hover {
  transform: translateY(-6px);
  border-color: rgb(var(--v-theme-primary)) !important;
  box-shadow: 0 16px 32px -4px rgba(var(--v-theme-primary), 0.3) !important;
}

/* Subtle accent transformation on hover */
.event-card:hover .title-hull {
  border-color: rgb(var(--v-theme-primary)) !important;
  background: rgba(var(--v-theme-surface), 0.9) !important;
  box-shadow: 0 0 12px rgba(var(--v-theme-primary), 0.15) !important;
}

/* Media Canvas Depth Transforms */
.media-canvas-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: inherit;
}

.media-canvas-wrapper :deep(.v-img__img) {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.event-card:hover .media-canvas-wrapper :deep(.v-img__img) {
  transform: scale(1.04);
}
</style>
