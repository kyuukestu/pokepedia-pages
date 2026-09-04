<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid from '@/components/wiki/FeatureGrid.vue'
import { trainerClasses } from '@/data/trainer-classes'
import { charmPoints } from '@/data/charm-points'
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Getting Started"
      subtitle="A quick guide to getting started in the Pokémon RP."
      icon="mdi-account-star"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap ga-2">
          <v-chip
            color="blue-darken-2"
            variant="outlined"
            size="small"
            class="font-mono text-caption"
          >
            Getting Started
          </v-chip>

          <v-chip
            color="blue-darken-2"
            variant="flat"
            size="small"
            class="font-mono text-caption"
          >
            Trainer Basics
          </v-chip>

          <v-chip variant="tonal" size="small" class="font-mono text-caption">
            New Player Guide
          </v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200" class="py-10">
      <!-- Section 1: Welcome -->
      <WikiCard
        title="Welcome to the Wonderful World of Pokémon"
        icon="mdi-earth"
        color="blue"
      >
        <p class="text-body-1 lh-relaxed mb-4 text-high-emphasis">
          <strong class="text-blue-darken-2">Pokémon Stories</strong> is a
          Choose-Your-Own-Adventure-style RP where the Pokéverse is yours to explore.
        </p>

        <p class="text-body-1 lh-relaxed mb-6 text-high-emphasis">
          We've built the world so that you don't have to build the adventure yourself. Quests,
          Events, competitions, organizations, and other systems give your characters opportunities
          to get involved, while the sandbox leaves you free to decide what stories you want to
          tell.
        </p>

        <p class="text-h6 font-weight-bold text-high-emphasis mb-6">
          More importantly, your character can become part of the world.
        </p>

        <div class="text-overline text-medium-emphasis mb-4 d-flex align-center ga-2 font-mono">
          <v-icon size="14" color="blue-darken-2">mdi-star-four-points</v-icon>
          What We Offer
        </div>

        <FeatureGrid :items="charmPoints" :cols="4" default-color="blue" />
      </WikiCard>

      <!-- Section 2: Trainer Classes -->
      <WikiCard
        title="Trainer Classes"
        icon="mdi-directions-fork"
        color="blue"
        class="mt-10"
      >
        <p class="text-body-1 lh-relaxed mb-6 text-high-emphasis">
          There are many ways for a character to participate in the Pokémon world. These paths
          represent some of the careers, interests, and activities available to Trainers.
        </p>

        <v-tooltip text="Articles Coming Soon">
          <template #activator="{ props }">
            <div v-bind="props">
              <FeatureGrid
                :items="trainerClasses.slice(0, 4)"
                :cols="4"
                default-color="blue"
              />
            </div>
          </template>
        </v-tooltip>

        <div class="d-flex justify-center mt-8">
          <v-btn
            to="/sandbox/getting-started/trainer-paths"
            prepend-icon="mdi-compass-outline"
            color="blue-darken-2"
            variant="tonal"
            class="font-mono font-weight-bold"
          >
            See All Trainer Paths
          </v-btn>
        </div>
      </WikiCard>

      <!-- Section 3: RP Settings -->
      <WikiCard
        title="RP Settings"
        icon="mdi-cog-outline"
        color="blue"
        class="mt-10"
      >
        <p class="text-body-1 lh-relaxed mb-4 text-high-emphasis">
          Pokémon Stories is a sandbox, but the world still operates according to its own
          rules and conventions. Get to know the basics of our setting and how we operatore.
        </p>

        <p class="text-body-1 lh-relaxed mb-6 text-high-emphasis">
          This includes things like obtaining and storing Pokémon, the PokéMart, 
          travel & transportationn, and more.
        </p>

        <div class="d-flex justify-center">
          <v-btn
            to="/sandbox/setting"
            prepend-icon="mdi-book-open-page-variant-outline"
            color="blue"
            variant="tonal"
            size="large"
            class="font-mono font-weight-bold"
          >
            Explore RP Settings
          </v-btn>
        </div>
      </WikiCard>

      <!-- Section 4: Discord -->
      <WikiCard
        title="Join the Community"
        icon="mdi-discord"
        color="blue"
        class="mt-10"
      >
        <div class="text-center mx-auto" style="max-width: 760px">
          <p class="text-h5 font-weight-bold text-high-emphasis mb-4">
            Don't be shy!
          </p>
          
          <p class="text-body-1 lh-relaxed mb-8 text-medium-emphasis">
            Whether you're already planning your first character or just curious about
            the setting, you're welcome to drop in and have a chat.
          </p>

          <v-btn
            href="https://discord.gg/s5kh69Xma8"
            target="_blank"
            rel="noopener noreferrer"
            prepend-icon="mdi-discord"
            color="blue-darken-2"
            variant="flat"
            size="large"
            class="font-mono font-weight-bold"
            elevation="2"
          >
            Join Our Discord
          </v-btn>
        </div>
      </WikiCard>
    </v-container>
  </v-container>
</template>

<style scoped>
.font-mono {
  font-family: 'JetBrains Mono', monospace, sans-serif;
}

.lh-relaxed {
  line-height: 1.75;
}
</style>
