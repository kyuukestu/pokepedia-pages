<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'

const rocketScars: FeatureItem[] = [
  {
    title: 'Black Market Syndicates',
    icon: 'mdi-currency-usd-off',
    color: 'red-darken-4',
    description:
      'Fragmented gangs still utilize old Rocket supply lines to traffic rare Pokémon, specifically targeting high-value species like Dratini and Porygon.',
  },
  {
    title: 'Genetic Malpractice',
    icon: 'mdi-dna',
    color: 'red-darken-4',
    description:
      'The legacy of the "Mewtwo Project" remains a warning. Rumors persist of independent labs attempting to replicate Rocket’s early cloning and gene-splicing data.',
  },
  {
    title: 'Shadow Infrastructure',
    icon: 'mdi-tunnel',
    color: 'red-darken-4',
    description:
      'Subterranean tunnels and hidden "Switch Rooms" still exist beneath Kanto. While many are sealed, some are occupied by squatters and "R-Cult" fanatics.',
  },
  {
    title: 'Extortionist Roots',
    icon: 'mdi-handshake-outline',
    color: 'red-darken-4',
    description:
      'The original Rocket business model—charging "protection fees" from Pokémon businesses—has been adopted by minor street gangs in the larger metropolises.',
  },
]

const missingPersonnel: FeatureItem[] = [
  {
    title: 'Giovanni (Priority: Zero)',
    icon: 'mdi-account-question',
    color: 'grey-darken-3',
    description:
      'Status: Unknown. The former Viridian Gym Leader vanished after his defeat at Tohjo Falls. No remains have ever been found; he remains the world’s most famous cold case.',
  },
  {
    title: 'The Executive Remnants',
    icon: 'mdi-account-tie-outline',
    color: 'grey-darken-3',
    description:
      'Archer, Ariana, Petrel, and Proton. Following the Radio Tower failure, the "Four Executives" scattered. Intelligence suggests they operate as freelance consultants for newer evil teams.',
  },
  {
    title: 'The "Silver" Connection',
    icon: 'mdi-relation-many-to-one',
    color: 'grey-darken-3',
    description:
      'While the son of the Boss remains under observation, he has shown zero inclination toward the family business, actively working to suppress Rocket-related uprisings.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Team Rocket"
      subtitle="The Syndicate of the Red 'R': Analyzing the historical impact and modern-day remnants of the world's first organized criminal team."
      icon="mdi-rocket-launch-outline"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="red-darken-4" variant="flat" size="small">Status: Dissolved</v-chip>
          <v-chip color="grey-darken-4" variant="flat" size="small">Cold Case: Active</v-chip>
          <v-chip variant="outlined" size="small">Legacy: Organized Crime</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="The Legacy of the 'R'" icon="mdi-history" class="red-darken-4">
        <p class="text-body-1 lh-lg mb-6">
          Unlike the ideologically driven teams of other regions, <strong>Team Rocket</strong> was
          defined by profit, exploitation, and the cold-blooded pursuit of power. Under the
          leadership of Giovanni, they turned Pokémon into tools for a global crime syndicate.
          Today, their influence is felt not in a unified front, but in the fractured
          <strong>Shadow Markets</strong> and the ethical questions left by their bio-engineering
          experiments.
        </p>

        <FeatureGrid :items="rocketScars" :cols="2" />
      </WikiCard>

      <WikiCard title="The Missing Command" icon="mdi-incognito" class="grey-darken-4">
        <p class="text-body-1 lh-lg mb-4">
          The disappearance of the high command left the organization without its central nervous
          system. International Police agencies maintain the "Giovanni Watch" to this day, fearing
          that the Boss may be biding his time, waiting for the perfect moment to return and reclaim
          the criminal underworld.
        </p>
        <v-divider class="border-opacity-75" :thickness="3" />

        <v-icon size="140" color="red-darken-4" class="mx-auto d-flex justify-center"
          >mdi-shield-off-outline</v-icon
        >
        <div
          class="text-caption mt-2 text-red-darken-4 font-weight-bold mx-auto d-flex justify-center"
        >
          WARNING: EXTREMELY DANGEROUS INDIVIDUALS AT LARGE
        </div>
        <v-divider class="border-opacity-75" :thickness="3" />
        <br />
        <FeatureGrid :items="missingPersonnel" :cols="3" />
      </WikiCard>

      <WikiCard title="Repurposed Facilities" icon="mdi-office-building-cog" class="grey-darken-4">
        <p class="text-body-1 lh-lg mb-4">
          Following the various "Rocket Purges," their infamous underground bases have been
          reclaimed and renovated by local governments:
        </p>
        <v-list density="compact" bg-color="transparent">
          <v-list-item prepend-icon="mdi-controller">
            <v-list-item-title><strong>Celadon Game Corner:</strong></v-list-item-title>
            <v-list-item-subtitle
              >The basement is now a high-security regional server hub and data
              archive.</v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item prepend-icon="mdi-store">
            <v-list-item-title><strong>Mahogany Town:</strong></v-list-item-title>
            <v-list-item-subtitle
              >The "Gift Shop" basement is a public museum and historical site dedicated to the Red
              Gyarados incident.</v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item prepend-icon="mdi-radio-tower">
            <v-list-item-title><strong>Goldenrod Radio Tower:</strong></v-list-item-title>
            <v-list-item-subtitle
              >Now the headquarters for Global Link broadcasting, featuring state-of-the-art
              anti-hijack protocols.</v-list-item-subtitle
            >
          </v-list-item>
        </v-list>
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
  background-color: rgba(var(--v-theme-red-darken-4), 0.05);
  border-color: rgba(var(--v-theme-red-darken-4), 0.3) !important;
}

.v-theme--dark :deep(.feature-card) {
  background-color: rgba(183, 28, 28, 0.05);
  border-color: rgba(183, 28, 28, 0.2) !important;
}
</style>
