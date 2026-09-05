<script setup lang="ts">
import { ref, computed } from 'vue'
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'



// FullCalendar v7 Standard (Free) Imports
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/vue3/daygrid'
import classicThemePlugin from '@fullcalendar/vue3/themes/classic'
import timeGridPlugin from '@fullcalendar/vue3/timegrid'

import '@fullcalendar/vue3/skeleton.css'
import '@fullcalendar/vue3/themes/classic/theme.css'
import '@fullcalendar/vue3/themes/classic/palette.css'


import { useEventStore } from '@/stores/eventStore'
import { getEventDefinition } from '@/data/events/definitions'
import { type EventStatus } from '@/types/events'
import { getImageUrl } from '@/utils/path-resolvers'

// Type-safe Calendar Event Click Argument
interface FullCalendarEventClickArg {
  event: {
    title: string
    startStr: string
    endStr: string
    extendedProps: Record<string, any>
  }
}

const eventStore = useEventStore()
const currentRPDate = computed(() => eventStore.currentRPDate)

/**
 * Hydrate event instances with definitions and display metadata
 */
const hydratedEvents = computed(() => {
  return eventStore.events.map((instance) => {
    const definition = getEventDefinition(instance.eventId)

    const rawRegions = instance.location || definition?.regions || (definition?.regions ? [definition.regions] : ['Global'])
    const regions = Array.isArray(rawRegions) ? rawRegions : [rawRegions]
    const regionDisplay = regions.length > 1 ? 'MULTI-REGION' : (regions[0] || 'GLOBAL')

    return {
      // FullCalendar Core Properties
      title: instance.title || definition?.title || 'Untitled Event',
      start: instance.calendar.start,
      end: instance.calendar.end,
      allDay: instance.calendar.allDay,

      // Navigation & Identifiers
      id: instance.id,
      eventSlug: instance.eventId,
      internalPath: `/sandbox/events/${instance.eventId}/${instance.id}`,
      threadUrl: instance.threadUrl || null,

      // Metadata & Visuals
      image: instance.image || definition?.image || '',
      description: instance.description || definition?.description || 'No Description.',
      location: instance.location || 'Unknown Location',
      status: instance.statusOverride || 'active',

      // Categorization
      category: definition?.category || 'other',
      bulba: definition?.bulba || '',
      regions,
      regionDisplay,

      // Extended Fields
      members: instance.members ?? [],
      extras: instance.extras ?? null,
    }
  })
})

type HydratedEvent = (typeof hydratedEvents.value)[number]

function getStatus(event: HydratedEvent): EventStatus {
  const todayStr = currentRPDate.value
  const start = event.start
  const end = event.end || event.start
  if (todayStr > end) return 'completed'
  if (todayStr >= start && todayStr <= end) return 'ongoing'
  return 'upcoming'
}

// Active vs. Historical Pipelines
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

// Summary Counters
const ongoingCount = computed(() => activeEvents.value.filter((e) => getStatus(e) === 'ongoing').length)
const upcomingCount = computed(() => activeEvents.value.filter((e) => getStatus(e) === 'upcoming').length)

// Modal & Selection Logic
const dialogOpen = ref(false)
const selectedEvent = ref<HydratedEvent | null>(null)

function handleEventClick(clickInfo: FullCalendarEventClickArg) {
  const props = clickInfo.event.extendedProps

  selectedEvent.value = {
    ...props,
    title: clickInfo.event.title,
    start: clickInfo.event.startStr,
    end: clickInfo.event.endStr,
  } as HydratedEvent

  dialogOpen.value = true
}

// Calendar Configuration Object
const calendarOptions = computed(() => ({
  plugins: [classicThemePlugin, dayGridPlugin, timeGridPlugin],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  initialView: 'dayGridMonth',
  initialDate: currentRPDate.value,
  now: currentRPDate.value,
  events: hydratedEvents.value,
  eventClick: handleEventClick,
  height: 650,
}))

// Visual & Text Formatting Helpers
function formatDate(dateString: string) {
  if (!dateString) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString))
}

const getCategoryColor = (category?: string) => {
  const colors: Record<string, string> = {
    ecological: 'teal-lighten-2',
    tournament: 'amber-lighten-2',
    festival: 'purple-lighten-2',
    contest: 'pink-lighten-2',
    competition: 'orange-lighten-2',
    other: 'grey-lighten-1',
  }
  return colors[category?.toLowerCase() || ''] || 'amber-lighten-2'
}

const statusConfig: Record<EventStatus, { label: string; color: string; icon: string }> = {
  ongoing: { label: 'ONGOING', color: 'amber-lighten-2', icon: 'mdi-circle-slice-8' },
  upcoming: { label: 'UPCOMING', color: 'blue-lighten-2', icon: 'mdi-clock-outline' },
  completed: { label: 'PAST ARCHIVE', color: 'grey-lighten-1', icon: 'mdi-archive-outline' },
}
</script>

<template>
  <!-- Header Hero Banner Assembly -->
  <WikiHero
    title="Event Calendar"
    subtitle="League festivals, sanctioned tournaments, and active story arcs across all regions."
    icon="mdi-calendar-star"
    pattern="pokeball"
    class="border-bottom-tactical"
  >
    <template #chips>
      <div class="mt-4 d-flex justify-center align-center flex-wrap ga-4 w-100 px-4">
        <div class="interactive-level-hub pa-3 d-flex align-center flex-wrap ga-3">
          <span class="text-caption font-mono font-weight-bold text-uppercase tracking-wider mr-2 text-amber-lighten-2">
            TEMPORAL INDEX //
          </span>
          <div class="level-readout-badge font-mono text-caption font-weight-bold text-amber-lighten-2 px-3 py-1">
            RP DATE: {{ formatDate(currentRPDate) }}
          </div>
          <div class="level-readout-badge font-mono text-caption font-weight-bold text-amber-lighten-2 px-3 py-1">
            ACTIVE: {{ String(ongoingCount).padStart(2, '0') }}
          </div>
          <div class="level-readout-badge font-mono text-caption font-weight-bold text-amber-lighten-2 px-3 py-1">
            UPCOMING: {{ String(upcomingCount).padStart(2, '0') }}
          </div>
        </div>
      </div>
    </template>
  </WikiHero>

  <!-- Main Content Container -->
  <v-container class="py-10 px-4 position-relative z-index-2" max-width="1340">
    <v-row class="ma-0 ga-y-6">
      <!-- Interactive FullCalendar Hub -->
      <v-col cols="12" lg="8" class="pa-2">
        <WikiCard title="Interactive Schedule" icon="mdi-calendar-month" color="amber">
          <div class="notebook-calendar-container pa-3">
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
                <v-card class="notebook-feed-card mb-4 overflow-hidden" elevation="0">
                  <div class="position-relative">
                    <!-- Header Badges -->
                    <div class="position-absolute top-0 left-0 right-0 d-flex align-center justify-space-between w-100 pa-3 z-index-2">
                      <v-chip
                        :color="statusConfig[getStatus(item)].color"
                        size="x-small"
                        variant="outlined"
                        class="font-mono font-weight-bold text-uppercase px-2 badge-solid-bg"
                      >
                        <v-icon start size="10">{{ statusConfig[getStatus(item)].icon }}</v-icon>
                        {{ statusConfig[getStatus(item)].label }}
                      </v-chip>

                      <!-- Region Badge with Tooltip -->
                      <div class="segment-hull px-2 py-1">
                        <v-tooltip
                          location="top"
                          :disabled="item.regions.length <= 1"
                          open-on-hover
                        >
                          <template #activator="{ props: tooltipProps }">
                            <span
                              v-bind="tooltipProps"
                              class="font-mono text-caption font-weight-bold text-uppercase cursor-pointer d-inline-flex align-center text-amber-lighten-2"
                              @click.prevent
                            >
                              {{ item.regionDisplay }}
                              <v-icon v-if="item.regions.length > 1" size="10" class="ml-1">
                                mdi-information-outline
                              </v-icon>
                            </span>
                          </template>
                          <div class="font-mono text-caption pa-1">
                            <div class="font-weight-bold mb-1 border-b pb-1 text-amber-lighten-2">
                              REGIONS ({{ item.regions.length }})
                            </div>
                            <div v-for="r in item.regions" :key="r" class="d-flex align-center py-0-5">
                              • {{ r }}
                            </div>
                          </div>
                        </v-tooltip>
                      </div>
                    </div>

                    <!-- Image Canvas -->
                    <v-img :src="getImageUrl(item.image)" height="180" cover class="align-end card-image">
                      <div class="card-scrim pa-3 w-100">
                        <div
                          class="font-mono text-caption font-weight-bold text-uppercase tracking-wider mb-1"
                          :style="{ color: `rgb(var(--v-theme-${getCategoryColor(item.category)}))` }"
                        >
                          // {{ item.category }}
                        </div>
                        <h3 class="font-serif text-h6 font-weight-bold text-high-emphasis lh-tight mb-2">
                          {{ item.title }}
                        </h3>
                        <div class="d-flex align-center justify-space-between font-mono text-caption text-medium-emphasis">
                          <span class="d-flex align-center text-truncate max-w-180">
                            <v-icon size="12" start color="amber-lighten-2">mdi-map-marker</v-icon>
                            {{ item.location }}
                          </span>
                          <span class="font-weight-bold text-amber-lighten-2 ml-2">
                            {{ formatDate(item.start) }}
                          </span>
                        </div>
                      </div>
                    </v-img>
                  </div>
                </v-card>
              </RouterLink>
            </template>

            <div v-else class="text-center pa-8 notebook-empty-box">
              <v-icon size="32" color="amber-lighten-2" class="mb-2">mdi-calendar-blank-outline</v-icon>
              <div class="font-mono text-caption font-weight-bold text-uppercase text-medium-emphasis">
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
                class="mb-2 notebook-list-item"
                variant="text"
              >
                <template #prepend>
                  <v-avatar color="#28221b" size="36" class="border-notebook">
                    <v-icon size="18" color="amber-lighten-2">mdi-archive-check-outline</v-icon>
                  </v-avatar>
                </template>

                <v-list-item-title class="font-serif text-subtitle-1 font-weight-bold">
                  {{ past.title }}
                </v-list-item-title>

                <v-list-item-subtitle class="font-mono text-caption text-medium-emphasis mt-1">
                  {{ formatDate(past.start) }} · REGION: {{ past.regionDisplay }} · {{ past.location }}
                </v-list-item-subtitle>

                <template #append>
                  <v-chip
                    size="x-small"
                    variant="outlined"
                    class="font-mono font-weight-bold text-uppercase ml-2"
                    :color="getCategoryColor(past.category)"
                  >
                    {{ past.category }}
                  </v-chip>
                </template>
              </v-list-item>
            </template>

            <v-list-item v-else class="text-medium-emphasis notebook-list-item">
              <template #prepend>
                <v-icon color="amber-lighten-2">mdi-information-outline</v-icon>
              </template>
              <span class="font-mono text-caption font-weight-bold text-uppercase">
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
    <v-card v-if="selectedEvent" class="notebook-dialog-card overflow-hidden" elevation="12">
      <div class="position-relative">
        <v-img :src="getImageUrl(selectedEvent.image)" height="220" cover class="align-end card-image">
          <div class="card-scrim pa-4 w-100">
            <div
              class="font-mono text-caption font-weight-bold text-uppercase tracking-wider mb-1"
              :style="{ color: `rgb(var(--v-theme-${getCategoryColor(selectedEvent.category)}))` }"
            >
              // {{ selectedEvent.category }}
            </div>
            <h2 class="text-h5 font-serif font-weight-bold text-high-emphasis lh-tight">
              {{ selectedEvent.title }}
            </h2>
          </div>
        </v-img>
      </div>

      <v-card-text class="pa-6">
        <v-row class="ma-0 mb-4 notebook-dialog-details pa-3 ga-y-2">
          <v-col cols="6" class="pa-1">
            <div class="font-mono text-caption text-medium-emphasis text-uppercase">Region(s)</div>
            <div class="font-mono text-body-2 font-weight-bold text-high-emphasis">
              {{ selectedEvent.regionDisplay }}
              <span v-if="selectedEvent.regions && selectedEvent.regions.length > 1" class="text-caption text-amber-lighten-2">
                ({{ selectedEvent.regions.join(', ') }})
              </span>
            </div>
          </v-col>
          <v-col cols="6" class="pa-1">
            <div class="font-mono text-caption text-medium-emphasis text-uppercase">Location</div>
            <div class="font-mono text-body-2 font-weight-bold text-high-emphasis text-truncate">
              {{ selectedEvent.location }}
            </div>
          </v-col>
        </v-row>

        <v-divider class="mb-4 notebook-divider" />

        <p class="text-body-2 text-medium-emphasis lh-relaxed font-sans">
          {{ selectedEvent.description }}
        </p>
      </v-card-text>

      <v-card-actions class="pa-4 notebook-dialog-actions d-flex align-center">
        <v-btn
          variant="text"
          size="small"
          class="font-mono font-weight-bold text-uppercase"
          color="amber-lighten-2"
          :to="`/sandbox/events/${selectedEvent.eventSlug}`"
        >
          Overview
        </v-btn>
        <v-spacer />
        <v-btn
          color="amber-lighten-2"
          variant="outlined"
          size="small"
          class="font-mono font-weight-bold text-uppercase px-4"
          :to="selectedEvent.internalPath"
        >
          Full Instance Record
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.font-mono {
  font-family: 'Fira Code', 'Courier New', Courier, monospace !important;
}

.font-serif {
  font-family: 'Georgia', serif !important;
}

.interactive-level-hub {
  border: 1px dashed #3d332a;
  border-radius: 4px;
  background: #1a1a1a;
}

.level-readout-badge {
  border: 1px solid #3d332a;
  border-radius: 2px;
  background: #24201c;
}

.notebook-calendar-container {
  border: 1px solid #3d332a;
  border-radius: 4px;
  background: #1a1a1a;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.4);
  min-height: 650px;
  display: block;
  position: relative;
}

/* FullCalendar Scoped Overrides & Structural Grid Layout */
:deep(.fc) {
  --fc-border-color: #3d332a;
  --fc-button-bg-color: #28221b;
  --fc-button-border-color: #3d332a;
  --fc-button-text-color: #f5f0eb;
  --fc-button-hover-bg-color: #ffb74d;
  --fc-button-hover-border-color: #ffb74d;
  --fc-button-active-bg-color: #ffb74d;
  --fc-button-active-border-color: #ffb74d;
  --fc-page-bg-color: #1a1a1a;
  --fc-neutral-bg-color: #222222;
  font-family: 'Fira Code', 'Courier New', monospace;
  height: 100% !important;
  min-height: 600px;
  display: flex;
  flex-direction: column;
}

:deep(.fc-view-harness) {
  min-height: 500px;
  flex-grow: 1;
}

:deep(.fc-scrollgrid),
:deep(.fc-daygrid-body),
:deep(.fc-daygrid-body table) {
  width: 100% !important;
}

:deep(.fc-theme-standard th),
:deep(.fc-theme-standard td) {
  border-color: #3d332a !important;
}

:deep(.fc-col-header-cell) {
  background-color: #221d18;
  padding: 8px 0;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: #ffb74d;
}

:deep(.fc-toolbar-title) {
  font-family: 'Georgia', serif !important;
  font-size: 1.3rem !important;
  font-weight: 700;
  color: #f5f0eb;
}

:deep(.fc-button) {
  font-family: 'Fira Code', monospace !important;
  font-size: 0.72rem !important;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 2px !important;
  transition: all 0.2s ease;
}

:deep(.fc-button:hover) {
  color: #1a1a1a !important;
}

:deep(.fc-daygrid-event:hover .fc-event-main) {
  height: 20px !important;
  background-color: #ffb74d !important;
  border-radius: 4px !important;
  padding: 0 8px !important;
  box-shadow: 0 4px 12px rgba(255, 183, 77, 0.4);
  transform: translateY(-1px);
}

:deep(.fc-daygrid-event:hover .fc-event-main::before),
:deep(.fc-daygrid-event:hover .fc-event-main::after) {
  opacity: 0;
}

:deep(.fc-daygrid-event:hover .fc-event-title) {
  display: inline !important;
  color: #1a1a1a !important;
  font-size: 0.72rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 3;
}

:deep(.fc-daygrid-day-events) {
  min-height: 1.8em;
}

:deep(.rp-today) {
  background-color: rgba(255, 183, 77, 0.08) !important;
}

:deep(.fc-day-today .fc-daygrid-day-number) {
  background-color: #ffb74d;
  color: #1a1a1a;
  border-radius: 2px;
  padding: 2px 6px;
  font-weight: 800;
}

/* Custom UI Elements */
.feed-scroll {
  max-height: 650px;
  overflow-y: auto;
}

.feed-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.notebook-feed-card {
  border: 1px solid #3d332a !important;
  border-radius: 4px !important;
  background: #1e1e1e !important;
  transition: all 0.25s ease-in-out;
}

.notebook-feed-card:hover {
  border-color: #ffb74d !important;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5) !important;
}

.card-image {
  filter: grayscale(15%) contrast(95%);
  transition: filter 0.3s ease;
}

.notebook-feed-card:hover .card-image {
  filter: grayscale(0%) contrast(100%);
}

.badge-solid-bg {
  background: rgba(26, 26, 26, 0.9) !important;
  backdrop-filter: blur(4px);
}

.segment-hull {
  border: 1px solid #3d332a;
  border-radius: 2px;
  background: rgba(26, 26, 26, 0.9);
  backdrop-filter: blur(4px);
}

.card-scrim {
  background: linear-gradient(
    to top,
    rgba(22, 22, 22, 0.98) 0%,
    rgba(22, 22, 22, 0.7) 65%,
    transparent 100%
  );
}

.notebook-empty-box {
  border: 1px dashed #3d332a;
  border-radius: 4px;
  background: #1a1a1a;
}

.notebook-list-item {
  border: 1px solid #3d332a;
  border-radius: 4px !important;
  background: #1e1e1e;
  transition: all 0.2s ease;
}

.notebook-list-item:hover {
  border-color: #ffb74d !important;
  transform: translateX(4px);
}

.border-notebook {
  border: 1px solid #3d332a !important;
}

.notebook-dialog-card {
  border: 1px solid #3d332a !important;
  border-radius: 4px !important;
  background: #1a1a1a !important;
}

.notebook-dialog-details {
  border: 1px solid #3d332a;
  border-radius: 4px;
  background: #222222;
}

.notebook-dialog-actions {
  background: #221d18;
  border-top: 1px dashed #3d332a;
}

.notebook-divider {
  border-color: #3d332a !important;
  opacity: 1 !important;
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
