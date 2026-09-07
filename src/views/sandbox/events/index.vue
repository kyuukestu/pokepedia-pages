<script setup lang="ts">
import { ref, computed } from 'vue'
import { eventDefinitions } from '@/data/events/definitions'
import { getImageUrl } from '@/utils/path-resolvers'
import { AllRegions } from '@/types/region'
import { EventDefinition } from '@/types/events'
import { type EventCategoryId } from '@/data/events/generated/category-registry'
import WikiHero from '@/components/sections/WikiHero.vue'
import RegionFilter from '@/components/RegionFilter.vue'

const searchQuery = ref('')
const selectedRegion = ref<AllRegions | null>(null)
const selectedCategory = ref<EventCategoryId | null>(null)

function getEventRegions(event: EventDefinition): string[] {
  if (Array.isArray(event.regions)) return event.regions
  if (typeof event.regions === 'string' && event.regions) return [event.regions]
  return []
}

const categories = computed(() =>
  [...new Set(eventDefinitions.map((e) => e.category?.toUpperCase()))].filter(Boolean).sort(),
)

const filteredEvents = computed(() => {
  return eventDefinitions.filter((event) => {
    const regions = getEventRegions(event)

    const searchMatch =
      !searchQuery.value.trim() ||
      event.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.value.toLowerCase())

    const regionMatch = !selectedRegion.value || regions.includes(selectedRegion.value)

    const categoryMatch =
      !selectedCategory.value ||
      event.category?.toLowerCase() === selectedCategory.value.toLowerCase()

    return searchMatch && regionMatch && categoryMatch
  })
})

const hasFilters = computed(
  () => !!searchQuery.value || !!selectedRegion.value || !!selectedCategory.value,
)

function formatEventRegions(event: EventDefinition): string {
  const regions = getEventRegions(event)

  if (regions.length === 0) return 'Unknown'
  if (regions.length === 1) return regions[0]

  return 'Multiple'
}

function formatRegionName(region: string): string {
  return region.replace(/([a-z])([A-Z])/g, '$1 $2')
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    ecological: 'teal-lighten-2',
    tournament: 'amber-lighten-2',
    festival: 'purple-lighten-2',
    contest: 'pink-lighten-2',
    competition: 'orange-lighten-2',
    conference: 'blue-lighten-2',
    showcase: 'cyan-lighten-2',
    other: 'grey-lighten-1',
  }

  return colors[category?.toLowerCase()] || 'amber-lighten-2'
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedRegion.value = null
  selectedCategory.value = null
}
</script>

<template>
  <!-- Hero Banner -->
  <WikiHero
    title="Event Library"
    subtitle="A complete collection of RP-Events types: Competitions, Festivals, Conferences, Contests, and other notable events recorded across the world."
    icon="mdi-bookshelf"
    pattern="pokeball"
    class="border-bottom-tactical"
  >
    <template #chips>
      <div class="event-stat-strip mt-5">
        <div class="event-stat">
          <span class="event-stat-label">TOTAL ARCHIVED</span>
          <strong>{{ String(eventDefinitions.length).padStart(3, '0') }}</strong>
        </div>

        <div class="event-stat-divider" />

        <div class="event-stat">
          <span class="event-stat-label">LOGS DISPLAYED</span>
          <strong class="text-amber-lighten-2">
            {{ String(filteredEvents.length).padStart(3, '0') }}
          </strong>
        </div>
      </div>
    </template>
  </WikiHero>

  <v-container max-width="1340" class="py-8 px-4">
    <!-- Archive Search & Controls Box -->
    <section class="notebook-controls-card mb-8">
      <div class="archive-controls-header">
        <div>
          <div class="archive-kicker font-mono">
            <v-icon size="14" class="mr-1" color="amber-lighten-2">mdi-notebook-search-outline</v-icon>
            FIELD ARCHIVE INDEX
          </div>

          <h2 class="archive-controls-title font-serif">Browse Event Records</h2>
        </div>

        <v-btn
          v-if="hasFilters"
          variant="text"
          color="amber-lighten-2"
          size="small"
          prepend-icon="mdi-filter-off"
          class="font-mono text-uppercase"
          @click="clearFilters"
        >
          Reset Search
        </v-btn>
      </div>

      <v-divider class="notebook-divider my-4" />

      <v-row class="ma-0 align-center">
        <!-- Search Field Input -->
        <v-col cols="12" md="4" class="pa-1">
          <v-text-field
            v-model="searchQuery"
            label="Search Event Name..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="comfortable"
            hide-details
            clearable
            class="font-mono notebook-input"
          />
        </v-col>

        <!-- Region Dropdown -->
        <v-col cols="12" sm="6" md="3" class="pa-1">
          <RegionFilter
            v-model="selectedRegion"
            :items="eventDefinitions"
            label="Region"
            prepend-inner-icon="mdi-earth"
            variant="outlined"
            density="comfortable"
            hide-details
            class="font-mono notebook-input"
          />
        </v-col>

        <!-- Category Dropdown -->
        <v-col cols="12" sm="6" md="3" class="pa-1">
          <v-select
            v-model="selectedCategory"
            :items="categories"
            label="Category"
            prepend-inner-icon="mdi-tag-outline"
            variant="outlined"
            density="comfortable"
            hide-details
            clearable
            class="font-mono notebook-input"
          />
        </v-col>

        <!-- Counter Badge -->
        <v-col cols="12" md="2" class="pa-1 d-flex align-center justify-md-end">
          <div class="result-count font-mono">
            <span class="count-number">{{ filteredEvents.length }}</span>
            <span class="count-label">ENTRIES FOUND</span>
          </div>
        </v-col>
      </v-row>

      <!-- Active Filters Tag Strip -->
      <div v-if="hasFilters" class="active-filters mt-4 pt-3 border-top-dashed">
        <span class="active-filter-label font-mono">ACTIVE FILTERS //</span>

        <v-chip
          v-if="searchQuery"
          size="small"
          variant="outlined"
          color="amber-lighten-2"
          closable
          class="font-mono"
          @click:close="searchQuery = ''"
        >
          QUERY: "{{ searchQuery }}"
        </v-chip>

        <v-chip
          v-if="selectedRegion"
          size="small"
          variant="outlined"
          color="amber-lighten-2"
          closable
          class="font-mono"
          @click:close="selectedRegion = null"
        >
          REGION: {{ formatRegionName(selectedRegion) }}
        </v-chip>

        <v-chip
          v-if="selectedCategory"
          size="small"
          variant="outlined"
          color="amber-lighten-2"
          closable
          class="font-mono"
          @click:close="selectedCategory = null"
        >
          CAT: {{ selectedCategory }}
        </v-chip>
      </div>
    </section>

    <!-- Empty State -->
    <section v-if="filteredEvents.length === 0" class="notebook-empty-state">
      <v-icon size="48" color="amber-lighten-2" class="mb-3">mdi-notebook-remove-outline</v-icon>

      <h2 class="font-serif">No Matching Records</h2>

      <p class="font-sans">No field logs match the specified search parameters or query keywords.</p>

      <v-btn
        variant="outlined"
        color="amber-lighten-2"
        class="font-mono text-uppercase mt-5"
        @click="clearFilters"
      >
        Clear All Search Filters
      </v-btn>
    </section>

    <!-- Event Cards Grid -->
    <section v-else>
      <div class="archive-section-heading mb-6">
        <div>
          <span class="archive-kicker font-mono">FIELD ENTRIES</span>
          <h2 class="font-serif text-h5 font-weight-bold">Recorded Events</h2>
        </div>

        <span class="archive-section-line" />
      </div>

      <v-row class="ma-n2">
        <v-col
          v-for="event in filteredEvents"
          :key="event.id"
          cols="12"
          sm="6"
          lg="4"
          class="pa-2"
        >
          <v-card
            :to="`/sandbox/events/${event.id}`"
            class="notebook-event-card h-100 d-flex flex-column"
            elevation="0"
          >
            <!-- Card Image Box -->
            <div class="event-image-wrapper">
              <v-img
                :src="getImageUrl(event.image ?? '')"
                height="220"
                cover
                crossorigin="anonymous"
                class="event-image"
              />

              <!-- Category Badge -->
              <div
                class="event-category"
                :style="{
                  '--category-color': `rgb(var(--v-theme-${getCategoryColor(event.category)}))`,
                }"
              >
                <span>{{ event.category }}</span>
              </div>

              <!-- Region Badge -->
              <div class="event-region">
                <v-tooltip location="top" :disabled="getEventRegions(event).length <= 1">
                  <template #activator="{ props: tooltipProps }">
                    <span
                      v-bind="tooltipProps"
                      class="event-region-label"
                      :class="{ 'cursor-pointer': getEventRegions(event).length > 1 }"
                    >
                      <v-icon size="13" class="mr-1">mdi-map-marker-outline</v-icon>
                      {{ formatEventRegions(event) }}
                      <v-icon v-if="getEventRegions(event).length > 1" size="11" class="ml-1">
                        mdi-information-outline
                      </v-icon>
                    </span>
                  </template>

                  <div class="font-mono text-caption pa-1">
                    <div class="font-weight-bold mb-1 text-amber-lighten-2">REGIONS</div>
                    <div v-for="region in getEventRegions(event)" :key="region">
                      • {{ formatRegionName(region) }}
                    </div>
                  </div>
                </v-tooltip>
              </div>

              <!-- Open Arrow Overlay -->
              <div class="event-open-indicator">
                <v-icon size="16" color="amber-lighten-2">mdi-arrow-top-right</v-icon>
              </div>
            </div>

            <!-- Card Article Content -->
            <div class="event-content pa-4 d-flex flex-column flex-grow-1">
              <h3 class="event-title font-serif">
                {{ event.title }}
              </h3>

              <p class="event-description flex-grow-1 mt-2">
                {{ event.description }}
              </p>

              <div class="event-footer pt-3 mt-4">
                <span class="font-mono">FIELD LOG ENTRY</span>
                <v-icon size="14">mdi-chevron-right</v-icon>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>

<style scoped>
/* ----------------------------------------
   Typography & Base Styles
---------------------------------------- */

.font-mono {
  font-family: 'Fira Code', 'Courier New', Courier, monospace !important;
}

.font-serif {
  font-family: 'Georgia', serif !important;
}

.archive-kicker {
  display: flex;
  align-items: center;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #ffb74d;
}

.archive-controls-title {
  margin: 0;
  font-size: 1.5rem;
  color: #f5f0eb;
}

/* ----------------------------------------
   Hero Statistics
---------------------------------------- */

.event-stat-strip {
  display: inline-flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0.6rem 1.1rem;
  border: 1px solid #3d332a;
  border-radius: 4px;
  background: rgba(26, 26, 26, 0.85);
  backdrop-filter: blur(8px);
}

.event-stat {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.event-stat-label {
  font-family: 'Fira Code', monospace;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #a0958a;
}

.event-stat strong {
  font-family: 'Fira Code', monospace;
  font-size: 1.1rem;
  color: #f5f0eb;
}

.event-stat-divider {
  width: 1px;
  height: 20px;
  background: #3d332a;
}

/* ----------------------------------------
   Notebook Filter Shell
---------------------------------------- */

.notebook-controls-card {
  padding: 1.25rem;
  border: 1px solid #3d332a;
  border-radius: 4px;
  background: #1a1a1a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.archive-controls-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.notebook-divider {
  border-color: #3d332a !important;
  opacity: 1 !important;
}

.result-count {
  text-align: right;
  line-height: 1.2;
}

.result-count .count-number {
  display: block;
  font-size: 1.25rem;
  font-weight: 800;
  color: #ffb74d;
}

.result-count .count-label {
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  color: #8c827a;
}

.border-top-dashed {
  border-top: 1px dashed #3d332a;
}

.active-filters {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.active-filter-label {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #8c827a;
}

:deep(.notebook-input .v-field) {
  border-color: #3d332a !important;
  background-color: #222222 !important;
  border-radius: 4px;
}

/* ----------------------------------------
   Section Headers
---------------------------------------- */

.archive-section-heading {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.archive-section-line {
  flex: 1;
  height: 1px;
  background: #3d332a;
}

/* ----------------------------------------
   Notebook Event Cards
---------------------------------------- */

.notebook-event-card {
  border: 1px solid #3d332a !important;
  border-radius: 4px !important;
  background: #1e1e1e !important;
  transition: all 0.25s ease-in-out;
}

.notebook-event-card:hover {
  border-color: #ffb74d !important;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5) !important;
}

.event-image-wrapper {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #3d332a;
}

.event-image {
  filter: grayscale(15%) contrast(95%);
  transition: transform 0.5s ease;
}

.notebook-event-card:hover .event-image {
  transform: scale(1.04);
  filter: grayscale(0%) contrast(100%);
}

.event-category,
.event-region {
  position: absolute;
  top: 10px;
  padding: 0.25rem 0.5rem;
  border: 1px solid #3d332a;
  border-radius: 2px;
  background: rgba(22, 22, 22, 0.9);
  backdrop-filter: blur(4px);
}

.event-category {
  left: 10px;
  border-left: 3px solid var(--category-color);
}

.event-category span,
.event-region-label {
  font-family: 'Fira Code', monospace;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.event-category span {
  color: var(--category-color);
}

.event-region {
  right: 10px;
}

.event-region-label {
  display: inline-flex;
  align-items: center;
  color: #d1c7bd;
}

.event-open-indicator {
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid #3d332a;
  border-radius: 2px;
  background: rgba(22, 22, 22, 0.9);
  opacity: 0;
  transform: translate(4px, 4px);
  transition: all 0.25s ease;
}

.notebook-event-card:hover .event-open-indicator {
  opacity: 1;
  transform: translate(0, 0);
}

/* ----------------------------------------
   Card Text Content
---------------------------------------- */

.event-title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.25;
  color: #f5f0eb;
}

.event-description {
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  color: #a0958a;
  font-size: 0.875rem;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.event-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px dashed #3d332a;
  color: #73685f;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  transition: color 0.2s ease;
}

.notebook-event-card:hover .event-footer {
  color: #ffb74d;
}

/* ----------------------------------------
   Empty State
---------------------------------------- */

.notebook-empty-state {
  padding: 4rem 2rem;
  border: 1px dashed #3d332a;
  border-radius: 4px;
  background: #1a1a1a;
  text-align: center;
  color: #a0958a;
}

.notebook-empty-state h2 {
  color: #f5f0eb;
}
</style>
