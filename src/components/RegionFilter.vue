<script setup lang="ts">
import { computed } from 'vue'
import type { AllRegions } from '@/types/region'

interface ItemWithRegions {
  regions: AllRegions[]
}

const props = defineProps<{
  modelValue: AllRegions | null
  items: ItemWithRegions[]
  label?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: AllRegions | null]
}>()

const regions = computed<AllRegions[]>(() => {
  return [...new Set(props.items.flatMap((item) => item.regions))]
    .sort()
})

const internalValue = computed({
  get: () => props.modelValue,
  set: (value: AllRegions | null) => {
    emit('update:modelValue', value)
  },
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
