<!-- @format -->

<script lang="ts" setup>
import ncButton from '@/components/button/nc-button.vue';
import ncTable from '@/components/table/nc-table.vue';
import { StatusEnum } from '@/enums';
import { getStatusByDate } from '@/methods';
import { DAYS } from '@/router/names';
import { ref, computed } from 'vue';
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
/** Видимые в таблице месяцы */
const dates = computed(() => {
  const dates: Date[] = [];
  const date = selectDate.value.getClone();
  date.setDate(1);
  if (count == 12)
    for (let i = 0; i < count; i++) {
      date.setMonth(i);
      dates.push(date.getClone());
    }
  else
    for (
      let i = date.getMonth();
      i < count + selectDate.value.getMonth();
      i++
    ) {
      date.setMonth(i);
      dates.push(date.getClone());
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
  <nc-table class="months-table g-3 p-3" :dates="dates" columns="repeat(3, 1fr)">
    <template #default="{ date }">
      <div class="month-wrap f fd-col rg-1">
        {{ date.getMonthName() }}
        <nc-table
          class="month-table g-1"
          :dates="date.getMonthDates()"
          columns="repeat(7, 1fr)"
        >
          <template #default="slotData">
            <nc-button
              class="month-date-n-btn "
              @click="setSelectDateAndPushToDay(slotData.date)"
              :border="getStatusByDate(slotData.date, selectDate) == StatusEnum.Base"
              :status="getStatusByDate(slotData.date, selectDate)"
            >
              <span class="f ai-c jc-c fw-medium">
                {{ slotData.date.getDate() }}
              </span>
            </nc-button>
          </template>
        </nc-table>
      </div>
    </template>
  </nc-table>
</template>

<style lang="scss" scoped>
.months-table {
  grid-auto-rows: min-content;
  .month-wrap {
    height: fit-content;
    .month-table {
      grid-auto-rows: min-content;
      height: fit-content;
      .month-date-n-btn {
        position: relative;
        padding-bottom: 100%;
        border-radius: 50%;
        > span {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
        }
      }
    }
  }
}
</style>
