<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'

const extremistTenets: FeatureItem[] = [
  {
    title: 'Biological Purge',
    icon: 'mdi-skull-scan',
    color: 'red-darken-4',
    description:
      'The conviction that Pokémon-human coexistence is a failed experiment. To achieve peak human potential, the "wild" must be systematically eradicated.',
  },
  {
    title: 'Industrial Expansion',
    icon: 'mdi-factory',
    color: 'red-darken-4',
    description:
      'Expanding the landmass not for nature, but for sprawling megacities, labs, and resource extraction sites free from ecological restraint.',
  },
  {
    title: 'Ballistic Superiority',
    icon: 'mdi-pistol',
    color: 'red-darken-4',
    description:
      'Unlike other teams, Magma utilizes high-caliber firearms, incendiary rounds, and tactical missiles to neutralize biological threats from a distance.',
  },
  {
    title: 'Thermal Warfare',
    icon: 'mdi-fire-alert',
    color: 'red-darken-4',
    description:
      'Utilizing chemical fire and localized magma-induction bombs to "cleanse" habitats and prepare the earth for human concrete.',
  },
]

const commandStructure: FeatureItem[] = [
  {
    title: 'Maxie (The Architect)',
    icon: 'mdi-glasses',
    color: 'red-darken-4',
    description:
      'A cold, calculating intellectual who views the world as a series of equations. To him, the extinction of Pokémon is a logical necessity for human survival.',
  },
  {
    title: 'The Ordnance Admins',
    icon: 'mdi-shield-half-full',
    color: 'red-darken-4',
    description:
      'Courtney and Tabitha oversee Magma’s automated ballistic factories and subterranean testing grounds, ensuring the "Progress" continues.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Team Magma"
      subtitle="Technological supremacists seeking the eradication of Pokémon life to pave the way for ceaseless human progress."
      icon="mdi-ImageFilterHdr"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="red-darken-4" variant="flat" size="small">Industrial Extremists</v-chip>
          <v-chip color="grey-darken-4" variant="flat" size="small">Ballistic Threat</v-chip>
          <v-chip variant="outlined" size="small">Status: Paramilitary Insurgency</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="The Landmass Project" icon="mdi-crane" class="red-darken-4">
        <p class="text-body-1 lh-lg mb-6">
          <strong>Team Magma</strong> is a paramilitary scientific collective. They reject the
          "fairy tale" of harmony with nature, instead viewing Pokémon as dangerous predators and
          resource-drainers. Their ultimate objective is to trigger <strong>Groudon’s</strong>
          Primal Reversion—not to create a "paradise," but to vaporize the oceans and maximize the
          usable surface area for human industry.
        </p>

        <FeatureGrid :items="extremistTenets" :cols="2" />
      </WikiCard>

      <WikiCard title="Subterranean Ordnance" icon="mdi-bomb" class="red-darken-4">
        <p class="text-body-1 lh-lg mb-4">
          Magma operates from highly fortified <strong>Volcanic Bunkers</strong> and abandoned
          mining facilities. They are known to deploy <strong>Automated Turrets</strong> and
          long-range artillery to defend their perimeters. They do not battle for sport; they engage
          for elimination.
        </p>
        <v-divider class="border-opacity-75" :thickness="3" />

        <v-icon size="140" color="red-darken-4" class="mx-auto d-flex justify-center"
          >mdi-target</v-icon
        >
        <div
          class="text-caption mt-2 text-red-darken-2 font-weight-bold mx-auto d-flex justify-center"
        >
          WARNING: BALLISTIC ENGAGEMENT ZONE
        </div>
        <v-divider class="border-opacity-75" :thickness="3" />
        <br />
        <FeatureGrid :items="commandStructure" :cols="2" />
      </WikiCard>

      <WikiCard title="Combat Protocols" icon="mdi-shield-lock" class="red-darken-4">
        <p class="text-body-1 lh-lg mb-4">
          Engaging Magma forces is significantly different from standard Trainer combat. Their
          grunts utilize <strong>Tactical Firearms</strong> alongside Fire and Ground-type Pokémon,
          using the latter primarily as living shields or heavy demolition units.
        </p>
      </WikiCard>
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
  background-color: rgba(var(--v-theme-red-darken-4), 0.1);
  border-color: rgba(var(--v-theme-red-darken-4), 0.3) !important;
}
</style>
