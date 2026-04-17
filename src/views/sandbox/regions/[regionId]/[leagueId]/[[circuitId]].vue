<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLeagueStore } from '@/stores/leagueStore'

// Components
import WikiHero from '@/components/sections/WikiHero.vue'
import ChampionLeague from '@/components/wiki/ChampionLeague.vue'

// Define the typed route based on your folder structure
const route = useRoute('/sandbox/regions/[regionId]/[leagueId]/[[circuitId]]')
const leagueStore = useLeagueStore()

/**
 * 1. Sync Store with League Data
 * We use leagueId (e.g., 'indigo') to fetch the global Federation data
 * regardless of which regional folder we are currently in.
 */
const updateLeague = () => {
  console.log('Current Route Params:', route.params) // <— Check this in F12 console
  let lId = route.params.leagueId as string
  // LOGIC FIX:
  // If the URL is /regions/indigo/league, lId is "league"
  // But your data ID is "indigo-league"
  if (lId === 'league' || lId === 'indigo') {
    lId = 'indigo-league'
  }

  if (lId) leagueStore.setActiveLeague(lId)
}

onMounted(updateLeague)
watch(() => route.params.leagueId, updateLeague)

const league = computed(() => leagueStore.currentLeague)

/**
 * 2. View Logic: Summit vs. Circuit
 */
const activeCircuit = computed(() => {
  const circuitId = route.params.circuitId as string
  return league.value?.circuits.find((c) => c.id === circuitId) || null
})

// Transform Summit members for the Floor Plan
const chambers = computed(() => {
  if (!league.value?.summit) return []

  return league.value.summit
    .filter((m) => !m.isChampion)
    .map((m, index) => ({
      chamberIndex: index,
      name: m.name,
      title: m.title,
      specialty: m.specialty,
      accentColor: m.color,
      typeIcon: `${m.specialty.toLowerCase()}.svg`,
      to: `/sandbox/characters/npc/${m.name.toLowerCase()}`,
    }))
})

const champion = computed(() => {
  const champ = league.value?.summit.find((m) => m.isChampion)
  if (!champ) return null

  return {
    chamberIndex: 4,
    name: champ.name,
    title: champ.title,
    specialty: champ.specialty,
    accentColor: champ.color,
    typeIcon: `${champ.specialty.toLowerCase()}.svg`,
    to: `/sandbox/characters/npc/${champ.name.toLowerCase()}`,
  }
})

const getTypeIconPath = (iconName: string) => {
  return new URL(`/src/assets/types/${iconName}`, import.meta.url).href
}
</script>

<template>
  <v-container v-if="league" fluid class="pa-0">
    <WikiHero
      :title="activeCircuit ? activeCircuit.name : league.name"
      :subtitle="activeCircuit ? activeCircuit.heroSubtitle : league.tagline"
      :icon="activeCircuit ? 'mdi-map-marker-path' : league.icon"
      :color="activeCircuit ? activeCircuit.heroColor : league.themeColor"
    >
      <template #chips>
        <div class="d-flex align-center gap-2 mt-4">
          <v-chip
            color="white"
            variant="flat"
            size="small"
            class="font-weight-black text-uppercase"
          >
            {{ activeCircuit ? 'Regional Circuit' : 'Federation Summit' }}
          </v-chip>

          <v-btn
            v-if="activeCircuit"
            :to="`/sandbox/regions/indigo/${league.id}`"
            size="x-small"
            variant="tonal"
            color="white"
            prepend-icon="mdi-arrow-left"
          >
            Return to Plateau
          </v-btn>

          <v-card
            v-for="c in league.circuits"
            :key="c.id"
            :to="`/sandbox/regions/${c.id}/${league.id}/${c.id}`"
            flat
            border
            rounded="xl"
            class="pa-4 d-flex align-center circuit-link-card justify-center"
            :style="{ '--hover-color': c.heroColor }"
          >
            <v-avatar :color="c.heroColor" rounded="lg">
              <v-icon color="white">mdi-map-legend</v-icon>
            </v-avatar>
          </v-card>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200" class="py-12">
      <div v-if="!activeCircuit">
        <v-row justify="center">
          <v-col cols="12" md="10">
            <div class="text-overline text-center mb-4 text-medium-emphasis">
              Sanctioned Entry Circuits
            </div>

            <v-row justify="center" class="mb-12">
              <v-col v-for="c in league.circuits" :key="c.id" cols="12" sm="5">
                <v-card
                  :to="`/sandbox/regions/${c.id}/${league.id}/${c.id}`"
                  flat
                  border
                  rounded="xl"
                  class="pa-4 d-flex align-center circuit-link-card"
                  :style="{ '--hover-color': c.heroColor }"
                >
                  <v-avatar :color="c.heroColor" rounded="lg" class="mr-4">
                    <v-icon color="white">mdi-map-legend</v-icon>
                  </v-avatar>
                  <div>
                    <div class="text-subtitle-1 font-weight-black">{{ c.name }}</div>
                    <div class="text-caption text-uppercase">8 Badges Required</div>
                  </div>
                  <v-spacer />
                  <v-icon size="small">mdi-chevron-right</v-icon>
                </v-card>
              </v-col>
            </v-row>

            <ChampionLeague
              v-if="champion"
              :chambers="chambers"
              :champion="champion"
              hub-label="Champion"
            />
          </v-col>
        </v-row>
      </div>

      <div v-else>
        <v-row>
          <v-col
            v-for="leader in activeCircuit.mainLeaders"
            :key="leader.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card :to="leader.to" border flat rounded="xl" class="gym-card h-100">
              <div class="gym-card__header py-6" :class="`bg-${leader.color}`">
                <div class="header-overlay"></div>
                <v-img :src="getTypeIconPath(leader.typeIcon)" width="52" class="mx-auto" />
              </div>
              <v-card-text class="text-center pt-4">
                <div class="text-overline font-weight-black" :class="`text-${leader.color}`">
                  {{ leader.city }}
                </div>
                <h3 class="text-h6 font-weight-bold">{{ leader.name }}</h3>
                <div class="text-caption mb-2">{{ leader.badge }}</div>
                <v-chip
                  size="x-small"
                  :color="leader.color"
                  variant="flat"
                  class="font-weight-black"
                >
                  {{ leader.specialty.toUpperCase() }}
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <template v-if="activeCircuit.secondaryLeaders?.length">
  <div class="text-overline mt-12 mb-4 text-medium-emphasis text-center">
    Secondary & Unofficial Gyms
  </div>
  
  <v-row justify="center">
    <v-col
      v-for="leader in activeCircuit.secondaryLeaders"
      :key="leader.name"
      cols="12"
      sm="6"
      md="4"
    >
      <v-card 
        :to="leader.to" 
        border 
        variant="outlined" 
        class="secondary-gym-card h-100"
      >
        <v-card-item>
          <template #prepend>
            <v-avatar size="40" :color="leader.color" variant="tonal">
              <v-img :src="getTypeIconPath(leader.typeIcon)" width="24" />
            </v-avatar>
          </template>
          
          <v-card-title class="text-subtitle-1 font-weight-bold">
            {{ leader.name }}
          </v-card-title>
          <v-card-subtitle>
            {{ leader.city }} • {{ leader.badge }}
          </v-card-subtitle>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>
      </div>
    </v-container>
  </v-container>

  <v-container v-else class="text-center py-16">
    <v-icon size="64" color="grey">mdi-map-search-outline</v-icon>
    <div class="text-h5 mt-4">Registry Offline</div>
    <v-btn to="/sandbox/regions" variant="text">Return to World Map</v-btn>
  </v-container>
</template>

<style scoped>
.gym-card {
  transition: all 0.25s ease-in-out;
}
.gym-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1) !important;
}

.gym-card__header {
  position: relative;
  overflow: hidden;
}
.header-overlay {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px);
  background-size: 12px 12px;
}

.circuit-link-card {
  transition: all 0.3s ease;
  cursor: pointer;
}
.circuit-link-card:hover {
  border-color: var(--hover-color) !important;
  background: rgba(var(--v-theme-on-surface), 0.02);
}

.gap-2 {
  gap: 8px;
}
</style>
