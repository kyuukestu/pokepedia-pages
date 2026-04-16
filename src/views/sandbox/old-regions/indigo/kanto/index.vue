<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import type { NavItem, RPNews } from '@/types/wiki'
import { computed } from 'vue'
import KENN from '@/components/wiki/KENN.vue'

/**
 * 1. Dynamic Directory Scanning
 * Scans for sibling folders (e.g., ./league/index.vue, ./settlements/index.vue)
 */
const siblingModules = import.meta.glob('./*/index.vue', { eager: true })

/**
 * 2. Configuration Mapping (Kanto Context)
 * Ensure these keys match your folder names exactly (e.g., folder 'league' matches key 'league')
 */
const directoryConfig: Record<string, { title: string; icon: string; color: string }> = {
  events: {
    title: 'Regional Events',
    icon: 'mdi-calendar-star',
    color: 'red-darken-2',
  },
  league: {
    title: 'Red Conference',
    icon: 'mdi-trophy-variant',
    color: 'indigo-darken-2',
  },
  settlements: {
    title: 'Urban Directory',
    icon: 'mdi-city-variant',
    color: 'grey-darken-3',
  },
}

/**
 * 3. Computed Navigation Links
 */
const navigationLinks = computed<NavItem[]>(() => {
  return Object.keys(siblingModules)
    .map((path) => {
      const parts = path.split('/')
      const folderName = parts[parts.length - 2]
      const config = directoryConfig[folderName]

      if (!config) return null

      return {
        title: config.title,
        icon: config.icon,
        color: config.color,
        to: `/sandbox/regions/indigo/kanto/${folderName}`,
      } as NavItem
    })
    .filter((link): link is NavItem => link !== null)
})

/**
 * 4. Kanto Specific News Feed
 */
const kantoNews: RPNews[] = [
  {
    title: 'Power Plant Surge',
    icon: 'mdi-lightning-bolt',
    text: 'Unusual voltage spikes reported near Route 10. Engineers suspect a nesting group of Electabuzz is interfering with the main grid.',
  },
  {
    title: 'Cinnabar Research Update',
    icon: 'mdi-microscope',
    text: 'The Pokémon Mansion restoration project has recovered several scorched logs regarding the 1996 volcanic event.',
  },
  {
    title: 'Silph Co. Expansion',
    icon: 'mdi-office-building',
    text: 'New prototypes for the "Scope Silph" are entering beta testing in Saffron City. Local ghosts are reportedly unamused.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Kanto Region"
      subtitle="The heart of industrial innovation and the birthplace of the League."
      icon="mdi-factory"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center gap-2">
          <v-chip color="error" variant="flat" size="small" prepend-icon="mdi-engine"
            >Industrial</v-chip
          >
          <v-chip color="indigo" variant="flat" size="small" prepend-icon="mdi-train">Urban</v-chip>
          <v-chip
            color="indigo-darken-4"
            variant="elevated"
            size="small"
            prepend-icon="mdi-federation"
          >
            Federation HQ
          </v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200" class="py-8">
      <v-row>
        <v-col cols="12" md="8">
          <KENN :news="kantoNews" color="red" class="mb-6" />

          <WikiCard title="Regional Characteristics" icon="mdi-office-building-marker" class="mb-6">
            <p class="text-body-1 mb-4">
              Kanto is a testament to human progress and engineering. As the administrative center
              of the
              <strong>Indigo Federation</strong>, it boasts the most advanced transportation network
              in the known world, anchored by the Magnet Train and the sprawling metropolis of
              Saffron City.
            </p>
            <div class="d-flex gap-4 flex-wrap">
              <v-chip size="small" variant="tonal" prepend-icon="mdi-biathlon">Cycling Road</v-chip>
              <v-chip size="small" variant="tonal" prepend-icon="mdi-ship">Vermilion Port</v-chip>
              <v-chip size="small" variant="tonal" prepend-icon="mdi-flask">Cinnabar Labs</v-chip>
            </div>
          </WikiCard>

          <div class="text-h6 mb-4 px-2">Kanto Directory</div>
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
          <WikiCard title="Region Snapshot" icon="mdi-information-outline" color="red">
            <div class="snapshot-stats mb-4">
              <div class="stat-item mb-2">
                <span class="text-caption text-uppercase font-weight-bold opacity-60"
                  >Regional Capital</span
                >
                <div class="text-subtitle-1 font-weight-black">Saffron City</div>
              </div>
            </div>

            <v-divider class="mb-4" />

            <div class="text-overline mb-1">Regional Lore</div>
            <p class="text-caption text-medium-emphasis lh-md">
              Kanto's modern identity was forged following the "Great Indigo Expansion." While the
              region lacks the spiritual shrines of its neighbor Johto, it leads the world in
              Pokémon storage technology and synthetic medical research.
            </p>
          </WikiCard>

          <WikiCard title="Real-World Basis" icon="mdi-earth" class="mt-6" color="green">
            <p class="text-caption mb-3">
              Kanto is based on the <strong>Kantō</strong> region of Japan, specifically reflecting
              the heavy urbanization of Tokyo, Chiba, and Yokohama.
            </p>
            <v-btn
              href="https://bulbapedia.bulbagarden.net/wiki/Pokémon_world_in_relation_to_the_real_world#Kanto"
              target="_blank"
              variant="tonal"
              block
              size="small"
              append-icon="mdi-open-in-new"
              color="red-darken-2"
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
  background: rgba(var(--v-theme-error), 0.05);
  border-color: rgb(var(--v-theme-error)) !important;
  transform: translateY(-4px);
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
