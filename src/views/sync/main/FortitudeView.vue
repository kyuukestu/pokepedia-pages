<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Reactive data
const demoFortitude = ref<number>(75)
const totalFortitude = ref<number>(150)

// Updated Pokemon structure with loading and error states
interface Pokemon {
  name: string
  bst: number
  isLoading: boolean
  error: string | null
  sprite?: string
}

// Initialize 6 empty Pokemon slots
const pokemonTeam = ref<Pokemon[]>(
  Array.from({ length: 6 }, () => ({
    name: '',
    bst: 0,
    isLoading: false,
    error: null,
    sprite: '',
  })),
)

// Trainer ranks data
const trainerRanks = ref([
  {
    name: 'Bronze',
    fortitude: '50 ~ 130',
    color: 'grey-lighten-2',
    icon: 'mdi-sprout',
    description: 'Beginning trainers with basic Fortitude reserves',
  },
  {
    name: 'Silver',
    fortitude: '150 ~ 125',
    color: 'green-lighten-3',
    icon: 'mdi-leaf',
    description: 'Developing trainers with growing energy pools',
  },
  {
    name: 'Gold',
    fortitude: '150 ~ 500',
    color: 'blue-lighten-3',
    icon: 'mdi-star',
    description: 'Skilled trainers with substantial reserves',
  },
  {
    name: 'Platinum',
    fortitude: '1,000+',
    color: 'purple-lighten-3',
    icon: 'mdi-crown',
    description: 'Expert trainers with impressive Fortitude capacity',
  },
  {
    name: 'Master',
    fortitude: '2,500+',
    color: 'orange-lighten-3',
    icon: 'mdi-fire',
    description: 'Master trainers with exceptional energy control',
  },
  {
    name: 'High Master',
    fortitude: '5,000+',
    color: 'red-lighten-3',
    icon: 'mdi-trophy',
    description: 'Legendary trainers with unmatched Fortitude mastery',
  },
  {
    name: 'Grand Master',
    fortitude: '10,000+',
    color: 'red-lighten-3',
    icon: 'mdi-trophy',
    description: 'Legendary trainers with unmatched Fortitude mastery',
  },
  {
    name: 'Legendary',
    fortitude: '???',
    color: 'red-lighten-3',
    icon: 'mdi-trophy',
    description: 'Legendary trainers with unmatched Fortitude mastery',
  },
])

// Functions
const calculateUpkeepCost = (bst: number): number => {
  if (bst === 0) return 0
  return Math.round(Math.pow(2, bst / 100))
}

const fetchPokemonData = async (pokemonName: string, slotIndex: number) => {
  if (!pokemonName.trim()) {
    pokemonTeam.value[slotIndex] = {
      name: '',
      bst: 0,
      isLoading: false,
      error: null,
      sprite: '',
    }
    return
  }

  const pokemon = pokemonTeam.value[slotIndex]
  pokemon.isLoading = true
  pokemon.error = null

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)

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
  }
}

// Computed properties
const totalUpkeepCost = computed(() => {
  return pokemonTeam.value.reduce((total, pokemon) => {
    return total + calculateUpkeepCost(pokemon.bst)
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
    <!-- Hero Section -->
    <v-container fluid class="hero-section pa-8">
      <v-row justify="center" align="center" class="text-center">
        <v-col cols="12" md="8">
          <h1 class="display-2 font-weight-bold mb-4">
            <v-icon size="48" class="mr-3">mdi-lightning-bolt</v-icon>
            Fortitude Power System
          </h1>
          <p class="text-h6 mb-6">
            The life force that binds trainers and Pokémon in eternal partnership
          </p>
          <div class="fortitude-meter mx-auto" style="max-width: 400px">
            <div class="meter-fill" :style="{ width: demoFortitude + '%' }"></div>
          </div>
          <p class="mt-2">{{ Math.round(demoFortitude) }}/100 Fortitude</p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Main Content -->
    <v-container class="my-8">
      <!-- Overview Section -->
      <v-row class="mb-8">
        <v-col cols="12">
          <v-card elevation="3" class="pa-6">
            <h2 class="text-h4 mb-4 text-center">What is Fortitude?</h2>
            <v-row>
              <v-col cols="12" md="6">
                <p class="text-body-1 mb-4">
                  Fortitude is the fundamental energy reservoir that flows between trainers and
                  their Pokémon. This mystical force serves as the bridge connecting human will to
                  Pokémon power, enabling the Synchronization Bond and fueling a Pokémon's abilities
                  to an extend hitherto unseen.
                </p>
                <p class="text-body-1">
                  The average trainer begins their journey at Bronze I with approx.
                  <strong>50 points of Fortitude</strong>, a modest wellspring that grows stronger
                  with experience, dedication, and the bonds forged with their partners.
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <v-card color="blue-grey-lighten-5" class="pa-4">
                  <v-icon size="32" color="primary" class="mb-2">mdi-heart-pulse</v-icon>
                  <h3 class="text-h6 mb-2">Core Functions</h3>
                  <v-chip class="ma-1" color="primary" variant="outlined"
                    >Pokémon Sustenance</v-chip
                  >
                  <v-chip class="ma-1" color="secondary" variant="outlined">Move Usage</v-chip>
                  <v-chip class="ma-1" color="success" variant="outlined"
                    >Ability Activation</v-chip
                  >
                  <v-chip class="ma-1" color="warning" variant="outlined"
                    >Physical Enhancement</v-chip
                  >
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!-- Trainer Ranks Section -->
      <v-row class="mb-8">
        <v-col cols="12">
          <h2 class="text-h4 mb-6 text-center">Trainer Ranks & Fortitude Progression</h2>
          <v-row>
            <v-col v-for="rank in trainerRanks" :key="rank.name" cols="12" sm="6" md="4">
              <v-card
                :color="rank.color"
                class="rank-card pa-4 text-center"
                height="200"
                elevation="2"
              >
                <v-icon :icon="rank.icon" size="48" class="mb-3"></v-icon>
                <h3 class="text-h5 font-weight-bold">{{ rank.name }}</h3>
                <p class="text-h6 mt-2">{{ rank.fortitude }} Fortitude</p>
                <p class="text-body-2 mt-2">{{ rank.description }}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Mechanics Section -->
      <v-row class="mb-8">
        <v-col cols="12" md="6">
          <v-card elevation="3" class="pa-6 h-100">
            <h3 class="text-h5 mb-4">
              <v-icon class="mr-2" color="blue">mdi-cog</v-icon>
              Fortitude Mechanics
            </h3>
            <v-list>
              <v-list-item>
                <v-list-item-title class="font-weight-bold">Base Fortitude</v-list-item-title>
                <v-list-item-subtitle
                  >Average Bronze trainer start at 50 points</v-list-item-subtitle
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="font-weight-bold">Pokémon Upkeep</v-list-item-title>
                <v-list-item-subtitle
                  >Cost calculated as: 2^(BST/100), rounded</v-list-item-subtitle
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="font-weight-bold">Move Costs</v-list-item-title>
                <v-list-item-subtitle
                  >Remaining Fortitude fuels attacks and abilities</v-list-item-subtitle
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="font-weight-bold">Rank Progression</v-list-item-title>
                <v-list-item-subtitle
                  >Higher ranks unlock greater Fortitude reserves</v-list-item-subtitle
                >
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <!-- Updated Fortitude Calculator -->
        <v-col cols="12" md="6">
          <v-card elevation="3" class="pa-6 h-100">
            <h3 class="text-h5 mb-4">
              <v-icon class="mr-2" color="green">mdi-calculator</v-icon>
              Fortitude Calculator
            </h3>
            <v-text-field
              v-model.number="totalFortitude"
              label="Your Fortitude"
              type="number"
              variant="outlined"
              class="mb-4"
            ></v-text-field>

            <h4 class="text-h6 mb-3">Your Pokémon Team (6 slots)</h4>

            <v-row>
              <v-col
                v-for="(pokemon, index) in pokemonTeam"
                :key="index"
                cols="12"
                sm="6"
                class="mb-2"
              >
                <v-card
                  :class="['pokemon-slot pa-3', { filled: pokemon.name }]"
                  variant="outlined"
                  :color="pokemon.name ? 'primary' : 'grey-lighten-3'"
                >
                  <div class="text-center mb-2">
                    <div class="slot-number">Slot {{ index + 1 }}</div>
                  </div>

                  <v-text-field
                    v-model="pokemon.name"
                    @keyup.enter="() => fetchPokemonData(pokemon.name, index)"
                    label="Pokemon Name"
                    variant="underlined"
                    density="compact"
                    :loading="pokemon.isLoading"
                    :error="!!pokemon.error"
                    :error-messages="pokemon.error"
                    clearable
                    @click:clear="clearPokemonSlot(index)"
                  ></v-text-field>

                  <div v-if="pokemon.sprite" class="text-center mb-2">
                    <img :src="pokemon.sprite" :alt="pokemon.name" class="pokemon-sprite" />
                  </div>

                  <div
                    v-if="pokemon.name && !pokemon.isLoading && !pokemon.error"
                    class="pokemon-stats"
                  >
                    <div class="d-flex justify-space-between align-center">
                      <small class="text-medium-emphasis">BST:</small>
                      <span class="font-weight-bold">{{ pokemon.bst }}</span>
                    </div>
                    <div class="d-flex justify-space-between align-center">
                      <small class="text-medium-emphasis">Upkeep:</small>
                      <span class="font-weight-bold text-primary">{{
                        calculateUpkeepCost(pokemon.bst)
                      }}</span>
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>
            <div class="text-center">
              <p class="text-body-1 mb-2">
                Total Upkeep Cost: <strong>{{ totalUpkeepCost }}</strong>
              </p>
              <p class="text-h6">Available for Moves:</p>
              <p :class="remainingFortitude < 10 ? 'text-error text-h4' : 'text-success text-h4'">
                {{ remainingFortitude }} Points
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Dangers Section -->
      <v-row class="mb-8">
        <v-col cols="12">
          <v-card elevation="3" class="pa-6">
            <h3 class="text-h5 mb-4 text-center">
              <v-icon class="mr-2" color="red">mdi-alert-octagon</v-icon>
              Fortitude Deprivation
            </h3>
            <v-row>
              <v-col cols="12" md="4">
                <v-card color="orange-lighten-4" class="pa-4 warning-glow">
                  <h4 class="text-h6 mb-2">
                    <v-icon color="orange">mdi-alert</v-icon>
                    Early Warning (10-20%)
                  </h4>
                  <p class="text-body-2">
                    Fatigue, reduced move effectiveness, Pokémon become sluggish
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card color="deep-orange-lighten-4" class="pa-4">
                  <h4 class="text-h6 mb-2">
                    <v-icon color="deep-orange">mdi-alert-circle</v-icon>
                    Critical (5-10%)
                  </h4>
                  <p class="text-body-2">
                    Severe exhaustion, Pokémon may faint, trainer physical strain
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card color="red-lighten-4" class="pa-4 danger-glow">
                  <h4 class="text-h6 mb-2">
                    <v-icon color="red">mdi-skull</v-icon>
                    Life-Threatening (0-5%)
                  </h4>
                  <p class="text-body-2">Organ failure, coma, potential death.</p>
                </v-card>
              </v-col>
            </v-row>
            <v-alert type="error" class="mt-4" variant="tonal">
              <strong>Remember:</strong> Fortitude is not just energy—it's life force itself.
              Reckless trainers who push beyond their limits risk not only their own lives, but the
              lives of their beloved Pokémon partners.
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
  min-height: 180px;
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
  width: 64px;
  height: 64px;
  object-fit: contain;
}

.pokemon-stats {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 8px;
  margin-top: 8px;
}
</style>
