<!-- @format -->

<script lang="ts" setup>
import ncButton from '@/components/button/nc-button.vue';
import ncCell from '@/components/cell/nc-cell.vue';
import ncTable from '@/components/table/nc-table.vue';
import { getStatusByDate } from '@/methods';
import { useCalendarStore } from '@/stores/calendar';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
/** Текущий год */
const route = useRoute();
/** Текущий год */
const calendar = useCalendarStore();
/** Кол-во видимых дат */
const count = Number(route.params.count);
/** Видимые в таблице даты */
const datess = computed(() => {
  if (count == 6) return calendar.selectDate.getMonthDates();
  let dates: Date[] = [];
  const date = calendar.selectDate.getClone();
  for (let i = 0; i < count; i++) {
    date.setDate(date.getDate() + i * 7);
    dates = dates.concat(date.getWeekDates());
  }
  return dates;
});
</script>

<template>
  <nc-table class="g-3" :dates="datess" columns="repeat(7, 1fr)">
    <template #default="{ date }">
      <nc-cell
        class="cell head bg-1 ai-c jc-c fd-col rg-2 p-3"
        :status="getStatusByDate(date)"
      >
        <span class="fw-medium lh-compact">
          {{ date.getShortDayName() }}
        </span>
        <nc-button
          @click="calendar.setSelectDate(date)"
          border
          class="date-n-btn p-2"
          :status="getStatusByDate(date)"
        >
          <h3 class="fw-medium">{{ date.getDate() }}</h3>
        </nc-button>
      </nc-cell>
    </template>
  </nc-table>
</template>

<style lang="scss" scoped>
.date-n-btn {
  width: 48px;
  height: 48px;
}
</style>
