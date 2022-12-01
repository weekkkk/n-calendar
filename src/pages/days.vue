<!-- @format -->

<script setup lang="ts">
import ncButton from '@/components/button/nc-button.vue';
import ncCell from '@/components/cell/nc-cell.vue';
import ncColumn from '@/components/column/nc-column.vue';
import ncTable from '@/components/table/nc-table.vue';
import { StatusEnum } from '@/enums';
import { HourIntervalModel } from '@/models';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCalendarStore } from '@/stores/calendar';
import { getStatusByDate } from '@/methods';

const interval = new HourIntervalModel();

const route = useRoute();

const calendar = useCalendarStore();

const count = Number(route.params.count);

const dates = computed(() => {
  if (count == 7) return calendar.selectDate.getWeekDates();
  const dates: Date[] = [];
  let date: Date;
  for (let i = 0; i < count; i++) {
    date = calendar.selectDate.getClone();
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  return dates;
});
</script>

<template>
  <nc-table
    class="cg-3"
    :dates="dates"
    :columns="`var(--nc-cell-head-w) repeat(${count}, 1fr)`"
  >
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
    <template #default="{ date }">
      <nc-column :date="date" :status="getStatusByDate(date)">
        <template #head="{ status }">
          <nc-cell
            class="cell head bg-1 ai-c jc-c fd-col rg-2 p-3"
            :status="status"
          >
            <span class="fw-medium lh-compact">
              {{ date.getShortDayName() }}
            </span>
            <nc-button
              @click="calendar.setSelectDate(date)"
              border
              class="date-n-btn p-2"
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
