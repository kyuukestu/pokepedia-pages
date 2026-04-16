<script setup lang="ts">
import { computed } from 'vue'
import WikiHero from '@/components/sections/WikiHero.vue'
import { eventList } from '@/data/event-list'
import { useEventStore } from '@/stores/eventStore' // Assuming this is your store path

const eventStore = useEventStore()

// Filter for Johto and sort by date (ascending)
const johtoEvents = computed(() => {
  return eventList
    .filter((event) => event.extendedProps.region.includes('Johto'))
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
})

// Helper to check store status per event
const checkActiveStatus = (event: any) => {
  return eventStore.isEventActive(event)
}
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Johto Events"
      subtitle="Regional festivals, sanctioned competitions, and seasonal gatherings."
      icon="mdi-calendar-star"
      class="blue-darken-2"
    >
      <template #chips>
        <v-chip color="blue-darken-2" variant="flat" size="small" class="mt-4 font-weight-black">
          SEASON 2022
        </v-chip>
      </template>
    </WikiHero>

    <v-container max-width="900" class="py-12">
      <div class="events-timeline-wrapper">
        <v-row v-if="johtoEvents.length > 0">
          <v-col cols="12" v-for="(event, index) in johtoEvents" :key="index">
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

                  <v-chip
                    v-if="checkActiveStatus(event)"
                    size="x-small"
                    color="white"
                    variant="flat"
                    class="mt-2 live-badge text-primary font-weight-black"
                  >
                    <v-icon start size="10" class="pulse-dot">mdi-circle</v-icon>
                    LIVE
                  </v-chip>
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
            <div class="text-h6 text-grey mt-4">No Johto events found for this period.</div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-container>
</template>

<style scoped>
.events-timeline-wrapper {
  position: relative;
  padding-left: 20px;
  border-left: 2px dashed rgba(var(--v-border-color), 0.2);
}

.event-item-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: rgb(var(--v-theme-surface));
  margin-bottom: 8px;
  position: relative;
}

.event-item-card:hover {
  transform: translateX(10px);
  border-color: rgb(var(--v-theme-primary)) !important;
}

.date-side {
  min-width: 120px;
  background: rgba(var(--v-theme-on-surface), 0.03);
  transition: background 0.3s ease;
}

/* ACTIVE EVENT STYLES */
.active-event {
  border: 2px solid rgb(var(--v-theme-primary)) !important;
  box-shadow: 0 8px 30px rgba(var(--v-theme-primary), 0.15) !important;
}

.active-event .date-side {
  background: rgb(var(--v-theme-primary));
  color: white !important;
}

.live-badge {
  animation: badge-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.pulse-dot {
  animation: pulse-animation 2s infinite;
}

@keyframes pulse-animation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}

@keyframes badge-pop {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Timeline Dots */
.event-item-card::after {
  content: '';
  position: absolute;
  left: -31px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(var(--v-border-color), 1);
  border: 2px solid rgb(var(--v-theme-surface));
  z-index: 2;
}

.active-event::after {
  background: rgb(var(--v-theme-primary));
  box-shadow: 0 0 10px rgb(var(--v-theme-primary));
}
</style>
