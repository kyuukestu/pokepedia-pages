<script setup lang="ts">
import { VDataTable } from 'vuetify/components'
import { ref } from 'vue'

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

const headers = [
  { title: 'Component', key: 'component', sortable: false },
  { title: 'Formula', key: 'formula', sortable: false },
  { title: 'Description', key: 'description', sortable: false },
]

const formulaComponents = [
  {
    component: 'Base Price',
    formula: 'BP × 1,000',
    description: 'Base Power multiplied by 1,000 to establish the fundamental item cost',
  },
  {
    component: 'Secondary Effects',
    formula: 'Each effect + 10,000',
    description: 'Additional cost for each secondary effect',
  },
  {
    component: 'Stat Changes',
    formula: 'Each stat change + 25,000',
    description: 'Fixed cost addition for each stat modification the item provides',
  },
]

const exampleItems = [
  {
    name: 'Poison Tail',
    bp: 50,
    effects: 2,
    statChanges: 0,
    description:
      'The user hits the target with its tail. This move has a heightened chance of landing a critical hit and may also poison the target.',
    calculation: '(50 × 1,000) + (2 x 10,000) = ₱70,000;',
  },
  {
    name: 'Ember',
    bp: 40,
    effects: 1,
    statChanges: 0,
    description:
      'The target is attacked with small flames. This may also leave the target with a burn.',
    calculation: '(40 × 1,000) + (1 x 10,000) = ₱50,000',
  },
  {
    name: 'Shadow Sneak',
    bp: 40,
    effects: 1,
    statChanges: 0,
    description:
      'The user extends its shadow and attacks the target from behind. This move always goes first.',
    calculation: '(40 × 1,000) + ( × 10,000) = ₱50,000',
  },
  {
    name: 'Sword Dance',
    bp: 0,
    effects: 0,
    effectChance: 0,
    statChanges: 2,
    calculation: '2 x 25,000 = ₱50,000',
  },
]

const exampleHeaders = [
  { title: 'Item Name', key: 'name', sortable: false },
  { title: 'BP', key: 'bp', sortable: false },
  { title: 'Effects', key: 'effects', sortable: false },
  { title: 'Stat Changes', key: 'statChanges', sortable: false },
  { title: 'Total Price', key: 'calculation', sortable: false },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getRowClass = (item: any, index: number) => {
  return index % 2 === 0 ? 'row-even' : 'row-odd'
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
</script>

<template>
  <v-app>
    <v-layout class="q-pa-lg q-mt-lg">
      <v-container>
        <v-card class="bg-grey-1">
          <v-card class="q-pa-lg" elevation="6">
            <v-card-title class="text-h4 text-weight-medium q-mb-lg">
              Item Pricing Formula
            </v-card-title>
            <v-card-text>
              <p class="text-body-1 text-weight-regular q-mb-lg">
                Below is the pricing formula for items in the text-based Pokemon roleplay. The total
                cost is calculated by combining base power, secondary effects, and stat
                modifications.
              </p>

              <!-- Main Formula Display -->
              <v-card class="q-mb-lg bg-blue-grey-lighten-5" elevation="2">
                <v-card-text class="text-center">
                  <div class="text-h5 text-weight-medium q-mb-md text-primary">
                    Technical Record Price Formula
                  </div>
                  <div class="text-h6 text-weight-regular">
                    <span class="text-primary">(BP × 1,000)</span> +
                    <span class="text-green">(Each Secondary Effect + 10,000)</span>
                    +
                    <span class="text-orange">(Each Stat Change + 25,000)</span>
                  </div>
                </v-card-text>
              </v-card>

              <!-- Component Breakdown Table -->
              <div class="text-h6 text-weight-medium q-mb-md">Formula Components</div>
              <v-data-table
                :headers="headers"
                :items="formulaComponents"
                class="elevation-2 q-mb-lg"
                hide-default-footer
                density="comfortable"
                :item-class="getRowClass"
              >
                <template v-slot:item="{ item }"
                  ><tr>
                    <td class="text-body-1 text-weight-medium">{{ item.component }}</td>
                    <td class="text-body-1 font-weight-bold text-primary">{{ item.formula }}</td>
                    <td class="text-body-2">{{ item.description }}</td>
                  </tr></template
                >
              </v-data-table>

              <!-- Example Calculations -->
              <div class="text-h6 text-weight-medium q-mb-md">Example Calculations</div>
              <v-data-table
                :headers="exampleHeaders"
                :items="exampleItems"
                class="elevation-2"
                hide-default-footer
                density="comfortable"
                :item-class="getRowClass"
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td class="text-body-1 text-weight-medium">{{ item.name }}</td>
                    <td class="text-center text-body-1">{{ item.bp }}</td>
                    <td class="text-center text-body-1">{{ item.effects }}</td>
                    <td class="text-center text-body-1">{{ item.statChanges }}</td>
                    <td class="text-body-1 text-weight-medium text-success">
                      {{ item.calculation }}
                    </td>
                  </tr>
                </template>
              </v-data-table>

              <!-- Usage Notes -->
              <v-card class="q-mt-lg bg-amber-lighten-4" elevation="1">
                <v-card-text>
                  <div class="text-body-1 text-weight-medium q-mb-sm">
                    <v-icon icon="mdi-information" color="amber-darken-2" class="q-mr-sm" />
                    Usage Notes:
                  </div>
                  <ul class="text-body-2">
                    <li>BP (Base Power) represents the fundamental strength/utility of the item</li>
                    <li>Each secondary effect adds a flat 10,000 to the total cost</li>
                    <li>Each stat change adds a flat 25,000 to the total cost</li>
                    <li>All prices are displayed in Pokédollars (₱)</li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
          <!-- Price Calculator -->
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
                  Manual entry required for stat changes, secondary effects, and field effects.
                  Enhanced automation coming soon!
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
                            <v-chip
                              color="info"
                              variant="flat"
                              size="small"
                              class="mb-2 enhanced-chip"
                            >
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
          </v-row>
        </v-card>
      </v-container>
    </v-layout>
  </v-app>
</template>

<style scoped>
/* Enhanced styles for spacing and readability */
.v-card {
  border-radius: 12px;
  padding: 24px;
}
.text-h4 {
  font-weight: 600;
}
.q-mb-lg {
  margin-bottom: 24px;
}
.q-mb-md {
  margin-bottom: 16px;
}
.q-mt-lg {
  margin-top: 24px;
}
.q-pa-lg {
  padding: 24px;
}
.text-center {
  text-align: center;
}
.q-mr-sm {
  margin-right: 8px;
}

.v-data-table th,
.v-data-table td {
  padding: 12px !important;
  font-size: 1rem;
}

.row-even {
  background-color: #fafafa;
}

.row-odd {
  background-color: #ffffff;
}

/* Color coding for different parts of the formula */
.text-primary {
  color: #1976d2 !important;
}
.text-green {
  color: #388e3c !important;
}
.text-orange {
  color: #f57c00 !important;
}
.text-success {
  color: #2e7d32 !important;
}
</style>
