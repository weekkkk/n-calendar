<!-- @format -->
<script lang="ts" setup>
/** Свойтва */
const props = defineProps({
  /** Даты */
  dates: { type: Array<Date>, default: [] },
});
</script>

<template>
  <div class="nc-dates">
    <span v-for="(date, index) in dates" :key="index">
      <slot :date="date" />
    </span>
  </div>
</template>

<style lang="less" scoped></style>
