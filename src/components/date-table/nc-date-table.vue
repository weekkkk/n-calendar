<!-- @format -->

<script setup lang="ts">
import NcDate from '@/components/date/nc-date.vue';
import NcDates from '@/components/dates/nc-dates.vue';
import NcDateCol from '@/components/date-col/nc-date-col.vue';
import NcTask from '@/components/task/nc-task.vue';
import { computed } from 'vue';
const dates = [new Date()];
const lenght = computed(() => dates.length);

function start(e: MouseEvent) {}
</script>

<template>
  <nc-dates class="nc-date-table" :dates="dates">
    <template #default="{ date }">
      <div class="col">
        <div class="cell head bg-1">
          <span class="content">
            <span class="day">
              {{ date.getShortDayName() }}
            </span>
            <span class="date">
              <nc-date>
                {{ date.getDate() }}
              </nc-date>
            </span>
          </span>
        </div>
        <div class="col">
          <nc-task />
          <div class="cell" v-for="i in 24" :key="i">
            <span class="fs-small_caption hour start">{{ i - 1 }}</span>
            <span class="fs-small_caption hour center">{{ i - 0.5 }}</span>
            <span class="fs-small_caption hour end">{{ i == 24 ? 0 : i }}</span>
            <span class="fs-small_caption content"> </span>
          </div>
        </div>
      </div>
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
  .col {
    border-left: 1px solid #000;
    border-right: 1px solid #000;
    > .col {
      border: none;
      position: relative;
      .cell {
        display: flex;
        .hour {
          position: absolute;
          &.start {
            top: 0;
          }
          &.center {
            top: 50%;
            transform: translateY(-50%);
          }
          &.end {
            bottom: 0;
          }
        }
      }
    }
    .cell {
      position: relative;
      padding-bottom: 100%;
      &:not(:last-child) {
        border-bottom: 1px solid black;
      }
      &.head {
        position: sticky;
        top: 0;
        z-index: 10;
      }
      > .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        gap: 8px;
        .date {
          width: 33%;
        }
      }
    }
  }
}
</style>
