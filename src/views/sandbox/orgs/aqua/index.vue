<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'

const extremistTenets = [
  {
    title: 'Total Human Erasure',
    icon: 'mdi-skull-outline',
    color: 'blue-darken-4',
    description:
      'The belief that humanity is a terminal parasite. Expanding the seas is not just about habitat; it is about the cleansing of civilization.',
  },
  {
    title: 'Maritime Insurgency',
    icon: 'mdi-pirate',
    color: 'blue-darken-4',
    description:
      'Hiding in unmapped deep-sea trenches and raiding cargo ships, ferries, and oil rigs for resources to fuel their crusade.',
  },
  {
    title: 'Deep-Sea Guerrilla Tactics',
    icon: 'mdi-water-off',
    color: 'blue-darken-4',
    description:
      'Specializing in ambush attacks using Sharpedo-led boarding parties and high-pressure underwater explosives.',
  },
]

const commandStructure = [
  {
    title: 'Archie (The Radical)',
    icon: 'mdi-account-alert',
    color: 'blue-darken-4',
    description:
      'A charismatic sociopath whose love for Pokémon is matched only by his hatred for human infrastructure. He leads from the shadows of the abyss.',
  },
  {
    title: 'The Shattered Admins',
    icon: 'mdi-account-group',
    color: 'blue-darken-4',
    description:
      'Shelly and Matt coordinate decentralized cells across the world’s oceans, maintaining a network of hidden Seafloor Caverns.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Team Aqua"
      subtitle="Sociopathic eco-terrorists seeking the total extermination of human life to return the world to the Pokémon."
      icon="mdi-skull-crossbones"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="blue-darken-4" variant="flat" size="small">Eco-Terrorists</v-chip>
          <v-chip color="red-darken-4" variant="flat" size="small">High-Level Threat</v-chip>
          <v-chip variant="outlined" size="small">Status: Fugitive Insurgency</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="The Great Deluge" icon="mdi-tsunami" class="blue-darken-4">
        <p class="text-body-1 lh-lg mb-6">
          <strong>Team Aqua</strong> is no longer a structured organization—it is a global maritime
          plague. Driven by a misanthropic interpretation of oceanic expansion, they view every
          pier, ship, and coastal city as an insult to the primordial sea. Despite their failure to
          control Kyogre, their ideology has only hardened: if the sea will not rise to swallow
          humanity, they will tear humanity down into the sea.
        </p>

        <FeatureGrid :items="extremistTenets" :cols="2" />
      </WikiCard>

      <WikiCard title="Abyssal Raiders" icon="mdi-submarine" class="blue-darken-4">
        <p class="text-body-1 lh-lg mb-4">
          Since the collapse of their Lilycove headquarters, Team Aqua has retreated to
          <strong>Seafloor Caverns</strong>
          and mobile sub-aquatic bases. They prowl international waters, raiding transportation
          routes for food, fuel, and medical supplies. They do not negotiate; they scavenge.
        </p>
        <v-divider class="border-opacity-75" :thickness="3" />

        <v-icon size="140" color="blue-darken-4" class="mx-auto d-flex flex-wrap justify-center"
          >mdi-ship-wheel</v-icon
        >
        <div
          class="text-caption mt-2 text-red-darken-2 font-weight-bold mx-auto d-flex flex-wrap justify-center"
        >
          DANGER: ACTIVE PIRACY ZONE
        </div>
        <v-divider class="border-opacity-75" :thickness="3" />
        <br />
        <FeatureGrid :items="commandStructure" :cols="2" />
      </WikiCard>

      <WikiCard title="Encounter Protocols" icon="mdi-shield-off-outline" class="blue-darken-4">
        <p class="text-body-1 lh-lg mb-4">
          Aqua's attacks are surgical—disabling ship engines and using Water-type Pokémon to drag
          crews into the depths. Merchant Vessels and Trainers are urged to exercise caution during
          deep-sea operations.
        </p>

        <WikiCallout label="Travel Warning" icon="mdi-ferry" class="mt-6 red-darken-4">
          All maritime transport between Hoenn and Sinnoh must now be escorted by League-sanctioned
          security. Unescorted vessels are considered "prey" by Aqua raiding parties.
        </WikiCallout>
      </WikiCard>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

:deep(.feature-card) {
  border-style: solid !important;
  border-width: 1px;
  background-color: rgba(var(--v-theme-blue-darken-4), 0.1);
  border-color: rgba(var(--v-theme-blue-darken-4), 0.3) !important;
}
</style>
