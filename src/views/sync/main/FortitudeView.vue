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
    icon: 'eco',
    description: 'Beginning trainers with basic Fortitude reserves',
  },
  {
    name: 'Silver',
    fortitude: '150 ~ 125',
    icon: 'local_florist',
    description: 'Developing trainers with growing energy pools',
  },
  {
    name: 'Gold',
    fortitude: '150 ~ 500',
    icon: 'star',
    description: 'Skilled trainers with substantial reserves',
  },
  {
    name: 'Platinum',
    fortitude: '1,000+',
    icon: 'military_tech',
    description: 'Expert trainers with impressive Fortitude capacity',
  },
  {
    name: 'Master',
    fortitude: '2,500+',
    icon: 'whatshot',
    description: 'Master trainers with exceptional energy control',
  },
  {
    name: 'High Master',
    fortitude: '5,000+',
    icon: 'emoji_events',
    description: 'Elite trainers with unmatched Fortitude mastery',
  },
  {
    name: 'Grand Master',
    fortitude: '10,000+',
    icon: 'workspace_premium',
    description: 'Legendary trainers with supreme Fortitude control',
  },
  {
    name: 'Legendary',
    fortitude: '???',
    icon: 'auto_awesome',
    description: 'Mythical trainers with limitless Fortitude mastery',
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
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-md">
        <!-- Hero Section -->
        <div class="hero-section q-pa-xl text-center">
          <div class="row justify-center">
            <div class="col-12 col-md-8">
              <div class="text-h2 text-weight-bold q-mb-md">
                <q-icon name="flash_on" size="3rem" color="amber" class="q-mr-md" />
                Fortitude Power System
              </div>
              <div class="text-h5 q-mb-xl text-weight-light">
                The life force that binds trainers and Pokémon in eternal partnership
              </div>
              <div class="fortitude-meter q-mx-auto q-mb-md" style="max-width: 400px">
                <q-linear-progress
                  :value="demoFortitude / 100"
                  size="20px"
                  color="amber"
                  track-color="grey-4"
                  rounded
                  class="fortitude-progress"
                />
              </div>
              <div class="text-body1">{{ Math.round(demoFortitude) }}/100 Fortitude</div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="q-mt-xl">
          <!-- Overview Section -->
          <q-card flat bordered class="q-mb-xl">
            <q-card-section class="q-pa-xl">
              <div class="text-h3 text-center q-mb-xl text-weight-bold">
                <q-icon name="help_outline" color="primary" class="q-mr-md" />
                What is Fortitude?
              </div>
              <div class="row q-col-gutter-xl">
                <div class="col-12 col-md-6">
                  <div class="text-body1 q-mb-md">
                    Fortitude is the fundamental energy reservoir that flows between trainers and
                    their Pokémon. This mystical force serves as the bridge connecting human will to
                    Pokémon power, enabling the Synchronization Bond and fueling a Pokémon's
                    abilities to an extend hitherto unseen.
                  </div>
                  <div class="text-body1">
                    The average trainer begins their journey at Bronze I with approx.
                    <strong>50 points of Fortitude</strong>, a modest wellspring that grows stronger
                    with experience, dedication, and the bonds forged with their partners.
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <q-card flat bordered class="q-pa-lg">
                    <q-icon name="favorite" size="2rem" color="red" class="q-mb-md" />
                    <div class="text-h6 q-mb-md text-weight-bold">Core Functions</div>
                    <div class="q-gutter-sm">
                      <q-chip outline color="primary" text-color="primary"
                        >Pokémon Sustenance</q-chip
                      >
                      <q-chip outline color="secondary" text-color="secondary">Move Usage</q-chip>
                      <q-chip outline color="positive" text-color="positive"
                        >Ability Activation</q-chip
                      >
                      <q-chip outline color="warning" text-color="warning"
                        >Physical Enhancement</q-chip
                      >
                    </div>
                  </q-card>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Trainer Ranks Section -->
          <div class="q-mb-xl">
            <div class="text-h3 text-center q-mb-xl text-weight-bold">
              <q-icon name="trending_up" color="primary" class="q-mr-md" />
              Trainer Ranks & Fortitude Progression
            </div>
            <div class="row q-col-gutter-md">
              <div
                v-for="rank in trainerRanks"
                :key="rank.name"
                class="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <q-card flat bordered class="rank-card text-center q-pa-lg" style="height: 200px">
                  <q-icon :name="rank.icon" size="3rem" color="primary" class="q-mb-md" />
                  <div class="text-h5 text-weight-bold">{{ rank.name }}</div>
                  <div class="text-h6 q-mt-sm text-weight-medium">
                    {{ rank.fortitude }} Fortitude
                  </div>
                  <div class="text-body2 q-mt-sm">{{ rank.description }}</div>
                </q-card>
              </div>
            </div>
          </div>

          <!-- Mechanics and Calculator Section -->
          <div class="row q-col-gutter-xl q-mb-xl">
            <!-- Mechanics Section -->
            <div class="col-12 col-md-6">
              <q-card flat bordered class="full-height">
                <q-card-section class="q-pa-lg">
                  <div class="text-h5 q-mb-lg text-weight-bold">
                    <q-icon name="settings" color="primary" class="q-mr-sm" />
                    Fortitude Mechanics
                  </div>
                  <q-list>
                    <q-item>
                      <q-item-section>
                        <q-item-label class="text-weight-bold">Base Fortitude</q-item-label>
                        <q-item-label caption
                          >Average Bronze trainer start at 50 points</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label class="text-weight-bold">Pokémon Upkeep</q-item-label>
                        <q-item-label caption
                          >Cost calculated as: 2^(BST/100), rounded</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label class="text-weight-bold">Move Costs</q-item-label>
                        <q-item-label caption
                          >Remaining Fortitude fuels attacks and abilities</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label class="text-weight-bold">Rank Progression</q-item-label>
                        <q-item-label caption
                          >Higher ranks unlock greater Fortitude reserves</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>

            <!-- Calculator Section -->
            <div class="col-12 col-md-6">
              <q-card flat bordered class="full-height">
                <q-card-section class="q-pa-lg">
                  <div class="text-h5 q-mb-lg text-weight-bold">
                    <q-icon name="calculate" color="positive" class="q-mr-sm" />
                    Fortitude Calculator
                  </div>
                  <q-input
                    v-model.number="totalFortitude"
                    label="Your Fortitude"
                    type="number"
                    outlined
                    class="q-mb-lg"
                  />

                  <div class="text-h6 q-mb-md text-weight-bold">Your Pokémon Team (6 slots)</div>

                  <div class="row q-col-gutter-md">
                    <div
                      v-for="(pokemon, index) in pokemonTeam"
                      :key="index"
                      class="col-4 text-center"
                    >
                      <q-card
                        flat
                        bordered
                        class="pokemon-slot q-pa-md"
                        :class="{ 'pokemon-filled': pokemon.name }"
                      >
                        <div class="pokemon-circle q-mx-auto q-mb-md">
                          <div v-if="!pokemon.sprite" class="slot-number">Slot {{ index + 1 }}</div>
                          <img
                            v-if="pokemon.sprite"
                            :src="pokemon.sprite"
                            :alt="pokemon.name"
                            class="pokemon-sprite"
                          />
                        </div>

                        <q-input
                          v-model="pokemon.name"
                          @keyup.enter="() => fetchPokemonData(pokemon.name, index)"
                          label="Pokemon Name"
                          dense
                          outlined
                          :loading="pokemon.isLoading"
                          :error="!!pokemon.error"
                          :error-message="pokemon.error ?? undefined"
                          clearable
                          @clear="clearPokemonSlot(index)"
                        />

                        <div
                          v-if="pokemon.name && !pokemon.isLoading && !pokemon.error"
                          class="pokemon-stats q-mt-sm"
                        >
                          <div class="text-caption">BST: {{ pokemon.bst }}</div>
                          <div class="text-caption">
                            Upkeep:
                            <span class="text-weight-bold text-primary">{{
                              calculateUpkeepCost(pokemon.bst)
                            }}</span>
                          </div>
                        </div>
                      </q-card>
                    </div>
                  </div>

                  <q-separator class="q-my-lg" />
                  <div class="text-center">
                    <div class="text-body1 q-mb-sm">
                      Total Upkeep Cost: <strong>{{ totalUpkeepCost }}</strong>
                    </div>
                    <div class="text-h6 q-mb-sm">Available for Moves:</div>
                    <div
                      :class="
                        remainingFortitude < 10 ? 'text-negative text-h4' : 'text-positive text-h4'
                      "
                    >
                      {{ remainingFortitude }} Points
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- Dangers Section -->
          <q-card flat bordered class="q-mb-xl">
            <q-card-section class="q-pa-xl">
              <div class="text-h4 text-center q-mb-xl text-weight-bold">
                <q-icon name="warning" color="negative" class="q-mr-md" />
                Fortitude Deprivation
              </div>
              <div class="row q-col-gutter-lg">
                <div class="col-12 col-md-4">
                  <q-card flat bordered class="q-pa-lg danger-card warning-level">
                    <div class="text-h6 q-mb-md text-weight-bold">
                      <q-icon name="warning" color="warning" class="q-mr-sm" />
                      Early Warning (10-20%)
                    </div>
                    <div class="text-body2">
                      Fatigue, reduced move effectiveness, Pokémon become sluggish
                    </div>
                  </q-card>
                </div>
                <div class="col-12 col-md-4">
                  <q-card flat bordered class="q-pa-lg danger-card critical-level">
                    <div class="text-h6 q-mb-md text-weight-bold">
                      <q-icon name="error" color="deep-orange" class="q-mr-sm" />
                      Critical (5-10%)
                    </div>
                    <div class="text-body2">
                      Severe exhaustion, Pokémon may faint, trainer physical strain
                    </div>
                  </q-card>
                </div>
                <div class="col-12 col-md-4">
                  <q-card flat bordered class="q-pa-lg danger-card lethal-level">
                    <div class="text-h6 q-mb-md text-weight-bold">
                      <q-icon name="dangerous" color="negative" class="q-mr-sm" />
                      Life-Threatening (0-5%)
                    </div>
                    <div class="text-body2">Organ failure, coma, potential death.</div>
                  </q-card>
                </div>
              </div>
              <q-banner class="q-mt-lg" inline-actions>
                <template v-slot:avatar>
                  <q-icon name="info" color="negative" />
                </template>
                <strong>Remember:</strong> Fortitude is not just energy—it's life force itself.
                Reckless trainers who push beyond their limits risk not only their own lives, but
                the lives of their beloved Pokémon partners.
              </q-banner>
            </q-card-section>
          </q-card>
        </div>
      </q-page></q-page-container
    >
  </q-layout>
</template>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.fortitude-progress {
  border-radius: 10px;
  overflow: hidden;
}

.rank-card {
  transition: all 0.3s ease;
  border-radius: 8px;
}

.rank-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.pokemon-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.pokemon-filled .pokemon-circle {
  border-color: #1976d2;
  border-style: solid;
}

.slot-number {
  font-size: 0.75rem;
  color: #666;
  font-weight: 500;
  text-align: center;
}

.pokemon-sprite {
  width: 90px;
  height: 90px;
  object-fit: contain;
}

.pokemon-stats {
  padding: 8px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.03);
}

.pokemon-slot {
  transition: all 0.3s ease;
  min-height: 200px;
}

.pokemon-slot:hover {
  transform: translateY(-2px);
}

.danger-card {
  transition: all 0.3s ease;
  border-radius: 8px;
}

.danger-card:hover {
  transform: translateY(-2px);
}

.warning-level {
  border-left: 4px solid #ff9800;
}

.critical-level {
  border-left: 4px solid #ff5722;
}

.lethal-level {
  border-left: 4px solid #f44336;
}

.full-height {
  height: 100%;
}
</style>
