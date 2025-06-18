<script setup lang="ts">
import { ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

// Event data
const events = [
  {
    title: 'Balloon Race',
    start: '2022-08-01',
    end: '2022-08-01',
    description: 'Postponed by Sanguine Swarm.',
    region: 'Johto',
    location: 'R39 — North of Olivine City',
    image: 'https://archives.bulbagarden.net/media/upload/4/44/Pokemon_Balloon_Race.png',
    bulba: 'https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Balloon_Race',
    more: 'https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Balloon_Race',
  },
  {
    title: 'Medieval Festival',
    start: '2022-08-04',
    end: '2022-08-13',
    description: 'A celebration of the medieval era.',
    region: 'Kalos',
    location: ' Loire de Fleuve Isle, Off the Coast of Cyllage',
    image: 'https://i.pinimg.com/736x/85/96/48/85964812fb919478cb3fa1d1ac41ee86.jpg',
    bulba: '',
    more: '',
  },
  {
    title: 'Exeggutor Island Contest',
    start: '2022-08-11',
    end: '2022-08-11',
    description: 'Pokemon Contest',
    region: 'Alola',
    location: 'Exeggutor Island',
    image: 'https://pbs.twimg.com/media/FqNSDUoXgAA3XE4?format=jpg&name=large',
    bulba: '',
    more: '',
  },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectedEvent = ref<any>(null)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleEventClick = (clickInfo: any) => {
  selectedEvent.value = clickInfo.event
}

const closeEventDetails = () => {
  selectedEvent.value = null
}

const formatDate = (date: Date | null): string => {
  if (!date) return ''
  return new Date(date).toLocaleString()
}

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  initialView: 'dayGridMonth',
  initialDate: '2022-08-01',
  dayMaxEvents: true,
  weekends: true,
  events: events,
  eventClick: handleEventClick,
  height: 'auto',
})
</script>

<template>
  <v-container class="pa-4">
    <v-row justify="center">
      <v-col cols="12" lg="10" xl="8">
        <v-card class="pa-4" elevation="2">
          <v-card-title class="text-h5 mb-4"> Event Calendar </v-card-title>

          <div class="calendar-wrapper">
            <FullCalendar :options="calendarOptions" />
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Event Details Dialog -->
    <v-dialog v-model="selectedEvent" max-width="600px">
      <v-card
        v-if="selectedEvent"
        class="event-dialog-card"
        :style="
          selectedEvent.extendedProps?.image
            ? {
                backgroundImage: `url(${selectedEvent.extendedProps.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }
            : {}
        "
      >
        <!-- Semi-transparent overlay for readability -->
        <div class="dialog-overlay">
          <v-card-title class="d-flex justify-space-between align-center text-white">
            <span class="text-h6">Event Details</span>
            <v-btn
              icon="mdi-close"
              variant="text"
              size="small"
              color="white"
              @click="closeEventDetails"
            />
          </v-card-title>

          <v-card-text class="dialog-content">
            <v-list density="compact" class="transparent-list">
              <v-list-item class="transparent-list-item">
                <template #prepend>
                  <v-icon color="white">mdi-calendar-text</v-icon>
                </template>
                <v-list-item-title class="text-white font-weight-medium">Title</v-list-item-title>
                <v-list-item-subtitle class="text-white">{{
                  selectedEvent.title
                }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item class="transparent-list-item">
                <template #prepend>
                  <v-icon color="white">mdi-clock-start</v-icon>
                </template>
                <v-list-item-title class="text-white font-weight-medium">Start</v-list-item-title>
                <v-list-item-subtitle class="text-white">{{
                  formatDate(selectedEvent.start)
                }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item v-if="selectedEvent.end" class="transparent-list-item">
                <template #prepend>
                  <v-icon color="white">mdi-clock-end</v-icon>
                </template>
                <v-list-item-title class="text-white font-weight-medium">End</v-list-item-title>
                <v-list-item-subtitle class="text-white">{{
                  formatDate(selectedEvent.end)
                }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item
                v-if="selectedEvent.extendedProps?.description"
                class="transparent-list-item"
              >
                <template #prepend>
                  <v-icon color="white">mdi-text</v-icon>
                </template>
                <v-list-item-title class="text-white font-weight-medium"
                  >Description</v-list-item-title
                >
                <v-list-item-subtitle class="text-white">{{
                  selectedEvent.extendedProps.description
                }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item v-if="selectedEvent.extendedProps?.region" class="transparent-list-item">
                <template #prepend>
                  <v-icon color="white">mdi-earth</v-icon>
                </template>
                <v-list-item-title class="text-white font-weight-medium">Region</v-list-item-title>
                <v-list-item-subtitle class="text-white">{{
                  selectedEvent.extendedProps.region
                }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item
                v-if="selectedEvent.extendedProps?.location"
                class="transparent-list-item"
              >
                <template #prepend>
                  <v-icon color="white">mdi-map-marker</v-icon>
                </template>
                <v-list-item-title class="text-white font-weight-medium"
                  >Location</v-list-item-title
                >
                <v-list-item-subtitle class="text-white">{{
                  selectedEvent.extendedProps.location
                }}</v-list-item-subtitle>
              </v-list-item>

              <!-- Bulbapedia Link -->
              <v-list-item v-if="selectedEvent.extendedProps?.bulba" class="transparent-list-item">
                <template #prepend>
                  <v-icon color="white">mdi-web</v-icon>
                </template>
                <v-list-item-title class="text-white font-weight-medium"
                  >Reference</v-list-item-title
                >
                <v-list-item-subtitle>
                  <v-btn
                    :href="selectedEvent.extendedProps.bulba"
                    target="_blank"
                    variant="outlined"
                    color="white"
                    size="small"
                    prepend-icon="mdi-open-in-new"
                    class="mt-1"
                  >
                    View on Bulbapedia
                  </v-btn>
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item class="transparent-list-item">
                <template #prepend>
                  <v-icon color="white">mdi-calendar-clock</v-icon>
                </template>
                <v-list-item-title class="text-white font-weight-medium">All Day</v-list-item-title>
                <v-list-item-subtitle class="text-white">{{
                  selectedEvent.allDay ? 'Yes' : 'No'
                }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="white"
              variant="outlined"
              v-if="selectedEvent.extendedProps?.more"
              :to="selectedEvent.extendedProps.more"
            >
              More...
            </v-btn>
            <v-spacer />
            <v-btn color="white" variant="outlined" @click="closeEventDetails"> Close </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.calendar-wrapper {
  /* Ensure the calendar doesn't overflow */
  overflow-x: auto;
}

/* Event dialog styling */
.event-dialog-card {
  position: relative;
  overflow: hidden;
}

.dialog-overlay {
  background: rgba(0, 0, 0, 0.7);
  position: relative;
  z-index: 1;
  height: 100%;
  width: 100%;
}

.dialog-content {
  position: relative;
  z-index: 2;
}

/* Transparent list styling to show background image */
.transparent-list {
  background: transparent !important;
}

.transparent-list-item {
  background: rgba(255, 255, 255, 0.2) !important;
  margin-bottom: 4px;
  border-radius: 4px;
}

/* Theme-specific transparent backgrounds */
.v-theme--dark .transparent-list-item {
  background: rgba(0, 0, 0, 0.2) !important;
}

/* Force white text in both light and dark modes for readability */
.transparent-list-item .v-list-item-title,
.transparent-list-item .v-list-item-subtitle {
  color: white !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

/* Override Vuetify theme colors */
.v-theme--light .transparent-list-item .v-list-item-title,
.v-theme--light .transparent-list-item .v-list-item-subtitle,
.v-theme--dark .transparent-list-item .v-list-item-title,
.v-theme--dark .transparent-list-item .v-list-item-subtitle {
  color: white !important;
}

/* Optional: Custom styling for better mobile responsiveness */
.calendar-wrapper :deep(.fc-toolbar) {
  flex-wrap: wrap;
  gap: 0.5rem;
}

.calendar-wrapper :deep(.fc-toolbar-chunk) {
  display: flex;
  align-items: center;
}

/* Ensure proper spacing on smaller screens */
@media (max-width: 768px) {
  .calendar-wrapper :deep(.fc-toolbar) {
    flex-direction: column;
  }

  .calendar-wrapper :deep(.fc-toolbar-chunk) {
    justify-content: center;
    margin-bottom: 0.5rem;
  }
}
</style>
