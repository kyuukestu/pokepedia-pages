<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'

const coreMissions = [
  {
    title: 'Pokémon Rehabilitation',
    icon: 'mdi-hospital-marker',
    color: 'green',
    description:
      'Providing a sanctuary for injured or mistreated Pokémon within the specialized climate-controlled zones of Aether Paradise.',
  },
  {
    title: 'Ultra Beast Research',
    icon: 'mdi-space-invaders',
    color: 'green',
    description:
      'Studying extra-dimensional phenomena and developing technologies like Beast Balls to safely manage Ultra Beast incursions.',
  },
  {
    title: 'Ecological Interventions',
    icon: 'mdi-weather-cloudy-alert',
    color: 'green',
    description:
      'Active management of Alola’s ecosystems, ranging from invasive species removal to the relocation of endangered populations.',
  },
  {
    title: 'Surgical Gene-Slinging',
    icon: 'mdi-dna',
    color: 'green',
    description:
      'A controlled program focusing on the spread of specific moves within wild populations to help them self-regulate against threats.',
  },
]

const conservationProjects = [
  {
    title: 'Invasive Mitigation',
    icon: 'mdi-shield-remove',
    color: 'green',
    description:
      'Employing Trainers to help restrain or remove species that threaten the delicate balance of Alolan islands.',
  },
  {
    title: 'Habitat Restoration',
    icon: 'mdi-pine-tree',
    color: 'green',
    description:
      'Reintroducing native Pokémon to areas suffering from urban sprawl or natural disasters.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Aether Foundation"
      subtitle="The premier conservation and research organization of the Alola region, operating from the artificial paradise."
      icon="mdi-shield-sun"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="green-darken-2" variant="flat" size="small">Rehabilitative Science</v-chip>
          <v-chip color="green-darken-2" variant="flat" size="small">Ecological Authority</v-chip>
          <v-chip variant="outlined" size="small">Headquarters: Aether Paradise</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="A New Era of Conservation" icon="mdi-account-group-outline" color="green">
        <p class="text-body-1 lh-lg mb-6">
          The <strong>Aether Foundation</strong> is dedicated to the protection and study of Pokémon
          across the Alola region and beyond. Operating from <strong>Aether Paradise</strong>—a
          massive, floating artificial island—the foundation serves as a sanctuary for Pokémon
          targeted by poachers or harmed by environmental changes.
        </p>
        <p class="text-body-1 lh-lg mb-6">
          Following a period of internal upheaval and high-level controversy, the foundation has
          been completely reformed. Under new leadership, Aether has shifted its focus away from
          personal obsession and toward transparent, proactive ecological preservation and the safe
          management of <strong>Ultra Space</strong> anomalies.
        </p>
        <FeatureGrid :items="coreMissions" :cols="2" />
      </WikiCard>

      <WikiCard title="Active Conservation Projects" icon="mdi-handshake-outline" color="green">
        <p class="text-body-1 lh-lg mb-4">
          The Aether Foundation regularly initiates <strong>Conservation Projects</strong>, a unique
          class of field event where Trainers are recruited as auxiliary manpower. These
          interventions are often surgical and data-driven, requiring Trainers to follow strict
          protocols to ensure ecosystem stability.
        </p>
        <v-divider class="border-opacity-75" :thickness="3" />
        <v-icon size="140" color="green-darken-1" class="mx-auto d-flex flex-wrap justify-center"
          >mdi-island</v-icon
        >
        <div class="text-caption mt-2 text-medium-emphasis mx-auto d-flex flex-wrap justify-center">
          Aether Paradise: The Heart of Alolan Research
        </div>
        <v-divider class="border-opacity-75" :thickness="3" />
        <br />
        <FeatureGrid :items="conservationProjects" :cols="2" />
      </WikiCard>

      <WikiCard title="Scientific Intervention" icon="mdi-flask-round-bottom" color="green">
        <p class="text-body-1 lh-lg mb-4">
          Beyond simple relocation, Aether utilizes advanced ecological strategies to protect the
          "natural order." This includes the <strong>Surgical Move Integration</strong> program,
          where specific moves are taught to keystone species to help them better defend against
          aggressive invasive populations without human presence.
        </p>

        <WikiCallout
          label="Trainer Opportunity"
          icon="mdi-briefcase-check"
          color="green"
          class="mt-6"
        >
          In RP, participating in Aether projects allows Trainers to earn specialized rewards, such
          as
          <strong>Beast Balls</strong> or access to the foundation’s private rehabilitation data.
        </WikiCallout>
      </WikiCard>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

:deep(.feature-card) {
  border-style: dashed !important;
  background-color: rgba(var(--v-theme-green-darken-2), 0.02);
}
</style>
