<!-- @format -->

<script lang="ts" setup>
import ncCell from '@/components/cell/nc-cell.vue';
import { StatusEnum } from '@/enums';
import type { PropType } from 'vue';
/** Свойства */
const props = defineProps({
  /** Дата */
  date: { type: Date, default: new Date() },
  /** Статус */
  status: { type: Number as PropType<StatusEnum>, default: StatusEnum.Base },
});
</script>

<template>
  <div class="nc-column">
    <!-- Шапка -->
    <nc-cell
      class="cell head bg-1 ai-c jc-c fd-col rg-2 p-3"
      :status="StatusEnum.Base"
    >
      <span class="fw-medium lh-compact">
        {{ date.getShortDayName() }}
      </span>
      <h3 class="fw-medium">{{ date.getDate() }}</h3>
    </nc-cell>
    <!-- Ячейка -->
    <nc-cell :status="StatusEnum.Secondary" v-for="i in 24"></nc-cell>
  </div>
</template>

<style lang="scss" scoped>
.nc-column {
  display: inline-grid;
  grid-auto-flow: row;
  grid-template-rows: var(--nc-cell-head-h) repeat(24, var(--nc-cell-h));
  &.head {
    position: sticky;
    left: 0;
    z-index: 1;
    .cell {
      align-items: center;
      justify-content: flex-end;
      &:not(:first-child) {
        transform: translateY(50%);
      }
      &.head {
        z-index: 1;
      }
    }
  }
  > .cell {
    &.head {
      position: sticky;
      top: 0;
    }
  }
  &:not(.head) {
    min-width: 224px;
  }
}
</style>
