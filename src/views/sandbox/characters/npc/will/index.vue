<script setup lang="ts">
import { computed, inject, unref } from 'vue'
import { useRoute } from 'vue-router'
import WikiCard from '@/components/wiki/WikiCard.vue'

interface ProfileLink {
  title: string
  to: string
  icon: string
}

const route = useRoute()

// 1. Safe Name Extraction
const characterName = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  // Grabs 'karen' and turns it into 'Karen'
  return (segments[3] || 'Character').replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
})

// 2. Bulbapedia Link Construction
const externalLink = computed(() => {
  return `https://bulbapedia.bulbagarden.net/wiki/Karen`
})

// 3. Inject Navigation Links from Layout
const injectedLinks = inject<ProfileLink[]>('profileLinks', [])

const subPages = computed(() => {
  const rawLinks = unref(injectedLinks)
  if (!Array.isArray(rawLinks)) return []

  const currentPath = route.path.replace(/\/$/, '').toLowerCase()
  // Filter out 'Overview' (current path)
  return rawLinks.filter((link) => link.to.toLowerCase() !== currentPath)
})
</script>

<template>
  <v-row v-if="characterName">
    <v-col cols="12" md="4">
      <WikiCard :title="characterName" icon="mdi-camera" class="mb-4">
        <v-img
          src="https://via.placeholder.com/400x500"
          cover
          rounded="lg"
          class="bg-surface-variant"
        >
          <template #placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey-lighten-5" />
            </v-row>
          </template>
        </v-img>
      </WikiCard>

      <v-btn
        block
        variant="tonal"
        color="secondary"
        prepend-icon="mdi-open-in-new"
        class="text-none"
        rounded="xl"
        :href="externalLink"
        target="_blank"
      >
        View on Bulbapedia
      </v-btn>
    </v-col>

    <v-col cols="12" md="8">
      <WikiCard :title="`${characterName} Overview`" icon="mdi-shield-star" class="mb-6">
        <p class="text-body-1">
          As a member of the **Indigo Elite Four**, {{ characterName }} serves as one of the final
          challenges for trainers seeking the title of Champion. In this RP, she is known for her
          preference for Dark-type Pokémon and her philosophy that "Strong Pokémon. Weak Pokémon.
          That is only the selfish perception of people."
        </p>
      </WikiCard>

      <div v-if="subPages && subPages.length > 0">
        <div class="text-overline mb-4 px-2 text-medium-emphasis">Character Dossier Sections</div>
        <v-row>
          <v-col v-for="page in subPages" :key="page.to" cols="12" sm="6">
            <v-card
              :to="page.to"
              border
              flat
              rounded="xl"
              class="pa-4 d-flex align-center dossier-card"
            >
              <v-avatar color="primary-lighten-5" rounded="lg" class="mr-4">
                <v-icon :icon="page.icon" color="primary" />
              </v-avatar>
              <div class="text-subtitle-2 font-weight-bold">{{ page.title }}</div>
              <v-spacer />
              <v-icon icon="mdi-chevron-right" size="small" color="disabled" />
            </v-card>
          </v-col>
        </v-row>
      </div>

      <v-sheet
        v-else
        border
        rounded="xl"
        class="pa-8 text-center bg-transparent"
        style="border-style: dashed !important"
      >
        <div class="text-body-2 text-disabled">No sub-sections discovered.</div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<style scoped>
.dossier-card {
  transition: all 0.2s ease-in-out;
}
.dossier-card:hover {
  border-color: rgb(var(--v-theme-primary)) !important;
  background-color: rgb(var(--v-theme-primary), 0.04);
}
</style>
