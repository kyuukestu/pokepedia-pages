<script setup lang="ts">
// views/sandbox/index.vue → /sandbox
// Landing page for the Sandbox section.
// Full content lives in child routes — this page is a curated overview.
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'
import RuleList from '@/components/wiki/RuleList.vue'
import FeatureGrid from '@/components/wiki/FeatureGrid.vue'

// Quick-link cards for the main Sandbox sections
const trainers = [
  {
    icon: 'mdi-sword-cross',
    title: 'Battler',
    description:
      'Focused on competitive strength—Gym challenges, tournaments, and refining battle strategy through constant combat.',
    color: 'red-darken-2',
    link: '/sandbox/trainer-101',
  },
  {
    icon: 'mdi-star-shooting',
    title: 'Coordinator',
    description:
      'Masters of performance and style—blending creativity and precision to captivate audiences in contests and showcases.',
    color: 'pink-darken-1',
    link: '/sandbox/trainer-101',
  },
  {
    icon: 'mdi-shield-search',
    title: 'Ranger',
    description:
      'Protectors of nature—working alongside Pokémon to safeguard ecosystems and respond to environmental threats.',
    color: 'green-darken-2',
    link: '/sandbox/trainer-101',
  },
  {
    icon: 'mdi-flask-outline',
    title: 'Researcher',
    description:
      'Dedicated to discovery—studying Pokémon behavior, habitats, and biology to expand scientific understanding.',
    color: 'indigo-darken-2',
    link: '/sandbox/trainer-101',
  },
  {
    icon: 'mdi-run-fast',
    title: 'Poké-Athlete',
    description:
      'Specialists in physical competition—training alongside Pokémon for races, obstacle events, and endurance trials.',
    color: 'orange-darken-2',
    link: '/sandbox/trainer-101',
  },
]

</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Trainer Paths"
      subtitle="Common specializations amongst Pokemon Trainers."
      icon="mdi-pokeball"
      pattern="pokeball"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="primary" variant="flat" size="small">Career</v-chip>
          <v-chip color="secondary" variant="flat" size="small">Activity</v-chip>
          <v-chip variant="outlined" size="small">Sandbox</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">

      <WikiCard title="Trainers" icon="mdi-compass-outline" color="green">
        <p class="text-body-1 lh-lg mb-6">
          Need some inspiration? Not sure what your character should do in this wide-open world?
        </p>
        <FeatureGrid :items="trainers" />
      </WikiCard>

    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

.section-card {
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.section-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1) !important;
}
</style>
