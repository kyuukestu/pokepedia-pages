<template>
  <v-app>
    <v-main>
      <!-- Hero Header with Background -->
      <v-sheet
        class="hero-section"
        :style="{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
        }"
      >
        <v-container>
          <v-row align="center" class="py-16">
            <v-col cols="12" md="8">
              <v-fade-transition appear>
                <div>
                  <v-chip
                    color="white"
                    variant="outlined"
                    class="mb-4"
                    prepend-icon="mdi-shield-star"
                  >
                    Official Documentation
                  </v-chip>
                  <h1 class="text-h2 font-weight-bold text-white mb-4">
                    Pokémon Supervisory Boards
                  </h1>
                  <p class="text-h6 text-white text-medium-emphasis mb-6">
                    The authoritative guide to Pokémon world governance and regulatory oversight
                  </p>
                  <v-btn
                    color="white"
                    variant="outlined"
                    size="large"
                    @click="scrollToSection('overview')"
                    append-icon="mdi-arrow-down"
                  >
                    Explore Boards
                  </v-btn>
                </div>
              </v-fade-transition>
            </v-col>
            <v-col cols="12" md="4" class="text-center">
              <v-avatar size="200" class="elevation-8">
                <v-icon size="120" color="white">mdi-account-group</v-icon>
              </v-avatar>
            </v-col>
          </v-row>
        </v-container>

        <!-- Decorative overlay -->
        <div class="hero-overlay"></div>
      </v-sheet>

      <v-container class="mt-8">
        <!-- Quick Stats Cards -->
        <v-row class="mb-8">
          <v-col v-for="(stat, index) in quickStats" :key="index" cols="12" sm="6" md="3">
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                :elevation="isHovering ? 8 : 2"
                class="text-center pa-4 stat-card"
                :class="{ 'on-hover': isHovering }"
              >
                <v-icon :color="stat.color" size="48" class="mb-2">
                  {{ stat.icon }}
                </v-icon>
                <div class="text-h4 font-weight-bold" :class="`text-${stat.color}`">
                  {{ stat.value }}
                </div>
                <div class="text-subtitle-1 text-medium-emphasis">
                  {{ stat.label }}
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>

        <!-- Overview Section -->
        <section id="overview" class="mb-12">
          <v-card class="overview-card" elevation="4">
            <v-card-text class="pa-8">
              <v-row>
                <v-col cols="12" md="8">
                  <h2 class="text-h3 font-weight-bold mb-6 text-primary">
                    <v-icon class="mr-2" color="primary">mdi-information</v-icon>
                    Overview
                  </h2>
                  <p class="text-h6 mb-4 text-medium-emphasis">
                    The Pokémon Supervisory Boards represent the pinnacle of organizational
                    excellence in the Pokémon world.
                  </p>
                  <p class="text-body-1 mb-4">
                    These five distinguished organizations work in harmony to oversee every aspect
                    of Pokémon-related activities, from the fierce battles of the World Coronation
                    Series to the graceful artistry of Pokémon Contests. Each board brings
                    specialized expertise and unwavering dedication to maintaining the highest
                    standards of competition, safety, and fair play.
                  </p>
                  <p class="text-body-1">
                    Established through decades of evolution in Pokémon culture, these boards serve
                    millions of trainers, coordinators, athletes, and enthusiasts worldwide,
                    ensuring that every Pokémon-human partnership can flourish in a structured,
                    supportive environment.
                  </p>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card variant="tonal" color="primary" class="pa-4">
                    <v-card-title class="text-h6">
                      <v-icon class="mr-2">mdi-clock-outline</v-icon>
                      Established Timeline
                    </v-card-title>
                    <v-timeline density="compact" line-color="primary" class="mt-4">
                      <v-timeline-item
                        v-for="event in timeline"
                        :key="event.year"
                        dot-color="primary"
                        size="small"
                      >
                        <template v-slot:opposite>
                          <span class="text-caption font-weight-bold">{{ event.year }}</span>
                        </template>
                        <div class="text-caption">{{ event.event }}</div>
                      </v-timeline-item>
                    </v-timeline>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </section>

        <!-- Organizations Grid -->
        <section class="mb-12">
          <v-row>
            <v-col cols="12">
              <h2 class="text-h3 font-weight-bold mb-8 text-center">The Five Supervisory Boards</h2>
            </v-col>
          </v-row>

          <v-row>
            <v-col v-for="(org, index) in organizations" :key="org.id" cols="12" class="mb-8">
              <v-slide-y-transition appear :delay="index * 100">
                <v-card
                  :id="org.id"
                  class="organization-card elevation-6"
                  :style="{
                    background: `linear-gradient(135deg, ${org.gradientStart} 0%, ${org.gradientEnd} 100%)`,
                  }"
                >
                  <!-- Header Section -->
                  <v-card-title class="pa-6 pb-0">
                    <v-row align="center">
                      <v-col cols="auto">
                        <v-avatar :color="org.color" size="80" class="elevation-4">
                          <v-icon size="40" color="white">{{ org.icon }}</v-icon>
                        </v-avatar>
                      </v-col>
                      <v-col>
                        <h3 class="text-h3 font-weight-bold text-white mb-2">
                          {{ org.name }}
                        </h3>
                        <p class="text-h6 text-white text-medium-emphasis">
                          {{ org.shortDescription }}
                        </p>
                      </v-col>
                      <v-col cols="auto">
                        <v-btn
                          :color="org.color"
                          variant="elevated"
                          @click="toggleOrgExpansion(org.id)"
                          :append-icon="
                            expandedOrgs.includes(org.id) ? 'mdi-chevron-up' : 'mdi-chevron-down'
                          "
                        >
                          {{ expandedOrgs.includes(org.id) ? 'Less Info' : 'More Info' }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-title>

                  <v-card-text class="pa-6">
                    <v-row>
                      <!-- Main Content -->
                      <v-col cols="12" lg="8">
                        <v-card variant="elevated" class="mb-4 content-card">
                          <v-card-text class="pa-6">
                            <p class="text-body-1 mb-4">{{ org.description }}</p>

                            <v-expand-transition>
                              <div v-if="expandedOrgs.includes(org.id)">
                                <v-divider class="my-4"></v-divider>

                                <h4 class="text-h6 font-weight-bold mb-3">
                                  <v-icon class="mr-2" color="primary">mdi-clipboard-list</v-icon>
                                  Key Responsibilities
                                </h4>
                                <v-row>
                                  <v-col
                                    v-for="(responsibility, idx) in org.responsibilities"
                                    :key="idx"
                                    cols="12"
                                    md="6"
                                  >
                                    <v-chip
                                      variant="outlined"
                                      :color="org.color"
                                      class="mb-2 mr-2"
                                      size="small"
                                    >
                                      <v-icon start size="small">mdi-check-circle</v-icon>
                                      {{ responsibility }}
                                    </v-chip>
                                  </v-col>
                                </v-row>

                                <div class="mt-6" v-if="org.keyFunctions">
                                  <h4 class="text-h6 font-weight-bold mb-3">
                                    <v-icon class="mr-2" color="primary">mdi-cog</v-icon>
                                    Operations
                                  </h4>
                                  <v-alert :color="org.color" variant="tonal" class="mb-4">
                                    {{ org.keyFunctions }}
                                  </v-alert>
                                </div>

                                <div v-if="org.notableEvents" class="mt-6">
                                  <h4 class="text-h6 font-weight-bold mb-3">
                                    <v-icon class="mr-2" color="primary">mdi-star</v-icon>
                                    Major Events
                                  </h4>
                                  <v-row>
                                    <v-col
                                      v-for="event in org.notableEvents"
                                      :key="event"
                                      cols="12"
                                      sm="6"
                                    >
                                      <v-card
                                        variant="outlined"
                                        :color="org.color"
                                        class="event-card pa-3"
                                      >
                                        <div class="d-flex align-center">
                                          <v-icon :color="org.color" class="mr-2"
                                            >mdi-trophy</v-icon
                                          >
                                          <span class="font-weight-medium">{{ event }}</span>
                                        </div>
                                      </v-card>
                                    </v-col>
                                  </v-row>
                                </div>
                              </div>
                            </v-expand-transition>
                          </v-card-text>
                        </v-card>
                      </v-col>

                      <!-- Info Panel -->
                      <v-col cols="12" lg="4">
                        <v-card variant="outlined" class="info-panel">
                          <v-card-title
                            class="text-h6 pa-4"
                            :style="{ backgroundColor: org.color, color: 'white' }"
                          >
                            <v-icon class="mr-2" color="white">mdi-information</v-icon>
                            Organization Details
                          </v-card-title>
                          <v-card-text class="pa-0">
                            <v-list>
                              <v-list-item>
                                <v-list-item-title class="font-weight-bold">
                                  <v-icon class="mr-2" :color="org.color">mdi-calendar</v-icon>
                                  Founded
                                </v-list-item-title>
                                <v-list-item-subtitle class="text-h6">{{
                                  org.founded
                                }}</v-list-item-subtitle>
                              </v-list-item>
                              <v-divider></v-divider>
                              <v-list-item>
                                <v-list-item-title class="font-weight-bold">
                                  <v-icon class="mr-2" :color="org.color">mdi-map-marker</v-icon>
                                  Headquarters
                                </v-list-item-title>
                                <v-list-item-subtitle class="text-h6">{{
                                  org.headquarters
                                }}</v-list-item-subtitle>
                              </v-list-item>
                              <v-divider></v-divider>
                              <v-list-item>
                                <v-list-item-title class="font-weight-bold">
                                  <v-icon class="mr-2" :color="org.color">mdi-earth</v-icon>
                                  Jurisdiction
                                </v-list-item-title>
                                <v-list-item-subtitle class="text-h6">{{
                                  org.jurisdiction
                                }}</v-list-item-subtitle>
                              </v-list-item>
                              <v-divider></v-divider>
                              <v-list-item>
                                <v-list-item-title class="font-weight-bold">
                                  <v-icon class="mr-2" :color="org.color">mdi-account-tie</v-icon>
                                  Current President
                                </v-list-item-title>
                                <v-list-item-subtitle class="text-h6">{{
                                  org.president
                                }}</v-list-item-subtitle>
                              </v-list-item>
                            </v-list>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-slide-y-transition>
            </v-col>
          </v-row>
        </section>

        <!-- Navigation Tabs -->
        <v-card class="navigation-card mb-8" elevation="4">
          <v-tabs
            v-model="activeTab"
            :color="organizations[activeTab]?.color || 'primary'"
            grow
            show-arrows
          >
            <v-tab
              v-for="(org, index) in organizations"
              :key="org.id"
              :value="index"
              @click="scrollToSection(org.id)"
            >
              <v-icon class="mr-2">{{ org.icon }}</v-icon>
              {{ org.name }}
            </v-tab>
          </v-tabs>
        </v-card>
      </v-container>

      <!-- Floating Action Button -->
      <v-btn
        icon
        color="primary"
        class="floating-btn"
        elevation="8"
        size="large"
        @click="scrollToTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Organization {
  id: string
  name: string
  description: string
  shortDescription: string
  responsibilities: string[]
  keyFunctions?: string
  notableEvents?: string[]
  founded: string
  headquarters: string
  jurisdiction: string
  president: string
  color: string
  icon: string
  gradientStart: string
  gradientEnd: string
}

const activeTab = ref(0)
const expandedOrgs = ref<string[]>([])

const quickStats = ref([
  { icon: 'mdi-account-group', value: '5', label: 'Supervisory Boards', color: 'primary' },
  { icon: 'mdi-earth', value: '∞', label: 'Global Regions', color: 'success' },
  { icon: 'mdi-calendar', value: '70+', label: 'Years of Service', color: 'warning' },
  { icon: 'mdi-trophy', value: '1000+', label: 'Annual Events', color: 'error' },
])

const timeline = ref([
  { year: '1952', event: 'Pokémon Association founded' },
  { year: '1963', event: 'Activities Committee established' },
  { year: '1971', event: 'Athletics Board created' },
  { year: '1987', event: 'Inspection Authority formed' },
  { year: '1998', event: 'Aviation Authority launched' },
])

const organizations = ref<Organization[]>([
  {
    id: 'pokemon-association',
    name: 'Pokémon Association',
    description:
      'The Pokémon Association serves as the premier regulatory body for all official Pokémon League competitions and championship events. As the cornerstone of competitive Pokémon battling, the Association maintains the highest standards of competitive integrity while fostering growth and development of trainers worldwide through comprehensive programs and rigorous oversight.',
    shortDescription: 'League Oversight & Championship Management',
    responsibilities: [
      'Pokémon League Operations',
      'Elite Four Oversight',
      'World Coronation Series',
      'Gym Leader Certification',
      'Competition Rule Development',
      'Inter-Regional Coordination',
    ],
    keyFunctions:
      "The Association works closely with regional Pokémon Leagues to ensure standardized competition formats while respecting local traditions. They maintain the official rankings system and coordinate the prestigious World Championships that bring together the planet's most skilled trainers.",
    notableEvents: [
      'World Championships',
      'World Coronation Series',
      'Elite Four Tournaments',
      'Regional League Championships',
    ],
    founded: '1952',
    headquarters: 'Wyndon, Galar',
    jurisdiction: 'Global',
    president: 'Rose Hartwell',
    color: 'red-darken-2',
    icon: 'mdi-trophy',
    gradientStart: '#ff5722',
    gradientEnd: '#d32f2f',
  },
  {
    id: 'pokemon-activities-committee',
    name: 'Pokémon Activities Committee',
    description:
      'The Pokémon Activities Committee celebrates the artistic soul of Pokémon culture, overseeing contests, showcases, and creative competitions that highlight the beauty and talent achievable through human-Pokémon partnerships. This organization champions artistic expression and creative collaboration in all its magnificent forms.',
    shortDescription: 'Contests, Showcases & Artistic Excellence',
    responsibilities: [
      'Pokémon Contest Regulation',
      'Showcase Management',
      'Judge Certification',
      'Performance Criteria',
      'Grand Festival Organization',
      'Artistic Collaboration Promotion',
    ],
    keyFunctions:
      'The Committee establishes judging criteria for performance competitions, ensuring fair evaluation of both beauty and talent. They oversee the ribbon and key system that allows coordinators to advance through increasingly prestigious competitions.',
    notableEvents: [
      'Grand Festival',
      'Tripokalon Master Class',
      'Contest Spectaculars',
      'Pokémon Musical Competitions',
    ],
    founded: '1963',
    headquarters: 'Lilycove City, Hoenn',
    jurisdiction: 'Global',
    president: 'Marina Delacroix',
    color: 'pink-darken-2',
    icon: 'mdi-star-circle',
    gradientStart: '#e91e63',
    gradientEnd: '#ad1457',
  },
  {
    id: 'pokemon-athletics-board',
    name: 'Pokémon Athletics Board',
    description:
      'The Pokémon Athletics Board champions physical excellence and athletic achievement, governing sports competitions that emphasize speed, strength, and endurance. From the renowned Pokéathlon to regional sporting events, this board ensures fair competition while promoting the health and fitness of all participants.',
    shortDescription: 'Sports, Athletics & Physical Excellence',
    responsibilities: [
      'Pokéathlon Administration',
      'Racing Event Oversight',
      'Athletic Competition Regulation',
      'Trainer Certification',
      'Safety Protocol Development',
      'Championship Management',
    ],
    keyFunctions:
      'The Board maintains comprehensive athletic records and promotes physical fitness for both Pokémon and trainers. They collaborate with Pokémon Centers to ensure proper health monitoring during all athletic competitions.',
    notableEvents: [
      'Pokéathlon Supreme Cup',
      'Regional Racing Championships',
      'Strength Competitions',
      'Endurance Trials',
    ],
    founded: '1971',
    headquarters: 'National Park, Johto',
    jurisdiction: 'Global',
    president: 'Magnus Strongarm',
    color: 'orange-darken-2',
    icon: 'mdi-run',
    gradientStart: '#ff9800',
    gradientEnd: '#f57c00',
  },
  {
    id: 'pokemon-aviation-authority',
    name: 'Pokémon Aviation Authority',
    description:
      "The Pokémon Aviation Authority soars above the rest, specializing in airborne activities from competitive sky battles to breathtaking aerial races. This dynamic organization has revolutionized aerial competitions and continues to push the boundaries of what's possible in the skies above.",
    shortDescription: 'Sky Battles, Aerial Racing & Aviation Excellence',
    responsibilities: [
      'Sky Battle Regulation',
      'Aerial Race Oversight',
      'PokéRinger Management',
      'Flight Instructor Certification',
      'Aviation Safety Standards',
      'Airspace Coordination',
    ],
    keyFunctions:
      'The Authority ensures safe airspace usage during competitions and maintains strict altitude regulations. They work with meteorological services to guarantee optimal weather conditions for all aerial events.',
    notableEvents: [
      'World Sky Battle Championships',
      'PokéRinger World Cup',
      'Aerial Acrobatics Competitions',
      'Cross-Regional Sky Races',
    ],
    founded: '1998',
    headquarters: 'Mistralton City, Unova',
    jurisdiction: 'Global',
    president: 'Captain Skyla Windwright',
    color: 'blue-darken-2',
    icon: 'mdi-airplane',
    gradientStart: '#2196f3',
    gradientEnd: '#1565c0',
  },
  {
    id: 'pokemon-inspection-authority',
    name: 'Pokémon Inspection Authority',
    description:
      'The Pokémon Inspection Authority stands as the guardian of integrity, providing crucial independent oversight to ensure the highest standards across all Pokémon League operations. Through rigorous evaluation and transparent processes, they maintain the trust and confidence of trainers worldwide.',
    shortDescription: 'Quality Assurance, Integrity & Professional Standards',
    responsibilities: [
      'Gym Leader Evaluation',
      'Facility Standards Assessment',
      'Certification Audits',
      'Irregularity Investigation',
      'Competency Standards',
      'Independent Oversight',
    ],
    keyFunctions:
      'The Authority conducts comprehensive inspections and assessments to ensure all League positions are filled by qualified individuals. They investigate complaints and maintain the integrity that makes the entire system trustworthy.',
    notableEvents: [
      'Annual Gym Leader Assessments',
      'League Facility Audits',
      'Competency Certification Exams',
      'Integrity Investigations',
    ],
    founded: '1987',
    headquarters: 'Ever Grande City, Hoenn',
    jurisdiction: 'Global',
    president: 'Director Adelaide Fairweather',
    color: 'teal-darken-2',
    icon: 'mdi-shield-check',
    gradientStart: '#009688',
    gradientEnd: '#00695c',
  },
])

const toggleOrgExpansion = (orgId: string) => {
  const index = expandedOrgs.value.indexOf(orgId)
  if (index > -1) {
    expandedOrgs.value.splice(index, 1)
  } else {
    expandedOrgs.value.push(orgId)
  }
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  // Initialize with first organization expanded
  expandedOrgs.value.push(organizations.value[0].id)
})
</script>

<style scoped>
.hero-section {
  position: relative;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="white" fill-opacity="0.1"/><circle cx="80" cy="40" r="1" fill="white" fill-opacity="0.1"/><circle cx="40" cy="80" r="1.5" fill="white" fill-opacity="0.1"/></svg>');
  pointer-events: none;
}

.stat-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-radius: 16px !important;
}

.stat-card.on-hover {
  transform: translateY(-8px);
}

.overview-card {
  border-radius: 24px !important;
}

.organization-card {
  border-radius: 24px !important;
  overflow: hidden;
  transition: all 0.3s ease;
  scroll-margin-top: 100px;
}

.organization-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
}

.content-card {
  border-radius: 16px !important;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95) !important;
}

.info-panel {
  border-radius: 16px !important;
}

.event-card {
  border-radius: 12px !important;
  transition: all 0.2s ease;
}

.event-card:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.coordination-section {
  border-radius: 24px !important;
  overflow: hidden;
}

.navigation-card {
  border-radius: 20px !important;
  position: sticky;
  top: 20px;
  z-index: 10;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95) !important;
}

.footer-section {
  border-radius: 24px !important;
}

.floating-btn {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 1000;
  transition: all 0.3s ease;
}

.floating-btn:hover {
  transform: scale(1.1);
}

/* Custom scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Enhanced animations */
.v-slide-y-transition-enter-active {
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.v-slide-y-transition-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.v-fade-transition-enter-active {
  transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.v-fade-transition-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .floating-btn {
    bottom: 20px;
    right: 20px;
  }

  .navigation-card {
    position: static;
  }

  .hero-section h1 {
    font-size: 2.5rem !important;
  }

  .organization-card {
    margin-bottom: 2rem;
  }
}

@media (max-width: 600px) {
  .hero-section h1 {
    font-size: 2rem !important;
  }

  .stat-card {
    margin-bottom: 1rem;
  }
}

/* Custom chip styles */
.v-chip {
  border-radius: 12px !important;
}

/* Enhanced card elevations */
.v-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Timeline customization */
.v-timeline {
  padding-left: 0;
}

.v-timeline-item {
  margin-bottom: 8px;
}

/* Parallax enhancement */
.v-parallax {
  border-radius: 0;
}

/* List item hover effects */
.v-list-item {
  border-radius: 8px !important;
  transition: all 0.2s ease;
}

/* Tab customization */
.v-tabs {
  border-radius: 20px 20px 0 0;
}

.v-tab {
  border-radius: 12px 12px 0 0;
  margin: 0 4px;
  transition: all 0.3s ease;
}

.v-tab:hover {
  background-color: rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}

/* Button enhancements */
.v-btn {
  border-radius: 12px !important;
  text-transform: none !important;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.v-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Avatar enhancements */
.v-avatar {
  transition: all 0.3s ease;
}

.organization-card .v-avatar:hover {
  transform: scale(1.05);
}

/* Alert customization */
.v-alert {
  border-radius: 16px !important;
}

/* Divider spacing */
.v-divider {
  margin: 16px 0;
}

/* Enhanced hover states */
.cursor-pointer {
  cursor: pointer;
  transition: all 0.2s ease;
}

.cursor-pointer:hover {
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 8px;
}

/* Loading states */
.v-skeleton-loader {
  border-radius: 16px !important;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Text selection */
::selection {
  background-color: rgba(25, 118, 210, 0.2);
  color: inherit;
}

/* Focus states */
.v-btn:focus,
.v-tab:focus,
.v-chip:focus {
  outline: 2px solid rgba(25, 118, 210, 0.5);
  outline-offset: 2px;
}

/* Print styles */
@media print {
  .floating-btn,
  .navigation-card {
    display: none !important;
  }

  .organization-card {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}

/* Dark theme adjustments */
.v-theme--dark .content-card {
  background: rgba(33, 33, 33, 0.95) !important;
}

.v-theme--dark .navigation-card {
  background: rgba(33, 33, 33, 0.95) !important;
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .v-card {
    border: 2px solid currentColor;
  }

  .v-btn {
    border: 2px solid currentColor;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .v-slide-y-transition-enter-active,
  .v-fade-transition-enter-active {
    transition: none !important;
  }
}
</style>
