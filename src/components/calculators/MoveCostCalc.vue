<script setup lang="ts">
import { ref, computed } from 'vue'

interface Move {
  name: string
  accuracy?: number | null
  bp: number
  priority: number
  type: { name: string }
  target?: { name: string } | null
  flavor_text_entries: {
    flavor_text: string
    language: { name: string }
    version_group: { name: string }
  }[]
  isLoading: boolean
  error: string | null
}

const QueryMove = ref<Move>({
  name: '',
  bp: 0,
  priority: 0,
  type: { name: '' },
  flavor_text_entries: [],
  isLoading: false,
  error: null,
})

// Price calculator data
const moveSecondaryEffects = ref<number>(0)
const moveStatChanges = ref<number>(0)
const moveFieldEffects = ref<number>(0)
const moveCost = ref<number>(0)

const calculateMoveCost = (
  basePower: number,
  statChanges: number,
  secondaryEffects: number,
  fieldEffects: number,
) => {
  let cost = Math.round(basePower * 1000)

  cost += statChanges * 25000

  cost += secondaryEffects * 10000

  cost += fieldEffects * 50000

  moveCost.value = cost
}

const fetchMoveData = async (moveName: string) => {
  if (!moveName.trim()) {
    QueryMove.value = {
      name: '',
      isLoading: false,
      error: null,
      bp: 0,
      priority: 0,
      type: { name: '' },
      flavor_text_entries: [],
    }
    return
  }

  const move = QueryMove.value
  move.isLoading = true
  move.error = null

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/move/${moveName
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/'/g, '')
        .replace(/$-/g, '')}`,
    )

    if (!response.ok) {
      throw new Error('Move not found')
    }

    const data = await response.json()

    move.name = data.name
      .split('-')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    move.bp = data.power !== null && data.power !== undefined ? data.power.toString() : 'N/A'
    move.priority = data.priority.toString()
    move.type.name = data.type.name
    move.accuracy = data.accuracy

    move.flavor_text_entries =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.flavor_text_entries.filter((ft: any) => ft.language.name === 'en').pop()?.flavor_text ||
      'No English description available'

    QueryMove.value = {
      name: move.name,
      bp: move.bp,
      accuracy: move.accuracy,
      priority: move.priority,
      type: move.type,
      flavor_text_entries: move.flavor_text_entries,
      isLoading: false,
      error: null,
    }
  } catch (error) {
    console.error('Error fetching move data:', error)
    move.error = 'Move not found'
    move.isLoading = false
  }
}

// Computed properties for enhanced UX
const moveTypeColor = computed(() => {
  const typeColors: { [key: string]: string } = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  }
  return typeColors[QueryMove.value.type?.name?.toLowerCase()] || '#68A090'
})
</script>
<template>
  <v-row justify="center">
    <v-col cols="12" align-self="auto">
      <v-card elevation="8" class="pa-6 glass-card hover-lift">
        <div class="section-header">
          <h3 class="text-h5">
            <v-icon class="mr-2">mdi-cash-multiple</v-icon>
            Price Calculator
          </h3>
        </div>

        <v-alert type="warning" class="mt-4" variant="tonal" rounded>
          <v-icon>mdi-construction</v-icon>
          <strong>Work in Progress!</strong><br />
          Manual entry required for stat changes, secondary effects, and field effects. Enhanced
          automation coming soon!
        </v-alert>

        <v-text-field
          v-model="QueryMove.name"
          label="Move Name"
          variant="outlined"
          density="comfortable"
          @keyup.enter="() => fetchMoveData(QueryMove.name)"
          clearable
          class="enhanced-input mt-4"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>

        <div
          v-if="QueryMove.name && !QueryMove.isLoading && !QueryMove.error"
          class="pokemon-stats mt-4"
        >
          <v-card class="move-details-card" elevation="12" rounded="lg">
            <div class="move-header">
              <v-icon class="mr-3" size="large">mdi-sword-cross</v-icon>
              <span class="text-h5 font-weight-bold">{{ QueryMove.name }}</span>
            </div>

            <v-card-text class="pa-6">
              <v-row>
                <v-col cols="12" md="6">
                  <div class="move-info-item">
                    <v-chip color="primary" variant="flat" size="small" class="mb-2 enhanced-chip">
                      <v-icon start>mdi-flash</v-icon>
                      Base Power
                    </v-chip>
                    <div class="move-value">
                      {{ QueryMove.bp || 'N/A' }}
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <div class="move-info-item">
                    <v-chip color="warning" variant="flat" size="small" class="mb-2 enhanced-chip">
                      <v-icon start>mdi-speedometer</v-icon>
                      Priority
                    </v-chip>
                    <div class="move-value">
                      {{ QueryMove.priority }}
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <div class="move-info-item" :style="`background-color: ${moveTypeColor};`">
                    <v-chip color="info" variant="flat" size="small" class="mb-2 enhanced-chip">
                      <v-icon start>mdi-shield</v-icon>
                      Type
                    </v-chip>
                    <div class="move-value">
                      {{ QueryMove.type?.name || 'Unknown' }}
                    </div>
                  </div>
                </v-col>

                <v-col cols="12">
                  <div class="move-info-item">
                    <v-chip color="purple" variant="flat" size="small" class="mb-3 enhanced-chip">
                      <v-icon start>mdi-text</v-icon>
                      Description
                    </v-chip>
                    <v-card variant="tonal" class="flavor-text-card">
                      <v-card-text class="text-body-1 font-italic">
                        {{ QueryMove.flavor_text_entries || 'No description available' }}
                      </v-card-text>
                    </v-card>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-card class="mt-4 glass-card" elevation="4">
            <v-card-text>
              <v-form @submit.prevent>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="moveStatChanges"
                      label="Stat Changes"
                      variant="outlined"
                      type="number"
                      min="0"
                      class="enhanced-input"
                      prepend-inner-icon="mdi-trending-up"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="moveSecondaryEffects"
                      label="Secondary Effects"
                      variant="outlined"
                      type="number"
                      min="0"
                      class="enhanced-input"
                      prepend-inner-icon="mdi-star"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="moveFieldEffects"
                      label="Field Effects"
                      variant="outlined"
                      type="number"
                      min="0"
                      class="enhanced-input"
                      prepend-inner-icon="mdi-earth"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-btn
                  class="mt-2 enhanced-btn"
                  type="submit"
                  block
                  size="large"
                  @click="
                    calculateMoveCost(
                      QueryMove.bp,
                      moveStatChanges,
                      moveSecondaryEffects,
                      moveFieldEffects,
                    )
                  "
                >
                  <v-icon start>mdi-calculator</v-icon>
                  Calculate Cost
                </v-btn>
                <v-text-field
                  v-model="moveCost"
                  label="Move Cost"
                  variant="outlined"
                  disabled
                  class="mt-4"
                  prepend-inner-icon="mdi-currency-usd"
                ></v-text-field>
              </v-form>
            </v-card-text>
          </v-card>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>
