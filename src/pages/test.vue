<!-- @format -->

<script setup lang="ts">
import ncCell from '@/components/cell/nc-cell.vue';
import ncColumn from '@/components/column/nc-column.vue';
import ncTable from '@/components/table/nc-table.vue';
</script>

<template>
  <nc-table>
    <template #default="{ date }">
      <nc-column :date="date" />
    </template>
  </nc-table>
</template>

<style lang="scss" scoped></style>
