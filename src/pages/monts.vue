<!-- @format -->

<script lang="ts" setup>
import ncButton from '@/components/button/nc-button.vue';
import ncTable from '@/components/table/nc-table.vue';
import { getStatusByDate } from '@/methods';
import { DAYS } from '@/router/names';
import { useCalendarStore } from '@/stores/calendar';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
/** Текущий роут */
const route = useRoute();
/** Текущий год */
const calendarStore = useCalendarStore();
/** Кол-во видимых дат */
const count = Number(route.params.count);
/** Видимые в таблице месяцы */
const dates = computed(() => {
  const dates: Date[] = [];
  const date = calendarStore.selectDate.getClone();
  date.setDate(1);
  if (count == 12)
    for (let i = 0; i < count; i++) {
      date.setMonth(i);
      dates.push(date.getClone());
    }
  else
    for (
      let i = date.getMonth();
      i < count + calendarStore.selectDate.getMonth();
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
  calendarStore.setSelectDate(date);
  router.push({ name: DAYS, params: { count: 1 } });
};
</script>

<template>
  <nc-table class="months-table g-3" :dates="dates" columns="repeat(4, 1fr)">
    <template #default="{ date }">
      <div class="month-wrap">
        {{ date.getMonthName() }}
        <nc-table
          class="month-table g-1"
          :dates="date.getMonthDates()"
          columns="repeat(7, 1fr)"
        >
          <template #default="slotData">
            <nc-button
              class="month-date-n-btn"
              @click="setSelectDateAndPushToDay(slotData.date)"
              border
              :status="getStatusByDate(slotData.date)"
            >
              <span class="f ai-c jc-c">
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
