<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import type { NavItem, RPNews } from '@/types/wiki'
import { computed } from 'vue'
import KENN from '@/components/wiki/KENN.vue'

// 1. Dynamic Directory Scanning
// This glob finds all index.vue files in sibling directories
const siblingModules = import.meta.glob('./*/index.vue')

// 2. Configuration Mapping
// Map folder names to their visual metadata
const directoryConfig: Record<string, { title: string; icon: string; color: string }> = {
  kanto: {
    title: 'Kanto Region',
    icon: 'mdi-map-legend',
    color: 'red-darken-2',
  },
  johto: {
    title: 'Johto Region',
    icon: 'mdi-map-marker-distance',
    color: 'blue-darken-2',
  },
  league: {
    title: 'Indigo League',
    icon: 'mdi-shield-crown-outline',
    color: 'amber-darken-3',
  },
}

// 3. Computed Navigation Links
const navigationLinks = computed<NavItem[]>(() => {
  return Object.keys(siblingModules)
    .map((path) => {
      // Extract the folder name from the path (e.g., "./kanto/index.vue" -> "kanto")
      const folderName = path.split('/')[1]
      const config = directoryConfig[folderName]

      if (!config) return null

      return {
        title: config.title,
        icon: config.icon,
        color: config.color,
        // Build the route relative to the current location
        to: `/sandbox/regions/indigo/${folderName}`,
      } as NavItem
    })
    .filter((link): link is NavItem => link !== null)
})

const indigoNews: RPNews[] = [
  {
    title: 'Mt. Silver Instability',
    icon: 'mdi-slope-downhill',
    text: 'Seismic activity reported near the summit. Access restricted to Master-rank trainers. Special permits required for research teams.',
  },
  {
    title: 'Rocket Remnants?',
    icon: 'mdi-radio-tower',
    text: 'Unexplained radio signals detected near Mahogany Town. Global Police are investigating potential black-market frequency hijacks.',
  },
  {
    title: '16-Badge Gala',
    icon: 'mdi-glass-cocktail',
    text: 'Preparations for the annual Federation ball at the Plateau have begun. Expect high-profile arrivals from the Sinnoh and Hoenn regions.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Indigo Federation"
      subtitle="The unified heart of Kanto and Johto."
      icon="mdi-hands-pray"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center gap-2">
          <v-chip color="error" variant="flat" size="small">Kanto</v-chip>
          <v-chip color="info" variant="flat" size="small">Johto</v-chip>
          <v-chip color="amber-darken-3" variant="elevated" size="small" prepend-icon="mdi-medal">
            16 Badges
          </v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200" class="py-8">
      <v-row>
        <v-col cols="12" md="8">
          <KENN :news="indigoNews" color="blue" />

          <WikiCard title="Regional Characteristics" icon="mdi-terrain" class="mb-6">
            <p class="text-body-1 mb-4">
              The Federation is a land of sharp contrasts, defined by Kanto's sprawling industrial
              metropolises and Johto's deep-rooted spiritual traditions. The geography is bridged by
              the <strong>Mt. Silver</strong> range, a massive natural wall.
            </p>
            <div class="d-flex gap-4 flex-wrap">
              <v-chip size="small" variant="tonal" prepend-icon="mdi-bird"
                >Lugia & Ho-Oh Mythos</v-chip
              >
              <v-chip size="small" variant="tonal" prepend-icon="mdi-molecule"
                >Cinnabar Volcanics</v-chip
              >
              <v-chip size="small" variant="tonal" prepend-icon="mdi-pine-tree"
                >Ilex Spirits</v-chip
              >
            </div>
          </WikiCard>

          <div class="text-h6 mb-4 px-2">Federation Directory</div>
          <v-row class="mb-6">
            <v-col v-for="link in navigationLinks" :key="link.title" cols="12" sm="4">
              <v-card
                :to="link.to"
                border
                flat
                rounded="lg"
                class="pa-4 text-center nav-card h-100"
              >
                <v-icon :icon="link.icon" :color="link.color" size="32" class="mb-2" />
                <div class="text-subtitle-2 font-weight-bold">{{ link.title }}</div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="4">
          <WikiCard title="Region Snapshot" icon="mdi-card-account-details-outline" color="blue">
            <div class="snapshot-stats mb-4">
              <div class="stat-item mb-2">
                <span class="text-caption text-uppercase font-weight-bold opacity-60">Capital</span>
                <div class="text-subtitle-1 font-weight-black">Indigo Plateau</div>
              </div>

              <div class="stat-item">
                <span class="text-caption text-uppercase font-weight-bold opacity-60"
                  >Champion</span
                >
                <div class="text-subtitle-1 font-weight-black">Lance</div>
              </div>
            </div>

            <v-divider class="mb-4" />

            <div class="text-overline mb-1">Lore Summary</div>
            <p class="text-caption text-medium-emphasis lh-md">
              Born from the ashes of the Kan-Joh War, the Indigo Federation has withstood much since
              its inception. Most notable is the persistent plague of Team Rocket, which ravaged the
              region for several years until their demise at the hands of several prodigious youth.
            </p>
          </WikiCard>

          <WikiCard title="Real-World Basis" icon="mdi-earth" class="mt-6" color="green">
            <p class="text-caption mb-3">
              Modeled after the <strong>Kantō</strong> and <strong>Chūbu/Kansai</strong> regions of
              Japan.
            </p>
            <v-btn
              href="https://bulbapedia.bulbagarden.net/wiki/Pokémon_world_in_relation_to_the_real_world#Kanto"
              target="_blank"
              variant="tonal"
              block
              size="small"
              append-icon="mdi-open-in-new"
              color="green-darken-2"
            >
              Learn More
            </v-btn>
          </WikiCard>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<style scoped>
.nav-card {
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.nav-card:hover {
  background: rgba(var(--v-theme-primary), 0.05);
  border-color: rgb(var(--v-theme-primary)) !important;
  transform: translateY(-4px);
}

.letter-spacing-1 {
  letter-spacing: 1px;
}

.lh-md {
  line-height: 1.5;
}

.gap-2 {
  gap: 8px;
}
.gap-4 {
  gap: 16px;
}
</style>
