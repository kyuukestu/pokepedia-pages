<script setup lang="ts">
import type { ActivitySection } from '@/types/CharacterDashboard'

const props = defineProps<{
  activity: ActivitySection[]
}>()
</script>
<template>
  <v-card class="pa-4 mb-4">
    <h3 class="mb-3">Events</h3>

    <v-row>
      <v-col v-for="e in activity.events" :key="e.slug" cols="12" md="6">
        <v-card class="pa-3">
          <div class="font-weight-medium">
            {{ e.title }}
          </div>

          <div class="text-caption">{{ e.category }} • {{ e.region }}</div>

          <div class="text-caption">
            {{ e.date }}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
  <v-card class="pa-4">
    <h3 class="mb-3">Timeline</h3>

    <v-timeline side="end">
      <v-timeline-item v-for="t in activity.timeline" :key="t.ref_id + t.timestamp">
        <template #opposite>
          <div class="text-caption">
            {{ new Date(t.timestamp).toLocaleString() }}
          </div>
        </template>

        <div class="font-weight-medium">
          {{ t.type }}
        </div>

        <div class="text-caption">
          {{ t.ref_id }}
        </div>
      </v-timeline-item>
    </v-timeline>
  </v-card>
</template>
