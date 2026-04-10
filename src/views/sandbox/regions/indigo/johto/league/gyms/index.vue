<script setup lang="ts">
import { ref } from 'vue'
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import type { GymLeader } from '@/types/wiki'

const currentTab = ref('main')

const mainLeaders: GymLeader[] = [
  {
    name: 'Falkner',
    city: 'Violet City',
    specialty: 'Flying',
    typeIcon: 'flying.svg',
    to: '/sandbox/characters/npc/falkner',
    color: 'light-blue-lighten-3',
    badge: 'Zephyr Badge',
  },
  {
    name: 'Bugsy',
    city: 'Azalea Town',
    specialty: 'Bug',
    typeIcon: 'bug.svg',
    to: '/sandbox/characters/npc/bugsy',
    color: 'light-green-darken-2',
    badge: 'Hive Badge',
  },
  {
    name: 'Whitney',
    city: 'Goldenrod City',
    specialty: 'Normal',
    typeIcon: 'normal.svg',
    to: '/sandbox/characters/npc/whitney',
    color: 'pink-lighten-3',
    badge: 'Plain Badge',
  },
  {
    name: 'Morty',
    city: 'Ecruteak City',
    specialty: 'Ghost',
    typeIcon: 'ghost.svg',
    to: '/sandbox/characters/npc/morty',
    color: 'deep-purple-darken-1',
    badge: 'Fog Badge',
  },
  {
    name: 'Chuck',
    city: 'Cianwood City',
    specialty: 'Fighting',
    typeIcon: 'fighting.svg',
    to: '/sandbox/characters/npc/chuck',
    color: 'brown-darken-2',
    badge: 'Storm Badge',
  },
  {
    name: 'Jasmine',
    city: 'Olivine City',
    specialty: 'Steel',
    typeIcon: 'steel.svg',
    to: '/sandbox/characters/npc/jasmine',
    color: 'blue-grey-lighten-2',
    badge: 'Mineral Badge',
  },
  {
    name: 'Lorelei',
    city: 'Mahogany Town',
    specialty: 'Ice',
    typeIcon: 'ice.svg',
    to: '/sandbox/characters/npc/lorelei',
    color: 'cyan-lighten-2',
    badge: 'Glacier Badge',
  },
  {
    name: 'Clair',
    city: 'Blackthorn City',
    specialty: 'Dragon',
    typeIcon: 'dragon.svg',
    to: '/sandbox/characters/npc/clair',
    color: 'indigo-darken-4',
    badge: 'Rising Badge',
  },
]

const secondaryLeaders: GymLeader[] = [
  {
    name: 'Nathan',
    city: 'Olivine City',
    specialty: 'Normal',
    typeIcon: 'normal.svg',
    to: '/sandbox/characters/npc/nathan',
    color: 'grey-lighten-1',
    badge: 'Unofficial / Normal Gym',
  },
  {
    name: 'Dorian',
    city: 'Blackthorn Outskirts',
    specialty: 'Water',
    typeIcon: 'water.svg',
    to: '/sandbox/characters/npc/dorian',
    color: 'blue-darken-3',
    badge: 'Coastline Gym',
  },
]

const getTypeIconPath = (iconName: string) => {
  return new URL(`/src/assets/types/${iconName}`, import.meta.url).href
}
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Johto Gym Circuit"
      subtitle="Master the eight trials of the Johto region to qualify for the Silver Conference."
      icon="mdi-shield-star-outline"
      pattern="dots"
      color="blue-darken-2"
    >
      <template #chips>
        <v-chip
          color="blue-darken-4"
          variant="flat"
          size="small"
          class="mt-4 font-weight-black text-white"
        >
          SILVER LEAGUE QUALIFIERS
        </v-chip>
      </template>
    </WikiHero>

    <v-container max-width="1200" class="py-8">
      <v-tabs v-model="currentTab" color="blue-darken-2" align-tabs="center" class="mb-8">
        <v-tab value="main" class="text-h6 font-weight-black">
          <v-icon start>mdi-shield-crown</v-icon>
          League Sanctioned
        </v-tab>
        <v-tab value="secondary" class="text-h6 font-weight-black">
          <v-icon start>mdi-sword-cross</v-icon>
          Regional Challengers
        </v-tab>
      </v-tabs>

      <v-window v-model="currentTab">
        <v-window-item value="main">
          <v-row>
            <v-col v-for="leader in mainLeaders" :key="leader.name" cols="12" sm="6" md="4" lg="3">
              <v-card
                :to="leader.to"
                border
                flat
                rounded="xl"
                class="gym-card h-100 d-flex flex-column"
              >
                <div
                  class="gym-card__header d-flex align-center justify-center py-6"
                  :class="`bg-${leader.color}`"
                >
                  <div class="header-overlay"></div>
                  <v-img
                    :src="getTypeIconPath(leader.typeIcon)"
                    width="60"
                    height="60"
                    contain
                    class="type-icon-img"
                  />
                </div>
                <v-card-text class="text-center pt-4 grow">
                  <div class="text-overline font-weight-black mb-1" :class="`text-${leader.color}`">
                    {{ leader.city }}
                  </div>
                  <h3 class="text-h6 font-weight-bold mb-0">{{ leader.name }}</h3>
                  <div class="text-caption text-medium-emphasis mb-2">{{ leader.badge }}</div>
                  <v-chip
                    size="x-small"
                    :color="leader.color"
                    variant="outlined"
                    class="font-weight-bold"
                  >
                    {{ leader.specialty.toUpperCase() }}
                  </v-chip>
                </v-card-text>
                <v-divider />
                <v-card-actions class="pa-3">
                  <v-btn
                    block
                    variant="text"
                    size="small"
                    :color="leader.color"
                    class="font-weight-bold"
                    >View Gym Specs</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="secondary">
          <v-row justify="center">
            <v-col v-for="leader in secondaryLeaders" :key="leader.name" cols="12" sm="6" md="4">
              <v-card
                :to="leader.to"
                border
                flat
                rounded="xl"
                class="gym-card h-100 d-flex flex-column secondary-gym"
              >
                <div
                  class="gym-card__header d-flex align-center justify-center py-6"
                  :class="`bg-${leader.color}`"
                >
                  <div class="header-overlay"></div>
                  <v-img
                    :src="getTypeIconPath(leader.typeIcon)"
                    width="60"
                    height="60"
                    contain
                    class="type-icon-img"
                  />
                </div>
                <v-card-text class="text-center pt-4 grow">
                  <div class="text-overline font-weight-black mb-1" :class="`text-${leader.color}`">
                    {{ leader.city }}
                  </div>
                  <h3 class="text-h6 font-weight-bold mb-0">{{ leader.name }}</h3>
                  <div class="text-caption text-error font-weight-bold mb-2">Non-Circuit</div>
                  <v-chip
                    size="x-small"
                    :color="leader.color"
                    variant="flat"
                    class="font-weight-bold"
                  >
                    {{ leader.specialty.toUpperCase() }}
                  </v-chip>
                </v-card-text>
                <v-divider />
                <v-card-actions class="pa-3">
                  <v-btn
                    block
                    variant="text"
                    size="small"
                    :color="leader.color"
                    class="font-weight-bold"
                    >Explore Facility</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>

      <v-row class="mt-12">
        <v-col cols="12">
          <WikiCard title="League Requirements" icon="mdi-certificate" color="blue">
            <v-row class="text-body-2">
              <v-col cols="12" md="4">
                <div class="font-weight-bold mb-1">Badge Collection</div>
                <p>
                  Trainers must collect all 8 official Johto badges. Kanto badges collected during
                  the same season may provide seeding bonuses but do not replace Johto requirements.
                </p>
              </v-col>
              <v-col cols="12" md="4">
                <div class="font-weight-bold mb-1">Silver Shell Registration</div>
                <p>
                  Official badges unlock the "Silver Shell" registration portal for the October
                  Preliminaries at the base of Mt. Silver.
                </p>
              </v-col>
              <v-col cols="12" md="4">
                <div class="font-weight-bold mb-1">Regional Recognition</div>
                <p>
                  Defeating secondary masters like Nathan or Dorian is highly recommended for
                  trainers looking to broaden their tactical range before the Round Robin phase.
                </p>
              </v-col>
            </v-row>
          </WikiCard>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<style scoped>
/* Same styles as your Kanto template to maintain consistency */
.gym-card {
  transition: all 0.3s ease;
}
.gym-card:hover {
  transform: translateY(-8px);
  border-color: rgb(var(--v-theme-primary)) !important;
}
.secondary-gym {
  border-style: dashed !important;
}
.gym-card__header {
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
}
.header-overlay {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.2) 1.2px, transparent 1.2px);
  background-size: 12px 12px;
  opacity: 0.4;
}
.type-icon-img {
  z-index: 2;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.15));
}
.gym-card:hover .type-icon-img {
  transform: scale(1.1);
}
</style>
