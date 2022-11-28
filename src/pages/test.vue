<!-- @format -->

<script setup lang="ts">
import ncCell from '@/components/cell/nc-cell.vue';
import ncColumn from '@/components/column/nc-column.vue';
import ncTable from '@/components/table/nc-table.vue';
import { StatusEnum } from '@/enums';
import { HourIntervalModel } from '@/models';
const interval = new HourIntervalModel();
</script>

<template>
  <nc-table columns="var(--nc-cell-head-w) repeat(7, 1fr)">
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
      <nc-column :date="date">
        <template #head>
          <nc-cell
            class="cell head bg-1 ai-c jc-c fd-col rg-2 p-3"
            :status="StatusEnum.Base"
          >
            <span class="fw-medium lh-compact">
              {{ date.getShortDayName() }}
            </span>
            <h3 class="fw-medium">{{ date.getDate() }}</h3>
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

<style lang="scss" scoped></style>
