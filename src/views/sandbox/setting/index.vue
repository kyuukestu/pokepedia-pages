<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'

const travelLinks: FeatureItem[] = [
  {
    title: 'Travel',
    icon: 'mdi-map-marker-path',
    description:
      'Explore regions, travel between settlements, and make your way through the wider Pokémon world.',
    color: 'blue',
    to: '/sandbox/getting-started/travel',
  },
  {
    title: 'Transportation',
    icon: 'mdi-train-car',
    description:
      'Learn about the different ways Trainers and their Pokémon can get around.',
    color: 'blue',
    to: '/sandbox/getting-started/transportation',
  },
  {
    title: 'Travel Permits',
    icon: 'mdi-license',
    description:
      'Some forms of Pokémon-assisted travel require specialized permits.',
    color: 'blue',
    to: '/sandbox/getting-started/permits',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Settings"
      subtitle="The rules, systems, and conventions that shape Pokémon Stories."
      icon="mdi-cog-outline"
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
            RP Rules
          </v-chip>

          <v-chip
            color="blue-darken-2"
            variant="flat"
            size="small"
            class="font-mono text-caption"
          >
            Game Systems
          </v-chip>

          <v-chip
            variant="tonal"
            size="small"
            class="font-mono text-caption"
          >
            Reference
          </v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200" class="py-10">
      <!-- Section 1: Pokémon -->
      <WikiCard
        title="Pokémon"
        icon="mdi-pokeball"
        color="blue"
      >
        <p class="text-body-1 lh-relaxed mb-6 text-high-emphasis">
          Pokémon are at the heart of the RP, and players have considerable freedom
          in deciding which Pokémon their characters encounter and form partnerships
          with.
        </p>

        <div id="obtaining-pokemon">
          <div class="text-overline text-medium-emphasis mb-3 d-flex align-center ga-2 font-mono">
            <v-icon size="14" color="blue-darken-2">
              mdi-pokeball
            </v-icon>
            Obtaining Pokémon
          </div>

          <p class="text-body-1 lh-relaxed mb-4 text-high-emphasis">
            Characters may obtain Pokémon through ordinary in-world means such as
            catching wild Pokémon, receiving them from others, or trading. Ordinary
            Pokémon captures do not require staff approval.
          </p>

          <p class="text-body-1 lh-relaxed mb-4 text-high-emphasis">
            Encounters should still make reasonable sense within the setting. Pokémon
            are not distributed randomly across the world, so captures should take
            their natural habitats and circumstances into account.
          </p>

          <WikiCallout
            label="Approval Required"
            icon="mdi-alert-circle-outline"
            color="blue"
            class="mb-6"
          >
            <strong>Legendary, Mythical, and Paradox Pokémon</strong> require an
            application and staff approval before your character can obtain them.
          </WikiCallout>
        </div>

        <v-divider class="my-8" />

        <div id="pokemon-storage">
          <div class="text-overline text-medium-emphasis mb-3 d-flex align-center ga-2 font-mono">
            <v-icon size="14" color="blue-darken-2">
              mdi-database-outline
            </v-icon>
            Pokémon Storage
          </div>

          <p class="text-body-1 lh-relaxed mb-0 text-high-emphasis">
            Trainers may have a maximum of
            <strong class="text-blue-darken-2">six Pokémon</strong>
            in their active party at a time. Additional Pokémon are transferred
            to the Trainer's PC storage and can be exchanged as needed.
          </p>
        </div>
      </WikiCard>

      <!-- Section 2: Economy -->
      <WikiCard
        title="Economy & Items"
        icon="mdi-cash-multiple"
        color="blue"
        class="mt-10"
      >
        <p class="text-body-1 lh-relaxed mb-6 text-high-emphasis">
          The RP maintains its own economy and establishes its own prices for Pokémon
          items, Trainer equipment, and other supplies. Canonical game prices are not
          treated as binding.
        </p>

        <WikiCallout
          label="PokéMark Pricing"
          icon="mdi-currency-usd"
          color="blue"
          class="mb-6"
        >
          Item prices in the RP are established independently to provide a consistent
          economy across characters, shops, Quests, Events, and other systems.
        </WikiCallout>

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

      <!-- Section 3: Travel -->
      <WikiCard
        title="Travel & Transportation"
        icon="mdi-map-check"
        color="blue"
        class="mt-10"
      >
        <p class="text-body-1 lh-relaxed mb-6 text-high-emphasis">
          The Pokémon world is vast, and characters are free to travel between
          regions, settlements, and wilderness areas. Travel may involve public
          transportation, personal vehicles, or Pokémon-assisted transportation.
        </p>

        <FeatureGrid
          :items="travelLinks"
          :cols="3"
          default-color="blue"
        />

        <WikiCallout
          label="Travel Permits"
          icon="mdi-license"
          color="blue"
          class="mt-6"
        >
          Certain forms of Pokémon-assisted travel may require specialized permits.
          These systems primarily provide additional worldbuilding and narrative
          opportunities.
        </WikiCallout>
      </WikiCard>

      <!-- Section 4: Trainer Identification -->
      <WikiCard
        title="Trainer Identification"
        icon="mdi-card-account-details"
        color="blue"
        class="mt-10"
      >
        <p class="text-body-1 lh-relaxed mb-6 text-high-emphasis">
          Trainers may interact with various organizations and services through
          official identification systems. These records can establish a character's
          identity, credentials, achievements, and access to League services.
        </p>

        <div class="d-flex justify-center">
          <v-btn
            prepend-icon="mdi-open-in-new"
            color="blue-darken-2"
            variant="tonal"
            to="/sandbox/getting-started/ids"
            class="font-mono font-weight-bold"
          >
            Trainer Identification Guide
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
