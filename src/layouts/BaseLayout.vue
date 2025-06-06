<script setup lang="ts">
import MasterNav from '@/components/MasterNav.vue'
</script>
<template>
  <v-layout>
    <v-card class="w-full h-full">
      <MasterNav />
      <slot></slot>
    </v-card>
  </v-layout>
</template>
