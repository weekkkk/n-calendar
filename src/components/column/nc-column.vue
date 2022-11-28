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
      <slot name="head" />
    </div>
    <!-- Ячейка -->
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.nc-column {
  display: inline-grid;
  grid-template-rows: var(--nc-cell-head-h) repeat(
      v-bind(countRows),
      minmax(var(--nc-cell-h), 1fr)
    );
  &.head {
    position: sticky;
    left: 0;
    z-index: 1;
  }
  > .cell {
    display: inline-grid;
    height: 100%;
    &.head {
      position: sticky;
      top: 0;
    }
  }
  &:not(.head) {
    min-width: 224px;
  }
}
</style>
