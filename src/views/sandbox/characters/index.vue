<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import { useCharacters } from '@/composables/useCharacters'

const { processedCharacters, loading, error, search, regionId, category } = useCharacters()

const categories = ['all', 'oc', 'npc']
const regions = [
  { title: 'All', value: null },
  { title: 'Kanto', value: 'kanto' },
  { title: 'Johto', value: 'johto' },
  { title: 'Hoenn', value: 'hoenn' },
  { title: 'Kalos', value: 'kalos' },
  { title: 'Oblivia', value: 'oblivia' },
]
</script>

<template>
  <v-container fluid>
    <WikiHero
      title="Character Directory"
      subtitle="Registry of all known entities"
      icon="mdi-account-details"
    />

    <v-container max-width="1200">
      <!-- Filters -->
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="search" label="Search characters" clearable />
        </v-col>

        <v-col cols="12" md="3">
          <v-select v-model="category" :items="categories" label="Category" />
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="regionId"
            :items="regions"
            item-title="title"
            item-value="value"
            label="Region"
            clearable
          />
        </v-col>
      </v-row>

      <!-- States -->
      <v-progress-linear v-if="loading" indeterminate />

      <v-alert v-if="error" type="error">
        {{ error }}
      </v-alert>

      <!-- Grid -->
      <v-row>
        <v-col v-for="c in processedCharacters" :key="c.id" cols="12" md="3">
          <v-card :to="c.path">
            <v-img :src="c.image" height="220" cover />

            <v-card-title>
              {{ c.fullName }}
            </v-card-title>

            <v-card-subtitle> {{ c.regionName }} • {{ c.category.toUpperCase() }} </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
