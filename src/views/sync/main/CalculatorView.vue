<script setup lang="ts">
import FMoveCalc from '@/components/calculators/FMoveCalc.vue'
import FPokeCalc from '@/components/calculators/FPokeCalc.vue'
import CatchRateCalc from '@/components/calculators/CatchRateCalc.vue'
</script>

<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" class="text-center">
        <FMoveCalc />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" class="text-center">
        <FPokeCalc />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" class="text-center">
        <CatchRateCalc />
      </v-col>
    </v-row>
  </v-container>
</template>
