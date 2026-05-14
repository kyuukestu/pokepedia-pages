<script setup lang="ts">
import { useInstitutionStore } from '@/stores/useInstitutionStore'
import InstitutionServiceCard from '@/components/academia/InstitutionServiceCard.vue'
import { getCharImageUrl } from '@/utils/path-resolvers'

const institutionStore = useInstitutionStore()

/**
 * Note: getInstitutionRoster now returns ResearcherEntry[]
 * which includes the pre-hydrated academia block.
 */
</script>

<template>
  <v-container fluid class="pa-0 bg-background">
    <!-- Header Section -->
    <v-sheet color="surface" class="pa-10 border-b-sm">
      <div class="d-flex align-center ga-4">
        <v-icon size="x-large" color="primary">mdi-library-outline</v-icon>
        <div>
          <h1 class="text-h3 font-weight-black text-uppercase tracking-tight">Academic Registry</h1>
          <p class="text-body-1 opacity-60">
            Official directory of academic institutions, facilities and their faculty.
          </p>
        </div>
      </div>
    </v-sheet>

    <v-container max-width="1400" class="py-12">
      <!-- Institutional Blocks -->
      <div v-for="inst in institutionStore.allInstitutions" :key="inst.id" class="mb-16">
        <v-row>
          <!-- Left: The Service Card (The Institution) -->
          <v-col cols="12" lg="4">
            <InstitutionServiceCard :institution="inst" />
          </v-col>

          <!-- Right: The Faculty Roster (The People) -->
          <v-col cols="12" lg="8">
            <v-card variant="flat" class="pa-6 border-sm rounded-lg bg-surface-variant/20">
              <div class="d-flex align-center justify-space-between mb-6">
                <div class="d-flex align-center ga-2">
                  <v-icon size="small" color="primary">mdi-account-group-outline</v-icon>
                  <span class="text-overline font-weight-black">Assigned Faculty</span>
                </div>
                <v-chip size="x-small" variant="outlined" class="opacity-50 font-weight-bold">
                  {{ institutionStore.getInstitutionRoster(inst.id).length }} PERSONNEL
                </v-chip>
              </div>

              <v-row dense>
                <!-- Grouping both Head and Faculty together via the Store's getter -->
                <v-col
                  v-for="member in institutionStore.getInstitutionRoster(inst.id)"
                  :key="member.id"
                  cols="12"
                  sm="6"
                >
                  <v-card
                    variant="tonal"
                    class="pa-3 hover-effect border-thin"
                    :to="`/sandbox/characters/${member.region}/${member.category}/${member.id}`"
                  >
                    <div class="d-flex align-center ga-3">
                      <v-avatar size="56" class="rounded-lg border-thin bg-black">
                        <v-img
                          v-if="member.image"
                          :src="
                            getCharImageUrl(
                              member.image?.src,
                              member.category === 'oc',
                              member.id,
                              member.region,
                            )
                          "
                          cover
                        />
                      </v-avatar>

                      <div v-if="member.academia" class="overflow-hidden">
                        <div
                          class="text-caption font-weight-black text-primary leading-tight text-uppercase"
                        >
                          {{ member.id === inst.head ? 'DEAN / HEAD' : member.academia.rank }}
                        </div>
                        <div class="text-body-1 font-weight-black text-truncate">
                          {{ member.name.full }}
                        </div>
                        <div class="text-caption opacity-70 text-truncate font-italic">
                          {{ member.academia.topic }}
                        </div>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Empty State if no faculty assigned -->
              <div
                v-if="!institutionStore.getInstitutionRoster(inst.id).length"
                class="text-center py-8 opacity-30"
              >
                <v-icon size="large">mdi-account-off-outline</v-icon>
                <div class="text-caption mt-2">No faculty members currently assigned.</div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-container>
</template>

<style scoped>
.map-frame {
  border: 1px solid rgb(var(--v-theme-outline), 0.2);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.2);
}

.art-map-container {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: zoom-in;
  border: 1px solid rgb(var(--v-theme-outline), 0.3);
  background: #1a1a1a; /* Dark backing for art assets */
}

.hand-drawn-map {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  filter: sepia(0.2) contrast(1.1); /* Subtle "aged paper" feel */
}

.art-map-container:hover .hand-drawn-map {
  transform: scale(1.03);
}

.expand-hint {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  gap: 8px;
}

.art-map-container:hover .expand-hint {
  opacity: 1;
}

.lightbox-content {
  max-width: 95vw;
  max-height: 95vh;
}

.full-res-map {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 50px rgba(0,0,0,0.5));
}

.hover-effect {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.hover-effect:hover {
  transform: translateX(6px);
  background: rgba(var(--v-theme-primary), 0.12) !important;
  border-color: rgba(var(--v-theme-primary), 0.5) !important;
}
</style>
