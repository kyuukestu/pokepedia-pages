<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid from '@/components/wiki/FeatureGrid.vue'

import { trainerClasses } from '@/data/trainer-classes'
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Trainer Paths"
      subtitle="Explore the many careers, interests, and opportunities available within the Pokémon world."
      icon="mdi-directions-fork"
      pattern="dots"
    />

    <v-container max-width="1200" class="py-10">
      <WikiCard
        title="Find Your Path"
        icon="mdi-compass-outline"
        color="blue"
      >
        <p class="text-body-1 lh-relaxed mb-6 text-high-emphasis">
          There is no single way to experience the Pokémon world. Whether your
          character dreams of becoming a Champion, protecting Pokémon as a Ranger,
          studying their mysteries, or pursuing an entirely different career,
          there's a path for them to follow.
        </p>

        <FeatureGrid
          :items="trainerClasses"
          :cols="4"
          default-color="blue"
        />
      </WikiCard>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-relaxed {
  line-height: 1.75;
}
</style>
