<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'

const coreDisciplines: FeatureItem[] = [
  {
    title: 'The Pokéathlon',
    icon: 'mdi-trophy-variant',
    color: 'orange-darken-3',
    description:
      'A Johto-originated multi-discipline event focusing on five categories: Speed, Power, Skill, Stamina, and Jump. Managed at the Pokéathlon Dome.',
  },
  {
    title: 'Extreme Pokémon Race',
    icon: 'mdi-run-fast',
    color: 'orange-darken-3',
    description:
      'A high-speed cooperation race where Pokémon pull their trainers on specialized sleds or skis. Strict safety gear is required for all participants.',
  },
  {
    title: 'Pokémon Sumo',
    icon: 'mdi-weight-lifter',
    color: 'orange-darken-3',
    description:
      'Heavyweight competition utilizing a traditional ring. Restricted to specific weight classes and bipedal species over 80kg.',
  },
  {
    title: 'Pokémon Orienteering',
    icon: 'mdi-sun-compass',
    color: 'orange-darken-3',
    description:
      'A competition where people and pokemon race to be the first to navigate a series of challenging terrain.',
  },
]

const safetyStats: FeatureItem[] = [
  {
    title: 'Mandatory Rest',
    icon: 'mdi-timer-sand',
    color: 'grey-darken-3',
    description:
      'Post-event recovery periods are enforced: a minimum of 48 hours between high-intensity sprints.',
  },
  {
    title: 'Weight Classes',
    icon: 'mdi-scale-balance',
    color: 'grey-darken-3',
    description:
      'Athletic Sumo utilizes three tiers: Lightweight (<50kg), Middleweight (51-100kg), and Heavyweight (>100kg).',
  },
  {
    title: 'Performance Testing',
    icon: 'mdi-flask-outline',
    color: 'grey-darken-3',
    description:
      'Strict "Natural Energy" protocols. Use of X-Items or performance-enhancing Berries results in instant disqualification.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Athletics Board (AB)"
      subtitle="Beyond the Battle: Standardizing international competitive sports, endurance races, and physical mastery."
      icon="mdi-medal"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="orange-darken-4" variant="flat" size="small">Governing Body</v-chip>
          <v-chip color="grey-darken-4" variant="flat" size="small">Non-Combat Focus</v-chip>
          <v-chip variant="outlined" size="small">Established: Johto Era</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="Board Mandate" icon="mdi-account-group" class="orange-darken-4">
        <p class="text-body-1 lh-lg mb-6">
          The <strong>Athletics Board</strong> was established to provide a formal structure for
          traditional and modern sports that do not fit the standard Pokémon League battle format.
          By standardizing rules for events like the <strong>Pokéathlon</strong> and
          <strong>PokéRinger</strong>, the Board ensures that trainers and Pokémon can demonstrate
          their physical synergy in a safe, regulated environment.
        </p>

        <FeatureGrid :items="coreDisciplines" :cols="2" />
      </WikiCard>

      <WikiCard title="Regulation & Safety" icon="mdi-shield-check" class="orange-darken-4">
        <p class="text-body-1 lh-lg mb-4">
          Unlike battle-oriented training, athletics places a unique strain on Pokémon physiology.
          The Athletics Board works closely with <strong>Pokémon Centers</strong> to monitor joint
          health, cardiac output, and recovery times.
        </p>
        <v-divider class="border-opacity-75" :thickness="3" />

        <v-icon size="140" color="orange-darken-4" class="mx-auto d-flex justify-center"
          >mdi-heart-pulse</v-icon
        >
        <div
          class="text-caption mt-2 text-orange-darken-2 font-weight-bold mx-auto d-flex justify-center text-uppercase"
        >
          Integrity Through Physical Excellence
        </div>
        <v-divider class="border-opacity-75" :thickness="3" />
        <br />
        <FeatureGrid :items="safetyStats" :cols="3" />
      </WikiCard>

      <WikiCard title="Major Annual Competitions" icon="mdi-calendar-star" class="grey-darken-4">
        <v-list density="compact" bg-color="transparent">
          <v-list-item prepend-icon="mdi-map-marker">
            <v-list-item-title><strong>Pokéathlon Dome (Johto):</strong></v-list-item-title>
            <v-list-item-subtitle
              >The pinnacle of multi-disciplinary sport. Home of the "Medalist" ranking
              system.</v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item prepend-icon="mdi-map-marker">
            <v-list-item-title><strong>Rikishii Town (Johto):</strong></v-list-item-title>
            <v-list-item-subtitle
              >The spiritual home of Pokémon Sumo. Hosts the annual Grand Tournament for
              Fighting-types.</v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item prepend-icon="mdi-map-marker">
            <v-list-item-title><strong>Cross-Country Circuits (Global):</strong></v-list-item-title>
            <v-list-item-subtitle
              >Rotating race tracks in regions like Kanto (Fujisawa) and Sinnoh for the Extreme
              Pokémon Race.</v-list-item-subtitle
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
  background-color: rgba(var(--v-theme-orange-darken-4), 0.05);
  border-color: rgba(var(--v-theme-orange-darken-4), 0.3) !important;
}

.v-theme--dark :deep(.feature-card) {
  background-color: rgba(230, 81, 0, 0.05);
  border-color: rgba(230, 81, 0, 0.2) !important;
}
</style>
