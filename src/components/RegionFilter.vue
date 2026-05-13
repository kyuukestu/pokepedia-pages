<script setup lang="ts">
import { computed } from 'vue'

// Define a generic interface for items that have a region property
interface ItemWithRegion {
  region: string
}

const props = defineProps<{
  modelValue: string | null
  items: ItemWithRegion[]
  label?: string
}>()

const emit = defineEmits(['update:modelValue'])

// Extract unique regions from the provided items
const regions = computed(() => [...new Set(props.items.map((i) => i.region.toUpperCase()))].sort())

// Computed for v-model binding
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>

<template>
  <v-select
    v-model="internalValue"
    :items="regions"
    :label="label || 'Filter by Region'"
    variant="outlined"
    density="comfortable"
    hide-details
    clearable
    class="text-uppercase"
    v-bind="$attrs"
  />
</template>
