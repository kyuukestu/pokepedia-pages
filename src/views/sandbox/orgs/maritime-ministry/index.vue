<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'

const maritimeStatutes: FeatureItem[] = [
  {
    title: 'Surfing Corridors',
    icon: 'mdi-waves',
    color: 'blue-darken-4',
    description:
      'Designated transit lanes for Surf-capable Pokémon to prevent interference with commercial shipping and protected coral reefs.',
  },
  {
    title: 'Sub-Surface Zoning',
    icon: 'mdi-diving',
    color: 'blue-darken-4',
    description:
      'Regulated diving depths based on trainer certification. Deep-trench exploration requires specialized pressure-resistant equipment and mounts.',
  },
  {
    title: 'Sonar & Acoustic Safety',
    icon: 'mdi-radar',
    color: 'blue-darken-4',
    description:
      'Prohibiting high-energy wave-producing moves (like Sonic Boom or Earthquake) underwater, which can disorient migrating Wailord & Lapras pods and cascade into ecological disasters like Tsunamis.',
  },
  {
    title: 'Mount Hydration & Rest',
    icon: 'mdi-water-check',
    color: 'blue-darken-4',
    description:
      'Providing rest stops for aquatic mounts during trans-oceanic crossings to prevent exhaustion-based drowning incidents.',
  },
]

const oceanicHazards: FeatureItem[] = [
  {
    title: 'Apex Predator Alerts',
    icon: 'mdi-fish-off',
    color: 'deep-orange-darken-3',
    description:
      'Real-time tracking of Sharpedo feeding frenzies and Gyarados nesting territories. Access to these "Red Zones" is restricted.',
  },
  {
    title: 'Whirlpool & Current Navigation',
    icon: 'mdi-weather-hurricane',
    color: 'blue-darken-4',
    description:
      'Provides training in "Whirlpool Exit Vectoring" and emergency maneuvers if a trainer is caught up in natural disasters like water-spouts or hurricanes.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Maritime Movement Ministry"
      subtitle="The international authority on aquatic transit, diving safety, and the preservation of the World's Oceans."
      icon="mdi-anchor"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="blue-darken-4" variant="flat" size="small">Oceanic Governance</v-chip>
          <v-chip color="teal-darken-3" variant="flat" size="small">Diving Authority</v-chip>
          <v-chip variant="outlined" size="small">MMM-Global Protocol</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="The Code of the Deep" icon="mdi-book-open-variant" class="blue-darken-4">
        <p class="text-body-1 lh-lg mb-6">
          The <strong>Maritime Movement Ministry (MMM)</strong> oversees all human-Pokémon
          interaction within the world's waterways. As the seas are home to some of the most
          powerful and territorial entities in existence, the MMM enforces strict navigation laws to
          ensure that <strong>Surf</strong> and <strong>Dive</strong> maneuvers do not lead to
          ecological disaster or maritime tragedy.
        </p>
        <FeatureGrid :items="maritimeStatutes" :cols="2" />
      </WikiCard>

      <WikiCard
        title="Marine Operator's Permit (MOP)"
        icon="mdi-card-account-details-star"
        class="my-6 sea-focus blue-lighten-5"
      >
        <v-row align="center">
          <v-col cols="12" md="8">
            <h3 class="text-h5 mb-3 blue--text text--darken-4">Seafaring Credentials</h3>
            <p class="text-body-1 lh-lg mb-4">
              Traversing open water or diving into sub-aquatic caverns requires a
              <strong>Marine Operator’s Permit (MOP)</strong>. This license verifies the trainer’s
              ability to manage mount stamina, navigate by the stars or GPS, and perform emergency
              "Surface Ascents" safely.
            </p>
            <p class="text-body-1 mb-6">
              <em
                >Class-D (Diving) endorsements are required for any activity involving the use of
                the "Dive" move below 30 meters.</em
              >
            </p>
            <div class="d-flex justify-center">
              <v-btn
                prepend-icon="mdi-fountain-pen-tip"
                color="blue-darken-4"
                variant="elevated"
                size="large"
                to="/sandbox/trainer-101/permits/maritime"
              >
                Review Seafaring License Requirements
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon size="160" color="blue-darken-4">mdi-badge-account-outline</v-icon>
            <div class="text-overline mt-2 font-weight-bold">MMM-Standard Diver ID</div>
          </v-col>
        </v-row>
      </WikiCard>

      <WikiCard title="Oceanic Safety & Ecosystems" icon="mdi-lifebuoy" class="blue-darken-4">
        <p class="text-body-1 lh-lg mb-4">
          The Ministry maintains the <strong>Abyssal Warning System</strong>. This includes tracking
          underwater volcanic activity and the movement of super-massive Pokémon like
          <strong>Kyogre</strong> or <strong>Lugia</strong>, whose presence can fundamentally alter
          local currents and weather.
        </p>

        <FeatureGrid :items="oceanicHazards" :cols="2" />

        <v-divider class="my-6" />

        <h4 class="text-h6 mb-3">Collision & Collateral Prevention</h4>
        <p class="text-body-1 lh-lg mb-4">
          To prevent "Bad Docking"—incidents where large mounts like Lapras or Gyarados cause damage
          to marina infrastructure—the MMM requires all trainers to master
          <strong>Low-Wake Approach</strong>
          techniques when entering port cities like Vermilion or Slateport.
        </p>
      </WikiCard>

      <WikiCallout
        label="Global Maritime Advisory"
        icon="mdi-shield-check"
        class="mt-6 blue-darken-4"
      >
        All aquatic mounts must be equipped with <strong>Serial Tags</strong>. Unregistered surfers
        in international shipping lanes may be intercepted by <strong>Coast Guard units</strong>.
      </WikiCallout>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

.sea-focus {
  border: 2px solid #0d47a1 !important;
  box-shadow: 0 4px 20px rgba(13, 71, 161, 0.15) !important;
}

:deep(.feature-card) {
  border-style: solid !important;
  border-width: 1px;
  background-color: rgba(var(--v-theme-blue-darken-4), 0.05);
  border-color: rgba(var(--v-theme-blue-darken-4), 0.2) !important;
}
</style>
