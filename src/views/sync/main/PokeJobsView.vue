<script setup lang="ts">
import { VDataTable } from 'vuetify/components'

const headers = [
  { title: 'Rank', key: 'rank', sortable: false },
  { title: '0', key: '0 Stars', sortable: false },
  { title: '1', key: '1 Star', sortable: false },
  { title: '2', key: '2 Stars', sortable: false },
  { title: '3', key: '3 Stars', sortable: false },
  { title: '4', key: '4 Stars', sortable: false },
  { title: '5', key: '5 Stars', sortable: false },
]

const payTable = [
  {
    rank: 'Bronze',
    '0 Stars': '500',
    '1 Star': '1000 - 3000',
    '2 Stars': '9000 - 15000',
    '3 Stars': '40000 - 100000',
    '4 Stars': 'N/A',
    '5 Stars': '1000000',
  },
  {
    rank: 'Silver',
    '0 Stars': 'N/A',
    '1 Star': 'N/A',
    '2 Stars': 'N/A',
    '3 Stars': 'N/A',
    '4 Stars': 'N/A',
    '5 Stars': 'N/A',
  },
  {
    rank: 'Gold',
    '0 Stars': 'N/A',
    '1 Star': 'N/A',
    '2 Stars': 'N/A',
    '3 Stars': 'N/A',
    '4 Stars': 'N/A',
    '5 Stars': 'N/A',
  },
  {
    rank: 'Platinum',
    '0 Stars': 'N/A',
    '1 Star': 'N/A',
    '2 Stars': 'N/A',
    '3 Stars': 'N/A',
    '4 Stars': 'N/A',
    '5 Stars': 'N/A',
  },
]

const difficultyDescriptions = [
  {
    icon: 'mdi-account-hard-hat',
    text: 'Basic Jobs of that rank; typically involves simple tasks that pose minimal danger but may require Pokémon labor: e.g., manual labor, running deliveries, etc.',
  },
  {
    icon: 'mdi-pokemon-go',
    text: 'A Job of Moderate Difficulty. May involve combat or finesse. Accomplishable by a single trainer. e.g., Manufacturing, Crafting, etc. At least one Gym Badge (or its equivalent) required.',
  },
  {
    icon: 'mdi-account-group',
    text: 'Jobs of ardent difficulty, a team of trainers is recommended. At least three Gym Badges (or their equivalent) required.',
  },
  {
    icon: 'mdi-alert',
    text: 'The difficulty of these jobs is expected to exceed the rank they’re assigned to, even with a team you can expect these to be grueling tasks. May require several days to complete. At least five Gym Badges (or their equivalent) required.',
  },
  {
    icon: 'mdi-close-octagon',
    text: 'Even with a team of trainers, death looms for the careless trainer. These jobs may also demand time commitments measured in weeks or more. At least five Gym Badges (or their equivalent) required.',
  },
  {
    icon: 'mdi-skull',
    text: 'Make no mistake, you are going to die. Payment will be made to your next of kin. e.g., Ultra Wars.',
  },
]

const formatCurrency = (value: string) => {
  if (value === 'N/A') {
    return value
  }
  const range = value.split('-').map((part) => {
    const num = parseFloat(part.trim())
    return `₱${num.toLocaleString('en-US', { minimumFractionDigits: 0 })}`
  })
  return range.join(' - ')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getRowClass = (item: any, index: number) => {
  return index % 2 === 0 ? 'row-even' : 'row-odd'
}
</script>

<template>
  <v-app>
    <q-layout class="q-pa-lg q-mt-lg">
      <v-container>
        <q-card class="bg-grey-1">
          <v-card class="q-pa-lg" elevation="6">
            <v-card-title class="text-h4 text-weight-medium q-mb-lg"> PokéJobs </v-card-title>
            <v-card-text>
              <p class="text-body-1 text-weight-regular q-mb-lg">
                Below is the pay table for jobs based on a trainer's rank and job difficulty. Ranks
                are Bronze, Silver, Gold, and Platinum, with job difficulties rated from 0 to 5
                stars.
              </p>
              <v-list class="q-mb-lg" density="comfortable">
                <v-list-item
                  v-for="(item, index) in difficultyDescriptions"
                  :key="index"
                  class="text-body-2"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon" color="green" class="q-mr-sm" size="large" />
                  </template>
                  <v-list-item-title class="text-weight-regular">
                    <v-rating
                      :model-value="index"
                      :length="5"
                      size="1.2em"
                      color="green"
                      full-icon="mdi-star"
                      empty-icon="mdi-star-outline"
                      readonly
                      class="q-mr-sm"
                    />
                  </v-list-item-title>
                  {{ item.text }}
                </v-list-item>
              </v-list>
              <v-data-table
                :headers="headers"
                :items="payTable"
                class="elevation-2"
                hide-default-footer
                density="comfortable"
                :item-class="getRowClass"
              >
                <template v-slot:headers="{ columns }">
                  <tr>
                    <th
                      v-for="column in columns"
                      :key="column.key ?? undefined"
                      class="text-center text-body-1 text-weight-medium"
                    >
                      <div class="rating-container q-ma-sm">
                        <span v-if="column.key === 'rank'">
                          {{ column.title }}
                        </span>

                        <v-rating
                          v-else
                          :model-value="parseInt(column.title ?? '0')"
                          :length="5"
                          size="xs"
                          color="green"
                          full-icon="mdi-star"
                          empty-icon="mdi-star-outline"
                          density="compact"
                          readonly
                          class="q-ma-sm"
                        />
                      </div>
                    </th>
                  </tr>
                </template>
                <template v-slot:item="{ item }">
                  <tr>
                    <td class="text-center text-body-1">{{ item.rank }}</td>
                    <td class="text-center text-body-1">{{ formatCurrency(item['0 Stars']) }}</td>
                    <td class="text-center text-body-1">{{ formatCurrency(item['1 Star']) }}</td>
                    <td class="text-center text-body-1">{{ formatCurrency(item['2 Stars']) }}</td>
                    <td class="text-center text-body-1">{{ formatCurrency(item['3 Stars']) }}</td>
                    <td class="text-center text-body-1">{{ formatCurrency(item['4 Stars']) }}</td>
                    <td class="text-center text-body-1">{{ formatCurrency(item['5 Stars']) }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </q-card>
      </v-container>
    </q-layout>
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
.q-pa-lg {
  padding: 24px;
}
.q-mt-lg {
  margin-top: 24px;
}
.text-center {
  text-align: center;
}
.q-ma-sm {
  margin: 8px;
}

.v-data-table th,
.v-data-table td {
  padding: 12px !important;
  font-size: 1rem;
}

.rating-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 150px; /* Adjust this value based on your design needs */
}

/* Ensure Quasar's q-rating icons are spaced evenly */
.q-rating .q-icon {
  flex: 1;
  text-align: center;
}
</style>
