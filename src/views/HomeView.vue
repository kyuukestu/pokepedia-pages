<script setup lang="ts">
import { ref } from 'vue'

// const isActive = ref(true)
const show = ref(false)
</script>

<template>
  <!-- <v-btn @click="isActive = !isActive">
    Welcome <v-icon>{{ 'mdi-human-greeting' }}</v-icon>
    <WelcomeOverlay :isActive="isActive" />
  </v-btn> -->
  <main>
    <v-card class="mx-auto my-12 w-50">
      <v-card-item>
        <template v-slot:title>Welcome to Pokepedia!</template>
        <template v-slot:subtitle> A RPN Associated Pokémon Role Play </template>
      </v-card-item>
      <v-img
        height="250px"
        src="https://i.pinimg.com/1200x/28/e8/67/28e867f8687640f8f6df67ffc7881570.jpg"
        aspect-ration="19/10"
      />

      <v-card-text class="py-0 text-gray ms-4">
        <div>Welcome to to our Pokémon Role Play Wikia!</div>
        <div>Poképedia for short!</div>
        <div>
          An ever-expanding compendium of useful information about the World of Pokémon as presented
          in the Role Play! This wikia serves to answer many, eventually any, of the questions that
          inevitable arise when roleplaying in a world as diverse and long-running as pokémon.
        </div>
        <div>
          This Wikia covers basic information on the Pokémon World and any changes that arise as a
          result of RP events or OOC decisions. Whether you're a seasoned member of the role play or
          just starting our, this Wikia is your go-to resource for lore, mechanic changes,
          locations, rules, Ocs (maybe), and more.
        </div>

        <v-card-actions>
          <v-spacer />
          <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show" />
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider />
            <v-card-text>
              <h2>What Is This Role Play About?</h2>
              <p>
                We run an Open-World, Sandbox-style Pokémon RP where the entire Pokéverse is your
                Cloyster!
                <br />
                What's that all mean? It means when we role play, we draw from all forms of
                Poké-Media: The
                <span>Main Series Games</span> are our primary source, but Side Games (Ranger,
                Conquest, Mystery Dungeon, et al.), Anime, Manga, etc. are all valid sources from
                which to draw inspiration to flesh-out the world.
                <br />
                Our role play introduces new regions, factions, lore, regional variants, and many
                more that expand the Pokémon experience!
              </p>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card-text>
    </v-card>
    <section>
      <h2>What You'll Find Here</h2>
      <ul>
        <li>
          <span class="find-title">Character Profiles</span>
          Covers the status of major Trainers, Pokémon, and NPCs that populate the world.
          (Eventually, we'll add OC pages as well.)
        </li>
        <li>
          <span class="find-title">Region and Location Guides</span>
          Info on each region and how they've been expanded or changed throughout the RP or in
          connection to their real-world counter-parts.
        </li>
        <li>
          <span class="find-title">Role Play Rules and Mechanics</span>
          Guides to the mechanics that keep our world fair and fun.
        </li>
        <li>
          <span class="find-title">Job and Rank Systems</span>
          Discover how your trainer can rise through the ranks and take on special roles within the
          world such as Gym Leader, Ranger, Police Officer, etc.
        </li>
        <li>
          <span class="find-title">Event Archives</span> Catch up on major story arcs and role play
          events.
        </li>
        <li>
          <span class="find-title">Pokémon Information</span>
          Regional variants, availability, and lore-specific evolutions.
        </li>
        <li><span class="find-title">And More..!</span></li>
      </ul>
    </section>
    <section>
      <h2>Getting Started</h2>
      <p>Something something, put this in an Overlay.</p>
    </section>
  </main>
</template>
<style scoped>
main {
  display: flex;
  width: 100vw;
  flex-flow: column nowrap;
}

.find-title {
  display: block;
}

span {
  font-weight: bold;
  font-variant: small-caps;
  color: #4a4a4a;
  font-size: 1.1rem;
}
</style>
