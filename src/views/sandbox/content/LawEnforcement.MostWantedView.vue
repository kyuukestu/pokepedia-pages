<script setup lang="ts">
const wantedList = [
  {
    name: '"Hunter J"',
    crime:
      'Notorious Pokémon poacher, known for capturing and selling rare Pokémon using advanced technology.',
    lastSeen: 'Galar, near Motostoke',
    bounty: '₽9,000,000',
    notes:
      'Uses a Salamence and Drapion. Known for petrifying Pokémon for transport. Extremely dangerous.',
  },
]
</script>
<template>
  <!-- Wanted List Section -->
  <v-container class="my-12">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <h2 class="display-1 font-weight-bold text-center mb-8 red--text">
          <v-icon large color="red" class="mr-2">mdi-alert-octagon</v-icon>
          Ranger Watch List
        </h2>
        <v-alert type="warning" class="mb-6">
          <template v-slot:prepend>
            <v-icon>mdi-shield-alert</v-icon>
          </template>
          The following individuals are wanted for crimes against Pokémon and their habitats.
          Approach with extreme caution.
        </v-alert>

        <v-row>
          <v-col cols="12" md="6" v-for="(criminal, index) in wantedList" :key="index">
            <v-card class="wanted-card pa-6" elevation="8">
              <div class="d-flex justify-space-between align-start mb-4">
                <div>
                  <h3 class="headline font-weight-bold">{{ criminal.name }}</h3>
                  <v-chip class="danger-badge mt-2" dark>
                    <v-icon left small>mdi-alert</v-icon>
                    WANTED
                  </v-chip>
                </div>
                <v-chip class="bounty-chip" dark>
                  <v-icon left small>mdi-currency-usd</v-icon>
                  {{ criminal.bounty }}
                </v-chip>
              </div>

              <v-divider class="mb-4"></v-divider>

              <div class="mb-3">
                <h4 class="subtitle-1 font-weight-bold mb-2">
                  <v-icon small color="red" class="mr-1">mdi-gavel</v-icon>
                  Crime:
                </h4>
                <p class="body-2">{{ criminal.crime }}</p>
              </div>

              <div class="mb-3">
                <h4 class="subtitle-1 font-weight-bold mb-2">
                  <v-icon small color="blue" class="mr-1">mdi-map-marker</v-icon>
                  Last Seen:
                </h4>
                <p class="body-2">{{ criminal.lastSeen }}</p>
              </div>

              <div>
                <h4 class="subtitle-1 font-weight-bold mb-2">
                  <v-icon small color="orange" class="mr-1">mdi-notebook</v-icon>
                  Notes:
                </h4>
                <p class="body-2">{{ criminal.notes }}</p>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
