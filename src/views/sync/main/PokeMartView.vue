<script setup lang="ts">
import { VDataTable } from 'vuetify/components'

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
          <MoveCostCalc />
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
