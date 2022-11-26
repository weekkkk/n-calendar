<!-- @format -->

<script lang="ts" setup>
import { StatusEnum } from "@/enums";
import { computed, type PropType } from "vue";
/** Свойства */
const props = defineProps({
  /** Дата */
  date: { type: Date, default: new Date() },
  /** Статус */
  status: { type: Number as PropType<StatusEnum>, default: StatusEnum.Base },
});
/** Цвет */
const color = computed(() =>
{
  switch (props.status)
  {
    case StatusEnum.Base:
      return 'var(--nc-c-base)';
    case StatusEnum.Danger:
      return 'var(--nc-c-danger)';
    case StatusEnum.Focus:
      return 'var(--nc-c-focus)';
    case StatusEnum.Secondary:
      return 'var(--nc-c-secondary)';
    case StatusEnum.Success:
      return 'var(--nc-c-success)';
    case StatusEnum.Warning:
      return 'var(--nc-c-warning)';
  }
})
</script>

<template>
  <div class="nc-cell">
    <slot :day="date.getDay()" :date="date.getDate()" />
  </div>
</template>

<style lang="scss" scoped>
.nc-cell {
  display: inline-flex;
  --nc-cell-c: rgba(v-bind(color), var(--nc-c-alpha));
  color: var(--nc-cell-c);
  border-bottom: var(--nc-cell-b);
}
</style>
