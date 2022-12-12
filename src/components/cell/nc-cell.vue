<!-- @format -->

<script lang="ts" setup>
import { StatusEnum } from '@/enums';
import { getColorByStatus } from '@/methods';
import type { PropType } from 'vue';
/** Свойства */
const props = defineProps({
  /** Статус */
  status: { type: Number as PropType<StatusEnum>, default: StatusEnum.Base },
});
</script>

<template>
  <div class="nc-cell">
    <div class="test"></div>
    <slot :status="status" />
  </div>
</template>

<style lang="scss" scoped>
.nc-cell {
  position: relative;
  display: inline-flex;
  --nc-cell-c: rgba(v-bind(getColorByStatus(props.status)), var(--nc-c-alpha));
  color: var(--nc-cell-c);
  --nc-cell-bc: var(--nc-cell-c);
  border-bottom: var(--nc-cell-bw) var(--nc-cell-bs) var(--nc-cell-bc);
  .test,
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    border-bottom: 1px solid #000;
    opacity: 0.1;
  }
  &::before {
    top: 25%;
  }
  &::after {
    top: 75%;
  }
}
</style>
