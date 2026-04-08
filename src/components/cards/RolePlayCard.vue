<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  rp: { type: Object, required: true },
})

const parsedTags = computed(() =>
  props.rp.tagline ? props.rp.tagline.split(',').map((tag: string) => tag.trim()) : [],
)
</script>

<template>
  <v-card class="rp-card d-flex flex-column" variant="flat" hover>
    <v-img :src="rp.image" height="220" cover class="align-end text-white">
      <div class="image-scrim d-flex align-center justify-center fill-height">
        <v-icon :color="rp.color" size="80" class="floating-icon icon-glow">
          {{ rp.icon }}
        </v-icon>
      </div>
    </v-img>

    <v-card-item class="pt-4">
      <template v-slot:title>
        <span class="text-h5 font-weight-black text-uppercase letter-spacing-1">
          {{ rp.title }}
        </span>
      </template>
      <div class="d-flex flex-wrap gap-1 mt-2">
        <v-chip
          v-for="tag in parsedTags"
          :key="tag"
          size="x-small"
          :color="rp.color"
          variant="flat"
          class="font-weight-bold"
        >
          {{ tag }}
        </v-chip>
      </div>
    </v-card-item>

    <v-card-text class="grow py-2 opacity-80 text-body-2 lh-relaxed">
      {{ rp.description }}
    </v-card-text>

    <v-divider class="mx-4 border-opacity-25" />

    <v-card-actions class="pa-4">
      <v-btn
        block
        :color="rp.color"
        variant="elevated"
        size="large"
        class="font-weight-black"
        :to="rp.link"
      >
        <v-icon left class="mr-2">mdi-portal</v-icon>
        Enter Dimension
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.rp-card {
  background: rgba(20, 20, 20, 0.8) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.rp-card:hover {
  transform: translateY(-8px);
  border-color: v-bind('rp.color');
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
}

.image-scrim {
  background: rgba(0, 0, 0, 0.3);
  transition: background 0.3s ease;
}

.rp-card:hover .image-scrim {
  background: rgba(0, 0, 0, 0.1);
}

.icon-glow {
  filter: drop-shadow(0 0 10px v-bind('rp.color'));
}

.lh-relaxed {
  line-height: 1.6;
}

.floating-icon {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}
</style>
