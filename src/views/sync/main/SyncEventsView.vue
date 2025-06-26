<script setup lang="ts">
import { ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

// Event data
const events = [
  {
    title: 'Lilypad Rotation Tag-Team',
    start: '2021-07-08',
    end: '2021-07-08',
    tag: ['Tournament'],
    description: 'Tournament.',
    region: 'Sinnoh',
    location: 'Lilypad — South of Snowpoint',
    image: 'https://archives.bulbagarden.net/media/upload/c/c5/Lilypad_Colosseum.png',
  },
  {
    title: 'Lilypad Contest',
    start: '2021-07-13',
    end: '2021-07-13',
    tag: ['Contest'],
    description: 'Contest.',
    region: 'Sinnoh',
    location: 'Lilypad Town',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/0/0c/Lilypad_Contest_Hall.png/400px-Lilypad_Contest_Hall.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Alamos Contest',
    start: '2021-08-10',
    end: '2021-08-10',
    tag: ['Contest'],
    description: 'Contest.',
    region: 'Sinnoh',
    location: 'Alamos Town',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/c/cc/Alamos_Town_Contest_Hall.png/440px-Alamos_Town_Contest_Hall.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Celestic Contest',
    start: '2021-08-27',
    end: '2021-08-27',
    tag: ['Contest'],
    description: 'Contest.',
    region: 'Sinnoh',
    location: 'Celestic Town',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/b/b7/Celestic_Contest_Hall.png/301px-Celestic_Contest_Hall.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Brussel Contest',
    start: '2021-09-03',
    end: '2021-09-03',
    tag: ['Contest'],
    description: 'Contest.',
    region: 'Sinnoh',
    location: 'Brussel Town',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/6/67/Brussel_Contest_Hall.png/400px-Brussel_Contest_Hall.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Sandalstraw Contest',
    start: '2021-09-20',
    end: '2021-09-20',
    tag: ['Contest'],
    description: 'Contest.',
    region: 'Sinnoh',
    location: 'Sandalstraw Town',
    image: 'https://archives.bulbagarden.net/media/upload/b/b6/Sandalstraw_Contest_Hall.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Hearthome Contest',
    start: '2021-09-30',
    end: '2021-09-30',
    tag: ['Contest'],
    description: 'Contest.',
    region: 'Sinnoh',
    location: 'Hearthome City',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/3/3f/Hearthome_Contest_Hall.png/301px-Hearthome_Contest_Hall.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Floaroma Contest',
    start: '2021-08-16',
    end: '2021-08-16',
    tag: ['Contest'],
    description: 'Contest.',
    region: 'Sinnoh',
    location: 'Floaroma Town',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/8/80/Floaroma_Contest_Hall.png/1024px-Floaroma_Contest_Hall.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Majolica Contest',
    start: '2021-10-07',
    end: '2021-10-07',
    tag: ['Contest'],
    description: 'Contest.',
    region: 'Sinnoh',
    location: 'Majolica Town',
    image: 'https://archives.bulbagarden.net/media/upload/f/f3/Majolica_Contest_Hall.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Neighborly Contest',
    start: '2021-10-15',
    end: '2021-10-15',
    tag: ['Contest'],
    description: 'Contest.',
    region: 'Sinnoh',
    location: 'Neighborly Town',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/1/1f/Neighborly_Town_Contest_Hall.png/420px-Neighborly_Town_Contest_Hall.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Daybreak Contest',
    start: '2021-10-18',
    end: '2021-10-18',
    tag: ['Contest'],
    description: 'Contest.',
    region: 'Sinnoh',
    location: 'Daybreak Town',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/9/97/Daybreak_Contest_Hall.png/454px-Daybreak_Contest_Hall.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Battle-Swap Switcheroo',
    start: '2021-07-16',
    end: '2021-07-16',
    tag: ['Tournament'],
    description: 'Tournament',
    region: 'Sinnoh',
    location: 'Solaceon Town',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/f/f9/Solaceon_Town_BDSP_Concept_Art.jpg/1280px-Solaceon_Town_BDSP_Concept_Art.jpg',
    bulba: '',
    more: '',
  },
  {
    title: 'Ping Pong Tournament',
    start: '2021-07-19',
    end: '2021-07-19',
    tag: ['Tournament'],
    description: 'Tournament',
    region: 'Sinnoh',
    location: 'Sandalstraw',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/f/f5/Pok%C3%A9mon_Ping_Pong_Tournament_poster.png/1024px-Pok%C3%A9mon_Ping_Pong_Tournament_poster.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Jubilife Contest',
    start: '2021-07-23',
    end: '2021-07-23',
    tag: ['Tournament'],
    description: 'Contest',
    region: 'Sinnoh',
    location: 'Jubilife City',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/9/9e/Jubilife_City_BDSP_Concept_Art.jpg/1280px-Jubilife_City_BDSP_Concept_Art.jpg',
    bulba: '',
    more: '',
  },
  {
    title: 'Chocovine Contest',
    start: '2021-07-27',
    end: '2021-07-27',
    tag: ['Contest'],
    description: 'Contest',
    region: 'Sinnoh',
    location: 'Chocovine Town',
    image: 'https://archives.bulbagarden.net/media/upload/1/1c/Chocovine_Contest_Hall_interior.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Eterna Cup',
    start: '2021-08-02',
    end: '2021-08-02',
    tag: ['Tournament'],
    description: 'Grass-Type Only',
    region: 'Sinnoh',
    location: 'Eterna City',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/c/c7/Eterna_City_BDSP_Concept_Art.jpg/1280px-Eterna_City_BDSP_Concept_Art.jpg',
    bulba: '',
    more: '',
  },
  {
    title: 'Pokemon Hustle',
    start: '2021-08-23',
    end: '2021-08-23',
    tag: ['Sports'],
    description: '',
    region: 'Sinnoh',
    location: 'Greenstation Town',
    image:
      'https://archives.bulbagarden.net/media/upload/5/5d/Sinnoh_Pok%C3%A9mon_Hustle_stage_1.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Poké-Triathalon',
    start: '2021-08-13',
    end: '2021-08-13',
    tag: ['Sports'],
    description: '',
    region: 'Sinnoh',
    location: 'Pokémon Summer Academy',
    image: 'https://archives.bulbagarden.net/media/upload/8/8e/Conway_Floatzel.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Dress Up Competition',
    start: '2021-09-24',
    end: '2021-09-24',
    tag: ['Fashion'],
    description: '',
    region: 'Sinnoh',
    location: 'circa Eterna City',
    image: 'https://archives.bulbagarden.net/media/upload/f/fa/Pok%C3%A9mon_Dress-Up_Contest.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Croagunk Festival',
    start: '2021-09-08',
    end: '2021-09-08',
    tag: ['Tournament'],
    description: 'Only Fighting or Poison Types allowed',
    region: 'Sinnoh',
    location: 'Pastoria City',
    image: 'https://archives.bulbagarden.net/media/upload/9/94/Craig_crown.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Battle Competition',
    start: '2021-09-26 08:00:00',
    end: '2021-09-28 20:00:00',
    tag: ['Tournament'],
    description: 'Singles Day One, Triples Day Two',
    region: 'Sinnoh',
    location: 'Hearthome City',
    image:
      'https://archives.bulbagarden.net/media/upload/9/9b/Hearthome_City_Tag_Battle_Competition.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Hearthome Collection',
    start: '2021-07-30',
    end: '2021-07-30',
    tag: ['Fashion'],
    description: '',
    region: 'Sinnoh',
    location: 'Hearthome City',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/e/e7/Hearthome_Collection.png/330px-Hearthome_Collection.png',
    bulba: '',
    more: '',
  },
  {
    title: 'PokeRinger',
    start: '2021-08-18',
    end: '2021-08-18',
    tag: ['Tournament'],
    description: 'Only flight-capable Pokémon allowed.',
    region: 'Sinnoh',
    location: 'Squallville City',
    image:
      'https://archives.bulbagarden.net/media/upload/c/c7/Sinnoh_Pok%C3%A9Ringer_competition.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Pokeathalon',
    start: '2021-10-04 08:00:00',
    end: '2021-10-06 20:00:00',
    tag: ['Sports'],
    description: '',
    region: 'Sinnoh',
    location: 'Camellia Town',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/1/1a/Pok%C3%A9athlon_art.png/1024px-Pok%C3%A9athlon_art.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Iceberg Race',
    start: '2021-10-12 08:00:00',
    end: '2021-10-13 20:00:00',
    tag: ['Race'],
    description: '',
    region: 'Sinnoh',
    location: 'Snowpoint City',
    image:
      'https://archives.bulbagarden.net/media/upload/e/e3/Pok%C3%A9mon_Iceberg_Race_setting.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Festival Battle Challenge',
    start: '2021-08-29 09:00:00',
    end: '2021-08-31 20:00:00',
    tag: ['Tournament'],
    description: '',
    region: 'Sinnoh',
    location: 'Twinleaf Town',
    image: 'https://archives.bulbagarden.net/media/upload/c/c3/Twinleaf_Festival.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Valley Basin Flush',
    start: '2021-08-05',
    end: '2021-08-05',
    tag: ['Race'],
    description: '',
    region: 'Sinnoh',
    location: 'Celestic Town',
    image: 'https://archives.bulbagarden.net/media/upload/f/fa/Lake_Psyduck.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Orienteering',
    start: '2021-09-14 06:00:00',
    end: '2021-09-16 20:00:00',
    tag: ['Race'],
    description: '',
    region: 'Sinnoh',
    location: 'Mt. Coronet',
    image: 'https://archives.bulbagarden.net/media/upload/a/ad/Pok%C3%A9mon_Orienteering.png',
    bulba: '',
    more: '',
  },
  {
    title: 'Bronze Conference',
    start: '2021-10-25 08:00:00',
    end: '2021-10-29 20:00:00',
    tag: ['Tournament'],
    description: '',
    region: 'Sinnoh',
    location: 'Lily of the Valley Island',
    image: 'https://archives.bulbagarden.net/media/upload/6/6e/Lily_of_the_Valley_Stadium.png',
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
  initialDate: '2021-07-01',
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
                  <v-icon color="white">mdi-tag</v-icon>
                </template>
                <v-list-item-title class="text-white font-weight-medium">Tags</v-list-item-title>
                <v-list-item-subtitle class="text-white">
                  <v-chip-group v-for="(tag, i) in selectedEvent.extendedProps.tag" :key="i">
                    <v-chip>{{ tag }}</v-chip>
                  </v-chip-group>
                </v-list-item-subtitle>
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
