<template>
  <v-row class="py-16" justify="center">
    <v-col cols="12" class="text-center">
      <v-avatar size="100" class="mb-6 elevation-12 border-lg border-amber">
        <v-icon size="60" color="white">mdi-pokeball</v-icon>
      </v-avatar>
      <h1 class="main-title">POKÉPEDIA</h1>
      <div class="d-flex align-center justify-center">
        <v-divider class="grow-0" width="50" />
        <span class="mx-4 text-overline text-amber-darken-2 font-weight-bold letter-spacing-4">
          POKEMON ROLEPLAY COMPENDIUM
        </span>
        <v-divider class="grow-0" width="50" />
      </div>
    </v-col>
  </v-row>
</template>

<style scoped>
.main-title {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 900;
  letter-spacing: -2px;
  text-transform: uppercase;
  background: linear-gradient(to bottom, #fff 40%, #ffd700);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.8));
}

.letter-spacing-4 {
  letter-spacing: 4px !important;
}
</style>
