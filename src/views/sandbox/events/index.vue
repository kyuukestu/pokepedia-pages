<script setup lang="ts">
import { ref, computed } from 'vue'
import { eventDefinitions } from '@/data/events/definitions'
import { getImageUrl } from '@/utils/path-resolvers'
import { AllRegions } from '@/types/region'
import { EventCategories, EventDefinition } from '@/types/events'
import WikiHero from '@/components/sections/WikiHero.vue'
import RegionFilter from '@/components/RegionFilter.vue'

const selectedRegion = ref<AllRegions | null>(null)
const selectedCategory = ref<EventCategories | null>(null)

function getEventRegions(event: EventDefinition): string[] {
  if (Array.isArray(event.regions)) return event.regions
  if (typeof event.regions === 'string' && event.regions) return [event.regions]
  return []
}

const categories = computed(() =>
  [...new Set(eventDefinitions.map((e) => e.category?.toUpperCase()))]
    .filter(Boolean)
    .sort(),
)

const filteredEvents = computed(() => {
  return eventDefinitions.filter((event) => {
    const regions = getEventRegions(event)

    const regionMatch =
      !selectedRegion.value ||
      regions.includes(selectedRegion.value)

    const categoryMatch =
      !selectedCategory.value ||
      event.category?.toLowerCase() === selectedCategory.value.toLowerCase()

    return regionMatch && categoryMatch
  })
})

const hasFilters = computed(
  () => !!selectedRegion.value || !!selectedCategory.value,
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
    ecological: 'teal-accent-3',
    tournament: 'amber-darken-1',
    festival: 'deep-purple-accent-2',
    contest: 'pink-accent-2',
    competition: 'orange-darken-2',
    conference: 'blue-accent-2',
    showcase: 'cyan-accent-2',
    other: 'grey-lighten-1',
  }

  return colors[category?.toLowerCase()] || 'primary'
}

const clearFilters = () => {
  selectedRegion.value = null
  selectedCategory.value = null
}
</script>

<template>
  <v-container fluid class="pa-0 event-directory">
    <!-- Hero -->
    <WikiHero
      title="World Events"
      subtitle="An archive of competitions, festivals, conferences, contests, and other notable events recorded across the Pokémon world."
      icon="mdi-calendar-star"
      pattern="pokeball"
      class="border-bottom-tactical"
    >
      <template #chips>
        <div class="event-stat-strip mt-5">
          <div class="event-stat">
            <span class="event-stat-label">TOTAL</span>
            <strong>{{ String(eventDefinitions.length).padStart(3, '0') }}</strong>
          </div>

          <div class="event-stat-divider" />

          <div class="event-stat">
            <span class="event-stat-label">DISPLAYED</span>
            <strong class="text-primary">
              {{ String(filteredEvents.length).padStart(3, '0') }}
            </strong>
          </div>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1280" class="py-10">
      <!-- Archive Controls -->
      <section class="archive-controls mb-10">
        <div class="archive-controls-header">
          <div>
            <div class="archive-kicker">
              <v-icon size="14" class="mr-1">mdi-database-search</v-icon>
              EVENT ARCHIVE
            </div>

            <h2 class="archive-controls-title">
              Browse Events
            </h2>
          </div>

          <v-btn
            v-if="hasFilters"
            variant="text"
            color="error"
            size="small"
            prepend-icon="mdi-filter-off"
            class="font-mono text-uppercase"
            @click="clearFilters"
          >
            Clear Filters
          </v-btn>
        </div>

        <v-divider class="my-5" />

        <v-row class="ma-0">
          <v-col cols="12" md="5" class="pa-2">
            <RegionFilter
              v-model="selectedRegion"
              :items="eventDefinitions"
              label="Region"
              prepend-inner-icon="mdi-earth"
              variant="outlined"
              density="comfortable"
              hide-details
              class="font-mono"
            />
          </v-col>

          <v-col cols="12" md="5" class="pa-2">
            <v-select
              v-model="selectedCategory"
              :items="categories"
              label="Category"
              prepend-inner-icon="mdi-tag-outline"
              variant="outlined"
              density="comfortable"
              hide-details
              clearable
              class="font-mono"
            />
          </v-col>

          <v-col
            cols="12"
            md="2"
            class="pa-2 d-flex align-center justify-md-end"
          >
            <div class="result-count font-mono">
              {{ filteredEvents.length }}
              <span>RESULT{{ filteredEvents.length === 1 ? '' : 'S' }}</span>
            </div>
          </v-col>
        </v-row>

        <!-- Active Filters -->
        <div v-if="hasFilters" class="active-filters mt-4">
          <span class="active-filter-label">FILTERS //</span>

          <v-chip
            v-if="selectedRegion"
            size="small"
            variant="tonal"
            closable
            @click:close="selectedRegion = null"
          >
            {{ formatRegionName(selectedRegion) }}
          </v-chip>

          <v-chip
            v-if="selectedCategory"
            size="small"
            variant="tonal"
            closable
            @click:close="selectedCategory = null"
          >
            {{ selectedCategory }}
          </v-chip>
        </div>
      </section>

      <!-- Empty State -->
      <section
        v-if="filteredEvents.length === 0"
        class="archive-empty-state"
      >
        <v-icon size="48" class="mb-4">
          mdi-calendar-remove
        </v-icon>

        <h2>No Events Found</h2>

        <p>
          No archived events match the current search parameters.
        </p>

        <v-btn
          variant="tonal"
          color="primary"
          class="font-mono text-uppercase mt-4"
          @click="clearFilters"
        >
          Reset Archive Search
        </v-btn>
      </section>

      <!-- Event Archive -->
      <section v-else>
        <div class="archive-section-heading mb-5">
          <div>
            <span class="archive-kicker">ARCHIVED RECORDS</span>
            <h2>Events</h2>
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
              class="event-card h-100"
              elevation="0"
            >
              <!-- Image -->
              <div class="event-image-wrapper">
                <v-img
                  :src="getImageUrl(event.image)"
                  height="260"
                  cover
                  crossorigin="anonymous"
                  class="event-image"
                />

                <!-- Category -->
                <div
                  class="event-category"
                  :style="{
                    '--category-color': `rgb(var(--v-theme-${getCategoryColor(event.category)}))`,
                  }"
                >
                  <span>{{ event.category }}</span>
                </div>

                <!-- Region -->
                <div class="event-region">
                  <v-tooltip
                    location="top"
                    :disabled="getEventRegions(event).length <= 1"
                  >
                    <template #activator="{ props: tooltipProps }">
                      <span
                        v-bind="tooltipProps"
                        class="event-region-label"
                        :class="{
                          'cursor-pointer':
                            getEventRegions(event).length > 1,
                        }"
                      >
                        <v-icon size="13" class="mr-1">
                          mdi-map-marker-outline
                        </v-icon>

                        {{ formatEventRegions(event) }}

                        <v-icon
                          v-if="getEventRegions(event).length > 1"
                          size="11"
                          class="ml-1"
                        >
                          mdi-information-outline
                        </v-icon>
                      </span>
                    </template>

                    <div class="font-mono text-caption">
                      <div class="font-weight-bold mb-1">
                        REGIONS
                      </div>

                      <div
                        v-for="region in getEventRegions(event)"
                        :key="region"
                      >
                        {{ formatRegionName(region) }}
                      </div>
                    </div>
                  </v-tooltip>
                </div>

                <!-- Hover Arrow -->
                <div class="event-open-indicator">
                  <v-icon size="18">
                    mdi-arrow-top-right
                  </v-icon>
                </div>
              </div>

              <!-- Article Preview -->
              <div class="event-content pa-4">
                <h3 class="event-title">
                  {{ event.title }}
                </h3>

                <p class="event-description">
                  {{ event.description }}
                </p>

                <div class="event-footer mt-4">
                  <span class="font-mono">
                    ARTICLE
                  </span>

                  <v-icon size="14">
                    mdi-chevron-right
                  </v-icon>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </v-container>
</template>

<style scoped>
.event-directory {
  min-height: 100%;
}

/* ----------------------------------------
   Typography
---------------------------------------- */

.font-mono {
  font-family:
    'Fira Code',
    'Courier New',
    Courier,
    monospace !important;
}

.archive-kicker {
  display: flex;
  align-items: center;
  font-family:
    'Fira Code',
    'Courier New',
    monospace;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgb(var(--v-theme-primary));
}

.archive-controls-title,
.archive-section-heading h2 {
  margin: 0;
  font-family:
    'Space Grotesk',
    'Outfit',
    sans-serif;
  font-weight: 900;
  letter-spacing: -0.025em;
}

/* ----------------------------------------
   Hero Statistics
---------------------------------------- */

.event-stat-strip {
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.7rem 1.25rem;
  border: 1px solid rgba(var(--v-border-color), 0.5);
  border-radius: 8px;
  background: rgba(var(--v-theme-surface), 0.72);
  backdrop-filter: blur(10px);
}

.event-stat {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}

.event-stat-label {
  font-family: 'Fira Code', monospace;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: rgba(var(--v-theme-on-surface), 0.55);
}

.event-stat strong {
  font-family: 'Fira Code', monospace;
  font-size: 1.1rem;
}

.event-stat-divider {
  width: 1px;
  height: 24px;
  background: rgba(var(--v-border-color), 0.5);
}

/* ----------------------------------------
   Archive Controls
---------------------------------------- */

.archive-controls {
  padding: 1.5rem;
  border: 1px solid rgba(var(--v-border-color), 0.5);
  border-radius: 12px;
  background: rgb(var(--v-theme-surface));
}

.archive-controls-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.result-count {
  text-align: right;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.05em;
}

.result-count span {
  display: block;
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  opacity: 0.5;
}

.active-filters {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.active-filter-label {
  font-family: 'Fira Code', monospace;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  opacity: 0.5;
}

/* ----------------------------------------
   Section Header
---------------------------------------- */

.archive-section-heading {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.archive-section-line {
  flex: 1;
  height: 1px;
  background: rgba(var(--v-border-color), 0.5);
}

/* ----------------------------------------
   Event Cards
---------------------------------------- */

.event-card {
  overflow: hidden;
  border: 1px solid rgba(var(--v-border-color), 0.55) !important;
  border-radius: 12px !important;
  background: rgb(var(--v-theme-surface)) !important;

  transition:
    transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.event-card:hover {
  transform: translateY(-5px);
  border-color: rgb(var(--v-theme-primary)) !important;
  box-shadow:
    0 14px 30px -12px rgba(var(--v-theme-primary), 0.35) !important;
}

.event-image-wrapper {
  position: relative;
  overflow: hidden;
}

.event-image {
  transition:
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.3s ease;
}

.event-card:hover .event-image {
  transform: scale(1.04);
}

/* ----------------------------------------
   Image Metadata
---------------------------------------- */

.event-category,
.event-region {
  position: absolute;
  top: 12px;
  padding: 0.35rem 0.65rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 5px;
  background: rgba(var(--v-theme-surface), 0.88);
  backdrop-filter: blur(10px);
}

.event-category {
  left: 12px;
  border-left: 3px solid var(--category-color);
}

.event-category span,
.event-region-label {
  font-family: 'Fira Code', monospace;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.event-category span {
  color: var(--category-color);
}

.event-region {
  right: 12px;
}

.event-region-label {
  display: inline-flex;
  align-items: center;
}

/* ----------------------------------------
   Open Indicator
---------------------------------------- */

.event-open-indicator {
  position: absolute;
  right: 12px;
  bottom: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;

  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 50%;

  background: rgba(var(--v-theme-surface), 0.88);
  backdrop-filter: blur(10px);

  opacity: 0;
  transform: translate(5px, 5px);

  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.event-card:hover .event-open-indicator {
  opacity: 1;
  transform: translate(0, 0);
}

/* ----------------------------------------
   Article Preview
---------------------------------------- */

.event-title {
  margin: 0;

  font-family:
    'Space Grotesk',
    'Outfit',
    sans-serif;

  font-size: 1.25rem;
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.event-description {
  display: -webkit-box;
  overflow: hidden;
  margin: 0.65rem 0 0;

  color: rgba(var(--v-theme-on-surface), 0.65);

  font-size: 0.9rem;
  line-height: 1.5;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.event-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-top: 0.75rem;
  border-top: 1px solid rgba(var(--v-border-color), 0.35);

  color: rgba(var(--v-theme-on-surface), 0.45);

  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.12em;

  transition: color 0.2s ease;
}

.event-card:hover .event-footer {
  color: rgb(var(--v-theme-primary));
}

/* ----------------------------------------
   Empty State
---------------------------------------- */

.archive-empty-state {
  padding: 5rem 2rem;
  border: 1px dashed rgba(var(--v-border-color), 0.6);
  border-radius: 12px;
  text-align: center;
  color: rgba(var(--v-theme-on-surface), 0.55);
}

.archive-empty-state h2 {
  margin-bottom: 0.5rem;

  font-family:
    'Space Grotesk',
    sans-serif;

  font-weight: 900;
  color: rgb(var(--v-theme-on-surface));
}

.archive-empty-state p {
  margin: 0;
}
</style>
