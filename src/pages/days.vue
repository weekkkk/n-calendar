<!-- @format -->

<script setup lang="ts">
import ncButton from '@/components/button/nc-button.vue';
import ncCell from '@/components/cell/nc-cell.vue';
import ncColumn from '@/components/column/nc-column.vue';
import ncTable from '@/components/table/nc-table.vue';
import ncTask from '@/components/task/nc-task.vue';
import ncPopover from '@/components/popover/nc-popover.vue';

import ncInput from '@/components/input/nc-input.vue';
import ncSelect from '@/components/select/nc-select.vue';
import ncDatepicker from '@/components/datepicker/nc-datepicker.vue';

import { StatusEnum } from '@/enums';
import { HourIntervalModel } from '@/models';
import { computed, ref, reactive, onMounted, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { useCalendarStore } from '@/stores/calendar';
import { getStatusByDate } from '@/methods';
import { DAYS } from '@/router/names';
import { TaskModel } from '@/stores/tasks/models';
import { PopoverPositionEnum } from '@/components/popover/enums';
import { OptionModel } from '@/components/option/models';

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
const setSelectDate = (date: Date, count: number = 1) => {
  router.push({
    name: DAYS,
    params: {
      count,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
    },
  });
};

/** Элемент таска */
const taskEl = ref();
/** Начать перетасквание */
const start = (e: MouseEvent) => {
  const $t = e.target as HTMLElement;
  let id = $t.id;
  if (!id.includes('cell-')) return;
  const data = id.slice('cell-'.length).split('_');

  task.sh = Number(data[0]);
  task.eh = Number(data[0]);
  task.sv = Number(data[1]) + Math.round(e.offsetY / 80 / 0.25) * 0.25;
  task.ev = task.sv + 0.25;

  setTimeout(() => taskEl.value.start(e, 'resize-e'));
};
/** Задача */
const task = reactive({ sh: 0, eh: 3, sv: 1, ev: 3 });
</script>

<template>
  <nc-table
    class="days-table"
    :dates="dates"
    :columns="`var(--nc-cell-head-w) repeat(${count}, 1fr)`"
    @mousedown="start"
  >
    <!-- Колка-заголовок -->
    <template #hours>
      <nc-column class="head">
        <template #head>
          <div class="f ai-c jc-c bg-1" />
        </template>
        <div
          class="cell f ai-c jc-fe bg-1 p-3 c-secondary fw-regular fs-caption"
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
            class="cell head bg-1 ai-c jc-sb fd-col p-3"
            :status="status"
          >
            <span class="fw-medium lh-compact">
              {{ date.getShortDayName() }}
            </span>
            <nc-button
              @click="setSelectDate(date)"
              class="date-n-btn p-2 br-4"
              :border="status == StatusEnum.Base"
              :status="status"
            >
              <h4 class="fw-medium">{{ date.getDate() }}</h4>
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
    <!-- Задачи -->
    <template #tasks>
      <nc-task
        ref="taskEl"
        :dates="dates"
        :count="7"
        v-model:start-h="task.sh"
        v-model:end-h="task.eh"
        v-model:start-v="task.sv"
        v-model:end-v="task.ev"
      />
    </template>
  </nc-table>
</template>

<style lang="scss"></style>
<style lang="scss" scoped>
// .days-table {
//   cursor: v-bind(cursor);
// }
.task-popover-el {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.date-n-btn {
  width: 48px;
  height: 48px;
}
</style>
