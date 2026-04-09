<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'

// Data for the summary section
const idOptions: FeatureItem[] = [
  {
    title: 'Trainer Card',
    icon: 'mdi-card-account-details',
    description: 'Traditional microchip card.',
    to: '#trainer-card',
  },
  {
    title: 'Passport',
    icon: 'mdi-passport',
    description: 'High-tech travel booklet.',
    to: '#trainer-passport',
  },
  {
    title: 'League Card',
    icon: 'mdi-cards',
    description: 'Personalized trading cards.',
    to: '#league-card',
  },
  {
    title: 'Profile App',
    icon: 'mdi-passport-biometric',
    description: 'Digital multi-device sync.',
    to: '#profile-app',
  },
]

// Features for the Trainer Card
const cardFeatures: FeatureItem[] = [
  { title: 'Microchip', icon: 'mdi-credit-card-chip', description: 'Embedded data storage' },
  { title: 'Badge Tracker', icon: 'mdi-medal', description: 'Archive Acheivements' },
  { title: 'E-Commerce', icon: 'mdi-credit-card', description: 'Transaction Capabilities' },
]

// Features for the Passport
const passportFeatures: FeatureItem[] = [
  { title: 'Stamps', icon: 'mdi-postage-stamp', description: 'Trial Stamps' },
  { title: 'Journal', icon: 'mdi-pen', description: 'Adventure logging' },
  { title: 'Extra Pages', icon: 'mdi-book-open-page-variant', description: 'Modular page support' },
]

// Features for the League Card
const leagueCFeatures: FeatureItem[] = [
  {
    title: 'Tradable',
    icon: 'mdi-swap-horizontal-variant',
    description: 'Collectible Trading-Cards',
  },
  { title: 'Stats Display', icon: 'mdi-chart-line', description: 'Display Battle Statistics' },
  { title: 'Rare Variants', icon: 'mdi-star-circle', description: 'Coveted & Unique' },
]

// Features for the Profile App
const appFeatures: FeatureItem[] = [
  { title: 'Multi-Device', icon: 'mdi-devices', description: 'Cross-Platform Compatibility' },
  {
    title: 'League Integration',
    icon: 'mdi-view-dashboard',
    description: 'Power of the League in the palm of your hand',
  },
  {
    title: 'Team Analytics',
    icon: 'mdi-chart-box-plus-outline',
    description: 'Optimization and Insights',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Trainer Identification"
      subtitle="Credentials, passports, and digital profiles used to verify League status across regions."
      icon="mdi-card-account-details"
      pattern="pokeball"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="blue-darken-2" variant="flat" size="small">Legal Documents</v-chip>
          <v-chip color="blue-darken-2" variant="outlined" size="small">Trainer Registry</v-chip>
          <v-chip variant="tonal" size="small">ID Version 4.2</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="Identification Styles" icon="mdi-form-select" color="blue">
        <p class="text-body-1 lh-lg mb-6">
          Depending on your home region and travel history, your Trainer ID may take several forms.
          While all are globally recognized by the League, each offers unique regional perks.
        </p>
        <FeatureGrid :items="idOptions" :cols="4" default-color="blue" />
      </WikiCard>

      <WikiCard
        id="trainer-card"
        title="Standard Trainer Card"
        icon="mdi-card-bulleted"
        color="blue"
      >
        <v-row align="center">
          <v-col cols="12" md="8">
            <p class="text-body-1 lh-lg mb-4">
              The traditional trainer card is the standard for
              <strong>Kanto, Johto, Hoenn, and Sinnoh</strong>. It is a durable physical card with
              an embedded microchip that facilitates electronic transactions and instant data
              synchronization at any Pokémon Center.
            </p>
            <FeatureGrid :items="cardFeatures" :cols="3" />
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-img
              src="https://www.serebii.net/omegarubyalphasapphire/trainercard1.jpg"
              max-width="280"
              class="mx-auto rounded-lg elevation-4 border-blue"
              alt="Trainer Card Sample"
            />
            <div class="text-caption mt-2 text-medium-emphasis">Hoenn-Issue Standard Card</div>
          </v-col>
        </v-row>
      </WikiCard>

      <WikiCard id="trainer-passport" title="Trainer Passport" icon="mdi-passport" color="blue">
        <v-row align="center">
          <v-col cols="12" md="4" class="text-center order-last order-md-first">
            <v-img
              src="https://www.serebii.net/sunmoon/trainerpassport.jpg"
              max-width="280"
              class="mx-auto rounded-lg elevation-4 border-blue"
              alt="Trainer Passport Sample"
            />
            <div class="text-caption mt-2 text-medium-emphasis">Alolan High-Tech Booklet</div>
          </v-col>
          <v-col cols="12" md="8">
            <p class="text-body-1 lh-lg mb-4">
              The Alolan Passport is a high-tech booklet designed for the Island Challenge. It
              includes physical pages for <strong>Trial Stamps</strong> and an integrated
              e-journaling pen for recording observations in the field.
            </p>
            <FeatureGrid :items="passportFeatures" :cols="3" />
          </v-col>
        </v-row>
      </WikiCard>

      <WikiCard id="league-card" title="League Trading Card" icon="mdi-cards" color="blue">
        <v-row align="center">
          <v-col cols="12" md="8">
            <p class="text-body-1 lh-lg mb-4">
              Born of the Galar region's vibrant sports culture, these cards function as both ID and
              collectible merchandise. Trainers can customize their "front" with photography while
              the "back" displays real-time battle statistics.
            </p>
            <FeatureGrid :items="leagueCFeatures" :cols="3" />
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-img
              src="https://www.serebii.net/swordshield/leaguecard.jpg"
              max-width="280"
              class="mx-auto rounded-lg elevation-4 border-blue"
              alt="League Card Sample"
            />
            <div class="text-caption mt-2 text-medium-emphasis">Galar Sports Profile</div>
          </v-col>
        </v-row>
      </WikiCard>

      <WikiCard id="profile-app" title="Digital Profile App" icon="mdi-cellphone-cog" color="blue">
        <v-row align="center">
          <v-col cols="12" md="4" class="text-center">
            <v-img
              src="https://img.game8.co/3621072/3bc3da68bd9b491bd429562f1b8937e4.png/show"
              max-width="280"
              class="mx-auto rounded-lg elevation-4 border-blue"
              alt="Profile App Sample"
            />
            <div class="text-caption mt-2 text-medium-emphasis">Smart Device Integration</div>
          </v-col>
          <v-col cols="12" md="8">
            <p class="text-body-1 lh-lg mb-4">
              The modern standard in Paldea and beyond. The Profile App syncs with your
              <strong>Rotom Phone</strong> and the Pokémon Storage System. It allows for
              instantaneous team management and public profile sharing via biometrics.
            </p>
            <FeatureGrid :items="appFeatures" :cols="3" />
          </v-col>
        </v-row>
      </WikiCard>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

.border-blue {
  border: 2px solid rgba(25, 118, 210, 0.2);
}

/* Smooth Scrolling for the FeatureGrid anchors */
:deep(html) {
  scroll-behavior: smooth;
}
</style>
