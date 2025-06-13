<template>
  <v-container
    fluid
    class="Btn-Container mx-auto d-flex flex-row flex-wrap pl-5 pr-5"
    height="fit-content"
  >
    <slot />
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
</style>
