<script setup lang="ts">
import { Handle, Position, type NodeProps } from '@vue-flow/core'
import type { RangerRank } from '@/types/ranger'

const props = defineProps<NodeProps<RangerRank>>()
</script>

<template>
  <v-card
    class="ranger-rank-node border"
    :class="`ranger-rank-node--${props.data.color || 'green'}`"
    elevation="2"
    min-width="240"
  >
    <!-- Top Flow Handle -->
    <Handle
      type="target"
      :position="Position.Top"
      class="ranger-node-handle"
    />

    <div class="ranger-rank-node__accent" />

    <v-card-item class="pa-3">
      <template #prepend>
        <v-avatar
          :color="props.data.color || 'green'"
          variant="tonal"
          size="40"
          class="me-3 border-subtle"
        >
          <v-icon :icon="props.data.icon" size="22" />
        </v-avatar>
      </template>

      <div class="d-flex flex-column">
        <span class="text-overline font-mono text-medium-emphasis lh-none mb-1">
          Rank Level
        </span>
        <v-card-title class="text-subtitle-2 font-weight-bold pa-0 lh-tight text-high-emphasis">
          {{ props.data.title }}
        </v-card-title>
      </div>
    </v-card-item>

    <!-- Bottom Flow Handle -->
    <Handle
      type="source"
      :position="Position.Bottom"
      class="ranger-node-handle"
    />
  </v-card>
</template>

<style scoped>
.font-mono {
  font-family: 'JetBrains Mono', monospace, sans-serif;
}

.lh-none {
  line-height: 1;
}

.lh-tight {
  line-height: 1.25;
}

.ranger-rank-node {
  position: relative;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  background: rgba(var(--v-theme-surface), 0.95) !important;
}

.ranger-rank-node:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
}

/* Color Accent Bars */
.ranger-rank-node__accent {
  height: 3px;
  width: 100%;
  background-color: currentColor;
}

.ranger-rank-node--green {
  color: rgb(var(--v-theme-success));
}

.ranger-rank-node--blue {
  color: rgb(var(--v-theme-primary));
}

.ranger-rank-node--orange,
.ranger-rank-node--amber {
  color: rgb(var(--v-theme-warning));
}

.ranger-rank-node--purple {
  color: #9c27b0;
}

/* Custom Handles */
:deep(.ranger-node-handle) {
  width: 10px;
  height: 10px;
  background: currentColor;
  border: 2px solid rgb(var(--v-theme-surface));
  border-radius: 50%;
  transition: transform 0.2s ease;
}

.ranger-rank-node:hover :deep(.ranger-node-handle) {
  transform: scale(1.25);
}
</style>
