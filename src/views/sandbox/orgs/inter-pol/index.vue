<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'

const interpolRoles = [
  {
    title: 'Organized Crime',
    icon: 'mdi-shield-search',
    color: 'blue',
    description:
      'Targeting syndicates like Team Rocket or Galactic that exploit Pokémon for power.',
  },
  {
    title: 'Species Protection',
    icon: 'mdi-paw',
    color: 'blue',
    description:
      'Investigating illegal trafficking and poaching to ensure the welfare of all species.',
  },
  {
    title: 'Global Threat Response',
    icon: 'mdi-alert-decagram',
    color: 'blue',
    description: 'Addressing Legendary disturbances and interdimensional anomalies.',
  },
  {
    title: 'Cross-Regional Intel',
    icon: 'mdi-earth',
    color: 'blue',
    description:
      'Facilitating intelligence sharing between regions to disrupt global criminal networks.',
  },
]

const interpolBranches = [
  {
    title: 'General Investigations',
    icon: 'mdi-magnify',
    color: 'blue',
    description: 'The largest branch, handling standard theft, fraud, and regional offenses.',
  },
  {
    title: 'Organized Crime Task Force',
    icon: 'mdi-account-group',
    color: 'blue',
    description: 'Focuses on dismantling villainous teams from grunts to high-ranking executives.',
  },
  {
    title: 'Ultra Space Division',
    icon: 'mdi-space-invaders',
    color: 'blue',
    description:
      'Classified unit investigating Ultra Wormholes and otherworldly Legendary threats.',
  },
  {
    title: 'Cybercrime Division',
    icon: 'mdi-server-security',
    color: 'blue',
    description: 'Tracks digital crimes, including hacked Pokédexes and illegal online trades.',
  },
]

const interpolRanks = [
  {
    title: 'Recruit',
    icon: 'mdi-badge-account-outline',
    description: 'Entry-level agents undergoing basic training.',
    color: 'blue',
  },
  {
    title: 'Officer',
    icon: 'mdi-police-badge',
    description: 'Field agents assigned a partner Pokémon for patrols.',
    color: 'blue',
  },
  {
    title: 'Detective',
    icon: 'mdi-incognito',
    description: 'Specialized undercover investigators for complex cases.',
    color: 'blue',
  },
  {
    title: 'Lieutenant',
    icon: 'mdi-chevron-triple-up',
    description: 'Strategic planners managing regional operations.',
    color: 'blue',
  },
  {
    title: 'Commander',
    icon: 'mdi-star-outline',
    description: 'Regional directors for Kanto, Sinnoh, etc.',
    color: 'blue',
  },
  {
    title: 'Director',
    icon: 'mdi-crown-outline',
    description: 'Global head elected by the International Council.',
    color: 'blue',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="InterPol"
      subtitle="The International Police Organization dedicated to maintaining peace and justice across the Pokémon world."
      icon="mdi-shield-account"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="blue-darken-2" variant="flat" size="small">Global Jurisdiction</v-chip>
          <v-chip color="blue-darken-2" variant="flat" size="small">Law Enforcement</v-chip>
          <v-chip variant="outlined" size="small">Established 1996</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="Agency Overview" icon="mdi-information-outline" color="blue">
        <p class="text-body-1 lh-lg">
          The International Police, commonly known as <strong>InterPol</strong>, is the premier
          global law enforcement agency in the Pokémon world. Operating under a unified
          international charter, InterPol coordinates efforts to tackle threats that transcend
          regional boundaries. From the streets of Saffron City to the wilds of Paldea, InterPol
          collaborators—including Pokémon Rangers and Gym Leaders—work to ensure safety for both
          humans and Pokémon.
        </p>
      </WikiCard>

      <WikiCard title="Mission Scope" icon="mdi-target" color="blue">
        <p class="text-body-1 lh-lg mb-6">
          InterPol's primary mission is to prevent and investigate crimes that threaten global
          stability. Agents are trained in Pokémon battling, forensic investigation, and diplomacy.
        </p>
        <FeatureGrid :items="interpolRoles" :cols="2" />
      </WikiCard>

      <WikiCard title="Specialized Divisions" icon="mdi-sitemap-outline" color="blue">
        <p class="text-body-1 lh-lg mb-6">
          To address the diverse threats of a modern world, InterPol is divided into specialized
          units with unique technical training.
        </p>
        <FeatureGrid :items="interpolBranches" :cols="2" />
      </WikiCard>

      <WikiCard title="Rank Structure" icon="mdi-medal-outline" color="blue">
        <p class="text-body-1 lh-lg mb-6">
          Authority within InterPol is modeled after global police hierarchies, reflecting the
          experience and responsibility of each agent.
        </p>
        <FeatureGrid :items="interpolRanks" :cols="3" />

        <WikiCallout
          label="Specialist Designations"
          icon="mdi-certificate-outline"
          color="blue"
          class="mt-8"
        >
          Agents may earn <strong>Specialist Designations</strong> (e.g., Ultra Space Specialist)
          based on their technical expertise, granting them operational authority regardless of
          rank.
        </WikiCallout>
      </WikiCard>

      <WikiCard title="Careers in InterPol" icon="mdi-account-plus-outline" color="blue">
        <v-row align="center">
          <v-col cols="12" md="8">
            <p class="text-body-1 lh-lg">
              Are you ready to protect the world? Prospective officers are required to undergo
              rigorous physical, mental, and Pokémon battle assessments.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-btn
              block
              size="large"
              color="blue-darken-2"
              variant="elevated"
              prepend-icon="mdi-file-document-edit-outline"
              to="/sandbox/orgs/inter-pol/recruitment"
            >
              View Requirements
            </v-btn>
          </v-col>
        </v-row>
      </WikiCard>
      <WikiCard title="InterPol's Most Wanted" icon="mdi-account-plus-outline" color="blue">
        <v-row align="center">
          <v-col cols="12" md="8">
            <p class="text-body-1 lh-lg">
              InterPol offers generous rewards to those who can provide verifiable evidence in the capture of wanted criminals on their bounty list.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-btn
              block
              size="large"
              color="blue-darken-2"
              variant="elevated"
              prepend-icon="mdi-file-document-edit-outline"
              to="/sandbox/orgs/inter-pol/bounties"
            >
              Bounties
            </v-btn>
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

/* Lore-styled Feature Cards */
:deep(.feature-card) {
  border-style: dashed !important;
  background-color: rgba(var(--v-theme-blue-darken-2), 0.02);
}
</style>
