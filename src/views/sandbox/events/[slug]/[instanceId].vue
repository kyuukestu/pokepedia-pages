<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { eventInstances, eventDefinitions } from '@/data/event-list'
import { getImageUrl } from '@/utils/path-resolvers'

const route = useRoute('/sandbox/events/[slug]/[instanceId]')
const { slug, instanceId } = route.params

const activeMedia = ref<{ url: string; caption: string } | null>(null)
const mediaDialog = ref(false)

function openMedia(media: { url: string; caption: string }) {
  // Resolve the URL here so the dialog receives the valid path
  activeMedia.value = {
    url: getImageUrl(media.url),
    caption: media.caption,
  }
  mediaDialog.value = true
}

const instance = computed(() =>
  eventInstances.find((i) => i.instanceId === instanceId && i.eventSlug === slug),
)
const definition = computed(() => eventDefinitions.find((d) => d.slug === slug))

// Fallback logic for formatting dates
function formatDate(dateString?: string) {
  if (!dateString) return 'TBD / ARCHIVE PENDING'
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(dateString))
}

const statusColor = computed(() => {
  const colors = {
    upcoming: 'success',
    ongoing: 'primary',
    completed: 'grey',
    postponed: 'error',
  }
  return colors[instance.value?.status || 'upcoming']
})

const sortedCompetitions = computed(() => {
  const comps = instance.value?.competitions || []
  return comps.map((comp) => ({
    ...comp,
    standings: comp.standings ? [...comp.standings].sort((a, b) => a.rank - b.rank) : [],
  }))
})

function getRankColor(rank: number) {
  if (rank === 1) return 'amber-lighten-4'
  if (rank === 2) return 'grey-lighten-3'
  if (rank === 3) return 'orange-lighten-4'
  return 'transparent'
}
</script>

<template>
  <v-container v-if="instance && definition" max-width="1440" class="py-10 px-6">
    <header class="mb-10">
      <div class="d-flex align-center ga-3 mb-4">
        <v-chip
          :color="statusColor"
          size="x-small"
          variant="flat"
          label
          class="font-weight-black text-uppercase"
        >
          {{ instance.status || 'DRAFT' }}
        </v-chip>
        <span class="text-overline text-medium-emphasis">
          {{ definition.category || 'GENERAL' }} // {{ instance.instanceId }}
        </span>
      </div>
      <h1 class="text-h2 font-weight-black text-uppercase mb-2 tracking-tighter">
        {{ instance.location || 'Undisclosed Location' }}
      </h1>
      <p class="text-h6 text-grey font-weight-regular">{{ definition.title }}</p>
    </header>

    <v-row class="ga-0">
      <v-col cols="12" md="8" class="pe-md-10">
        <!-- NARRATIVE ARCHIVE -->
        <section class="mb-16">
          <div class="grid-section-header">Narrative Archive</div>
          <div class="border-s-xl border-primary ps-6 py-2">
            <h2 class="text-h5 font-weight-bold mb-4" style="line-height: 1.4">
              {{ instance.narrative?.tldr || 'Summary for this entry is currently unavailable.' }}
            </h2>
            <p class="text-body-1 text-medium-emphasis leading-relaxed">
              {{
                instance.narrative?.recap || 'Field reports are being compiled. Check back later!'
              }}
            </p>
          </div>
        </section>

        <!-- EVENT SCHEDULE -->
        <section class="mb-16">
          <div class="grid-section-header">Event Schedule</div>
          <v-card
            variant="outlined"
            class="rounded-0 overflow-hidden"
            style="border-color: rgba(var(--v-border-color), var(--v-border-opacity)) !important"
            v-if="instance.schedule?.length"
          >
            <v-row
              v-for="(item, i) in instance.schedule"
              :key="i"
              no-gutters
              class="border-b last-no-border hover-row align-stretch"
            >
              <!-- THEME-ADAPTIVE DATE BLOCK -->
              <v-col cols="4" sm="2" class="d-flex flex-column border-e">
                <!-- Header: Displays the full Date/Range -->
                <div
                  class="bg-primary text-white text-center py-1 text-caption font-weight-black text-uppercase px-1"
                  style="font-size: 0.65rem !important; line-height: 1.2"
                >
                  {{ item.date || 'DATE TBD' }}
                </div>

                <!-- Body: Displays the Time with Theme-Adaptive Shading -->
                <div
                  class="bg-on-surface-variant grow d-flex flex-column align-center justify-center py-3"
                >
                  <v-icon size="16" class="mb-1 opacity-60">mdi-clock-outline</v-icon>
                  <div class="mono-font text-caption font-weight-black">
                    {{ item.time || '00:00' }}
                  </div>
                </div>
              </v-col>

              <!-- ACTIVITY DETAILS -->
              <v-col cols="8" sm="10" class="pa-4 d-flex flex-column justify-center">
                <div class="text-subtitle-2 font-weight-black text-uppercase leading-tight">
                  {{ item.activity }}
                </div>
                <div class="d-flex align-center ga-1 mt-1 opacity-70">
                  <v-icon size="14">mdi-map-marker-outline</v-icon>
                  <span class="text-caption font-weight-medium">{{
                    item.location || 'On-site'
                  }}</span>
                </div>
              </v-col>
            </v-row>
          </v-card>

          <!-- EMPTY STATE (Adaptive) -->
          <div v-else class="pa-12 border rounded-0 text-center bg-on-variant opacity-80">
            <v-icon size="40" class="mb-4 text-primary">mdi-calendar-blank-outline</v-icon>
            <div class="text-overline font-weight-black">No Chronological Data</div>
            <div class="text-caption mt-1">
              Timeline entries for this instance have not been logged.
            </div>
          </div>
        </section>

        <!-- COMPETITIVE ARCHIVE SECTION -->
        <section class="mb-16" v-if="sortedCompetitions.length">
          <div class="grid-section-header">Competitive Archive</div>
          <v-expansion-panels variant="accordion" class="custom-panels">
            <v-expansion-panel
              v-for="(comp, idx) in sortedCompetitions"
              :key="idx"
              class="border rounded-0 mb-2 overflow-hidden"
            >
              <!-- FIXED: Removed nested title tags -->
              <v-expansion-panel-title class="bg-grey-lighten-4 pa-0 overflow-hidden">
                <template v-slot:default="{ expanded }">
                  <div class="d-flex align-center w-100">
                    <!-- SLEEKER VERTICAL TYPE LABEL -->
                    <div
                      class="vertical-label bg-grey-darken-3 text-white text-overline font-weight-black d-flex align-center justify-center"
                    >
                      {{ comp.type }}
                    </div>

                    <v-row no-gutters class="align-center px-5 py-3">
                      <!-- CENTERED NAME & REGISTRY -->
                      <v-col cols="12" :sm="expanded ? 12 : 7" class="text-center text-sm-start">
                        <div
                          class="text-subtitle-1 font-weight-black text-uppercase letter-spacing-1 leading-tight"
                        >
                          {{ comp.name || 'UNNAMED TOURNAMENT' }}
                        </div>
                        <div class="d-flex align-center justify-center justify-sm-start ga-2 mt-1">
                          <v-chip
                            size="x-small"
                            variant="flat"
                            class="font-weight-bold mono-font px-2"
                            color="primary"
                            label
                          >
                            ROSTER: {{ comp.standings?.length || 0 }}
                          </v-chip>
                        </div>
                      </v-col>

                      <!-- REFINED WINNER DISPLAY (No Box) -->
                      <v-col
                        v-if="!expanded && comp.standings?.[0]"
                        cols="12"
                        sm="5"
                        class="text-center text-sm-right mt-3 mt-sm-0"
                      >
                        <div class="d-inline-flex align-center ga-2">
                          <div class="text-right">
                            <div
                              class="text-uppercase text-grey-darken-1 font-weight-black mb-n1"
                              style="font-size: 0.65rem; letter-spacing: 0.5px"
                            >
                              Tournament Winner
                            </div>
                            <div class="text-body-2 font-weight-black text-uppercase text-primary">
                              {{ comp.standings[0].participantId.join(' / ').toUpperCase() }}
                            </div>
                          </div>
                          <v-icon size="20" color="amber-darken-1">mdi-trophy-variant</v-icon>
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                </template>
              </v-expansion-panel-title>

              <v-expansion-panel-text class="pa-0">
                <!-- TABLE REMAINS THE SAME -->
                <v-table density="comfortable" class="standings-table border-t">
                  <thead>
                    <tr class="bg-white">
                      <th class="text-center font-weight-black" style="width: 80px">POS</th>
                      <th class="font-weight-black">PARTICIPANT / TEAM</th>
                      <th class="text-right font-weight-black">RESULT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="entry in comp.standings" :key="entry.participantId.toString()">
                      <td
                        class="text-center font-weight-black border-e"
                        :class="`bg-${getRankColor(entry.rank)}`"
                      >
                        {{ entry.rank }}
                      </td>
                      <td class="mono-font text-body-2 py-4">
                        {{ entry.participantId.join(' / ').toUpperCase() }}
                        <div
                          v-if="entry.notes"
                          class="text-disabled italic"
                          style="font-size: 0.7rem"
                        >
                          {{ entry.notes }}
                        </div>
                      </td>
                      <td class="text-right font-weight-bold text-primary">
                        {{ entry.score || '---' }}
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </section>

        <!-- MEDIA RECON SECTION -->
        <section class="mb-16">
          <div class="grid-section-header">Media Reconnaissance</div>
          <v-row v-if="instance.gallery?.length">
            <v-col v-for="(media, i) in instance.gallery" :key="i" cols="12" sm="6" class="pa-2">
              <v-card
                variant="outlined"
                class="rounded-0 overflow-hidden media-card"
                @click="openMedia({ url: media.url ?? 'none', caption: media.caption ?? 'none' })"
              >
                <v-img
                  :src="getImageUrl(media.url)"
                  height="200"
                  cover
                  class="grayscale cursor-pointer"
                >
                  <div class="d-flex align-center justify-center fill-height media-hover-overlay">
                    <v-icon color="white" size="32">mdi-magnify-plus-outline</v-icon>
                  </div>
                </v-img>
                <div
                  class="pa-3 text-caption font-weight-bold d-flex justify-space-between align-center"
                >
                  <span>{{ media.caption }}</span>
                  <v-icon size="14" color="grey">mdi-unfold-more-horizontal</v-icon>
                </div>
              </v-card>
            </v-col>
          </v-row>

          <!-- DIALOG (Uses the already-resolved activeMedia.url) -->
          <v-dialog v-model="mediaDialog" max-width="1200" transition="fade-transition">
            <v-card v-if="activeMedia" class="rounded-0 border-thin" theme="dark">
              <v-toolbar color="transparent" density="compact">
                <v-spacer />
                <v-btn icon="mdi-close" variant="text" @click="mediaDialog = false" />
              </v-toolbar>

              <!-- The URL here is already resolved by openMedia -->
              <v-img :src="activeMedia.url" max-height="80vh" class="bg-black" />

              <v-card-text class="pa-6 bg-grey-darken-4">
                <div class="text-overline text-primary mb-1">Intelligence Asset // Recon File</div>
                <div class="text-h6 font-weight-black text-uppercase">
                  {{ activeMedia.caption }}
                </div>
              </v-card-text>
            </v-card>
          </v-dialog>
        </section>
      </v-col>

      <!-- SIDEBAR -->
      <v-col cols="12" md="4">
        <aside class="sticky-sidebar">
          <v-card variant="outlined" class="rounded-0 mb-8 overflow-hidden">
            <v-img :src="instance.image || definition.image" height="300" cover />
            <div class="pa-4 bg-grey-lighten-4 border-t">
              <div class="text-overline text-grey leading-tight mb-1">Host Entity</div>
              <div class="text-subtitle-1 font-weight-black mono-font text-uppercase">
                {{ instance.hostId || 'Pokemon League' }}
              </div>
            </div>
          </v-card>

          <!-- PARAMETERS -->
          <v-card variant="outlined" class="rounded-0 pa-6 mb-8">
            <div class="text-overline font-weight-black text-primary mb-4">Instance Parameters</div>
            <div class="mb-4">
              <div class="text-caption text-grey">Weather</div>
              <div class="text-body-2 font-weight-bold">
                {{ instance.weatherCondition || 'Clear' }}
              </div>
            </div>
            <div class="mb-4">
              <div class="text-caption text-grey">Time Signature</div>
              <div class="text-body-2 font-weight-bold">{{ formatDate(instance.start) }}</div>
            </div>
            <div>
              <div class="text-caption text-grey">Requirements</div>
              <div class="text-body-2 font-weight-bold">
                {{
                  instance.requirements?.levelRange
                    ? `LV ${instance.requirements.levelRange[0]}-${instance.requirements.levelRange[1]}`
                    : 'None'
                }}
              </div>
            </div>
          </v-card>

          <!-- PERSONNEL LIST (UPDATED FOR READABILITY) -->
          <div class="mb-8">
            <div class="d-flex align-center justify-space-between mb-4">
              <div class="grid-section-header mb-0 w-100">Roster</div>
              <div class="text-caption mono-font ms-2">
                [{{ instance.participants?.length || 0 }}]
              </div>
            </div>
            <div class="d-flex flex-column ga-2 mt-4">
              <template v-if="instance.participants?.length">
                <div
                  v-for="p in instance.participants"
                  :key="p.charId"
                  class="personnel-row border-s-lg border-primary bg-grey-darken-4 text-white pa-2 px-4 d-flex justify-space-between align-center"
                >
                  <span class="mono-font text-caption font-weight-black text-uppercase">{{
                    p.name || p.charId
                  }}</span>
                  <v-icon size="12" color="primary">mdi-chevron-right</v-icon>
                </div>
              </template>
              <span v-else class="text-caption italic text-grey">No data signatures detected.</span>
            </div>
          </div>

          <!-- ACQUISITIONS -->
          <div v-if="instance.rewards?.length">
            <div class="grid-section-header">Acquisitions</div>
            <div
              v-for="(reward, i) in instance.rewards"
              :key="i"
              class="pa-3 border border-dashed mb-2 d-flex justify-space-between align-center"
            >
              <span class="text-caption font-weight-black text-uppercase">{{ reward.name }}</span>
              <v-icon size="16" color="primary">mdi-package-variant-closed</v-icon>
            </div>
          </div>
        </aside>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.sticky-sidebar {
  position: sticky;
  top: 40px;
}

.grid-section-header {
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  color: rgb(var(--v-theme-primary));
}

.grid-section-header::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin-left: 1rem;
}

/* Personnel Roster Styling */
.personnel-row {
  transition: all 0.2s ease;
  cursor: default;
}
.personnel-row:hover {
  background-color: #000 !important;
  padding-left: 1.5rem !important;
}

/* Custom Expansion Panel Styling */
.custom-panels :deep(.v-expansion-panel-text__wrapper) {
  padding: 0 !important;
}

.standings-table :deep(th) {
  font-size: 0.7rem !important;
  font-weight: 900 !important;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.dummy-image-box {
  height: 160px;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  color: #bbb;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  letter-spacing: 2px;
}

.mono-font {
  font-family: 'JetBrains Mono', 'Roboto Mono', monospace;
}

.tracking-tighter {
  letter-spacing: -2px;
}

.leading-relaxed {
  line-height: 1.8;
}

.grayscale {
  filter: grayscale(100%);
  opacity: 0.8;
  transition: 0.3s ease;
}

.grayscale:hover {
  filter: grayscale(0%);
  opacity: 1;
}

.hover-row:hover {
  background-color: rgba(var(--v-theme-primary), 0.02);
}

.last-no-border:last-child {
  border-bottom: none !important;
}

.border-dashed {
  border-style: dashed !important;
}

.border-e {
  border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity)) !important;
}

.border-b {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity)) !important;
}

.vertical-label {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  width: 32px; /* Slimmed down */
  align-self: stretch; /* Correct way to fill height in flex without issues */
  white-space: nowrap;
  letter-spacing: 1.5px;
  font-size: 0.6rem !important;
  flex-shrink: 0;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.letter-spacing-1 {
  letter-spacing: 1px;
}

/* Custom Expansion Panel Styling Updates */
.custom-panels :deep(.v-expansion-panel-title) {
  padding-left: 0 !important;
  min-height: 72px !important; /* Fixed base height */
}

.custom-panels :deep(.v-expansion-panel-title__overlay) {
  display: none; /* Cleaner look on hover */
}

.standings-table :deep(td) {
  height: 52px !important;
}

/* Removes the default low-opacity of Vuetify borders for a sharper "Dossier" look */
.border-opacity-100 {
  border-color: rgba(0, 0, 0, 0.12) !important;
  opacity: 1 !important;
}

/* Ensures the date block and activity description share the same height */
.align-stretch {
  align-items: stretch;
}

/* Removes the last border in the list */
.last-no-border:last-child {
  border-bottom: none !important;
}

/* Subtle leading for the activity text */
.leading-tight {
  line-height: 1.2;
}

.hover-row {
  transition: background-color 0.2s ease;
}

.hover-row:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
}
</style>
