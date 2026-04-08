<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import RuleList from '@/components/wiki/RuleList.vue'

// Refactored to match the Rule interface: { icon, color, title, description }
const timelineEvents = [
  {
    icon: 'mdi-history',
    color: 'green',
    title: 'Hisuian Era (~1868)',
    description:
      'The era of Legends: Arceus. The foundational period of modern human-Pokémon relations.',
  },
  {
    icon: 'mdi-clock-check-outline',
    color: 'green',
    title: 'The Kanto/Hoenn Era (2005)',
    description: 'FRLG and ORAS. The start of the contemporary Pokémon League era.',
  },
  {
    icon: 'mdi-clock-plus-outline',
    color: 'green',
    title: 'The Sinnoh/Johto Era (2008)',
    description: 'HGSS and Platinum. Occurs roughly three years after the initial Kanto journey.',
  },
  {
    icon: 'mdi-chevron-double-right',
    color: 'green',
    title: 'The Modern Peak (2010–2016)',
    description: 'The rapid succession of BW, BW2, XY, USUM, SwSh, and SV events.',
  },
  {
    icon: 'mdi-calendar-star',
    color: 'green',
    title: 'Present Day (2022)',
    description: 'Six years post-Paldea (SV). This is the current "Now" for all RP threads.',
  },
]

const sideSeriesIntegration = [
  {
    icon: 'mdi-shield-star-outline',
    color: 'green',
    title: 'Orre Region (Colosseum/XD)',
    description:
      'Integrated into the early-generation era. Shadow Pokémon are considered a rare and criminal phenomenon.',
  },
  {
    icon: 'mdi-map-marker-radius',
    color: 'green',
    title: 'Pokémon Ranger (Fiore/Almia/Oblivia)',
    description:
      'The Ranger Union operates in parallel with the League, primarily during Generations 1–4.',
  },
  {
    icon: 'mdi-incognito',
    color: 'green',
    title: 'Detective Pikachu',
    description: 'Ryme City is an established metropolitan area within the unified setting.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Setting & Timeline"
      subtitle="A unified Pokémon world anchored to a structured timeline."
      icon="mdi-earth"
      pattern="pokeball"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="green-darken-2" variant="flat" size="small">World Setting</v-chip>
          <v-chip color="green-darken-2" variant="flat" size="small">Timeline System</v-chip>
          <v-chip variant="outlined" size="small">Canon Adaptation</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="World Setting" icon="mdi-earth-box" color="green">
        <p class="text-body-1 lh-lg mb-4">
          This RP takes place in a <strong>unified, open-world</strong> interpretation of the
          Pokémon setting. All regions exist within the same continuity, allowing characters to
          travel freely.
        </p>
      </WikiCard>

      <WikiCard title="Timeline Overview" icon="mdi-timeline-outline" color="green">
        <p class="text-body-1 lh-lg mb-6">
          To maintain consistency, this RP uses a structured timeline anchored to a fixed present
          year:
          <strong>2022</strong> (8 years post-Sword & Shield).
        </p>

        <RuleList :rules="timelineEvents" class="mb-4" />

        <WikiCallout label="Timeline Note" icon="mdi-information-outline" color="green">
          We use remakes (FRLG, HGSS, ORAS) as the primary canon source to reduce technological
          contradictions.
        </WikiCallout>
      </WikiCard>

      <WikiCard title="Design Philosophy" icon="mdi-lightbulb-outline" color="green">
        <p class="text-body-1 lh-lg mb-4">
          This timeline prioritizes clarity and usability. While we respect canon, the internal
          consistency of the Sandbox comes first.
        </p>
        <WikiCallout label="Alternate Timelines" icon="mdi-axis-arrow" color="green">
          Ultra Space and divergent timelines are treated as exceptional narrative events rather
          than the default state.
        </WikiCallout>
      </WikiCard>

      <WikiCard title="Side Series Integration" icon="mdi-puzzle-outline" color="green">
        <p class="text-body-1 lh-lg mb-6">
          Select side-series titles are incorporated where they do not conflict with core
          continuity:
        </p>

        <RuleList :rules="sideSeriesIntegration" />
      </WikiCard>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}
</style>
