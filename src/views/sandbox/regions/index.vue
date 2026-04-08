<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid from '@/components/wiki/FeatureGrid.vue'

// Region data mapped to FeatureGrid interface
const regionItems = [
  {
    title: 'Kanto',
    description:
      'The starting point of the modern League. Known for its rural charm and industrial hubs.',
    icon: 'mdi-map-marker-radius',
    link: '/sandbox/regions/kanto',
    color: 'green',
  },
  {
    title: 'Johto',
    description:
      'A land of deep tradition and ancient architecture, connected to Kanto via Mt. Silver.',
    icon: 'mdi-temple-buddhist',
    link: '/sandbox/regions/johto',
    color: 'green',
  },
  {
    title: 'Hoenn',
    description: 'A tropical archipelago defined by the balance of land and sea.',
    icon: 'mdi-island',
    link: '/sandbox/regions/hoenn',
    color: 'green',
  },
  {
    title: 'Sinnoh',
    description: 'The cold, mountainous cradle of creation myths and high-tech research.',
    icon: 'mdi-snowflake-melt',
    link: '/sandbox/regions/sinnoh',
    color: 'green',
  },
  {
    title: 'Unova',
    description:
      'A diverse region of towering cities and vast bridges, separate from the main landmass.',
    icon: 'mdi-city-variant',
    link: '/sandbox/regions/unova',
    color: 'green',
  },
  {
    title: 'Kalos',
    description: 'The star-shaped region famous for its beauty, fashion, and Mega Evolution roots.',
    icon: 'mdi-tower-fire',
    link: '/sandbox/regions/kalos',
    color: 'green',
  },
  {
    title: 'Alola',
    description: 'An island paradise built on the Trial system rather than a traditional League.',
    icon: 'mdi-palm-tree',
    link: '/sandbox/regions/alola',
    color: 'green',
  },
  {
    title: 'Galar',
    description: 'An industrial powerhouse where Pokémon battles are the ultimate stadium sport.',
    icon: 'mdi-stadium-variant',
    link: '/sandbox/regions/galar',
    color: 'green',
  },
  {
    title: 'Paldea',
    description: 'A sprawling open-world region centered around its prestigious academies.',
    icon: 'mdi-school',
    link: '/sandbox/regions/paldea',
    color: 'green',
  },
]

// Side series/Secondary regions
const secondaryRegions = [
  {
    title: 'Orre',
    icon: 'mdi-cactus',
    description: 'A harsh desert region once plagued by Shadow Pokémon.',
    color: 'green',
  },
  {
    title: 'Fiore',
    icon: 'mdi-moped',
    description: 'A coastal region known for its Rangers.',
    color: 'green',
  },
  {
    title: 'Almia',
    icon: 'mdi-water-percent',
    description: 'The home of the Pokémon Ranger Union & Schools.',
    color: 'green',
  },
  {
    title: 'Oblivia',
    icon: 'mdi-weather-lightning',
    description: 'A peaceful archipelago forgotten by the world.',
    color: 'green',
  },
  {
    title: 'Ransei',
    icon: 'mdi-fencing',
    description: 'An ancient land and an ancient form of battle.',
    color: 'green',
  },
  {
    title: 'Orange Islands',
    icon: 'mdi-fruit-cherries',
    description: "Exotic isles off Johto's coast.",
    color: 'green',
  },
  {
    title: 'Decolore Islands',
    icon: 'mdi-ice-cream',
    description: 'Disparate islands between Kanto and Alola.',
    color: 'green',
  },
  {
    title: 'Ferrum',
    icon: 'mdi-set-center',
    description: 'A land of battle and synergies',
    color: 'green',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="World Regions"
      subtitle="From the forests of Kanto to the academies of Paldea, explore the diverse landscapes of the Pokémon world."
      icon="mdi-earth"
      pattern="pokeball"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="green-darken-2" variant="flat" size="small">9 Core Regions</v-chip>
          <v-chip color="green-darken-2" variant="flat" size="small"
            >Side-Series Integration</v-chip
          >
          <v-chip variant="outlined" size="small">Global Sandbox</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="The Major Leagues" icon="mdi-map-check" color="green">
        <p class="text-body-1 lh-lg mb-6">
          The following regions represent the primary centers of the Pokémon League. Each region
          maintains its own local government and League format while remaining open for travel to
          registered Trainers.
        </p>

        <FeatureGrid :items="regionItems" :cols="3" default-color="green" />
      </WikiCard>

      <WikiCard title="External Territories" icon="mdi-map-marker-plus" color="green">
        <p class="text-body-1 lh-lg mb-6">
          Beyond the main League circuits, several unique territories offer different cultural
          approaches to Pokémon partnership, such as the Ranger Union regions.
        </p>

        <FeatureGrid :items="secondaryRegions" :cols="4" default-color="green" />
      </WikiCard>

      <WikiCard title="Inter-Regional Travel" icon="mdi-airplane-takeoff" color="green">
        <v-row align="center">
          <v-col cols="12" md="8">
            <p class="text-body-1 lh-lg">
              Travel between regions can be handled via a myriad of means: cruise-lines like the
              <strong>S.S. Anne</strong>, cross-regional Trains, and even regional airlines. However
              most Trainers rely on their Pokemon after obtaining the requisite travel permit.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-btn
              color="green-darken-2"
              variant="tonal"
              to="/sandbox/trainer-101/permits"
              prepend-icon="mdi-credit-card-fast"
              block
            >
              Travel Requirements
            </v-btn>
          </v-col>
        </v-row>
      </WikiCard>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

/* Enhancing the grid visual as a directory */
:deep(.feature-card) {
  background-color: rgba(var(--v-theme-surface-variant), 0.05);
}
</style>
