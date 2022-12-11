<!-- @format -->

<script lang="ts" setup>
import { StatusEnum } from '@/enums';
import { getColorByStatus } from '@/methods';
import type { PropType } from 'vue';
import { ref } from 'vue';

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

// const startY = ref(0);
// const isDrag = ref(false);
// const startValue = ref(0);
// const curType = ref<'start' | 'end'>('start');
// const startDrag = (e: MouseEvent, type: 'start' | 'end') => {
//   isDrag.value = true;
//   startY.value = e.pageY;
//   curType.value = type;
//   startValue.value = props[type];
// };
// const drag = (e: MouseEvent) => {
//   if (!isDrag.value) return;
//   const dy = e.pageY - startY.value;
//   const dh = Math.round(dy / 72 / 0.25) * 0.25;
//   if (dh >= 0) {
//     emit(
//       `update:${curType.value}`,
//       startValue.value + Math.round(dy / 72 / 0.25) * 0.25
//     );
//   }
//   if (dh <= 0) {
//     emit(
//       `update:${curType.value}`,
//       startValue.value + Math.round(dy / 72 / 0.25) * 0.25
//     );
//   }
// };
// const stop = () => {
//   isDrag.value = false;
// };
// window.addEventListener('mousemove', drag);
// window.addEventListener('mouseup', stop);
</script>

<template>
  <div
    class="nc-task c-bg-1"
    :style="{ background: `rgba(${getColorByStatus(status)}, 0.8)` }"
  >
    <!-- <div class="top" @mousedown="startDrag($event, 'start')" /> -->
    <slot />
    <!-- <div class="bottom" @mousedown="startDrag($event, 'end')" /> -->
  </div>
</template>

<style lang="scss" scoped>
.nc-task {
  position: absolute;
  overflow: hidden;
  left: calc(
    var(--nc-cell-head-w) + 16px + (100% - var(--nc-cell-head-w)) /
      v-bind(countColumns) * v-bind(columnIndex)
  );
  width: calc((100% - var(--nc-cell-head-w)) / v-bind(countColumns) - 16px);
  top: calc(var(--nc-cell-head-h) + var(--nc-cell-h) * v-bind(start));
  bottom: calc(var(--nc-cell-h) * (24 - v-bind(end)));
  z-index: 0;
  // transition-duration: 0.1s;
  // transition-timing-function: ease-in-out;
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
