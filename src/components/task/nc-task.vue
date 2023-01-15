<!-- @format -->

<script lang="ts" setup>
import { StatusEnum } from '@/enums';
import { getColorByStatus } from '@/methods';
import { TaskModel } from '@/stores/tasks/models';
import type { PropType } from 'vue';
import { ref, reactive, computed } from 'vue';

import ncPopover from '@/components/popover/nc-popover.vue';
import { PopoverPositionEnum } from '@/components/popover/enums';

/** Свойства */
const props = defineProps({
  /** Даты */
  dates: { type: Array as PropType<Date[]>, default: [] },
  /** Статус */
  status: {
    type: Number as PropType<StatusEnum>,
    default: StatusEnum.Base,
  },
  /** Кол-во колонок */
  count: { type: Number, default: 1 },
  /** Начало по вертикали */
  startV: { type: Number, default: 0 },
  /** Конец по вертикали */
  endV: { type: Number, default: 1 },
  /** Начало по горизонтали */
  startH: { type: Number, default: 0 },
  /** Конец по горизонтали */
  endH: { type: Number, default: 1 },
});
/** События */
const emit = defineEmits<{
  (e: 'update:startH', value: number): void;
  (e: 'update:endH', value: number): void;
  (e: 'update:startV', value: number): void;
  (e: 'update:endV', value: number): void;
  (e: 'change', value: TaskModel): void;
}>();

/** Происходит ли перетаскивание */
const isDrag = ref(false);
/** Происходит ли ресайз */
const isResize = ref(false);

/** Стартовая позиция */
const startPosition = reactive({
  x: 0,
  y: 0,
});
/** Действительная позиция */
const position = reactive({
  x: 0,
  y: 0,
});

/** Стартовые данные */
const startData = reactive({
  sh: 0,
  eh: 0,
  sv: 0,
  ev: 0,
});
/** Действительные данные */
const data = computed(() => {
  return { sh: props.startH, eh: props.endH, sv: props.startV, ev: props.endV };
});

/** Посчитать ли данные для задачи */
const isCalc = ref(true);

/** Функция начала перетаскивая или ресайза */
const start = (e: MouseEvent, type: 'resize-s' | 'resize-e' | 'drag') => {
  startPosition.x = e.pageX;
  startPosition.y = e.pageY;

  startData.sh = props.startH;
  startData.eh = props.endH;

  startData.sv = props.startV;
  startData.ev = props.endV;

  if (type == 'resize-s') {
    isResize.value = type == 'resize-s';
    window.addEventListener('mousemove', resizeS);
    window.removeEventListener('mousemove', drag);
  } else if (type == 'resize-e') {
    isResize.value = type == 'resize-e';
    window.addEventListener('mousemove', resizeE);
    window.removeEventListener('mousemove', drag);
  } else if (type == 'drag') {
    isDrag.value = type == 'drag';
    window.addEventListener('mousemove', drag);
  }

  window.addEventListener('mouseup', stop);
};

/** Функция перетаскивая */
const drag = (e: MouseEvent) => {
  if (!isDrag.value || isResize.value) return;

  position.x = e.pageX - startPosition.x;
  position.y = e.pageY - startPosition.y;

  data.value.sh = Math.round(startData.sh + position.x / 184);
  data.value.eh = Math.round(startData.eh + position.x / 184);
  data.value.sv = startData.sv + Math.floor(position.y / 80 / 0.25) * 0.25;
  data.value.ev = startData.ev + Math.floor(position.y / 80 / 0.25) * 0.25;

  if (data.value.sv <= 0) {
    data.value.sh--;
    data.value.sv += 24;
  }
  if (data.value.ev <= 0) {
    data.value.eh--;
    data.value.ev += 24;
  }
  if (data.value.sv >= 24) {
    data.value.sh++;
    data.value.sv -= 24;
  }
  if (data.value.ev > 24) {
    data.value.eh++;
    data.value.ev -= 24;
  }

  emit('update:startH', data.value.sh);
  emit('update:endH', data.value.eh);

  emit('update:startV', data.value.sv);
  emit('update:endV', data.value.ev);
};

/** Функция ресайза стартовой точки */
const resizeS = (e: MouseEvent) => {
  if (!isResize.value) return;

  position.y = e.pageY - startPosition.y;
  data.value.sv = startData.sv + Math.floor(position.y / 80 / 0.25) * 0.25;

  if (data.value.sv <= 0) data.value.sv = 0;
  if (data.value.sv > 23.75) data.value.sv = 23.75;
  if (data.value.sh == data.value.eh && data.value.ev - data.value.sv <= 0) {
    data.value.sv = data.value.ev - 0.25;
    isCalc.value = false;
    stop();
    isCalc.value = true;
    start(e, 'resize-e');
  }
  emit('update:startV', data.value.sv);
};

/** Функция ресайза конечной точки */
const resizeE = (e: MouseEvent) => {
  if (!isResize.value) return;

  position.y = e.pageY - startPosition.y;
  data.value.ev = startData.ev + Math.ceil(position.y / 80 / 0.25) * 0.25;

  if (data.value.ev <= 0.25) data.value.ev = 0.25;
  if (data.value.ev >= 24) data.value.ev = 24;
  if (data.value.sh == data.value.eh && data.value.ev - data.value.sv <= 0) {
    data.value.ev = data.value.sv + 0.25;
    isCalc.value = false;
    stop();
    isCalc.value = true;
    start(e, 'resize-s');
  }
  emit('update:endV', data.value.ev);
};

const getD = (h: number) => {
  let date: Date;
  if (h < 0) {
    date = props.dates[0].getClone();
    date.setDate(date.getDate() + h);
  } else if (h >= props.dates.length) {
    date = props.dates[props.dates.length - 1].getClone();
    date.setDate(date.getDate() + h);
  } else {
    date = props.dates[h].getClone();
  }
  return date;
};
const getH = (v: number) => Math.floor(v);
const getM = (v: number) => ((v - Math.floor(v)) / 0.25) * 15;

/** Функция остановки рейсайза или перетаскивания */
const stop = () => {
  isDrag.value = false;
  isResize.value = false;

  window.removeEventListener('mousemove', drag);
  window.removeEventListener('mousemove', resizeS);
  window.removeEventListener('mousemove', resizeE);
  window.removeEventListener('mouseup', stop);

  if (!isCalc.value) return;

  const sd = getD(props.startH);
  sd.setHours(getH(props.startV));
  sd.setMinutes(getM(props.startV));

  const ed = getD(props.endH);
  ed.setHours(getH(props.endV));
  ed.setMinutes(getM(props.endV));

  const task = new TaskModel({
    Start: sd,
    End: ed,
  });

  console.log('task', task);
};

defineExpose({
  start,
});
</script>

<template>
  <!-- <div class="nc_task-info">
    <h1>Test</h1>
  </div> -->
  <div
    class="nc-task"
    :class="{ 'is-drag': isDrag || isResize }"
    @mousedown="start($event, 'drag')"
  >
    <!-- <Teleport to="body"> -->
    <!-- </Teleport> -->
    <div
      v-for="i in endH - startH + 1"
      :key="i"
      class="part c-bg-1 br-1"
      :style="{
        background: `rgb(${getColorByStatus(status)})`,
        '--index': startH + i - 1,
      }"
    >
      <div class="top" @mousedown.prevent="start($event, 'resize-s')" />

      <slot />

      <div class="bottom" @mousedown.prevent="start($event, 'resize-e')" />
    </div>
  </div>
</template>

<style lang="scss">
$ch: var(--nc-cell-h);
$hh: var(--nc-cell-head-h);
$hw: var(--nc-cell-head-w);
$px: 8px;
$sh: v-bind(startH);
$eh: v-bind(endH);
$sv: v-bind(startV);
$ev: v-bind(endV);
$c: v-bind(count);

.nc-task {
  .part {
    position: absolute;
    overflow: hidden;
    left: calc((100% - $hw) / $c * var(--index) + $hw + $px);
    width: calc((100% - $hw) / $c - $px * 2);
    top: $hh;
    bottom: 0;
    .top,
    .bottom {
      position: absolute;
      left: 0;
      right: 0;
      background: red;
      height: 4px;
      display: none;
      cursor: ns-resize;
      z-index: 0;
    }
    &:first-child {
      top: calc((100% - $hh) / 24 * $sv + $hh);
      .top {
        display: flex;
        top: 0;
      }
    }
    &:last-child {
      bottom: calc((100% - $hh) / 24 * (24 - $ev));
      .bottom {
        display: flex;
        bottom: 0;
      }
    }
  }

  &.is-drag {
    opacity: 0.5;
  }
}
</style>
