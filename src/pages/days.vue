<!-- @format -->

<script setup lang="ts">
import ncButton from '@/components/button/nc-button.vue';
import ncCell from '@/components/cell/nc-cell.vue';
import ncColumn from '@/components/column/nc-column.vue';
import ncTable from '@/components/table/nc-table.vue';
import ncTask from '@/components/task/nc-task.vue';
import { StatusEnum } from '@/enums';
import { HourIntervalModel } from '@/models';
import { computed, ref, reactive, onMounted, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { useCalendarStore } from '@/stores/calendar';
import { getStatusByDate } from '@/methods';
import { DAYS } from '@/router/names';

console.log('setup');
onMounted(() => {
  console.log('mounted');
});

/** Интервал видимых часов */
const interval = new HourIntervalModel();
/** Текущий роут */
const route = useRoute();
/** Кол-во видимых дней */
const count = ref(0);
/** Установка кол-ва видимых дней по параметрам роута */
const setCountByRouteParams = () => {
  count.value = Number(route.params.count);
};
watch(() => route.params.count, setCountByRouteParams);
setCountByRouteParams();
/** Выбранная дата */
const selectDate = ref<Date>(new Date());
/** Установка выбранной даты по параметрам роута */
const setSelectDateByRouteParams = () => {
  selectDate.value = new Date(
    Number(route.params.year),
    Number(route.params.month) - 1,
    Number(route.params.date)
  );
};
setSelectDateByRouteParams();
watch(() => {
  return { y: route.params.year, m: route.params.month, d: route.params.date };
}, setSelectDateByRouteParams);
/** Видимые в таблице даты */
const dates = computed(() => {
  if (count.value == 7) return selectDate.value.getWeekDates();
  const dates: Date[] = [];
  let date: Date;
  for (let i = 0; i < count.value; i++) {
    date = selectDate.value.getClone();
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  return dates;
});
/** Роутер */
const router = useRouter();
/** Выбор даты и переход к дню */
const setSelectDateAndPushToDay = (date: Date) => {
  router.push({
    name: DAYS,
    params: {
      count: 1,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
    },
  });
};

const tasks: {
  columnIndex: number;
  start: number;
  end: number;
}[] = reactive([]);

const startY = ref(0);
const startTask = ref({
  columnIndex: 0,
  start: 0,
  end: 0,
});
const isDrag = ref(false);
const start = (e: MouseEvent, columnIndex: number, hour: number) => {
  const min = Math.round(e.offsetY / 72 / 0.25) * 0.25;
  startY.value = e.pageY;
  isDrag.value = true;
  const task = { columnIndex, start: hour + min, end: hour + min };
  startTask.value = Object.assign({}, task);
  tasks.push(task);
};
const drag = (e: MouseEvent) => {
  if (!isDrag.value) return;
  const dy = e.pageY - startY.value;
  const dh = Math.round(dy / 72 / 0.25) * 0.25;
  if (dh >= 0) {
    tasks[tasks.length - 1].start = startTask.value.start;
    tasks[tasks.length - 1].end =
      startTask.value.end + Math.round(dy / 72 / 0.25) * 0.25;
  }
  if (dh <= 0) {
    tasks[tasks.length - 1].start =
      startTask.value.start + Math.round(dy / 72 / 0.25) * 0.25;
    tasks[tasks.length - 1].end = startTask.value.end;
  }
};
const stop = () => {
  isDrag.value = false;
};
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stop);

const mousedown = (e: MouseEvent) => {
  const $t = e.target as HTMLElement;
  let id = $t.id;
  if (!id.includes('cell-')) return;
  const data = id.slice('cell-'.length).split('_');
  const columnIndex = Number(data[0]);
  const hour = Number(data[1]);
  console.log({ columnIndex, hour });
  const min = Math.round(e.offsetY / 72 / 0.25) * 0.25;
  startY.value = e.pageY;
  isDrag.value = true;
  const task = { columnIndex, start: hour + min, end: hour + min };
  startTask.value = Object.assign({}, task);
  tasks.push(task);
};
</script>

<template>
  {{ route.params }}
  <nc-table
    :dates="dates"
    :columns="`var(--nc-cell-head-w) repeat(${count}, 1fr)`"
    class="cg-3"
    @mousedown="mousedown"
  >
    <template #tasks>
      <!-- :key="`${task.start} - ${task.end}`" -->
      <nc-task
        v-for="task in tasks"
        v-model:start="task.start"
        v-model:end="task.end"
        :column-index="task.columnIndex"
        :count-columns="count"
      >
        Test name
      </nc-task>
    </template>
    <!-- Колка-заголовок -->
    <template #hours>
      <nc-column class="head">
        <template #head>
          <div class="bg-1" />
        </template>
        <div
          class="cell f ai-c jc-fe bg-1 p-3 c-secondary"
          v-for="hour in interval.Hours"
          :key="hour"
        >
          {{ hour.getString(2) }}:00
        </div>
      </nc-column>
    </template>
    <!-- Колонки -->
    <template #default="{ date, index }">
      <nc-column :date="date" :status="getStatusByDate(date, selectDate)">
        <template #head="{ status }">
          <nc-cell
            class="cell head bg-1 ai-c jc-c fd-col rg-2 p-3"
            :status="status"
          >
            <span class="fw-medium lh-compact">
              {{ date.getShortDayName() }}
            </span>
            <nc-button
              @click="setSelectDateAndPushToDay(date)"
              class="date-n-btn p-2"
              :border="status != StatusEnum.Focus"
              :status="status"
            >
              <h3 class="fw-medium">{{ date.getDate() }}</h3>
            </nc-button>
          </nc-cell>
        </template>
        <nc-cell
          v-for="hour in interval.Hours"
          :key="hour"
          :status="StatusEnum.Secondary"
          :id="`cell-${index}_${hour}`"
        />
      </nc-column>
    </template>
  </nc-table>
</template>

<style lang="scss" scoped>
.date-n-btn {
  width: 48px;
  height: 48px;
}
</style>
