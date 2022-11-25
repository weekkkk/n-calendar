<!-- @format -->

<script setup lang="ts">
import NcDate from '@/components/date/nc-date.vue';
import NcDates from '@/components/dates/nc-dates.vue';
import NcDateCol from '@/components/date-col/nc-date-col.vue';
import NcTask from '@/components/task/nc-task.vue';
import { computed, reactive, ref } from 'vue';
const dates = new Date().getWeekDates();
const lenght = computed(() => dates.length);

</script>

<template>
  <nc-dates class="nc-date-table" :dates="dates">
    <template #default="{ date }">
      <nc-date-col :date="date"> </nc-date-col>
    </template>
  </nc-dates>
</template>

<style lang="scss" scoped>
.nc-date-table {
  position: relative;
  display: grid;
  grid-template-columns: repeat(v-bind(lenght), 1fr);
  grid-auto-columns: 1fr;
  gap: 8px;
}
</style>
