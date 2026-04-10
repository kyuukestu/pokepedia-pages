<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import type { NavItem, RPNews } from '@/types/wiki'
import { computed } from 'vue'
import KENN from '@/components/wiki/KENN.vue'

// 1. Dynamic Directory Scanning
const siblingModules = import.meta.glob('./*/index.vue', { eager: true })

console.log('Johto Siblings:', siblingModules)

// 2. Configuration Mapping (Johto Context)
const directoryConfig: Record<string, { title: string; icon: string; color: string }> = {
  events: {
    title: 'Events',
    icon: 'mdi-calendar',
    color: 'blue-darken-2',
  },
  league: {
    title: 'Silver Conference',
    icon: 'mdi-pokeball',
    color: 'amber-darken-3',
  },
  settlements: {
    title: 'Settlements',
    icon: 'mdi-map-marker-path',
    color: 'teal-darken-1',
  },
}

// 3. Computed Navigation Links
const navigationLinks = computed<NavItem[]>(() => {
  return Object.keys(siblingModules)
    .map((path) => {
      // Logic: './gyms/index.vue' -> split by '/' -> ['.', 'gyms', 'index.vue']
      // We grab index [1]
      const parts = path.split('/')
      const folderName = parts[parts.length - 2] // More robust way to get folder name

      const config = directoryConfig[folderName]

      if (!config) {
        console.warn(`Folder "${folderName}" found but no config defined in directoryConfig.`)
        return null
      }

      return {
        title: config.title,
        icon: config.icon,
        color: config.color,
        to: `/sandbox/regions/indigo/johto/${folderName}`,
      } as NavItem
    })
    .filter((link): link is NavItem => link !== null)
})

console.log('Navigation Links:', navigationLinks.value)

const johtoNews: RPNews[] = [
  {
    title: 'Sanguine Swarm',
    icon: 'mdi-bell-outline',
    text: 'Monks in Ecruteak City report a rhythmic resonance from the top floor. Tourists are advised to keep a respectful distance.',
  },
  {
    title: 'Lake of Rage Monitoring',
    icon: 'mdi-waves',
    text: 'Magikarp migration patterns are showing unusual aggression. Rangers are currently testing the water for radio-interference.',
  },
  {
    title: 'Ilex Forest Shadows',
    icon: 'mdi-sprout',
    text: 'A strange shrine-like object has appeared near the Celebi monument. Experts from the Ruins of Alph are en route.',
  },
  {
    title: 'Ilex Forest Shadows',
    icon: 'mdi-sprout',
    text: 'A strange shrine-like object has appeared near the Celebi monument. Experts from the Ruins of Alph are en route.',
  },
  {
    title: 'Ilex Forest Shadows',
    icon: 'mdi-sprout',
    text: 'A strange shrine-like object has appeared near the Celebi monument. Experts from the Ruins of Alph are en route.',
  },
  {
    title: 'Ilex Forest Shadows',
    icon: 'mdi-sprout',
    text: 'A strange shrine-like object has appeared near the Celebi monument. Experts from the Ruins of Alph are en route.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Johto Region"
      subtitle="Where history, tradition, and legend harmonize."
      icon="mdi-bird"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center gap-2">
          <v-chip color="info" variant="flat" size="small" prepend-icon="mdi-temple-buddhist"
            >Traditional</v-chip
          >
          <v-chip color="teal" variant="flat" size="small" prepend-icon="mdi-leaf">Rural</v-chip>
          <v-chip
            color="indigo-darken-2"
            variant="elevated"
            size="small"
            prepend-icon="mdi-federation"
          >
            Federation Member
          </v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200" class="py-8">
      <v-row>
        <v-col cols="12" md="8">
          <KENN :news="johtoNews" color="blue" />

          <WikiCard title="Regional Characteristics" icon="mdi-pine-tree" class="mb-6">
            <p class="text-body-1 mb-4">
              Unlike the industrial bustle of Kanto, Johto is defined by its deep spiritual
              connection to the land. From the **Ruins of Alph** to the sacred **Ilex Forest**, the
              region's geography is a tapestry of ancient shrines and tranquil landscapes.
            </p>
            <div class="d-flex gap-4 flex-wrap">
              <v-chip size="small" variant="tonal" prepend-icon="mdi-weather-windy"
                >Whirl Islands</v-chip
              >
              <v-chip size="small" variant="tonal" prepend-icon="mdi-mountain"
                >Silver Foot-hills</v-chip
              >
              <v-chip size="small" variant="tonal" prepend-icon="mdi-shrine"
                >Kimono Tradition</v-chip
              >
            </div>
          </WikiCard>

          <div class="text-h6 mb-4 px-2">Johto Directory</div>
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
          <WikiCard title="Region Snapshot" icon="mdi-map-marker-outline" color="blue">
            <div class="snapshot-stats mb-4">
              <div class="stat-item mb-2">
                <span class="text-caption text-uppercase font-weight-bold opacity-60"
                  >Regional Capital</span
                >
                <div class="text-subtitle-1 font-weight-black">Goldenrod City</div>
              </div>
            </div>

            <v-divider class="mb-4" />

            <div class="text-overline mb-1">Regional Lore</div>
            <p class="text-caption text-medium-emphasis lh-md">
              Johto’s history is inextricably linked to the legend of the Brass and Bell Towers.
              While the region entered a unified governance with Kanto under the Indigo Federation,
              it remains fiercely protective of its traditional methods and slower pace of life.
            </p>
          </WikiCard>

          <WikiCard title="Real-World Basis" icon="mdi-earth" class="mt-6" color="green">
            <p class="text-caption mb-3">
              Johto is based on the <strong>Kansai</strong> and <strong>Chūbu</strong> regions of
              Japan, emphasizing the historical atmosphere of Kyoto and Nara.
            </p>
            <v-btn
              href="https://bulbapedia.bulbagarden.net/wiki/Pokémon_world_in_relation_to_the_real_world#Johto"
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
/* Scoped styles remain consistent with the Indigo version for visual continuity */
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
