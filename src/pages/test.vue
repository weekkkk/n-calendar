<!-- @format -->

<script setup lang="ts">
import NcMonth from '@/components/month/nc-month.vue';
import NcWeek from '@/components/week/nc-week.vue';

const date = new Date();

console.log(date.getWeek().map((el) => el.toLocaleDateString()));
</script>

<template>
  <nc-month>
    <template #default="{ date, outside }">
      {{ date.getDate() }}
    </template>
  </nc-month>
  <!-- <nc-week /> -->
</template>

<style lang="scss" scoped></style>
