<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import WikiHero from '@/components/sections/WikiHero.vue'
import { eventInstances  } from '@/data/events/instances'
import { eventDefinitions } from '@/data/events/definitions'
import { useEventStore } from '@/stores/eventStore'
import { AllRegions } from '@/types/region'

const route = useRoute()
const eventStore = useEventStore()

const params = route.params as { regionId: string }

// 1. Grab ID and format for display
const regionId = computed(() => (params.regionId as string) || '')

const displayName = computed(() => {
  return regionId.value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

// 2. Create Lookup Map for Definition data
const definitionMap = computed(() => {
  return Object.fromEntries(eventDefinitions.map((d) => [d.id, d]))
})

// 3. Hydrate and Filter
const filteredEvents = computed(() => {
  const searchRegion = regionId.value.toLowerCase().replace(/-/g, ' ') as AllRegions

  return eventInstances
    .map((instance) => ({
      ...instance,
      meta: definitionMap.value[instance.eventId],
    }))
    .filter((item) => {
      if (!item.meta) return false
      return item.meta.regions.includes(searchRegion)
    })
    .sort((a, b) => {
      const startA = a.calendar.start
        ? new Date(a.calendar.start).getTime()
        : Infinity

      const startB = b.calendar.start
        ? new Date(b.calendar.start).getTime()
        : Infinity

      return startA - startB
    })
})

const checkActiveStatus = (event: any) => {
  return eventStore.isEventActive(event)
}
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      :title="`${displayName} Events`"
      :subtitle="`Explore festivals, competitions, and gatherings in the ${displayName} region.`"
      icon="mdi-calendar-star"
      class="blue-darken-2"
    />

    <v-container max-width="1000" class="py-12 px-6">
      <div class="events-timeline-wrapper">
        <v-row v-if="filteredEvents.length > 0">
          <v-col cols="12" v-for="(event, index) in filteredEvents" :key="index">
            <v-card
              flat
              variant="outlined"
              class="event-item-card rounded-0 overflow-hidden mb-2"
              :class="{ 'active-border': checkActiveStatus(event) }"
              :to="`/sandbox/events/${event.eventId}/${event.id}`"
            >
              <div class="d-flex flex-column flex-sm-row">
                <!-- Date Block: Technical Aesthetic -->
                <div
                  class="date-side pa-6 d-flex flex-column align-center justify-center text-center bg-grey-lighten-4 border-sm-e"
                  style="min-width: 120px"
                >
                  <div class="text-overline font-weight-black line-height-1 mb-1 text-grey">
                    {{ new Date(event.calendar.start).toLocaleString('default', { month: 'short' }) }}
                  </div>
                  <div class="text-h4 font-weight-black line-height-1">
                    {{ new Date(event.calendar.start).getDate() }}
                  </div>
                  <v-chip
                    v-if="checkActiveStatus(event)"
                    size="x-small"
                    color="primary"
                    variant="flat"
                    class="mt-2 font-weight-black rounded-0"
                  >
                    LIVE
                  </v-chip>
                </div>

                <!-- Info Block -->
                <v-card-text class="pa-6 d-flex align-center">
                  <!-- Image from Definition -->
                  <v-avatar rounded="0" size="64" class="mr-6 border grayscale-hover">
                    <v-img :src="event.meta?.image" cover />
                  </v-avatar>

                  <div class="flex-grow-1">
                    <div class="d-flex align-center ga-2 mb-1">
                      <span
                        class="text-caption font-weight-black text-uppercase text-primary tracking-widest"
                      >
                        {{ event.meta?.category }}
                      </span>
                      <span class="text-grey-lighten-1">•</span>
                      <span class="text-caption mono-font text-grey">{{ event.id }}</span>
                    </div>

                    <h3
                      class="text-h6 font-weight-black text-uppercase mb-1"
                      style="letter-spacing: -0.5px"
                    >
                      {{ event.meta?.title }}
                    </h3>

                    <div
                      class="d-flex align-center text-caption font-weight-medium text-medium-emphasis"
                    >
                      <v-icon size="14" class="mr-1" color="grey">mdi-map-marker-outline</v-icon>
                      {{ event.location }}
                    </div>
                  </div>

                  <v-btn
                    icon="mdi-chevron-right"
                    variant="text"
                    color="grey-lighten-1"
                    class="hidden-xs"
                  ></v-btn>
                </v-card-text>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Empty State -->
        <v-row v-else justify="center" class="py-16">
          <v-col cols="12" class="text-center">
            <v-icon size="48" color="grey-lighten-2">mdi-database-off-outline</v-icon>
            <div class="text-overline text-grey mt-4">Archive Empty</div>
            <div class="text-body-2 text-grey-darken-1">
              No mission records or events found for the <strong>{{ displayName }}</strong> sector.
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-container>
</template>

<style scoped>
.event-item-card {
  transition: all 0.2s ease;
  border-color: rgba(0, 0, 0, 0.1) !important;
}

.event-item-card:hover {
  border-color: rgb(var(--v-theme-primary)) !important;
  background-color: rgba(var(--v-theme-primary), 0.01);
}

.active-border {
  border-left: 4px solid rgb(var(--v-theme-primary)) !important;
}

.line-height-1 {
  line-height: 1 !important;
}

.tracking-widest {
  letter-spacing: 2px !important;
}

.mono-font {
  font-family: 'JetBrains Mono', 'Roboto Mono', monospace;
}

.grayscale-hover {
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.event-item-card:hover .grayscale-hover {
  filter: grayscale(0%);
}

.border-sm-e {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

@media (max-width: 600px) {
  .border-sm-e {
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
}
</style>
