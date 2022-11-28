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
    <slot name="hours" />
    <slot v-for="date in dates" :date="date" />
  </div>
</template>

<style lang="scss" scoped>
.nc-table {
  display: grid;
  grid-auto-flow: column;
  overflow: auto;
  height: fit-content;
  height: 100%;
  max-height: 100%;
  grid-template-columns: v-bind(columns);
}
</style>
