<!-- @format -->

<script setup lang="ts"></script>

<template>
  <RouterView />
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html {
  font-family: Montserrat;
  line-height: var(--nc-lh-regular);
  color: var(--nc-c-text-100);
}
#app {
  height: fit-content;
  min-height: 100vh;
  background-color: var(--nc-c-bg-2-100);
}
</style>
