<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'

const coreIndustries: FeatureItem[] = [
  {
    title: 'PokéNav Development',
    icon: 'mdi-cellphone-link',
    color: 'blue-darken-2',
    description:
      'Engineering the world-standard for Trainer navigation, including the PokéNav Plus and its integrated DexNav and AreaNav features.',
  },
  {
    title: 'Infinite Energy Research',
    icon: 'mdi-infinity',
    color: 'blue-darken-2',
    description:
      'Harnessing the biological energy of Pokémon (Bio-Energy) to power massive civil projects and deep-space exploration.',
  },
  {
    title: 'Maritime Technology',
    icon: 'mdi-ferry',
    color: 'blue-darken-2',
    description:
      'Leading the industry in underwater exploration vessels and the high-speed ferries that connect the Hoenn islands.',
  },
  {
    title: 'Advanced Manufacturing',
    icon: 'mdi-factory',
    color: 'blue-darken-2',
    description:
      'Mass-producing high-tier specialized Poké Balls and medicine, alongside industrial-grade heavy machinery.',
  },
]

const notableProjects: FeatureItem[] = [
  {
    title: 'The Link Cable',
    icon: 'mdi-cable-data',
    color: 'blue-darken-2',
    description:
      'A revolutionary device used to transport Pokémon and facilitate trades across long distances.',
  },
  {
    title: 'Fossil Resurrection',
    icon: 'mdi-bone',
    color: 'blue-darken-2',
    description:
      'The world’s first successful machine capable of regenerating living Pokémon from ancient fossilized remains.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Devon Corporation"
      subtitle="Innovation for a sustainable future. Hoenn's premier leader in Pokémon technology and advanced engineering."
      icon="mdi-domain"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="blue-darken-2" variant="flat" size="small">Global Tech Leader</v-chip>
          <v-chip color="blue-darken-2" variant="flat" size="small">Infinite Energy HQ</v-chip>
          <v-chip variant="outlined" size="small">Headquarters: Rustboro City</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="The Heart of Rustboro" icon="mdi-office-building" class="blue-darken-2">
        <p class="text-body-1 lh-lg mb-6">
          Founded by the Stone family, <strong>Devon Corporation</strong> began as a modest mining
          operation extracting iron ore from the mountains surrounding Rustboro. Today, it stands as
          the most technologically advanced entity in the Hoenn region. Under the leadership of
          <strong>Mr. Stone</strong>, Devon has pioneered technologies that have defined the modern
          era of Pokémon training.
        </p>
        <FeatureGrid :items="coreIndustries" :cols="2" />
      </WikiCard>

      <WikiCard title="Infinite Energy" icon="mdi-atom" class="my-6 energy-focus blue-darken-4">
        <v-row align="center">
          <v-col cols="12" md="8">
            <p class="text-body-1 lh-lg mb-4">
              The cornerstone of Devon’s modern success is <strong>Infinite Energy</strong>.
              Developed by Mr. Stone's grandfather, this technology converts the life energy of
              Pokémon into a near-limitless power source. While it fueled the creation of the
              <strong>Submarine Explorer 1</strong> and the
              <strong>Mossdeep Space Center</strong> rockets, its usage remains a subject of
              significant ethical debate among conservationists.
            </p>
            <v-btn
              prepend-icon="mdi-book-open-variant"
              color="blue-darken-4"
              variant="flat"
              to="/lore/infinite-energy"
              class="mt-2"
            >
              Read Energy Ethics Report
            </v-btn>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon size="120" color="blue-darken-2">mdi-molecule</v-icon>
            <div class="text-caption mt-2 text-medium-emphasis">
              Bio-Energy Conversion Schematic
            </div>
          </v-col>
        </v-row>
      </WikiCard>

      <WikiCard title="Research & Development" icon="mdi-flask-outline" class="blue-darken-2">
        <p class="text-body-1 lh-lg mb-4">
          Devon Corp’s labs are world-renowned for solving "impossible" problems. From reviving
          extinct species to developing equipment that allows Trainers to communicate more
          effectively with their partners, Devon remains the primary hardware provider for the
          Pokémon Association.
        </p>
        <FeatureGrid :items="notableProjects" :cols="2" />
      </WikiCard>

      <WikiCallout
        label="Trainer Benefit"
        icon="mdi-package-variant-closed"
        class="mt-6 blue-darken-2"
      >
        Devon Corporation offers sponsorship programs for <strong>Trainers</strong> &
        <strong>Researchers</strong>. Participants can receive early-access prototypes, such as the
        <strong>Devon Scope</strong> or customized <strong>Repeat/Timer Balls</strong>, in exchange
        for field data on rare species.
      </WikiCallout>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

.energy-focus {
  background: linear-gradient(
    135deg,
    rgba(25, 118, 210, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 100%
  ) !important;
  border-left: 4px solid #0d47a1 !important;
}

:deep(.feature-card) {
  border-style: solid !important;
  border-width: 1px;
  background-color: rgba(var(--v-theme-blue-darken-2), 0.02);
  border-color: rgba(var(--v-theme-blue-darken-2), 0.2) !important;
}
</style>
