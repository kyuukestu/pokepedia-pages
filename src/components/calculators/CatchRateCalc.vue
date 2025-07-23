<script setup lang="ts">
import { ref } from 'vue'
interface SpeciesData {
  name: string
  egg_groups: {
    name: string
  }[]
  evolves_from_species?: {
    name: string
  }
  habitat?: { name: string }
  generation: {
    name: string
  }
  flavor_text_entries: {
    flavor_text: string
    language: {
      name: string
    }
    version: {
      name: string
    }
  }[]
  pokedex_numbers: {
    entry_number: number
    pokedex: {
      name: string
    }
  }[]
  growth_rate: {
    name: string
  }
  capture_rate: number
  isLoading: boolean
  error: string | null
}
type StatusType = 'None' | 'Burn' | 'Poison' | 'Paralysis' | 'Sleep' | 'Freeze'

const QuerySpecies = ref<SpeciesData>({
  name: '',
  egg_groups: [{ name: '' }],
  evolves_from_species: { name: '' },
  habitat: { name: '' },
  generation: { name: '' },
  flavor_text_entries: [{ flavor_text: '', language: { name: '' }, version: { name: '' } }],
  pokedex_numbers: [{ entry_number: 0, pokedex: { name: '' } }],
  growth_rate: { name: '' },
  capture_rate: 0,
  isLoading: false,
  error: null,
})

const SearchSpecies = ref('')
const PokeballType = ref('')
const StatusEffect = ref<StatusType>('None')
const health = ref(100)
const catchRate = ref(0)
const catchRoll = ref(0)
const catchAttempts = ref(0)

const pokeballs = ['Pokeball', 'Greatball', 'Ultraball']
const statuses = ['Burn', 'Poison', 'Paralysis', 'Sleep', 'Freeze']

const fetchSpeciesData = async (speciesName: string) => {
  if (!speciesName.trim()) {
    QuerySpecies.value = {
      name: '',
      egg_groups: [{ name: '' }],
      evolves_from_species: { name: '' },
      habitat: { name: '' },
      generation: { name: '' },
      flavor_text_entries: [{ flavor_text: '', language: { name: '' }, version: { name: '' } }],
      pokedex_numbers: [{ entry_number: 0, pokedex: { name: '' } }],
      growth_rate: { name: '' },
      capture_rate: 0,
      isLoading: false,
      error: null,
    }
    return
  }

  QuerySpecies.value.isLoading = true
  QuerySpecies.value.error = null

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${speciesName
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/'/g, '')
        .replace(/$-/g, '')}`,
    )

    if (!response.ok) {
      throw new Error('Species not found')
    }

    const data = await response.json()
    QuerySpecies.value = { ...data, isLoading: false, error: null }
  } catch (error) {
    QuerySpecies.value.error =
      typeof error === 'object' && error !== null && 'message' in error
        ? (error as Error).message
        : String(error)
    QuerySpecies.value.isLoading = false
  }

  console.log(QuerySpecies.value)
}

const calculateCatchRate = (
  captureRate: number,
  pokeball: string,
  status: 'None' | 'Burn' | 'Poison' | 'Paralysis' | 'Sleep' | 'Freeze',
  health: number,
) => {
  catchAttempts.value++

  let PokeballMult = 0
  let PMax = 0

  const StatusBoost = {
    None: 0,
    Burn: 120,
    Poison: 120,
    Paralysis: 120,
    Sleep: 250,
    Freeze: 250,
  }

  catchRate.value = captureRate / 2

  switch (pokeball) {
    case 'Pokeball':
      PokeballMult = 1
      PMax = 2500
      break
    case 'Greatball':
      PokeballMult = 1.5
      PMax = 2000
      break
    case 'Ultraball':
      PokeballMult = 2
      PMax = 1500
      break
  }

  catchRate.value = catchRate.value * PokeballMult

  catchRate.value = catchRate.value + StatusBoost[status]

  catchRoll.value = Math.floor(Math.random() * (PMax + 1))

  const healthBonus = Math.round(-1 * (PMax / 10) * (-1 + health / 100))

  catchRate.value = catchRate.value + healthBonus

  console.log(
    `Values: ${catchRate.value} Roll: ${catchRoll.value} PMax: ${PMax} Health Bonus: ${healthBonus} `,
  )
}

const getPokeballIcon = (pokeball: string) => {
  switch (pokeball) {
    case 'Pokeball':
      return 'mdi-pokeball'
    case 'Greatball':
      return 'mdi-pokeball'
    case 'Ultraball':
      return 'mdi-pokeball'
    default:
      return 'mdi-pokeball'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Burn':
      return 'mdi-fire'
    case 'Poison':
      return 'mdi-skull'
    case 'Paralysis':
      return 'mdi-lightning-bolt'
    case 'Sleep':
      return 'mdi-sleep'
    case 'Freeze':
      return 'mdi-snowflake'
    default:
      return 'mdi-heart'
  }
}

const getHealthColor = (health: number) => {
  if (health > 70) return 'success'
  if (health > 30) return 'warning'
  return 'error'
}

const getCatchSuccessColor = () => {
  return catchRate.value >= catchRoll.value ? 'success' : 'error'
}

const getCatchSuccessText = () => {
  return catchRate.value >= catchRoll.value ? 'Caught!' : 'Escaped!'
}
</script>

<template>
  <v-container class="pokemon-calculator">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-6 elevation-8" rounded="xl">
          <v-card-title class="text-center text-h4 font-weight-bold mb-4">
            <v-icon size="40" class="mr-2">mdi-pokeball</v-icon>
            Catch Calculator
          </v-card-title>

          <v-divider class="mb-6"></v-divider>

          <v-form @submit.prevent>
            <!-- Pokemon Search -->
            <v-text-field
              v-model="SearchSpecies"
              label="Pokémon Name"
              variant="outlined"
              density="comfortable"
              @keyup.enter="() => fetchSpeciesData(SearchSpecies)"
              clearable
              class="mb-4"
              prepend-inner-icon="mdi-magnify"
              :loading="QuerySpecies.isLoading"
              :error="!!QuerySpecies.error"
              :error-messages="QuerySpecies.error"
              hint="Press Enter to search"
              persistent-hint
            >
              <template v-slot:append>
                <v-btn
                  icon="mdi-magnify"
                  size="small"
                  variant="text"
                  @click="fetchSpeciesData(SearchSpecies)"
                  :loading="QuerySpecies.isLoading"
                ></v-btn>
              </template>
            </v-text-field>

            <!-- Pokeball Selection -->
            <v-select
              v-model="PokeballType"
              :items="pokeballs"
              label="Pokéball Type"
              variant="outlined"
              density="comfortable"
              class="mb-4"
              :prepend-inner-icon="getPokeballIcon(PokeballType)"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :prepend-icon="getPokeballIcon(item.raw)">
                  <v-list-item-title>{{ item.raw }}</v-list-item-title>
                </v-list-item>
              </template>
            </v-select>

            <!-- Status Effect -->
            <v-select
              v-model="StatusEffect"
              :items="['None', ...statuses]"
              label="Status Effect"
              variant="outlined"
              density="comfortable"
              class="mb-4"
              :prepend-inner-icon="getStatusIcon(StatusEffect)"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :prepend-icon="getStatusIcon(item.raw)">
                  <v-list-item-title>{{ item.raw }}</v-list-item-title>
                </v-list-item>
              </template>
            </v-select>

            <!-- Health Slider -->
            <div class="mb-6">
              <v-row align="center" no-gutters>
                <v-col cols="2">
                  <v-icon :color="getHealthColor(health)">mdi-heart</v-icon>
                </v-col>
                <v-col cols="10">
                  <v-slider
                    v-model="health"
                    label="Health %"
                    min="1"
                    max="100"
                    thumb-label="always"
                    :color="getHealthColor(health)"
                    :track-color="getHealthColor(health)"
                    class="align-center"
                  >
                    <template v-slot:append>
                      <v-text-field
                        v-model="health"
                        type="number"
                        style="width: 70px"
                        density="compact"
                        variant="outlined"
                        hide-details
                        single-line
                        min="1"
                        max="100"
                      ></v-text-field>
                    </template>
                  </v-slider>
                </v-col>
              </v-row>
            </div>

            <!-- Calculate Button -->
            <v-btn
              type="submit"
              @click="
                calculateCatchRate(QuerySpecies.capture_rate, PokeballType, StatusEffect, health)
              "
              class="w-100 mb-4"
              size="large"
              color="primary"
              variant="elevated"
              :disabled="!QuerySpecies.name || !PokeballType"
              prepend-icon="mdi-calculator"
            >
              <v-badge
                :content="catchAttempts"
                location="top end"
                floating
                :color="getCatchSuccessColor()"
                >Calculate Catch Rate</v-badge
              >
            </v-btn>
          </v-form>

          <!-- Results Section -->
          <v-expand-transition>
            <div v-if="QuerySpecies.name && !QuerySpecies.isLoading && !QuerySpecies.error">
              <v-divider class="mb-4"></v-divider>

              <v-card variant="tonal" class="pa-4 mb-4">
                <v-card-title class="text-h5 text-center">
                  {{ QuerySpecies.name.charAt(0).toUpperCase() + QuerySpecies.name.slice(1) }}
                </v-card-title>

                <v-row class="mt-2">
                  <v-col cols="6">
                    <v-list density="compact">
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon>mdi-target</v-icon>
                        </template>
                        <v-list-item-title>Base Catch Rate</v-list-item-title>
                        <v-list-item-subtitle>{{ QuerySpecies.capture_rate }}</v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item v-if="QuerySpecies.evolves_from_species?.name">
                        <template v-slot:prepend>
                          <v-icon>mdi-arrow-up</v-icon>
                        </template>
                        <v-list-item-title>Evolves From</v-list-item-title>
                        <v-list-item-subtitle>{{
                          QuerySpecies.evolves_from_species.name
                        }}</v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                  </v-col>
                  <v-col cols="6">
                    <v-list density="compact">
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon>mdi-chart-line</v-icon>
                        </template>
                        <v-list-item-title>Growth Rate</v-list-item-title>
                        <v-list-item-subtitle>{{
                          QuerySpecies.growth_rate.name
                        }}</v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item v-if="QuerySpecies.habitat?.name">
                        <template v-slot:prepend>
                          <v-icon>mdi-map</v-icon>
                        </template>
                        <v-list-item-title>Habitat</v-list-item-title>
                        <v-list-item-subtitle>{{ QuerySpecies.habitat.name }}</v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-card>

              <!-- Catch Result -->
              <v-expand-transition>
                <v-alert
                  v-if="catchRate > 0"
                  :type="getCatchSuccessColor()"
                  variant="tonal"
                  class="text-center"
                  prominent
                >
                  <template v-slot:prepend>
                    <v-icon size="large">
                      {{ catchRate > catchRoll ? 'mdi-check-circle' : 'mdi-close-circle' }}
                    </v-icon>
                  </template>

                  <div class="text-h5 font-weight-bold mb-2">
                    {{ getCatchSuccessText() }}
                  </div>

                  <div class="text-body-1">
                    Catch Rate: <strong>{{ catchRate.toFixed(1) }}</strong> | Your Roll:
                    <strong>{{ catchRoll }}</strong>
                  </div>

                  <v-progress-linear
                    :model-value="(catchRate / (catchRate + catchRoll)) * 100"
                    :color="getCatchSuccessColor()"
                    height="8"
                    class="mt-3"
                    rounded
                  ></v-progress-linear>
                </v-alert>
              </v-expand-transition>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.pokemon-calculator {
  padding: 2rem 0;
}

.v-card {
  backdrop-filter: blur(10px);
}

.v-slider :deep(.v-slider-thumb) {
  transition: transform 0.2s ease;
}

.v-slider :deep(.v-slider-thumb:hover) {
  transform: scale(1.2);
}

.v-btn {
  text-transform: none;
  font-weight: 600;
}

.v-alert {
  border-radius: 12px;
}

.v-progress-linear {
  border-radius: 4px;
}
</style>
