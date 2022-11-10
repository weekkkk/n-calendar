<!-- @format -->

<script setup lang="ts">
import NcMonth from '@/components/month/nc-month.vue';
import NcYear from '@/components/year/nc-year.vue';
import { ref } from 'vue';

const year = ref(2022);
</script>

<template>
  <nc-year />
</template>

<style lang="scss" scoped></style>
