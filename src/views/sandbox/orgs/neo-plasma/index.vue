<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'

const remnantThreats: FeatureItem[] = [
  {
    title: 'Technological Guerrillas',
    icon: 'mdi-router-wireless-settings',
    color: 'cyan-darken-2',
    description:
      'Operating in decentralized cells, remnants utilize salvaged Plasma Frigate technology to disrupt public comms and energy grids across Unova and beyond.',
  },
  {
    title: 'Radicalization Cells',
    icon: 'mdi-account-group-outline',
    color: 'cyan-darken-2',
    description:
      'Targeting disillusioned trainers, these cells continue to preach Ghetsis’s final vision of a "Power-Balanced" world, often leading to localized extremist outbreaks.',
  },
  {
    title: 'Illegal Research Labs',
    icon: 'mdi-microscope',
    color: 'cyan-darken-2',
    description:
      'Subterranean facilities focused on forced Pokémon evolution and the synthesis of "Colress Machines" to override Pokémon willpower.',
  },
  {
    title: 'Kyurem Fundamentalism',
    icon: 'mdi-snowflake-melt',
    color: 'cyan-darken-2',
    description:
      'A fanatical belief in returning the region to "Absolute Zero." These members actively search for any trace of the DNA Splicers or glacial energy residues.',
  },
]

const primaryFugitives = [
  {
    title: 'Colress (Priority: Alpha)',
    icon: 'mdi-incognito-circle',
    color: 'blue-grey-darken-3',
    description:
      'Status: At Large. Last sighted in the Alola region. He continues to evade international law, providing high-tech armaments to splinter cells in exchange for research data.',
  },
  {
    title: 'The Shadow Triad',
    icon: 'mdi-ghost-outline',
    color: 'blue-grey-darken-3',
    description:
      'Status: Operational. These elite enforcers remain Ghetsis’s most loyal shadows, specialized in the extraction of high-value personnel and the retrieval of lost Plasma assets.',
  },
  {
    title: 'The Zealot Lieutenants',
    icon: 'mdi-account-hard-hat',
    color: 'blue-grey-darken-3',
    description:
      'Status: Various. High-ranking grunts who escaped the Frigate’s crash. They lack a central leader but possess the tactical knowledge to stage small-scale insurrections.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Neo Plasma"
      subtitle="Classified Briefing: Monitoring the fragmented extremist cells and high-priority fugitives following the Unova Crisis."
      icon="mdi-shield-search"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="blue-grey-darken-4" variant="flat" size="small">Status: Fragmented</v-chip>
          <v-chip color="cyan-darken-3" variant="flat" size="small">Extremist Risk: High</v-chip>
          <v-chip variant="outlined" size="small">International Fugitive Pursuit</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard
        title="Post-Frigate Extremism"
        icon="mdi-map-marker-alert"
        class="blue-grey-darken-4"
      >
        <p class="text-body-1 lh-lg mb-6">
          Following the collapse of the <strong>Plasma Frigate</strong> and the psychic break of
          Ghetsis Harmonia, the organization has shattered into disparate, autonomous
          <strong>Remnant Cells</strong>. While no longer a unified army, these fragments are
          arguably more dangerous due to their unpredictability and continued possession of
          high-grade paramilitary equipment.
        </p>

        <FeatureGrid :items="remnantThreats" :cols="2" />
      </WikiCard>

      <WikiCard
        title="The Fugitive Watchlist"
        icon="mdi-account-details"
        class="blue-grey-darken-4"
      >
        <p class="text-body-1 lh-lg mb-4">
          The International Police (including agents such as <strong>Looker</strong>) maintain an
          active pursuit of high-ranking Neo Plasma members. Despite multiple sightings, the
          leadership remains elusive, often utilizing cloaking technology and secret trans-regional
          tunnels.
        </p>
        <v-divider class="border-opacity-75" :thickness="3" />

        <v-icon size="140" color="blue-grey-darken-3" class="mx-auto d-flex justify-center"
          >mdi-account-question</v-icon
        >
        <div
          class="text-caption mt-2 text-blue-grey-darken-1 font-weight-bold mx-auto d-flex justify-center"
        >
          REPORT SIGHTINGS TO THE INTERNATIONAL POLICE IMMEDIATELY
        </div>
        <v-divider class="border-opacity-75" :thickness="3" />
        <br />
        <FeatureGrid :items="primaryFugitives" :cols="3" />
      </WikiCard>

      <WikiCard title="The Colress Variable" icon="mdi-flask-alert" class="cyan-darken-4">
        <p class="text-body-1 lh-lg mb-4">
          The most significant ongoing risk is the amoral brilliance of <strong>Colress</strong>.
          While he appears to have no interest in ruling Unova, his willingness to supply
          <strong>"Colress Machine"</strong> variants to extremists in exchange for behavioral data
          on "Pokémon under duress" makes him an enabler of high-level maritime and land-based
          terrorism.
        </p>
      </WikiCard>

      <WikiCallout label="A Note on the Ex-Plasma" icon="mdi-home-heart" class="mt-6 teal-darken-3">
        Distinction must be maintained between Neo Plasma Remnants and the Reformed Team Plasma. The
        latter, under N’s influence, actively assists the International Police in tracking down
        extremist cells to prevent further damage to the reputation of their former partners.
      </WikiCallout>
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
  background-color: rgba(var(--v-theme-blue-grey-darken-4), 0.05);
  border-color: rgba(var(--v-theme-blue-grey-darken-4), 0.3) !important;
}

.v-theme--dark :deep(.feature-card) {
  background-color: rgba(96, 125, 139, 0.05);
  border-color: rgba(96, 125, 139, 0.2) !important;
}
</style>
