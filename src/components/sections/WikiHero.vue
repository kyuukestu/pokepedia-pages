<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: 'mdi-pokeball',
  },
  pattern: {
    type: String as () => 'pokeball' | 'grid' | 'dots',
    default: 'pokeball',
  },
})
</script>

<template>
  <div
    class="wiki-hero mb-8"
    :class="theme.current.value.dark ? 'wiki-hero--dark' : 'wiki-hero--light'"
  >
    <!-- Background pattern layer -->
    <div class="wiki-hero__pattern" :class="`wiki-hero__pattern--${pattern}`" aria-hidden="true" />

    <!-- Content -->
    <v-container max-width="1200" class="wiki-hero__content py-14 text-center">
      <v-icon
        class="wiki-hero__icon mb-5"
        size="80"
        :color="theme.current.value.dark ? 'red-accent-2' : 'red-darken-2'"
      >
        {{ icon }}
      </v-icon>

      <h1 class="text-h3 font-weight-bold mb-3 wiki-hero__title">{{ title }}</h1>

      <p v-if="subtitle" class="text-h6 wiki-hero__subtitle">{{ subtitle }}</p>

      <slot name="chips" />
    </v-container>
  </div>
</template>

<style scoped>
.wiki-hero {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.wiki-hero--light {
  background: linear-gradient(160deg, #fafafa 0%, #f0f4ff 100%);
}

.wiki-hero--dark {
  background: linear-gradient(160deg, #1a1a2e 0%, #16213e 100%);
}

/* Pokéball repeating pattern */
.wiki-hero__pattern {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.wiki-hero__pattern--pokeball {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='18' fill='none' stroke='%23e53935' stroke-width='1.2' opacity='0.12'/%3E%3Cline x1='12' y1='30' x2='48' y2='30' stroke='%23e53935' stroke-width='1.2' opacity='0.12'/%3E%3Ccircle cx='30' cy='30' r='5' fill='none' stroke='%23e53935' stroke-width='1.2' opacity='0.12'/%3E%3C/svg%3E");
}

.wiki-hero__pattern--grid {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M40 0H0v40' fill='none' stroke='%23666' stroke-width='0.4' opacity='0.15'/%3E%3C/svg%3E");
}

.wiki-hero__pattern--dots {
  background-image: radial-gradient(circle, rgba(100, 100, 100, 0.15) 1px, transparent 1px);
  background-size: 24px 24px;
}

.wiki-hero__content {
  position: relative;
  z-index: 1;
}

.wiki-hero__icon {
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
}

.wiki-hero--light .wiki-hero__title {
  color: #1a1a2e;
}

.wiki-hero--dark .wiki-hero__title {
  color: #f5f5f5;
}

.wiki-hero--light .wiki-hero__subtitle {
  color: #555;
}

.wiki-hero--dark .wiki-hero__subtitle {
  color: #aaa;
}
</style>
