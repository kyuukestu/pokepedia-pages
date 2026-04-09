<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'

const rangerRoles = [
  {
    title: 'Disaster Relief',
    icon: 'mdi-fire-truck',
    color: 'green',
    description:
      'Deploying to rescue both humans and Pokémon from natural catastrophes like forest fires, floods, or avalanches.',
  },
  {
    title: 'Habitat Protection',
    icon: 'mdi-shield-check',
    color: 'green',
    description:
      'Patrolling protected zones to prevent illegal poaching, habitat destruction, and other environmental crimes.',
  },
  {
    title: 'Eco-Restoration',
    icon: 'mdi-leaf',
    color: 'green',
    description:
      'Leading efforts to restore damaged ecosystems and rehabilitating injured wild Pokémon back into their homes.',
  },
  {
    title: 'Conflict Mediation',
    icon: 'mdi-account-group',
    color: 'green',
    description:
      'Acting as neutral parties to resolve territorial disputes between wild Pokémon and expanding human settlements.',
  },
]

const branches = [
  {
    title: 'Wildlife Protection',
    icon: 'mdi-paw',
    color: 'green',
    description:
      'The frontline against poachers and unlicensed developers threatening local flora and fauna.',
  },
  {
    title: 'Disaster Response',
    icon: 'mdi-ambulance',
    color: 'green',
    description:
      'A rapid-response unit equipped for high-stakes rescue and recovery in extreme environments.',
  },
  {
    title: 'Marine Conservation',
    icon: 'mdi-waves',
    color: 'green',
    description:
      'Specialists in aquatic ecosystems, reef protection, and Water-type Pokémon welfare.',
  },
  {
    title: 'Community Outreach',
    icon: 'mdi-account-heart',
    color: 'green',
    description:
      'Educating the public on sustainable living and fostering harmony between civilization and the wild.',
  },
  {
    title: 'Legendary Task Force',
    icon: 'mdi-folder-star',
    color: 'green',
    description:
      'An elite enclave of Rangers who track, research and defend the whereabouts of legendary pokemon.',
  },
]

const ranks = [
  {
    title: 'Trainee',
    icon: 'mdi-school',
    description: 'Recruits learning basic Pokémon handling and Capture Styler operation.',
    color: 'green',
  },
  {
    title: 'Ranger',
    icon: 'mdi-account',
    description: 'Standard field operatives partnered with a permanent companion Pokémon.',
    color: 'green',
  },
  {
    title: 'Senior Ranger',
    icon: 'mdi-account-star',
    description: 'Experienced operatives leading specialized mission squads.',
    color: 'green',
  },
  {
    title: 'Area Ranger',
    icon: 'mdi-map-marker-radius',
    description: 'Supervisors managing local Ranger Bases and regional habitat zones.',
    color: 'green',
  },
  {
    title: 'Ranger Leader',
    icon: 'mdi-account-supervisor',
    description:
      'Regional directors overseeing all organization activities within a specific region.',
    color: 'green',
  },
  {
    title: 'Top Ranger',
    icon: 'mdi-star-circle',
    description: 'Elite operatives with global jurisdiction, often handling Legendary-tier crises.',
    color: 'green',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Pokémon Rangers"
      subtitle="Guardians of the wild and protectors of the natural balance between humans and Pokémon."
      icon="mdi-shield-nature"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="green-darken-2" variant="flat" size="small">International Union</v-chip>
          <v-chip color="green-darken-2" variant="flat" size="small">Nature Conservation</v-chip>
          <v-chip variant="outlined" size="small">Independent Authority</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="The Ranger Mission" icon="mdi-earth" color="green">
        <p class="text-body-1 lh-lg">
          The <strong>Pokémon Rangers</strong> are a specialized global organization dedicated to
          protecting nature, preserving delicate ecosystems, and ensuring the harmonious coexistence
          of all living things. Unlike Trainers, Rangers do not catch Pokémon in Poké Balls to keep
          them; instead, they use <strong>Capture Stylers</strong> to form temporary bonds of
          friendship with wild Pokémon to achieve specific tasks before releasing them back to their
          habitats.
        </p>
        <p class="text-body-1 lh-lg mt-4">
          Operating from the Ranger Union, they work alongside regional authorities and InterPol to
          combat environmental exploitation and respond to global disasters that threaten the
          natural order.
        </p>
      </WikiCard>

      <WikiCard title="Primary Duties" icon="mdi-format-list-checks" color="green">
        <p class="text-body-1 lh-lg mb-6">
          The scope of a Ranger's responsibility extends beyond simple patrolling. They are the
          primary response force for any threat to the environment.
        </p>
        <FeatureGrid :items="rangerRoles" :cols="2" />
      </WikiCard>

      <WikiCard title="Specialized Branches" icon="mdi-sitemap-outline" color="green">
        <p class="text-body-1 lh-lg mb-6">
          The Ranger Union is divided into specific divisions, each focused on a different aspect of
          environmental protection.
        </p>
        <FeatureGrid :items="branches" :cols="2" />
      </WikiCard>

      <WikiCard title="The Ranger Hierarchy" icon="mdi-medal-outline" color="green">
        <p class="text-body-1 lh-lg mb-6">
          Advancement within the organization is based on field experience, ecological knowledge,
          and mastery of the Capture Styler.
        </p>
        <FeatureGrid :items="ranks" :cols="3" />

        <WikiCallout
          label="Specialist Designations"
          icon="mdi-certificate-outline"
          color="green"
          class="mt-8"
        >
          Experienced Rangers may eventually earn <strong>Specialist</strong> titles, such as
          <em>Marine Specialist</em> or <em>Sub-Zero operative</em>, based on their expertise in
          specific biomes.
        </WikiCallout>
      </WikiCard>

      <WikiCard title="Career Rangers" icon="mdi-account-plus-outline" color="green">
        <v-row align="center">
          <v-col cols="12" md="8">
            <p class="text-body-1 lh-lg">
              Want to defend nature and the harmony between people and pokemon? Almia's Ranger
              School always has room for one more student.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-btn
              block
              size="large"
              color="green-darken-2"
              variant="elevated"
              prepend-icon="mdi-file-document-edit-outline"
              to="/sandbox/orgs/ranger-union/recruitment"
            >
              View Requirements
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

/* Ensure the FeatureGrid items have the lore-styled dashed border */
:deep(.feature-card) {
  border-style: dashed !important;
  background-color: rgba(var(--v-theme-green-darken-2), 0.02);
}
</style>
