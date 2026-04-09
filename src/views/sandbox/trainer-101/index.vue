<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'
import RuleList from '@/components/wiki/RuleList.vue'

// Section 4d: FeatureGrid items
const leagueServices: FeatureItem[] = [
  { title: 'PokéMart', icon: 'mdi-store', description: 'Purchase items, gear, and Pokéballs.' },
  {
    title: 'PokéCenter',
    icon: 'mdi-hospital',
    description: 'Medical care and restoration for your team.',
  },
  { title: 'Daycare', icon: 'mdi-egg', description: 'Long-term care and breeding services.' },
  { title: 'Gyms', icon: 'mdi-dumbbell', description: 'Official Battle Challenge facilities.' },
  {
    title: 'Events',
    icon: 'mdi-trophy',
    description: 'League-sanctioned tournaments and showcases.',
  },
  {
    title: 'PC Storage',
    icon: 'mdi-monitor',
    description: 'Digital Pokémon management and transfer.',
  },
]

const idTypes: FeatureItem[] = [
  {
    title: 'Trainer Card',
    icon: 'mdi-card-account-details',
    description: 'The standard electronic card used for most League services.',
    color: 'blue',
    to: '/sandbox/trainer-101/ids#trainer-card',
  },
  {
    title: 'Passport',
    icon: 'mdi-passport',
    description: 'Necessary for international travel between distant regions.',
    color: 'blue',
    to: '/sandbox/trainer-101/ids#trainer-passport',
  },
  {
    title: 'League Card',
    icon: 'mdi-cards',
    description: 'A stylized, collectible card reflecting your personality.',
    color: 'blue',
    to: '/sandbox/trainer-101/ids#league-card',
  },
  {
    title: 'Mobile Profile',
    icon: 'mdi-passport-biometric',
    description: 'Digital integration for Pokedex and Rotom-Phone apps.',
    color: 'blue',
    to: '/sandbox/trainer-101/ids#profile-app',
  },
]

const permits: FeatureItem[] = [
  {
    title: 'Aviation Permit',
    icon: 'mdi-feather',
    description: 'For high-altitude flight and transportation.',
    color: 'blue',
    to: '/sandbox/trainer-101/permits/aviation',
  },
  {
    title: 'Terrestrial Permit',
    icon: 'mdi-paw',
    description: 'For pokemon-mounted land travel.',
    color: 'blue',
    to: '/sandbox/trainer-101/permits/terrestrial',
  },
  {
    title: 'Maritime Permit',
    icon: 'mdi-waves',
    description: 'For deep-sea delving and water-traversal.',
    color: 'blue',
    to: '/sandbox/trainer-101/permits/maritime',
  },
]

// Section 4e: RuleList items
const carryExceptions: FeatureItem[] = [
  {
    icon: 'mdi-baby-face-outline',
    color: 'blue',
    title: 'Nurturing Proximity',
    description:
      'Young or newly hatched Pokémon who benefit from constant care may occasionally exceed the limit with league approval.',
  },
  {
    icon: 'mdi-medical-bag',
    color: 'blue',
    title: 'Service & Guide Pokémon',
    description:
      'Pokémon acting as registered medical or service capacity for their Trainers are not counted toward the six-slot battle party.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Trainer 101"
      subtitle="The fundamental systems, IDs, and permits that define a Trainer's journey."
      icon="mdi-account-star"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="blue-darken-2" variant="outlined" size="small">League Services</v-chip>
          <v-chip color="blue-darken-2" variant="flat" size="small">Trainer IDs</v-chip>
          <v-chip variant="tonal" size="small">New Player Guide</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="The Trainer Registry" icon="mdi-account-check" color="blue">
        <p class="text-body-1 lh-lg mb-6">
          A Pokémon Trainer is anyone who catches, trains, or cares for Pokémon. From the age of
          ten, individuals are eligible to apply for official recognition. Registration grants
          access to a global network of League services:
        </p>

        <FeatureGrid :items="leagueServices" :cols="3" />
      </WikiCard>

      <WikiCard title="Identification Systems" icon="mdi-card-bulleted-settings" color="blue">
        <p class="text-body-1 lh-lg mb-6">
          Depending on your region and career path, you may carry different forms of identification.
          These digital and physical assets track your progress, badges, and records:
        </p>

        <FeatureGrid :items="idTypes" :cols="4" />
      </WikiCard>

      <WikiCard title="The Carry Limit" icon="mdi-briefcase-check" color="blue">
        <p class="text-body-1 lh-lg mb-4">
          To ensure the welfare of the Pokémon and the safety of the public, the League mandates a
          standard carry limit of <strong>six Pokémon</strong>. Any additional Pokémon are
          automatically transferred to the Trainer's designated PC storage system.
        </p>

        <p class="text-body-1 lh-lg mb-4">The following exceptions apply:</p>

        <RuleList :rules="carryExceptions" class="mb-4" />

        <WikiCallout label="Venue Rules" icon="mdi-information-outline" color="blue">
          While exceptions exist for personal travel, official tournaments and public facilities
          strictly enforce the six-Pokémon limit for all competitive events.
        </WikiCallout>
      </WikiCard>

      <WikiCard title="Travel Permits" icon="mdi-map-check" color="blue">
        <p class="text-body-1 lh-lg mb-6">
          Certain regions require specialized permits to navigate hazardous or protected
          environments. These are usually earned by completing regional trials or attaining specific
          milestones.
        </p>

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
            Transit Permits
          </v-btn>
        </div>

        <FeatureGrid :items="permits" :cols="3" />

        <WikiCallout label="Mechanics Note" icon="mdi-cog-outline" color="blue" class="mt-6">
          Permits are primarily used for flavor and narrative progression. They are not strictly
          enforced by moderators unless specified in a particular event thread.
        </WikiCallout>
      </WikiCard>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}
</style>
