<script setup lang="ts">
import type { CharacterCore } from '@/types/CharacterDashboard'

defineProps<{
  character: CharacterCore
}>()
</script>
<template>
  <v-card class="pa-4 d-flex align-center">
    <!-- Portrait -->
    <v-avatar size="96" class="mr-4">
      <v-img :src="character.image_src ?? ''" />
    </v-avatar>

    <!-- Main identity block -->
    <div class="flex-grow-1">
      <!-- Name -->
      <div class="text-h6 font-weight-bold">
        {{ character.full_name }}
      </div>

      <!-- Classes -->
      <div class="text-body-2 text-medium-emphasis">
        {{ character.classes.map((c) => c.id).join(' • ') }}
      </div>

      <!-- Region -->
      <div class="text-caption">
        {{ character.region.name }}
      </div>
    </div>
  </v-card>
</template>
