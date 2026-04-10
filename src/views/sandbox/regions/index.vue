<script setup lang="ts">
// views/sandbox/setting/index.vue → /sandbox/setting
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'
import { useTheme } from 'vuetify'

const theme = useTheme() // still used by the Indigo composite block

// ── Region data ──────────────────────────────────────────────────────────────
// indigoMember: true  → rendered inside the Indigo composite block, not the grid
// All items carry a `to` so FeatureGrid renders them as RouterLink cards.

interface RegionItem extends FeatureItem {
  indigoMember?: boolean
}

const allRegions: RegionItem[] = [
  // Indigo members — handled separately
  {
    title: 'Kanto',
    description:
      'The industrial starting point. Known for rural charm and major urban hubs like Saffron City.',
    icon: 'mdi-map-marker-radius',
    to: '/sandbox/regions/indigo/kanto',
    indigoMember: true,
  },
  {
    title: 'Johto',
    description:
      'A land of tradition and ancient architecture, physically connected via the Mt. Silver range.',
    icon: 'mdi-temple-buddhist',
    to: '/sandbox/regions/indigo/johto',
    indigoMember: true,
  },
  // Main League regions
  {
    title: 'Hoenn',
    description: 'A tropical archipelago defined by the perpetual balance of land and sea.',
    icon: 'mdi-island',
    to: '/sandbox/regions/hoenn',
  },
  {
    title: 'Sinnoh',
    description: 'The cold, mountainous cradle of creation myths and high-altitude research.',
    icon: 'mdi-snowflake-melt',
    to: '/sandbox/regions/sinnoh',
  },
  {
    title: 'Unova',
    description:
      'A diverse region of towering cities and vast bridges, separate from the main landmass.',
    icon: 'mdi-city-variant',
    to: '/sandbox/regions/unova',
  },
  {
    title: 'Kalos',
    description: 'The star-shaped region famous for its beauty, fashion, and Mega Evolution roots.',
    icon: 'mdi-tower-fire',
    to: '/sandbox/regions/kalos',
  },
  {
    title: 'Alola',
    description:
      'An island paradise built on the Island Trial system rather than a traditional League.',
    icon: 'mdi-palm-tree',
    to: '/sandbox/regions/alola',
  },
  {
    title: 'Galar',
    description: 'An industrial powerhouse where Pokémon battles are the ultimate stadium sport.',
    icon: 'mdi-stadium-variant',
    to: '/sandbox/regions/galar',
  },
  {
    title: 'Paldea',
    description: 'A sprawling open-world region centered around its prestigious academies.',
    icon: 'mdi-school',
    to: '/sandbox/regions/paldea',
  },
]

const indigoMembers = allRegions.filter((r) => r.indigoMember)
const mainLeagueGrid = allRegions
  .filter((r) => !r.indigoMember)
  .map((r) => ({ ...r, color: 'green' as const }))

const secondaryRegions = [
  {
    title: 'Orre',
    icon: 'mdi-cactus',
    description: 'A harsh desert region once plagued by Shadow Pokémon.',
    to: '/sandbox/regions/orre',
  },
  {
    title: 'Fiore',
    icon: 'mdi-moped',
    description: 'A coastal region known for its Ranger presence.',
    to: '/sandbox/regions/fiore',
  },
  {
    title: 'Almia',
    icon: 'mdi-water-percent',
    description: 'Home of the Pokémon Ranger Union and its schools.',
    to: '/sandbox/regions/almia',
  },
  {
    title: 'Oblivia',
    icon: 'mdi-weather-lightning',
    description: 'A peaceful archipelago forgotten by most of the world.',
    to: '/sandbox/regions/oblivia',
  },
  {
    title: 'Ransei',
    icon: 'mdi-fencing',
    description: 'An ancient land defined by an ancient form of battle.',
    to: '/sandbox/regions/ransei',
  },
  {
    title: 'Orange Islands',
    icon: 'mdi-fruit-cherries',
    description: "Exotic isles scattered off Johto's southern coast.",
    to: '/sandbox/regions/orange',
  },
  {
    title: 'Decolore Islands',
    icon: 'mdi-island',
    description: 'Disparate islands bridging Kanto and Alola.',
    to: '/sandbox/regions/decolore',
  },
  {
    title: 'Ferrum',
    icon: 'mdi-set-center',
    description: 'A land of competitive battle synergies and Pokémon Super Moves.',
    to: '/sandbox/regions/ferrum',
  },
].map((r) => ({ ...r, color: 'green' as const }))

// Travel methods — shaped for FeatureGrid.
// Add a `to` field once dedicated travel method pages exist.
const travelMethods = [
  {
    icon: 'mdi-ferry',
    title: 'Cruise Lines',
    description: 'S.S. Anne, S.S. Tidal and regional services.',
    color: 'green' as const,
  },
  {
    icon: 'mdi-train',
    title: 'Cross-Regional Rail',
    description: 'Magnet Train, Kalos Rail & more.',
    color: 'green' as const,
  },
  {
    icon: 'mdi-airplane',
    title: 'Regional Airlines',
    description: 'Scheduled civilian aviation services.',
    color: 'green' as const,
  },
  {
    icon: 'mdi-bird',
    title: 'Flying Mount',
    description: 'Requires a valid Aviation Permit.',
    color: 'green' as const,
    to: '/sandbox/trainer-101/permits',
  },
  {
    icon: 'mdi-horse-variant',
    title: 'Ground Mount',
    description: 'Requires a valid Ground Mount Permit.',
    color: 'green' as const,
    to: '/sandbox/trainer-101/permits',
  },
  {
    icon: 'mdi-submarine',
    title: 'Dive Mount',
    description: 'Inter-island routes only.',
    color: 'green' as const,
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="World Regions"
      subtitle="From the forests of Kanto to the academies of Paldea — explore the Pokémon world."
      icon="mdi-earth"
      pattern="pokeball"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="green-darken-2" variant="flat" size="small">Core Regions</v-chip>
          <v-chip color="green-darken-2" variant="tonal" size="small">Secondary Regions</v-chip>
          <v-chip variant="outlined" size="small">Global Sandbox</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <!-- Major Leagues ───────────────────────────────────────────────────── -->
      <WikiCard title="The Major Leagues" icon="mdi-map-check" color="green">
        <!-- ── Indigo composite block ──────────────────────────────────── -->
        <div class="mb-8">
          <div class="text-overline text-medium-emphasis mb-3 d-flex align-center gap-2">
            <v-icon size="14" color="green-darken-2">mdi-link-variant</v-icon>
            Shared League Jurisdiction
          </div>

          <!-- Outer Indigo card -->
          <v-card
            variant="flat"
            rounded="lg"
            class="indigo-card overflow-hidden"
            :class="theme.current.value.dark ? 'indigo-card--dark' : 'indigo-card--light'"
          >
            <!-- Indigo header band -->
            <div class="indigo-header pa-5">
              <div class="d-flex align-center gap-3 mb-2">
                <v-icon size="28" color="white">mdi-shield-crown</v-icon>
                <h3 class="text-h5 font-weight-bold text-white">Indigo Region</h3>
                <v-chip color="white" variant="tonal" size="x-small" class="ml-auto">
                  Dual-Region Zone
                </v-chip>
              </div>
              <p class="text-body-2 indigo-header__desc mb-3">
                While geographically distinct, Kanto and Johto share the
                <strong class="text-white">Indigo Plateau League</strong> and the
                <strong class="text-white">Indigo Conference</strong> authority — forming a single
                administrative zone unique in the Pokémon world.
              </p>
              <v-btn
                to="/sandbox/regions/indigo"
                variant="outlined"
                size="x-small"
                color="white"
                prepend-icon="mdi-map-outline"
              >
                Indigo Region Details
              </v-btn>
            </div>

            <!-- Member regions -->
            <div class="indigo-members">
              <v-row no-gutters>
                <v-col
                  v-for="(region, i) in indigoMembers"
                  :key="region.title"
                  cols="12"
                  sm="6"
                  class="indigo-member"
                  :class="{ 'indigo-member--bordered': i < indigoMembers.length - 1 }"
                >
                  <RouterLink :to="region.to" class="indigo-member__link">
                    <div class="indigo-member__inner pa-5">
                      <div class="d-flex align-center gap-2 mb-2">
                        <v-icon
                          size="20"
                          :color="theme.current.value.dark ? 'green-accent-2' : 'green-darken-2'"
                        >
                          {{ region.icon }}
                        </v-icon>
                        <span class="text-subtitle-2 font-weight-bold">{{ region.title }}</span>
                        <v-icon size="14" class="ml-auto text-medium-emphasis indigo-member__arrow">
                          mdi-arrow-right
                        </v-icon>
                      </div>
                      <p class="text-caption text-medium-emphasis mb-0" style="line-height: 1.6">
                        {{ region.description }}
                      </p>
                    </div>
                  </RouterLink>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </div>

        <!-- Remaining main-league regions grid -->
        <FeatureGrid :items="mainLeagueGrid" :cols="3" default-color="green" />
      </WikiCard>

      <!-- External Territories ────────────────────────────────────────────── -->
      <WikiCard title="External Territories" icon="mdi-map-marker-plus" color="green">
        <p class="text-body-1 lh-lg mb-6">
          Beyond the main League circuits, several unique territories offer different cultural
          approaches to Pokémon partnership — most notably the regions served by the Ranger Union.
        </p>

        <FeatureGrid :items="secondaryRegions" :cols="4" default-color="green" />
      </WikiCard>

      <!-- Inter-Regional Travel ───────────────────────────────────────────── -->
      <WikiCard title="Inter-Regional Travel" icon="mdi-airplane-takeoff" color="green">
        <p class="text-body-1 lh-lg mb-6">
          Travel between regions is available through a variety of means. Most trainers rely on
          their Pokémon once they've obtained the relevant permit — but commercial options are
          available to everyone.
        </p>

        <FeatureGrid :items="travelMethods" :cols="3" default-color="green" compact class="mb-6" />

        <WikiCallout label="Permit Requirements" icon="mdi-credit-card-fast-outline" color="green">
          Flying and ground mount travel requires a valid permit issued by the
          <strong>Pokémon League Aviation Authority (PLAA)</strong> or
          <strong>Pokémon League Ground Authority (PLGA)</strong> respectively. Commercial transport
          has no permit requirements for passengers.
          <div class="mt-3">
            <v-btn
              to="/sandbox/trainer-101/permits"
              color="green-darken-2"
              variant="tonal"
              size="small"
              rounded="lg"
              prepend-icon="mdi-file-document-outline"
            >
              View Permit Requirements
            </v-btn>
          </div>
        </WikiCallout>
      </WikiCard>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

/* ── Indigo composite card ──────────────────────────────────────────────── */
.indigo-card {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
}

.indigo-card--light {
  background: #f8faf8;
}

.indigo-card--dark {
  background: rgba(255, 255, 255, 0.03);
}

/* Header band — always the deep green regardless of theme */
.indigo-header {
  background: linear-gradient(135deg, rgb(var(--v-theme-success), 0.9), #1b5e20);
  background-color: #2e7d32;
}

.indigo-header__desc {
  color: rgba(255, 255, 255, 0.8);
  max-width: 640px;
}

/* Member region rows */
.indigo-members {
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}

.indigo-member {
  transition: background 0.15s ease;
}

.indigo-member--bordered {
  border-right: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}

@media (max-width: 600px) {
  .indigo-member--bordered {
    border-right: none;
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  }
}

.indigo-member:hover {
  background: rgba(var(--v-theme-success), 0.06);
}

.indigo-member__link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.indigo-member__arrow {
  opacity: 0;
  transform: translateX(-4px);
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.indigo-member:hover .indigo-member__arrow {
  opacity: 1;
  transform: translateX(0);
}
</style>
