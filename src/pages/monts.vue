<!-- @format -->

<script lang="ts" setup>
import ncButton from '@/components/button/nc-button.vue';
import ncTable from '@/components/table/nc-table.vue';
import { getStatusByDate } from '@/methods';
import { useCalendarStore } from '@/stores/calendar';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
/** Текущий роут */
const route = useRoute();
/** Текущий год */
const calendar = useCalendarStore();
/** Кол-во видимых дат */
const count = Number(route.params.count);
/** Видимые в таблице месяцы */
const dates = computed(() => {
  const dates: Date[] = [];
  const date = calendar.selectDate.getClone();
  date.setDate(1);
  if (count == 12)
    for (let i = 0; i < count; i++) {
      date.setMonth(i);
      dates.push(date.getClone());
    }
  else
    for (
      let i = date.getMonth();
      i < count + calendar.selectDate.getMonth();
      i++
    ) {
      date.setMonth(i);
      dates.push(date.getClone());
    }
  return dates;
});
</script>

<template>
  <nc-table class="g-3" :dates="dates" columns="repeat(3, 1fr)">
    <template #default="{ date }">
      <div>
        {{ date.getMonthName() }}
        <nc-table
          class="g-1"
          :dates="date.getMonthDates()"
          columns="repeat(7, 1fr)"
        >
          <template #default="{ date }">
            <nc-button
              @click="calendar.setSelectDate(date)"
              border
              :status="getStatusByDate(date)"
            >
              {{ date.getDate() }}
            </nc-button>
          </template>
        </nc-table>
      </div>
    </template>
  </nc-table>
</template>

<style lang="less" scoped></style>
