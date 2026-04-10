<script setup lang="ts">
// views/sandbox/events/index.vue → /sandbox/events
import { ref, computed } from 'vue'
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEventStore } from '@/stores/eventStore'

// ── Event Data ───────────────────────────────────────────────────────────────
const eventStore = useEventStore()

const currentRPDate = computed(() => eventStore.currentRPDate)
const events = computed(() => eventStore.events)
// ── Computed event lists ─────────────────────────────────────────────────────
const rpNow = new Date(currentRPDate.value).getTime()

type EventStatus = 'ongoing' | 'upcoming' | 'past'

function getStatus(event: any): EventStatus {
  // Use the store's currentRPDate
  const todayStr = currentRPDate.value
  const start = event.start
  const end = event.end || event.start

  if (todayStr > end) return 'past'
  if (todayStr >= start && todayStr <= end) return 'ongoing'
  return 'upcoming'
}

const activeEvents = computed(
  () =>
    events.value
      .filter((e) => getStatus(e) !== 'past')
      .sort((a, b) => a.start.localeCompare(b.start)), // Cleaner string sorting
)

const pastEvents = computed(() =>
  events.value
    .filter((e) => getStatus(e) === 'past')
    .sort((a, b) => b.start.localeCompare(a.start)),
)

// ── Dialog state ─────────────────────────────────────────────────────────────
const dialogOpen = ref(false)
const selectedEvent = ref<(typeof events)[0] | null>(null)

function handleEventClick(clickInfo: any) {
  selectedEvent.value = clickInfo.event
  dialogOpen.value = true
}

// ── Calendar config ──────────────────────────────────────────────────────────
const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek',
  },
  initialView: 'dayGridMonth',
  // Use the store values here
  initialDate: currentRPDate.value,
  now: currentRPDate.value,
  events: events.value,
  eventClick: handleEventClick,
  height: 'auto',
  dayCellClassNames: (arg: any) => {
    // Standardize date to YYYY-MM-DD for comparison
    const cellDate = arg.date.toISOString().split('T')[0]
    return cellDate === currentRPDate.value ? ['rp-today'] : []
  },
}))

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(dateString: string) {
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
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip
            color="amber-darken-2"
            variant="flat"
            size="small"
            prepend-icon="mdi-clock-outline"
          >
            RP Date:
            {{ formatDate(currentRPDate) }}
            {{ console.log('RP Date:', currentRPDate) }}
          </v-chip>
          <v-chip color="success" variant="tonal" size="small" prepend-icon="mdi-circle-slice-8">
            {{ activeEvents.filter((e) => getStatus(e) === 'ongoing').length }} ongoing
          </v-chip>
          <v-chip
            color="primary"
            variant="tonal"
            size="small"
            prepend-icon="mdi-calendar-arrow-right"
          >
            {{ activeEvents.filter((e) => getStatus(e) === 'upcoming').length }} upcoming
          </v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiAlert v-if="activeEvents.length === 0" type="info" class="mb-6">
        There are no ongoing or upcoming events scheduled at this time.
      </WikiAlert>

      <!-- Calendar + feed ───────────────────────────────────────────────── -->
      <v-row align="stretch">
        <!-- Interactive calendar -->
        <v-col cols="12" lg="8">
          <WikiCard
            title="Interactive Schedule"
            icon="mdi-calendar-month"
            color="amber"
            class="h-100"
          >
            <div class="calendar-wrap">
              <FullCalendar :options="calendarOptions" />
            </div>
          </WikiCard>
        </v-col>

        <!-- Upcoming feed -->
        <v-col cols="12" lg="4">
          <WikiCard
            title="Active &amp; Upcoming"
            icon="mdi-bulletin-board"
            color="amber"
            class="h-100"
          >
            <p v-if="activeEvents.length === 0" class="text-body-2 text-medium-emphasis">
              Nothing scheduled right now.
            </p>

            <div class="feed-scroll">
              <RouterLink
                v-for="item in activeEvents"
                :key="item.title"
                :to="item.extendedProps.internalPath"
                class="feed-card-link"
              >
                <div class="feed-card mb-3">
                  <!-- Banner image -->
                  <div class="feed-card__img-wrap">
                    <v-img
                      :src="item.extendedProps.image"
                      height="72"
                      cover
                      class="feed-card__img"
                    />
                    <!-- Status badge over image -->
                    <v-chip
                      :color="statusConfig[getStatus(item)].color"
                      size="x-small"
                      :prepend-icon="statusConfig[getStatus(item)].icon"
                      variant="elevated"
                      class="feed-card__status"
                    >
                      {{ statusConfig[getStatus(item)].label }}
                    </v-chip>
                  </div>

                  <div class="feed-card__body pa-3">
                    <div class="text-overline feed-card__date">
                      {{ formatDate(item.start) }}
                      <template v-if="item.end"> — {{ formatDate(item.end) }} </template>
                    </div>
                    <div class="text-subtitle-2 font-weight-bold feed-card__title mb-1">
                      {{ item.title }}
                    </div>
                    <div class="d-flex align-center gap-1">
                      <v-icon size="12" class="text-medium-emphasis">mdi-map-marker-outline</v-icon>
                      <span class="text-caption text-medium-emphasis text-truncate">
                        {{ item.extendedProps.location }}
                      </span>
                    </div>
                  </div>
                </div>
              </RouterLink>
            </div>
          </WikiCard>
        </v-col>
      </v-row>

      <!-- Event detail dialog ─────────────────────────────────────────────── -->
      <v-dialog v-model="dialogOpen" max-width="680" scrollable>
        <v-card v-if="selectedEvent" rounded="xl" class="overflow-hidden">
          <!-- Hero image with title overlay -->
          <div class="dialog-hero">
            <v-img
              v-if="selectedEvent.extendedProps.image"
              :src="selectedEvent.extendedProps.image"
              height="220"
              cover
              class="dialog-hero__img"
            />
            <div class="dialog-hero__overlay">
              <v-chip
                :color="statusConfig[getStatus(selectedEvent)].color"
                size="small"
                :prepend-icon="statusConfig[getStatus(selectedEvent)].icon"
                variant="elevated"
                class="mb-3"
              >
                {{ statusConfig[getStatus(selectedEvent)].label }}
              </v-chip>
              <h2 class="text-h5 font-weight-bold text-white">
                {{ selectedEvent.title }}
              </h2>
            </div>
          </div>

          <v-card-text class="pa-6">
            <v-row>
              <v-col cols="12" sm="6">
                <div class="text-overline text-medium-emphasis mb-1">Region</div>
                <div class="d-flex align-center gap-2">
                  <v-icon size="18" color="primary">mdi-earth</v-icon>
                  <span class="text-body-1">{{ selectedEvent.extendedProps.region }}</span>
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="text-overline text-medium-emphasis mb-1">Date</div>
                <div class="d-flex align-center gap-2">
                  <v-icon size="18" color="primary">mdi-calendar</v-icon>
                  <span class="text-body-1">
                    {{ formatDate(selectedEvent.start) }}
                    <template v-if="selectedEvent.end">
                      — {{ formatDate(selectedEvent.end) }}
                    </template>
                  </span>
                </div>
              </v-col>

              <v-col cols="12">
                <div class="text-overline text-medium-emphasis mb-1">Location</div>
                <div class="d-flex align-center gap-2">
                  <v-icon size="18" color="primary">mdi-map-marker-outline</v-icon>
                  <span class="text-body-1">{{ selectedEvent.extendedProps.location }}</span>
                </div>
              </v-col>

              <v-col cols="12">
                <v-divider class="mb-4" />
                <p class="text-body-1" style="line-height: 1.75">
                  {{ selectedEvent.extendedProps.description }}
                </p>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider />

          <v-card-actions class="pa-4">
            <v-btn
              v-if="selectedEvent.extendedProps.bulba"
              variant="text"
              color="medium-emphasis"
              prepend-icon="mdi-book-open-variant"
              :href="selectedEvent.extendedProps.bulba"
              target="_blank"
            >
              Bulbapedia
            </v-btn>

            <v-spacer />

            <v-btn variant="text" @click="dialogOpen = false">Close</v-btn>

            <v-btn
              v-if="selectedEvent.extendedProps.internalPath"
              color="primary"
              variant="flat"
              prepend-icon="mdi-text-box-search"
              :to="selectedEvent.extendedProps.internalPath"
              rounded="lg"
              @click="dialogOpen = false"
            >
              Full Details
            </v-btn>
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
              :key="past.title"
              :title="past.title"
              :subtitle="`${formatDate(past.start)} · ${past.extendedProps.region} · ${past.extendedProps.location}`"
              :to="past.extendedProps.internalPath"
              prepend-icon="mdi-archive-check-outline"
              rounded="lg"
              class="mb-1"
            />
          </template>
          <v-list-item v-else class="text-medium-emphasis">
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
.feed-scroll {
  max-height: 560px;
  overflow-y: auto;
  padding-right: 2px;
}

.feed-scroll::-webkit-scrollbar {
  width: 4px;
}
.feed-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.feed-scroll::-webkit-scrollbar-thumb {
  background: rgba(128, 128, 128, 0.25);
  border-radius: 2px;
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
