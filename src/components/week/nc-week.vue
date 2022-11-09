<!-- @format -->
<script lang="ts" setup>
/** Свойтва */
const props = defineProps({
  /** Дата */
  value: { type: Date, default: new Date() },
});
</script>

<template>
  <div class="nc-week">
    <span
      v-for="(date, index) in value.getWeek()"
      :key="index"
    >
      <slot :date="date" />
    </span>
  </div>
</template>

<style lang="less" scoped></style>
