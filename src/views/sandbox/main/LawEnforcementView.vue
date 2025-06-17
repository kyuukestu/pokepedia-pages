<script setup lang="ts">
import { ref } from 'vue'

const interpolRoles = ref([
  'Coordinates with local authorities to uphold justice.',
  'Investigates crimes involving Pokémon and villainous teams.',
  'Protects humans and Pokémon from global threats.',
])

const interpolBranches = ref([
  {
    name: 'General Investigations',
    description: 'Handles everyday crimes and routine law enforcement matters.',
  },
  {
    name: 'Organized Crime Task Force',
    description: 'Targets villainous teams like Team Rocket and other criminal organizations.',
  },
  {
    name: 'Ultra Space Division',
    description:
      'Deals with Ultra Beasts and inter-dimensional phenomena that threaten global security.',
  },
  {
    name: 'Pokémon Welfare Unit',
    description:
      'Rescues abused or trafficked Pokémon and ensures their proper care and rehabilitation.',
  },
  {
    name: 'Cybercrime Division',
    description: 'Combats digital Pokémon-related crimes and cyber threats in the modern world.',
  },
])

const rangerRoles = ref([
  'Protects ecosystems and wild Pokémon from threats.',
  'Rescues Pokémon and people during natural disasters.',
  'Combats poaching, habitat destruction, and environmental crimes.',
  'Collaborates with InterPol to address major threats.',
])

const rangerBranches = ref([
  {
    name: 'Wildlife Protection',
    description: 'Safeguards Pokémon and their natural habitats from various threats.',
  },
  {
    name: 'Disaster Response',
    description: 'Aids in natural or man-made disaster recovery and emergency response.',
  },
  {
    name: 'Marine Conservation',
    description: 'Protects aquatic ecosystems and water-dwelling Pokémon species.',
  },
  {
    name: 'Legendary Pokémon Task Force',
    description: 'Monitors and protects Legendary Pokémon from exploitation or harm.',
  },
  {
    name: 'Community Outreach',
    description: 'Educates communities on sustainability and environmental conservation practices.',
  },
])
</script>

<template>
  <v-container fluid class="py-8">
    <!-- Main Title -->
    <v-row class="mb-8">
      <v-col cols="12">
        <v-card class="pa-6" elevation="2" color="primary" dark>
          <h1 class="text-h3 font-weight-bold text-center">Law Enforcement</h1>
        </v-card>
      </v-col>
    </v-row>

    <!-- InterPol Section -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card elevation="3" class="pa-6">
          <v-card-title class="text-h4 text-primary mb-4 d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <v-icon left size="large" color="primary">mdi-shield-account</v-icon>
              InterPol
            </div>
            <v-btn
              color="primary"
              variant="outlined"
              prepend-icon="mdi-arrow-right"
              to="/sandbox/content/lawenforcement.interpolview"
            >
              Learn More
            </v-btn>
          </v-card-title>

          <v-card-text>
            <p class="text-body-1 mb-6">
              InterPol, the International Police in the Pokémon world, is a global law enforcement
              agency dedicated to maintaining peace and combating crime across all regions. It
              tackles threats like organized crime, Pokémon trafficking, and inter-dimensional
              anomalies.
            </p>

            <!-- Key Roles -->
            <v-card class="mb-6" outlined>
              <v-card-title class="text-h5 bg-grey-lighten-4">
                <v-icon left color="success">mdi-target-account</v-icon>
                Key Roles
              </v-card-title>
              <v-card-text>
                <v-list density="comfortable">
                  <v-list-item
                    v-for="(role, index) in interpolRoles"
                    :key="index"
                    :prepend-icon="'mdi-numeric-' + (index + 1) + '-circle'"
                  >
                    <v-list-item-title>{{ role }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>

            <!-- Major Branches -->
            <v-card outlined>
              <v-card-title class="text-h5 bg-grey-lighten-4">
                <v-icon left color="info">mdi-office-building</v-icon>
                Major Branches
              </v-card-title>
              <v-card-text>
                <v-expansion-panels variant="accordion" multiple>
                  <v-expansion-panel
                    v-for="(branch, index) in interpolBranches"
                    :key="index"
                    :title="branch.name"
                  >
                    <v-expansion-panel-text>
                      {{ branch.description }}
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Pokemon Rangers Section -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card elevation="3" class="pa-6">
          <v-card-title class="text-h4 text-success mb-4 d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <v-icon left size="large" color="success">mdi-forest</v-icon>
              Pokemon Rangers
            </div>
            <v-btn
              color="success"
              variant="outlined"
              prepend-icon="mdi-arrow-right"
              to="/sandbox/content/lawenforcement.rangersview"
            >
              Learn More
            </v-btn>
          </v-card-title>

          <v-card-text>
            <p class="text-body-1 mb-6">
              The Pokémon Rangers are a global organization dedicated to protecting nature,
              preserving Pokémon habitats, and ensuring harmony between humans and Pokémon. Using
              Capture Stylers to form temporary bonds with wild Pokémon, Rangers focus on
              environmental conservation, disaster response, and combating ecological crimes.
            </p>

            <!-- Key Roles -->
            <v-card class="mb-6" outlined>
              <v-card-title class="text-h5 bg-green-lighten-5">
                <v-icon left color="success">mdi-target-account</v-icon>
                Key Roles
              </v-card-title>
              <v-card-text>
                <v-list density="comfortable">
                  <v-list-item
                    v-for="(role, index) in rangerRoles"
                    :key="index"
                    :prepend-icon="'mdi-numeric-' + (index + 1) + '-circle'"
                  >
                    <v-list-item-title>{{ role }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>

            <!-- Major Branches -->
            <v-card outlined>
              <v-card-title class="text-h5 bg-green-lighten-5">
                <v-icon left color="success">mdi-office-building</v-icon>
                Major Branches
              </v-card-title>
              <v-card-text>
                <v-expansion-panels variant="accordion" multiple>
                  <v-expansion-panel
                    v-for="(branch, index) in rangerBranches"
                    :key="index"
                    :title="branch.name"
                  >
                    <v-expansion-panel-text>
                      {{ branch.description }}
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- League Officials Section -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card elevation="3" class="pa-6">
          <v-card-title class="text-h4 text-warning mb-4 d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <v-icon left size="large" color="warning">mdi-trophy</v-icon>
              League Officials
            </div>
            <v-btn
              color="warning"
              variant="outlined"
              prepend-icon="mdi-arrow-right"
              to="/sandbox/content/lawenforcement.leagueofficialsview"
            >
              Learn More
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 bg-yellow-lighten-4">
                <v-icon left color="warning">mdi-dumbbell</v-icon>
                Gym Leaders
              </v-card-title>
              <v-card-text>
                <p class="text-body-1">
                  Gym Leaders occupy a unique position as often the strongest trainers in their
                  respective cities. Although they are not given explicit roles, it is understood
                  that Gym Leaders and their authorized Gym Trainers assist law enforcement whenever
                  needed.
                </p>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Ace Trainers Section -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card elevation="3" class="pa-6">
          <v-card-title class="text-h4 text-purple mb-4 d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <v-icon left size="large" color="purple">mdi-star</v-icon>
              Ace Trainers
            </div>
            <v-btn
              color="purple"
              variant="outlined"
              prepend-icon="mdi-arrow-right"
              to="/sandbox/content/lawenforcement.acetrainersview"
            >
              Learn More
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-alert type="info" variant="tonal" icon="mdi-information" class="mb-4">
              <strong>Experimental Program</strong> - Overseen by the Pokemon League
            </v-alert>

            <p class="text-body-1">
              An experimental program overseen by the Pokemon League. Ace Trainers are those who've
              been deputized to perform law enforcement duties. They provide additional manpower and
              are empowered to intervene wherever they deem necessary. Ace Trainers must pass
              several additional tests and certifications to ensure they can safely carry out law
              enforcement activities without jeopardizing civilians.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Most Wanted Section -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card elevation="3" class="pa-6">
          <v-card-title class="text-h4 text-red mb-4 d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <v-icon left size="large" color="red">mdi-star</v-icon>
              Most Wanted
            </div>
            <v-btn
              color="red"
              variant="outlined"
              prepend-icon="mdi-arrow-right"
              to="/sandbox/content/lawenforcement.mostwantedview"
            >
              Learn More
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-alert type="error" variant="tonal" icon="mdi-information" class="mb-4">
              <strong>Proceed with Caution</strong>
            </v-alert>

            <p class="text-body-1">
              A list of only the most heinous villains sought by the joint forces of law. Criminals
              on this list are bountied by the Pokemon League and any trainer who can bring them to
              justice will be richly rewarded; beware, criminals who make it onto this list are
              highly elusive and dangerous.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
