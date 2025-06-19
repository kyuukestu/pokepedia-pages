<script setup lang="ts">
const roles = [
  {
    icon: 'mdi-fire-truck',
    color: 'red',
    text: 'Rescuing Pokémon and humans from natural disasters like forest fires, floods, or avalanches.',
  },
  {
    icon: 'mdi-shield-check',
    color: 'blue',
    text: 'Preventing illegal poaching, habitat destruction, and environmental crimes.',
  },
  {
    icon: 'mdi-leaf',
    color: 'green',
    text: 'Restoring damaged ecosystems and rehabilitating injured Pokémon.',
  },
  {
    icon: 'mdi-account-group',
    color: 'purple',
    text: 'Mediating conflicts between wild Pokémon and human settlements.',
  },
  {
    icon: 'mdi-police-badge',
    color: 'orange',
    text: 'Assisting InterPol in tracking criminals who exploit Pokémon or disrupt natural order.',
  },
]
const branches = [
  {
    name: 'Wildlife Protection Branch',
    icon: 'mdi-paw',
    description:
      'Focuses on safeguarding wild Pokémon populations and their habitats from poachers and developers.',
  },
  {
    name: 'Disaster Response Unit',
    icon: 'mdi-ambulance',
    description:
      'Deploys to areas affected by natural or man-made disasters, using Pokémon to aid in rescue and recovery efforts.',
  },
  {
    name: 'Marine Conservation Division',
    icon: 'mdi-waves',
    description:
      'Protects aquatic ecosystems, such as coral reefs and oceans, and rescues Water-type Pokémon from pollution or illegal fishing.',
  },
  {
    name: 'Community Outreach Branch',
    icon: 'mdi-account-heart',
    description:
      'Educates communities on sustainable practices and fosters cooperation between humans and Pokémon.',
  },
]
const ranks = [
  {
    name: 'Trainee Ranger',
    icon: 'mdi-school',
    color: 'grey',
    description: 'New recruits learning to use Capture Stylers and basic Pokémon handling skills.',
  },
  {
    name: 'Ranger',
    icon: 'mdi-account',
    color: 'blue',
    description:
      'Field operatives who undertake standard missions, such as rescues or habitat patrols, with a partner Pokémon.',
  },
  {
    name: 'Senior Ranger',
    icon: 'mdi-account-star',
    color: 'green',
    description:
      'Experienced Rangers who lead small teams and handle complex missions, such as confronting poaching rings.',
  },
  {
    name: 'Area Ranger',
    icon: 'mdi-map',
    color: 'orange',
    description:
      'Regional supervisors responsible for overseeing operations within a specific area, like a forest or mountain range. Area Rangers are typically also responsible for leading ranger bases.',
  },
  {
    name: 'Ranger Leader',
    icon: 'mdi-account-supervisor',
    color: 'red',
    description:
      'Regional directors who manage all Ranger activities in a Pokémon region (e.g., Alola, Sinnoh).',
  },
  {
    name: 'Chief Ranger',
    icon: 'mdi-crown',
    color: 'amber darken-2',
    description:
      'The global head of the Pokémon Ranger organization, coordinating international efforts and reporting to the Ranger Union.',
  },
  {
    name: 'Top Ranger',
    icon: 'mdi-star',
    color: 'purple',
    description:
      'Effectively above the ranking system, these Elite operatives are empowered with the authority to decide the purview of their own missions and freely roam the involving themselves with missions of the high-stakes, often involving Legendary Pokémon or major disasters.',
  },
]
</script>
<template>
  <section class="hero-section">
    <v-container class="py-16">
      <div class="hero-content text-center">
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-icon size="80" class="mb-4">mdi-shield-nature</v-icon>
            <h1 class="display-2 font-weight-bold mb-4">Pokémon Rangers</h1>
            <p class="headline font-weight-light">Guardians of Nature and Protectors of Pokémon</p>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </section>

  <!-- Introduction Section -->
  <v-container class="my-12">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card elevation="8" class="pa-8">
          <h2 class="display-1 font-weight-bold text-center mb-6 green--text">
            <v-icon large color="green" class="mr-2">mdi-earth</v-icon>
            Introduction
          </h2>
          <p class="title font-weight-light text-justify">
            The <strong>Pokémon Rangers</strong> are a specialized organization in the Pokémon world
            dedicated to protecting nature, preserving ecosystems, and ensuring the harmonious
            coexistence of humans and Pokémon. Operating independently but often in collaboration
            with InterPol and regional authorities, Rangers focus on environmental conservation,
            disaster response, and rescuing Pokémon and people in distress. Their unique ability to
            form temporary bonds with wild Pokémon through the use of Capture Stylers makes them
            vital guardians of the natural world, from the forests of Johto to the deserts of Orre.
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Role Section -->
  <v-container class="my-12">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <h2 class="display-1 font-weight-bold text-center mb-8 primary--text">
          <v-icon large color="primary" class="mr-2">mdi-account-star</v-icon>
          Role of Pokémon Rangers
        </h2>
        <v-row>
          <v-col cols="12" md="6" lg="4" v-for="(role, index) in roles" :key="index">
            <v-card class="h-100 pa-4" elevation="4" hover>
              <div class="text-center mb-4">
                <v-icon :color="role.color" size="48">{{ role.icon }}</v-icon>
              </div>
              <p class="body-1 text-center">{{ role.text }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <div class="section-divider"></div>

  <!-- Branches Section -->
  <v-container class="my-12">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <h2 class="display-1 font-weight-bold text-center mb-8 teal--text">
          <v-icon large color="teal" class="mr-2">mdi-sitemap</v-icon>
          Branches of Pokémon Rangers
        </h2>
        <v-row>
          <v-col cols="12" md="6" v-for="(branch, index) in branches" :key="index">
            <v-card class="pa-6 h-100" elevation="6" hover>
              <div class="d-flex align-center mb-4">
                <div class="branch-icon mr-4">
                  <v-icon size="32">{{ branch.icon }}</v-icon>
                </div>
                <h3 class="headline font-weight-bold">{{ branch.name }}</h3>
              </div>
              <p class="body-1">{{ branch.description }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <div class="section-divider"></div>

  <!-- Ranks Section -->
  <v-container class="my-12">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <h2 class="display-1 font-weight-bold text-center mb-8 orange--text">
          <v-icon large color="orange" class="mr-2">mdi-medal</v-icon>
          Ranger Ranks
        </h2>
        <v-row>
          <v-col cols="12" md="6" lg="4" v-for="(rank, index) in ranks" :key="index">
            <v-card class="rank-card pa-4 h-100" elevation="4">
              <div class="d-flex align-center mb-3">
                <v-chip :color="rank.color" dark class="mr-2">
                  <v-icon left small>{{ rank.icon }}</v-icon>
                  {{ index + 1 }}
                </v-chip>
                <h4 class="subtitle-1 font-weight-bold">{{ rank.name }}</h4>
              </div>
              <p class="caption">{{ rank.description }}</p>
            </v-card>
          </v-col>
        </v-row>
        <v-alert type="info" class="mt-6">
          <template v-slot:prepend>
            <v-icon>mdi-information</v-icon>
          </template>
          Rangers may earn <strong>Specialist</strong> titles (e.g., Marine Specialist, Legendary
          Pokémon Specialist) based on expertise.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>

  <div class="section-divider"></div>

  <!-- Footer -->
  <v-footer class="green darken-2 white--text text-center pa-6">
    <div>
      <v-icon color="white" class="mr-2">mdi-shield-nature</v-icon>
      <strong>Pokémon Rangers Organization</strong> - Protecting Nature, One Mission at a Time
    </div>
  </v-footer>
</template>
<style scoped>
.hero-section {
  background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="tree" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23tree)"/></svg>');
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.rank-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.rank-card:hover {
  transform: translateY(-4px);
}

.wanted-card {
  border-left: 4px solid #f44336;
  transition: transform 0.3s ease;
}

.wanted-card:hover {
  transform: translateY(-2px);
}

.branch-icon {
  background: linear-gradient(45deg, #2196f3, #21cbf3);
  color: white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.danger-badge {
  background: linear-gradient(45deg, #f44336, #ff1744) !important;
}

.bounty-chip {
  background: linear-gradient(45deg, #4caf50, #8bc34a) !important;
  color: white !important;
  font-weight: bold;
}

.pokemon-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff9800, #ffc107);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.section-divider {
  background: linear-gradient(90deg, transparent, #4caf50, transparent);
  height: 2px;
  margin: 32px 0;
}
</style>
