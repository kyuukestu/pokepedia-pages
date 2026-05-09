<script setup lang="ts">
import { ref, computed } from 'vue'
import { eventDefinitions } from '@/data/event-list'
import { getImageUrl } from '@/utils/path-resolvers'
import { Region } from '@/types/region'
import { EventCategories } from '@/types/events'

// --- Filter State ---
const selectedRegion = ref<Region | null>(null)
const selectedCategory = ref<EventCategories | null>(null)

// --- Dynamic Options ---
// Automatically extract unique regions and categories from your data
const regions = computed(() =>
  [...new Set(eventDefinitions.map((e) => e.region.toUpperCase()))].sort(),
)
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
 * Utility to get colors based on category
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
  <v-container>
    <!-- Header Section -->
    <div class="d-flex flex-column flex-sm-row align-sm-end justify-space-between mb-6 ga-4">
      <div class="d-flex align-end">
        <v-icon size="40" color="error" class="mr-3">mdi-map-marker-radius</v-icon>
        <h1 class="text-h4 font-weight-bold">World Events</h1>
      </div>

      <div class="text-subtitle-2 text-disabled">
        Showing {{ filteredEvents.length }} of {{ eventDefinitions.length }} Events
      </div>
    </div>

    <!-- Filter Toolbar -->
    <v-row class="mb-6">
      <v-col cols="12" sm="5" md="4">
        <v-select
          v-model="selectedRegion"
          :items="regions"
          label="Filter by Region"
          prepend-inner-icon="mdi-earth"
          variant="outlined"
          flat
          hide-details
          clearable
          density="comfortable"
          class="rounded-lg text-uppercase"
        />
      </v-col>
      <v-col cols="12" sm="5" md="4">
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
          class="rounded-lg text-uppercase"
        />
      </v-col>
      <v-col cols="12" sm="2" class="d-flex align-center">
        <v-btn
          v-if="selectedRegion || selectedCategory"
          variant="text"
          color="error"
          @click="clearFilters"
          prepend-icon="mdi-filter-off"
        >
          Reset
        </v-btn>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-row v-if="filteredEvents.length === 0" justify="center" class="py-12">
      <v-col cols="auto" class="text-center">
        <v-icon size="64" color="grey-lighten-1">mdi-magnify-close</v-icon>
        <div class="text-h6 text-medium-emphasis mt-4">No events match your filters.</div>
        <v-btn variant="tonal" class="mt-4" @click="clearFilters">Clear all filters</v-btn>
      </v-col>
    </v-row>

    <!-- Event Grid -->
    <v-row>
      <v-col v-for="event in filteredEvents" :key="event.slug" cols="12" sm="6" md="4">
        <v-card
          :to="`/sandbox/events/${event.slug}`"
          class="event-card rounded-xl"
          elevation="4"
          hover
        >
          <v-img
            :src="getImageUrl(event.image)"
            height="320"
            cover
            crossorigin="anonymous"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.9) 100%"
          >
            <v-card-text class="text-white">
              <div class="d-flex align-center mb-1">
                <v-chip
                  size="x-small"
                  :color="getCategoryColor(event.category)"
                  variant="flat"
                  class="text-uppercase font-weight-black mr-2"
                >
                  {{ event.category }}
                </v-chip>
                <span class="text-caption text-uppercase letter-spacing-1 shadow-text">
                  {{ event.region }}
                </span>
              </div>

              <h2 class="text-h5 font-weight-bold shadow-text line-height-tight">
                {{ event.title }}
              </h2>
            </v-card-text>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Keeping your existing styles */
.event-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  overflow: hidden;
}
.event-card:hover {
  transform: translateY(-8px);
}
.shadow-text {
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8);
}
.letter-spacing-1 {
  letter-spacing: 1px;
}
.line-height-tight {
  line-height: 1.2;
}

.event-card :deep(.v-img__img) {
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.event-card:hover :deep(.v-img__img) {
  transform: scale(1.1);
}
</style>
