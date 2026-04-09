<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'

const globalStatutes: FeatureItem[] = [
  {
    title: 'Universal Flight Zones',
    icon: 'mdi-map-marker-path',
    color: 'indigo-darken-2',
    description:
      'Standardized airspace categories (Class A-E) recognized across all League-affiliated regions to prevent aerial accidents and collisions.',
  },
  {
    title: 'Trans-Regional IFF',
    icon: 'mdi-radio-tower',
    color: 'indigo-darken-2',
    description:
      'A unified Identification system that allows cross-border Air Traffic Control to identify mounts instantly.',
  },
  {
    title: 'Aerial Combat',
    icon: 'mdi-sword-cross',
    color: 'indigo-darken-2',
    description:
      'Works in tandem with the Pokemon Association to host air-based Tournaments and Events.',
  },
  {
    title: 'Regulated Airworthiness',
    icon: 'mdi-heart-pulse',
    color: 'indigo-darken-2',
    description:
      'International standards for mount health, ensuring creatures are not flown beyond their physiological limits.',
  },
]

const safetyProtocols: FeatureItem[] = [
  {
    title: 'Collision Avoidance (TCAS)',
    icon: 'mdi-shield-airplane',
    color: 'indigo-darken-2',
    description:
      'Standardized maneuvers for avoiding wild flocks and other licensed operators in high-traffic corridors.',
  },
  {
    title: 'Environmental Noise Control',
    icon: 'mdi-volume-mute',
    color: 'indigo-darken-2',
    description:
      'Restricting high-velocity moves (like Extreme Speed) in urban altitudes to prevent sonic booms and structural damage.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Aviation Authority Agency"
      subtitle="The global governing body for safe, regulated, and ethical aerial transportation across the Pokémon world."
      icon="mdi-earth-box"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="indigo-darken-2" variant="flat" size="small"
            >International Authority</v-chip
          >
          <v-chip color="grey-darken-3" variant="flat" size="small">Global Standard</v-chip>
          <v-chip variant="outlined" size="small">UN-League Affiliate</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard
        title="The AAA Global Charter"
        icon="mdi-script-text-outline"
        class="indigo-darken-2"
      >
        <p class="text-body-1 lh-lg mb-6">
          The <strong>Aviation Authority Agency (AAA)</strong> was formed to unify regional air laws
          into a singular, cohesive framework. Whether traversing the vast deserts of Hoenn or the
          snowy peaks of Sinnoh, every licensed aeronaut is bound by the same safety, maintenance,
          and ethical statutes. The AAA ensures that the skies remain a resource for all, balancing
          trainer mobility with public safety and the protection of avian Pokémon ecosystems.
        </p>
        <FeatureGrid :items="globalStatutes" :cols="2" />
      </WikiCard>

      <WikiCard
        title="The Aviation Permit & FMOL"
        icon="mdi-card-bulleted-settings"
        class="my-6 license-focus indigo-lighten-5"
      >
        <v-row align="center">
          <v-col cols="12" md="8">
            <h3 class="text-h5 mb-3 indigo--text text--darken-4">Credentials & Qualifications</h3>
            <p class="text-body-1 lh-lg mb-4">
              A private citizen may only operate a flying mount if they possess a valid
              <strong>Flying Mount Operator’s License (FMOL)</strong>, also known internationally as
              an <strong>Aviation Permit</strong>. This document proves the operator has passed
              rigorous testing in aerodynamics, Pokémon handling, and emergency response.
            </p>

            <em>Note: </em>
            <WikiCallout label="Note" icon="mdi-note" class="mt-6 indigo-darken-2">
              Licenses issued in one region are valid in all AAA-member regions under the
              Reciprocity Act.
            </WikiCallout>
            <div class="d-flex justify-center">
              <v-btn
                prepend-icon="mdi-file-certificate"
                color="indigo-darken-2"
                variant="elevated"
                size="large"
                to="/sandbox/trainer-101/permits/aviation"
                class="d-flex flex-wrap mx-auto justify-center mt-6"
              >
                Learn More about Flying Licenses
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon size="160" color="indigo-darken-2">mdi-badge-account-horizontal</v-icon>
            <div class="text-overline mt-2 font-weight-bold">AAA-Standard ID Format</div>
          </v-col>
        </v-row>
      </WikiCard>

      <WikiCard title="Aerial Safety & Training" icon="mdi-school" class="indigo-darken-2">
        <p class="text-body-1 lh-lg mb-4">
          Training under the AAA curriculum focuses heavily on
          <strong>Collateral Mitigation</strong>. A major concern for the Agency is the prevention
          of "Bad Landings"—incidents where inexperienced pilots or exhausted mounts cause property
          damage or injury upon descent.
        </p>
        <FeatureGrid :items="safetyProtocols" :cols="2" />

        <v-divider class="my-6" />

        <h4 class="text-h6 mb-3">Hazardous Wildlife Corridors</h4>
        <p class="text-body-1 lh-lg mb-4">
          The AAA maintains the <strong>Global Avian Hazard Map</strong>. Operators are trained to
          recognize and avoid aggressive territories, such as the migratory paths of Fearow or the
          territorial nesting grounds of Skarmory, preventing unnecessary conflict between trainers
          and wild Pokémon.
        </p>
      </WikiCard>

      <WikiCallout label="Global Pilot Advisory" icon="mdi-earth" class="mt-6 indigo-darken-2">
        The AAA uses a satellite-linked <strong>ATC Network</strong>. If you are flying without a
        broadcasted serial code, your mount will be flagged as an "Unidentified Flying Pokémon"
        (UFP), and <strong>Interceptors</strong> may be deployed to ground you.
      </WikiCallout>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

.license-focus {
  border: 2px solid #303f9f !important;
  box-shadow: 0 4px 20px rgba(48, 63, 159, 0.15) !important;
}

:deep(.feature-card) {
  border-style: solid !important;
  border-width: 1px;
  background-color: rgba(var(--v-theme-indigo-darken-2), 0.05);
  border-color: rgba(var(--v-theme-indigo-darken-2), 0.2) !important;
}
</style>
