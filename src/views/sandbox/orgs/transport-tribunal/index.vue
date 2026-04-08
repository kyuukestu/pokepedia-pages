<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'

const globalStatutes = [
  {
    title: 'Universal Trail Systems',
    icon: 'mdi-map-marker-distance',
    color: 'brown-darken-3',
    description:
      'Standardized terrain categories (paved, rugged, and wilderness) recognized globally to ensure mount compatibility with specific environments.',
  },
  {
    title: 'Trans-Regional Registry',
    icon: 'mdi-card-search',
    color: 'brown-darken-3',
    description:
      'A unified database allowing local Land Authorities to verify the health and weight-class of Terrestrial mounts instantly.',
  },
  {
    title: 'Ground Combat Safety',
    icon: 'mdi-sword-cross',
    color: 'brown-darken-3',
    description:
      'Regulations governing duels on public thoroughfares, ensuring "Right of Way" for non-combatant travelers and wild Pokémon.',
  },
  {
    title: 'Stamina Management',
    icon: 'mdi-heart-pulse',
    color: 'brown-darken-3',
    description:
      'International standards for terrestrial welfare, mandating rest intervals and caloric intake for long-distance land crossings.',
  },
]

const safetyProtocols = [
  {
    title: 'Gait Control (Low-Impact)',
    icon: 'mdi-shoe-print',
    color: 'brown-darken-3',
    description:
      'Mandatory speed and gait restrictions in urban or ecologically sensitive zones to prevent erosion and structural vibrations.',
  },
  {
    title: 'Infrastructure Integrity',
    icon: 'mdi-bridge',
    color: 'brown-darken-3',
    description:
      'Strict adherence to weight limits for Class-A (Heavy) mounts when crossing man-made bridges or traversing subterranean tunnels.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Terrestrial Transport Tribunal"
      subtitle="The global governing body for safe, regulated, and ethical land-based transportation across the Pokémon world."
      icon="mdi-terrain"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="brown-darken-3" variant="flat" size="small"
            >International Authority</v-chip
          >
          <v-chip color="grey-darken-3" variant="flat" size="small">Global Standard</v-chip>
          <v-chip variant="outlined" size="small">UN-League Affiliate</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard
        title="The TTT Global Charter"
        icon="mdi-script-text-outline"
        class="brown-darken-3"
      >
        <p class="text-body-1 lh-lg mb-6">
          The <strong>Terrestrial Transport Tribunal (TTT)</strong> was established to unify the
          diverse laws of land travel into a singular, cohesive framework. Whether galloping across
          the grassy plains of Galar or navigating the volcanic crags of Hoenn, every licensed rider
          is bound by the same safety, maintenance, and ethical statutes. The TTT ensures that land
          routes remain accessible and sustainable, balancing trainer mobility with habitat
          preservation and the protection of terrestrial Pokémon ecosystems.
        </p>
        <FeatureGrid :items="globalStatutes" :cols="2" />
      </WikiCard>

      <WikiCard
        title="The Terrestrial Permit & LMOL"
        icon="mdi-card-bulleted-settings"
        class="my-6 license-focus brown-lighten-5"
      >
        <v-row align="center">
          <v-col cols="12" md="8">
            <h3 class="text-h5 mb-3 brown--text text--darken-4">Credentials & Qualifications</h3>
            <p class="text-body-1 lh-lg mb-4">
              A private citizen may only operate a land mount if they possess a valid
              <strong>Land Mount Operator’s License (LMOL)</strong>, also known internationally as a
              <strong>Terrestrial Permit</strong>. This document verifies the operator has passed
              rigorous testing in terrain navigation, mount-load physics, and emergency field care.
            </p>

            <em>Note: </em>
            <WikiCallout label="Note" icon="mdi-note" class="mt-6 brown-darken-3">
              Licenses issued in one region are valid in all TTT-member regions under the
              Reciprocity Act.
            </WikiCallout>
            <div class="d-flex justify-center my-8">
              <v-btn
                prepend-icon="mdi-file-certificate"
                color="brown-darken-3"
                variant="elevated"
                size="large"
                to="/sandbox/trainer-101/permits/terrestrial"
                rounded="lg"
                elevation="4"
              >
                Learn More about Land Licenses
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon size="160" color="brown-darken-3">mdi-badge-account-horizontal</v-icon>
            <div class="text-overline mt-2 font-weight-bold">TTT-Standard ID Format</div>
          </v-col>
        </v-row>
      </WikiCard>

      <WikiCard title="Terrestrial Safety & Training" icon="mdi-school" class="brown-darken-3">
        <p class="text-body-1 lh-lg mb-4">
          Training under the TTT curriculum focuses heavily on
          <strong>Environmental Mitigation</strong>. A major concern for the Tribunal is the
          prevention of "Trail Blazing"—the illegal practice of navigating off-path, which causes
          irreversible damage to fragile soil and local flora.
        </p>
        <FeatureGrid :items="safetyProtocols" :cols="2" />

        <v-divider class="my-6" />

        <h4 class="text-h6 mb-3">Hazardous Land Corridors</h4>
        <p class="text-body-1 lh-lg mb-4">
          The TTT maintains the <strong>Global Terrestrial Hazard Map</strong>. Operators are
          trained to recognize and avoid aggressive territories, such as the migratory stampedes of
          Tauros or the territorial burrowing grounds of Excadrill, preventing unnecessary conflict
          between trainers and wild Pokémon.
        </p>
      </WikiCard>

      <WikiCallout label="Global Transit Advisory" icon="mdi-earth" class="mt-6 brown-darken-3">
        The TTT utilizes a satellite-linked <strong>GPS Monitoring System</strong>. Unauthorized
        off-road transit in protected EPZs (Ecology Protection Zones) will trigger an automated fine
        and potential dispatch of <strong>Ground Wardens</strong> to intercept the operator.
      </WikiCallout>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

.license-focus {
  border: 2px solid #4e342e !important;
  box-shadow: 0 4px 20px rgba(78, 52, 46, 0.15) !important;
}

:deep(.feature-card) {
  border-style: solid !important;
  border-width: 1px;
  background-color: rgba(var(--v-theme-brown-darken-3), 0.05);
  border-color: rgba(var(--v-theme-brown-darken-3), 0.2) !important;
}
</style>
