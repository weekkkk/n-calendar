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
    <!-- <div class="col head">
      <div class="cell head bg-1 a-70"></div>
      <div class="cell bg-1 c-secondary a-70 fw-medium p-3" v-for="i in 23">
        {{ i }}:00
      </div>
    </div> -->
    <slot v-for="date in dates" :date="date" />
  </div>
</template>

<style lang="scss" scoped>
.table {
  display: grid;
  grid-auto-flow: column;
  overflow: auto;
  height: fit-content;
  max-height: 100%;
  grid-template-columns: v-bind(columns);
}
</style>
