<script setup lang="ts">
// views/sandbox/events/index.vue
import { ref, computed } from 'vue'
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEventStore } from '@/stores/eventStore'
import { eventDefinitions } from '@/data/events/definitions'
import { type EventDefinition, type EventStatus } from '@/types/events'
import { getImageUrl } from '@/utils/path-resolvers'

const eventStore = useEventStore()
const currentRPDate = computed(() => eventStore.currentRPDate)

// --- Helper: Normalized Region Extractor ---
function getEventRegions(definition?: EventDefinition ): string[] {
  if (!definition) return []
  if (Array.isArray(definition.regions)) return definition.regions
  if (typeof definition.regions === 'string' && definition.regions) return [definition.regions]
  return []
}

function formatEventRegions(definition?: EventDefinition ): string {
  const regions = getEventRegions(definition)
  if (regions.length === 0) return 'UNKNOWN'
  if (regions.length === 1) return regions[0]
  return 'MULTIPLE'
}

/**
 * HYDRATION LOGIC
 * Maps eventInstances to their Definitions and flattens properties for easier consumption.
 */
const hydratedEvents = computed(() => {
  return eventStore.events.map((instance) => {
    const definition = eventDefinitions.find((d) => d.id === instance.eventId)
    const regions = getEventRegions(definition)

    return {
      // FullCalendar standard fields
      title: definition?.title || 'Unknown Event',
      start: instance.calendar.start,
      end: instance.calendar.end,
      allDay: instance.calendar.allDay,

      // Custom flattened properties
      id: instance.id,
      eventSlug: instance.eventId,
      location: instance.location,
      regions: regions,
      regionDisplay: formatEventRegions(definition),
      image: definition?.image || '',
      category: definition?.category || 'other',
      bulba: definition?.bulba || '',
      description: instance.description || definition?.description || 'No Description.',
      status: 'status',
      internalPath: `/sandbox/events/${instance.eventId}/${instance.id}`,
    }
  })
})

type HydratedEvent = typeof hydratedEvents.value[number]


function getStatus(event: HydratedEvent): EventStatus {
  const todayStr = currentRPDate.value
  const start = event.start
  const end = event.end || event.start
  if (todayStr > end) return 'completed'
  if (todayStr >= start && todayStr <= end) return 'ongoing'
  return 'upcoming'
}

const activeEvents = computed(() =>
  hydratedEvents.value
    .filter((e) => getStatus(e) !== 'completed')
    .sort((a, b) => a.start.localeCompare(b.start)),
)

const pastEvents = computed(() =>
  hydratedEvents.value
    .filter((e) => getStatus(e) === 'completed')
    .sort((a, b) => b.start.localeCompare(a.start)),
)

// ── Dialog state ─────────────────────────────────────────────────────────────
const dialogOpen = ref(false)
const selectedEvent = ref<any>(null)

function handleEventClick(clickInfo: any) {
  const props = clickInfo.event.extendedProps

  selectedEvent.value = {
    title: clickInfo.event.title,
    start: clickInfo.event.startStr,
    end: clickInfo.event.endStr,
    id: props.id,
    eventSlug: props.eventSlug,
    location: props.location,
    regions: props.regions || [],
    regionDisplay: props.regionDisplay || 'UNKNOWN',
    image: props.image,
    category: props.category,
    bulba: props.bulba,
    description: props.description,
    internalPath: props.internalPath,
  }

  dialogOpen.value = true
}

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek',
  },
  initialView: 'dayGridMonth',
  initialDate: currentRPDate.value,
  now: currentRPDate.value,
  events: hydratedEvents.value,
  eventClick: handleEventClick,
  height: 'auto',
  dayCellClassNames: (arg: any) => {
    const cellDate = arg.date.toISOString().split('T')[0]
    return cellDate === currentRPDate.value ? ['rp-today'] : []
  },
}))

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(dateString: string) {
  if (!dateString) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString))
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    ecological: 'teal-accent-3',
    tournament: 'amber-darken-1',
    festival: 'deep-purple-accent-2',
    contest: 'pink-accent-2',
    competition: 'orange-darken-2',
    other: 'grey-lighten-1',
  }
  return colors[category?.toLowerCase()] || 'amber-darken-2'
}

const statusConfig: Record<EventStatus, { label: string; color: string; icon: string }> = {
  ongoing: { label: 'ONGOING', color: 'success', icon: 'mdi-circle-slice-8' },
  upcoming: { label: 'UPCOMING', color: 'primary', icon: 'mdi-clock-outline' },
  completed: { label: 'PAST ARCHIVE', color: 'grey-lighten-1', icon: 'mdi-archive-outline' },
}
</script>

<template>
  <v-container fluid class="pa-0 tactical-calendar-directory">
    <!-- Header Hero Banner Assembly -->
    <WikiHero
      title="Regional Event Calendar"
      subtitle="League festivals, sanctioned tournaments, and active story arcs across all regions."
      icon="mdi-calendar-star"
      pattern="pokeball"
      class="border-bottom-tactical"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center align-center flex-wrap ga-4 w-100 px-4">
          <div
            class="interactive-level-hub border-tactical-heavy pa-3 rounded-lg d-flex align-center flex-wrap ga-3 bg-surface-variant"
          >
            <span class="text-caption font-mono font-weight-black text-uppercase tracking-wider select-none mr-2">
              Temporal Index //
            </span>
            <div
              class="level-readout-badge font-mono text-caption font-weight-black text-amber-darken-2 px-3 py-1 border-tactical text-center bg-surface"
            >
              RP DATE: {{ formatDate(currentRPDate) }}
            </div>
            <div
              class="level-readout-badge font-mono text-caption font-weight-black text-success px-3 py-1 border-tactical text-center bg-surface"
            >
              ACTIVE: {{ String(activeEvents.filter((e) => getStatus(e) === 'ongoing').length).padStart(2, '0') }}
            </div>
            <div
              class="level-readout-badge font-mono text-caption font-weight-black text-primary px-3 py-1 border-tactical text-center bg-surface"
            >
              UPCOMING: {{ String(activeEvents.filter((e) => getStatus(e) === 'upcoming').length).padStart(2, '0') }}
            </div>
          </div>
        </div>
      </template>
    </WikiHero>

    <!-- Main Content Container -->
    <v-container max-width="1200" class="py-12 position-relative z-index-2">
      <v-row class="ma-0 ga-y-6">
        <!-- Interactive FullCalendar Hub -->
        <v-col cols="12" lg="8" class="pa-2">
          <WikiCard title="Interactive Schedule" icon="mdi-calendar-month" color="amber">
            <div class="calendar-wrap border-tactical-heavy rounded-lg pa-2 bg-surface">
              <FullCalendar :options="calendarOptions" />
            </div>
          </WikiCard>
        </v-col>

        <!-- Active & Upcoming Event Feed -->
        <v-col cols="12" lg="4" class="pa-2">
          <WikiCard title="Active & Upcoming Feed" icon="mdi-bulletin-board" color="amber">
            <div class="feed-scroll pr-1">
              <template v-if="activeEvents.length > 0">
                <RouterLink
                  v-for="item in activeEvents"
                  :key="item.id"
                  :to="item.internalPath"
                  class="feed-card-link"
                >
                  <v-card
                    class="feed-card border-tactical-heavy rounded-xl mb-4 overflow-hidden"
                    elevation="4"
                    hover
                  >
                    <div class="position-relative">
                      <!-- Scrim Header Badges -->
                      <div
                        class="telemetry-segment-top position-absolute top-0 left-0 right-0 d-flex align-center justify-space-between w-100 pa-3 z-index-2"
                      >
                        <v-chip
                          :color="statusConfig[getStatus(item)].color"
                          size="x-small"
                          variant="flat"
                          class="font-mono font-weight-black text-uppercase tracking-wider px-2"
                        >
                          <v-icon start size="10">{{ statusConfig[getStatus(item)].icon }}</v-icon>
                          {{ statusConfig[getStatus(item)].label }}
                        </v-chip>

                        <!-- Region Badge with Tooltip -->
                        <div class="segment-hull px-2 py-0-5 rounded bg-surface-dark border-tactical">
                          <v-tooltip location="top" :disabled="item.regions.length <= 1" open-on-hover>
                            <template #activator="{ props: tooltipProps }">
                              <span
                                v-bind="tooltipProps"
                                class="font-mono text-caption font-weight-black text-uppercase tracking-widest text-high-emphasis cursor-pointer d-inline-flex align-center"
                                @click.prevent
                              >
                                {{ item.regionDisplay }}
                                <v-icon v-if="item.regions.length > 1" size="10" class="ml-1">
                                  mdi-information-outline
                                </v-icon>
                              </span>
                            </template>
                            <div class="font-mono text-caption pa-1">
                              <div class="font-weight-bold mb-1 border-b pb-1 text-primary">
                                REGIONS ({{ item.regions.length }})
                              </div>
                              <div v-for="r in item.regions" :key="r" class="d-flex align-center py-0-5">
                                <v-icon size="10" class="mr-1" color="primary">mdi-chevron-right</v-icon>
                                {{ r }}
                              </div>
                            </div>
                          </v-tooltip>
                        </div>
                      </div>

                      <!-- Image Canvas -->
                      <v-img :src="getImageUrl(item.image)" height="200" cover class="align-end">
                        <div class="card-scrim pa-4 w-100">
                          <div
                            class="font-mono text-caption font-weight-black text-uppercase tracking-wider mb-1"
                            :style="{ color: `rgb(var(--v-theme-${getCategoryColor(item.category)}))` }"
                          >
                            // {{ item.category }}
                          </div>
                          <h3 class="text-h6 font-heading-tactical text-high-emphasis text-uppercase lh-tight mb-2">
                            {{ item.title }}
                          </h3>
                          <div class="d-flex align-center justify-space-between font-mono text-caption text-medium-emphasis">
                            <span class="d-flex align-center text-truncate max-w-180">
                              <v-icon size="12" start color="amber-darken-2">mdi-map-marker</v-icon>
                              {{ item.location }}
                            </span>
                            <span class="font-weight-bold text-amber-darken-2 ml-2">
                              {{ formatDate(item.start) }}
                            </span>
                          </div>
                        </div>
                      </v-img>
                    </div>
                  </v-card>
                </RouterLink>
              </template>

              <div v-else class="text-center pa-8 border-tactical rounded-lg bg-surface-variant">
                <v-icon size="32" color="medium-emphasis" class="mb-2">mdi-calendar-blank</v-icon>
                <div class="font-mono text-caption font-weight-black text-uppercase text-medium-emphasis">
                  No active or upcoming events recorded.
                </div>
              </div>
            </div>
          </WikiCard>
        </v-col>
      </v-row>

      <!-- Archive Manifest -->
      <v-row class="ma-0 mt-6">
        <v-col cols="12" class="pa-2">
          <WikiCard title="Event Archive Manifest" icon="mdi-archive-outline" color="amber">
            <p class="font-mono text-caption text-medium-emphasis mb-4 text-uppercase tracking-wider">
              Past operation logs and event archives kept for historical continuity.
            </p>

            <v-list lines="two" bg-color="transparent" class="pa-0">
              <template v-if="pastEvents.length > 0">
                <v-list-item
                  v-for="past in pastEvents"
                  :key="past.id"
                  :to="past.internalPath"
                  rounded="lg"
                  class="mb-2 border-tactical bg-surface hover-border-amber"
                  variant="text"
                >
                  <template #prepend>
                    <v-avatar color="surface-variant" size="36" class="border-tactical">
                      <v-icon size="18" color="medium-emphasis">mdi-archive-check-outline</v-icon>
                    </v-avatar>
                  </template>

                  <v-list-item-title class="font-heading-tactical text-uppercase text-high-emphasis font-weight-bold">
                    {{ past.title }}
                  </v-list-item-title>

                  <v-list-item-subtitle class="font-mono text-caption text-medium-emphasis mt-1">
                    {{ formatDate(past.start) }} · REGION: {{ past.regionDisplay }} · {{ past.location }}
                  </v-list-item-subtitle>

                  <template #append>
                    <v-chip
                      size="x-small"
                      variant="tonal"
                      class="font-mono font-weight-black text-uppercase ml-2"
                      :color="getCategoryColor(past.category)"
                    >
                      {{ past.category }}
                    </v-chip>
                  </template>
                </v-list-item>
              </template>

              <v-list-item v-else class="text-medium-emphasis border-tactical rounded-lg">
                <template #prepend>
                  <v-icon color="medium-emphasis">mdi-information-outline</v-icon>
                </template>
                <span class="font-mono text-caption font-weight-black text-uppercase">
                  No historical event manifests found in database.
                </span>
              </v-list-item>
            </v-list>
          </WikiCard>
        </v-col>
      </v-row>
    </v-container>

    <!-- Detail Dialog Manifest -->
    <v-dialog v-model="dialogOpen" max-width="600">
      <v-card v-if="selectedEvent" class="border-tactical-heavy rounded-xl bg-surface overflow-hidden" elevation="12">
        <div class="position-relative">
          <v-img :src="getImageUrl(selectedEvent?.image)" height="220" cover class="align-end">
            <div class="card-scrim pa-4 w-100">
              <div
                class="font-mono text-caption font-weight-black text-uppercase tracking-wider mb-1"
                :style="{ color: `rgb(var(--v-theme-${getCategoryColor(selectedEvent?.category)}))` }"
              >
                // {{ selectedEvent?.category }}
              </div>
              <h2 class="text-h5 font-heading-tactical text-high-emphasis text-uppercase lh-tight">
                {{ selectedEvent?.title }}
              </h2>
            </div>
          </v-img>
        </div>

        <v-card-text class="pa-6">
          <v-row class="ma-0 mb-4 border-tactical rounded-lg pa-3 bg-surface-variant ga-y-2">
            <v-col cols="6" class="pa-1">
              <div class="font-mono text-caption text-medium-emphasis text-uppercase">Region(s)</div>
              <div class="font-mono text-body-2 font-weight-black text-high-emphasis">
                {{ selectedEvent?.regionDisplay }}
                <span v-if="selectedEvent?.regions?.length > 1" class="text-caption text-primary">
                  ({{ selectedEvent.regions.join(', ') }})
                </span>
              </div>
            </v-col>
            <v-col cols="6" class="pa-1">
              <div class="font-mono text-caption text-medium-emphasis text-uppercase">Location</div>
              <div class="font-mono text-body-2 font-weight-black text-high-emphasis text-truncate">
                {{ selectedEvent?.location }}
              </div>
            </v-col>
          </v-row>

          <v-divider class="mb-4 border-tactical" />

          <p class="text-body-2 text-medium-emphasis lh-relaxed">
            {{ selectedEvent?.description }}
          </p>
        </v-card-text>

        <v-card-actions class="pa-4 bg-surface-variant border-t-tactical d-flex align-center">
          <v-btn
            variant="text"
            size="small"
            class="font-mono font-weight-black text-uppercase"
            :to="`/sandbox/events/${selectedEvent?.eventSlug}`"
          >
            Overview
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            variant="flat"
            size="small"
            class="font-mono font-weight-black text-uppercase px-4"
            :to="selectedEvent?.internalPath"
          >
            Full Instance Record
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
/* ── Calendar Styling ─────────────────────────────────────────────────── */
.calendar-wrap {
  position: relative;
  z-index: 1;
}

:deep(.fc) {
  --fc-border-color: rgba(var(--v-border-color), 0.15);
  --fc-button-bg-color: rgb(var(--v-theme-surface-variant));
  --fc-button-border-color: rgba(var(--v-border-color), 0.3);
  --fc-button-hover-bg-color: rgb(var(--v-theme-primary));
  --fc-button-active-bg-color: rgb(var(--v-theme-primary));
  font-family: var(--v-font-family-mono, monospace);
}

:deep(.fc-event) {
  cursor: pointer;
  background-color: rgb(var(--v-theme-primary));
  border: none;
  border-radius: 4px;
  font-size: 0.75rem;
  padding: 2px 4px;
}

:deep(.fc-event:hover) {
  opacity: 0.85;
  filter: brightness(1.1);
}

:deep(.rp-today) {
  background-color: rgba(var(--v-theme-amber-darken-2), 0.12) !important;
}

:deep(.fc-day-today .fc-daygrid-day-number) {
  background-color: rgb(var(--v-theme-amber-darken-2));
  color: #000;
  border-radius: 4px;
  padding: 2px 6px;
  font-weight: 800;
}

:deep(.fc-toolbar-title) {
  font-size: 1.15rem !important;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ── Feed & Card Layout ──────────────────────────────────────────────── */
.feed-scroll {
  max-height: 650px;
  overflow-y: auto;
}

.feed-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.card-scrim {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.6) 60%,
    transparent 100%
  );
}

.bg-surface-dark {
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.hover-border-amber {
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.hover-border-amber:hover {
  border-color: rgb(var(--v-theme-amber-darken-2)) !important;
  transform: translateX(4px);
}

.max-w-180 {
  max-width: 180px;
}

.lh-tight {
  line-height: 1.25;
}

.lh-relaxed {
  line-height: 1.6;
}

.py-0-5 {
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>
