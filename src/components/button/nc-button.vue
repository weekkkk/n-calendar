<!-- @format -->

<script lang="ts" setup>
import { StatusEnum } from '@/enums';
import { getColorByStatus } from '@/methods';
import type { PropType } from 'vue';

/** Свойства */
const props = defineProps({
  /** Статус */
  status: { type: Number as PropType<StatusEnum>, default: StatusEnum.Base },
  /** Обводка */
  border: { type: Boolean, default: false },
});
</script>

<template>
  <button class="nc-button" :class="{ 'is-border': border }">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.nc-button {
  position: relative;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  --nc-button-c: v-bind(getColorByStatus(props.status));
  background: none;
  white-space: nowrap;
  color: rgb(var(--nc-c-bg-1));
  border: none;
  cursor: pointer;
  outline: none;
  // transition: var(--nc-button-transition);

  &.is-border {
    color: rgb(var(--nc-button-c));
    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border: var(--nc-button-bw) var(--nc-button-bs) rgb(var(--nc-button-c));
      border-radius: inherit;
    }
    &:focus {
      border: none;
      color: rgb(var(--nc-c-bg-1));
      background: rgb(var(--nc-button-c));
      &::before {
        border: none;
      }
    }
  }

  &:hover {
    opacity: 0.75;
  }
  &:focus {
    opacity: 1;
    color: rgb(var(--nc-button-c));
    background: rgb(var(--nc-c-bg-1));
    filter: brightness(110%);
    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border: var(--nc-button-bw) var(--nc-button-bs) rgb(var(--nc-button-c));
      border-radius: inherit;
    }
  }
}
</style>
