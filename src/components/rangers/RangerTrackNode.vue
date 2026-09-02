<script setup lang="ts">
import { Handle, Position, type NodeProps } from '@vue-flow/core'
import type { RangerRank } from '@/types/ranger'

const props = defineProps<NodeProps<RangerRank>>()
</script>

<template>
  <div
    class="ranger-track-node"
    :class="`ranger-track-node--${props.data.color || 'blue'}`"
  >
    <Handle
      type="target"
      :position="Position.Top"
      class="track-node-handle"
    />

    <v-icon
      :icon="props.data.icon"
      size="16"
      class="track-node-icon"
    />

    <span class="track-node-title font-mono">{{ props.data.title }}</span>

    <Handle
      type="source"
      :position="Position.Bottom"
      class="track-node-handle"
    />
  </div>
</template>

<style scoped>
.font-mono {
  font-family: 'JetBrains Mono', monospace, sans-serif;
}

.ranger-track-node {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  cursor: pointer;
  background: rgba(var(--v-theme-surface), 0.95);
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.ranger-track-node:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

/* Color Variant Themes */
.ranger-track-node--blue {
  color: rgb(var(--v-theme-primary));
  border-color: rgba(var(--v-theme-primary), 0.3);
  background: rgba(var(--v-theme-primary), 0.06);
}

.ranger-track-node--green {
  color: rgb(var(--v-theme-success));
  border-color: rgba(var(--v-theme-success), 0.3);
  background: rgba(var(--v-theme-success), 0.06);
}

.ranger-track-node--orange,
.ranger-track-node--amber {
  color: rgb(var(--v-theme-warning));
  border-color: rgba(var(--v-theme-warning), 0.3);
  background: rgba(var(--v-theme-warning), 0.06);
}

.ranger-track-node--purple {
  color: #9c27b0;
  border-color: rgba(156, 39, 176, 0.3);
  background: rgba(156, 39, 176, 0.06);
}

/* Flow Handle Overrides */
:deep(.track-node-handle) {
  width: 8px;
  height: 8px;
  background: currentColor;
  border: 2px solid rgb(var(--v-theme-surface));
  border-radius: 50%;
  transition: transform 0.2s ease;
}

.ranger-track-node:hover :deep(.track-node-handle) {
  transform: scale(1.25);
}
</style>
