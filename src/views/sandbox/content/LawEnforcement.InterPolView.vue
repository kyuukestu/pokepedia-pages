<script setup lang="ts">
import { ref } from 'vue'

const interpolRoles = ref([
  {
    title: 'Combating Organized Crime',
    description:
      'Targeting groups like Team Rocket, Team Galactic, and other villainous organizations that exploit Pokémon for profit or power.',
  },
  {
    title: 'Pokémon Protection',
    description:
      'Investigating illegal Pokémon trafficking, poaching, and abuse, ensuring the welfare of all species.',
  },
  {
    title: 'Global Threat Response',
    description:
      'Addressing catastrophic events, such as Legendary Pokémon disturbances or interdimensional anomalies.',
  },
  {
    title: 'Cross-Regional Coordination',
    description:
      'Facilitating intelligence sharing and joint operations between regions to apprehend fugitives and disrupt criminal networks.',
  },
])

const interpolBranches = ref([
  {
    name: 'General Investigations Division',
    description:
      'Handles standard criminal activities, including theft, fraud, and Pokémon-related offenses. This is the largest branch, active in every region.',
    icon: 'mdi-magnify',
  },
  {
    name: 'Organized Crime Task Force',
    description:
      'Focuses on dismantling villainous teams and their operations, from street-level grunts to high-ranking executives.',
    icon: 'mdi-account-group',
  },
  {
    name: 'Ultra Space Division',
    description:
      'A highly classified unit that investigates interdimensional phenomena, such as Ultra Wormholes, Ultra Beasts, and anomalies linked to Legendary Pokémon like Palkia or Giratina. Agents in this division are trained to operate in unstable environments and confront otherworldly threats.',
    icon: 'mdi-earth',
  },
  {
    name: 'Pokémon Welfare Unit',
    description:
      'Dedicated to rescuing abused or trafficked Pokémon, shutting down illegal breeding mills, and prosecuting those who harm Pokémon.',
    icon: 'mdi-heart',
  },
  {
    name: 'Cybercrime Division',
    description:
      'Tracks digital crimes, including hacked Pokédexes, illegal online Pokémon trades, and cyber-attacks on Pokémon Centers or Gyms.',
    icon: 'mdi-security',
  },
])

const interpolRanks = ref([
  {
    rank: 'Recruit',
    description:
      'Entry-level agents undergoing training in investigation, Pokémon battling, and InterPol protocols.',
    color: 'grey',
  },
  {
    rank: 'Officer',
    description:
      'Field agents responsible for routine patrols, investigations, and arrests. Officers are assigned a partner Pokémon to assist in operations.',
    color: 'blue',
  },
  {
    rank: 'Detective',
    description:
      'Specialized investigators who handle complex cases, such as organized crime or Pokémon trafficking. Detectives often work undercover.',
    color: 'green',
  },
  {
    rank: 'Sergeant',
    description:
      'Team leaders who oversee small units of Officers and Detectives, coordinating operations and reporting to higher ranks.',
    color: 'orange',
  },
  {
    rank: 'Lieutenant',
    description:
      'Senior agents managing regional operations or specialized divisions, such as the Ultra Space Division. Lieutenants are strategic planners and field commanders.',
    color: 'purple',
  },
  {
    rank: 'Captain',
    description:
      'High-ranking officers overseeing entire branches or major task forces, such as the Organized Crime Task Force.',
    color: 'red',
  },
  {
    rank: 'Commander',
    description:
      "Regional directors responsible for InterPol's operations in a specific Pokémon region (e.g., Kanto, Sinnoh).",
    color: 'indigo',
  },
  {
    rank: 'Chief Inspector',
    description:
      'Global leaders who report directly to the InterPol Director, managing cross-regional initiatives and high-profile cases.',
    color: 'deep-purple',
  },
  {
    rank: 'Director',
    description:
      'The head of InterPol, elected by an international council of regional leaders. The Director sets global policy and represents InterPol in diplomatic affairs.',
    color: 'amber',
  },
])
</script>

<template>
  <v-container fluid class="py-8">
    <!-- Header Section -->
    <v-row class="mb-8">
      <v-col cols="12">
        <v-card class="pa-8" elevation="4" color="primary" dark>
          <div class="d-flex align-center justify-center">
            <v-icon size="x-large" class="mr-4">mdi-shield-account</v-icon>
            <div class="text-center">
              <h1 class="text-h2 font-weight-bold mb-2">InterPol</h1>
              <p class="text-h6 font-weight-light">International Police Organization</p>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Introduction Section -->
    <v-row class="mb-8">
      <v-col cols="12">
        <v-card elevation="2" class="pa-6">
          <v-card-text>
            <p class="text-body-1 text-justify leading-relaxed">
              The International Police, commonly known as InterPol, is the premier global law
              enforcement agency in the Pokémon world, dedicated to maintaining peace, upholding
              justice, and combating crime across regions. Operating under a unified international
              charter, InterPol coordinates efforts to tackle threats that transcend regional
              boundaries, including Pokémon-related crimes, organized criminal syndicates, and
              existential dangers to the world's balance. With jurisdiction in every Pokémon
              region—from Kanto to Paldea—InterPol collaborates with local authorities, Pokémon
              Rangers, and Gym Leaders to ensure safety for humans and Pokémon alike.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Role of InterPol Section -->
    <v-row class="mb-8">
      <v-col cols="12">
        <v-card elevation="3" class="pa-6">
          <v-card-title class="text-h4 text-primary mb-6 d-flex align-center">
            <v-icon left size="large" color="primary">mdi-target-account</v-icon>
            Role of InterPol
          </v-card-title>

          <v-card-text>
            <p class="text-body-1 mb-6">
              InterPol's primary mission is to prevent and investigate crimes that threaten global
              stability. Its responsibilities include:
            </p>

            <v-row>
              <v-col v-for="(role, index) in interpolRoles" :key="index" cols="12" md="6">
                <v-card class="h-100" outlined hover :ripple="false">
                  <v-card-title class="text-h6 bg-primary text-white">
                    <v-icon left color="white">mdi-numeric-{{ index + 1 }}-circle</v-icon>
                    {{ role.title }}
                  </v-card-title>
                  <v-card-text class="pt-4">
                    {{ role.description }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-alert type="info" variant="tonal" class="mt-6" icon="mdi-information">
              InterPol agents are highly trained operatives, skilled in Pokémon battling,
              investigation, and diplomacy. They operate with autonomy but adhere to strict ethical
              codes to protect the rights of humans and Pokémon.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Branches Section -->
    <v-row class="mb-8">
      <v-col cols="12">
        <v-card elevation="3" class="pa-6">
          <v-card-title class="text-h4 text-success mb-6 d-flex align-center">
            <v-icon left size="large" color="success">mdi-office-building</v-icon>
            Branches of InterPol
          </v-card-title>

          <v-card-text>
            <p class="text-body-1 mb-6">
              InterPol is divided into specialized divisions to address diverse threats:
            </p>

            <v-expansion-panels variant="accordion" multiple>
              <v-expansion-panel
                v-for="(branch, index) in interpolBranches"
                :key="index"
                :title="branch.name"
                :value="index"
                :prepend-icon="branch.icon"
              >
                <template prepend>
                  <v-icon :color="index % 2 === 0 ? 'primary' : 'success'">{{}}</v-icon>
                </template>

                <v-expansion-panel-text class="pt-4">
                  <v-card outlined class="pa-4">
                    <p class="text-body-1 mb-0">{{ branch.description }}</p>
                  </v-card>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Ranks Section -->
    <v-row class="mb-8">
      <v-col cols="12">
        <v-card elevation="3" class="pa-6">
          <v-card-title class="text-h4 text-warning mb-6 d-flex align-center">
            <v-icon left size="large" color="warning">mdi-chevron-triple-up</v-icon>
            Ranks in InterPol
          </v-card-title>

          <v-card-text>
            <p class="text-body-1 mb-6">
              InterPol's rank structure is modeled after real-world police hierarchies, adapted to
              the Pokémon world's unique needs. Ranks reflect authority, experience, and
              specialization:
            </p>

            <v-row>
              <v-col v-for="(rank, index) in interpolRanks" :key="index" cols="12" sm="6" lg="4">
                <v-card
                  class="h-100"
                  :color="rank.color"
                  :variant="index === interpolRanks.length - 1 ? 'elevated' : 'outlined'"
                  :elevation="index === interpolRanks.length - 1 ? 8 : 2"
                >
                  <v-card-title
                    :class="index === interpolRanks.length - 1 ? 'text-white' : ''"
                    class="d-flex align-center"
                  >
                    <v-icon left :color="index === interpolRanks.length - 1 ? 'white' : rank.color">
                      mdi-star{{ index >= 6 ? '-circle' : '' }}
                    </v-icon>
                    {{ rank.rank }}
                  </v-card-title>
                  <v-card-text :class="index === interpolRanks.length - 1 ? 'text-white' : ''">
                    {{ rank.description }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-alert type="success" variant="tonal" class="mt-6" icon="mdi-school">
              <strong>Specialist Designations:</strong> Agents may also earn Specialist designations
              (e.g., Ultra Space Specialist, Cybercrime Specialist) based on their expertise,
              regardless of rank.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recruitment Section -->
    <v-row class="mb-8">
      <v-col cols="12">
        <v-card elevation="3" class="pa-6" color="info" dark>
          <v-card-title class="text-h4 mb-4 d-flex align-center justify-center">
            <v-icon left size="large">mdi-account-plus</v-icon>
            Recruitment
          </v-card-title>

          <v-card-text class="text-center">
            <p class="text-h6 font-weight-light">
              Officers of InterPol are required to pass a comprehensive recruitment test.
            </p>

            <v-btn
              size="large"
              color="white"
              variant="outlined"
              prepend-icon="mdi-file-document-outline"
              class="mt-4"
              to="/sandbox/content/lawenforcement.interpol.recruitmentview"
            >
              Learn About Requirements
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.leading-relaxed {
  line-height: 1.8;
}

.text-justify {
  text-align: justify;
}

.h-100 {
  height: 100%;
}
</style>
