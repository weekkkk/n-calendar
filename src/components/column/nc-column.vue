<!-- @format -->

<script lang="ts" setup>
import ncCell from '@/components/cell/nc-cell.vue';
import { StatusEnum } from '@/enums';
import { HourIntervalModel } from '@/models';
import { computed, type PropType } from 'vue';
/** Свойства */
const props = defineProps({
  /** Дата */
  date: { type: Date, default: new Date() },
  /** Интервал часов */
  interval: {
    type: Object as PropType<HourIntervalModel>,
    default: new HourIntervalModel(),
  },
  /** Статус */
  status: { type: Number as PropType<StatusEnum>, default: StatusEnum.Base },
});
/** Кол-во строк */
const countRows = computed(() => props.interval.Hours.length)
</script>

<template>
  <div class="nc-column">
    <!-- Шапка -->
    <div class="cell head">
      <slot name="head" :status="status" />
    </div>
    <!-- Ячейка -->
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.nc-column {
  position: relative;
  display: inline-grid;
  border-left: 1px solid rgba(114, 106, 184, 0.37);
  grid-template-rows: var(--nc-cell-head-h) repeat(
      v-bind(countRows),
      var(--nc-cell-h)
    );
  &.head {
    position: sticky;
    left: 0;
    z-index: 2;
  }
  > .cell {
    display: inline-grid;
    height: 100%;
    &.head {
      position: sticky;
      top: 0;
      z-index: 1;
    }
  }
  &:not(.head) {
    min-width: var(--nc-cell-w);
  }
}
</style>
