<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

const rules = [
  {
    title: 'All RPN Rules apply.',
    icon: 'mdi-check-circle',
    color: 'blue',
  },
  {
    title:
      'Fan-made Content is allowed: however, it must be submitted for review. Please PM me for more details.',
    icon: 'mdi-star-plus',
    color: 'purple',
  },
  {
    title:
      'While the RP as a whole does not limit Pokémon to Four moves, some Tournaments, Battles, and Other events may require a move-set that you must submit beforehand.',
    icon: 'mdi-sword-cross',
    color: 'cyan',
  },
  {
    title:
      "This is an expansive setting! Please make use of Headers within your posts! A header should contain, at minimum, the date and your character's location!",
    icon: 'mdi-format-header-1',
    color: 'green',
  },
  {
    title:
      'Some Legendary Pokémon are allowed; however, they must be earned. Please PM me for further details.',
    icon: 'mdi-crown',
    color: 'yellow',
  },
  {
    title:
      'OCs may not start out as Gym Leaders, Elite Four, Champions, etc. These positions are of immense influence and must be earned/obtained in RP.',
    icon: 'mdi-account-star',
    color: 'orange',
  },
  {
    title:
      'OCs are allowed to possess Aura, Psychic Powers, Occult and other supernatural abilities that are confirmed to exist in the Pokémon world.',
    icon: 'mdi-eye',
    color: 'indigo',
  },
  {
    title:
      'Battles may be resolved in any way you and your RP partner agree upon; however, if a decision cannot be made I will step in to arbitrate.',
    icon: 'mdi-handshake',
    color: 'red',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <!-- Hero Section -->
    <v-card
      class="mx-auto mb-8"
      :class="
        theme.current.value.dark
          ? 'bg-gradient-to-r from-purple-900 to-blue-900'
          : 'bg-gradient-to-r from-blue-100 to-purple-100'
      "
      elevation="8"
      rounded="lg"
    >
      <v-card-text class="text-center py-12">
        <v-icon
          size="72"
          :color="theme.current.value.dark ? 'yellow-accent-3' : 'red-darken-2'"
          class="mb-4"
        >
          mdi-pokeball
        </v-icon>
        <h1
          class="text-h3 font-weight-bold mb-2"
          :class="theme.current.value.dark ? 'text-yellow-accent-3' : 'text-blue-darken-3'"
        >
          Welcome to our Pokémon Role Play Wikia!
        </h1>
        <p class="text-h6 opacity-80">Your adventure in the Pokéverse awaits</p>
      </v-card-text>
    </v-card>

    <!-- Content Sections -->
    <v-container max-width="1200">
      <!-- Intro Section -->
      <v-card class="mb-8" elevation="4" rounded="lg">
        <v-card-title class="d-flex align-center pa-6">
          <v-icon
            :color="theme.current.value.dark ? 'cyan-accent-2' : 'blue-darken-2'"
            size="32"
            class="me-3"
          >
            mdi-information-outline
          </v-icon>
          <span class="text-h4 font-weight-bold">Introduction</span>
        </v-card-title>

        <v-divider
          :color="theme.current.value.dark ? 'grey-darken-1' : 'grey-lighten-2'"
        ></v-divider>

        <v-card-text class="pa-6">
          <div class="text-body-1 line-height-lg">
            <p class="mb-4">
              Here, we run an
              <v-chip color="primary" variant="flat" size="small" class="mx-1">Open-World</v-chip>,
              <v-chip color="secondary" variant="flat" size="small" class="mx-1"
                >Sandbox-style</v-chip
              >
              Pokémon RP where the entire Pokéverse is your Cloyster! What's that all mean? It means
              we draw inspiration from all forms of Poké-Media: Main Series Games, Side Games
              (Ranger, Conquest, etc.), Anime, Manga, etc.
            </p>

            <v-alert
              type="info"
              variant="tonal"
              class="mb-4"
              :color="theme.current.value.dark ? 'blue-lighten-1' : 'blue-darken-1'"
            >
              Since there are some contradictions between these, we consider the Main Series Games
              to be the canon timeline of our RP, while we use the Anime & Manga for reference.
            </v-alert>

            <p class="mb-4">
              As a Sandbox RP, there is no singular/main Plot that everyone must follow; however, we
              have many Events & Story Arcs that you can choose to be apart of!
            </p>

            <v-alert
              type="warning"
              variant="tonal"
              class="mb-4"
              :color="theme.current.value.dark ? 'orange-lighten-1' : 'orange-darken-1'"
            >
              <strong>Important:</strong> Whether you choose to join the fun or chart your own path,
              do remember that this is still a Group RP and we ask you to be mindful of how your
              actions affect others. That's to say, don't try to kill off important NPCs or make a
              mess of this because: "It's a Sandbox and I should be able to do whatever I want."
            </v-alert>

            <p class="mb-4">
              If you'd like to do something big and with rippling consequences, we will need to
              discuss it beforehand as world-building is a group effort.
            </p>

            <v-alert
              type="error"
              variant="tonal"
              class="mb-0"
              :color="theme.current.value.dark ? 'red-lighten-1' : 'red-darken-1'"
            >
              A poor attitude and a disregard for your fellow RPers WILL see you swiftly removed.
            </v-alert>
          </div>
        </v-card-text>
      </v-card>

      <!-- Setting Section -->
      <v-card class="mb-8" elevation="4" rounded="lg">
        <v-card-title class="d-flex align-center pa-6">
          <v-icon
            :color="theme.current.value.dark ? 'green-accent-2' : 'green-darken-2'"
            size="32"
            class="me-3"
          >
            mdi-earth
          </v-icon>
          <span class="text-h4 font-weight-bold">Setting</span>
        </v-card-title>

        <v-divider
          :color="theme.current.value.dark ? 'grey-darken-1' : 'grey-lighten-2'"
        ></v-divider>

        <v-card-text class="pa-6">
          <v-alert
            type="success"
            variant="tonal"
            class="mb-4"
            :color="theme.current.value.dark ? 'green-lighten-1' : 'green-darken-1'"
          >
            <strong>Timeline:</strong> This RP takes place eight (8) years after the events of Sword
            & Shield and RPers are free to have their OCs pursue whatever their hearts desire.
          </v-alert>

          <div class="text-body-1 line-height-lg mb-6">
            <p class="mb-4">
              Traditional Gym Battles? We've got you covered: we've even got Special Formats for
              trainers looking for a challenge! Want to dress up and show off your Pokémon in
              Contest or Showcases? We love to see it! More interested in the life of a PokéRanger?
              You're in luck! Work your way from Ranger (or even Trainee) all the way up to Top
              Ranger!
            </p>

            <p
              class="mb-4 text-center font-weight-bold text-h6"
              :class="theme.current.value.dark ? 'text-yellow-accent-2' : 'text-purple-darken-2'"
            >
              The World is your oyster! Get creative! Have fun!
            </p>

            <p class="mb-0">
              Haven't the slightest idea where to start? We've got Events and Story Arcs you can hop
              right into!
            </p>
          </div>

          <!-- Activity Options -->
          <v-row>
            <v-col cols="12" md="4">
              <v-card variant="outlined" class="h-100">
                <v-card-text class="text-center">
                  <v-icon
                    size="48"
                    :color="theme.current.value.dark ? 'red-accent-2' : 'red-darken-2'"
                    class="mb-2"
                  >
                    mdi-trophy
                  </v-icon>
                  <h3 class="text-h6 mb-2">Gym Battles</h3>
                  <p class="text-body-2 mb-0">Challenge gyms with special formats</p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card variant="outlined" class="h-100">
                <v-card-text class="text-center">
                  <v-icon
                    size="48"
                    :color="theme.current.value.dark ? 'pink-accent-2' : 'pink-darken-2'"
                    class="mb-2"
                  >
                    mdi-star-circle
                  </v-icon>
                  <h3 class="text-h6 mb-2">Contests & Showcases</h3>
                  <p class="text-body-2 mb-0">Show off your Pokémon's beauty</p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card variant="outlined" class="h-100">
                <v-card-text class="text-center">
                  <v-icon
                    size="48"
                    :color="theme.current.value.dark ? 'green-accent-2' : 'green-darken-2'"
                    class="mb-2"
                  >
                    mdi-shield-account
                  </v-icon>
                  <h3 class="text-h6 mb-2">PokéRanger</h3>
                  <p class="text-body-2 mb-0">Rise from Trainee to Top Ranger</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Rules Section -->
      <v-card class="mb-8" elevation="4" rounded="lg">
        <v-card-title class="d-flex align-center pa-6">
          <v-icon
            :color="theme.current.value.dark ? 'red-accent-2' : 'red-darken-2'"
            size="32"
            class="me-3"
          >
            mdi-gavel
          </v-icon>
          <span class="text-h4 font-weight-bold">Rules</span>
        </v-card-title>

        <v-divider
          :color="theme.current.value.dark ? 'grey-darken-1' : 'grey-lighten-2'"
        ></v-divider>

        <v-card-text class="pa-6">
          <v-list
            :bg-color="theme.current.value.dark ? 'grey-darken-4' : 'grey-lighten-5'"
            rounded="lg"
            class="pa-0"
          >
            <template v-for="(rule, index) in rules" :key="index">
              <v-list-item class="px-4 py-3">
                <template v-slot:prepend>
                  <v-icon
                    :color="
                      theme.current.value.dark ? `${rule.color}-accent-2` : `${rule.color}-darken-2`
                    "
                  >
                    {{ rule.icon }}
                  </v-icon>
                </template>
                <span class="font-weight-medium">{{ rule.title }}</span>
              </v-list-item>

              <v-divider v-if="index < rules.length - 1"></v-divider>
            </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-container>
  </v-container>
</template>

<style scoped>
.line-height-lg {
  line-height: 1.8;
}

.bg-gradient-to-r {
  background: linear-gradient(
    to right,
    var(--v-theme-surface-variant),
    var(--v-theme-primary-darken-1)
  );
}

/* Dark mode gradient override */
.theme--dark .bg-gradient-to-r.from-purple-900.to-blue-900 {
  background: linear-gradient(to right, #4a148c, #1a237e);
}

/* Light mode gradient override */
.theme--light .bg-gradient-to-r.from-blue-100.to-purple-100 {
  background: linear-gradient(to right, #e3f2fd, #f3e5f5);
}
</style>
