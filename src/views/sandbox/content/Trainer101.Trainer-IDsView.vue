<template>
  <v-container fluid class="py-8">
    <!-- Header Section -->
    <v-row justify="center" class="mb-8">
      <v-col cols="12" lg="8">
        <v-card class="overflow-hidden" elevation="12">
          <div class="header-gradient pa-8 text-center">
            <v-icon size="80" class="mb-4 header-icon text-white">mdi-card-account-details</v-icon>
            <h1 class="text-h3 font-weight-bold text-white mb-2">Trainer Identification</h1>
            <p class="text-h6 text-white opacity-90">
              Explore the different types of trainer credentials
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Trainer Card Section -->
    <v-row justify="center" class="mb-8">
      <v-col cols="12" lg="8">
        <v-card
          id="trainer-card"
          class="trainer-id-card overflow-hidden"
          elevation="8"
          color="primary"
          variant="outlined"
        >
          <v-card-title class="pa-6 bg-primary text-white d-flex align-center">
            <v-icon size="40" class="mr-4">mdi-card-account-details</v-icon>
            <div>
              <div class="text-h4 font-weight-bold">Trainer Card</div>
              <div class="text-subtitle-1 opacity-90">
                Traditional • Kanto, Johto, Hoenn & Sinnoh
              </div>
            </div>
          </v-card-title>

          <v-card-text class="pa-0">
            <v-row no-gutters>
              <v-col cols="12" md="8" class="pa-6">
                <div class="text-body-1 mb-4 text-justify">
                  The traditional trainer card, commonly held by Trainers who register in Kanto,
                  Johto, Hoenn & Sinnoh. It is a physical card with an embedded microchip that
                  allows electronic transactions and data transferral/communications.
                </div>

                <v-row class="mt-4">
                  <v-col cols="6" sm="3">
                    <v-card variant="tonal" color="primary" class="text-center pa-3">
                      <v-icon color="primary" class="mb-2">mdi-credit-card-chip</v-icon>
                      <div class="text-caption font-weight-medium">Microchip</div>
                    </v-card>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-card variant="tonal" color="primary" class="text-center pa-3">
                      <v-icon color="primary" class="mb-2">mdi-swap-horizontal</v-icon>
                      <div class="text-caption font-weight-medium">Data Transfer</div>
                    </v-card>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-card variant="tonal" color="primary" class="text-center pa-3">
                      <v-icon color="primary" class="mb-2">mdi-credit-card</v-icon>
                      <div class="text-caption font-weight-medium">Transactions</div>
                    </v-card>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-card variant="tonal" color="primary" class="text-center pa-3">
                      <v-icon color="primary" class="mb-2">mdi-cellphone</v-icon>
                      <div class="text-caption font-weight-medium">Communication</div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>

              <v-col
                cols="12"
                md="4"
                class="d-flex align-center justify-center pa-6 bg-grey-lighten-5"
              >
                <div class="text-center">
                  <v-card class="image-card mx-auto mb-3" elevation="4" max-width="200">
                    <v-img
                      src="https://www.serebii.net/omegarubyalphasapphire/trainercard1.jpg"
                      alt="Trainer Card"
                      cover
                      aspect-ratio="1.6"
                      class="rounded"
                    />
                  </v-card>
                  <v-chip color="primary" variant="tonal" size="small">
                    <v-icon start>mdi-eye</v-icon>
                    Sample Card
                  </v-chip>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Trainer Passport Section -->
    <v-row justify="center" class="mb-8">
      <v-col cols="12" lg="8">
        <v-card
          id="trainer-passport"
          class="trainer-id-card overflow-hidden"
          elevation="8"
          color="secondary"
          variant="outlined"
        >
          <v-card-title class="pa-6 bg-secondary text-white d-flex align-center">
            <v-icon size="40" class="mr-4">mdi-passport</v-icon>
            <div>
              <div class="text-h4 font-weight-bold">Trainer Passport</div>
              <div class="text-subtitle-1 opacity-90">High-Tech • Most Common in Alola</div>
            </div>
          </v-card-title>

          <v-card-text class="pa-0">
            <v-row no-gutters>
              <v-col cols="12" md="8" class="pa-6">
                <div class="text-body-1 mb-4 text-justify">
                  Most common to Alola, the Trainer Passport is a high-tech booklet with plenty of
                  extra pages for Trainers to collect Trial Stamps and comes with an electronic pen
                  allowing trainers to e-journal their journey.
                </div>

                <v-row class="mt-4">
                  <v-col cols="6" sm="4">
                    <v-card variant="tonal" color="secondary" class="text-center pa-3">
                      <v-icon color="secondary" class="mb-2">mdi-book-open-page-variant</v-icon>
                      <div class="text-caption font-weight-medium">Extra Pages</div>
                    </v-card>
                  </v-col>
                  <v-col cols="6" sm="4">
                    <v-card variant="tonal" color="secondary" class="text-center pa-3">
                      <v-icon color="secondary" class="mb-2">mdi-stamp</v-icon>
                      <div class="text-caption font-weight-medium">Trial Stamps</div>
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-card variant="tonal" color="secondary" class="text-center pa-3">
                      <v-icon color="secondary" class="mb-2">mdi-pen</v-icon>
                      <div class="text-caption font-weight-medium">E-Journal</div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>

              <v-col
                cols="12"
                md="4"
                class="d-flex align-center justify-center pa-6 bg-grey-lighten-5"
              >
                <div class="text-center">
                  <v-card class="image-card mx-auto mb-3" elevation="4" max-width="250">
                    <v-img
                      src="https://www.serebii.net/sunmoon/trainerpassport.jpg"
                      alt="Trainer Passport"
                      cover
                      aspect-ratio="1.3"
                      class="rounded"
                    />
                  </v-card>
                  <v-chip color="secondary" variant="tonal" size="small">
                    <v-icon start>mdi-island</v-icon>
                    Alola Style
                  </v-chip>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- League Card Section -->
    <v-row justify="center" class="mb-8">
      <v-col cols="12" lg="8">
        <v-card
          id="league-card"
          class="trainer-id-card overflow-hidden"
          elevation="8"
          color="success"
          variant="outlined"
        >
          <v-card-title class="pa-6 bg-success text-white d-flex align-center">
            <v-icon size="40" class="mr-4">mdi-cards</v-icon>
            <div>
              <div class="text-h4 font-weight-bold">League Card</div>
              <div class="text-subtitle-1 opacity-90">
                Trading Cards • Born of Galar's Sports Culture
              </div>
            </div>
          </v-card-title>

          <v-card-text class="pa-0">
            <v-row no-gutters>
              <v-col cols="12" md="8" class="pa-6">
                <div class="text-body-1 mb-4 text-justify">
                  Born of Galar's enthusiastic sports culture, the League Card allows holders to
                  display their stats and accomplishments in stylized and personalized trading cards
                  which they can share or trade between friends. The League Cards of popular
                  trainers are highly valued by collectors.
                </div>

                <v-row class="mt-4">
                  <v-col cols="6" sm="3">
                    <v-card variant="tonal" color="success" class="text-center pa-3">
                      <v-icon color="success" class="mb-2">mdi-chart-line</v-icon>
                      <div class="text-caption font-weight-medium">Stats Display</div>
                    </v-card>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-card variant="tonal" color="success" class="text-center pa-3">
                      <v-icon color="success" class="mb-2">mdi-trophy</v-icon>
                      <div class="text-caption font-weight-medium">Accomplishments</div>
                    </v-card>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-card variant="tonal" color="success" class="text-center pa-3">
                      <v-icon color="success" class="mb-2">mdi-swap-horizontal-circle</v-icon>
                      <div class="text-caption font-weight-medium">Tradeable</div>
                    </v-card>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-card variant="tonal" color="success" class="text-center pa-3">
                      <v-icon color="success" class="mb-2">mdi-star</v-icon>
                      <div class="text-caption font-weight-medium">Collectible</div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>

              <v-col
                cols="12"
                md="4"
                class="d-flex align-center justify-center pa-6 bg-grey-lighten-5"
              >
                <div class="text-center">
                  <v-card class="image-card mx-auto mb-3" elevation="4" max-width="300">
                    <v-img
                      src="https://www.serebii.net/swordshield/leaguecard.jpg"
                      alt="League Card"
                      cover
                      aspect-ratio="1.5"
                      class="rounded"
                    />
                  </v-card>
                  <v-chip color="success" variant="tonal" size="small">
                    <v-icon start>mdi-crown</v-icon>
                    Galar League
                  </v-chip>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Profile App Section -->
    <v-row justify="center" class="mb-8">
      <v-col cols="12" lg="8">
        <v-card
          id="profile-app"
          class="trainer-id-card overflow-hidden"
          elevation="8"
          color="info"
          variant="outlined"
        >
          <v-card-title class="pa-6 bg-info text-white d-flex align-center">
            <v-icon size="40" class="mr-4">mdi-passport-biometric</v-icon>
            <div>
              <div class="text-h4 font-weight-bold">Profile App</div>
              <div class="text-subtitle-1 opacity-90">Digital • Multi-Device Compatible</div>
            </div>
          </v-card-title>

          <v-card-text class="pa-0">
            <v-row no-gutters>
              <v-col cols="12" md="8" class="pa-6">
                <div class="text-body-1 mb-4 text-justify">
                  The most digital of the bunch, the Profile App is downloadable on any device and
                  allows trainers to view not just their personal accomplishments—Badges, Pokédex
                  Completion, and Tournament record amongst others—but it also syncs to the Pokémon
                  Storage System, allowing trainers to display their active Pokémon alongside their
                  profiles.
                </div>

                <v-row class="mt-4">
                  <v-col cols="6" sm="3">
                    <v-card variant="tonal" color="info" class="text-center pa-3">
                      <v-icon color="info" class="mb-2">mdi-devices</v-icon>
                      <div class="text-caption font-weight-medium">Multi-Device</div>
                    </v-card>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-card variant="tonal" color="info" class="text-center pa-3">
                      <v-icon color="info" class="mb-2">mdi-medal</v-icon>
                      <div class="text-caption font-weight-medium">Badges</div>
                    </v-card>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-card variant="tonal" color="info" class="text-center pa-3">
                      <v-icon color="info" class="mb-2">mdi-book-open</v-icon>
                      <div class="text-caption font-weight-medium">Pokédex</div>
                    </v-card>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-card variant="tonal" color="info" class="text-center pa-3">
                      <v-icon color="info" class="mb-2">mdi-sync</v-icon>
                      <div class="text-caption font-weight-medium">PC Sync</div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>

              <v-col
                cols="12"
                md="4"
                class="d-flex align-center justify-center pa-6 bg-grey-lighten-5"
              >
                <div class="text-center">
                  <v-card class="image-card mx-auto mb-3" elevation="4" max-width="280">
                    <v-img
                      src="https://img.game8.co/3621072/3bc3da68bd9b491bd429562f1b8937e4.png/show"
                      alt="Profile App"
                      cover
                      aspect-ratio="1.4"
                      class="rounded"
                    />
                  </v-card>
                  <v-chip color="info" variant="tonal" size="small">
                    <v-icon start>mdi-cellphone</v-icon>
                    Digital App
                  </v-chip>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Navigation Footer -->
    <v-row justify="center">
      <v-col cols="12" lg="8">
        <v-card class="pa-6 text-center" elevation="4" color="surface-variant">
          <div class="text-h6 mb-4">Choose Your Trainer ID Style</div>
          <div class="text-body-2 text-medium-emphasis mb-4">
            Each region offers unique identification methods tailored to their culture and
            technology
          </div>
          <v-chip-group class="justify-center">
            <v-chip color="primary" variant="elevated" size="large" href="#trainer-card">
              <v-icon start>mdi-card-account-details</v-icon>
              Traditional
            </v-chip>
            <v-chip color="secondary" variant="elevated" size="large" href="#trainer-passport">
              <v-icon start>mdi-passport</v-icon>
              Booklet
            </v-chip>
            <v-chip color="success" variant="elevated" size="large" href="#league-card">
              <v-icon start>mdi-cards</v-icon>
              Trading Card
            </v-chip>
            <v-chip color="info" variant="elevated" size="large" href="#profile-app">
              <v-icon start>mdi-passport-biometric</v-icon>
              Digital
            </v-chip>
          </v-chip-group>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.header-gradient {
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #64b5f6 100%);
  position: relative;
}

.header-gradient::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="25" cy="25" r="1" fill="white" opacity="0.2"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.2"/><circle cx="75" cy="25" r="1" fill="white" opacity="0.2"/><circle cx="25" cy="75" r="1" fill="white" opacity="0.2"/></svg>')
    repeat;
  background-size: 40px 40px;
}

.header-icon {
  animation: pulse 2s infinite;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.trainer-id-card {
  transition: all 0.3s ease;
  border-radius: 20px !important;
  overflow: hidden;
}

.trainer-id-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
}

.image-card {
  transition: all 0.3s ease;
  border-radius: 12px !important;
  overflow: hidden;
}

.image-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2) !important;
}

.v-card-title {
  background: linear-gradient(
    135deg,
    var(--v-theme-primary) 0%,
    var(--v-theme-primary-darken-1) 100%
  );
}

.trainer-id-card[color='secondary'] .v-card-title {
  background: linear-gradient(
    135deg,
    var(--v-theme-secondary) 0%,
    var(--v-theme-secondary-darken-1) 100%
  );
}

.trainer-id-card[color='success'] .v-card-title {
  background: linear-gradient(
    135deg,
    var(--v-theme-success) 0%,
    var(--v-theme-success-darken-1) 100%
  );
}

.trainer-id-card[color='info'] .v-card-title {
  background: linear-gradient(135deg, var(--v-theme-info) 0%, var(--v-theme-info-darken-1) 100%);
}

.text-justify {
  text-align: justify;
  text-justify: inter-word;
}

.v-chip-group {
  gap: 8px;
}

.v-chip {
  transition: all 0.3s ease;
}

.v-chip:hover {
  transform: translateY(-2px);
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
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
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
