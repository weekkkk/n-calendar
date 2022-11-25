<!-- @format -->

<script lang="ts" setup>
import NcTask from '@/components/task/nc-task.vue';
import NcDate from '@/components/date/nc-date.vue';
import { computed, reactive, ref } from 'vue';
/** Свойства */
const props = defineProps({
  /** Дата */
  date: { type: Date, default: new Date() },
});
const $col = ref<HTMLElement>();
const h = computed(() => ($col.value?.offsetHeight || 0) / 24);
const start = reactive({ x: 0, y: 0 });
const pos = reactive({ x: 0, y: 0 });
const task = reactive({ s: 0, e: 0 });
const t = computed(() => {
  if (task.s < task.e)
    return {
      s: task.s,
      e: task.e,
    };
  else
    return {
      s: task.e,
      e: task.s,
    };
});
const isDrag = ref(false);
function onStart(e: MouseEvent, hour: number) {
  const rect = $col.value?.getBoundingClientRect();
  start.y = e.pageY;
  task.s = (start.y - (rect?.y || 0)) / h.value;
  task.e = task.s;
  isDrag.value = true;
}
function onDrag(e: MouseEvent) {
  if (!isDrag.value) return;
  pos.y = e.pageY - start.y;
  task.e = task.s + pos.y / h.value;
}
function onStop(e: MouseEvent) {
  pos.y = e.screenY - start.y;
  isDrag.value = false;
}
window.addEventListener('mousemove', onDrag);
window.addEventListener('mouseup', onStop);
</script>

<template>
  <div class="nc-date-col">
    <div class="cell head bg-1">
      <span class="content">
        <span class="day">
          {{ date.getShortDayName() }}
        </span>
        <span class="date">
          <nc-date>
            {{ date.getDate() }}
          </nc-date>
        </span>
      </span>
    </div>
    <div class="col" ref="$col">
      <nc-task :s="t.s" :e="t.e" />
      <div
        class="cell"
        @mousedown="onStart($event, i - 1)"
        v-for="i in 24"
        :key="i"
      >
        <span class="fs-small_caption hour start">{{ i - 1 }}</span>
        <span class="fs-small_caption hour center">{{ i - 0.5 }}</span>
        <span class="fs-small_caption hour end">{{ i == 24 ? 0 : i }}</span>
        <span class="fs-small_caption content"> </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nc-date-col {
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  > .col {
    border: none;
    position: relative;
    .cell {
      display: flex;
      .hour {
        position: absolute;
        &.start {
          top: 0;
        }
        &.center {
          top: 50%;
          transform: translateY(-50%);
        }
        &.end {
          bottom: 0;
        }
      }
    }
  }
  .cell {
    position: relative;
    padding-bottom: 50%;
    &:not(:last-child) {
      border-bottom: 1px solid black;
    }
    &.head {
      position: sticky;
      top: 0;
      z-index: 10;
      padding-bottom: 100%;
    }
    > .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      gap: 8px;
      .date {
        width: 33%;
      }
    }
  }
}
</style>
