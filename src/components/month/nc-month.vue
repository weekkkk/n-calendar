<!-- @format -->

<script setup lang="ts">
import NcDate from '@/components/date/nc-date.vue';
import NcDates from '@/components/dates/nc-dates.vue';
import { useCalendarStore } from '@/stores/calendar';
/** Свойства */
const props = defineProps({
  /** Месяц */
  month: { type: Number, default: new Date().getMonth() },
  /** Год */
  year: { type: Number, default: new Date().getFullYear() },
});
/** Стор */
const { firstDayOfWeek } = useCalendarStore();
</script>

<template>
  <div class="nc-month">
    <nc-dates
      class="week"
      :dates="new Date(year, month, 1).getWeekDates(firstDayOfWeek)"
    >
      <template #default="{ date }">
        <nc-date :title="date.getDayName()">
          {{ date.getShortDayName() }}
        </nc-date>
      </template>
    </nc-dates>
    <nc-dates
      class="week"
      v-for="i in 6"
      :key="i"
      :dates="
        new Date(year, month, 7 * (i - 1) + 1).getWeekDates(firstDayOfWeek)
      "
    >
      <template #default="{ date }">
        <slot :date="date" :outside="month != date.getMonth()" />
      </template>
    </nc-dates>
  </div>
</template>

<style lang="scss" scoped>
.nc-month {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  .week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
  }
}
</style>
