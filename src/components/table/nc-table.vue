<!-- @format -->

<script lang="ts" setup>
import type { Prop, PropType } from "vue";

/** Свойства */
const props = defineProps({
  /** Даты */
  dates: { type: Array as PropType<Date[]>, default: [] },
  /** Кол-во колонок */
  columns: { type: String, default: "" },
});
</script>

<template>
  <div class="table cg-3">
    <div class="col head">
      <div class="cell head bg-1 a-70"></div>
      <div class="cell bg-1 c-secondary a-70 fw-medium p-3" v-for="i in 23">
        {{ i }}:00
      </div>
    </div>
    <div class="col" v-for="i in 7">
      <div class="cell head bg-1 a-70 rg-2 p-3">
        <span class="fw-medium lh-compact">Пн</span>
        <h3 class="fw-medium">{{ i }}</h3>
      </div>
      <div class="cell" v-for="i in 24"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$b: var(--nc-cell-bw) var(--nc-cell-bs) var(--nc-cell-bc);
.table {
  display: grid;
  grid-auto-flow: column;
  overflow: auto;
  height: fit-content;
  max-height: 100%;
  grid-template-columns: var(--nc-cell-head-w) repeat(7, 1fr);
  > .col {
    display: grid;
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
      display: flex;
      &.head {
        position: sticky;
        top: 0;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        --nc-cell-bc: rgba(var(--nc-c-base), 1);
        h3 {
          width: 48px;
          height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    &:not(.head) {
      min-width: 224px;
      .cell {
        &:not(:last-child) {
          border-bottom: $b;
        }
      }
    }
  }
}
</style>
