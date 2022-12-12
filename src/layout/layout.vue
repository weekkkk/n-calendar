<!-- @format -->

<script lang="ts" setup>
import ncLogo from '@/components/logo/nc-logo.vue';
import ncSelect from '@/components/select/nc-select.vue';
import ncOption from '@/components/option/nc-option.vue';
import ncInput from '@/components/input/nc-input.vue';
import { ref, computed, reactive } from 'vue';
import { OptionModel } from '@/components/option/models';
import { StatusEnum, ViewEnum } from '@/enums';
import { DAYS, MONTHS, WEEKS } from '@/router/names';
import { useRoute, useRouter } from 'vue-router';

const viewTypeOptions = reactive([
  new OptionModel({
    Id: ViewEnum.Day,
    Title: 'День',
    Value: JSON.stringify({ name: DAYS, params: { count: 1 } }),
  }),
  new OptionModel({
    Id: ViewEnum.Week,
    Title: 'Неделя',
    Value: JSON.stringify({ name: DAYS, params: { count: 7 } }),
  }),
  new OptionModel({
    Id: ViewEnum.Month,
    Title: 'Месяц',
    Value: JSON.stringify({ name: WEEKS, params: { count: 6 } }),
  }),
  new OptionModel({
    Id: ViewEnum.Year,
    Title: 'Год',
    Value: JSON.stringify({ name: MONTHS, params: { count: 12 } }),
  }),
]);
const findViewType = (view: ViewEnum) => {
  return viewTypeOptions.find((el) => el.Id == view);
};
const route = useRoute();
const router = useRouter();
const viewType = computed({
  get: (): OptionModel | undefined => {
    switch (route.name) {
      case DAYS:
        switch (Number(route.params.count)) {
          case 1:
            return findViewType(ViewEnum.Day);
          case 7:
            return findViewType(ViewEnum.Week);
        }
      case WEEKS:
        switch (Number(route.params.count)) {
          case 6:
            return findViewType(ViewEnum.Month);
        }
      case MONTHS:
        switch (Number(route.params.count)) {
          case 12:
            return findViewType(ViewEnum.Year);
        }
    }
  },
  set: (option: OptionModel | undefined) => {
    if (!option) return;
    router.push(JSON.parse(option.Value));
  },
});
</script>

<template>
  <header class="f ai-c cg-3 px-3">
    <section class="f ai-c cg-2">
      <nc-logo play>
        {{ new Date().getDate() }}
      </nc-logo>
      <h4 class="fw-bold">@n-calendar</h4>
    </section>
    <section class="w-100"></section>
    <section>
      <nc-select
        v-model="viewType"
        :value="viewType?.Title"
        :options="viewTypeOptions"
      >
        <template #default="{ option }">
          {{ option?.Title }}
        </template>
      </nc-select>
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
  height: 80px;
  border-bottom: 1px solid rgb(var(--nc-c-secondary));
  section:first-child {
    white-space: nowrap;
  }
}
body.container {
  height: calc(100% - 80px);
  aside {
    &:first-child {
      width: 244px;
      border-right: 1px solid rgb(var(--nc-c-secondary));
    }
    &:last-child {
      width: 48px;
      border-left: 1px solid rgb(var(--nc-c-secondary));
    }
  }
  main {
    width: calc(100% - 244px - 48px);
  }
}
</style>
