<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'
import { trainerPaths } from '@/data/trainer-classes'

const whatWeOffer: FeatureItem[] = [
  {
    title: 'Quest Board',
    icon: 'mdi-clipboard-text-outline',
    description:
      'Take on Missions and PokéJobs, from lending a helping hand around the community to pursuing the trail of something far more sinister.',
    color: 'blue',
  },
  {
    title: 'Events',
    icon: 'mdi-trophy-outline',
    description:
      'Participate in tournaments, festivals, races, competitions, and other activities that bring characters together.',
    color: 'blue',
  },
  {
    title: 'Build a Career',
    icon: 'mdi-briefcase-outline',
    description:
      'Pursue a Profession and carve out a place for your character. Become a Ranger, join InterPOL, rise to Gym Leader, or find a career of your own.',
    color: 'blue',
  },
  {
    title: "Tell the World's Story",
    icon: 'mdi-newspaper-variant-outline',
    description:
      'Use KENN to report on events, write news articles, share character perspectives, or pen opinion pieces that become part of the ongoing story.',
    color: 'blue',
  },
  {
    title: 'Shape the Future',
    icon: 'mdi-earth-plus',
    description:
      "Your character's accomplishments, relationships, careers, and actions can create new opportunities and influence the stories happening around them.",
    color: 'blue',
  },
]

const essentialLinks: FeatureItem[] = [
  {
    title: 'Obtaining Pokémon',
    icon: 'mdi-pokeball',
    description: 'Learn how Pokémon captures work and which Pokémon require an application and staff approval.',
    color: 'blue',
    to: '#obtaining-pokemon',
  },
  {
    title: 'Pokémon Storage',
    icon: 'mdi-pokeball-outline',
    description: 'Understand the six-Pokémon carry limit and how additional Pokémon are stored.',
    color: 'blue',
    to: '#pokemon-storage',
  },
  {
    title: 'PokéMart',
    icon: 'mdi-store',
    description: 'Browse the RP’s item catalogue and PokéMark prices for Poké Balls, medicine, equipment, and more.',
    color: 'blue',
    to: '/sandbox/pokemart',
  },
]

const travelLinks: FeatureItem[] = [
  {
    title: 'Travel',
    icon: 'mdi-map-marker-path',
    description: 'Explore regions, travel between settlements, and make your way through the wider Pokémon world.',
    color: 'blue',
    to: '/sandbox/trainer-101/travel',
  },
  {
    title: 'Transportation',
    icon: 'mdi-train-car',
    description: 'Learn about the different ways Trainers and their Pokémon can get around.',
    color: 'blue',
    to: '/sandbox/trainer-101/transportation',
  },
  {
    title: 'Travel Permits',
    icon: 'mdi-license',
    description: 'Some forms of Pokémon-assisted travel require specialized permits.',
    color: 'blue',
    to: '/sandbox/trainer-101/permits',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Trainer 101"
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

          <v-chip
            variant="tonal"
            size="small"
            class="font-mono text-caption"
          >
            New Player Guide
          </v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200" class="py-10">
      <!-- Section 1: Explore the World -->
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
          We've built the world so that you don't have to build the adventure yourself.
          Quests, Events, competitions, organizations, and other systems give your
          characters opportunities to get involved, while the sandbox leaves you free
          to decide what stories you want to tell.
        </p>
      
        <p class="text-h6 font-weight-bold text-high-emphasis mb-6">
          More importantly, your character can become part of the world.
        </p>
      
        <div class="text-overline text-medium-emphasis mb-4 d-flex align-center ga-2 font-mono">
          <v-icon size="14" color="blue-darken-2">
            mdi-star-four-points
          </v-icon>
          What We Offer
        </div>
      
        <FeatureGrid
          :items="whatWeOffer"
          :cols="3"
          default-color="blue"
        />
      </WikiCard>

      <!-- Section 2: Trainer Paths -->
      <WikiCard
        title="Trainer Paths"
        icon="mdi-directions-fork"
        color="blue"
        class="mt-10"
      >
        <p class="text-body-1 lh-relaxed mb-6 text-high-emphasis">
          There are many ways for a character to participate in the Pokémon world.
          These paths represent some of the careers, interests, and activities available
          to Trainers.
        </p>

        <FeatureGrid
          :items="trainerPaths"
          :cols="4"
          default-color="blue"
        />
      </WikiCard>

      <!-- Section 3: The Essentials -->
      <WikiCard
        title="The Essentials"
        icon="mdi-toolbox-outline"
        color="blue"
        class="mt-10"
      >
        <p class="text-body-1 lh-relaxed mb-6 text-high-emphasis">
          Once you know what your character wants to do, there are a few practical systems
          worth understanding. These cover Pokémon ownership, storage, and the items you
          can purchase during your adventures.
        </p>

        <FeatureGrid
          :items="essentialLinks"
          :cols="3"
          default-color="blue"
        />

        <div
          id="obtaining-pokemon"
          class="pt-8"
        >
          <div class="text-overline text-medium-emphasis mb-3 d-flex align-center ga-2 font-mono">
            <v-icon size="14" color="blue-darken-2">
              mdi-pokeball
            </v-icon>
            Obtaining Pokémon
          </div>

          <p class="text-body-1 lh-relaxed mb-4 text-high-emphasis">
            Characters may obtain Pokémon through ordinary in-world means such as catching
            wild Pokémon, receiving them from others, or trading. The RP does not require
            players to request approval for ordinary Pokémon captures.
          </p>

          <p class="text-body-1 lh-relaxed mb-4 text-high-emphasis">
            Captures should still make reasonable sense within the setting. Pokémon are
            not distributed randomly across the world, so encounters should take their
            natural habitat and circumstances into account.
          </p>

          <WikiCallout
            label="Approval Required"
            icon="mdi-alert-circle-outline"
            color="blue"
            class="mb-6"
          >
            <strong>Legendary, Mythical, and Paradox Pokémon</strong> require an application
            and staff approval before your character can obtain them.
          </WikiCallout>
        </div>

        <v-divider class="my-8" />

        <div id="pokemon-storage">
          <div class="text-overline text-medium-emphasis mb-3 d-flex align-center ga-2 font-mono">
            <v-icon size="14" color="blue-darken-2">
              mdi-pokeball-outline
            </v-icon>
            Pokémon Storage
          </div>

          <p class="text-body-1 lh-relaxed mb-0 text-high-emphasis">
            Trainers may carry a maximum of <strong class="text-blue-darken-2">six Pokémon</strong>
            as their active party. Additional Pokémon are transferred to the Trainer's
            PC storage and can be exchanged as needed.
          </p>
        </div>
      </WikiCard>

      <!-- Section 4: Getting Around -->
      <WikiCard
        title="Getting Around"
        icon="mdi-map-check"
        color="blue"
        class="mt-10"
      >
        <p class="text-body-1 lh-relaxed mb-6 text-high-emphasis">
          The Pokémon world is large, and Trainers have plenty of ways to move through it.
          Routes, public transportation, Pokémon-assisted travel, and international
          journeys all play a part in how characters explore the setting.
        </p>

        <FeatureGrid
          :items="travelLinks"
          :cols="3"
          default-color="blue"
        />
      </WikiCard>

      <!-- Section 5: PokéMarks & Shopping -->
      <WikiCard
        title="PokéMarks & Shopping"
        icon="mdi-cash-multiple"
        color="blue"
        class="mt-10"
      >
        <p class="text-body-1 lh-relaxed mb-6 text-high-emphasis">
          The RP maintains its own economy and establishes its own prices for Pokémon
          items and Trainer supplies. Canon game prices are not treated as binding,
          allowing the catalogue to better reflect the setting and its economy.
        </p>

        <div class="d-flex justify-center">
          <v-btn
            prepend-icon="mdi-store"
            color="blue-darken-2"
            variant="flat"
            size="large"
            to="/sandbox/pokemart"
            class="font-mono font-weight-bold"
            elevation="2"
          >
            Visit the PokéMart
          </v-btn>
        </div>
      </WikiCard>

      <!-- Section 6: Trainer Identification -->
      <WikiCard
        title="Trainer Identification"
        icon="mdi-card-account-details"
        color="blue"
        class="mt-10"
      >
        <p class="text-body-1 lh-relaxed mb-6 text-high-emphasis">
          Trainers interact with the world through a variety of official identification
          systems. These records can establish a character's identity, credentials,
          achievements, and access to League services.
        </p>

        <div class="d-flex justify-center">
          <v-btn
            prepend-icon="mdi-open-in-new"
            color="blue-darken-2"
            variant="tonal"
            to="/sandbox/trainer-101/ids"
            class="font-mono font-weight-bold"
          >
            Trainer Identification Guide
          </v-btn>
        </div>
      </WikiCard>

      <!-- Section 7: Where to Go Next -->
      <WikiCard
        title="Where to Go Next"
        icon="mdi-compass"
        color="blue"
        class="mt-10"
      >
        <p class="text-body-1 lh-relaxed mb-0 text-high-emphasis">
          Trainer 101 only covers the basics. The rest of the site contains the detailed
          rules, systems, locations, organizations, and lore that make up the wider world.
          Use it as a starting point, then explore whatever interests you.
        </p>
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
