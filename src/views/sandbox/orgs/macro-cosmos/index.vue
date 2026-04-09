<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'

const subsidiaries: FeatureItem[] = [
  {
    title: 'Macro Cosmos Energy',
    icon: 'mdi-lightning-bolt',
    color: 'deep-purple-darken-3',
    description:
      'The primary energy provider for Galar, overseeing the storage and distribution of electricity via the Power Spot network.',
  },
  {
    title: 'Macro Cosmos Rail/Air',
    icon: 'mdi-train',
    color: 'deep-purple-darken-3',
    description:
      'Operates the Galarian railway system and the Corviknight-led Flying Taxi service for rapid regional deployment.',
  },
  {
    title: 'Macro Cosmos Construction',
    icon: 'mdi-crane',
    color: 'deep-purple-darken-3',
    description:
      'Heavy industry experts responsible for the maintenance of Galar’s massive stadiums and urban infrastructure.',
  },
  {
    title: 'Macro Cosmos Media',
    icon: 'mdi-television-classic',
    color: 'deep-purple-darken-3',
    description:
      'The exclusive broadcaster of the Gym Challenge. Manages the regional internet and Rotom-based communication tech.',
  },
]

const pokeJobCategories = [
  {
    title: 'Industrial Sector',
    icon: 'mdi-factory',
    color: 'orange-darken-4',
    description:
      'Manual labor, mining assistance, and factory maintenance. Best suited for Fighting, Steel, and Rock-type Pokémon.',
  },
  {
    title: 'Service & Hospitality',
    icon: 'mdi-room-service',
    color: 'blue-darken-2',
    description:
      'Waitstaff, cleaning, and customer support for Macro Cosmos hotels. Ideal for Fairy, Normal, and Psychic-types.',
  },
  {
    title: 'Technical & Academic',
    icon: 'mdi-laptop',
    color: 'cyan-darken-3',
    description:
      'Data entry, laboratory research, and electrical engineering. Prefers Electric, Poison, and Ghost-type specialists.',
  },
  {
    title: 'Specialized Dispatch',
    icon: 'mdi-truck-delivery',
    color: 'green-darken-3',
    description:
      'Regional logistics, delivery, and wild area surveying. Suited for Flying, Grass, and Water-type mounts.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Macro Cosmos"
      subtitle="Connecting Galar: From high-speed transport to the energy that fuels every home."
      icon="mdi-rhombus-split"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="deep-purple-darken-4" variant="flat" size="small">Corporate Giant</v-chip>
          <v-chip color="grey-darken-4" variant="flat" size="small">Wyndon HQ</v-chip>
          <v-chip variant="outlined" size="small">Market Leader</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard
        title="Corporate Infrastructure"
        icon="mdi-office-building-marker"
        class="deep-purple-darken-4"
      >
        <p class="text-body-1 lh-lg mb-6">
          <strong>Macro Cosmos</strong> is a large-scale conglomerate that essentially manages
          Galar’s modern existence. While its leadership has shifted toward a more transparent,
          committee-based board, its reach remains absolute. From the moment a trainer picks up a
          Rotom Phone to the energy powering a Dynamax Band, a Macro Cosmos subsidiary is involved.
        </p>

        <FeatureGrid :items="subsidiaries" :cols="2" />
      </WikiCard>

      <WikiCard title="PokéJobs Recruitment" icon="mdi-briefcase-check" class="indigo-darken-4">
        <p class="text-body-1 lh-lg mb-4">
          The <strong>PokéJobs</strong> initiative is a contract-based employment system that allows
          trainers to lease the unique skills of their Pokémon to regional businesses. Accessed via
          the <strong>Rotomi</strong> terminal in any Pokémon Center, trainers can accept requests
          from various sectors to earn experience, regional currency, and rare items.
        </p>

        <v-divider class="my-6 border-opacity-50" />

        <h3 class="text-h5 mb-4 text-center font-weight-bold indigo--text">
          Regional Dispatch Sectors
        </h3>
        <FeatureGrid :items="pokeJobCategories" :cols="2" />

        <v-divider class="my-6 border-opacity-50" />

        <div class="d-flex flex-column align-center">
          <v-icon size="80" color="indigo-darken-4">mdi-clipboard-text-clock</v-icon>
          <div class="text-overline font-weight-bold">Contract Duration: Hourly to Weekly</div>
          <p class="text-caption text-center max-width-600 mt-2">
            *Note: Pokémon sent on PokéJobs are temporarily removed from your active party until the
            contract is completed. Trainers are compensated based on "Job Satisfaction" ratings.
          </p>
        </div>
      </WikiCard>

      <WikiCard title="Logistics & Regional Impact" icon="mdi-map-clock" class="grey-darken-4">
        <p class="text-body-1 lh-lg mb-4">
          Through <strong>Macro Cosmos Living</strong> and <strong>Macro Cosmos Banking</strong>,
          the conglomerate manages the payroll and housing of nearly 60% of Wyndon’s workforce.
          Their logistics wing ensures that goods from the <strong>Isle of Armor</strong> and
          <strong>Crown Tundra</strong> reach the mainland markets efficiently.
        </p>
      </WikiCard>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

.max-width-600 {
  max-width: 600px;
}

:deep(.feature-card) {
  border-style: solid !important;
  border-width: 1px;
  background-color: rgba(var(--v-theme-deep-purple-darken-4), 0.05);
  border-color: rgba(var(--v-theme-deep-purple-darken-4), 0.3) !important;
}

.v-theme--dark :deep(.feature-card) {
  background-color: rgba(49, 27, 146, 0.05);
  border-color: rgba(49, 27, 146, 0.2) !important;
}
</style>
