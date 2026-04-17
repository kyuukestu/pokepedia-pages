<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import WikiHero from '@/components/sections/WikiHero.vue'
import { eventList } from '@/data/event-list'
import { useEventStore } from '@/stores/eventStore'

const route = useRoute()
const eventStore = useEventStore()

// 1. Grab the ID from the URL (e.g., 'johto')
const regionId = computed(() => {
  if ('regionId' in route.params) {
    return route.params.regionId as string
  }
  return '' // Fallback for safety
})
// 2. Format it for display (e.g., 'orange-islands' -> 'Orange Islands')
const displayName = computed(() => {
  return regionId.value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

// 3. Filter the list (Handles both 'johto' and 'orange-islands')
const filteredEvents = computed(() => {
  const searchSlug = regionId.value.toLowerCase().replace(/-/g, ' ')

  return eventList
    .filter((event) => event.extendedProps.region.toLowerCase().includes(searchSlug))
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
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

    <v-container max-width="900" class="py-12">
      <div class="events-timeline-wrapper">
        <v-row v-if="filteredEvents.length > 0">
          <v-col cols="12" v-for="(event, index) in filteredEvents" :key="index">
            <v-card
              flat
              border
              rounded="xl"
              class="event-item-card overflow-hidden"
              :class="{ 'active-event': checkActiveStatus(event) }"
            >
              <div class="d-flex flex-column flex-sm-row">
                <div
                  class="date-side pa-6 d-flex flex-column align-center justify-center text-center"
                >
                  <div
                    class="text-overline font-weight-black"
                    :class="checkActiveStatus(event) ? 'text-white' : 'text-primary'"
                  >
                    {{ event.extendedProps.type }}
                  </div>
                  <div class="text-h4 font-weight-black">{{ new Date(event.start).getDate() }}</div>
                  <div class="text-subtitle-2 font-weight-bold text-uppercase">
                    {{ new Date(event.start).toLocaleString('default', { month: 'short' }) }}
                  </div>
                </div>

                <v-divider vertical class="hidden-xs" />

                <v-card-text class="pa-6 d-flex align-center">
                  <v-avatar color="surface-variant" rounded="lg" size="56" class="mr-4 shadow-sm">
                    <v-img :src="event.extendedProps.image" cover />
                  </v-avatar>

                  <div>
                    <h3 class="text-h6 font-weight-black mb-1">{{ event.title }}</h3>
                    <div class="d-flex align-center text-caption text-medium-emphasis">
                      <v-icon size="14" class="mr-1">mdi-map-marker</v-icon>
                      {{ event.extendedProps.location }}
                    </div>
                  </div>

                  <v-spacer />

                  <v-btn
                    variant="tonal"
                    rounded="lg"
                    class="font-weight-bold"
                    :color="checkActiveStatus(event) ? 'primary' : 'default'"
                  >
                    {{ checkActiveStatus(event) ? 'Join Event' : 'Details' }}
                  </v-btn>
                </v-card-text>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-else justify="center" class="py-12">
          <v-col cols="12" class="text-center">
            <v-icon size="64" color="grey-lighten-1">mdi-calendar-blank</v-icon>
            <div class="text-h6 text-grey mt-4">
              No events currently scheduled for {{ displayName }}.
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-container>
</template>
