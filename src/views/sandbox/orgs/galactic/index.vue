<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'

const galacticObjectives = [
  {
    title: 'Universal Reset',
    icon: 'mdi-auto-fix',
    color: 'cyan-darken-4',
    description:
      'The pursuit of a new world entirely devoid of spirit and emotion, which Cyrus deemed the root of all human suffering.',
  },
  {
    title: 'Spatio-Temporal Research',
    icon: 'mdi-axis-arrow',
    color: 'cyan-darken-4',
    description:
      'Advanced study of Dialga and Palkia to manipulate the very fabric of the Sinnoh region and beyond.',
  },
  {
    title: 'Energy Monopoly',
    icon: 'mdi-lightning-bolt-circle',
    color: 'cyan-darken-4',
    description:
      'The mass-harvesting of electricity from the Valley Windworks and other regional hubs to power Galactic HQ.',
  },
  {
    title: 'Mythical Extraction',
    icon: 'mdi-hands-pray',
    color: 'cyan-darken-4',
    description:
      'The capture and exploitation of the Lake Guardians (Uxie, Mesprit, Azelf) to forge the Red Chain.',
  },
]

const commandRemnants = [
  {
    title: 'Mars, Jupiter, & Saturn',
    icon: 'mdi-account-group',
    color: 'cyan-darken-4',
    description:
      'The three surviving Commanders. While Jupiter and Mars have shown signs of disillusionment, Saturn continues to manage the remaining infrastructure.',
  },
  {
    title: 'Charon (The Opportunist)',
    icon: 'mdi-flask-empty',
    color: 'red-darken-4',
    description:
      'A brilliant but amoral scientist who briefly attempted to seize control of the team for financial gain before being detained.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Team Galactic"
      subtitle="A fractured syndicate of nihilists seeking the end of the world through the mastery of space and time."
      icon="mdi-flare"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="cyan-darken-4" variant="flat" size="small">Nihilist Extremists</v-chip>
          <v-chip color="grey-darken-4" variant="flat" size="small"
            >Inter-Dimensional Threat</v-chip
          >
          <v-chip variant="outlined" size="small">Status: Fragmented / Surveillance</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="The New World Order" icon="mdi-orbit" class="cyan-darken-4">
        <p class="text-body-1 lh-lg mb-6">
          <strong>Team Galactic</strong> was once Sinnoh's most formidable threat. Unlike groups
          seeking wealth or land, Galactic’s goal was purely ontological: the total destruction of
          the universe to facilitate the birth of a new one without "spirit." This vision was driven
          entirely by the cold, charismatic logic of their leader, <strong>Cyrus</strong>.
        </p>
        <FeatureGrid :items="galacticObjectives" :cols="2" />
      </WikiCard>

      <WikiCard
        title="The Reverse World Incident"
        icon="mdi-mirror-variant"
        class="my-6 distortion-focus grey-darken-4"
      >
        <v-row align="center">
          <v-col cols="12" md="8">
            <p class="text-body-1 lh-lg mb-4">
              Following the summit at Spear Pillar, Cyrus was dragged into the
              <strong>Reverse World</strong> (commonly known as the Distortion World) by the
              Renegade Pokémon, <strong>Giratina</strong>. Reports from the only known witnesses
              suggest that Cyrus chose to remain in that lawless, antimatter dimension, viewing its
              emptiness as the only "perfect" world.
            </p>
            <p class="text-body-1 lh-lg font-italic">
              "Even if I am the only one, I will create a world... A world without spirit. In that
              world, all will be complete." — Last recorded statement of Cyrus.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon size="140" color="purple-darken-4">mdi-pillar</v-icon>
            <div class="text-caption mt-2 text-cyan-lighten-4">The Spear Pillar Gateway</div>
          </v-col>
        </v-row>
      </WikiCard>

      <WikiCard title="The Galactic Diaspora" icon="mdi-account-off" class="cyan-darken-4">
        <p class="text-body-1 lh-lg mb-4">
          Today, Team Galactic is a headless beast. While their central HQ in Veilstone City remains
          under International Police lockdown, many low-level Grunts still wander Sinnoh, awaiting
          the return of their leader. This fanatical allegiance makes them highly dangerous; they
          are a "sleeper" syndicate capable of being reactivated by any figure claiming to have news
          of Cyrus.
        </p>
        <FeatureGrid :items="commandRemnants" :cols="2" />
      </WikiCard>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

.distortion-focus {
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(48, 63, 159, 0.3) 100%
  ) !important;
  border: 1px solid rgba(0, 188, 212, 0.4) !important;
  box-shadow: 0 0 15px rgba(123, 31, 162, 0.4) !important;
}

:deep(.feature-card) {
  border-style: solid !important;
  border-width: 1px;
  background-color: rgba(var(--v-theme-cyan-darken-4), 0.1);
  border-color: rgba(var(--v-theme-cyan-darken-4), 0.3) !important;
}
</style>
