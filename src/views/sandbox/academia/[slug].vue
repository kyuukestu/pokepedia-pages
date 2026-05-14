<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useInstitutionStore } from '@/stores/useInstitutionStore'
import AcademyMap from '@/components/academia/AcademyMap.vue'
import { getCharImageUrl } from '@/utils/path-resolvers'

const overlay = ref(false)
// Default to 'art' if it exists, otherwise 'interactive'
const route = useRoute('/sandbox/academia/[slug]') // Typed route if using unplugin
const institutionStore = useInstitutionStore()

// Find the institution that matches the URL slug
const institution = computed(() =>
  institutionStore.allInstitutions.find((inst) => inst.slug === route.params.slug),
)

const mapMode = ref(institution.value?.customMapPath ? 'art' : 'interactive')
const academyMapRef = ref<InstanceType<typeof AcademyMap> | null>(null)

// Access the roster for this specific institution
const roster = computed(() =>
  institution.value ? institutionStore.getInstitutionRoster(institution.value.id) : [],
)
</script>
<template>
  <v-container v-if="institution" fluid class="pa-0">
    <!-- Hero Banner -->
    <v-img :src="institution.image" height="400" cover class="align-center">
      <div
        class="fill-height d-flex flex-column justify-center align-center bg-black/40 text-white"
      >
        <h1 class="text-h2 font-weight-black">{{ institution.name }}</h1>
        <p class="text-h6 opacity-80">
          {{ institution.location.city }}, {{ institution.location.region }}
        </p>
      </div>
    </v-img>

    <v-container max-width="1200" class="py-12">
      <v-row>
        <!-- Main Content -->
        <v-col cols="12" md="8">
          <section class="mb-10">
            <h2 class="text-h4 font-weight-bold mb-4">Facility Overview</h2>
            <p class="text-body-1 line-height-relaxed">{{ institution.description }}</p>
          </section>

          <!-- Map Section -->
          <section v-if="institution.mapConfig || institution.customMapPath" class="mb-12">
            <div class="d-flex align-center justify-space-between mb-4">
              <div class="d-flex align-center ga-2">
                <v-icon color="primary">mdi-map-legend</v-icon>
                <h2 class="text-h4 font-weight-bold">Campus Map</h2>
              </div>

              <v-btn-toggle
                v-if="institution.mapConfig && institution.customMapPath"
                v-model="mapMode"
                mandatory
                density="compact"
                selected-class="text-primary"
                variant="text"
              >
                <v-btn value="interactive" prepend-icon="mdi-layers-outline">Interactive</v-btn>
                <v-btn value="art" prepend-icon="mdi-draw">Illustration</v-btn>
              </v-btn-toggle>
            </div>

            <!-- Transition Wrapper for smooth switching -->
            <div class="map-stage relative">
              <!-- View 1: Interactive (Kept in DOM via v-show) -->
              <v-fade-transition>
                <div v-show="mapMode === 'interactive'" class="map-wrapper">
                  <div class="map-frame" v-if="institution.mapConfig">
                    <AcademyMap
                      ref="academyMapRef"
                      :config="institution.mapConfig"
                      :active="mapMode"
                    />
                  </div>
                </div>
              </v-fade-transition>

              <!-- View 2: Illustrative Art (Kept in DOM via v-show) -->
              <v-fade-transition>
                <div v-show="mapMode === 'art'" class="map-wrapper">
                  <div
                    v-if="institution.customMapPath"
                    class="art-map-container"
                    @click="overlay = true"
                  >
                    <v-img
                      :src="`/assets/maps/${institution.customMapPath}`"
                      class="hand-drawn-map"
                      cover
                    >
                      <div class="expand-hint">
                        <v-icon size="32">mdi-magnify-plus-outline</v-icon>
                        <span>View Full Illustration</span>
                      </div>
                    </v-img>
                  </div>
                </div>
              </v-fade-transition>
            </div>

            <!-- Lightbox Overlay -->
            <v-overlay v-model="overlay" class="align-center justify-center" scrim="black">
              <div class="lightbox-content" @click="overlay = false">
                <img :src="`/assets/maps/${institution.customMapPath}`" class="full-res-map" />
                <v-btn
                  icon="mdi-close"
                  position="fixed"
                  top="20"
                  right="20"
                  @click="overlay = false"
                />
              </div>
            </v-overlay>
          </section>
        </v-col>

        <!-- Sidebar: Faculty -->
        <v-col cols="12" md="4">
          <v-card variant="outlined" class="pa-4 rounded-xl">
            <h3 class="text-overline mb-4">Faculty</h3>
            <v-list>
              <v-list-item
                v-for="member in roster"
                :key="member.id"
                :title="member.name.full"
                :subtitle="member.academia?.rank || ''"
                :to="`/sandbox/characters/${member.region}/${member.category}/${member.id}`"
              >
                <template #prepend>
                  <v-avatar
                    v-if="member.image"
                    :src="
                      getCharImageUrl(
                        member.image?.src,
                        member.category === 'oc',
                        member.id,
                        member.region,
                      )
                    "
                  />
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>

  <!-- 404 State -->
  <v-container v-else class="text-center py-16">
    <h2 class="text-h4">Institution Not Found</h2>
    <v-btn to="/sandbox/academic" class="mt-4">Back to Registry</v-btn>
  </v-container>
</template>

<style scoped>
.map-stage {
  position: relative;
  min-height: 500px; /* Crucial: Ensures container has height for map calcs */
}

.map-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.map-frame {
  height: 500px;
  border: 1px solid rgb(var(--v-theme-outline), 0.2);
  border-radius: 12px;
  overflow: hidden;
}

.art-map-container {
  height: 500px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: zoom-in;
  border: 1px solid rgb(var(--v-theme-outline), 0.3);
}

/* ... existing styles for expand-hint and hand-drawn-map ... */
</style>
