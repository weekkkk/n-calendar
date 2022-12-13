<!-- @format -->

<script setup lang="ts">
// import ncLogo from '@/components/logo/nc-logo.vue';
</script>

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

/* полоса прокрутки (скроллбар) */
::-webkit-scrollbar {
  width: 16px; /* ширина для вертикального скролла */
  height: 16px; /* высота для горизонтального скролла */
  background-color: rgb(var(--nc-c-bg-1));
  border-radius: 8px;
}
/* ползунок скроллбара */
::-webkit-scrollbar-thumb {
  background-color: rgba(var(--nc-c-secondary), 0.6);
  border-radius: 8px;
  border: 6px solid rgb(var(--nc-c-bg-1));
  cursor: pointer;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(var(--nc-c-secondary), 0.8);
}
::-webkit-scrollbar-thumb:active {
  background-color: rgba(var(--nc-c-secondary), 1);
}
/* Стрелки */
::-webkit-scrollbar-button:vertical:start:decrement {
  display: none;
}
::-webkit-scrollbar-button:vertical:end:increment {
  display: none;
}
::-webkit-scrollbar-button:horizontal:start:decrement {
  display: none;
}
::-webkit-scrollbar-button:horizontal:end:increment {
  display: none;
}
</style>
