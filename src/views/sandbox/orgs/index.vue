<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'

const publicSector = [
  {
    title: 'Pokémon Association',
    icon: 'mdi-pokeball',
    color: 'green',
    description:
      'The primary governing body responsible for League legislation, regional borders, and the global trainer registry.',
    to: '/sandbox/orgs/poke-association',
  },
  {
    title: 'Activities Committee',
    icon: 'mdi-account-group',
    color: 'green',
    description:
      'Focuses on non-combat sanctioned events, including Contests, Pokéathlon management, and regional festivals.',
    to: '/sandbox/orgs/activities-committee',
  },
  {
    title: 'Athletics Board',
    icon: 'mdi-podium-gold',
    color: 'green',
    description:
      'A regulatory group dedicated to the physical safety of Pokémon athletes and the standardizing of stadium equipment.',
    to: '/sandbox/orgs/athletics-board',
  },
  {
    title: 'Aviation Administration Agency',
    icon: 'mdi-airplane',
    color: 'green',
    description:
      'The AAA oversees all airborne travel, from commercial regional flights to the regulation of private Fly-certified Pokémon.',
    to: '/sandbox/orgs/aviation-agency',
  },
  {
    title: 'Terrestrial Transportation Tribunal',
    icon: 'mdi-bus-stop',
    color: 'green',
    description:
      'Manages land-based infrastructure (TTT), including Magnet Train scheduling, Cycling Road tolls, and tunnel safety.',
    to: '/sandbox/orgs/transport-tribunal',
  },
  {
    title: 'Maritime Movemen Ministry',
    icon: 'mdi-waves',
    color: 'green',
    description:
      'The Ministry of Maritime Movement (MMM) controls all sea lanes, lighthouse maintenance, and S.S. fleet operations.',
    to: 'orgs/maritime-ministry',
  },
  {
    title: 'Pokemon Inspection Agency',
    icon: 'mdi-magnify-expand',
    color: 'green',
    description:
      'The PIA conducts unannounced audits of Gym Leaders to ensure they maintain the competitive integrity required by the League.',
    to: '/sandbox/orgs/inspection-agency',
  },
  {
    title: 'InterPol',
    icon: 'mdi-shield-account', // Specific to law enforcement
    color: 'green',
    description:
      'The premier global agency for combating organized crime, tracking high-profile fugitives, and investigating interdimensional threats across regional borders.',
    to: '/sandbox/orgs/inter-pol',
  },
  {
    title: 'Ranger Union',
    icon: 'mdi-nature-people', // Specific to environmental protection
    color: 'green',
    description:
      'A non-profit organization dedicated to ecosystem conservation and disaster relief, utilizing specialized Capture Stylers to foster temporary bonds with wild Pokémon.',
    to: '/sandbox/orgs/ranger-union',
  },
]

const privateSector = [
  {
    title: 'Silph Co.',
    icon: 'mdi-memory',
    color: 'green',
    description:
      'The industry leader in Poké Ball manufacturing and digital scopes, headquartered in the heart of Saffron City.',
    to: '/sandbox/orgs/silph-co',
  },
  {
    title: 'Devon Corporation',
    icon: 'mdi-cog-refresh',
    color: 'green',
    description:
      'Specialists in fossil restoration and the PokéNav system; they are the primary technological driver of the Hoenn region.',
    to: '/sandbox/orgs/devon-corp',
  },
  {
    title: 'Altru Inc.',
    icon: 'mdi-leaf',
    color: 'green',
    description:
      'Once a shadow of its former self in Almia, it has pivoted toward legitimate environmental energy research and conservation.',
    to: '/sandbox/orgs/altru-inc',
  },
  {
    title: 'Aether Foundation',
    icon: 'mdi-shield-sun',
    color: 'green',
    description:
      'An Alola-based organization focused on Pokémon rehabilitation and the study of extra-dimensional Ultra Wormholes.',
    to: '/sandbox/orgs/aether-foundation',
  },
  {
    title: 'Macro Cosmos',
    icon: 'mdi-factory',
    color: 'green',
    description:
      'The massive Galar conglomerate that manages the region’s energy crisis solutions and the televised League circuit.',
    to: '/sandbox/orgs/macro-cosmos',
  },
  {
    title: 'Lysandre Labs',
    icon: 'mdi-flask-outline',
    color: 'green',
    description:
      'A Kalos tech giant focusing on Mega Evolution energy, urban lighting, and high-end Holo Caster development.',
    to: '/sandbox/orgs/lysandre-labs',
  },
  {
    title: 'Team Plasma',
    icon: 'mdi-hands-pray',
    color: 'green',
    description:
      'The reformed sect of Plasma members dedicated to the peaceful atonement and rescue of mistreated Pokémon.',
    to: '/sandbox/orgs/plasma',
  },
]

const underground = [
  {
    title: 'Rocket Remnants',
    icon: 'mdi-incognito',
    color: 'green',
    description:
      'Scattered cells of the original syndicate still involved in illegal poaching and the underground sale of rare species.',
    to: '/sandbox/orgs/rocket',
  },
  {
    title: 'Magma Remnants',
    icon: 'mdi-fire-alert',
    color: 'green',
    description:
      'Underground geologists and extremists still obsessed with expanding regional landmasses through illicit means.',
    to: '/sandbox/orgs/magma',
  },
  {
    title: 'Aqua Remnants',
    icon: 'mdi-water-alert',
    color: 'green',
    description:
      'Radical environmentalists operating from hidden sea bases, continuing their mission to raise the global water level.',
    to: '/sandbox/orgs/aqua',
  },
  {
    title: 'Galactic Remnants',
    icon: 'mdi-orbit',
    color: 'green',
    description:
      'A shadowy group of scientists in Sinnoh aiming to harvest energy from space-time distortions.',
    to: '/sandbox/orgs/galactic',
  },
  {
    title: 'Neo Team Plasma',
    icon: 'mdi-sword-cross',
    color: 'green',
    description:
      'The violent splinter group of the original Plasma, utilizing the Frigate to enforce Pokémon liberation by force.',
    to: '/sandbox/orgs/neo-plasma',
  },
  {
    title: 'Flare Remnants',
    icon: 'mdi-glasses',
    color: 'green',
    description:
      'Elite, wealthy extremists from Kalos who still believe in creating a "beautiful world" through mass elimination.',
    to: '/sandbox/orgs/flare',
  },
  {
    title: 'Team Dim Sun',
    icon: 'mdi-weather-night',
    color: 'green',
    description:
      'A criminal organization in Almia using Minimo and Gigamo units to control Pokémon for industrial gain.',
    to: '/sandbox/orgs/dim-sun',
  },
  {
    title: 'Pinchers & Societea',
    icon: 'mdi-hand-back-right',
    color: 'green',
    description:
      'Oblivia-based groups using specialized "Control Gauntlets" to force Pokémon into mechanical subservience.',
    to: '/sandbox/orgs/pinchers',
  },
  {
    title: 'Cipher & Snagem',
    icon: 'mdi-skull-crossbones',
    color: 'green',
    description:
      'The masterminds behind the Shadow Pokémon process in Orre, specializing in the closing of Pokémon hearts.',
    to: '/sandbox/orgs/cipher',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Global Organizations"
      subtitle="A comprehensive directory of the agencies, corporations, and syndicates that operate across the known regions."
      icon="mdi-domain"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="green-darken-2" variant="flat" size="small">Lore Directory</v-chip>
          <v-chip color="green-darken-2" variant="outlined" size="small">World Building</v-chip>
          <v-chip variant="tonal" size="small">Last Updated: 2026</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="Public Sector & Governance" icon="mdi-bank-outline" color="green">
        <p class="text-body-1 lh-lg mb-6">
          These organizations comprise the civil infrastructure of the Pokémon world. Supported by
          taxes and League fees, they ensure that training remains a safe, regulated, and
          professional pursuit for all citizens.
        </p>
        <FeatureGrid :items="publicSector" :cols="3" default-color="green" />
      </WikiCard>

      <WikiCard title="Private Corporations" icon="mdi-office-building-cog-outline" color="green">
        <p class="text-body-1 lh-lg mb-6">
          Innovation in the Pokémon world is driven by private enterprise. These corporations
          develop the tools Trainers use every day, from the balls on their belts to the PCs in the
          Centers.
        </p>
        <FeatureGrid :items="privateSector" :cols="3" default-color="green" />
      </WikiCard>

      <WikiCard title="The Underground" icon="mdi-alert-octagon-outline" color="green">
        <p class="text-body-1 lh-lg mb-6">
          While the great syndicates of the past have mostly fallen, their remnants still haunt the
          shadows of the world. These groups operate outside the law, often utilizing stolen or
          experimental technology.
        </p>
        <WikiCallout label="Security Warning" icon="mdi-shield-alert" color="green">
          Interacting with these remnants in RP often carries high-risk consequences, including
          potential bounties or pursuit by the International Police.
        </WikiCallout>
        <FeatureGrid :items="underground" :cols="3" default-color="green" />
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
