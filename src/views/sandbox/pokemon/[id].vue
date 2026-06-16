<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonDetail } from '@/composables/usePokemonDetail'

const route = useRoute()
const id = computed(() => route.params.id as string)

const { pokemon, loading, error } = usePokemonDetail(id)

const defaultBuild = computed(() => pokemon.value?.builds?.find((b: any) => b.is_default))
const ownership = computed(() => pokemon.value?.ownership ?? [])

console.log(`Loading pokemon ${id.value}`)

watch(pokemon, (val) => {
  console.log('pokemon updated:', val)
})
</script>

<template>
  <v-container>
    <v-progress-linear v-if="loading" indeterminate />

    <v-alert v-if="error" type="error">
      {{ error }}
    </v-alert>

    <v-card v-if="pokemon" class="pa-6">
      <h1>
        {{ pokemon.full_name }}
      </h1>

      <div class="text-h6">
        {{ pokemon.species_name }}
      </div>

      <div class="mt-2">
        <v-chip v-if="pokemon.shiny"> Shiny </v-chip>

        <v-chip v-if="pokemon.alpha"> Alpha </v-chip>
      </div>
      <v-card v-if="defaultBuild" class="pa-4 mt-4">
        <h3>Pokémon Details</h3>

        <div>Lv {{ defaultBuild.level }}</div>

        <div>
          Ability:
          {{ defaultBuild.ability }}
        </div>

        <div>
          Held Item:
          {{ defaultBuild.held_item || 'None' }}
        </div>

        <v-row class="mt-3">
          <v-col v-for="m in defaultBuild.moves" :key="m.slot_order" cols="6">
            <v-card class="pa-2">
              {{ m.move }}
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="pa-4 mt-4">
        <h3>Ownership History</h3>

        <v-timeline density="compact">
          <v-timeline-item v-for="o in ownership" :key="o.start_date">
            {{ o.character.full_name }}

            <div class="text-caption">
              {{ o.start_date }}
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card>
    </v-card>
  </v-container>
</template>
