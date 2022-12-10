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
  color: var(--nc-c-base-100);
}
#app {
  min-height: 100vh;
  height: 100vh;
  background-color: var(--nc-c-bg-1-100);
}
</style>
