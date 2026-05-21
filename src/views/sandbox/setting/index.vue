<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'

// 1. Active Roleplay Sandbox Timeline Array (Custom Engineered Baseline)
const sandboxTimeline = [
  {
    era: 'Hisuian Era (Legends: Arceus)',
    marker: '~1868',
    gapText: 'Chronological Zero Frame',
    icon: 'mdi-history',
    color: 'teal-darken-2',
    description:
      "The foundational era of modern human-Pokémon relationships. Set in Sinnoh's distant past during the cultural shift corresponding to the Early Meiji period.",
  },
  {
    era: 'The Kanto & Hoenn Epoch (FRLG / ORAS)',
    marker: '2005',
    gapText: '137-Year Shift From PLA',
    icon: 'mdi-clock-check-outline',
    color: 'green-darken-1',
    description:
      'Simultaneous structural launch points. Contemporary Pokémon League operational grids kick off across the Kanto and Hoenn regions.',
  },
  {
    era: 'The Sinnoh & Johto Epoch (HGSS / Platinum)',
    marker: '2008',
    gapText: '3 Years From Gen 1/3',
    icon: 'mdi-clock-plus-outline',
    color: 'green-darken-3',
    description:
      'Parallel regional updates. Events unfold exactly three years following the original Kanto journey, anchored by synchronized Johto/Sinnoh developments.',
  },
  {
    era: 'Unova Crisis Phase I (Black & White)',
    marker: '2010',
    gapText: '2 Years From Gen 2/4',
    icon: 'mdi-shield-outline',
    color: 'light-blue-darken-2',
    description:
      'Unova regional progression tracking. Caitlin shows visible signs of aging since her assignment as a Sinnoh Battle Frontier Brain.',
  },
  {
    era: 'Unova Phase II & Kalos Core (B2W2 / XY)',
    marker: '2012',
    gapText: '2 Years From BW',
    icon: 'mdi-shield-star-outline',
    color: 'indigo-darken-2',
    description:
      'Simultaneous global timelines. Events occur exactly two years post-Black/White, tracking the regional stabilization of both Unova and Kalos.',
  },
  {
    era: 'Alola & Galar Horizon (USUM / SwSh)',
    marker: '2014',
    gapText: '2 Years From BW2/XY',
    icon: 'mdi-sword',
    color: 'purple-darken-2',
    description:
      'Macro-anomaly threshold. Type: Null research files are compromised, leading to synthetic replication pipelines throughout Galar.',
  },
  {
    era: 'The Paldea Expedition (Scarlet & Violet)',
    marker: '2016',
    gapText: '2 Years From SwSh',
    icon: 'mdi-crowd',
    color: 'deep-orange-darken-2',
    description:
      'Paldean records. Occurs prior to the publication of the definitive "Galar: A History" manuscript found in the academy library.',
  },
  {
    era: 'Lumiose Redevelopment (Legends: Z-A)',
    marker: '2017',
    gapText: '1 Year From SV',
    icon: 'mdi-hexagon-multiple-outline',
    color: 'cyan-darken-3',
    description:
      'Urban transformation protocols. Features direct structural links to former Galar champion data registers and Battle Tower logs.',
  },
  {
    era: 'Present Day (Active Sandbox Axis)',
    marker: '2022',
    gapText: '5 Years From Z-A',
    icon: 'mdi-calendar-star',
    color: 'amber-darken-4',
    description:
      'The absolute sandbox narrative anchor point. All current roleplay threads, character positions, and plots automatically sync here.',
  },
]

// 2. Official Lore Timeline Constraints Map (The Game-Informed Ledger)
const officialLoreData = [
  {
    era: 'Legends: Arceus',
    anchors: 'Sinnoh Past (~1868 Baseline)',
    deductions:
      'Spiritomb bound 500 years ago (DP/BDSP). Vessa states it was bound "hundreds of years ago" (implying ≥200y). Establishes PLA at most 300 years prior to Gen 4.',
  },
  {
    era: 'Gen 1 & Gen 3 Parallel',
    anchors: 'RGBY / FRLG == RSE / ORAS',
    deductions:
      'Explicitly contemporaneous. The narrative arcs of Kanto and Hoenn execute across a single shared chronological frame.',
  },
  {
    era: 'Gen 2 & Gen 4 Parallel',
    anchors: 'GSC / HGSS == DPPt / BDSP',
    deductions:
      'Occurs exactly 3 years after Gen 1/3. Confirmed via game manuals and dev logs, despite local dialogue variations from Jasmine & Cynthia.',
  },
  {
    era: 'Black & White',
    anchors: 'Post-Gen 2/4 Horizon',
    deductions:
      'Set years after Sinnoh/Johto. Proven by Caitlin visibly aging and direct references to the stolen Kanto Power Plant Machine Part.',
  },
  {
    era: 'Black 2/White 2 & Gen 6',
    anchors: 'B2W2 == XY Parallel',
    deductions:
      'Strictly locked exactly 2 years after the original Black & White campaign concludes.',
  },
  {
    era: 'Gen 7 Continuum',
    anchors: 'SM / USUM',
    deductions:
      "Set 2 years after B2W2/XY. Verified by Grimsley's aging profile art and visibly aged appearances of legacy trainers Red and Blue.",
  },
  {
    era: 'Gen 8 / Galar Horizon',
    anchors: 'Sword & Shield',
    deductions:
      'Vague but definitive post-Alola placement. Type: Null Pokedex records reference stolen research notes used to replicate additional models.',
  },
  {
    era: 'Gen 9 / Paldea Baseline',
    anchors: 'Scarlet & Violet',
    deductions:
      'Post-Sword & Shield placement. Verified by "Galar: A History" in the academy library and references to Leon as the former Galar Champion.',
  },
  {
    era: 'Legends: Z-A',
    anchors: 'Post-XY / Post-SwSh Intersection',
    deductions:
      'Locked 5 years after XY and 3 years after SM/USUM. Because Leon is a former champion and the Galar Battle Tower exists, SwSh fits within this 3-year gap.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0 sandbox-timeline-dashboard text-high-emphasis">
    <!-- Header Hero Banner Profile -->
    <WikiHero
      title="Setting & Timeline"
      subtitle="A unified Pokémon continuity structured on an explicit, gap-tracked chronological matrix."
      icon="mdi-timeline-clock"
      pattern="pokeball"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center align-center flex-wrap ga-3">
          <v-chip color="green-darken-2" variant="flat" size="small" class="font-mono"
            >CAMPAIGN NOW: 2022</v-chip
          >
          <v-chip color="green-darken-2" variant="flat" size="small" class="font-mono"
            >REMAKE ANCHORS</v-chip
          >
          <v-chip variant="outlined" size="small" class="font-mono text-medium-emphasis"
            >UNIFIED GEOGRAPHY</v-chip
          >
        </div>
      </template>
    </WikiHero>

    <!-- Main Content Container -->
    <v-container max-width="1200" class="py-10">
      <!-- Core Context Abstract Card -->
      <v-row class="ma-0 mb-8">
        <v-col cols="12" class="pa-0">
          <WikiCard title="World Setting" icon="mdi-earth-box" color="green">
            <p class="text-body-1 lh-lg mb-0">
              The Sandbox takes place 8 years after the events of SwSh
              <strong>(~5 years after ZA)</strong>. To minimize contradictions and confusion, we
              treat the main-series games as historical. Below you can compare the RP Timeline
              against the 'official' game timeline.
            </p>
          </WikiCard>
        </v-col>
      </v-row>

      <!-- SECTION 1: INTERACTIVE TIMELINE FEED -->
      <v-row class="ma-0 mb-12">
        <v-col cols="12" class="pa-0">
          <WikiCard title="Sandbox Timeline" icon="mdi-timeline-outline" color="green">
            <p class="text-body-1 lh-lg mb-8">
              The timeline of events as they occurred in the RP's history. Changed slightly to make
              the RP more convenient.
            </p>

            <!-- Interactive Vuetify Timeline -->
            <v-timeline
              side="end"
              align="start"
              line-color="grey-lighten-1"
              class="mb-6 custom-timeline-matrix"
            >
              <v-timeline-item
                v-for="item in sandboxTimeline"
                :key="item.era"
                :dot-color="item.color"
                :icon="item.icon"
                fill-dot
                size="large"
                class="mb-6"
              >
                <!-- Floating Inter-Game Delta Gap Badge (Dark Overlay, Colored Font) -->
                <template #opposite>
                  <v-chip
                    variant="flat"
                    label
                    class="dark-overlay-badge font-mono font-weight-black text-caption mt-1 text-uppercase tracking-wide"
                    :style="`color: rgb(var(--v-theme-${item.color})) !important;`"
                  >
                    {{ item.gapText }}
                  </v-chip>
                </template>

                <!-- Era Details Card Block (Transparent Background, Heavy Contrast Border) -->
                <v-card
                  variant="outlined"
                  class="border-tactical-heavy bg-transparent rounded-xl pa-4"
                >
                  <div class="d-flex justify-space-between align-start flex-wrap ga-2 mb-2">
                    <h3 class="text-subtitle-1 font-weight-bold tracking-tight text-high-emphasis">
                      {{ item.era }}
                    </h3>

                    <!-- Marker Tag (Dark Overlay, Colored Font) -->
                    <v-chip
                      variant="flat"
                      size="small"
                      class="dark-overlay-badge font-mono font-weight-black"
                      :style="`color: rgb(var(--v-theme-${item.color})) !important;`"
                    >
                      {{ item.marker }}
                    </v-chip>
                  </div>
                  <p class="text-body-2 text-medium-emphasis mb-0 lh-md">
                    {{ item.description }}
                  </p>
                </v-card>
              </v-timeline-item>
            </v-timeline>

            <WikiCallout label="Timeline Note" icon="mdi-information-outline" color="green">
              We defer to modernized remakes (FRLG, HGSS, ORAS) instead of initial base releases as
              they tend to better serve our timeline.
            </WikiCallout>
          </WikiCard>
        </v-col>
      </v-row>

      <!-- SECTION 2: CANON METROLOGY LEDGER -->
      <v-row class="ma-0 mb-12">
        <v-col cols="12" class="pa-0">
          <WikiCard title="Canon Timeline" icon="mdi-book-search-outline" color="blue">
            <p class="text-body-2 lh-lg text-medium-emphasis mb-6">
              Best 'official' timeline drawn from in-game data, Pokedex entries, and developer
              comments. The timeline is fan-created but it's the most accurate one we've got.
            </p>

            <!-- Detailed Lore Manifest Matrix (Transparent Base, Sharp Border) -->
            <div
              class="lore-matrix border-tactical-heavy rounded-xl overflow-hidden bg-transparent"
            >
              <div
                v-for="record in officialLoreData"
                :key="record.era"
                class="lore-row border-bottom pa-5 bg-transparent"
              >
                <v-row class="ma-0 align-start ga-y-2">
                  <v-col cols="12" md="3" class="pa-0">
                    <div
                      class="font-mono text-caption font-weight-black text-blue-darken-2 text-uppercase mb-1"
                    >
                      // ERA TARGET NODE
                    </div>
                    <h4 class="text-subtitle-1 font-weight-bold text-high-emphasis tracking-tight">
                      {{ record.era }}
                    </h4>
                  </v-col>

                  <v-col cols="12" md="3" class="pa-0">
                    <div
                      class="font-mono text-caption font-weight-black text-disabled text-uppercase mb-1"
                    >
                      SYNCHRONIZATION PROFILE
                    </div>
                    <span class="font-mono text-caption text-medium-emphasis font-weight-bold">
                      {{ record.anchors }}
                    </span>
                  </v-col>

                  <v-col cols="12" md="6" class="pa-0">
                    <div
                      class="font-mono text-caption font-weight-black text-disabled text-uppercase mb-1"
                    >
                      CANONICAL EVIDENCE & DEDUCTIVE LOGIC
                    </div>
                    <p class="text-body-2 text-medium-emphasis font-mono-body mb-0">
                      {{ record.deductions }}
                    </p>
                  </v-col>
                </v-row>
              </div>
            </div>

            <!-- Deep-Dive Meta Callout Box -->
            <div
              class="border rounded-xl pa-5 mt-6 bg-blue-lighten-5 border-blue text-blue-darken-4"
            >
              <div
                class="d-flex align-center flex-wrap ga-2 text-caption font-mono-body text-blue-darken-3"
              >
                <strong>Further Details:</strong>
                <span
                  >For a complete canonical breakdown, visit the official community
                  documentation:</span
                >
                <v-btn
                  href="https://bulbapedia.bulbagarden.net/wiki/History_of_the_Pok%C3%A9mon_world"
                  target="_blank"
                  prepend-icon="mdi-link"
                  variant="outlined"
                  size="small"
                  color="blue-darken-3"
                  class="text-none font-mono ml-1"
                >
                  Bulbapedia History
                </v-btn>
              </div>
            </div>
          </WikiCard>
        </v-col>
      </v-row>

      <!-- SECTION 3: INTEGRATED SIDE-SERIES COMPENDIUM -->
      <v-row class="ma-0 mb-6">
        <v-col cols="12" class="pa-0">
          <WikiCard title="Side Series" icon="mdi-puzzle-outline" color="blue">
            <p class="text-body-1 lh-lg mb-6">
              While the official placement of spin-offs is speculative, we've mapped the major ones
              alongside the main-series events:
            </p>

            <v-row class="ma-0 ga-y-6">
              <!-- Colosseum & Ranger Grid -->
              <v-col cols="12" md="6" class="pa-0 pr-md-3">
                <div class="border-tactical-heavy rounded-xl pa-5 h-100 bg-transparent">
                  <div class="d-flex align-center ga-2 mb-3">
                    <v-icon color="purple-lighten-1">mdi-shield-car</v-icon>
                    <h4
                      class="text-subtitle-1 font-weight-bold text-high-emphasis font-mono text-uppercase"
                    >
                      Orre & Ranger
                    </h4>
                  </div>
                  <div class="text-body-2 lh-lg text-medium-emphasis">
                    <p class="mb-3">
                      <strong>Pokémon Colosseum</strong> executes concurrently alongside the
                      <strong>Gen 1 / Gen 3</strong> historical layer. <br /><br />
                      <strong>XD: Gale of Darkness</strong> follows precisely
                      <strong>5 years later</strong>, keeping Orre completely isolated from Gen 4
                      and Gen 5 structural interactions.
                    </p>
                    <p class="mb-0">
                      The original <strong>Pokémon Ranger</strong> executes during
                      <strong>Gen 1 / Gen 3</strong>. Its sequels,
                      <strong>Shadows of Almia</strong> and <strong>Guardian Signs</strong>, run
                      simultaneously alongside <strong>Gen 2 / Gen 4</strong>.
                    </p>
                  </div>
                </div>
              </v-col>

              <!-- Snap, Pokken & Conquest Grid -->
              <v-col cols="12" md="6" class="pa-0 pl-md-3">
                <div class="border-tactical-heavy rounded-xl pa-5 h-100 bg-transparent">
                  <div class="d-flex align-center ga-2 mb-3">
                    <v-icon color="purple-lighten-1">mdi-camera-iris</v-icon>
                    <h4
                      class="text-subtitle-1 font-weight-bold text-high-emphasis font-mono text-uppercase"
                    >
                      Snap, Pokkén & Ransei
                    </h4>
                  </div>
                  <div class="text-body-2 lh-lg text-medium-emphasis">
                    <p class="mb-3">
                      The classic <strong>Pokémon Snap</strong> maps to <strong>Gen 1</strong>,
                      <strong>New Pokémon Snap</strong> operates during Gen 8, and the
                      <strong>Pokkén Tournament</strong> circuit slots neatly within the gap
                      separating <strong>Gen 6 and Gen 7</strong>*.
                    </p>
                    <p class="mb-0">
                      <strong>Pokémon Conquest</strong> historical profiles are real.
                      Chronologically rooted around feudal Japan (~1570), the **Ransei Region**
                      functions as an active, highly restricted **spatial-temporal anomaly**
                      monitored under total Interpol secrecy.
                    </p>
                  </div>
                </div>
              </v-col>
            </v-row>
          </WikiCard>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<style scoped>
/* --- Precision Custom Typography & Spacing Foundations --- */
.font-mono {
  font-family: 'Fira Code', 'Courier New', Courier, monospace !important;
}

.font-mono-body {
  font-family: 'Fira Code', 'Courier New', Courier, monospace !important;
  line-height: 1.5;
  letter-spacing: -0.01em;
}

.lh-lg {
  line-height: 1.8 !important;
}

.lh-md {
  line-height: 1.5 !important;
}

.ga-y-2 {
  row-gap: 8px !important;
}

.ga-y-6 {
  row-gap: 24px !important;
}

/* --- Sharp Border Contrast System --- */
.border-tactical-heavy {
  border: 2px solid rgb(var(--v-border-color)) !important;
}

.border-dashed {
  border-style: dashed !important;
}

.border-bottom {
  border-bottom: 2px solid rgb(var(--v-border-color)) !important;
}

.border-blue {
  border: 1px solid rgba(var(--v-theme-blue-darken-2), 0.25) !important;
}

/* --- Dark Overlay Component Badges --- */
.dark-overlay-badge {
  background-color: rgba(30, 30, 35, 0.92) !important;
  border: 1px solid rgba(var(--v-border-color), 0.6) !important;
}

/* --- Vuetify Timeline Responsive Layout Overrides --- */
@media (max-width: 959px) {
  .custom-timeline-matrix :deep(.v-timeline-item__opposite) {
    display: block !important;
    margin-bottom: 6px;
    text-align: left !important;
  }
}
</style>
