<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'

const coreDivisions: FeatureItem[] = [
  {
    title: 'Ball Manufacturing',
    icon: 'mdi-pokeball',
    color: 'blue-darken-2',
    description:
      'The world’s primary production line for standard, Great, and Ultra Balls. Utilizing automated high-precision assembly to meet global trainer demand.',
  },
  {
    title: 'Advanced R&D',
    icon: 'mdi-microscope',
    color: 'blue-darken-2',
    description:
      'The birthplace of the Silph Scope and the Master Ball prototype. Currently focusing on digital-to-matter transmission and Porygon enhancement hardware.',
  },
  {
    title: 'Global Distribution',
    icon: 'mdi-truck-delivery-outline',
    color: 'blue-darken-2',
    description:
      'A logistical network spanning every major region, ensuring Pokémon Centers and Poké Marts remain stocked with essential medical supplies.',
  },
  {
    title: 'Medical Biochemistry',
    icon: 'mdi-medication',
    color: 'blue-darken-2',
    description:
      'Developing the industry standards for Potions, Revives, and Status Heals. Their proprietary formulas are the most trusted in the field.',
  },
]

const iconicInnovations: FeatureItem[] = [
  {
    title: 'The Silph Scope',
    icon: 'mdi-eye-check-outline',
    color: 'indigo-darken-1',
    description:
      'A specialized sensory tool that identifies spectral entities and unmasks illusions, famously used to resolve the Lavender Town crisis.',
  },
  {
    title: 'The Master Ball',
    icon: 'mdi-star-circle',
    color: 'purple-darken-3',
    description:
      'A theoretical pinnacle of capture technology. While not in mass production, Silph was the first to develop the 100% success rate capture matrix.',
  },
  {
    title: 'Up-Grade & Dubious Disc',
    icon: 'mdi-memory',
    color: 'teal-darken-1',
    description:
      'Transparent data storage and hardware upgrades designed specifically for the Porygon evolutionary line.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Silph Co."
      subtitle="Engineering the Future of the Pokémon League: Innovations in capture, care, and discovery."
      icon="mdi-domain"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="blue-darken-3" variant="flat" size="small">Corporate Headquarters</v-chip>
          <v-chip color="grey-darken-3" variant="flat" size="small">Saffron City, Kanto</v-chip>
          <v-chip variant="outlined" size="small">Fortune 500: #1</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="Corporate Profile" icon="mdi-office-building" class="blue-darken-3">
        <p class="text-body-1 lh-lg mb-6">
          <strong>Silph Co.</strong> is the most recognizable name in Pokémon technology. Founded on
          the principles of progress and accessibility, they revolutionized trainer equipment with
          the invention of the modern <strong>Poké Ball</strong>. Their 11-story skyscraper in
          Saffron City serves as the beating heart of Kanto’s economy, housing thousands of
          researchers and logisticians dedicated to the trainer lifestyle.
        </p>

        <FeatureGrid :items="coreDivisions" :cols="2" />
      </WikiCard>

      <WikiCard title="Innovation & Hardware" icon="mdi-tools" class="blue-darken-3">
        <p class="text-body-1 lh-lg mb-4">
          Silph Co. does not merely manufacture; they innovate. By bridging the gap between digital
          data and organic biology, Silph has produced tools that allow trainers to interact with
          the world in ways once thought impossible.
        </p>
        <v-divider class="border-opacity-75" :thickness="3" />

        <v-icon size="140" color="blue-darken-3" class="mx-auto d-flex justify-center"
          >mdi-chip</v-icon
        >
        <div
          class="text-caption mt-2 text-blue-darken-2 font-weight-bold mx-auto d-flex justify-center"
        >
          SILPH TECHNOLOGY: "ACCESSIBILITY THROUGH SCIENCE"
        </div>
        <v-divider class="border-opacity-75" :thickness="3" />
        <br />
        <FeatureGrid :items="iconicInnovations" :cols="3" />
      </WikiCard>

      <WikiCard title="Security & Historical Note" icon="mdi-shield-lock" class="grey-darken-4">
        <p class="text-body-1 lh-lg mb-4">
          Following the <strong>Saffron City Siege</strong> by Team Rocket several decades ago,
          Silph Co. has implemented world-class security protocols. All research floors are
          protected by biometric locks and localized teleportation pads to ensure that proprietary
          data—specifically the <strong>Master Ball</strong> blueprints—cannot be seized by hostile
          organizations again.
        </p>
      </WikiCard>

      <WikiCallout
        label="Corporate Responsibility"
        icon="mdi-hand-heart"
        class="mt-6 blue-lighten-1"
      >
        Silph Co. provides quarterly grants to regional Pokémon Labs and Researchers. They are a
        major financial backers of the Indigo Plateau and the Pokémon League tournament circuit.
      </WikiCallout>

      <WikiAlert type="info" class="mt-8" icon="mdi-information-outline">
        <strong>TRAINER ADVISORY:</strong> Genuine Silph Co. products are always marked with a
        holographic "S" seal. Be wary of counterfeit "Master Balls" sold through unsanctioned
        digital markets; these often result in critical failure and potential harm to both trainer
        and Pokémon.
      </WikiAlert>
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
  background-color: rgba(var(--v-theme-blue-darken-3), 0.05);
  border-color: rgba(var(--v-theme-blue-darken-3), 0.3) !important;
}

.v-theme--dark :deep(.feature-card) {
  background-color: rgba(21, 101, 192, 0.05);
  border-color: rgba(21, 101, 192, 0.2) !important;
}
</style>
