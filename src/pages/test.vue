<!-- @format -->

<script setup lang="ts">
import ncCell from "@/components/cell/nc-cell.vue";
import ncTable from "@/components/table/nc-table.vue";
</script>

<template>
  <nc-cell class="p-3" :date="new Date()">
    <template #default="{ date, day }">
      {{ day }}
    </template>
  </nc-cell>
  <nc-table></nc-table>
</template>

<style lang="scss" scoped></style>
