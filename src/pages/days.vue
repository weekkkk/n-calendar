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

/** Начальная позиция курсора по Y */
const startY = ref(0);
/** Дата дня колонки, в которую добавляется задача */
const columnDate = ref<Date>();
/** Индекс колонки в которую добавляется задача */
const columnIndex = computed(() => {
  return dates.value.findIndex((date) => !columnDate.value?.getCompare(date));
});
/** Начальный час */
const startStartHour = ref(0);
const startHour = ref(0);
/** Начальный час */
const startEndHour = ref(0);
const endHour = ref(0);
/** Перетаскивается ли курсор */
const isDrag = ref(false);
/** Поповер выбранной задачи */
const task_popover = ref();
/** Начать перетасквание */
const start = (e: MouseEvent) => {
  const $t = e.target as HTMLElement;
  let id = $t.id;
  if (!id.includes('cell-')) return;
  const data = id.slice('cell-'.length).split('_');
  columnDate.value = dates.value[Number(data[0])];
  startStartHour.value = Number(data[1]);
  startStartHour.value += Math.round(e.offsetY / 80 / 0.25) * 0.25;
  startEndHour.value = startStartHour.value;
  startHour.value = startStartHour.value;
  endHour.value = startEndHour.value;
  const rect = $t.getBoundingClientRect();
  const cellOff = Math.round((e.pageY - rect.y) / 80 / 0.25) * (0.25 * 80);
  startY.value = rect.y + cellOff;
  isDrag.value = true;
  task_popover.value?.close();
};
/** Перетаскивать */
const drag = (e: MouseEvent) => {
  if (!isDrag.value) return;
  const dy = e.pageY - startY.value;
  const dh = Math.floor(dy / 80 / 0.25) * 0.25;
  let sH: number = 0,
    eH: number = 0;
  if (dh >= 0) {
    sH = startStartHour.value;
    eH = startEndHour.value + Math.floor(dy / 80 / 0.25) * 0.25 + 0.25;
  }
  if (dh < 0) {
    sH = startStartHour.value + Math.ceil(dy / 80 / 0.25) * 0.25 - 0.25;
    eH = startEndHour.value;
  }
  if (sH < interval.Start) {
    sH = interval.Start;
  } else if (eH > interval.End) {
    eH = interval.End;
  }
  startHour.value = sH;
  endHour.value = eH;
};
document.addEventListener('mousemove', drag);
/** Прекратить перетаскивать */
const stop = () => {
  if (!isDrag.value) return;
  isDrag.value = false;
  if (startHour.value == endHour.value) endHour.value += 0.25;
  task_popover.value?.open();
};
document.addEventListener('mouseup', stop);
/** Курсор */
const cursor = computed(() =>
  isDrag.value && startHour.value != endHour.value ? 's-resize' : ''
);

/**
 * ! Форма
 */
/** Часы */
const hours = computed(() => {
  const hours: OptionModel[] = [];
  for (let i = 0; i < 24; i++)
    hours.push(
      new OptionModel({
        Id: i,
        Title: i.getString(2),
        Value: `${i}`,
      })
    );
  return hours;
});
const sHours = computed(() => {
  return hours.value.filter(
    (hour) => hour.Id + sMinute.value.Id / 60 < endHour.value
  );
});
const eHours = computed(() => {
  return hours.value.filter(
    (hour) => hour.Id + eMinute.value.Id / 60 > startHour.value
  );
});
const getHour = (number: number) => {
  return (
    hours.value.find((hour) => hour.Id == Math.floor(number)) || hours.value[0]
  );
};
const sHour = computed({
  get: () => getHour(startHour.value),
  set: (value: OptionModel) => {
    startHour.value = value.Id + sMinute.value.Id / 60;
  },
});
const eHour = computed({
  get: () => getHour(endHour.value),
  set: (value: OptionModel) => {
    endHour.value = value.Id + eMinute.value.Id / 60;
  },
});
/** Минуты */
const minutes = computed(() => {
  const minutes: OptionModel[] = [];
  for (let i = 0; i < 60; i += 15)
    minutes.push(
      new OptionModel({
        Id: i,
        Title: i.getString(2),
        Value: `${i}`,
      })
    );
  return minutes;
});
const sMinutes = computed(() => {
  return minutes.value.filter(
    (minute) => sHour.value.Id + minute.Id / 60 < endHour.value
  );
});
const eMinutes = computed(() => {
  return minutes.value.filter(
    (minute) => eHour.value.Id + minute.Id / 60 > startHour.value
  );
});
const getMinute = (number: number) => {
  return (
    minutes.value.find(
      (minute) => minute.Id == (number - Math.floor(number)) * 60
    ) || minutes.value[0]
  );
};
const sMinute = computed({
  get: () => getMinute(startHour.value),
  set: (value: OptionModel) => {
    startHour.value = sHour.value.Id + value.Id / 60;
  },
});
const eMinute = computed({
  get: () => getMinute(endHour.value),
  set: (value: OptionModel) => {
    endHour.value = eHour.value.Id + value.Id / 60;
  },
});
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
        v-model:start="startHour"
        v-model:end="endHour"
        :column-index="columnIndex"
        :count-columns="count"
      >
        <nc-popover
          class="task-popover-el"
          width="304px"
          :position="PopoverPositionEnum.Left"
          ref="task_popover"
          is-disable-default-events
        >
          <template #content>
            <form class="f fd-col rg-3 p-3" @submit.prevent>
              <h3>Новая задача</h3>

              <section class="f fd-col rg-2">
                <label class="fs-small_p fw-medium lh-no_lh c-secondary">
                  Название
                </label>
                <nc-input placeholder="Введите название" />
              </section>

              <section class="f fd-col rg-2">
                <label class="fs-small_p fw-medium lh-no_lh c-secondary">
                  Дата
                </label>
                <nc-datepicker
                  :model-value="columnDate"
                  @update:model-value="
                    columnDate = $event;
                    setSelectDate($event, count);
                  "
                  :value="columnDate?.toDateString()"
                  placeholder="Дата"
                  readonly
                />
              </section>

              <section class="f fd-col rg-2">
                <label class="fs-small_p fw-medium lh-no_lh c-secondary">
                  Время начала
                </label>
                <div class="f ai-c cg-2">
                  <nc-select
                    v-model="sHour"
                    :value="sHour.Title"
                    :options="sHours"
                    placeholder="00"
                    name="start-hour"
                  >
                    <template #default="{ option }">
                      {{ option?.Title }}
                    </template>
                  </nc-select>
                  <h4>:</h4>
                  <nc-select
                    v-model="sMinute"
                    :value="sMinute.Title"
                    :options="sMinutes"
                    placeholder="00"
                    name="start-minute"
                  >
                    <template #default="{ option }">
                      {{ option?.Title }}
                    </template>
                  </nc-select>
                </div>
              </section>

              <section class="f fd-col rg-2">
                <label class="fs-small_p fw-medium lh-no_lh c-secondary">
                  Время конца
                </label>
                <div class="f ai-c cg-2">
                  <nc-select
                    v-model="eHour"
                    :value="eHour.Title"
                    :options="eHours"
                    placeholder="00"
                    name="start-hour"
                  >
                    <template #default="{ option }">
                      {{ option?.Title }}
                    </template>
                  </nc-select>
                  <h4>:</h4>
                  <nc-select
                    v-model="eMinute"
                    :value="eMinute.Title"
                    :options="eMinutes"
                    placeholder="00"
                    name="start-minute"
                  >
                    <template #default="{ option }">
                      {{ option?.Title }}
                    </template>
                  </nc-select>
                </div>
              </section>

              <section class="f cg-3">
                <nc-button
                  :status="StatusEnum.Secondary"
                  class="px-3 py-2 fs-p lh-regular fw-medium w-100"
                >
                  Отмена
                </nc-button>
                <nc-button
                  :status="StatusEnum.Brand"
                  class="px-3 py-2 fs-p lh-regular fw-medium w-100"
                >
                  Создать
                </nc-button>
              </section>
            </form>
          </template>
        </nc-popover>
      </nc-task>
    </template>
  </nc-table>
</template>

<style lang="scss"></style>
<style lang="scss" scoped>
.days-table {
  cursor: v-bind(cursor);
}
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
