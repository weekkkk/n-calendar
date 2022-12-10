<!-- @format -->

<script lang="ts" setup></script>

<template>
  <!-- <main class="layout"> -->
  <header>
    <h1>Test</h1>
  </header>
  <main>
    <aside></aside>
    <section>
      <RouterView />
    </section>
    <aside></aside>
  </main>
  <!-- </main> -->
</template>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
}
header {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 64px;
  background-color: aquamarine;
}

main {
  display: flex;
  position: relative;
  height: calc(100% - 64px);
  width: 100%;
  aside {
    width: 244px;
    background-color: antiquewhite;
    &:last-child {
      width: 48px;
    }
  }
  section {
    width: calc(100% - 244px - 48px);
  }
}
// main {
//   display: flex;
//   flex-wrap: wrap;
//   padding: 32px;
//   height: 100%;
//   width: 100%;

// }
</style>
