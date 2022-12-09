<!-- @format -->

<script lang="ts" setup>
import type { PropType } from 'vue';
/** Свойства */
const props = defineProps({
  /** Даты */
  dates: {
    type: Array as PropType<Date[]>,
    default: new Date().getWeekDates(),
  },
  /** Кол-во колонок */
  columns: { type: String, default: '' },
});
</script>

<template>
  <div class="nc-table">
    <div class="table">
      <slot name="tasks" />
      <slot name="hours" />
      <slot v-for="(date, index) in dates" :date="date" :index="index" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nc-table {
  overflow: auto;
  user-select: none;
  height: 100%;
  width: 100%;
  .table {
    position: relative;
    display: grid;
    height: fit-content;
    width: fit-content;
    gap: inherit;
    min-width: 100%;
    grid-template-columns: v-bind(columns);
    &::-webkit-scrollbar {
      width: 0;
    }
  }
}
</style>
