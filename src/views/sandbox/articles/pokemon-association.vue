<script setup lang="ts">
import ArticleLayout from '@/layouts/ArticleLayout.vue'
import PokemonAssociationMeta from '@/data/kenn/lore/faction/001-pokemon-association'

const articleMeta = PokemonAssociationMeta

const leagueStructure = [
  {
    title: 'Regional Conferences',
    icon: 'mdi-stadium-variant',
    description: 'The annual championship tournaments (e.g., Indigo Plateau, Lily of the Valley) for Trainers who have secured eight regional badges.',
  },
  {
    title: 'The Champion League',
    icon: 'mdi-shield-crown',
    description: 'The highest tier of professional battling, where Conference winners earn the right to challenge the regional Elite Four and Champion.',
  },
  {
    title: 'World Tournament Junior Cup',
    icon: 'mdi-trophy-outline',
    description: 'A prestigious Unova-based invitational focusing on rising talent, often featuring exhibition matches from regional Champions.',
  },
  {
    title: 'Format Innovation',
    icon: 'mdi-sword-cross',
    description: 'The creators of modern battling standards, including the official implementation of Triple Battles and Rotation Battles.',
  },
]

const safetyForces = [
  {
    title: 'Ace Trainer Corps',
    icon: 'mdi-medication-outline',
    description: 'Deputized specialists trained to substitute InterPol and Rangers during emergencies. They focus on minimizing collateral damage and stabilizing high-stakes environments.',
  },
  {
    title: 'Elite Assistance',
    icon: 'mdi-account-star-outline',
    description: 'The Association’s strongest members provide overwhelming tactical support to the Ranger Union during global-scale Legendary crises.',
  },
]

const regionalOffices = [
  {
    title: 'Kanto & Johto (Goldenrod)',
    icon: 'mdi-city',
    description: 'The primary headquarters overseeing the Indigo and Silver Conferences. Known for rigorous Gym Leader qualifying exams.',
  },
  {
    title: 'Hoenn (Lilycove City)',
    icon: 'mdi-airplane-takeoff',
    description: 'Famous for its Aerial Mode—a building capable of transforming into a massive airship for regional crisis coordination.',
  },
  {
    title: 'Sinnoh Branch',
    icon: 'mdi-account-tie-voice',
    description: 'Oversees the Lily of the Valley Conference and maintains the instructional statues found at the entrance of every regional Gym.',
  },
]
</script>

<template>
  <ArticleLayout :meta="articleMeta">
    <!-- Section 1: Championship Path -->
    <section class="notebook-section mb-8">
      <div class="d-flex align-center ga-3 mb-4">
        <v-icon :color="articleMeta.color || 'amber-lighten-2'" size="24">mdi-tournament</v-icon>
        <h2 class="text-h5 font-weight-bold font-serif text-amber-lighten-2 my-0">
          The Championship Path
        </h2>
      </div>

      <p class="article-text">
        The Pokémon Association manages the multi-tiered <strong>League System</strong>, a structured path that takes a Trainer from local Gym challenges to the global stage. While the
        <RouterLink to="/sandbox/orgs/inspection-agency" class="link-amber">Pokémon Inspection Agency (PIA)</RouterLink>
        handles the direct auditing of Gym Leaders, the Association remains the final arbiter of tournament rules and conference eligibility.
      </p>

      <v-row class="mt-2">
        <v-col v-for="item in leagueStructure" :key="item.title" cols="12" sm="6">
          <v-card variant="outlined" class="notebook-card h-100 pa-4">
            <div class="d-flex align-center ga-3 mb-2">
              <v-icon :color="articleMeta.color || 'amber-lighten-2'">{{ item.icon }}</v-icon>
              <span class="font-serif font-weight-bold text-high-emphasis">{{ item.title }}</span>
            </div>
            <p class="text-body-2 text-medium-emphasis mb-0 leading-relaxed">
              {{ item.description }}
            </p>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <!-- Section 2: Beyond the Stadium -->
    <section class="notebook-section mb-8">
      <div class="d-flex align-center ga-3 mb-4">
        <v-icon :color="articleMeta.color || 'amber-lighten-2'" size="24">mdi-map-marker-path</v-icon>
        <h2 class="text-h5 font-weight-bold font-serif text-amber-lighten-2 my-0">
          Beyond the Stadium
        </h2>
      </div>

      <v-card variant="outlined" class="notebook-card pa-6">
        <v-row align="center">
          <v-col cols="12" md="8">
            <p class="mb-3 article-text">
              The Association’s influence extends into specialized niches of Pokémon training. In partnership with the
              <RouterLink to="/sandbox/orgs/aviation-agency" class="link-amber">Aviation Authority</RouterLink>, they regulate high-altitude <strong>Sky Battles</strong> and the technical <strong>PokéRinger</strong> tournaments of Hoenn and Sinnoh.
            </p>
            <p class="mb-0 article-text">
              These events are designed to test specialized skills—such as aerial maneuverability and wind-current synchronization—that fall outside standard stadium-based battling.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center border-left-dashed">
            <v-icon size="80" :color="articleMeta.color || 'amber-lighten-2'" class="opacity-80">
              mdi-airplane-takeoff
            </v-icon>
            <div class="text-caption mt-2 text-medium-emphasis font-serif font-italic">
              Official Seal of the Aviation-League Partnership
            </div>
          </v-col>
        </v-row>
      </v-card>
    </section>

    <!-- Section 3: Regional Sectors -->
    <section class="notebook-section mb-8">
      <div class="d-flex align-center ga-3 mb-4">
        <v-icon :color="articleMeta.color || 'amber-lighten-2'" size="24">mdi-office-building-marker</v-icon>
        <h2 class="text-h5 font-weight-bold font-serif text-amber-lighten-2 my-0">
          Regional Sectors & Chairmen
        </h2>
      </div>

      <p class="article-text">
        Each region operates its own sector of the Association, led by a Chairman. While they maintain standardized international laws, each branch is equipped to handle regional-specific crises and League traditions.
      </p>

      <v-row class="mt-2">
        <v-col v-for="office in regionalOffices" :key="office.title" cols="12" md="4">
          <v-card variant="outlined" class="notebook-card h-100 pa-4">
            <div class="d-flex align-center ga-2 mb-2">
              <v-icon :color="articleMeta.color || 'amber-lighten-2'" size="small">{{ office.icon }}</v-icon>
              <span class="font-serif font-weight-bold text-caption text-uppercase text-amber-lighten-2">
                {{ office.title }}
              </span>
            </div>
            <p class="text-body-2 text-medium-emphasis mb-0 leading-relaxed">
              {{ office.description }}
            </p>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <!-- Section 4: Strategic Oversight -->
    <section class="notebook-section mb-8">
      <div class="d-flex align-center ga-3 mb-4">
        <v-icon :color="articleMeta.color || 'amber-lighten-2'" size="24">mdi-shield-alert-outline</v-icon>
        <h2 class="text-h5 font-weight-bold font-serif text-amber-lighten-2 my-0">
          Strategic Oversight
        </h2>
      </div>

      <p class="article-text">
        The Association serves as a pillar of global security, working in tandem with
        <RouterLink to="/sandbox/orgs/inter-pol" class="link-amber">InterPol</RouterLink> and the
        <RouterLink to="/sandbox/orgs/ranger-union" class="link-amber">Ranger Union</RouterLink>. When crisis strikes, the Association deploys its most capable members to provide tactical support and humanitarian aid.
      </p>

      <v-row class="mt-2 mb-6">
        <v-col v-for="force in safetyForces" :key="force.title" cols="12" sm="6">
          <v-card variant="outlined" class="notebook-card h-100 pa-4">
            <div class="d-flex align-center ga-3 mb-2">
              <v-icon :color="articleMeta.color || 'amber-lighten-2'">{{ force.icon }}</v-icon>
              <span class="font-serif font-weight-bold text-high-emphasis">{{ force.title }}</span>
            </div>
            <p class="text-body-2 text-medium-emphasis mb-0 leading-relaxed">
              {{ force.description }}
            </p>
          </v-card>
        </v-col>
      </v-row>

      <!-- Field Note Callout -->
      <v-card variant="outlined" class="notebook-callout pa-4">
        <div class="d-flex align-center ga-2 mb-2">
          <v-icon color="amber-lighten-2" size="small">mdi-notebook-edit-outline</v-icon>
          <span class="font-serif font-weight-bold text-caption text-uppercase text-amber-lighten-2">
            Field Note • Ace Trainers in RP
          </span>
        </div>
        <p class="text-body-2 mb-0 text-medium-emphasis font-serif">
          Ace Trainers serve as "para-medics" to the professional world. While Champions handle the primary threat, Ace Trainers focus on crowd control, damage mitigation, and emergency Pokémon stabilization to prevent collateral loss of life.
        </p>
      </v-card>
    </section>

    <!-- Info Notice -->
    <v-card variant="outlined" class="notebook-notice pa-4 mt-6">
      <div class="d-flex align-center ga-3">
        <v-icon color="info" size="small">mdi-information-outline</v-icon>
        <span class="text-caption font-serif text-medium-emphasis">
          Advancement to the Champion League requires an official win at a Regional Conference. Top-tier events are monitored by Association officials to ensure zero-tolerance for rule violations.
        </span>
      </div>
    </v-card>
  </ArticleLayout>
</template>

<style scoped>
.font-serif {
  font-family: 'Georgia', serif !important;
}

.leading-relaxed {
  line-height: 1.6;
}

.article-text {
  font-family: 'Georgia', serif;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #d1c7bd;
}

.notebook-card {
  background-color: #1a1a1a !important;
  border: 1px dashed #3d332a !important;
  border-radius: 4px;
}

.notebook-callout {
  background-color: rgba(255, 183, 77, 0.05) !important;
  border: 1px solid #524436 !important;
  border-radius: 4px;
}

.notebook-notice {
  background-color: rgba(33, 150, 243, 0.05) !important;
  border: 1px dashed #2b4c6f !important;
  border-radius: 4px;
}

.link-amber {
  color: #ffb74d;
  font-weight: 600;
  text-decoration: none;
}

.link-amber:hover {
  text-decoration: underline;
}

@media (min-width: 960px) {
  .border-left-dashed {
    border-left: 1px dashed #3d332a;
  }
}
</style>
