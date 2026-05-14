<script setup lang="ts">
import { computed } from 'vue'
import type { CharacterMeta } from '@/types/character'
import { useCharacterStore } from '@/stores/useCharacterStore'
import { WCSRankLabels, CoordinatorRankLabels, RangerRankLabels } from '@/types/league'

const props = defineProps<{
  data: any
  meta: CharacterMeta
  totals: { badges: number; ribbons: number }
}>()

const store = useCharacterStore()

const hasCompetitive = computed(
  () => props.meta.wcsRank || props.meta.coordinatorRank || props.meta.rangerRank,
)

const genderIcon = computed(() => {
  if (props.meta.gender === 'male') return 'mdi-gender-male'
  if (props.meta.gender === 'female') return 'mdi-gender-female'
  return 'mdi-gender-non-binary'
})

const formatDate = (dateStr: string) => {
  return new Date(dateStr)
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    })
    .toUpperCase()
}

const pokemonCount = computed(() => store.pokemonCount)
</script>

<template>
  <div class="dashboard-grid">
    <!-- BIO SECTION -->
    <v-card class="glass-module bio-card pa-8 span-all">
      <div class="module-header mb-4">
        <v-icon size="16" class="me-2" color="primary">mdi-text-box-search-outline</v-icon>
        Dossier Summary
      </div>
      <p class="text-h6 bio-text">
        {{ meta.summary || 'Biographical data for this entity remains classified.' }}
      </p>

      <div class="d-flex flex-wrap gap-4 mt-8">
        <div v-if="meta.age" class="micro-box">
          <span class="label">Age</span>
          <span class="value">{{ meta.age }}</span>
        </div>

        <div v-if="meta.gender" class="micro-box gender-box" :class="meta.gender">
          <span class="label">Identity</span>
          <div class="d-flex align-center gap-2">
            <v-icon size="20" class="gender-symbol">{{ genderIcon }}</v-icon>
            <span class="value text-capitalize">{{ meta.gender }}</span>
          </div>
        </div>

        <div v-if="meta.height" class="micro-box">
          <span class="label">Height</span>
          <span class="value">{{ meta.height }}</span>
        </div>
      </div>
    </v-card>

    <!-- OCCUPATION SECTION -->
    <v-card v-if="meta.occupationRoles?.primary" class="glass-module occupation-card pa-6">
      <div class="module-header mb-6">Occupation</div>
      <div class="primary-role">{{ meta.occupationRoles.primary }}</div>

      <div class="chip-container mt-6">
        <v-chip
          v-for="r in meta.occupationRoles.other"
          :key="r"
          size="small"
          class="custom-role-chip"
          variant="flat"
        >
          {{ r }}
        </v-chip>
      </div>
    </v-card>

    <!-- COMPETITIVE SECTION (Enhanced Labeling) -->
    <v-card v-if="hasCompetitive" class="glass-module rank-card pa-6">
      <div class="module-header mb-6">Competitive Stats</div>
      <div class="rank-stack">
        <!-- WCS Entry -->
        <div v-if="meta.wcsRank" class="rank-item mb-4">
          <div class="rank-category">World Coronation Series</div>
          <div class="rank-value highlight">{{ WCSRankLabels[meta.wcsRank] }}</div>
        </div>

        <!-- Contest Entry -->
        <div v-if="meta.coordinatorRank" class="rank-item mb-4">
          <div class="rank-category">Contest Circuit</div>
          <div class="rank-value highlight">{{ CoordinatorRankLabels[meta.coordinatorRank] }}</div>
        </div>

        <!-- Ranger Entry -->
        <div v-if="meta.rangerRank" class="rank-item">
          <div class="rank-category">Ranger Union</div>
          <div class="rank-value highlight">{{ RangerRankLabels[meta.rangerRank] }}</div>
        </div>
      </div>
    </v-card>

    <!-- ACADEMIA SECTION -->
    <v-card v-if="meta.academia" class="glass-module academia-card pa-8 span-all">
      <div class="d-flex justify-space-between align-start flex-wrap ga-4">
        <div class="grow">
          <div class="module-header mb-4">
            <v-icon size="16" class="me-2" color="primary">mdi-school-outline</v-icon>
            Academic Research Profile
          </div>

          <div class="research-topic-wrapper mb-2">
            <span class="focus-label">Focus</span>
            <div class="research-topic">{{ meta.academia.topic }}</div>
          </div>

          <div class="research-field text-primary text-overline font-weight-bold">
            Field: {{ meta.academia.field || 'General Sciences' }}
          </div>
        </div>

        <!-- Academic Status Stamps -->
        <div class="d-flex ga-2">
          <div class="status-stamp" :class="meta.academia.status.toLowerCase()">
            {{ meta.academia.status }}
          </div>
          <div class="rank-stamp">
            {{ meta.academia.rank }}
          </div>
        </div>
      </div>

      <v-divider class="my-6 opacity-10" />

      <v-row>
        <v-col cols="12" md="6">
          <div class="label-tiny mb-2">Primary Role</div>
          <div class="text-h5 font-weight-black text-uppercase">{{ meta.academia.role }}</div>
        </v-col>

        <v-col v-if="meta.academia.notableWorks?.length" cols="12" md="6">
          <div class="label-tiny mb-4">Peer-Reviewed Publications</div>
          <div class="scroll-container custom-scrollbar">
            <div class="articles-stack">
              <div
                v-for="article in meta.academia.notableWorks"
                :key="article.id"
                class="article-mini-card"
              >
                <div class="d-flex align-center justify-space-between mb-1">
                  <span
                    class="article-cat"
                    :class="`cat-${article.category.toLowerCase().replace(' ', '-')}`"
                  >
                    {{ article.category }}
                  </span>
                  <span class="article-date">{{ formatDate(article.date) }}</span>
                </div>

                <div class="article-title">{{ article.title }}</div>

                <div class="d-flex align-center justify-space-between mt-2">
                  <span class="article-region text-overline">{{ article.region }}</span>
                  <v-btn
                    :to="`/sandbox/kenn/${article.slug}`"
                    variant="text"
                    density="compact"
                    class="read-link px-0"
                    append-icon="mdi-arrow-right"
                  >
                    VIEW FULL TEXT
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-btn
        v-if="meta.academia.bulba"
        :href="meta.academia.bulba"
        target="_blank"
        variant="tonal"
        size="x-small"
        prepend-icon="mdi-open-in-new"
        class="mt-6 academic-link"
      >
        External Research Archive
      </v-btn>
    </v-card>

    <!-- CORE STATS SECTION -->
    <v-card class="glass-module stat-card pa-6 span-all">
      <div class="d-flex align-center justify-space-around text-center">
        <div class="stat-group">
          <div class="stat-value">{{ pokemonCount }}</div>
          <div class="stat-label">Pokemon</div>
        </div>
        <v-divider vertical class="mx-2" />
        <div class="stat-group">
          <div class="stat-value">{{ totals.badges }}</div>
          <div class="stat-label">Badges</div>
        </div>
        <v-divider vertical class="mx-2" />
        <div class="stat-group">
          <div class="stat-value">{{ totals.ribbons }}</div>
          <div class="stat-label">Ribbons</div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.research-topic-wrapper {
  position: relative;
}

.focus-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  text-transform: uppercase;
  color: var(--v-theme-primary);
  display: block;
  letter-spacing: 2px;
  margin-bottom: 4px;
  opacity: 0.8;
}

.scroll-container {
  position: relative;
  width: 100%;
  height: 280px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;

  /* Mask applied here so scrollbar remains interactive */
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 5%,
    black 85%,
    transparent 100%
  );
  mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 85%, transparent 100%);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.span-all {
  grid-column: 1 / -1;
}

.glass-module {
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-left: 4px solid var(--v-theme-primary) !important;
  border-radius: 12px !important;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4) !important;
}

.module-header {
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--v-theme-primary);
  opacity: 0.8;
}

/* Competitive Rank Styling */
.rank-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 8px;
}
.rank-item:last-child {
  border-bottom: none;
}
.rank-category {
  font-size: 0.65rem;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 2px;
}
.rank-value {
  font-size: 1.15rem;
  font-weight: 900;
  letter-spacing: 0.5px;
}

/* Micro-Box Styling (Restored) */
.micro-box {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 20px;
  border-radius: 8px;
  min-width: 100px;
  display: flex;
  flex-direction: column;
}
.micro-box .label {
  font-size: 0.6rem;
  text-transform: uppercase;
  opacity: 0.5;
  margin-bottom: 2px;
}
.micro-box .value {
  font-size: 1.2rem;
  font-weight: 800;
}

.gender-box.male {
  color: #4dabf7;
  border-color: rgba(77, 171, 247, 0.3);
}
.gender-box.female {
  color: #ff92ad;
  border-color: rgba(255, 146, 173, 0.3);
}

.primary-role {
  font-size: 2.2rem;
  font-weight: 950;
  text-transform: uppercase;
  line-height: 1;
}

.custom-role-chip {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  font-weight: 700;
  text-transform: uppercase;
}

.stat-group .stat-value {
  font-size: 3rem;
  font-weight: 950;
  background: linear-gradient(to bottom, #fff, #888);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.stat-group .stat-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 800;
  opacity: 0.6;
}

.highlight {
  color: var(--v-theme-primary);
  font-weight: 900;
}

.research-topic {
  font-family: 'Playfair Display', serif;
  font-size: 1.85rem;
  font-weight: 900;
  line-height: 1.1;
  color: #fff;
  /* Decorative Underline */
  background: linear-gradient(to right, var(--v-theme-primary) 30%, transparent 100%);
  background-position: 0 105%;
  background-size: 100% 2px;
  background-repeat: no-repeat;
  display: inline-block;
  padding-bottom: 4px;
}

.label-tiny {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.5;
  font-weight: 900;
}

.status-stamp,
.rank-stamp {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 1px solid currentColor;
  height: fit-content;
  white-space: nowrap;
}

.status-stamp.active {
  background: rgba(76, 175, 80, 0.1);
  color: #81c784;
}
.status-stamp.retired {
  background: rgba(244, 67, 54, 0.1);
  color: #e57373;
}
.status-stamp.hiatus {
  background: rgba(255, 152, 0, 0.1);
  color: #ffb74d;
}

.rank-stamp {
  color: var(--v-theme-primary);
  border-color: rgba(var(--v-theme-primary), 0.5);
  background: rgba(var(--v-theme-primary), 0.05);
}

.works-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.work-item {
  font-size: 0.85rem;
  padding: 4px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  opacity: 0.8;
  font-style: italic;
}

.work-item::before {
  content: '»';
  margin-right: 8px;
  color: var(--v-theme-primary);
  font-style: normal;
}

.academic-link {
  font-weight: 800;
  letter-spacing: 1px;
  border-radius: 4px;
}

.articles-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 10px 0;
}

/* Update this in your style block */
.articles-stack.scroll-enabled {
  overflow-y: auto;
  /* Use a more subtle mask that only clips the very bottom */
  -webkit-mask-image: linear-gradient(to bottom, black 0%, black 85%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 0%, black 85%, transparent 100%);
}

/* 3. THE CARDS - Refined Border & Glass */
.article-mini-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 14px;
  border-radius: 4px; /* Sharper corners for tactical look */
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
}

/* Vertical Accent Bar */
.article-mini-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 2px;
  background: var(--v-theme-primary);
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.article-mini-card:hover {
  background: rgba(var(--v-theme-primary), 0.05);
  border-color: rgba(var(--v-theme-primary), 0.3);
  transform: translateX(4px); /* Shift right instead of lift */
}

.article-mini-card:hover::before {
  opacity: 1;
}

/* Custom Tactical Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-primary), 0.3);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--v-theme-primary), 0.6);
}

.article-mini-card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
  border-left: 2px solid rgba(var(--v-theme-primary), 0.2); /* Soft indicator */
}

.article-mini-card:hover {
  background: rgba(var(--v-theme-primary), 0.08);
  border-color: rgba(var(--v-theme-primary), 0.4);
  transform: translateY(-2px); /* Lift effect */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.article-cat {
  font-family: 'JetBrains Mono', monospace;
  font-size: 7px;
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: 0; /* Sharp labels */
}

/* Specific Category Accents */
.cat-breaking {
  color: #ff5252;
  border: 1px solid #ff5252;
  background: transparent;
}
.cat-intel {
  color: #7c4dff;
  border: 1px solid #7c4dff;
  background: transparent;
}
.cat-field-report {
  color: #4caf50;
  border: 1px solid #4caf50;
  background: transparent;
}

.article-date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  opacity: 0.5;
}

.article-title {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  letter-spacing: -0.01em;
  font-weight: 700;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-region {
  font-size: 8px !important;
  opacity: 0.4;
  letter-spacing: 1px;
}

.read-link {
  font-size: 9px !important;
  font-weight: 900;
  letter-spacing: 1px;
  color: var(--v-theme-primary) !important;
}

.read-link:hover {
  text-decoration: underline;
}
</style>
