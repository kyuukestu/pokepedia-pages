<script setup lang="ts">
import { ref, computed } from 'vue'
import { type EventClickArg, type EventHoveringArg } from '@fullcalendar/core/index.js'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import WikiCard from '@/components/wiki/WikiCard.vue'

import { type EventStatus, type HydratedEvent } from '@/types/events'
import { useEventCalendar } from '../composables/useEventCalendar'
import { useEventHydration } from '../composables/useEventHydration'

import EventTemporalHeader from '../components/EventTemporalHeader.vue'
import EventFeedCard from '../components/EventFeedCard.vue'
import EventDetailsDialog from '../components/EventDetailsDialog.vue'

const { getStatus, getDurationDays } = useEventCalendar()
const { currentRPDate, hydratedEvents, activeEvents } = useEventHydration()

const statusConfig: Record<EventStatus, { label: string; color: string; icon: string }> = {
  ongoing: { label: 'ONGOING', color: 'amber-lighten-2', icon: 'mdi-circle-slice-8' },
  upcoming: { label: 'UPCOMING', color: 'blue-lighten-2', icon: 'mdi-clock-outline' },
  completed: { label: 'PAST ARCHIVE', color: 'grey-lighten-1', icon: 'mdi-archive-outline' },
}

const dialogOpen = ref(false)
const selectedEvent = ref<HydratedEvent | null>(null)

function handleEventClick(clickInfo: EventClickArg) {
  const { title, id, extendedProps: props } = clickInfo.event
  const rawStart = props.rawStart || clickInfo.event.startStr.split('T')[0]
  const rawEnd =
    props.rawEnd || (clickInfo.event.endStr ? clickInfo.event.endStr.split('T')[0] : rawStart)

  selectedEvent.value = {
    ...props,
    id: id || props.id,
    title: title.replace(/\s*\[\d+D\]$/, ''),
    start: rawStart,
    end: rawEnd,
    rawStart,
    rawEnd,
    durationDays: props.durationDays || getDurationDays(rawStart, rawEnd),
  } as HydratedEvent

  dialogOpen.value = true
}

// Show full title tooltip on hover
function handleEventMouseEnter(mouseEnterInfo: EventHoveringArg) {
  mouseEnterInfo.el.setAttribute('title', mouseEnterInfo.event.title)
}

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth',
  },
  initialView: 'dayGridMonth',
  initialDate: currentRPDate.value,
  now: currentRPDate.value,
  events: hydratedEvents.value,
  eventClick: handleEventClick,
  eventMouseEnter: handleEventMouseEnter,
  eventColor: '#ffb300', // Forces event backgrounds/borders to amber
  eventTextColor: '#121212', // Dark contrast text for amber chips
  height: 'auto',
  eventDisplay: 'block',
  dayMaxEvents: 4, // Expanded to show more events per day
  moreLinkClick: 'popover',
  moreLinkText: (num: number) => `● ${num}`,
  dayCellClassNames: (arg: any) => {
    const y = arg.date.getFullYear()
    const m = String(arg.date.getMonth() + 1).padStart(2, '0')
    const d = String(arg.date.getDate()).padStart(2, '0')
    const cellDate = `${y}-${m}-${d}`
    return cellDate === currentRPDate.value ? ['rp-today'] : []
  },
}))
</script>

<template>
  <EventTemporalHeader
    :current-r-p-date="currentRPDate"
    :active-count="activeEvents.filter((e) => getStatus(e, currentRPDate) === 'ongoing').length"
    :upcoming-count="activeEvents.filter((e) => getStatus(e, currentRPDate) === 'upcoming').length"
  />

  <v-container class="py-10 px-2 position-relative z-index-2">
    <v-row class="ma-0 ga-y-6 fill-height align-stretch">
      <!-- Interactive Schedule Grid -->
      <v-col cols="12" lg="8" class="pa-2 d-flex flex-column">
        <WikiCard
          title="Event Calendar"
          icon="mdi-calendar-month"
          color="amber"
          class="flex-grow-1"
        >
          <div class="notebook-calendar-container pa-5 h-100">
            <FullCalendar :options="calendarOptions" />
          </div>
        </WikiCard>
      </v-col>

      <!-- Active & Upcoming Event Feed -->
      <v-col cols="12" lg="4" class="pa-2 d-flex flex-column">
        <WikiCard
          title="Active & Upcoming Feed"
          icon="mdi-bulletin-board"
          color="amber"
          class="flex-grow-1"
        >
          <div class="feed-scroll-wrapper">
            <div class="feed-masonry-container pr-1 h-100">
              <template v-if="activeEvents.length > 0">
                <EventFeedCard
                  v-for="item in activeEvents"
                  :key="item.id"
                  :item="item"
                  :status="getStatus(item, currentRPDate)"
                  :status-config="statusConfig"
                />
              </template>

              <div
                v-else
                class="text-center pa-8 notebook-empty-box h-100 d-flex flex-column align-center justify-center"
              >
                <v-icon size="32" color="amber-lighten-2" class="mb-2">
                  mdi-calendar-blank-outline
                </v-icon>
                <div
                  class="font-mono text-caption font-weight-bold text-uppercase text-medium-emphasis"
                >
                  No active or upcoming events recorded.
                </div>
              </div>
            </div>
          </div>
        </WikiCard>
      </v-col>
    </v-row>
  </v-container>

  <EventDetailsDialog v-model="dialogOpen" :selected-event="selectedEvent" />
</template>

<style scoped>
.notebook-calendar-container {
  background: #141414;
  border: 1px solid #3d332a;
  border-radius: 4px;
  container-type: inline-size; /* Enables container-query units for calendar elements */
  display: flex;
  flex-direction: column;
}

.feed-scroll-wrapper {
  max-height: clamp(500px, 70vh, 1200px);
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;
  width: 100%;
}

.feed-masonry-container {
  /* Dynamic 2-column or 1-column layout based on width */
  column-count: 1;
  column-gap: 16px;
  width: 100%;
}

.feed-masonry-container::-webkit-scrollbar {
  width: 4px;
}

.feed-masonry-container::-webkit-scrollbar-thumb {
  background: #3d332a;
  border-radius: 2px;
}

@media (min-width: 600px) {
  .feed-masonry-container {
    column-count: 2;
  }
}

/* Prevent cards from breaking across columns */
:deep(.notebook-feed-card) {
  break-inside: avoid;
  page-break-inside: avoid;
  display: inline-block;
  width: 100%;
  margin-bottom: 16px;
}

.notebook-empty-box {
  border: 1px dashed #3d332a;
  background: rgba(20, 20, 20, 0.5);
  border-radius: 4px;
}

/* FullCalendar Styling Tweaks */
:deep(.fc) {
  --fc-border-color: #3d332a;
  --fc-button-bg-color: #1a1a1a;
  --fc-button-border-color: #3d332a;
  --fc-button-hover-bg-color: #2a2a2a;
  --fc-button-active-bg-color: #ffb300;
  --fc-button-active-border-color: #ffb300;
  --fc-today-bg-color: rgba(255, 191, 0, 0.08);
  --fc-event-bg-color: #ffb300;
  --fc-event-border-color: #ffb300;
}

:deep(.fc .fc-toolbar-title) {
  font-family: serif;
  font-size: 1.4rem;
  color: #ffb300;
}

/* Spacious Cell Heights & Padding */
:deep(.fc .fc-daygrid-day-frame) {
  min-height: clamp(80px, 8cqw, 180px);
  padding: 4px;
}

:deep(.fc .fc-daygrid-day-number) {
  font-family: monospace;
  font-size: clamp(0.75rem, 0.9cqw, 1.1rem);
  padding: 4px 6px;
}

/* Amber Event Customization */
:deep(.fc-event) {
  background-color: #ffb300 !important;
  border-color: #ffb300 !important;
  color: #121212 !important;
  font-weight: 600;
  font-family: monospace;
  font-size: clamp(0.65rem, 0.75cqw, 0.9rem);
  border-radius: 2px;
  padding: 2px 5px;
  margin-top: 3px;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

:deep(.fc-event:hover) {
  opacity: 0.88;
}

:deep(.fc-event-title) {
  color: #121212 !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.fc .rp-today) {
  background: rgba(255, 191, 0, 0.12) !important;
}
</style>
