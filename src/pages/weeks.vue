<!-- @format -->

<script lang="ts" setup>
import ncButton from '@/components/button/nc-button.vue';
import ncCell from '@/components/cell/nc-cell.vue';
import ncTable from '@/components/table/nc-table.vue';
import { getStatusByDate } from '@/methods';
import { DAYS } from '@/router/names';
import { useCalendarStore } from '@/stores/calendar';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
/** Текущий роут */
const route = useRoute();
/** Данные роута */
const routeParams: {
  count: number;
  year: number;
  month: number;
  date: number;
} = {
  count: Number(route.params.count),
  year: Number(route.params.year),
  month: Number(route.params.month),
  date: Number(route.params.date),
};
/** Кол-во видимых дат */
const count = Number(routeParams.count);
/** Выбранная дата */
const selectDate = ref(
  new Date(routeParams.year, routeParams.month - 1, routeParams.date)
);
/** Видимые в таблице даты */
const dates = computed(() => {
  if (count == 6) return selectDate.value.getMonthDates();
  let dates: Date[] = [];
  const date = selectDate.value.getClone();
  for (let i = 0; i < count; i++) {
    date.setDate(date.getDate() + i * 7);
    dates = dates.concat(date.getWeekDates());
  }
  return dates;
});
/** Роутер */
const router = useRouter();
/** Выбор даты и переход к дню */
const setSelectDateAndPushToDay = (date: Date) => {
  selectDate.value = date.getClone();
  router.push({
    name: DAYS,
    params: {
      count: 1,
      year: selectDate.value.getFullYear(),
      month: selectDate.value.getMonth() + 1,
      date: selectDate.value.getDate(),
    },
  });
};
</script>

<template>
  <nc-table class="weeks-table g-3" :dates="dates" columns="repeat(7, 1fr)">
    <template #default="{ date }">
      <nc-cell
        class="cell head bg-1 ai-c jc-c fd-col rg-2 p-3"
        :status="getStatusByDate(date, selectDate)"
      >
        <span class="fw-medium lh-compact">
          {{ date.getShortDayName() }}
        </span>
        <nc-button
          @click="setSelectDateAndPushToDay(date)"
          border
          class="date-n-btn p-2"
          :status="getStatusByDate(date, selectDate)"
        >
          <h3 class="fw-medium">{{ date.getDate() }}</h3>
        </nc-button>
      </nc-cell>
    </template>
  </nc-table>
</template>

<style lang="scss" scoped>
.weeks-table {
  grid-auto-rows: min-content;
  .date-n-btn {
    width: 48px;
    height: 48px;
  }
}
</style>
