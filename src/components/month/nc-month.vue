<!-- @format -->

<script setup lang="ts">
import { computed } from 'vue';
import NcWeek from '@/components/week/nc-week.vue';
/** Свойства */
const props = defineProps({
  /** Месяц */
  month: { type: Number, default: new Date().getMonth() },
  /** Год */
  year: { type: Number, default: new Date().getFullYear() },
});
/** События */
const emit = defineEmits(['select']);
</script>

<template>
  <div class="nc-month">
    <nc-week
      class="week"
      v-for="i in 6"
      :key="i"
      :value="new Date(year, month, 7 * (i - 1) + 1)"
      @select="emit('select', $event)"
    >
      <template #default="{ date }">
        <slot :date="date" :outside="month != date.getMonth()" />
      </template>
    </nc-week>
  </div>
</template>

<style lang="scss" scoped>
.nc-month {
  width: 100%;
  display: flex;
  flex-direction: column;
  .week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
}
</style>
