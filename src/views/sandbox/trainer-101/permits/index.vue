<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'

const permitCategories = [
  {
    title: 'Aviation Permit (AP)',
    description:
      'Governed by the AAA. Required for aerial transit, spanning from personal flight to public Corviknight-Taxis.',
    image: 'https://www.serebii.net/swordshield/pokemon/823.png', // Corviknight
    link: '/sandbox/trainer-101/permits/aviation',
    color: 'blue',
  },
  {
    title: 'Maritime Permit (MP)',
    description:
      'Governed by the MMM. Covers surface surfing and deep-sea diving across international waters.',
    image: 'https://www.serebii.net/swordshield/pokemon/131.png', // Lapras
    link: '/sandbox/trainer-101/permits/maritime',
    color: 'cyan',
  },
  {
    title: 'Terrestrial Permit (TP)',
    description:
      'Governed by the TTT. Regulations for high-speed land mounts and heavy-load mountain traversal.',
    image: 'https://www.serebii.net/swordshield/pokemon/750.png', // Mudsdale
    link: '/sandbox/trainer-101/permits/terrestrial',
    color: 'amber',
  },
]

const globalTenets = [
  {
    title: 'Trainer ID Linkage',
    icon: 'mdi-card-account-details',
    description:
      'All permits are digitally bound to your Trainer ID. Suspensions in one sector may affect your standing in others.',
  },
  {
    title: 'Mount Readiness',
    icon: 'mdi-heart-pulse',
    description:
      'Regular health checks are mandatory to ensure mounts are physically capable of safe transport.',
  },
  {
    title: 'Cross-Regional Validity',
    icon: 'mdi-earth',
    description:
      'Thanks to international treaties, permits issued by the AAA, MMM, and TTT are recognized in all major regions.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Regional Permit Hub"
      subtitle="The central authority for Aviation, Maritime, and Terrestrial transport regulations."
      icon="mdi-shield-airplane"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="indigo-darken-2" variant="flat" size="small">Global Transit Code</v-chip>
          <v-chip color="grey-darken-3" variant="flat" size="small">Trainer 101</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard
        title="The Three Pillars of Transit"
        icon="mdi-map-marker-distance"
        class="indigo-darken-2"
      >
        <p class="text-body-1 lh-lg mb-6">
          To ensure the safety of both humans and Pokémon, the League oversees three specialized
          regulatory bodies. Each authority manages a specific domain of movement, providing
          certification, safety guidelines, and infrastructure support for trainers worldwide.
        </p>

        <FeatureGrid :items="permitCategories" :cols="3" />
      </WikiCard>

      <v-row class="my-6">
        <v-col cols="12">
          <WikiCard
            title="Universal Safety Standards"
            icon="mdi-check-decagram"
            class="blue-grey-darken-3"
          >
            <p class="text-body-1 mb-6">
              Regardless of the medium—air, sea, or land—certain universal laws apply to all
              operators. These "Global Statutes" are the foundation of safe exploration.
            </p>
            <FeatureGrid :items="globalTenets" :cols="3" />
          </WikiCard>
        </v-col>
      </v-row>

      <WikiCard
        title="General Requirements"
        icon="mdi-clipboard-list-outline"
        class="indigo-darken-2"
      >
        <v-row>
          <v-col cols="12" md="6">
            <h4 class="text-h6 mb-3">Trainer Eligibility</h4>
            <ul class="text-body-1 lh-lg">
              <li><strong>Minimum Age:</strong> 10 years old for Basic (Class C) certification.</li>
              <li>
                <strong>Health Clearance:</strong> Biennial medical and psych-eval certificates.
              </li>
              <li>
                <strong>Conduct:</strong> No history of Pokémon neglect or reckless operation.
              </li>
            </ul>
          </v-col>
          <v-col cols="12" md="6">
            <h4 class="text-h6 mb-3">The Licensing Process</h4>
            <p class="text-body-1 mb-4">
              While specific hours vary, all licensing follows a standard 5-step pipeline:
            </p>
            <v-chip-group>
              <v-chip variant="tonal" size="small">1. Application</v-chip>
              <v-chip variant="tonal" size="small">2. Theory School</v-chip>
              <v-chip variant="tonal" size="small">3. Practical Hours</v-chip>
              <v-chip variant="tonal" size="small">4. Examination</v-chip>
              <v-chip variant="tonal" size="small">5. Registry</v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
      </WikiCard>

      <WikiCallout label="Operator Advisory" icon="mdi-information" class="mt-6 indigo-darken-4">
        Attempting to use moves like <strong>Fly</strong>, <strong>Surf</strong>, or high-speed land
        travel in urban centers without the appropriate license and IFF tag is a federal offense.
        Local authorities are equipped with specialized interceptor teams to ground or dock
        unauthorized travelers.
      </WikiCallout>

      <WikiAlert type="error" class="mt-8" icon="mdi-alert-octagon">
        <strong>GLOBAL RECIPROCITY:</strong> Licenses revoked in one region are automatically
        invalidated worldwide. Always ensure your mount and permit are up to date before attempting
        trans-regional crossings.
      </WikiAlert>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

:deep(.feature-card) {
  border: 1px solid rgba(var(--v-theme-indigo-darken-2), 0.1) !important;
  transition: all 0.2s ease-in-out;
}

:deep(.feature-card--link:hover) {
  background-color: rgba(var(--v-theme-indigo-darken-2), 0.03) !important;
  border-color: rgba(var(--v-theme-indigo-darken-2), 0.4) !important;
}
</style>
