<script setup lang="ts">
import MasterNav from '@/components/MasterNav.vue'
</script>
<template>
  <v-card>
    <v-layout>
      <MasterNav />
      <slot></slot>
    </v-layout>
  </v-card>
</template>
