<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Reactive data
const demoFortitude = ref<number>(75)
const totalFortitude = ref<number>(150)

// Move calculator data
const moveSecondaryEffects = ref<number>(0)
const moveStatChanges = ref<number>(0)
const moveFieldEffects = ref<number>(0)
const moveCost = ref<number>(0)

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

// Updated Pokemon structure with loading and error states
interface Pokemon {
  name: string
  bst: number
  isLoading: boolean
  error: string | null
  sprite?: string
  isAlpha?: boolean
  additionalAbilities?: number
  inBox?: boolean
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

// Initialize 6 empty Pokemon slots
const pokemonTeam = ref<Pokemon[]>(
  Array.from({ length: 6 }, () => ({
    name: '',
    bst: 0,
    isLoading: false,
    error: null,
    sprite: '',
    isAlpha: false,
    additionalAbilities: 0,
    inBox: false,
  })),
)

// Trainer ranks data
const trainerRanks = ref([
  {
    name: 'Bronze',
    fortitude: '50 ~ 130',
    color: 'brown-lighten-2',
    icon: 'mdi-sprout',
    description: 'Beginning trainers with basic Fortitude reserves',
  },
  {
    name: 'Silver',
    fortitude: '150 ~ 250',
    color: 'blue-grey-lighten-2',
    icon: 'mdi-leaf',
    description: 'Developing trainers with growing energy pools',
  },
  {
    name: 'Gold',
    fortitude: '300 ~ 500',
    color: 'yellow-lighten-2',
    icon: 'mdi-star',
    description: 'Skilled trainers with substantial reserves',
  },
  {
    name: 'Platinum',
    fortitude: '1,000+',
    color: 'blue-grey-lighten-1',
    icon: 'mdi-crown',
    description: 'Expert trainers with impressive Fortitude capacity',
  },
  {
    name: 'Master',
    fortitude: '2,500+',
    color: 'orange-lighten-2',
    icon: 'mdi-fire',
    description: 'Master trainers with exceptional energy control',
  },
  {
    name: 'High Master',
    fortitude: '5,000+',
    color: 'red-lighten-2',
    icon: 'mdi-trophy',
    description: 'Elite trainers with advanced Fortitude mastery',
  },
  {
    name: 'Grand Master',
    fortitude: '10,000+',
    color: 'purple-lighten-2',
    icon: 'mdi-diamond',
    description: 'Legendary trainers with extraordinary reserves',
  },
  {
    name: 'Legendary',
    fortitude: '???',
    color: 'deep-purple-lighten-1',
    icon: 'mdi-infinity',
    description: 'Mythical trainers transcending normal limits',
  },
])

const mechanics = [
  {
    title: 'Base Fortitude',
    subtitle: 'Average Bronze trainer starts at 50 points',
    icon: 'mdi-heart',
    color: 'red',
  },
  {
    title: 'Pokémon Upkeep',
    subtitle: 'Cost calculated with exponential formula',
    icon: 'mdi-pokemon-go',
    color: 'blue',
  },
  {
    title: 'Move Costs',
    subtitle: 'Remaining Fortitude fuels attacks and abilities',
    icon: 'mdi-sword-cross',
    color: 'green',
  },
  {
    title: 'Rank Progression',
    subtitle: 'Higher ranks unlock greater Fortitude reserves',
    icon: 'mdi-trending-up',
    color: 'purple',
  },
]

// Functions
const calculateUpkeepCost = (
  bst: number,
  isAlpha = false,
  additionalAbilities = 0,
  inBox = false,
): number => {
  if (bst === 0) return 0

  let baseCost = 2
  if (isAlpha) baseCost += 0.25
  if (additionalAbilities > 0) baseCost += additionalAbilities * 0.1

  let cost = Math.round(Math.pow(baseCost, bst / 100))

  if (inBox) cost = Math.round(cost / 4)

  return cost
}

const calculateMoveCost = (
  basePower: number,
  statChanges: number,
  secondaryEffects: number,
  fieldEffects: number,
) => {
  let cost = Math.round(basePower / 20)
  console.log('base power', basePower)
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

    //console.log('move.name', move.name)
    move.bp = data.power !== null && data.power !== undefined ? data.power.toString() : 'N/A'
    //console.log('move.bp', move.bp)
    move.priority = data.priority.toString()
    //console.log('move.priority', move.priority)
    move.type.name = data.type.name
    //console.log('move.type.name', move.type.name)

    move.flavor_text_entries =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.flavor_text_entries.filter((ft: any) => ft.language.name === 'en').pop()?.flavor_text ||
      'No English description available'
    //console.log('move.flavor_text_entries', move.flavor_text_entries)

    QueryMove.value = {
      name: move.name,
      bp: move.bp,
      priority: move.priority,
      type: move.type,
      flavor_text_entries: move.flavor_text_entries,
      isLoading: false,
      error: null,
    }

    //console.log('QueryMove', QueryMove.value) // Log the updated QueryMove
  } catch (error) {
    console.error('Error fetching move data:', error)
  }
}

const fetchPokemonData = async (pokemonName: string, slotIndex: number) => {
  if (!pokemonName.trim()) {
    pokemonTeam.value[slotIndex] = {
      name: '',
      bst: 0,
      isLoading: false,
      error: null,
      sprite: '',
      isAlpha: false,
      additionalAbilities: 0,
      inBox: false,
    }
    return
  }

  const pokemon = pokemonTeam.value[slotIndex]
  pokemon.isLoading = true
  pokemon.error = null

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/'/g, '')
        .replace(/$-/g, '')}`,
    )

    if (!response.ok) {
      throw new Error('Pokemon not found')
    }

    const data = await response.json()

    // Calculate BST (Base Stat Total)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bst = data.stats.reduce((total: number, stat: any) => total + stat.base_stat, 0)

    pokemon.name = data.name.charAt(0).toUpperCase() + data.name.slice(1)
    pokemon.bst = bst
    pokemon.sprite = data.sprites.front_default || ''
    pokemon.isLoading = false
  } catch (error) {
    pokemon.error = 'Pokemon not found: ' + (error as Error).message
    pokemon.bst = 0
    pokemon.sprite = ''
    pokemon.isLoading = false
  }
}

const clearPokemonSlot = (slotIndex: number) => {
  pokemonTeam.value[slotIndex] = {
    name: '',
    bst: 0,
    isLoading: false,
    error: null,
    sprite: '',
    isAlpha: false,
    additionalAbilities: 0,
    inBox: false,
  }
}

// Computed properties
const totalUpkeepCost = computed(() => {
  return pokemonTeam.value.reduce((total, pokemon) => {
    return (
      total +
      calculateUpkeepCost(pokemon.bst, pokemon.isAlpha, pokemon.additionalAbilities, pokemon.inBox)
    )
  }, 0)
})

const remainingFortitude = computed(() => {
  const remaining = totalFortitude.value - totalUpkeepCost.value
  return Math.max(0, remaining)
})

// Lifecycle hooks
onMounted(() => {
  setInterval(() => {
    demoFortitude.value = 50 + Math.random() * 50
  }, 3000)
})
</script>

<template>
  <v-app>
    <!-- Enhanced Hero Section -->
    <v-container fluid class="hero-section pa-0">
      <v-row no-gutters align="center" class="fill-height">
        <v-col cols="12">
          <div class="hero-content text-center py-16">
            <div class="hero-icon-container mb-6">
              <v-icon size="80" class="hero-icon">mdi-lightning-bolt</v-icon>
            </div>
            <h1 class="hero-title mb-4">Fortitude Power System</h1>
            <p class="hero-subtitle mb-8">
              The life force that binds trainers and Pokémon in eternal partnership
            </p>

            <!-- Enhanced Fortitude Meter -->
            <v-card class="fortitude-meter-card mx-auto" max-width="500" elevation="8" rounded="xl">
              <v-card-text class="pa-6">
                <div class="d-flex align-center mb-4">
                  <v-icon class="mr-2" color="white">mdi-battery-charging</v-icon>
                  <span class="text-h6 font-weight-medium">Demo Fortitude</span>
                </div>
                <v-progress-linear
                  :model-value="demoFortitude"
                  height="24"
                  rounded
                  color="gradient"
                  class="fortitude-progress mb-3"
                >
                  <template v-slot:default="{ value }">
                    <strong class="text-white">{{ Math.round(value) }}%</strong>
                  </template>
                </v-progress-linear>
                <div class="d-flex justify-space-between text-body-2">
                  <span>{{ Math.round(demoFortitude) }}/100</span>
                  <span>Fortitude Points</span>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Main Content -->
    <v-container class="my-8">
      <!-- Enhanced Overview Section -->
      <v-row class="mb-12">
        <v-col cols="12">
          <v-card elevation="8" class="overflow-hidden" rounded="xl">
            <v-card-title class="text-center pa-8 section-header">
              <v-icon class="mr-3" size="40">mdi-information</v-icon>
              <span class="text-h3 font-weight-light">What is Fortitude?</span>
            </v-card-title>

            <v-card-text class="pa-8">
              <v-row>
                <v-col cols="12" md="6">
                  <div class="text-content">
                    <p class="text-body-1 mb-4">
                      Fortitude is the fundamental energy reservoir that flows between trainers and
                      their Pokémon. This mystical force serves as the bridge connecting human will
                      to Pokémon power, enabling the Synchronization Bond and fueling a Pokémon's
                      abilities to an extend hitherto unseen.
                    </p>
                    <p class="text-body-1 mb-4">
                      The average trainer begins their journey at Bronze I with approx.
                      <v-chip color="primary" variant="elevated" class="mx-1">
                        <v-icon start>mdi-numeric-5</v-icon>
                        50 points
                      </v-chip>
                      of Fortitude, a modest wellspring that grows stronger with experience,
                      dedication, and the bonds forged with their partners.
                    </p>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card
                    class="function-card pa-6 h-100"
                    color="blue-grey-lighten-5"
                    elevation="4"
                    rounded="lg"
                  >
                    <div class="text-center mb-4">
                      <v-icon size="48" color="primary">mdi-heart-pulse</v-icon>
                      <h3 class="text-h5 mt-2 font-weight-medium">Core Functions</h3>
                    </div>

                    <v-divider class="my-4"></v-divider>

                    <div class="function-chips">
                      <v-chip class="ma-2" color="primary" variant="elevated" size="large">
                        <v-icon start>mdi-pokemon-go</v-icon>
                        Pokémon Sustenance
                      </v-chip>
                      <v-chip class="ma-2" color="secondary" variant="elevated" size="large">
                        <v-icon start>mdi-sword-cross</v-icon>
                        Move Usage
                      </v-chip>
                      <v-chip class="ma-2" color="success" variant="elevated" size="large">
                        <v-icon start>mdi-star-circle</v-icon>
                        Ability Activation
                      </v-chip>
                      <v-chip class="ma-2" color="warning" variant="elevated" size="large">
                        <v-icon start>mdi-run-fast</v-icon>
                        Physical Enhancement
                      </v-chip>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Enhanced Trainer Ranks Section -->
      <v-row class="mb-12">
        <v-col cols="12">
          <div class="text-center mb-8">
            <h2 class="text-h3 font-weight-light mb-2">
              <v-icon class="mr-3" size="40">mdi-trophy</v-icon>
              Trainer Ranks & Fortitude Progression
            </h2>
            <p class="text-h6 text-medium-emphasis">Journey through the ranks of mastery</p>
          </div>

          <v-row>
            <v-col v-for="rank in trainerRanks" :key="rank.name" cols="12" sm="6" md="4" lg="3">
              <v-card
                :color="rank.color"
                class="rank-card pa-6 text-center h-100"
                elevation="6"
                rounded="xl"
              >
                <div class="rank-icon-container mb-4">
                  <v-icon :icon="rank.icon" size="56" class="rank-icon"></v-icon>
                </div>
                <h3 class="text-h4 font-weight-bold mb-2">{{ rank.name }}</h3>
                <v-chip color="white" variant="elevated" class="mb-3" size="large">
                  <v-icon start>mdi-lightning-bolt</v-icon>
                  {{ rank.fortitude }}
                </v-chip>
                <p class="text-body-1">{{ rank.description }}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Enhanced Formulas Section -->
      <v-row class="mb-12">
        <v-col cols="12">
          <v-card elevation="8" class="overflow-hidden" rounded="xl">
            <v-card-title class="text-center pa-8 section-header">
              <v-icon class="mr-3" size="40" color="indigo">mdi-calculator-variant</v-icon>
              <span class="text-h3 font-weight-light">Fortitude Cost Formulas</span>
            </v-card-title>

            <v-card-text class="pa-8">
              <v-row>
                <!-- Enhanced Pokemon Fortitude Cost -->
                <v-col cols="12" lg="6">
                  <v-card
                    class="formula-card pa-6 h-100"
                    color="blue-lighten-5"
                    elevation="4"
                    rounded="lg"
                  >
                    <div class="text-center mb-6">
                      <v-icon size="48" color="blue">mdi-pokemon-go</v-icon>
                      <h3 class="text-h4 mt-2 font-weight-medium">Pokémon Fortitude Cost</h3>
                    </div>

                    <v-expansion-panels variant="accordion" class="mb-4">
                      <v-expansion-panel>
                        <v-expansion-panel-title>
                          <v-icon class="mr-3" color="blue">mdi-function</v-icon>
                          <span class="text-h6">Base Formula</span>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <v-card color="white" elevation="2" class="pa-4">
                            <div class="formula-display text-center">
                              <code class="formula-code text-h5">2^(BST/100)</code>
                            </div>
                            <p class="text-body-1 mt-3 text-center text-medium-emphasis">
                              Base Stat Total determines exponential cost
                            </p>
                          </v-card>
                        </v-expansion-panel-text>
                      </v-expansion-panel>

                      <v-expansion-panel>
                        <v-expansion-panel-title>
                          <v-icon class="mr-3" color="orange">mdi-star-settings</v-icon>
                          <span class="text-h6">Special Modifiers</span>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <v-list>
                            <v-list-item>
                              <template v-slot:prepend>
                                <v-icon color="orange">mdi-alpha</v-icon>
                              </template>
                              <v-list-item-title class="text-body-1">
                                <strong>Alpha Pokémon:</strong>
                              </v-list-item-title>
                              <v-chip color="orange" variant="outlined" class="ml-2" size="small"
                                >+0.25</v-chip
                              >
                              to base (2.25^(BST/100))
                            </v-list-item>
                            <v-list-item>
                              <template v-slot:prepend>
                                <v-icon color="purple">mdi-star-plus</v-icon>
                              </template>
                              <v-list-item-title class="text-body-1">
                                <strong>Additional Abilities:</strong>
                              </v-list-item-title>
                              <v-chip color="purple" variant="outlined" class="ml-2" size="small"
                                >+0.1</v-chip
                              >
                              per ability
                            </v-list-item>
                          </v-list>
                        </v-expansion-panel-text>
                      </v-expansion-panel>

                      <v-expansion-panel>
                        <v-expansion-panel-title>
                          <v-icon class="mr-3" color="green">mdi-package-variant</v-icon>
                          <span class="text-h6">Storage Bonus</span>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <v-alert type="success" variant="tonal" class="mb-3">
                            <v-alert-title>
                              <v-icon class="mr-2">mdi-lightbulb</v-icon>
                              Storage Efficiency
                            </v-alert-title>
                            Pokémon stored in boxes require significantly less Fortitude!
                          </v-alert>
                          <v-list>
                            <v-list-item>
                              <template v-slot:prepend>
                                <v-icon color="green">mdi-package-variant</v-icon>
                              </template>
                              <v-list-item-title class="text-body-1">
                                <strong>In Box:</strong> Divide total cost by
                                <v-chip color="green" variant="elevated" class="ml-2">4</v-chip>
                              </v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-expansion-panel-text>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-card>
                </v-col>

                <!-- Enhanced Move Fortitude Cost -->
                <v-col cols="12" lg="6">
                  <v-card
                    class="formula-card pa-6 h-100"
                    color="purple-lighten-5"
                    elevation="4"
                    rounded="lg"
                  >
                    <div class="text-center mb-6">
                      <v-icon size="48" color="purple">mdi-sword-cross</v-icon>
                      <h3 class="text-h4 mt-2 font-weight-medium">Move Fortitude Cost</h3>
                    </div>

                    <v-expansion-panels variant="accordion" class="mb-4">
                      <v-expansion-panel>
                        <v-expansion-panel-title>
                          <v-icon class="mr-3" color="purple">mdi-function</v-icon>
                          <span class="text-h6">Base Formula</span>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <v-card color="white" elevation="2" class="pa-4">
                            <div class="formula-display text-center">
                              <code class="formula-code text-h5">BP/20 = FP</code>
                            </div>
                            <p class="text-body-1 mt-3 text-center text-medium-emphasis">
                              Base Power divided by 20 equals Fortitude Points
                            </p>
                          </v-card>
                        </v-expansion-panel-text>
                      </v-expansion-panel>

                      <v-expansion-panel>
                        <v-expansion-panel-title>
                          <v-icon class="mr-3" color="orange">mdi-trending-up</v-icon>
                          <span class="text-h6">Effect Modifiers</span>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <v-list>
                            <v-list-item>
                              <template v-slot:prepend>
                                <v-icon color="orange">mdi-trending-up</v-icon>
                              </template>
                              <v-list-item-title class="text-body-1">
                                <strong>Stat Changes:</strong>
                              </v-list-item-title>
                              <v-chip color="orange" variant="outlined" class="ml-2" size="small"
                                >+3 FP</v-chip
                              >
                              per stat change/effect
                            </v-list-item>
                            <v-list-item>
                              <template v-slot:prepend>
                                <v-icon color="red">mdi-earth</v-icon>
                              </template>
                              <v-list-item-title class="text-body-1">
                                <strong>Field/Team Effects:</strong>
                              </v-list-item-title>
                              <v-chip color="red" variant="outlined" class="ml-2" size="small"
                                >+5 FP</v-chip
                              >
                              per effect
                            </v-list-item>
                          </v-list>
                        </v-expansion-panel-text>
                      </v-expansion-panel>

                      <v-expansion-panel>
                        <v-expansion-panel-title>
                          <v-icon class="mr-3" color="info">mdi-lightbulb</v-icon>
                          <span class="text-h6">Examples</span>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <v-card color="info-lighten-4" elevation="1" class="pa-4">
                            <v-list density="compact">
                              <v-list-item>
                                <v-list-item-title>
                                  <strong>Thunderbolt</strong><br />
                                </v-list-item-title>
                                <code
                                  >BP 90: <br />
                                  90/20 = 4.5 ≈ 5 FP (rounded)</code
                                ><br />
                                <code>Secondary Effect: 10% Paralyze so +3 FP</code><br />
                                <v-chip
                                  color="success"
                                  variant="elevated"
                                  class="mt-1"
                                  size="small"
                                >
                                  Total: 8 FP
                                </v-chip>
                              </v-list-item>
                              <v-divider class="my-2"></v-divider>
                              <v-list-item>
                                <v-list-item-title>
                                  <strong>Sword Dance:</strong>
                                </v-list-item-title>
                                Raises Attack by 2 Stages
                                <br />
                                <code> +3 per stage change</code>
                                <br />
                                <v-chip
                                  color="success"
                                  variant="elevated"
                                  class="mt-1"
                                  size="small"
                                >
                                  Total: 6 FP
                                </v-chip>
                              </v-list-item>
                              <v-divider class="my-2"></v-divider>
                              <v-list-item>
                                <v-list-item-title>
                                  <strong>Stealth Rock (Field):</strong>
                                </v-list-item-title>
                                <br />
                                <code>For Field Effects or Team Effects: +5</code>
                                <v-chip
                                  color="success"
                                  variant="elevated"
                                  class="mt-1"
                                  size="small"
                                >
                                  Total: 5 FP
                                </v-chip>
                              </v-list-item>
                            </v-list>
                          </v-card>
                        </v-expansion-panel-text>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Enhanced Mechanics Section -->
      <v-row class="mb-8">
        <v-col cols="12" md="6">
          <v-card elevation="8" class="pa-6 h-100 glass-card hover-lift">
            <div class="section-header">
              <h3 class="text-h5">
                <v-icon class="mr-2">mdi-cog</v-icon>
                Fortitude Mechanics
              </h3>
            </div>
            <v-list class="bg-transparent">
              <v-list-item v-for="(item, index) in mechanics" :key="index" class="mb-2">
                <template v-slot:prepend>
                  <v-avatar size="40" :color="item.color">
                    <v-icon color="white">{{ item.icon }}</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="font-weight-bold">{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle class="text-body-2">{{ item.subtitle }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card elevation="8" class="pa-6 h-100 glass-card hover-lift">
            <div class="section-header">
              <h3 class="text-h5">
                <v-icon class="mr-2">mdi-chart-line</v-icon>
                Bronze Stats
              </h3>
            </div>
            <div class="stat-display">
              <div class="d-flex justify-space-between align-center mb-2">
                <span class="text-body-1">Bronze I</span>
                <span class="text-h6 accent-text"
                  >Starting point, average Pokémon level ~5–10, fortitude 50.</span
                >
              </div>
              <div class="fortitude-bar"></div>
            </div>
            <div class="stat-display">
              <div class="d-flex justify-space-between align-center mb-2">
                <span class="text-body-1">Bronze II</span>
                <span class="text-h6 accent-text">highest level 12, fortitude 70.</span>
              </div>
              <div class="fortitude-bar"></div>
            </div>
            <div class="stat-display">
              <div class="d-flex justify-space-between align-center mb-2">
                <span class="text-body-1">Bronze III</span>
                <span class="text-h6 accent-text">highest level 16 & 3 Badges, fortitude 90.</span>
              </div>
              <div class="fortitude-bar"></div>
            </div>
            <div class="stat-display">
              <div class="d-flex justify-space-between align-center mb-2">
                <span class="text-body-1">Bronze IV</span>
                <span class="text-h6 accent-text">highest level 20 & 5 Badges, fortitude 110.</span>
              </div>
              <div class="fortitude-bar"></div>
            </div>
            <div class="stat-display">
              <div class="d-flex justify-space-between align-center mb-2">
                <span class="text-h6 accent-text">Bronze V</span>
                <br />
                <span class="text-body-1">highest level 25 & 7 Badges, fortitude 130.</span>
              </div>
              <v-progress-linear
                model-value="100"
                height="18"
                rounded
                color="black"
                class="fortitude-progress mb-3"
              >
                <div class="d-flex justify-space-between text-body-2">
                  <span>150 /150</span>
                  <span>Fortitude Points</span>
                </div>
              </v-progress-linear>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Enhanced Calculators Section -->
      <v-row class="mb-8">
        <v-col cols="12" md="6">
          <v-card elevation="8" class="pa-6 glass-card hover-lift">
            <div class="section-header">
              <h3 class="text-h5">
                <v-icon class="mr-2">mdi-sword-cross</v-icon>
                Move Calculator
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
                        <v-chip
                          color="primary"
                          variant="flat"
                          size="small"
                          class="mb-2 enhanced-chip"
                        >
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
                        <v-chip
                          color="warning"
                          variant="flat"
                          size="small"
                          class="mb-2 enhanced-chip"
                        >
                          <v-icon start>mdi-speedometer</v-icon>
                          Priority
                        </v-chip>
                        <div class="move-value">
                          {{ QueryMove.priority }}
                        </div>
                      </div>
                    </v-col>

                    <v-col cols="12" md="6">
                      <div class="move-info-item">
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
                        <v-chip
                          color="purple"
                          variant="flat"
                          size="small"
                          class="mb-3 enhanced-chip"
                        >
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

        <!-- Enhanced Fortitude Calculator -->
        <v-col cols="12" md="6">
          <v-card elevation="8" class="pa-6 glass-card hover-lift">
            <div class="section-header">
              <h3 class="text-h5">
                <v-icon class="mr-2">mdi-pokemon-go</v-icon>
                Team Calculator
              </h3>
            </div>

            <v-text-field
              v-model.number="totalFortitude"
              label="Your Fortitude"
              type="number"
              variant="outlined"
              class="mb-4 enhanced-input"
              prepend-inner-icon="mdi-heart"
              min="0"
            ></v-text-field>

            <h4 class="text-h6 mb-3 accent-text">Your Pokémon Team (6 slots)</h4>

            <div class="d-flex flex-row flex-wrap gap-4 justify-space-between">
              <div
                v-for="(pokemon, index) in pokemonTeam"
                :key="index"
                class="pokemon-slot text-center"
                style="flex: 0 0 33.33%"
              >
                <v-card
                  class="circular-card mb-2"
                  variant="outlined"
                  :color="pokemon.name ? 'primary' : 'grey-lighten-3'"
                  style="
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                    background: linear-gradient(
                      135deg,
                      rgba(102, 126, 234, 0.1),
                      rgba(118, 75, 162, 0.1)
                    );
                    border: 2px solid rgba(255, 255, 255, 0.3);
                  "
                >
                  <div class="slot-number accent-text" v-if="!pokemon.sprite">
                    Slot {{ index + 1 }}
                  </div>
                  <div v-if="pokemon.sprite" class="text-center">
                    <img
                      :src="pokemon.sprite"
                      :alt="pokemon.name"
                      class="pokemon-sprite"
                      style="max-width: 120px; max-height: 120px"
                    />
                  </div>
                </v-card>

                <v-text-field
                  v-model="pokemon.name"
                  @keyup.enter="() => fetchPokemonData(pokemon.name, index)"
                  label="Pokemon Name"
                  variant="outlined"
                  density="compact"
                  :loading="pokemon.isLoading"
                  :error="!!pokemon.error"
                  :error-messages="pokemon.error"
                  clearable
                  @click:clear="clearPokemonSlot(index)"
                  class="enhanced-input"
                  style="width: 150px"
                ></v-text-field>

                <!-- Enhanced Pokemon Options -->
                <div
                  v-if="pokemon.name && !pokemon.isLoading && !pokemon.error"
                  class="pokemon-options mb-2"
                >
                  <v-checkbox
                    v-model="pokemon.isAlpha"
                    label="Alpha"
                    density="compact"
                    color="orange"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="pokemon.inBox"
                    label="In Box"
                    density="compact"
                    color="green"
                    hide-details
                  ></v-checkbox>
                  <v-text-field
                    v-model.number="pokemon.additionalAbilities"
                    label="Extra Abilities"
                    type="number"
                    variant="outlined"
                    density="compact"
                    min="0"
                    max="5"
                    class="enhanced-input"
                    style="width: 150px"
                  ></v-text-field>
                </div>

                <div
                  v-if="pokemon.name && !pokemon.isLoading && !pokemon.error"
                  class="pokemon-stats stat-display"
                >
                  <div class="d-flex flex-column align-center">
                    <small class="text-medium-emphasis">BST: {{ pokemon.bst }}</small>
                    <small class="text-medium-emphasis">
                      Upkeep:
                      <span class="font-weight-bold accent-text">
                        {{
                          calculateUpkeepCost(
                            pokemon.bst,
                            pokemon.isAlpha,
                            pokemon.additionalAbilities,
                            pokemon.inBox,
                          )
                        }}
                      </span>
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <v-divider class="my-4"></v-divider>
            <v-card class="stat-display text-center">
              <v-card-text>
                <p class="text-body-1 mb-2">
                  Total Upkeep Cost: <strong class="accent-text">{{ totalUpkeepCost }}</strong>
                </p>
                <p class="text-h6 mb-2">Available for Moves:</p>
                <p :class="remainingFortitude < 10 ? 'text-red text-h3' : 'text-green text-h3'">
                  {{ remainingFortitude }} Points
                </p>
                <v-progress-linear
                  :model-value="(remainingFortitude / totalFortitude) * 100"
                  :color="remainingFortitude < 10 ? 'red' : 'green'"
                  height="8"
                  rounded
                  class="mt-2"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-card>
        </v-col>
      </v-row>

      <!-- Enhanced Dangers Section -->
      <v-row class="mb-8">
        <v-col cols="12">
          <v-card elevation="8" class="pa-6 glass-card">
            <div class="section-header text-center">
              <h3 class="text-h5">
                <v-icon class="mr-2">mdi-alert-octagon</v-icon>
                Fortitude Deprivation Stages
              </h3>
            </div>
            <v-row>
              <v-col cols="12" md="4">
                <v-card color="orange-lighten-4" class="pa-4 warning-glow hover-lift" elevation="6">
                  <v-card-title class="text-h6">
                    <v-icon color="orange" class="mr-2">mdi-alert</v-icon>
                    Early Warning (10-20%)
                  </v-card-title>
                  <v-card-text class="text-body-2">
                    <v-list dense class="bg-transparent">
                      <v-list-item>
                        <v-icon color="orange" class="mr-2" size="small">mdi-circle</v-icon>
                        Fatigue and sluggishness
                      </v-list-item>
                      <v-list-item>
                        <v-icon color="orange" class="mr-2" size="small">mdi-circle</v-icon>
                        Reduced move effectiveness
                      </v-list-item>
                      <v-list-item>
                        <v-icon color="orange" class="mr-2" size="small">mdi-circle</v-icon>
                        Pokémon become unresponsive
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card color="deep-orange-lighten-4" class="pa-4 hover-lift" elevation="6">
                  <v-card-title class="text-h6">
                    <v-icon color="deep-orange" class="mr-2">mdi-alert-circle</v-icon>
                    Critical (5-10%)
                  </v-card-title>
                  <v-card-text class="text-body-2">
                    <v-list dense class="bg-transparent">
                      <v-list-item>
                        <v-icon color="deep-orange" class="mr-2" size="small">mdi-circle</v-icon>
                        Severe exhaustion
                      </v-list-item>
                      <v-list-item>
                        <v-icon color="deep-orange" class="mr-2" size="small">mdi-circle</v-icon>
                        Pokémon may faint
                      </v-list-item>
                      <v-list-item>
                        <v-icon color="deep-orange" class="mr-2" size="small">mdi-circle</v-icon>
                        Trainer physical strain
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card color="red-lighten-4" class="pa-4 danger-glow hover-lift" elevation="6">
                  <v-card-title class="text-h6">
                    <v-icon color="red" class="mr-2">mdi-skull</v-icon>
                    Life-Threatening (0-5%)
                  </v-card-title>
                  <v-card-text class="text-body-2">
                    <v-list dense class="bg-transparent">
                      <v-list-item>
                        <v-icon color="red" class="mr-2" size="small">mdi-circle</v-icon>
                        Organ failure risk
                      </v-list-item>
                      <v-list-item>
                        <v-icon color="red" class="mr-2" size="small">mdi-circle</v-icon>
                        Potential coma
                      </v-list-item>
                      <v-list-item>
                        <v-icon color="red" class="mr-2" size="small">mdi-circle</v-icon>
                        Death possible
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-alert type="error" class="mt-4" variant="tonal" rounded elevation="4">
              <template v-slot:prepend>
                <v-icon>mdi-heart-broken</v-icon>
              </template>
              <strong>Critical Reminder:</strong> Fortitude represents your very life force.
              Reckless trainers who push beyond their limits risk not only their own lives, but the
              lives of their cherished Pokémon partners. Train responsibly.
            </v-alert>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.fortitude-meter {
  background: linear-gradient(90deg, #ff6b6b 0%, #ffd93d 50%, #6bcf7f 100%);
  border-radius: 10px;
  height: 20px;
  position: relative;
  overflow: hidden;
}

.meter-fill {
  background: rgba(255, 255, 255, 0.3);
  height: 100%;
  border-radius: 10px;
  transition: width 0.3s ease;
}

.rank-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.rank-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.danger-glow {
  box-shadow: 0 0 20px rgba(244, 67, 54, 0.5);
}

.warning-glow {
  box-shadow: 0 0 20px rgba(255, 152, 0, 0.5);
}

.pokemon-slot {
  min-height: 250px;
  transition: all 0.3s ease;
}

.pokemon-slot.filled {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.slot-number {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
}

.pokemon-sprite {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.pokemon-stats {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 8px;
  margin-top: 8px;
}

.pokemon-options {
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.gap-3 {
  gap: 1.5rem;
}

.circular-card {
  aspect-ratio: 1/1;
  overflow: hidden;
}

.pokemon-sprite {
  object-fit: contain;
}

.pokemon-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 160px;
}

.formula-section {
  border-left: 4px solid #1976d2;
  padding-left: 16px;
}

.formula-display {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  margin: 8px 0;
}

.formula-code {
  background: #e8f5e8;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 1.1em;
  font-weight: bold;
  color: #2e7d32;
}

.move-details-card {
  max-width: 800px;
  margin: 0 auto;
}

.move-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px 24px;
}

.move-info-item {
  margin-bottom: 24px;
}

.move-value {
  margin-top: 8px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  border-left: 4px solid #1976d2;
  transition: all 0.3s ease;
}

.move-value:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.flavor-text-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.flavor-text-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.v-chip {
  transition: all 0.3s ease;
}

.v-chip:hover {
  transform: scale(1.05);
}

/* Dark theme support */
.v-theme--dark .move-details-card {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}

.v-theme--dark .move-value {
  background: rgba(255, 255, 255, 0.1);
  border-left-color: #64b5f6;
}

.v-theme--dark .move-value:hover {
  background: rgba(255, 255, 255, 0.15);
}

/* Glass morphism effect */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

/* Enhanced card hover effects */
.hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

/* Gradient text effects */
.gradient-text {
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Enhanced button styling */
.enhanced-btn {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.enhanced-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* Pokemon slot enhancements */
.pokemon-slot {
  transition: all 0.3s ease;
}

.pokemon-slot:hover {
  transform: scale(1.05);
}

.circular-card {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.circular-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.circular-card:hover::before {
  transform: translateX(100%);
}

.pokemon-sprite {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  transition: all 0.3s ease;
}

.pokemon-sprite:hover {
  transform: scale(1.1);
}

/* Move details card enhancements */
.move-details-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  position: relative;
}

.move-header {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 20px;
}

.move-info-item {
  margin-bottom: 16px;
}

.move-value {
  margin-top: 8px;
  padding: 12px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.flavor-text-card {
  background: linear-gradient(135deg, rgba(118, 75, 162, 0.1), rgba(102, 126, 234, 0.1));
  border: 1px solid rgba(118, 75, 162, 0.2);
}

/* Warning sections with enhanced styling */
.warning-glow {
  box-shadow: 0 0 20px rgba(255, 152, 0, 0.3);
  animation: warning-pulse 2s infinite;
}

.danger-glow {
  box-shadow: 0 0 20px rgba(244, 67, 54, 0.3);
  animation: danger-pulse 2s infinite;
}

@keyframes warning-pulse {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(255, 152, 0, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(255, 152, 0, 0.5);
  }
}

@keyframes danger-pulse {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(244, 67, 54, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(244, 67, 54, 0.5);
  }
}

/* Enhanced statistics display */
.stat-display {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 16px;
  margin: 8px 0;
}

/* Progress bar enhancements */
.fortitude-bar {
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(90deg, #4caf50, #ffeb3b, #ff9800, #f44336);
  margin: 16px 0;
}

/* Floating action elements */
.floating-element {
  position: relative;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Enhanced input fields */
.enhanced-input {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(5px);
}

/* Card section headers */
.section-header {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 16px;
  margin: -24px -24px 24px -24px;
  border-radius: 8px 8px 0 0;
}

/* Enhanced chip styling */
.enhanced-chip {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

/* Responsive improvements */
@media (max-width: 768px) {
  .pokemon-slot {
    flex: 0 0 45%;
  }

  .circular-card {
    width: 120px;
    height: 120px;
  }
}

/* Loading animation */
.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Enhanced typography */
.display-text {
  font-weight: 300;
  letter-spacing: 0.5px;
}

.accent-text {
  color: #667eea;
  font-weight: 500;
}
</style>
