<!-- @format -->

<script lang="ts" setup>
import { StatusEnum } from '@/enums';
import { getColorByStatus } from '@/methods';
import type { PropType } from 'vue';

/** Свойства */
const props = defineProps({
  /** Статус */
  status: {
    type: Number as PropType<StatusEnum>,
    default: StatusEnum.Base,
  },
  /** Кол-во коловок */
  countColumns: { type: Number, default: 1 },
  /** Индекс колонки */
  columnIndex: { type: Number, default: 0 },
  /** Начало */
  start: { type: Number, default: 0 },
  /** Продолжительность */
  end: { type: Number, default: 1 },
});
/** События */
const emit = defineEmits(['update:start', 'update:end']);
</script>

<template>
  <div
    class="nc-task c-bg-1 br-1"
    :style="{
      background: `rgb(${getColorByStatus(status)})`,
    }"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.nc-task {
  position: absolute;
  overflow: hidden;
  left: calc(
    var(--nc-cell-head-w) + (100% - var(--nc-cell-head-w)) /
      v-bind(countColumns) * v-bind(columnIndex)
  );
  width: calc((100% - var(--nc-cell-head-w)) / v-bind(countColumns) - 16px);
  top: calc(var(--nc-cell-head-h) + var(--nc-cell-h) * v-bind(start));
  bottom: calc(var(--nc-cell-h) * (24 - v-bind(end)));
  z-index: 0;
  display: flex;
  flex-direction: column;
  opacity: 0.8;
  .top,
  .bottom {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 16px;
    cursor: ns-resize;
    background-color: rgba(240, 248, 255, 0.5);
  }
  .top {
    top: -8px;
  }
  .bottom {
    bottom: -8px;
  }
}
</style>
