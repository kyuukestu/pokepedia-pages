<script setup lang="ts">
import { useTheme } from 'vuetify'
const theme = useTheme()
</script>
<template>
  <v-container fluid>
    <h1>Trainer 101</h1>

    <h2 id="index">Index</h2>

    <h2 id="who-is-a-trainer">Who is a Trainer?</h2>

    <p>
      A Pokémon Trainer is any person who catches, trains, cares for, or battles with Pokémon!
      Starting from the age of ten (10), anyone can apply for a Trainer's Card, which—upon
      approval—recognizes them as a League-Registered Pokémon Trainer.
    </p>

    <p>
      Trainer Cards are essential for gaining access to the full suite of League-affiliated
      services, including:
    </p>

    <ul>
      <li>PokéMart</li>
      <li>PokéCenter</li>
      <li>Daycare &amp; Breeding Facilities</li>
      <li>Gyms, Battle Frontier, Battle Tower, etc.</li>
      <li>League Sponsored Events &amp; Competitions</li>
    </ul>

    <p>
      In spite of their common referral as 'Trainer Cards', the more accurate term would be 'Trainer
      ID' as they encompass all means of identification and can take many forms depending on the
      region and the personal preference of the trainer.
    </p>

    <p>Common Types of Trainer ID and their unique features are explored below:</p>

    <v-container fluid class="Btn-Container mx-auto d-flex flex-row flex-wrap pl-5 pr-5">
      <v-btn
        prepend-icon="mdi-card-account-details"
        class="ID-Btn"
        size="x-large"
        :variant="theme.global.name.value === 'dark' ? 'outlined' : 'elevated'"
        stacked
        to="/sandbox/content/trainer101.trainer-ids#trainer-card"
      >
        Trainer Card
      </v-btn>

      <v-btn
        prepend-icon="mdi-passport"
        class="ID-Btn"
        size="x-large"
        :variant="theme.global.name.value === 'dark' ? 'outlined' : 'elevated'"
        stacked
        to="/sandbox/content/trainer101.trainer-ids#trainer-passport"
        >Passport</v-btn
      >

      <v-btn
        prepend-icon="mdi-cards"
        class="ID-Btn"
        size="x-large"
        :variant="theme.global.name.value === 'dark' ? 'outlined' : 'elevated'"
        stacked
        to="/sandbox/content/trainer101.trainer-ids#league-card"
      >
        League Card
      </v-btn>

      <v-btn
        prepend-icon="mdi-passport-biometric"
        class="ID-Btn"
        size="x-large"
        :variant="theme.global.name.value === 'dark' ? 'outlined' : 'elevated'"
        stacked
        to="/sandbox/content/trainer101.trainer-ids#profile-app"
        >App</v-btn
      >
    </v-container>

    <blockquote>
      <strong>CAUTION</strong><br />
      Trainers who are found to be involved with illegal or criminal activity may find themselves at
      risk of their trainer ids being revoked!
    </blockquote>

    <h2 id="the-carry-limit">The Carry Limit</h2>

    <p>
      It is tradition and expected that trainers carry no more than six (6) pokémon on them at any
      time.
    </p>

    <p>
      While this may be an unspoken rule, meaning it is not strictly enforced, the League frowns
      upon trainers who exceed the traditional six (6) without reason.
    </p>

    <p>
      Pokémon are, after all, extremely powerful creatures and those trainers who feel the need to
      carry around what is effectively a small army will invite scrutiny and suspicion.
    </p>

    <p>
      That said, there are many exceptions to this rule where the League will grant temporary
      permission for a Trainer to exceed the Carry Limit. A permit can be obtained from League
      Officials (such as the Regional Professor) for trainers who, for example:
    </p>

    <ul>
      <li>Are nursing young pokémon who would benefit from the close proximity to their trainer</li>
      <li>Have health issues that require a guide-pokemon</li>
    </ul>

    <p>
      Alternatively, Trainers may purchase a mobile PC unit that allows them to access the Pokémon
      Storage System from almost anywhere.
    </p>

    <p>
      However, Tournaments and public institutions such as hotels or parks are under no obligation
      to accommodate trainers who exceed the standard six (6).
    </p>

    <h2 id="pokémon-permits">Pokémon Permits</h2>

    <p>
      Unfortunately, not every trainer can be trusted not to barrel down the streets at 250 km/h on
      their newly evolved, far too eager Arcanine. Permits act as the Role Play equivalent of
      Licenses and certify a trainer as sufficiently trained to ride Pokémon to traverse:
    </p>
    <v-container fluid class="Btn-Container mx-auto d-flex flex-row flex-wrap pl-5 pr-5">
      <v-btn
        prepend-icon="mdi-feather"
        class="Permit-Btn"
        size="x-large"
        :variant="theme.global.name.value === 'dark' ? 'outlined' : 'elevated'"
        stacked
        to="/sandbox/content/trainer101.permit.sky"
        >Sky</v-btn
      >
      <v-btn
        prepend-icon="mdi-paw"
        class="Permit-Btn"
        size="x-large"
        :variant="theme.global.name.value === 'dark' ? 'outlined' : 'elevated'"
        stacked
        to="/sandbox/content/trainer101.permit.land"
        >Land</v-btn
      >
      <v-btn
        prepend-icon="mdi-wave"
        class="Permit-Btn"
        size="x-large"
        :variant="theme.global.name.value === 'dark' ? 'outlined' : 'elevated'"
        stacked
        to="/sandbox/content/trainer101.permit.water"
        >Water</v-btn
      >
    </v-container>

    <blockquote>
      <strong>NOTE</strong><br />
      Largely flavor text and not strictly enforced in RP, trainers who ride their pokémon are
      assumed to do so safely unless stated otherwise.
    </blockquote>
  </v-container>
</template>
<style scoped>
.Btn-Container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  max-width: 950px;
  height: 300px;
}

.ID-Btn {
  width: 150px;
  height: 100px;
  text-align: center;
}
</style>
