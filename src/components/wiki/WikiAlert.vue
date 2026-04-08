<script setup lang="ts">
import { useTheme } from 'vuetify'
import { computed } from 'vue'

const theme = useTheme()

const props = defineProps({
  type: {
    type: String as () => 'warning' | 'error' | 'info',
    default: 'warning',
  },
})

const typeMap = {
  warning: {
    icon: 'mdi-alert-outline',
    light: 'orange-darken-1',
    dark: 'orange-lighten-1',
  },
  error: {
    icon: 'mdi-close-octagon-outline',
    light: 'red-darken-1',
    dark: 'red-lighten-1',
  },
  info: {
    icon: 'mdi-information-outline',
    light: 'blue-darken-1',
    dark: 'blue-lighten-1',
  },
}

const alertColor = computed(() => {
  const map = typeMap[props.type]
  return theme.current.value.dark ? map.dark : map.light
})
const alertIcon = computed(() => typeMap[props.type].icon)
</script>

<template>
  <v-alert
    :type="type"
    variant="tonal"
    :color="alertColor"
    :icon="alertIcon"
    class="wiki-alert mb-4"
    rounded="lg"
  >
    <slot />
  </v-alert>
</template>

<style scoped>
.wiki-alert {
  font-size: 0.95rem;
  line-height: 1.7;
}
</style>
