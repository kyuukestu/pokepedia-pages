<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'

const permitClasses: FeatureItem[] = [
  {
    title: 'Class A (Heavy)',
    image: 'https://www.serebii.net/scarletviolet/pokemon/new/977.png',
    color: 'blue',
    description:
      'Mastery of large aquatic mounts: Gyarados, Lapras, Dondozo. Required for trans-oceanic transit.',
  },
  {
    title: 'Class B (Agile)',
    image: 'https://www.serebii.net/swordshield/pokemon/419.png',
    color: 'blue',
    description:
      'Mid-sized mounts: Floatzel, Vaporeon. Ideal for rapid river navigation and coastal currents.',
  },
  {
    title: 'Class C (Coastal)',
    image: 'https://www.serebii.net/scarletviolet/pokemon/new/963.png',
    color: 'blue',
    description:
      'Small mounts: Buizel, Finizen. Restricted to calm waters, lakes, and designated beach zones.',
  },
]

const steps = [
  {
    title: 'Application',
    icon: 'mdi-file-account',
    text: 'Apply through the MMM portal or at a designated coastal Pokémon Center.',
  },
  {
    title: 'Safety School',
    icon: 'mdi-school',
    text: 'Comprehensive training on marine law, tidal shifts, and emergency "Surface Ascent" protocols.',
  },
  {
    title: 'Aquatic Hours',
    icon: 'mdi-waves',
    text: '15h (Class C) to 70h (Class A) of monitored open-water navigation.',
  },
  {
    title: 'Examination',
    icon: 'mdi-clipboard-check',
    text: 'Practical assessment of mount control and maritime signaling.',
  },
  {
    title: 'Certification',
    icon: 'mdi-certificate',
    text: 'Issuance of Digital WMOL and entry into the Global Aquatic Use Registry.',
  },
]

const statutes: FeatureItem[] = [
  {
    title: 'Validity',
    icon: 'mdi-calendar-check',
    color: 'blue',
    description: 'Permits valid for 5 years; Mount endurance re-testing required biennially.',
  },
  {
    title: 'Renewal',
    icon: 'mdi-autorenew',
    color: 'green',
    description: 'Requires a refresher on safety protocols and updated trainer medical clearance.',
  },
  {
    title: 'Suspension',
    icon: 'mdi-anchor-off',
    color: 'amber',
    description: 'Triggered by negligent operation or navigating in hazardous storm states.',
  },
  {
    title: 'Revocation',
    icon: 'mdi-alert-octagon',
    color: 'red',
    description: 'Permanent loss for smuggling, mount abuse, or falsifying registration.',
  },
]

const operationalGuidelines: FeatureItem[] = [
  {
    title: 'Designated Corridors',
    description:
      'Strictly adhere to surface transit lanes to avoid commercial shipping and protected reefs.',
    icon: 'mdi-map-marker-path',
    color: 'blue',
  },
  {
    title: 'IFF Broadcasting',
    description:
      'Mounts must carry and broadcast a water-resistant Identification Friend or Foe signal at all times.',
    icon: 'mdi-radio-tower',
    color: 'indigo',
  },
  {
    title: 'Emergency Gear',
    description:
      'Operators are required to carry a certified flotation device and a maritime-grade first aid kit.',
    icon: 'mdi-lifebuoy',
    color: 'red',
  },
  {
    title: 'Sober Operation',
    description:
      'Zero-tolerance policy for operating a mount under the influence of alcohol or mind-altering substances.',
    icon: 'mdi-liquor',
    color: 'orange',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Water Mount Licensing (WMOL)"
      subtitle="The International Standard for Maritime Movement Permits under the MMM."
      icon="mdi-waves-arrow-up"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="blue-darken-4" variant="flat" size="small">Maritime Authority</v-chip>
          <v-chip color="teal-darken-1" variant="flat" size="small">Marine Safety Code</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="Mount Classifications" icon="mdi-fish" class="blue-darken-4">
        <p class="text-body-1 lh-lg mb-6">
          The <strong>Maritime Movement Ministry (MMM)</strong> classifies permits based on the
          displacement and capability of the aquatic mount. Larger mounts provide greater stability
          in rough seas but require advanced navigational knowledge.
        </p>
        <FeatureGrid :items="permitClasses" :cols="3" />
      </WikiCard>

      <v-row class="my-6">
        <v-col cols="12" md="6">
          <WikiCard title="Eligibility Requirements" icon="mdi-account-check" class="teal-darken-3">
            <v-list density="compact" bg-color="transparent">
              <v-list-item prepend-icon="mdi-identifier">
                <v-list-item-title>Valid Trainer ID</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-swim">
                <v-list-item-title>Standardized Swim Test</v-list-item-title>
                <v-list-item-subtitle>Or verified water safety certification</v-list-item-subtitle>
              </v-list-item>
              <v-list-item prepend-icon="mdi-check-decagram">
                <v-list-item-title>Mount Stability Cert</v-list-item-title>
              </v-list-item>
            </v-list>
          </WikiCard>
        </v-col>
        <v-col cols="12" md="6">
          <WikiCard title="Trainer Clearances" icon="mdi-hospital-box" class="blue-darken-4">
            <v-list density="compact" bg-color="transparent">
              <v-list-item prepend-icon="mdi-clipboard-pulse">
                <v-list-item-title>Biennial Medical Check</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-brain">
                <v-list-item-title>Psychological Evaluation</v-list-item-title>
                <v-list-item-subtitle>Renewed quinquennially (every 5 years)</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </WikiCard>
        </v-col>
      </v-row>

      <WikiCard title="Licensing Pipeline" icon="mdi-progress-check" class="mb-6 blue-darken-4">
        <v-timeline side="end" align="start">
          <v-timeline-item
            v-for="(step, i) in steps"
            :key="i"
            dot-color="blue-darken-4"
            size="small"
          >
            <div class="d-flex flex-column">
              <strong class="text-subtitle-1">{{ step.title }}</strong>
              <span class="text-body-2 text-medium-emphasis">{{ step.text }}</span>
            </div>
          </v-timeline-item>
        </v-timeline>
      </WikiCard>

      <WikiCard title="Statutes of Maintenance" icon="mdi-gavel" class="blue-darken-4">
        <FeatureGrid :items="statutes" :cols="2" />
      </WikiCard>

      <WikiCard
        title="Maritime Operational Safety"
        icon="mdi-lifebuoy"
        class="dark-focus mt-6 blue-grey-darken-4"
      >
        <v-row align="center">
          <v-col cols="12" md="8">
            <FeatureGrid :items="operationalGuidelines" :cols="2" />
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon size="140" color="blue-lighten-4" class="opacity-30">mdi-ferry</v-icon>
            <p class="text-caption mt-2">Always yield to commercial shipping vessels.</p>
          </v-col>
        </v-row>
      </WikiCard>

      <v-row class="mt-6">
        <v-col cols="12" md="6">
          <WikiCallout label="Youth Permit" icon="mdi-human-child" class="teal-darken-2">
            Ages 7–9 may train under direct Class-A supervision within shallow-water coastal zones
            only.
          </WikiCallout>
        </v-col>
        <v-col cols="12" md="6">
          <WikiCallout
            label="Accessibility"
            icon="mdi-wheelchair-accessibility"
            class="blue-darken-2"
          >
            Adapted flotation harnesses and specialized launch ramps are available at all AAA/MMM
            hubs.
          </WikiCallout>
        </v-col>
      </v-row>
      <div class="d-flex justify-center my-8">
        <v-btn
          prepend-icon="mdi-license"
          color="blue-darken-4"
          variant="elevated"
          size="large"
          to="/sandbox/trainer-101/permits"
          rounded="lg"
          elevation="4"
        >
          Return to Permit Hub
        </v-btn>
      </div>

      <WikiAlert type="error" class="mt-8" icon="mdi-alert-decagram">
        <strong>MARITIME ENFORCEMENT:</strong> Operating a water mount during a
        <strong>Level-4 Storm Alert</strong> or in
        <strong>Restricted Oceanic Corridors</strong> without Class-A clearance will result in
        immediate permit revocation.
      </WikiAlert>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}
.dark-focus {
  background: linear-gradient(
    135deg,
    rgba(13, 71, 161, 0.05) 0%,
    rgba(0, 0, 0, 0.05) 100%
  ) !important;
  border: 1px solid rgba(13, 71, 161, 0.2) !important;
}
:deep(.feature-card) {
  border: 1px solid rgba(var(--v-theme-blue-darken-4), 0.15) !important;
  background-color: rgba(var(--v-theme-blue-darken-4), 0.02) !important;
}
</style>
