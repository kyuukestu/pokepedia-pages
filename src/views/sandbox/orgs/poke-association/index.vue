<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'

const leagueStructure: FeatureItem[] = [
  {
    title: 'Regional Conferences',
    icon: 'mdi-stadium-variant',
    color: 'green',
    description:
      'The annual championship tournaments (e.g., Indigo Plateau, Lily of the Valley) for Trainers who have secured eight regional badges.',
  },
  {
    title: 'The Champion League',
    icon: 'mdi-shield-crown',
    color: 'green',
    description:
      'The highest tier of professional battling, where Conference winners earn the right to challenge the regional Elite Four and Champion.',
  },
  {
    title: 'World Tournament Junior Cup',
    icon: 'mdi-trophy-outline',
    color: 'green',
    description:
      'A prestigious Unova-based invitational focusing on rising talent, often featuring exhibition matches from regional Champions.',
  },
  {
    title: 'Format Innovation',
    icon: 'mdi-sword-cross',
    color: 'green',
    description:
      'The creators of modern battling standards, including the official implementation of Triple Battles and Rotation Battles.',
  },
]

const safetyForces = [
  {
    title: 'Ace Trainer Corps',
    icon: 'mdi-medication-outline',
    color: 'green',
    description:
      'Deputized specialists trained to substitute InterPol and Rangers during emergencies. They focus on minimizing collateral damage and stabilizing high-stakes environments.',
  },
  {
    title: 'Elite Assistance',
    icon: 'mdi-account-star-outline',
    color: 'green',
    description:
      'The Associations strongest members provide overwhelming tactical support to the Ranger Union during global-scale Legendary crises.',
  },
]

const regionalOffices = [
  {
    title: 'Kanto & Johto (Goldenrod)',
    icon: 'mdi-city',
    color: 'green',
    description:
      'The primary headquarters overseeing the Indigo and Silver Conferences. Known for rigorous Gym Leader qualifying exams.',
  },
  {
    title: 'Hoenn (Lilycove City)',
    icon: 'mdi-airplane-takeoff',
    color: 'green',
    description:
      'Famous for its Aerial Mode—a building capable of transforming into a massive airship for regional crisis coordination.',
  },
  {
    title: 'Sinnoh Branch',
    icon: 'mdi-account-tie-voice',
    color: 'green',
    description:
      'Oversees the Lily of the Valley Conference and maintains the instructional statues found at the entrance of every regional Gym.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="The Pokémon Association"
      subtitle="The supreme legislative authority overseeing the professional League circuit and global tournament standards."
      icon="mdi-seal-variant"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="green-darken-2" variant="flat" size="small">Tournament Sanctioning</v-chip>
          <v-chip color="green-darken-2" variant="flat" size="small">Elite Tier Oversight</v-chip>
          <v-chip variant="outlined" size="small">Inter-Regional HQ</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="The Championship Path" icon="mdi-tournament" color="green">
        <p class="text-body-1 lh-lg mb-6">
          The Pokémon Association manages the multi-tiered <strong>League System</strong>, a
          structured path that takes a Trainer from local Gym challenges to the global stage. While
          the
          <RouterLink to="sandbox/orgs/inspection-agency" class="text-primary font-weight-bold"
            >Pokémon Inspection Agency (PIA)</RouterLink
          >
          handles the direct auditing of Gym Leaders, the Association remains the final arbiter of
          tournament rules and conference eligibility.
        </p>
        <FeatureGrid :items="leagueStructure" :cols="2" />
      </WikiCard>

      <WikiCard title="Beyond the Stadium" icon="mdi-map-marker-path" color="green">
        <v-row align="center">
          <v-col cols="12" md="7">
            <p class="text-body-1 lh-lg mb-4">
              The Association’s influence extends into specialized niches of Pokémon training. In
              partnership with the
              <RouterLink to="sandbox/orgs/aviation-agency" class="text-primary font-weight-bold"
                >Aviation Authority</RouterLink
              >, they regulate high-altitude <strong>Sky Battles</strong> and the technical
              <strong>PokéRinger</strong> tournaments of Hoenn and Sinnoh.
            </p>
            <p class="text-body-1 lh-lg">
              These events are designed to test specialized skills—such as aerial maneuverability
              and wind-current synchronization—that fall outside standard stadium-based battling.
            </p>
          </v-col>
          <v-col cols="12" md="5" class="text-center">
            <v-icon size="120" color="green-darken-1">mdi-airplane-takeoff</v-icon>
            <div class="text-caption mt-2 text-medium-emphasis">
              Official Seal of the Aviation-League Partnership
            </div>
          </v-col>
        </v-row>
      </WikiCard>

      <WikiCard title="Regional Sectors & Chairmen" icon="mdi-office-building-marker" color="green">
        <p class="text-body-1 lh-lg mb-6">
          Each region operates its own sector of the Association, led by a Chairman. While they
          maintain standardized international laws, each branch is equipped to handle
          regional-specific crises and League traditions.
        </p>
        <FeatureGrid :items="regionalOffices" :cols="3" />
      </WikiCard>

      <WikiCard title="Strategic Oversight" icon="mdi-shield-alert-outline" color="green">
        <p class="text-body-1 lh-lg mb-6">
          The Association serves as a pillar of global security, working in tandem with
          <RouterLink to="sandbox/orgs/inter-pol" class="text-primary font-weight-bold"
            >InterPol</RouterLink
          >
          and the
          <RouterLink to="sandbox/orgs/ranger-union" class="text-primary font-weight-bold"
            >Ranger Union</RouterLink
          >. When crisis strikes, the Association deploys its most capable members to provide
          tactical support and humanitarian aid.
        </p>

        <FeatureGrid :items="safetyForces" :cols="2" />

        <WikiCallout label="Ace Trainers in RP" icon="mdi-account-check" color="green" class="mt-8">
          Ace Trainers serve as "para-medics" to the professional world. While Champions handle the
          primary threat, Ace Trainers focus on crowd control, damage mitigation, and emergency
          Pokémon stabilization to prevent collateral loss of life.
        </WikiCallout>
      </WikiCard>

      <WikiAlert type="info">
        Advancement to the Champion League requires an official win at a Regional Conference.
        Top-tier events are monitored by Association officials to ensure zero-tolerance for rule
        violations.
      </WikiAlert>
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
