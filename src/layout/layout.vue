<!-- @format -->

<script lang="ts" setup>
import ncLogo from '@/components/logo/nc-logo.vue';
import ncSelect from '@/components/select/nc-select.vue';
import ncOption from '@/components/option/nc-option.vue';
import ncInput from '@/components/input/nc-input.vue';
import { ref, computed } from 'vue';
import { OptionModel } from '@/components/option/models';

const options = [
  new OptionModel({
    Id: 0,
    Title: 'Option 1',
    Value: '1',
  }),
  new OptionModel({
    Id: 1,
    Title: 'Option 2',
    Value: '2',
  }),
  new OptionModel({
    Id: 2,
    Title: 'Option 3',
    Value: '3',
  }),
  new OptionModel({
    Id: 3,
    Title: 'Option 4',
    Value: '4',
  }),
];
const value = ref<OptionModel | undefined>();
const str = computed(() => {
  if (!value.value) return '';
  return `${value.value.Title} ${value.value.Value}`;
});
</script>

<template>
  <header class="f ai-c px-3">
    <section class="f ai-c cg-2">
      <nc-logo play>
        {{ new Date().getDate() }}
      </nc-logo>
      <h4 class="fw-bold">@n-calendar</h4>
    </section>
    <section class="w-100"></section>
    <section>
      <nc-select
        v-model="value"
        :value="str"
        :options="options"
        placeholder="Placeholder"
        width="264px"
      >
        <template #default="{ option }">
          {{ option?.Title }}
        </template>
      </nc-select>
      <nc-input />
    </section>
  </header>
  <body class="container f">
    <aside></aside>
    <main>
      <RouterView />
    </main>
    <aside></aside>
  </body>
</template>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
}
header {
  height: 64px;
}
body.container {
  height: calc(100% - 64px);
  aside {
    background-color: brown;
    &:first-child {
      width: 244px;
    }
    &:last-child {
      width: 48px;
    }
  }
  main {
    width: calc(100% - 244px - 48px);
  }
}
</style>
