<script setup lang="ts">
import { computed } from 'vue'

type Region = {
  id: string
  name: string
}

const props = defineProps<{
  modelValue: string | null
  items: Region[]
  label?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const selectItems = computed(() => [
  { title: 'All Regions', value: null },
  ...props.items.map((r) => ({
    title: r.name,
    value: r.id,
  })),
])
</script>

<template>
  <v-select
    v-model="internalValue"
    :items="selectItems"
    :label="label ?? 'Region'"
    item-title="title"
    item-value="value"
    clearable
    density="comfortable"
    variant="solo"
  />
</template>
