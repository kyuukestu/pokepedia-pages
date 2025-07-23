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
  accuracy: null,
  priority: 0,
  type: { name: '' },
  flavor_text_entries: [],
  isLoading: false,
  error: null,
})

// Move calculator data
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
  if (typeof basePower !== 'number') {
    basePower = 0
  }

  let cost = Math.round(basePower / 20)
  console.log('base power is:', basePower)
  console.log('cost', cost)
  cost += statChanges * 3
  console.log('stat changes', statChanges)
  console.log('cost', cost)
  cost += secondaryEffects * 3
  console.log('secondary effects', secondaryEffects)
  console.log('cost', cost)

  cost += fieldEffects * 5
  console.log('field effects', fieldEffects)
  console.log('cost', cost)

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

const basePowerDisplay = computed(() => {
  return QueryMove.value.bp === 0 ? 'Status' : QueryMove.value.bp
})

const priorityIcon = computed(() => {
  const priority = parseInt(QueryMove.value.priority.toString())
  if (priority > 0) return 'mdi-chevron-double-up'
  if (priority < 0) return 'mdi-chevron-double-down'
  return 'mdi-minus'
})

const priorityColor = computed(() => {
  const priority = parseInt(QueryMove.value.priority.toString())
  if (priority > 0) return 'success'
  if (priority < 0) return 'error'
  return 'info'
})
</script>

<template>
  <v-col cols="12" md="10" lg="8" class="mx-auto">
    <v-card
      elevation="12"
      class="pa-8 main-card"
      :style="{
        background:
          'linear-gradient(135deg, rgba(25, 32, 72, 0.95) 0%, rgba(49, 27, 146, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '24px',
      }"
    >
      <!-- Header Section -->
      <div class="text-center mb-8">
        <div class="d-flex align-center justify-center mb-4">
          <v-avatar size="64" class="mr-4 glow-avatar">
            <v-icon size="40" color="white">mdi-sword-cross</v-icon>
          </v-avatar>
          <div>
            <h2 class="text-h3 font-weight-bold text-white mb-2">Move Calculator</h2>
            <p class="text-subtitle-1 text-blue-grey-lighten-2">
              Calculate move costs and analyze battle moves
            </p>
          </div>
        </div>
      </div>

      <!-- Work in Progress Alert -->
      <v-alert
        type="warning"
        class="mb-6 wip-alert"
        variant="elevated"
        elevation="4"
        :style="{
          background:
            'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(255, 193, 7, 0.1) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 193, 7, 0.3)',
          borderRadius: '16px',
        }"
      >
        <div class="d-flex align-center">
          <v-icon size="32" color="orange" class="mr-3">mdi-construction</v-icon>
          <div>
            <div class="text-h6 font-weight-bold text-orange mb-1">Work in Progress!</div>
            <div class="text-body-2 text-orange-lighten-1">
              Manual entry required for stat changes, secondary effects, and field effects. Enhanced
              automation coming soon!
            </div>
          </div>
        </div>
      </v-alert>

      <!-- Move Search -->
      <v-card
        class="mb-6 search-card"
        elevation="4"
        :style="{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
        }"
      >
        <v-card-text class="pa-6">
          <v-text-field
            v-model="QueryMove.name"
            label="Search for a Move"
            variant="outlined"
            density="comfortable"
            @keyup.enter="() => fetchMoveData(QueryMove.name)"
            :loading="QueryMove.isLoading"
            :error="!!QueryMove.error"
            :error-messages="QueryMove.error"
            clearable
            class="search-input"
            prepend-inner-icon="mdi-magnify"
            :style="{
              '--v-field-background': 'rgba(255, 255, 255, 0.1)',
              '--v-field-border-color': 'rgba(255, 255, 255, 0.3)',
            }"
          >
            <template #label>
              <span class="text-white font-weight-medium">Search for a Move</span>
            </template>
            <template #append>
              <v-btn
                @click="fetchMoveData(QueryMove.name)"
                color="primary"
                variant="elevated"
                size="small"
                :loading="QueryMove.isLoading"
                class="search-btn"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-card-text>
      </v-card>

      <!-- Move Details -->
      <v-expand-transition>
        <div v-if="QueryMove.name && !QueryMove.isLoading && !QueryMove.error">
          <!-- Move Info Card -->
          <v-card
            class="mb-6 move-details-card"
            elevation="8"
            :style="{
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '20px',
              overflow: 'hidden',
            }"
          >
            <!-- Move Header -->
            <div
              class="move-header pa-6"
              :style="{
                background: `linear-gradient(135deg, ${moveTypeColor}40 0%, ${moveTypeColor}20 100%)`,
                borderBottom: `2px solid ${moveTypeColor}60`,
              }"
            >
              <div class="d-flex align-center justify-space-between">
                <div class="d-flex align-center">
                  <v-avatar size="48" class="mr-4" :style="{ background: moveTypeColor }">
                    <v-icon color="white" size="32">mdi-sword-cross</v-icon>
                  </v-avatar>
                  <div>
                    <h3 class="text-h4 font-weight-bold text-white mb-1">{{ QueryMove.name }}</h3>
                    <v-chip
                      :color="moveTypeColor"
                      variant="elevated"
                      size="small"
                      class="text-capitalize font-weight-bold"
                    >
                      {{ QueryMove.type?.name || 'Unknown' }} Type
                    </v-chip>
                  </div>
                </div>
              </div>
            </div>

            <v-card-text class="pa-6">
              <!-- Move Stats Grid -->
              <v-row class="mb-4">
                <v-col cols="12" sm="6" md="3">
                  <v-card
                    class="stat-card text-center pa-4"
                    :style="{
                      background:
                        'linear-gradient(135deg, rgba(33, 150, 243, 0.2) 0%, rgba(33, 150, 243, 0.1) 100%)',
                      border: '1px solid rgba(33, 150, 243, 0.3)',
                      borderRadius: '12px',
                    }"
                  >
                    <v-icon size="32" color="blue" class="mb-2">mdi-flash</v-icon>
                    <div class="text-caption text-blue-grey-lighten-2 mb-1">Base Power</div>
                    <div class="text-h5 font-weight-bold text-blue">{{ basePowerDisplay }}</div>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <v-card
                    class="stat-card text-center pa-4"
                    :style="{
                      background: `linear-gradient(135deg, rgba(255, 152, 0, 0.2) 0%, rgba(255, 152, 0, 0.1) 100%)`,
                      border: '1px solid rgba(255, 152, 0, 0.3)',
                      borderRadius: '12px',
                    }"
                  >
                    <v-icon size="32" :color="priorityColor" class="mb-2">{{
                      priorityIcon
                    }}</v-icon>
                    <div class="text-caption text-blue-grey-lighten-2 mb-1">Priority</div>
                    <div class="text-h5 font-weight-bold" :class="`text-${priorityColor}`">
                      {{ QueryMove.priority > 0 ? '+' : '' }}{{ QueryMove.priority }}
                    </div>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <v-card
                    class="stat-card text-center pa-4"
                    :style="{
                      background:
                        'linear-gradient(135deg, rgba(156, 39, 176, 0.2) 0%, rgba(156, 39, 176, 0.1) 100%)',
                      border: '1px solid rgba(156, 39, 176, 0.3)',
                      borderRadius: '12px',
                    }"
                  >
                    <v-icon size="32" color="purple" class="mb-2">mdi-target</v-icon>
                    <div class="text-caption text-blue-grey-lighten-2 mb-1">Accuracy</div>
                    <div class="text-h5 font-weight-bold text-purple">
                      {{ QueryMove.accuracy || 'N/A' }}
                    </div>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <v-card
                    class="stat-card text-center pa-4"
                    :style="{
                      background:
                        'linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(76, 175, 80, 0.1) 100%)',
                      border: '1px solid rgba(76, 175, 80, 0.3)',
                      borderRadius: '12px',
                    }"
                  >
                    <v-icon size="32" color="green" class="mb-2">mdi-currency-usd</v-icon>
                    <div class="text-caption text-blue-grey-lighten-2 mb-1">Current Cost</div>
                    <div class="text-h5 font-weight-bold text-green">{{ moveCost || 0 }}</div>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Move Description -->
              <v-card
                class="description-card"
                :style="{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                }"
              >
                <v-card-text class="pa-4">
                  <div class="d-flex align-center mb-3">
                    <v-icon color="purple" class="mr-2">mdi-text</v-icon>
                    <span class="text-subtitle-1 font-weight-bold text-white"
                      >Move Description</span
                    >
                  </div>
                  <p
                    class="text-body-1 text-blue-grey-lighten-1 font-italic mb-0"
                    style="line-height: 1.6"
                  >
                    {{ QueryMove.flavor_text_entries || 'No description available' }}
                  </p>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>

          <!-- Cost Calculator -->
          <v-card
            class="calculator-card"
            elevation="8"
            :style="{
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '20px',
            }"
          >
            <v-card-text class="pa-6">
              <div class="text-center mb-6">
                <h4 class="text-h4 font-weight-bold text-white mb-2">Cost Calculator</h4>
                <p class="text-subtitle-2 text-blue-grey-lighten-2">
                  Adjust additional effects to calculate the final move cost
                </p>
              </div>

              <v-form @submit.prevent>
                <v-row class="mb-4">
                  <v-col cols="12" md="4">
                    <v-card
                      class="input-card pa-4"
                      :style="{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                      }"
                    >
                      <div class="d-flex align-center mb-3">
                        <v-icon color="orange" class="mr-2">mdi-trending-up</v-icon>
                        <span class="text-subtitle-2 font-weight-bold text-white"
                          >Stat Changes</span
                        >
                      </div>
                      <v-text-field
                        v-model="moveStatChanges"
                        variant="outlined"
                        type="number"
                        min="0"
                        density="compact"
                        hide-details
                        :style="{
                          '--v-field-background': 'rgba(255, 255, 255, 0.1)',
                          '--v-field-border-color': 'rgba(255, 255, 255, 0.3)',
                        }"
                      ></v-text-field>
                      <div class="text-caption text-blue-grey-lighten-3 mt-2">
                        Cost: +{{ moveStatChanges * 3 }} points
                      </div>
                    </v-card>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-card
                      class="input-card pa-4"
                      :style="{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                      }"
                    >
                      <div class="d-flex align-center mb-3">
                        <v-icon color="purple" class="mr-2">mdi-star</v-icon>
                        <span class="text-subtitle-2 font-weight-bold text-white"
                          >Secondary Effects</span
                        >
                      </div>
                      <v-text-field
                        v-model="moveSecondaryEffects"
                        variant="outlined"
                        type="number"
                        min="0"
                        density="compact"
                        hide-details
                        :style="{
                          '--v-field-background': 'rgba(255, 255, 255, 0.1)',
                          '--v-field-border-color': 'rgba(255, 255, 255, 0.3)',
                        }"
                      ></v-text-field>
                      <div class="text-caption text-blue-grey-lighten-3 mt-2">
                        Cost: +{{ moveSecondaryEffects * 3 }} points
                      </div>
                    </v-card>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-card
                      class="input-card pa-4"
                      :style="{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                      }"
                    >
                      <div class="d-flex align-center mb-3">
                        <v-icon color="green" class="mr-2">mdi-earth</v-icon>
                        <span class="text-subtitle-2 font-weight-bold text-white"
                          >Field Effects</span
                        >
                      </div>
                      <v-text-field
                        v-model="moveFieldEffects"
                        variant="outlined"
                        type="number"
                        min="0"
                        density="compact"
                        hide-details
                        :style="{
                          '--v-field-background': 'rgba(255, 255, 255, 0.1)',
                          '--v-field-border-color': 'rgba(255, 255, 255, 0.3)',
                        }"
                      ></v-text-field>
                      <div class="text-caption text-blue-grey-lighten-3 mt-2">
                        Cost: +{{ moveFieldEffects * 5 }} points
                      </div>
                    </v-card>
                  </v-col>
                </v-row>

                <!-- Calculate Button -->
                <v-btn
                  @click="
                    calculateMoveCost(
                      QueryMove.bp,
                      moveStatChanges,
                      moveSecondaryEffects,
                      moveFieldEffects,
                    )
                  "
                  color="primary"
                  variant="elevated"
                  size="x-large"
                  block
                  class="calculate-btn mb-4"
                  :style="{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                  }"
                >
                  <v-icon start size="24">mdi-calculator</v-icon>
                  Calculate Final Cost
                </v-btn>

                <!-- Final Cost Display -->
                <v-card
                  class="final-cost-card text-center pa-6"
                  :style="{
                    background:
                      'linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(76, 175, 80, 0.1) 100%)',
                    border: '2px solid rgba(76, 175, 80, 0.5)',
                    borderRadius: '16px',
                  }"
                >
                  <v-icon size="48" color="green" class="mb-3">mdi-currency-usd</v-icon>
                  <div class="text-h6 text-green-lighten-1 mb-2">Final Move Cost</div>
                  <div class="text-h2 font-weight-bold text-green">{{ moveCost || 0 }}</div>
                  <div class="text-caption text-green-lighten-2 mt-2">
                    Base ({{ Math.round(QueryMove.bp / 20) }}) + Stats ({{ moveStatChanges * 3 }}) +
                    Effects ({{ moveSecondaryEffects * 3 }}) + Field ({{ moveFieldEffects * 5 }})
                  </div>
                </v-card>
              </v-form>
            </v-card-text>
          </v-card>
        </div>
      </v-expand-transition>
    </v-card>
  </v-col>
</template>

<style scoped>
.main-card {
  transition: all 0.3s ease;
}

.glow-avatar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
}

.wip-alert {
  transition: all 0.3s ease;
}

.wip-alert:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(255, 193, 7, 0.3);
}

.search-input :deep(.v-field__input) {
  color: white !important;
}

.search-input :deep(.v-field__prepend-inner .v-icon) {
  color: rgba(255, 255, 255, 0.7) !important;
}

.search-btn {
  transition: all 0.3s ease;
}

.search-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
}

.move-details-card {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.move-details-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.move-details-card:hover::before {
  left: 100%;
}

.move-details-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
}

.stat-card {
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.description-card {
  transition: all 0.3s ease;
}

.description-card:hover {
  background: rgba(255, 255, 255, 0.08) !important;
}

.calculator-card {
  transition: all 0.3s ease;
}

.calculator-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
}

.input-card {
  transition: all 0.3s ease;
}

.input-card:hover {
  background: rgba(255, 255, 255, 0.08) !important;
  transform: translateY(-1px);
}

.input-card :deep(.v-field__input) {
  color: white !important;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.calculate-btn {
  transition: all 0.3s ease;
}

.calculate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.6) !important;
}

.final-cost-card {
  transition: all 0.3s ease;
}

.final-cost-card:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
}

/* Responsive improvements */
@media (max-width: 768px) {
  .main-card {
    margin: 8px;
    padding: 16px !important;
  }

  .move-header {
    padding: 16px !important;
  }

  .text-h3 {
    font-size: 1.8rem !important;
  }

  .text-h4 {
    font-size: 1.5rem !important;
  }

  .stat-card {
    margin-bottom: 16px;
  }
}

/* Animation for expand transition */
.v-expand-transition-enter-active,
.v-expand-transition-leave-active {
  transition: all 0.3s ease;
}

.v-expand-transition-enter-from,
.v-expand-transition-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Custom scrollbar */
:deep(.v-field__input) {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

:deep(.v-field__input)::-webkit-scrollbar {
  width: 4px;
}

:deep(.v-field__input)::-webkit-scrollbar-track {
  background: transparent;
}

:deep(.v-field__input)::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}
</style>
