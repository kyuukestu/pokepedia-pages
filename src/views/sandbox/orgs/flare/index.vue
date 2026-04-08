<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'

const organizationalTenets = [
  {
    title: 'The Aesthetic Purge',
    icon: 'mdi-eye-outline',
    color: 'red-darken-2',
    description:
      'The belief that the world is overcrowded and ugly, and that only those with the "beauty" (and the funds) to belong should survive.',
  },
  {
    title: 'Ultimate Weaponry',
    icon: 'mdi-pillar',
    color: 'red-darken-2',
    description:
      'Ancient Kalosian technology powered by the life energy of Pokémon, intended to reset the global population.',
  },
  {
    title: 'Lumiose Integration',
    icon: 'mdi-city-variant-outline',
    color: 'red-darken-2',
    description:
      'A modern shift toward urban development, with former members utilizing their technical skills to rebuild the city.',
  },
  {
    title: 'Holocaster Network',
    icon: 'mdi-video-wireless',
    color: 'red-darken-2',
    description:
      'Information control through the region’s primary communication device, once used for propaganda and tracking.',
  },
]

const nouveauProjects = [
  {
    title: 'Nouveau Café',
    icon: 'mdi-coffee',
    color: 'orange-darken-3',
    description:
      'A chic hub in Lumiose where former members gather to discuss fashion, urban planning, and high-end gastronomy.',
  },
  {
    title: 'Nouveau Food Truck',
    icon: 'mdi-truck-fast',
    color: 'orange-darken-3',
    description:
      "A mobile unit providing luxury-grade sustenance to workers engaged in the city's redevelopment projects.",
  },
  {
    title: 'Sustainable Beauty',
    icon: 'mdi-leaf',
    color: 'orange-darken-3',
    description:
      'The shift from "cleansing" the earth to "curating" it through ecological preservation and urban greenery.',
  },
]

const notableFigures = [
  {
    title: 'Lysandre (The Visionary)',
    icon: 'mdi-crown',
    color: 'red-darken-2',
    description:
      'The late leader who sought to preserve beauty through destruction. His whereabouts remain officially unconfirmed.',
  },
  {
    title: 'The Reformed Scientists',
    icon: 'mdi-flask-round-bottom',
    color: 'red-darken-2',
    description:
      'The former "Five Scientists" (Aliana, Bryony, Celosia, Mable, Xerosic) have largely been detained or transitioned into state-supervised research.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Team Flare"
      subtitle="Once a cult of luxury and extinction, now a diaspora of survivors integrated into the heart of Lumiose City."
      icon="mdi-fire"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="red-darken-2" variant="flat" size="small">Defunct Syndicate</v-chip>
          <v-chip color="orange-darken-3" variant="flat" size="small">Nouveau Movement</v-chip>
          <v-chip variant="outlined" size="small">HQ: Lysandre Labs (Seized)</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="A Beautiful World" icon="mdi-flower-pollen" class="red-darken-2">
        <p class="text-body-1 lh-lg mb-6">
          <strong>Team Flare</strong> was a secret society that operated under the guise of an elite
          social club. Members paid astronomical fees to join, believing they were securing a future
          in a world purged of "unpleasantness." Their plan relied on the
          <strong>Ultimate Weapon</strong>, an ancient crystalline pillar powered by the life force
          of Pokémon.
        </p>
        <FeatureGrid :items="organizationalTenets" :cols="2" />
      </WikiCard>

      <WikiCard
        title="The Nouveau Flare Initiative"
        icon="mdi-palette-swatch"
        class="my-6 nouveau-focus orange-darken-3"
      >
        <p class="text-body-1 lh-lg mb-4">
          With the fall of Lysandre, the "Nouveau" philosophy emerged. This reformed sect believes
          that beauty is not found in extinction, but in <strong>cultivation</strong>. Instead of
          hiding in secret labs, <strong>Nouveau Flare</strong> has become a very public part of
          Lumiose's social fabric.
        </p>
        <p class="text-body-1 lh-lg mb-4">
          The <strong>Nouveau Café</strong> serves as the movement's unofficial headquarters,
          focusing on high-end cuisine and "aesthetic hospitality." Meanwhile, their signature
          <strong>Food Truck</strong> roams the boulevards, feeding the workers building the future
          of the city.
        </p>
        <v-divider class="border-opacity-75" :thickness="3" />
        <v-icon size="160" color="orange-darken-4 mx-auto d-flex flex-wrap justify-center"
          >mdi-silverware-fork-knife</v-icon
        >
        <div
          class="text-h6 mt-2 font-weight-bold text-orange-darken-4 mx-auto d-flex flex-wrap justify-center"
        >
          Nouveau Dining
        </div>
        <div class="text-caption mx-auto d-flex flex-wrap justify-center">
          "Sustaining the Beautiful Few"
        </div>
        <v-divider class="border-opacity-75" :thickness="3" />
        <br />
        <FeatureGrid :items="nouveauProjects" :cols="1" />
      </WikiCard>

      <WikiCard
        title="Urban Redevelopment"
        icon="mdi-hammer-wrench"
        class="my-6 luxury-focus amber-darken-3"
      >
        <v-row align="center">
          <v-col cols="12" md="8">
            <p class="text-body-1 lh-lg mb-4">
              In the wake of the Geosenge incident, the survivors of Team Flare have taken diverse
              paths. Within <strong>Lumiose City</strong>, several former high-ranking researchers
              now assist the Professor in documenting regional Mega Evolution phenomena.
            </p>
            <p class="text-body-1 lh-lg">
              Many low-level grunts have repurposed their iconic orange suits into merchant attire,
              running high-end boutiques and specialty stalls throughout the city's plazas. They
              provide rare evolutionary stones and luxury items, contributing to the city's
              redevelopment plan.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon size="120" color="red-darken-2">mdi-store-clock-outline</v-icon>
            <div class="text-caption mt-2 text-amber-darken-4 font-weight-bold">
              MERCHANT STATUS: ACTIVE
            </div>
          </v-col>
        </v-row>
      </WikiCard>

      <WikiCard
        title="The Legacy of Lysandre Labs"
        icon="mdi-frequently-asked-questions"
        class="red-darken-2"
      >
        <p class="text-body-1 lh-lg mb-4">
          While the organization is gone, their technological footprint remains. The
          <strong>Holocaster</strong>
          has been fully nationalized, and the lab facilities in Lumiose have been repurposed for
          civil engineering projects, focusing on the city's massive "ZA" infrastructure upgrade.
        </p>
        <FeatureGrid :items="notableFigures" :cols="2" />
      </WikiCard>

      <WikiAlert type="info" class="mt-8" icon="mdi-information">
        <strong>RECOGNITION NOTICE:</strong> Team Flare’s "Ultimate Weapon" remains in a dormant
        state beneath Geosenge Town. The area is a restricted zone under International Police
        surveillance.
      </WikiAlert>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

.luxury-focus {
  background: linear-gradient(
    135deg,
    rgba(255, 193, 7, 0.1) 0%,
    rgba(18, 18, 18, 0.6) 100%
  ) !important;
  border: 1px solid rgba(255, 193, 7, 0.3) !important;
}

.nouveau-focus {
  background: linear-gradient(
    135deg,
    rgba(255, 152, 0, 0.15) 0%,
    rgba(33, 33, 33, 0.6) 100%
  ) !important;
  border: 1px solid rgba(255, 152, 0, 0.4) !important;
}

:deep(.feature-card) {
  border-style: solid !important;
  border-width: 1px;
  background-color: rgba(var(--v-theme-red-darken-2), 0.05);
  border-color: rgba(var(--v-theme-red-darken-2), 0.3) !important;
}
</style>
