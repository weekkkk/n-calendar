<!-- @format -->

<script lang="ts" setup>
import type { Prop, PropType } from 'vue';
import { StatusEnum } from '@/enums';
import ncCell from '@/components/cell/nc-cell.vue';
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
  <div class="table cg-3">
    <slot name="hours" />
    <slot v-for="date in dates" :date="date" />
  </div>
</template>

<style lang="scss" scoped>
.table {
  display: grid;
  grid-auto-flow: column;
  overflow: auto;
  height: fit-content;
  height: 100%;
  max-height: 100%;
  grid-template-columns: v-bind(columns);
}
</style>
