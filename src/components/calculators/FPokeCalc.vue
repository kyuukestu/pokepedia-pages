<script setup lang="ts">
import { ref, computed } from 'vue'

const totalFortitude = ref<number>(130)

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

const fortitudePercentage = computed(() => {
  return totalFortitude.value > 0 ? (remainingFortitude.value / totalFortitude.value) * 100 : 0
})

const getStatusColor = computed(() => {
  if (remainingFortitude.value >= totalFortitude.value * 0.5) return 'success'
  if (remainingFortitude.value >= totalFortitude.value * 0.2) return 'warning'
  return 'error'
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
            <v-icon size="40" color="white">mdi-pokemon-go</v-icon>
          </v-avatar>
          <div>
            <h2 class="text-h3 font-weight-bold text-white mb-2">Pokémon Team Calculator</h2>
            <p class="text-subtitle-1 text-blue-grey-lighten-2">
              Manage your team's fortitude and upkeep costs
            </p>
          </div>
        </div>
      </div>

      <!-- Fortitude Input -->
      <v-card
        class="mb-6 fortitude-card"
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
            v-model.number="totalFortitude"
            label="Your Total Fortitude"
            type="number"
            variant="outlined"
            class="fortitude-input"
            prepend-inner-icon="mdi-heart"
            min="0"
            :style="{
              '--v-field-background': 'rgba(255, 255, 255, 0.1)',
              '--v-field-border-color': 'rgba(255, 255, 255, 0.3)',
            }"
          >
            <template #label>
              <span class="text-white font-weight-medium">Your Total Fortitude</span>
            </template>
          </v-text-field>
        </v-card-text>
      </v-card>

      <!-- Team Header -->
      <div class="text-center mb-6">
        <h3 class="text-h4 font-weight-bold text-white mb-2">Your Pokémon Team</h3>
        <v-chip
          color="primary"
          variant="elevated"
          size="large"
          class="text-subtitle-1 font-weight-bold"
        >
          6 Battle Slots
        </v-chip>
      </div>

      <!-- Pokemon Team Grid -->
      <v-row class="mb-6">
        <v-col
          v-for="(pokemon, index) in pokemonTeam"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          class="d-flex justify-center"
        >
          <v-card
            class="pokemon-card text-center"
            elevation="8"
            :class="{ 'pokemon-filled': pokemon.name, 'pokemon-empty': !pokemon.name }"
            :style="{
              width: '100%',
              maxWidth: '280px',
              background: pokemon.name
                ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)'
                : 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: pokemon.name
                ? '2px solid rgba(102, 126, 234, 0.5)'
                : '2px dashed rgba(255, 255, 255, 0.3)',
              borderRadius: '20px',
              transition: 'all 0.3s ease',
            }"
          >
            <v-card-text class="pa-4">
              <!-- Pokemon Sprite Circle -->
              <div class="sprite-container mb-4">
                <v-avatar
                  size="120"
                  class="sprite-avatar"
                  :style="{
                    background: pokemon.sprite
                      ? 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)'
                      : 'rgba(255, 255, 255, 0.1)',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s ease',
                  }"
                >
                  <div v-if="pokemon.isLoading" class="text-center">
                    <v-progress-circular
                      indeterminate
                      color="primary"
                      size="40"
                    ></v-progress-circular>
                  </div>
                  <div v-else-if="pokemon.sprite" class="text-center">
                    <img
                      :src="pokemon.sprite"
                      :alt="pokemon.name"
                      class="pokemon-sprite"
                      style="
                        max-width: 100px;
                        max-height: 100px;
                        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
                      "
                    />
                  </div>
                  <div v-else class="text-center">
                    <v-icon size="40" color="white" opacity="0.5">mdi-pokeball</v-icon>
                    <div class="text-caption text-white opacity-60 mt-2">Slot {{ index + 1 }}</div>
                  </div>
                </v-avatar>
              </div>

              <!-- Pokemon Name Input -->
              <v-text-field
                v-model="pokemon.name"
                @keyup.enter="() => fetchPokemonData(pokemon.name, index)"
                label="Pokemon Name"
                variant="outlined"
                density="comfortable"
                :loading="pokemon.isLoading"
                :error="!!pokemon.error"
                :error-messages="pokemon.error"
                clearable
                @click:clear="clearPokemonSlot(index)"
                class="pokemon-input mb-3"
                :style="{
                  '--v-field-background': 'rgba(255, 255, 255, 0.1)',
                  '--v-field-border-color': 'rgba(255, 255, 255, 0.3)',
                }"
              >
                <template #label>
                  <span class="text-white">Pokemon Name</span>
                </template>
              </v-text-field>

              <!-- Pokemon Options -->
              <v-expand-transition>
                <div v-if="pokemon.name && !pokemon.isLoading && !pokemon.error">
                  <!-- Status Badges -->
                  <div class="d-flex justify-center gap-2 mb-3">
                    <v-chip v-if="pokemon.isAlpha" color="orange" size="small" variant="elevated">
                      <v-icon start size="16">mdi-star</v-icon>
                      Alpha
                    </v-chip>
                    <v-chip v-if="pokemon.inBox" color="green" size="small" variant="elevated">
                      <v-icon start size="16">mdi-package-variant</v-icon>
                      Boxed
                    </v-chip>
                    <v-chip
                      v-if="(pokemon.additionalAbilities ?? 0) > 0"
                      color="purple"
                      size="small"
                      variant="elevated"
                    >
                      <v-icon start size="16">mdi-plus</v-icon>
                      +{{ pokemon.additionalAbilities }}
                    </v-chip>
                  </div>

                  <!-- Options Controls -->
                  <v-card
                    class="options-card mb-3"
                    variant="outlined"
                    :style="{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                    }"
                  >
                    <v-card-text class="pa-3">
                      <v-row dense>
                        <v-col cols="6">
                          <v-checkbox
                            v-model="pokemon.isAlpha"
                            label="Alpha"
                            density="compact"
                            color="orange"
                            hide-details
                            class="text-white"
                          ></v-checkbox>
                        </v-col>
                        <v-col cols="6">
                          <v-checkbox
                            v-model="pokemon.inBox"
                            label="In Box"
                            density="compact"
                            color="green"
                            hide-details
                            class="text-white"
                          ></v-checkbox>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model.number="pokemon.additionalAbilities"
                            label="Extra Abilities"
                            type="number"
                            variant="outlined"
                            density="compact"
                            min="0"
                            max="5"
                            class="extra-abilities-input"
                            :style="{
                              '--v-field-background': 'rgba(255, 255, 255, 0.1)',
                              '--v-field-border-color': 'rgba(255, 255, 255, 0.3)',
                            }"
                          >
                            <template #label>
                              <span class="text-white">Extra Abilities</span>
                            </template>
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>

                  <!-- Pokemon Stats -->
                  <v-card
                    class="stats-card"
                    :style="{
                      background:
                        'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                    }"
                  >
                    <v-card-text class="pa-3">
                      <div class="d-flex justify-space-between align-center">
                        <div class="text-center">
                          <div class="text-caption text-blue-grey-lighten-2">BST</div>
                          <div class="text-h6 font-weight-bold text-white">{{ pokemon.bst }}</div>
                        </div>
                        <v-divider vertical class="mx-2"></v-divider>
                        <div class="text-center">
                          <div class="text-caption text-blue-grey-lighten-2">Upkeep</div>
                          <div class="text-h6 font-weight-bold text-orange">
                            {{
                              calculateUpkeepCost(
                                pokemon.bst,
                                pokemon.isAlpha,
                                pokemon.additionalAbilities,
                                pokemon.inBox,
                              )
                            }}
                          </div>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>
              </v-expand-transition>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Summary Statistics -->
      <v-card
        class="summary-card"
        elevation="8"
        :style="{
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '20px',
        }"
      >
        <v-card-text class="pa-6">
          <div class="text-center mb-4">
            <h4 class="text-h4 font-weight-bold text-white mb-2">Team Summary</h4>
          </div>

          <v-row class="text-center">
            <v-col cols="12" md="4">
              <div class="stat-item">
                <v-icon size="32" color="blue" class="mb-2">mdi-calculator</v-icon>
                <div class="text-h5 font-weight-bold text-blue">{{ totalUpkeepCost }}</div>
                <div class="text-subtitle-2 text-blue-grey-lighten-2">Total Upkeep</div>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div class="stat-item">
                <v-icon size="32" :color="getStatusColor" class="mb-2">mdi-lightning-bolt</v-icon>
                <div class="text-h5 font-weight-bold" :class="`text-${getStatusColor}`">
                  {{ remainingFortitude }}
                </div>
                <div class="text-subtitle-2 text-blue-grey-lighten-2">Available Points</div>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div class="stat-item">
                <v-icon size="32" color="purple" class="mb-2">mdi-percent</v-icon>
                <div class="text-h5 font-weight-bold text-purple">
                  {{ Math.round(fortitudePercentage) }}%
                </div>
                <div class="text-subtitle-2 text-blue-grey-lighten-2">Remaining</div>
              </div>
            </v-col>
          </v-row>

          <v-divider class="my-4" style="border-color: rgba(255, 255, 255, 0.2)"></v-divider>

          <!-- Progress Bar -->
          <div class="progress-section">
            <div class="d-flex justify-space-between align-center mb-2">
              <span class="text-subtitle-1 text-white font-weight-medium">Fortitude Usage</span>
              <span class="text-subtitle-2 text-blue-grey-lighten-2">
                {{ totalUpkeepCost }} / {{ totalFortitude }}
              </span>
            </div>
            <v-progress-linear
              :model-value="totalFortitude > 0 ? (totalUpkeepCost / totalFortitude) * 100 : 0"
              :color="getStatusColor"
              height="12"
              rounded
              :style="{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }"
            >
              <template #default>
                <div class="text-caption font-weight-bold">
                  {{
                    Math.round(totalFortitude > 0 ? (totalUpkeepCost / totalFortitude) * 100 : 0)
                  }}%
                </div>
              </template>
            </v-progress-linear>
          </div>
        </v-card-text>
      </v-card>
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

.fortitude-input :deep(.v-field__input) {
  color: white !important;
}

.fortitude-input :deep(.v-field__prepend-inner .v-icon) {
  color: #ff6b6b !important;
}

.pokemon-card {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.pokemon-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.pokemon-card:hover::before {
  left: 100%;
}

.pokemon-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.pokemon-filled {
  border-color: rgba(102, 126, 234, 0.6) !important;
}

.pokemon-empty:hover {
  border-color: rgba(255, 255, 255, 0.5) !important;
}

.sprite-avatar {
  transition: all 0.3s ease;
}

.pokemon-card:hover .sprite-avatar {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.pokemon-input :deep(.v-field__input),
.extra-abilities-input :deep(.v-field__input) {
  color: white !important;
}

.pokemon-input :deep(.v-field__label),
.extra-abilities-input :deep(.v-field__label) {
  color: rgba(255, 255, 255, 0.7) !important;
}

.options-card {
  transition: all 0.3s ease;
}

.options-card:hover {
  background: rgba(255, 255, 255, 0.08) !important;
}

.stats-card {
  transition: all 0.3s ease;
}

.summary-card {
  transition: all 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
}

.stat-item {
  transition: all 0.3s ease;
  padding: 16px;
  border-radius: 12px;
}

.stat-item:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
}

.progress-section {
  background: rgba(255, 255, 255, 0.05);
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Responsive improvements */
@media (max-width: 768px) {
  .main-card {
    margin: 8px;
    padding: 16px !important;
  }

  .pokemon-card {
    margin-bottom: 16px;
  }

  .text-h3 {
    font-size: 1.8rem !important;
  }

  .text-h4 {
    font-size: 1.5rem !important;
  }
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
