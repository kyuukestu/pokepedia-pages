```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

// Event data with encounters
const swarms = [
  {
    title: 'Week 1',
    start: '2021-07-01 00:00:00',
    end: '2021-07-07 23:59:59',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/0/08/Sinnoh_BDSP_artwork.png/450px-Sinnoh_BDSP_artwork.png',
    encounters: [
      {
        name: 'Combee',
        location: 'Amber Castle',
        image: '@images/415.png',
        tip: 'Eterna Forest',
      },
      {
        name: 'Drifloon',
        location: 'Valley Windworks',
        image: '@images/425.png',
        tip: 'East of Floaroma Town',
      },
      {
        name: 'Drowzee',
        location: "Xatu's Forest",
        image: '@images/096.png',
        tip: 'Near Twinleaf Town',
      },
      {
        name: 'Duskull',
        location: 'Bewilder Forest',
        image: '@images/355.png',
        tip: 'Between Sandgem & Jubilife City',
      },
      {
        name: 'Feebas',
        location: 'Lake Verity',
        image: '@images/349.png',
      },
      {
        name: 'Hatenna',
        location: 'Bewilder Forest',
        image: '@images/856.png',
        tip: 'Between Sandgem & Jubilife City',
      },
      {
        name: 'Hawlucha',
        location: 'Eterna Forest',
        image: '@images/701.png',
      },
      {
        name: 'Noibat',
        location: 'Mt. Coronet',
        image: '@images/714.png',
      },
      {
        name: 'Porygon',
        location: 'Trophy Garden',
        image: '@images/137.png',
      },
      {
        name: 'Slowpoke-Galarian',
        location: 'Lake Psyduck',
        image: '@images/079-Galar.png',
        tip: 'Between Solaceon & Celestic Town',
      },
      {
        name: 'Slugma',
        location: 'Stark Mountain',
        image: '@images/218.png',
      },
      {
        name: 'Tengela',
        location: 'Emeragrove Town',
        image: '@images/114.png',
        tip: 'Near Hearthome City',
      },
      {
        name: 'Trapinch',
        location: 'R228',
        image: '@images/328.png',
        tip: 'Battle Zone',
      },
      {
        name: 'Wimpod',
        location: 'Sangem Beach',
        image: '@images/767.png',
      },
      {
        name: 'Wooper',
        location: 'Chocovine Town',
        image: '@images/194.png',
        tip: 'Near Snowpoint',
      },
      {
        name: 'Zubat',
        location: 'Oreburgh Gate',
        image: '@images/041.png',
      },
    ],
  },
  {
    title: 'Week 2',
    start: '2021-07-08 00:00:00',
    end: '2021-07-14 23:59:59',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/0/08/Sinnoh_BDSP_artwork.png/450px-Sinnoh_BDSP_artwork.png',
    encounters: [
      {
        name: 'Audino',
        location: 'Route 210',
        image: '@images/531.png',
      },
      {
        name: 'Ducklett',
        location: 'Route 219',
        image: '@images/580.png',
      },
      {
        name: 'Castform',
        location: 'Trophy Garden',
        image: '@images/351.png',
      },
      {
        name: 'Charmander',
        location: 'Route 221',
        image: '@images/004.png',
      },
      {
        name: 'Karrablast',
        location: 'Valor Forest',
        image: '@images/588.png',
      },
      {
        name: 'Komala',
        location: 'Sunnyshore Wood',
        image: '@images/775.png',
      },
      {
        name: 'Mareanie',
        location: 'Long Beach',
        image: '@images/747.png',
      },
      {
        name: 'Phanpy',
        location: 'Route 207',
        image: '@images/231.png',
      },
      {
        name: 'Ralts',
        location: 'Route 212',
        image: '@images/280.png',
      },
      {
        name: 'Scorbunny',
        location: 'Pal Park',
        image: '@images/813.png',
      },
      {
        name: 'Slowpoke',
        location: 'Route 205',
        image: '@images/079.png',
      },
      {
        name: 'Starly',
        location: 'Route 201',
        image: '@images/396.png',
      },
      {
        name: 'Stunky',
        location: 'Great Marsh',
        image: '@images/434.png',
      },
      {
        name: 'Tentacool',
        location: "Diablo's Bay",
        image: '@images/072.png',
      },
      {
        name: 'Torchic',
        location: 'Finit Forest',
        image: '@images/255.png',
      },
      {
        name: 'Whismur',
        location: 'Ravaged Path',
        image: '@images/293.png',
      },
    ],
  },
  {
    title: 'Week 3',
    start: '2021-07-15 00:00:00',
    end: '2021-07-21 23:59:59',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/0/08/Sinnoh_BDSP_artwork.png/450px-Sinnoh_BDSP_artwork.png',
    encounters: [
      {
        name: 'Applin',
        location: 'Heart Forest',
        image: '@images/840.png',
      },
      {
        name: 'Bagon',
        location: 'Route 210',
        image: '@images/371.png',
      },
      {
        name: 'Carvanha',
        location: 'Lake Valor',
        image: '@images/318.png',
      },
      {
        name: 'Chimchar',
        location: 'Route 227',
        image: '@images/390.png',
      },
      {
        name: 'Cryogonal',
        location: 'Mt. Coronet, Northern',
        image: '@images/615.png',
      },
      {
        name: 'Fennekin',
        location: "Xatu's Forest",
        image: '@images/653.png',
      },
      {
        name: 'Foongus',
        location: 'Great Marsh',
        image: '@images/590.png',
      },
      {
        name: 'Kangaskhan',
        location: 'Valor Forest',
        image: '@images/115.png',
      },
      {
        name: 'Klink',
        location: 'Mt. Coronet (Hearthome entrance)',
        image: '@images/599.png',
      },
      {
        name: 'Ledyba',
        location: 'Eterna Forest',
        image: '@images/165.png',
      },
      {
        name: 'Luvdisc',
        location: 'Old Basin',
        image: '@images/370.png',
      },
      {
        name: 'Oranguru',
        location: 'Long Forest',
        image: '@images/765.png',
      },
      {
        name: 'Pancham',
        location: 'Celestic Wood',
        image: '@images/674.png',
      },
      {
        name: 'Sigilyph',
        location: 'Solaceon Ruins',
        image: '@images/561.png',
      },
      {
        name: 'Smeargle',
        location: 'Route 208',
        image: '@images/235.png',
      },
      {
        name: 'Snivy',
        location: 'Great Floaroma Flower Meadow',
        image: '@images/495.png',
      },
    ],
  },
  {
    title: 'Week 4',
    start: '2021-07-22 00:00:00',
    end: '2021-07-28 23:59:59',
    image:
      'https://archives.bulbagarden.net/media/upload/thumb/0/08/Sinnoh_BDSP_artwork.png/450px-Sinnoh_BDSP_artwork.png',
    encounters: [
      {
        name: 'Chingling',
        location: 'Oreburgh Gate - 2nd Flr',
        image: '@images/433.png',
      },
      {
        name: 'Clobbopus',
        location: 'Sandgem Beach',
        image: '@images/852.png',
      },
      {
        name: 'Corsola-Galarian',
        location: "Diablo's Bay",
        image: '@images/222-Galar.png',
      },
      {
        name: 'Darumaka-Galarian',
        location: 'Snow White Woodland',
        image: '@images/554-Galar.png',
      },
      {
        name: 'Goomy',
        location: 'Route 212',
        image: '@images/704.png',
      },
      {
        name: 'Kecleon',
        location: 'Long Forest',
        image: '@images/352.png',
      },
      {
        name: 'Litleo',
        location: 'Sinnoh Grand Forest',
        image: '@images/667.png',
      },
      {
        name: 'Mawile',
        location: ' Nawile',
        image: '@images/303.png',
      },
      {
        name: 'Minun',
        location: 'Veilstone Wood',
        image: '@images/312.png',
      },
      {
        name: 'Oshawott',
        location: 'Majolica Lake',
        image: '@images/501.png',
      },
      {
        name: 'Pikipek',
        location: 'Sunnyshore Wood',
        image: '@images/731.png',
      },
      {
        name: 'Riolu',
        location: 'Iron Island',
        image: '@images/447.png',
      },
      {
        name: 'Rolycoly',
        location: 'Coal Valley',
        image: '@images/837.png',
      },
      {
        name: 'Sandile',
        location: 'Long Beach',
        image: '@images/551.png',
      },
      {
        name: 'Yamper',
        location: 'Valley Wind Works',
        image: '@images/835.png',
      },
      {
        name: 'Wooloo',
        location: 'Route 210',
        image: '@images/831.png',
      },
    ],
  },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectedEvent = ref<any>(null)
const currentPage = ref(1)
const itemsPerPage = 4 // Display 4 encounters per page

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleEventClick = (clickInfo: any) => {
  selectedEvent.value = clickInfo.event
  currentPage.value = 1 // Reset to first page when opening dialog
}

const closeEventDetails = () => {
  selectedEvent.value = null
}

// Compute paginated encounters
const paginatedEncounters = computed(() => {
  if (!selectedEvent.value?.extendedProps?.encounters) return []
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return selectedEvent.value.extendedProps.encounters.slice(start, end)
})

// Compute total pages for pagination
const totalPages = computed(() => {
  if (!selectedEvent.value?.extendedProps?.encounters) return 1
  return Math.ceil(selectedEvent.value.extendedProps.encounters.length / itemsPerPage)
})

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
  events: swarms,
  eventClick: handleEventClick,
  height: 'auto',
})

function getImageSrc(imagePath: string) {
  // If the path starts with '@images/', use import.meta.glob or a static import
  if (imagePath.startsWith('@images/')) {
    // Adjust this according to your alias configuration
    return new URL(`../../../assets/images/${imagePath.replace('@images/', '')}`, import.meta.url)
      .href
  }
  // Otherwise, treat as relative path
  return new URL(imagePath, import.meta.url).href
}
</script>

<template>
  <v-container class="pa-4">
    <v-row justify="center">
      <v-col cols="12" lg="10" xl="8">
        <v-card class="pa-4" elevation="2">
          <v-card-title class="text-h5 mb-4">Swarm Calendar</v-card-title>
          <div class="calendar-wrapper">
            <FullCalendar :options="calendarOptions" />
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Encounter List Dialog -->
    <v-dialog v-model="selectedEvent" max-width="800px" scrollable>
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
        <div class="dialog-overlay">
          <v-card-title class="d-flex justify-space-between align-center text-white">
            <span class="text-h6">{{ selectedEvent.title }} Encounters</span>
            <v-btn
              icon="mdi-close"
              variant="text"
              size="small"
              color="white"
              @click="closeEventDetails"
            />
          </v-card-title>

          <v-card-text class="dialog-content">
            <v-container>
              <v-row v-if="paginatedEncounters.length">
                <v-col
                  v-for="(encounter, index) in paginatedEncounters"
                  :key="index"
                  cols="12"
                  sm="6"
                  md="3"
                >
                  <v-card class="encounter-card" elevation="4" hover>
                    <v-img
                      :src="getImageSrc(encounter.image)"
                      alt="Encounter Image"
                      height="150"
                      contain
                      class="rounded-t"
                    />
                    <v-card-title class="text-center text-subtitle-1 font-weight-medium">
                      {{ encounter.name }}
                    </v-card-title>
                    <v-card-subtitle class="text-center">
                      {{ encounter.location }}
                      <v-tooltip
                        activator="parent"
                        location="bottom"
                        :text="encounter.tip || 'No additional location details available.'"
                      />
                    </v-card-subtitle>
                  </v-card>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col>
                  <v-alert type="info" text="No encounters available for this event." />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-pagination
              v-model="currentPage"
              :length="totalPages"
              :total-visible="5"
              color="white"
              rounded="circle"
              density="compact"
            />
          </v-card-actions>
          <v-card-actions>
            <v-spacer />
            <v-btn color="white" variant="outlined" @click="closeEventDetails">Close</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.calendar-wrapper {
  overflow-x: auto;
}

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
  padding: 0;
}

.encounter-card {
  background: rgba(255, 255, 255, 0.9);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.encounter-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
}

.v-theme--dark .encounter-card {
  background: rgba(0, 0, 0, 0.7);
}

.encounter-card .v-card-title,
.encounter-card .v-card-subtitle {
  color: #333 !important;
}

.v-theme--dark .encounter-card .v-card-title,
.v-theme--dark .encounter-card .v-card-subtitle {
  color: #fff !important;
}

.rounded-t {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.v-pagination .v-btn {
  color: white !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.calendar-wrapper :deep(.fc-toolbar) {
  flex-wrap: wrap;
  gap: 0.5rem;
}

.calendar-wrapper :deep(.fc-toolbar-chunk) {
  display: flex;
  align-items: center;
}

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
