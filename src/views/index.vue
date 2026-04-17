<script setup lang="ts">
import { useRpStore } from '@/stores/RpStore'
import RPCard from '@/components/cards/RolePlayCard.vue'
import legends from '@/assets/USUM_Ultra_Necrozma_and_Legendary_Pokemon.jpg'
import HomeHeader from '@/components/sections/HomeHeader.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'

const rpStore = useRpStore()
</script>

<template>
  <v-img
    :src="legends"
    cover
    class="fill-height pb-12"
    gradient="to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.6)"
  >
    <v-container>
      <HomeHeader />

      <v-row justify="center" class="mb-10">
        <v-col cols="12" md="10">
          <WikiCard
            title="The Great Archive"
            icon="mdi-library-shelves"
            class="hub-intro-card amber-darken-3"
          >
            <p class="text-h6 text-center font-weight-light">
              Welcome to the centralized hub of information for our <strong>RPNation</strong> and
              <strong>Discord</strong> Pokemon adventures. Here you can find an ever-growing
              collection of articles and info-dumps about the world of the RolePlay.
            </p>
          </WikiCard>
        </v-col>
      </v-row>

      <v-row justify="start">
        <v-col cols="12">
          <div class="d-flex align-center mb-6">
            <v-icon color="amber-darken-2" size="32" class="mr-3">mdi-map-search</v-icon>
            <h2 class="text-h4 font-weight-bold text-white">Active Dimensions</h2>
            <v-divider class="ml-4 border-opacity-50" />
          </div>
        </v-col>

        <v-col cols="12" sm="6" md="4" v-for="rp in rpStore.roleplays" :key="rp.id" class="d-flex">
          <RPCard :rp="rp" />
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>

<style scoped>
.hub-intro-card {
  background: rgba(0, 0, 0, 0.4) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 215, 0, 0.2) !important;
}
</style>
