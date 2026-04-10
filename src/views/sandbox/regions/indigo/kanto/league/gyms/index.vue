<script setup lang="ts">
import { ref } from 'vue'
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import type { GymLeader } from '@/types/wiki'

const currentTab = ref('main')

const mainLeaders: GymLeader[] = [
  {
    name: 'Brock',
    city: 'Pewter City',
    specialty: 'Rock',
    typeIcon: 'rock.svg',
    to: '/sandbox/characters/npc/brock',
    color: 'brown-lighten-1',
    badge: 'Boulder Badge',
  },
  {
    name: 'Misty',
    city: 'Cerulean City',
    specialty: 'Water',
    typeIcon: 'water.svg',
    to: '/sandbox/characters/npc/misty',
    color: 'blue-lighten-2',
    badge: 'Cascade Badge',
  },
  {
    name: 'Visquez',
    city: 'Vermilion City',
    specialty: 'Electric',
    typeIcon: 'electric.svg',
    to: '/sandbox/characters/npc/surge',
    color: 'amber-darken-2',
    badge: 'Thunder Badge',
  },
  {
    name: 'Erika',
    city: 'Celadon City',
    specialty: 'Grass',
    typeIcon: 'grass.svg',
    to: '/sandbox/characters/npc/erika',
    color: 'green-lighten-1',
    badge: 'Rainbow Badge',
  },
  {
    name: 'Janine',
    city: 'Fuchsia City',
    specialty: 'Poison',
    typeIcon: 'poison.svg',
    to: '/sandbox/characters/npc/janine',
    color: 'purple-darken-2',
    badge: 'Soul Badge',
  },
  {
    name: 'Sabrina',
    city: 'Saffron City',
    specialty: 'Psychic',
    typeIcon: 'psychic.svg',
    to: '/sandbox/characters/npc/sabrina',
    color: 'pink-accent-2',
    badge: 'Marsh Badge',
  },
  {
    name: 'Maker (Acting)',
    city: 'Cinnabar Island',
    specialty: 'Fire',
    typeIcon: 'fire.svg',
    to: '/sandbox/characters/oc/maker',
    color: 'deep-orange-darken-1',
    badge: 'Volcano Badge',
  },
  {
    name: 'Blue',
    city: 'Viridian City',
    specialty: 'All-Type',
    typeIcon: 'normal.svg',
    to: '/sandbox/characters/npc/blue',
    color: 'blue-grey-darken-3',
    badge: 'Earth Badge',
  },
]

const secondaryLeaders: GymLeader[] = [
  {
    name: 'Koichi',
    city: 'Saffron City',
    specialty: 'Fighting',
    typeIcon: 'fighting.svg',
    to: '/sandbox/characters/npc/karate-master',
    color: 'orange-darken-4',
    badge: 'Unofficial / Dojo',
  },
  {
    name: 'Yas',
    city: 'Dark City',
    specialty: 'Scyther-Style',
    typeIcon: 'bug.svg',
    to: '/sandbox/characters/npc/yas',
    color: 'light-green-darken-4',
    badge: 'Yas Gym',
  },
  {
    name: 'Kaz',
    city: 'Dark City',
    specialty: 'Electabuzz-Style',
    typeIcon: 'electric.svg',
    to: '/sandbox/characters/npc/kaz',
    color: 'yellow-darken-4',
    badge: 'Kaz Gym',
  },
]

const getTypeIconPath = (iconName: string) => {
  return new URL(`/src/assets/types/${iconName}`, import.meta.url).href
}
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Kanto Gym Circuit"
      subtitle="The journey of eight badges begins here."
      icon="mdi-map-marker-path"
      pattern="dots"
    >
      <template #chips>
        <v-chip color="red-darken-2" variant="flat" size="small" class="mt-4 font-weight-black">
          RED LEAGUE QUALIFIERS
        </v-chip>
      </template>
    </WikiHero>

    <v-container max-width="1200" class="py-8">
      <v-tabs v-model="currentTab" color="primary" align-tabs="center" class="mb-8">
        <v-tab value="main" class="text-h6 font-weight-black">
          <v-icon start>mdi-shield-crown</v-icon>
          Indigo Sanctioned
        </v-tab>
        <v-tab value="secondary" class="text-h6 font-weight-black">
          <v-icon start>mdi-sword-cross</v-icon>
          Local & Unofficial
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
                    >View History</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>

      <v-row class="mt-12">
        <v-col cols="12">
          <WikiCard title="League Requirements" icon="mdi-certificate">
            <v-row class="text-body-2">
              <v-col cols="12" md="4">
                <div class="font-weight-bold mb-1">Badge Collection</div>
                <p>
                  Trainers must collect all 8 official Indigo badges. Secondary gym badges do not
                  count toward Conference qualification.
                </p>
              </v-col>
              <v-col cols="12" md="4">
                <div class="font-weight-bold mb-1">Dojo Tradition</div>
                <p>
                  Unofficial gyms often follow traditional "Dojo" rules, such as restricted item use
                  or specific move bans.
                </p>
              </v-col>
              <v-col cols="12" md="4">
                <div class="font-weight-bold mb-1">Regional Recognition</div>
                <p>
                  While not providing badges, defeating local masters is often a requirement for
                  specific "G-Men" scouting programs.
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
.gym-card {
  transition: all 0.3s ease;
}

.gym-card:hover {
  transform: translateY(-8px);
  border-color: rgb(var(--v-theme-primary)) !important;
}

.secondary-gym {
  border-style: dashed !important; /* Visual distinction for unofficial gyms */
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
