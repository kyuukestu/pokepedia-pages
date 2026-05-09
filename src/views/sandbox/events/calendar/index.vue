<script setup lang="ts">
// views/sandbox/events/index.vue
import { ref, computed } from 'vue'
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEventStore } from '@/stores/eventStore'
import { eventDefinitions } from '@/data/event-list'

const eventStore = useEventStore()
const currentRPDate = computed(() => eventStore.currentRPDate)

/**
 * NEW HYDRATION LOGIC
 * Maps eventInstances to their Definitions.
 * We flatten the properties so they are easier to access in the template.
 */
const hydratedEvents = computed(() => {
  return eventStore.events.map((instance) => {
    const definition = eventDefinitions.find((d) => d.slug === instance.eventSlug)

    return {
      // FullCalendar standard fields
      title: definition?.title || 'Unknown Event',
      start: instance.start,
      end: instance.end,
      allDay: instance.allDay,

      // Custom flattened properties (replacing extendedProps)
      id: instance.instanceId,
      eventSlug: instance.eventSlug,
      location: instance.location,
      region: definition?.region || 'Unknown',
      image: definition?.image || '',
      category: definition?.category || 'other',
      bulba: definition?.bulba || '',
      description: instance.customDescription || definition?.generalDescription || '',
      status: instance.status,
      internalPath: `/sandbox/events/${instance.eventSlug}/${instance.instanceId}`,
    }
  })
})

type EventStatus = 'ongoing' | 'upcoming' | 'past'

function getStatus(event: any): EventStatus {
  const todayStr = currentRPDate.value
  const start = event.start
  const end = event.end || event.start
  if (todayStr > end) return 'past'
  if (todayStr >= start && todayStr <= end) return 'ongoing'
  return 'upcoming'
}

const activeEvents = computed(() =>
  hydratedEvents.value
    .filter((e) => getStatus(e) !== 'past')
    .sort((a, b) => a.start.localeCompare(b.start)),
)

const pastEvents = computed(() =>
  hydratedEvents.value
    .filter((e) => getStatus(e) === 'past')
    .sort((a, b) => b.start.localeCompare(a.start)),
)

// ── Dialog state ─────────────────────────────────────────────────────────────
const dialogOpen = ref(false)
const selectedEvent = ref<any>(null)

function handleEventClick(clickInfo: any) {
  // FullCalendar stores all non-standard fields inside 'extendedProps'
  // even if we flattened them during hydration.
  const props = clickInfo.event.extendedProps

  selectedEvent.value = {
    title: clickInfo.event.title,
    start: clickInfo.event.startStr,
    end: clickInfo.event.endStr,
    // Extract our custom flattened fields back out
    id: props.id,
    eventSlug: props.eventSlug,
    location: props.location,
    region: props.region,
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

const statusConfig: Record<EventStatus, { label: string; color: string; icon: string }> = {
  ongoing: { label: 'Ongoing', color: 'success', icon: 'mdi-circle-slice-8' },
  upcoming: { label: 'Upcoming', color: 'primary', icon: 'mdi-clock-outline' },
  past: { label: 'Past', color: 'default', icon: 'mdi-archive-outline' },
}
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Regional Event Calendar"
      subtitle="League festivals, sanctioned tournaments, and story arcs across all regions."
      icon="mdi-calendar-star"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip
            color="amber-darken-2"
            variant="flat"
            size="small"
            prepend-icon="mdi-clock-outline"
          >
            RP Date: {{ formatDate(currentRPDate) }}
          </v-chip>
          <v-chip color="success" variant="tonal" size="small">
            {{ activeEvents.filter((e) => getStatus(e) === 'ongoing').length }} ongoing
          </v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <v-row>
        <!-- Calendar -->
        <v-col cols="12" lg="8">
          <WikiCard title="Interactive Schedule" icon="mdi-calendar-month" color="amber">
            <FullCalendar :options="calendarOptions" />
          </WikiCard>
        </v-col>

        <!-- Feed -->
        <v-col cols="12" lg="4">
          <WikiCard title="Active & Upcoming" icon="mdi-bulletin-board" color="amber">
            <div class="feed-scroll">
              <RouterLink
                v-for="item in activeEvents"
                :key="item.id"
                :to="item.internalPath"
                class="feed-card-link"
              >
                <v-card class="dominant-card mb-4" theme="dark">
                  <!-- Main Image Container -->
                  <v-img :src="item.image" height="180" cover class="align-end">
                    <!-- The Scrim Overlay -->
                    <div class="card-scrim pa-3">
                      <div class="d-flex align-center justify-space-between mb-1">
                        <v-chip
                          :color="statusConfig[getStatus(item)].color"
                          size="x-small"
                          variant="flat"
                          class="text-uppercase font-weight-black"
                        >
                          {{ statusConfig[getStatus(item)].label }}
                        </v-chip>

                        <v-avatar size="28" color="rgba(0,0,0,0.5)" class="backdrop-blur">
                          <v-icon size="16" color="white">
                            {{ item.category === 'tournament' ? 'mdi-trophy' : 'mdi-star' }}
                          </v-icon>
                        </v-avatar>
                      </div>

                      <h3 class="text-h6 font-weight-bold text-white mb-0 text-shadow">
                        {{ item.title }}
                      </h3>

                      <div class="d-flex align-center text-caption text-grey-lighten-2 mt-1">
                        <v-icon size="14" start color="amber">mdi-map-marker</v-icon>
                        <span class="text-truncate">{{ item.location }}</span>
                        <v-spacer />
                        <span class="font-weight-medium">{{ formatDate(item.start) }}</span>
                      </div>
                    </div>
                  </v-img>
                </v-card>
              </RouterLink>
            </div>
          </WikiCard>
        </v-col>
      </v-row>

      <!-- Detail Dialog -->
      <v-dialog v-model="dialogOpen" max-width="600">
        <v-card v-if="selectedEvent" rounded="xl">
          <v-img :src="selectedEvent?.image" height="200" cover class="align-end">
            <div
              class="pa-4 text-white"
              style="background: linear-gradient(transparent, rgba(0, 0, 0, 0.8))"
            >
              <h2 class="text-h5">{{ selectedEvent?.title }}</h2>
            </div>
          </v-img>

          <v-card-text class="pa-6">
            <div class="d-flex mb-4 gap-4">
              <div>
                <div class="text-overline">Region</div>
                <div>{{ selectedEvent?.region }}</div>
              </div>
              <div>
                <div class="text-overline">Location</div>
                <div>{{ selectedEvent?.location }}</div>
              </div>
            </div>
            <v-divider class="mb-4" />
            <p>{{ selectedEvent?.description }}</p>
          </v-card-text>

          <v-card-actions class="pa-4">
            <v-btn variant="text" :to="`/sandbox/events/${selectedEvent?.eventSlug}`">About</v-btn>
            <v-spacer />
            <v-btn color="primary" variant="flat" :to="selectedEvent?.internalPath"
              >Full Report</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Archive ─────────────────────────────────────────────────────────── -->
      <WikiCard title="Event Archive" icon="mdi-archive-outline" color="amber" class="mt-6">
        <p class="text-body-2 text-medium-emphasis mb-4">
          Past events are kept here for reference and historical RP continuity.
        </p>

        <v-list lines="two" bg-color="transparent" class="pa-0">
          <template v-if="pastEvents.length > 0">
            <v-list-item
              v-for="past in pastEvents"
              :key="past.id"
              :title="past.title"
              :subtitle="`${formatDate(past.start)} · ${past.region} · ${past.location}`"
              :to="past.internalPath"
              prepend-icon="mdi-archive-check-outline"
              rounded="lg"
              class="mb-1"
              variant="text"
            >
              <!-- Optional: Add a small badge for the event type -->
              <template #append>
                <v-chip size="x-small" variant="tonal" class="text-uppercase">
                  {{ past.category }}
                </v-chip>
              </template>
            </v-list-item>
          </template>

          <v-list-item v-else class="text-medium-emphasis">
            <template #prepend>
              <v-icon>mdi-information-outline</v-icon>
            </template>
            No past events on record yet.
          </v-list-item>
        </v-list>
      </WikiCard>
    </v-container>
  </v-container>
</template>

<style scoped>
/* ── Calendar ────────────────────────────────────────────────────────────── */
.calendar-wrap {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.fc-event) {
  cursor: pointer;
  background-color: rgb(var(--v-theme-primary));
  border: none;
  border-radius: 4px;
}

:deep(.fc-event:hover) {
  opacity: 0.85;
}

:deep(.rp-today) {
  background-color: rgba(var(--v-theme-primary), 0.1) !important;
}

:deep(.fc-day-today .fc-daygrid-day-number) {
  background-color: rgb(var(--v-theme-primary));
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

:deep(.fc-today-button) {
  text-transform: capitalize !important;
}

/* ── Feed ────────────────────────────────────────────────────────────────── */

.dominant-card {
  border-radius: 12px;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dominant-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4) !important;
}

/* The Gradient Scrim: Dark at bottom, transparent at top */
.card-scrim {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.4) 60%,
    transparent 100%
  );
  width: 100%;
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.backdrop-blur {
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.feed-scroll {
  max-height: 700px;
  overflow-y: auto;
  padding-right: 10px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.feed-scroll::-webkit-scrollbar {
  display: none;
}
.feed-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.feed-scroll::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-primary), 0.2);
  border-radius: 10px;
}

.feed-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.feed-card {
  border-radius: 10px;
  border: 0.5px solid rgba(var(--v-border-color), var(--v-border-opacity));
  overflow: hidden;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
  background: rgb(var(--v-theme-surface));
}

.feed-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.feed-card__img-wrap {
  position: relative;
}

.feed-card__status {
  position: absolute;
  top: 8px;
  left: 8px;
}

.feed-card__date {
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  color: rgb(var(--v-theme-primary));
  line-height: 1.4;
  margin-bottom: 2px;
}

.feed-card__title {
  line-height: 1.3;
}

/* ── Dialog ──────────────────────────────────────────────────────────────── */
.dialog-hero {
  position: relative;
}

.dialog-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.2) 60%,
    transparent 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px 24px;
}
</style>
